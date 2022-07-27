/**
 * 작성자: tour07 작성일: 20201228 설명: 직/간판에서 사용될 스크립트 샘플
 * _pay_ooo과 같이 생성된 객체는 결제를 위해 만들어진 전역변수
 */

//채널측과 페이먼트서버간 크로스도메인 이슈로인해 도메인 맞춤 
if( (window.location.hostname).indexOf('jejuair.net') != -1 ) {
	document.domain = "jejuair.net";	
}

 //paymentWas서버 도메인 변동에 대비하기위함. (아래와같이 사용하려면 js파일의 도메인과 payment WAS의 도메인이 같아야만함)
var _pay_paymentRootURL = getScriptURL();

_pay_paymentRootURL = extractAddr(_pay_paymentRootURL);

var _pay_isAthenDone = false; //인증완료여부 플래그
var _pay_isUserCancel = false; //ie11 팝업닫힘 체크 못하지만, 결제취소 체크 가능한 경우의 처리를 위한 플래그
var _pay_requestWindow = null;


function getScriptURL(){
    var script =  document.currentScript || document.querySelector('script[src*="payment_script.js"]')
    return script.src
}

function extractAddr(url) {
    if (url.indexOf('//') < 0) {
        return url.split('/')[0];
    } else {
        return url.split('/', 3).join('/');
    }
}

var userAgent = navigator.userAgent.toUpperCase();
var deviceType = "";

if (userAgent.indexOf("ANDROID") != -1) {
	deviceType = "ANDROID";
} else if (userAgent.indexOf("IPHONE") != -1) {
	deviceType = "IPHONE";
} else if (userAgent.indexOf("IPAD") != -1) {
	deviceType = "IPAD";
}
			
var _pay_CheckInterval = null;

var _pay_3DSSessionId;

//sha256관련 js파일 import
var sha256script = document.createElement('script');
sha256script.src = _pay_paymentRootURL+'/common/js/sha256.js';
document.getElementsByTagName('head')[0].appendChild(sha256script);

//base64관련 js파일 import
var base64script = document.createElement('script');
base64script.src = _pay_paymentRootURL+'/common/js/Base64Util.js';
document.getElementsByTagName('head')[0].appendChild(base64script);

//errorLog관련 js파일 import
var errorLogscript = document.createElement('script');
errorLogscript.src = _pay_paymentRootURL+'/common/js/errorLog.js';
document.getElementsByTagName('head')[0].appendChild(errorLogscript);
	

/*
 * 결제수단 조회 함수
 */
function getPaymentList(afterFunction, customerAuthYn) {
	
	var saleTypeCd = isUndefined(typeof _pay_saleTypeCd) ? "NOR" : _pay_saleTypeCd;
	
	var depDate = '';
	if (saleTypeCd != 'SPC' && saleTypeCd != 'JPM') {
		depDate = _pay_pnrDataObj.journeys[0].designator.departure;
		depDate = depDate.replace(/[^0-9]/g, '');
		depDate = depDate.substr(0,8);
	} 
	
	var reqData = {
		systemType: _pay_systemType
	    , channelCd: _pay_channelCd
	    , currencyCd: _pay_currency
	    , productTypeCd: _pay_channelCd == 'URL' ? 'ETC' : _pay_productTypeCode //URL결제인경우 항상 'ETC'로 결제수단 조회 
		, saleTypeCd: saleTypeCd
	    , depDate: depDate
		, cultureCd: _pay_cultureCd
		, userId: isUndefined(typeof _pay_loginUserId) ? "" : _pay_loginUserId
		, customerAuthYn: customerAuthYn
		, pnrNo: _pay_pnrDataObj.recordLocator
	}
	
	if ( saleTypeCd == "PRM") {
		reqData.promotionTypeCd = _pay_promotionTypeCd;
		reqData.promotionCardCd = isUndefined(typeof _pay_promotionCardCd) ? "" : _pay_promotionCardCd;
	}
	
	$.ajax({
		async : false,
		type : "post",
		dataType : "json",
		contentType : "text/plain; charset=utf-8",
		data : JSON.stringify(reqData),
		url : _pay_paymentRootURL+"/pacg/showMethod/inquirePayTypeList.do",
		beforeSend: function(request){
			setBaseBeforeRq(request);
		},
		success : function(result) {
			if(result) {
				if(result.code != '0000') {
					alert(result.message);
				} else {
					var paymentList;
					if (saleTypeCd != 'SPC' && saleTypeCd != 'JPM') {
						paymentList = payListFilter(result.data, saleTypeCd);
					} else {
						paymentList = result.data;
					}
					
					afterFunction(result);	
				}
			} else {
				alert('에러!');
			}
			
		},
		error : function(request,status,error){
			alert('에러!');
		}
	});
	
}

/**
 * 주문번호 생성
 * @returns
 */
function createOrderId() {
	
	var orderId = null;
	// 결제요청 사전작업 & 주문번호 생성 요청
	$.ajax({
		async : false,
		type : "post",
		dataType : "json",
		contentType : "text/plain; charset=utf-8",
		data : JSON.stringify({
		    channelCd: _pay_channelCd
		    , payTypeCd: _pay_payTypeCd
		    , amount: _pay_amount 
		    , pnrNo: _pay_pnrDataObj.recordLocator
			, systemType: _pay_systemType
		    , productTypeCd: _pay_productTypeCode
		    , cultureCd: _pay_cultureCd
		    
		}),
		url : _pay_paymentRootURL+"/pacg/approve/createOrderId.do",
		beforeSend: function(request){
			setBaseBeforeRq(request);
		},
		success : function(result) {
			orderId = result.data.orderId;

		}
	});
	
	return orderId;
	
	
}

/**
 * 주문번호 생성
 * @returns
 */
function createEMDSOrderId() {
	
	var orderId = null;
	// 결제요청 사전작업 & 주문번호 생성 요청
	$.ajax({
		async : false,
		type : "post",
		dataType : "json",
		contentType : "text/plain; charset=utf-8",
		data : JSON.stringify({
		    channelCd: _pay_channelCd
		    , payTypeCd: _pay_payTypeCd
		    , productTypeCd: _pay_productTypeCode
		    , cultureCd: _pay_cultureCd
		    , pnrNo: isUndefined(typeof _pay_pnrNo) ? "" : _pay_pnrNo
		    , optionCd: isUndefined(typeof _pay_optionCd) ? "" : _pay_optionCd 
		    
		}),
		url : _pay_paymentRootURL+"/pacg/approve/createEmdSOrderId.do",
		success : function(result) {
			if (result.code == '0000') {
				orderId = result.data.orderId;	
			} else {
				alert(result.message);
			}
		}
	});
	
	return orderId;
}

/**
 * 인증요청 함수 
 * 인증요청 전 사전작업 후 인증창 오픈
 */
function requestApproval() {
	
	var returnData = {};

	_pay_isAthenDone = false; //인증완료 플래그 상태 초기화
	_pay_isUserCancel = false; //인증취소 플래그 상태 초기화
	
	//탑승객 연락처가 없는경우 알럿처리
	if ( isUndefined(typeof _pay_pnrDataObj.contacts)
		|| isUndefined(typeof _pay_pnrDataObj.contacts[Object.keys(_pay_pnrDataObj.contacts)[0]])
		|| _pay_pnrDataObj.contacts[Object.keys(_pay_pnrDataObj.contacts)[0]].phoneNumbers.length == 0) 
	{
			return {
				code:0001,
				message: '연락처 정보가 없는 예약입니다.\n고객센터로 문의해주세요.'
			};
	}
	
	if (_pay_pnrDataObj.contacts[Object.keys(_pay_pnrDataObj.contacts)[0]].emailAddress == null
		|| _pay_pnrDataObj.contacts[Object.keys(_pay_pnrDataObj.contacts)[0]].emailAddress == "") {
		
		if(isUndefined(typeof _pay_email)) {

			return {
				code:0001,
				message: '이메일 정보가 없는 예약입니다.\n고객센터로 문의해주세요.'
			};
		} else {
			_pay_pnrDataObj.contacts[Object.keys(_pay_pnrDataObj.contacts)[0]].emailAddress = _pay_email;	
		}
		
	}
	
	//2022.01.13 URL결제시 productTypeCode 시간차 서버반영으로 인한 결제오류 방어코드 (채널, 어드민 전체 적용 확인시 삭제 가능) 
	if (_pay_channelCd == 'URL' && (_pay_productTypeCode == null || _pay_productTypeCode == '')  ) {
		_pay_productTypeCode = 'ETC';
	}
	
	// IM00316579 프로모션 카드 정보와 선택한 카드 정보가 불일치하면 에러 발생
	// 1. 예약 타입이 프로모션이면서 빠른 계좌이체 프로모션의 경우 빠른 결제에서 계좌와 카드 모두 노출 될 수 있으므로 계좌만 허용 
	// 2. 예약 타입이 프로모션이면서 프로모션 카드 정보가 있으며 선택한 카드정보와 불일치하면 에러
	if (_pay_bookType == "Promotion") { 
		if (_pay_promotionCardCd != "") {
			if (_pay_promotionCardCd == "JP") {
				if (_pay_method != "bank") {
					alert(BIZ_COMMONS_SCRIPT.getI18n('0000000389.msg00153')); // 결제처리 도중 오류가 발생하였습니다. 잠시 후 다시 시도하여 주시기 바랍니다.
					return false;
				}
			} else {
				if (_pay_promotionCardCd != _pay_acceptCardCd) {
					alert(BIZ_COMMONS_SCRIPT.getI18n('0000000389.msg00153')); // 결제처리 도중 오류가 발생하였습니다. 잠시 후 다시 시도하여 주시기 바랍니다.
					return false;
				}
			}
		}
	}
	
	// 결제요청 사전작업 & 주문번호 생성 요청
	var reqData = {
	    channelCd: _pay_channelCd
	    , payTypeCd: _pay_payTypeCd
	    , payTypeDetailCd: _pay_payTypeDetailCd
	    , amount: _pay_amount
	    , productNm: _pay_productName
		, userId: _pay_loginUserId 
	    , pnrNo: _pay_pnrDataObj.recordLocator
		, systemType: _pay_systemType
	    , cultureCd: _pay_cultureCd
	    , currencyCd: _pay_currency
		, token: _pay_pssToken
		, productTypeCd: _pay_productTypeCode
		, mid: _pay_mid
	};
	
	if ( ! isUndefined(typeof _pay_orderId) ) {
		reqData.orderId = _pay_orderId
	}
	
	if (_pay_payTypeCd == 'JO') {
		reqData.refNo = _pay_cardNo;
		reqData.extDt = _pay_expireDate;
		
		_pay_3DSSessionId = Base64.encode(_pay_cardNo + _pay_expireDate + Math.floor(Math.random() * 100000000) + 1);
		reqData.uid = _pay_3DSSessionId;
		
	}
	
	if (_pay_payTypeCd == 'NP') {
		
		var paySaleTypeCd;
		if (isUndefined(typeof _pay_saleTypeCd)) { 
			paySaleTypeCd = 'NOR';
		} else {
			paySaleTypeCd = _pay_saleTypeCd;
		}
		
		if (paySaleTypeCd == 'RSV') {
			//첫번째 여정 출발일
			var startDate =  _pay_pnrDataObj.journeys[0].designator.departure;
			startDate = startDate.replace(/[^0-9]/g, '');
			startDate = startDate.substr(0,8);
			
			//마지막 여정 도착일
			var journeyLen = _pay_pnrDataObj.journeys.length -1;
			var endDate = _pay_pnrDataObj.journeys[journeyLen].designator.arrival;
			endDate = endDate.replace(/[^0-9]/g, '');
			endDate = endDate.substr(0,8);
			
			reqData.productItems = {
				categoryType: "FLIGHT"
				, categoryId: "TICKET"
				, uid: _pay_pnrDataObj.journeys[0].designator.destination
				, name: _pay_productName
				, startDate: startDate
				, endDate: endDate
				, count: 1
			};
		}
		
	} else if(_pay_payTypeCd == 'JA') {
		
		var paxName = this.getPaxName();
		
		reqData.additionalInfo = {
			telNo: _pay_pnrDataObj.contacts[Object.keys(_pay_pnrDataObj.contacts)[0]].phoneNumbers[0].number
			, paxName: paxName
			, email: _pay_pnrDataObj.contacts[Object.keys(_pay_pnrDataObj.contacts)[0]].emailAddress
		};
	} else if(_pay_payTypeCd == 'KC') {
		if (isUndefined(typeof _pay_saleTypeCd) || _pay_routeType == 'D') {
			reqData.agentId = 'DIB';	
		} else {
			reqData.agentId = 'IIB';
		}
	} else if(_pay_payTypeCd == 'CP') {
		reqData.additionalInfo = {
			cashReceiptIssueTypeCd: _pay_receiptType, 
			cashReceiptIssueKey: _pay_receiptKey, 
			tradeDivCd: _pay_usingType
		};
	} else if(_pay_payTypeCd == 'TS') {
		reqData.additionalInfo = {
			deviceType: /iPhone|iPad|iPod/i.test(navigator.userAgent) ? "IPHONE" : "ANDROID"
		}
	} else if(_pay_payTypeDetailCd == 'JP1') {
		reqData.bankCardCode = _pay_acceptCardCd;
	}

	
	$.ajax({
		async : false,
		type : "post",
		dataType : "json",
		contentType : "text/plain; charset=utf-8",
		data : JSON.stringify(reqData),
		url : _pay_paymentRootURL+"/pacg/approve/handlePreAuthentication.do",
		beforeSend: function(request){
			setBaseBeforeRq(request);
		},
		success : function(result) {
			
			if(result.code =='0000') {
				var saveAuthResult =  requestApprovalAction(result.data); //결제창 오픈
				
				returnData.code = saveAuthResult.code;
				
				
				//나중에 결제하기
				if ( _pay_productTypeCode == 'LAT') {
					returnData.orderId = _pay_orderId;
				} else {
					returnData.orderId = result.data.orderId;
				}
				returnData.orderId = result.data.orderId;
				
				if (saveAuthResult.code !=  '0000') {
					returnData.message = saveAuthResult.message;
				} else {
					returnData.message = result.message;	
				}
				
				
				returnData.timeLimit = result.data.timeLimit;
				var data = {
					reserveId: result.data.reserveId
				};
				
				returnData.data = data
				
			} else {
				returnData.code = result.code;
				returnData.message = result.message;
			}
			
			
		}
	});
	
	return returnData;
}

/*
 * 결제창 오픈 함수
 */
function requestApprovalAction(preProcRs) {
	
	//이미 열려있는 결제창이 있다면 닫히도록 함
	if (_pay_requestWindow != null && _pay_requestWindow != {}) {
		//10.25 : 아래 close 오류가 발생해도 진행되도록 try 처리
		try {
			_pay_requestWindow.close();
		} catch (e) {
			console.log("requestApprovalAction _pay_requestWindow.close() Error");
		}
	}
	
	var saveAuthResult = {
		code: '0000'
	}
	
	var reqJson;
	var saveAuthData;
	
	/*
	 * IM00336611 결제 시 환율에 따라 소수점이 비정상적으로 표기 될 경우 소수점 2자리로 제한 처리
	 * 나비테어 정책 소수점 최대 2자리, 반올림에 맞춰 세팅
	 * */
	 if (_pay_amount%1 !== 0) {
		_pay_amount = _pay_amount.toFixed(2); 
	 }
	
	//--------------바로 팝업창을 열어서 인증하는 경우의 결제수단들--------------//
	if(_pay_payTypeCd == 'JA') {
		//일본편의점 발번처리
		reqJson = {reserveId: preProcRs.checkoutPage}; //인증요청정보 (일본편의점은 인증창 오픈시 요청값이 없음으로 호출 url저장)
		saveAuthData = this.createSaveAuthJson(preProcRs, 'EA'); //인증요청정보 저장값
		
		saveAuthResult.code = saveAuthentication(reqJson, saveAuthData, null); //온라인 인증 요청정보 저장 요청 (후처리함수 없음)
		
		if(saveAuthResult.code != '0000') {
			saveAuthResult.message = 'Payment Error (saveAuthentication Fail)';
		}
		
	} else if (_pay_payTypeCd == 'KP' || _pay_payTypeCd == 'NP' || _pay_payTypeCd == 'TS' || _pay_payTypeCd == 'JL') {
		//카카오, 네이버, 토스 인증요청
		reqJson = {reserveId: preProcRs.reserveId}; //인증요청정보
		saveAuthData = this.createSaveAuthJson(preProcRs, 'CL'); //인증요청정보 저장값
	
		saveAuthResult.code = saveAuthentication(reqJson, saveAuthData, null); //온라인 인증 요청정보 저장 요청 (후처리함수 없음)
		
		if(saveAuthResult.code == '0000') {
			
			//결제수단에 맞춰 팝업 오픈
			if (_pay_payTypeCd == 'KP') {
				_pay_requestWindow = window.open(preProcRs.checkoutPage, "requestKakaoPay2", "top=100,left=" + ((screen.width/2) - 375) + ",width=400,height=500,menubar=no,location=no,status=no,toolbar=no,scrollbars=yes");
			} else if(_pay_payTypeCd == 'NP') {
				_pay_requestWindow = window.open(preProcRs.checkoutPage, "requestNaverPay", "top=100,left=" + ((screen.width/2) - 375) + ",width=750,height=830,menubar=no,location=no,status=no,toolbar=no,scrollbars=yes");
			} else if(_pay_payTypeCd == 'TS') {
				
				var checkoutPage = preProcRs.checkoutPage;

				_pay_requestWindow = window.open(checkoutPage, "requestToss", "top=100,left=" + ((screen.width/2) - 375) + ",width=400,height=500,menubar=no,location=no,status=no,toolbar=no,scrollbars=yes");
			} else if(_pay_payTypeCd == 'JL') {
				_pay_requestWindow = window.open(preProcRs.checkoutPage, "requestLinePay", "top=100,left=" + ((screen.width/2) - 375) + ",width=750,height=830,menubar=no,location=no,status=no,toolbar=no,scrollbars=yes");
			}
			
			if (navigator.userAgent.toUpperCase().indexOf("SAFARI") != -1 
				&& /iPhone|iPad|iPod/i.test(navigator.userAgent) 
				&& _pay_channelCd != 'PC' ) {
				
				//모바일 사파리 팝업 차단 시 브라우저에서 팝업차단 메시지 표출되지않아 추가
				if (_pay_requestWindow == null) {
					saveAuthResult.code = '0002';
					saveAuthResult.message = '사파리 브라우저 팝업차단 설정을 해제 해 주세요'
					
				}	
			}
		} else {
			saveAuthResult.message = 'Payment Error (saveAuthentication Fail)';
		}
	} else if(_pay_payTypeCd == 'CP') {
		//CU편의점 테스트용 임시 처리
		reqJson = {reserveId: preProcRs.checkoutPage}; //인증요청정보 (일본편의점은 인증창 오픈시 요청값이 없음으로 호출 url저장)
		saveAuthData = this.createSaveAuthJson(preProcRs, 'CL'); //인증요청정보 저장값
		
		saveAuthResult.code = saveAuthentication(reqJson, saveAuthData, null); //온라인 인증 요청정보 저장 요청 (후처리함수 없음)
		
		if(saveAuthResult.code != '0000') {
			saveAuthResult.message = 'Payment Error (saveAuthentication Fail)';
		}
		
	} else { //--------------그 외 form에 값 주입해서 팝업으로 submit하는경우의 결제수단들--------------//
		
		var payForm = $('<form name="_pay_approveFrm" id="_pay_approveFrm" method="post"></form>');

		payForm.appendTo('body');
		
		var frmData = document.getElementById('_pay_approveFrm');
	    
		//--------------STEP 1. 결제창 오픈에 필요한 값들을 Form에 셋팅--------------//
		makePayDefaultForm(preProcRs);

		//--------------STEP 2. 인증창 오픈 (Popup or Iframe)--------------//
	    //KFTC, 이니시스 간편결제(삼성페이) PC는 IFRAME
	    if ( (_pay_payTypeCd == 'KC' || _pay_payTypeCd == 'SP') && _pay_channelCd == 'PC') {
			_pay_requestWindow = null;
	    	$('#PAY_FRAME').remove();
	    	var payFrame = $('<iframe name="PAY_FRAME" id="PAY_FRAME" method="post" style="display:none;"></iframe>');

			payFrame.appendTo('body');

			frmData.target = 'PAY_FRAME';
	    } else {
		    var pop_title = "popup_window" ;
		      
		   _pay_requestWindow =  window.open("about:blank", pop_title, "width=820, height=600, scrollbars=yes");

		    frmData.target = pop_title;
	    }

		//모바일 사파리 팝업 차단 시 브라우저에서 팝업차단 메시지 표출되지않아 추가
		if (navigator.userAgent.toUpperCase().indexOf("SAFARI") != -1 
			&& /iPhone|iPad|iPod/i.test(navigator.userAgent) 
			&& _pay_channelCd != 'PC' ) {
				
			if (_pay_requestWindow == null) {
				saveAuthResult.code = '0002',
				saveAuthResult.message = '사파리 브라우저 팝업차단 설정을 해제 해 주세요'
			}	
		}
	    
	    frmData.action = _pay_paymentRootURL+'/pacg/approve/requestApproval.do';
	    frmData.submit(); //인증창 오픈
	    
	    $('form[name=_pay_approveFrm]').remove();
	}
    
	return saveAuthResult;
	
}

/**
 * 카카오, 네이버, 토스, 일본/CU 편의점의 경우 requestXXX 팝업을 띄워 이동하는 식이 아니라
 * 부모페이지에서 SaveAuth데이터를 만듦
 */
function createSaveAuthJson(preProcRs, fopTypeCd) {
	
	var paySaleTypeCd;
	
	if ( isUndefined(typeof _pay_saleTypeCd == 'undefined') ) { 
		paySaleTypeCd = 'NOR';
	} else {
		paySaleTypeCd = _pay_saleTypeCd;
	}
	
	var paxName = this.getPaxName();
	var agentId = isUndefined(typeof _pay_agentId) ? _pay_pnrDataObj.sales.created.agentCode : _pay_agentId;
	
	//온라인 인증 요청정보 저장 요청값 세팅
	var saveAuthData = {
			systemType: _pay_systemType
			, channelCd: _pay_channelCd
			, productTypeCd: _pay_productTypeCode
			, saleTypeCd: paySaleTypeCd
			, orderId: preProcRs.orderId
			, mid: _pay_mid
			, currencyCd: _pay_currency
			, pnrNo: _pay_pnrDataObj.recordLocator
			, fopTypeCd: fopTypeCd
			, payTypeCd: _pay_payTypeCd
			, payTypeDetailCd: _pay_payTypeDetailCd
			, bookingKey: _pay_pnrDataObj.bookingKey
			, token: _pay_pssToken
			, amount: _pay_amount
			, productNm: _pay_productName
			, userId: _pay_loginUserId
			, paxName: paxName
			, telNo: _pay_pnrDataObj.contacts[Object.keys(_pay_pnrDataObj.contacts)[0]].phoneNumbers[0].number
			, email: _pay_pnrDataObj.contacts[Object.keys(_pay_pnrDataObj.contacts)[0]].emailAddress
			, agentId: agentId
			, cultureCd: _pay_cultureCd
			, bookType: _pay_bookType
	};
	
	if (_pay_bookType == 'Voucher') {
		saveAuthData.additionalParam = {
			"voucherReferenceNo": isUndefined(typeof _pay_voucherReferenceNo) ? "" : _pay_voucherReferenceNo,
			"voucherAmount": isUndefined(typeof _pay_voucherAmount) ? "" : _pay_voucherAmount,
			"voucherCurrencyCode": isUndefined(typeof _pay_voucherCurrencyCode) ? "" : _pay_voucherCurrencyCode
		};
	} else {
		saveAuthData.additionalParam = {
			"pointFfpNo": isUndefined(typeof _pay_ffpNo) ? "" : _pay_ffpNo,
			"pointCustNo": isUndefined(typeof _pay_custNo) ? "" : _pay_custNo,
			"ffpName": isUndefined(typeof _pay_userName) ? "" : _pay_userName
		};
	}

	return saveAuthData;
	
}

/**
 * 인증요청정보 저장 요청
 * 
 * @param requestApprovalData
 *            채널->payment was로 요청한 값
 * @param formData
 *            각 결제수단 인증요청 Form의 데이터
 * @param approveFunction
 *            인증요청정보 저장 후 PG 요청창을 띄우는 함수
 * 
 * @returns
 */
function saveAuthentication(reqJson, saveAuthData, approveFunction) {

	saveAuthData.reqJson = reqJson;
	saveAuthData.responseCd = "0001" //응답코드 Not Null이어서 임시로 넣어둠

	var data = JSON.stringify(saveAuthData);
	
	var returnCode = null;
	
	$.ajax({
		async : false,
		type : "post",
		dataType : "json",
		contentType : "text/plain; charset=utf-8",
		data : data,
		url : _pay_paymentRootURL+"/pacg/approve/saveAuthentication.do",
		beforeSend: function(request){
			request.setRequestHeader("User-Id", saveAuthData.userId);
			request.setRequestHeader("Pnr", saveAuthData.pnrNo);
			request.setRequestHeader("User-Name", encodeURIComponent(saveAuthData.paxName));
			request.setRequestHeader("Order-Id", saveAuthData.orderId);
		},
		success : function(result) {
			if(result.code == 0000) {
				returnCode = '0000';
				
				if(approveFunction != null) {
					approveFunction(result);
				}
				
			} else {
				returnCode = '9999';
				alert("saveAuthentication error code: "+result.code+ ', message: '+ result.message);
			}
			
		},
		error : function(request,status,error){
			returnCode = '9999';
			alert('에러');
			//pacg/approveFunction(result);
		}
	});
	
	return returnCode;
}


/**
 * 승인상태 체크 풀링 함수
 * orderId: 주문번호
 * afterFunction: 승인상태 체크 후 발현함수
 * inquireApprovalFlag: 일본결제 승인 후 승인상태 체크 구분을 위한 Flag (optional)
 */
function checkPaymentStat(orderId, afterFunction, inquireApprovalFlag) {

	var checkTime = 5*1000; //5초
	var timeout = 20*60*1000; //20분
	
	clearInterval(_pay_CheckInterval);
	_pay_CheckInterval = window.setInterval(function() {
		
		checkPaymentStatAction(orderId, afterFunction, inquireApprovalFlag, true);
	
	}, checkTime);
	
	//20분 뒤에 풀링 멈춤
	window.setTimeout(function() {clearInterval(_pay_CheckInterval)}, timeout);
	
	
	return _pay_CheckInterval;
//	*/
}

/**
 * 승인상태 체크 풀링 함수
 * orderId: 주문번호
 * afterFunction: 승인상태 체크 후 발현함수
 * inquireApprovalFlag: 일본결제 승인 후 승인상태 체크 구분을 위한 Flag (optional)
 * isPolling: 해당 요청이 풀링시 사용된것인지 구분값 (일본카드 폴링 시 3dcheck후 재귀로 결제상태 체크 호출 시 필요)
 * isBack: 이전버튼을 클릭했을때인지 구분값 (결제상태가 어떻던간에 후동작 발생)
 */
function checkPaymentStatAction(orderId, afterFunction, inquireApprovalFlag, isPolling, isBack) {
		
	var isCloseCheckAble = true;
	
	var agent = navigator.userAgent.toLowerCase();
	
	
	//OC, PL, WC, KC는 팝업닫힘 체크 x
	//if ( ( navigator.userAgent.search('Trident') != -1 || agent.indexOf("msie") != -1 ) && (_pay_payTypeCd == 'KC' || _pay_payTypeCd == 'PL' || _pay_payTypeCd == 'OC' || _pay_payTypeCd == 'WC')) {
	
	//IE11은 팝업닫힘 체크 x
	if (window.MSInputMethodContext && !!document.documentMode) {
		isCloseCheckAble = false;
	}
	
	var isClosed = (_pay_requestWindow != null && _pay_requestWindow.closed && _pay_isAthenDone == false) || _pay_isUserCancel;
	
	//결제창이 차단되어 팝업창 객체 null이거나 인증창이 닫힘 & 인증이 끝나지않은 상황일때 5초 대기 후 결제상태 확인하기로 함 2021.10.26
	if( (_pay_requestWindow == null || isClosed) && isCloseCheckAble ) {
		var start = new Date().getTime(); 
		
		while (new Date().getTime() < start + 5000); //5초간 대기 
	}
	
	//일본카드 결제일경우 3DCheck로 인증완료 여부 확인 후에 인증 후 처리 진행.
	if(_pay_payTypeCd == 'JO' && inquireApprovalFlag != true) {
		
		var reqJson = {
				sessionIdBy3dSecure: _pay_3DSSessionId
			    , cultureCd: _pay_cultureCd
		};
		
		//3DCheck 실행
		$.ajax({
			async : false,
			type : "post",
			dataType : "json",
			contentType : "text/plain; charset=utf-8",
			accept : "application/json", 
			data : JSON.stringify(reqJson),
			url : _pay_paymentRootURL+"/pacg/approve/checkJapan3dsInfo.do",
			beforeSend: function(request){
				setBaseBeforeRq(request);
				request.setRequestHeader("Order-Id", orderId);
			},
			success : function(result) {
				
				if (result.code == "0000") {
					//3d secure 인증상태 Y인경우 다음 처리 진행
					if (result.data.chk3dsYn == "Y") {
						
						if(isPolling) {
							clearInterval(_pay_CheckInterval); //결제상태 조회 Interval 중지
							_pay_CheckInterval = checkPaymentStat(orderId, afterFunction, true); //checkPaymentStat함수 재귀호출, 승인여부 체크를 위해 inquireApprovalFlag에 해당하는값 true	
						} else {
							checkPaymentStatAction(orderId, afterFunction, true, false, isBack);
						}
						
						savePaymentApprovalForJPCard(orderId, afterFunction, _pay_CheckInterval); //인증 후 처리 요청
					} else {
						//결과가 Y가 아니어도 이전버튼 클릭이면 afterFunction 호출
						if(isBack) {
							var result = {
								code: '1003',
								message: 'press the back button',
								data: null
							}
							afterFunction(result);
						}	
					}
					
					
				} else {
					console.log("checkPaymentStat error code: "+result.code+ ', message: '+ result.message);
				}
			},
			error : function(request,status,error){
				//alert("결제 처리 중 오류가 발생하였습니다.");
			}
		});
	
	} else {
		
		$.ajax({
			async : false,
			type : "post",
			dataType : "json",
			contentType : "text/plain; charset=utf-8",
			data : JSON.stringify({orderId: orderId, cultureCd: _pay_cultureCd}),
			url : _pay_paymentRootURL+"/pacg/approve/inquireApprovalStatus.do",
			beforeSend: function(request){
				setBaseBeforeRq(request);
				request.setRequestHeader("Order-Id", orderId);
			},
			global: false,
			success : function(result) {
				
				if (result.code == '0000') { //결제상태 조회 정상 조회
					if (result.data.state == "Y") { //결제상태 Y = 결제완료
						if(isPolling) {
							clearInterval(_pay_CheckInterval); //결제상태 조회 Interval 중지
						}
						afterFunction(result); //채널에서 전달한 결제완료 후동작 함수 실행
					} else {
						//결과가 Y가 아니어도 이전버튼 클릭이면 afterFunction 호출
						if(isBack) {
							result = {
								code: '1003',
								message: 'press the back button',
								data: null
							}
							afterFunction(result);
						} else if(!isPolling) {
							afterFunction(result);
						}
						
						//결제창이 차단되어 팝업창 객체 null이거나 인증창이 닫힘 & 인증이 끝나지않은 상황일때
						if( (_pay_requestWindow == null || isClosed) && isCloseCheckAble ) {
							clearInterval(_pay_CheckInterval);
							_pay_requestWindow = null;
							var result = {
								code: '1002',
								message: '사용자가 결제를 취소하였습니다.',
								data: null
							}
							afterFunction(result);
							return false;
						}
							
					}
				} else { //결제상태 조회 에러
					console.log("checkPaymentStat error code: "+result.code+ ', message: '+ result.message);
					
					//승인시 에러인경우 알럿으로 보여주기로
					if(result.code == 'PAYESV006') {
						alert(result.message);
					}
					
					if(isPolling) {
						clearInterval(_pay_CheckInterval); //결제상태 조회 Interval 중지
					}
					afterFunction(result); //채널에서 전달한 결제완료 후동작 함수 실행
				}
			},
			error : function(request,status,error){
				
				//afterFunction(result);
			}
		});
		
	}
	
}

/**
 * 이전버튼 클릭시 결제동작 취소 함수
 * orderId: 주문번호
 * afterFunction: 후속함수 (결제확인 결과 후속함수. 결과가 결제완료가 아니어도 무조건 호출)
 */
function paymentBack(orderId, afterFunction) {
	
	//5초 후 동작
	window.setTimeout(function() {
		checkPaymentStatAction(orderId, afterFunction, false, false, true);
		
		if (_pay_requestWindow != null && _pay_requestWindow != {}) {
			_pay_requestWindow.close();
		}
		
		clearInterval(_pay_CheckInterval);
	}, 5000);
	
	
}

/**
 * 인증(인증/승인) 후처리 ajax call
 * 210319 일본카드의 경우만 승인요청을 따로 call함
 * @returns
 */
function savePaymentApprovalForJPCard(orderId, afterFunction, _pay_CheckInterval) {
	
	var paxName = this.getPaxName();
	
	var joCardApprovalData = {
			itemName: _pay_productName
			, pnrNo: _pay_pnrDataObj.recordLocator
			, econCardno: _pay_cardNo
			, sessionID: _pay_3DSSessionId
			, cardExpdate: _pay_expireDate
			, CVV2: _pay_CVV
			, ordAmount: _pay_amount
			//, ordAmountTax: 
			//, commission: 
			, telNo: _pay_pnrDataObj.contacts[Object.keys(_pay_pnrDataObj.contacts)[0]].phoneNumbers[0].number
			, paxName: paxName
			, email: _pay_pnrDataObj.contacts[Object.keys(_pay_pnrDataObj.contacts)[0]].emailAddress
			, userId: _pay_loginUserId
			//, resmasterSeqNo: ''
	};
	
	//인증 후처리 요청 시작
	joCardApprovalData.orderId = orderId;
	joCardApprovalData.cultureCd = _pay_cultureCd;
	$.ajax({
		async : false,
		type : "get",
		contentType : "text/plain; charset=utf-8",
		data : joCardApprovalData,
		url : _pay_paymentRootURL+"/pacg/approve/savePaymentApprovalForJapanCard/"+_pay_channelCd+".do",
		beforeSend: function(request){
			request.setRequestHeader("User-Id", _pay_loginUserId);
			request.setRequestHeader("Pnr", _pay_pnrDataObj.recordLocator);
			request.setRequestHeader("User-Name", encodeURIComponent(paxName));
			request.setRequestHeader("Order-Id", orderId);
		},
		success : function(result) {
					
		},
		error : function(request,status,error){
			afterFunction();
			console.log(error.message);
		}
	});
	//일본카드 승인 끝
}



/*
 * 자체페이 결제수단 조회 함수
 */
function getJJPayList(afterFunction, promotionTypeCd, promotionCardCd) {

	promotionTypeCd = isUndefined(typeof promotionTypeCd) ? "" : promotionTypeCd;
	promotionCardCd = isUndefined(typeof promotionCardCd) ? "" : promotionCardCd;
	
	if( "0" == promotionTypeCd ) {
		promotionTypeCd = "01";
	} else if( "1" == promotionTypeCd ) {
		promotionTypeCd = "16";
	}
	
	$.ajax({
		async : false,
		type : "post",
		dataType : "json",
		contentType : "text/plain; charset=utf-8",
		data : JSON.stringify({
			mid: _pay_mid,
			wpayUserKey: _pay_reserved1,
			ci:"",
			payMethod: promotionTypeCd,
			bankCardCode: promotionCardCd
		}),
		url : _pay_paymentRootURL+"/pacg/jjpay/inquireJjPayUserInfo.do",
		beforeSend: function(request){
			setBaseBeforeRq(request);
		},
		success : function(result) {
			
			var resultStr = JSON.stringify(result);
			resultStr = decodeURIComponent(resultStr);
				
			if(result.code == 0000 ){
				
				afterFunction(JSON.parse(resultStr));
			} else {
				afterFunction(JSON.parse(resultStr));
			}
			
		},
		error : function(request,status,error){
			afterFunction();
		}
	});
}

/*
 * 자체페이 결제수단 등록 or 가입 함수
 */
function addJJPay() {
	
	if(_pay_reserved1 != null && _pay_reserved1 != "") {
		popAddJJPay(); //이미 자체페이 멤버인경우 결제수단 추가 화면 팝업
	} else {
		popJoinJJPay(); //자체페이 멤버가 아닌경우 자체페이 가입 화면 팝업 
	}
	
}

/*
 * 자체페이 결제수단 등록 팝업 함수
 */
function popAddJJPay() {
	
	var payForm = $('<form name="_pay_addJJPayFrm" id="_pay_addJJPayFrm" method="post"></form>');

	payForm.appendTo('body');
	
	var frmData = document._pay_addJJPayFrm ;
	
	// 결제창 오픈에 필요한 값들을 Form에 셋팅
	$('#_pay_addJJPayFrm').append('<input type="hidden" name="mid" value="'+_pay_mid+'">');
	$('#_pay_addJJPayFrm').append('<input type="hidden" name="wpayUserKey" value="'+_pay_reserved1+'">');
	$('#_pay_addJJPayFrm').append('<input type="hidden" name="ci" value="">');
	$('#_pay_addJJPayFrm').append('<input type="hidden" name="payMethod" value="">');
	$('#_pay_addJJPayFrm').append('<input type="hidden" name="bankCardCode" value="">');
	$('#_pay_addJJPayFrm').append('<input type="hidden" name="payTypeDetailCd" value="'+_pay_payTypeDetailCd+'">');

    frmData.action = _pay_paymentRootURL+"/pacg/jjpay/choiceJJPayMethod.do";
    
    var pop_title = "popup_window" ;
    frmData.target = pop_title;
    
	window.open("", pop_title, "width=820, height=650, scrollbars=yes");
	
    frmData.submit(); //인증창 오픈
    
    $('form[name=_pay_addJJPayFrm]').remove();
}


/*
 * 자체페이 회원가입 팝업 호출 함수
 */
function popJoinJJPay() {
	
	var payForm = $('<form name="_pay_addJJPayFrm" id="_pay_addJJPayFrm" method="post"></form>');
	payForm.appendTo('body');
	
	var frmData = document._pay_addJJPayFrm ;
	
	// 결제창 오픈에 필요한 값들을 Form에 셋팅
	$('#_pay_addJJPayFrm').append('<input type="hidden" name="mid" value="'+_pay_mid+'">');
	$('#_pay_addJJPayFrm').append('<input type="hidden" name="userId" value="'+_pay_loginUserId+'">');

    var pop_title = "popup_window" ;
    frmData.target = pop_title;
      
    window.open("", pop_title, "width=450, height=600, scrollbars=yes");

	// 10.25 : 위의 payForm 생성 로직에서 여기로 변경함
	frmData.action = _pay_paymentRootURL+'/pacg/jjpay/JP1/requestRegJjPayUser.do';
    frmData.submit(); //인증창 오픈
    
    $('form[name=_pay_addJJPayFrm]').remove();
}

/*
 * 자체페이 주 결제수단 설정 함수
 */
function regJJPayMainPay(wpayToken, type, afterFunction) {
	
	$.ajax({
		async : true,
		type : "post",
		dataType : "json",
		contentType : "text/plain; charset=utf-8",
		data : JSON.stringify({
			mid: _pay_mid,
			wpayUserKey: _pay_reserved1,
			wpayToken: wpayToken,
			type: type
		}),
		url : _pay_paymentRootURL+"/pacg/jjpay/requestRegJJPayMainCard.do",
		beforeSend: function(request){
			setBaseBeforeRq(request);
		},
		success : function(result) {
			afterFunction(result);
		},
		error : function(request,status,error){
			afterFunction(result);
		}
	});

}

/*
 * 자체페이 결제수단 삭제 함수
 */
function deleteJJPay(wpayToken, afterFunction) {
	
	
	$.ajax({
		async : true,
		type : "post",
		dataType : "json",
		contentType : "text/plain; charset=utf-8",
		data : JSON.stringify({
			mid: _pay_mid,
			wpayUserKey: _pay_reserved1,
			wpayToken: wpayToken,
			ci:""
		}),
		url : _pay_paymentRootURL+"/pacg/jjpay/deleteJjPayUserCard.do",
		beforeSend: function(request){
			setBaseBeforeRq(request);
		},
		success : function(result) {
			afterFunction(result);
		},
		error : function(request,status,error){
			afterFunction(result);
		}
	});

}

/*
 * 자체페이 비밃번호 변경 함수
 */
function changeJJPayPwd(afterFunction) {

	var payForm = $('<form name="_pay_chgJJPayFrm" id="_pay_chgJJPayFrm" method="post"></form>');

	payForm.appendTo('body');
	
	var frmData = document._pay_chgJJPayFrm;

	$('#_pay_chgJJPayFrm').append('<input type="hidden" name="mid" value="'+_pay_mid+'">');
	$('#_pay_chgJJPayFrm').append('<input type="hidden" name="wpayUserKey" value="'+_pay_reserved1+'">');

    var pop_title = "popup_window" ;
    frmData.target = pop_title;
      
    window.open("", pop_title, "width=820, height=600, scrollbars=yes");
    
	// 10.25 : 위의 payForm 생성 로직에서 여기로 변경함
	frmData.action = _pay_paymentRootURL+'/pacg/jjpay/JP1/requestChgJjPayPwd.do';
    frmData.submit(); //인증창 오픈
     
    $('form[name=_pay_chgJJPayFrm]').remove();
	
}

/*
 * 자체페이 서비스 해지 함수
 */
function withdrawJJPay(afterFunction) {
	
	$.ajax({
		async : false,
		type : "post",
		dataType : "json",
		contentType : "text/plain; charset=utf-8",
		data : JSON.stringify({
			mid: _pay_mid,
			userId: _pay_loginUserId,
			wpayUserKey: _pay_reserved1,
			ci: "",
			payTypeDetailCd: _pay_payTypeDetailCd
		}),
		url : _pay_paymentRootURL+"/pacg/jjpay/requestUnregisterJJPay.do",
		beforeSend: function(request){
			setBaseBeforeRq(request);
		},
		success : function(result) {
			afterFunction(result);
		},
		error : function(request,status,error){
			afterFunction(result);
		}
	});
}

/*
 * 즉시할인정보조회 ( "": 전체, else 각코드별 복수건 또는 단건 )
 */
function reqestJJPayDiscInfosAll(bankCardCode, afterFunction) {
	
	$.ajax({
		async : false,
		type : "post",
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify({
			mid: _pay_mid,
			bankCardCode: bankCardCode
		}),
		url : _pay_paymentRootURL+"/pacg/jjpay/reqestJJPayDiscInfosAll.do",
		beforeSend: function(request){
			setBaseBeforeRq(request);
		},
		success : function(result) {
			afterFunction(result);
		},
		error : function(request,status,error){
			afterFunction(result);
		}
	});
}

/*
 * 자체페이 현금영수증 정보 조회
 */
function requestJJPayRecpInfo(afterFunction) {
	
	var wpayUserKey = getSeedEncrypt(_pay_reserved1);
	
	$.ajax({
		async : false,
		type : "post",
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify({
			mid: _pay_mid,
			wpayUserKey: wpayUserKey,
			cultureCd: _pay_cultureCd
		}),
		url : _pay_paymentRootURL+"/pacg/jjpay/requestJJPayRecpInfo.do",
		beforeSend: function(request){
			setBaseBeforeRq(request);
		},
		success : function(result) {
			afterFunction(result);
		},
		error : function(request,status,error){
			afterFunction(result);
		}
	});
}

/*
 * 자체페이 현금영수증 정보 관리
 * type 1 or 2 일 때  (1,2: 등록수정 / 3:삭제)
 * cshRefcpCode, cshRecpInfo 필수 이며 3일 땐 사용 x
 * cshRefcpCode 1:개인2:사업자
 * cshRecpInfo : 폰번호/주민번호/사업자등록번호
 */
function handleJJPayRecpInfo(type, cshRefcpCode, cshRecpInfo, afterFunction) {
	
	var wpayUserKey = getSeedEncrypt(_pay_reserved1);
	cshRecpInfo = getSeedEncrypt(cshRecpInfo); //암호화해서 값 재정의
	
	$.ajax({
		async : false,
		type : "post",
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify({
			mid: _pay_mid,
			wpayUserKey: wpayUserKey,
			type: type,
			cshRecpCode: cshRefcpCode,
			cshRecpInfo: cshRecpInfo
		}),
		url : _pay_paymentRootURL+"/pacg/jjpay/handleJJPayRecpInfo.do",
		beforeSend: function(request){
			setBaseBeforeRq(request);
		},
		success : function(result) {
			afterFunction(result);
		},
		error : function(request,status,error){
			afterFunction(result);
		}
	});
}

/*
 * LG유플러스 결제요청 함수
 */
function requestLGApproval(requestData, afterFunction) {
	
	if (requestData.orderId == null || isUndefined(typeof requestData.orderId)) {
		return false;
	}
	
	if (requestData.ffpNo == null || isUndefined(typeof requestData.ffpNo)) {
		alert('사용자 포인트 번호가 존재하지 않습니다.\n고객센터에 문의 해 주시기 바랍니다.');
		return false;
	}
	
	if ($('form[name="_pay_approveFrm"]').length > 0)  {
		$('form[name=_pay_approveFrm]').remove();
	}
	if ($('iframe[name="LG_PAY_FRAME"]').length > 0)  {
		$('iframe[name=LG_PAY_FRAME]').remove();
	}
	
	var target = requestData.deviceType == 'P' ? "LG_PAY_FRAME" : "lguWindow";
	
	var appendHtml = '<form name="_pay_approveFrm" id="_pay_approveFrm" method="post" target="'+target+'" action="'+_pay_paymentRootURL+'/pacg/approve/requestLGApproval.do">';
	appendHtml += '<input type="hidden" name="orderId" value="'+requestData.orderId+'">';
	appendHtml += '<input type="hidden" name="amount" value="'+requestData.amount+'">';
	appendHtml += '<input type="hidden" name="buyer" value="'+requestData.buyer+'">';
	appendHtml += '<input type="hidden" name="productInfo" value="'+requestData.productInfo+'">';
	appendHtml += '<input type="hidden" name="loginId" value="'+requestData.loginId+'">';
	appendHtml += '<input type="hidden" name="pointFfpNo" value="'+requestData.ffpNo+'">';
	appendHtml += '<input type="hidden" name="targetFfpNo" value="'+requestData.targetFfpNo+'">';
	
	appendHtml += '<input type="hidden" name="email" value="'+requestData.email+'">';
	appendHtml += '<input type="hidden" name="usablePay" value="'+requestData.usablePay+'">';
	appendHtml += '<input type="hidden" name="cultureCd" value="'+requestData.cultureCd+'">';
	appendHtml += '<input type="hidden" name="deviceType" value="'+requestData.deviceType+'">';
	appendHtml += '<input type="hidden" name="productCode" value="'+requestData.productCode+'">';
	appendHtml += '<input type="hidden" name="productTypeCd" value="'+requestData.productTypeCd+'">';

	appendHtml += '<input type="hidden" name="parentFnName" value="'+afterFunction.name+'">';
	appendHtml += '</form>';
	$(appendHtml).appendTo('body');
	
	//PC는 Iframe내에서 팝업, 모바일은 Iframe자체가 submit
	var payFrameStyle = "display:block;";//requestData.deviceType == 'P' ? 'display:none;' : 'z-index:99999;top:0;left:0;position:fixed;height:100%; width:100%;';
	
	if(requestData.deviceType == 'P') {
		var payFrame = $('<iframe name="LG_PAY_FRAME" id="LG_PAY_FRAME" method="post" style="display:none;" src=""></iframe>');
		payFrame.appendTo('body');
	} else {
		var lguWindow = window.open("about:blank", "lguWindow", "width=820, height=600, scrollbars=yes");	
	}
	
	var frmData = document._pay_approveFrm ;
	
    frmData.submit(); //인증창 오픈
    
    $('form[name=_pay_approveFrm]').remove();
}

//Form to JsonObject
$.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
    	var name = $.trim(this.name),
    		value = $.trim(this.value);
    	
        if (o[name]) {
            if (!o[name].push) {
                o[name] = [o[name]];
            }
            o[name].push(value || '');
        } else {
            o[name] = value || '';
        }
    });
    return o;
};

/**
 * 데이터를 알파벳 순서대로 정렬한다
 * 
 * @param data
 * 정렬하려는 object형 데이터
 * @returns
 */
function sortData(data) {
	
	// object를 키 이름으로 정렬하여 반환
	{
	    var sorted = {},

	    key, a = [];
	    
	    // 키이름을 추출하여 배열에 집어넣음
	    for (key in data) {
	        if (data.hasOwnProperty(key)) a.push(key);
	    }

	    // 키이름 배열을 정렬
	    a.sort();

	    // 정렬된 키이름 배열을 이용하여 object 재구성
	    for (key=0; key<a.length; key++) {
	        sorted[a[key]] = data[a[key]];
	    }
	    
	    return sorted;
	}
}

/**
 * 데이터를 GET형태의 늘어뜨린 String으로 변환한다
 * 
 * @param data
 * 변환하려는 object형 데이터
 * @returns formDataStr
 * String형으로 변환한 form 데이터
 */
function toGetFormat(data) {
	
	var formDataStr = '';
	var isFirst = true;
	
	for (key in data) {
		
		if ("fgkey" == key) continue;
		
		var value = data[key];
	
		if (isFirst) {
			formDataStr += "?" + key + "=" + value;
			isFirst = false;
		} else {
			formDataStr += "&" + key + "=" + value;
		}
	
	}
	
	return formDataStr;
}

/* 
 * Seed암호화. 자체페이 사용
 * @param str
 * 암호화하려는 문자열 데이터
 * @returns encryptVal
 * 암호화한 데이터
 */
function getSeedEncrypt(str) {
	var encryptVal = '';
	$.ajax({
		async : false,
		type : "post",
		dataType : "json",
		contentType : "text/plain; charset=utf-8",
		data : JSON.stringify({
			strVal: str,
			encryptType: _pay_payTypeDetailCd
		}),
		url : _pay_paymentRootURL+"/pacg/approve/getSeedEncrypt.do",
		success : function(result) {
			encryptVal = result.data;
		},
		error : function(request,status,error){
			encryptVal = "";
		}
	});
	return encryptVal;
	
}

/** 결제수단에 나오면 안되는경우를 필터링한다
 */
function payListFilter(payListResult, saleTypeCd){
	for (var i=0; i<payListResult.payTypeList.length; i++) {
		var payTypeList = payListResult.payTypeList[i];
		if(payTypeList.payTypeDetailList) {
			for (var j=0; j<payTypeList.payTypeDetailList.length; j++) {
				var payTypeDetail = payTypeList.payTypeDetailList[j];
				
				if (saleTypeCd != 'SPC' && saleTypeCd != 'JPM') {
					//편의점결제인경우 필터링 출발일 -4일전엔 편의점결제 불가 ex)11/15일 출발인경우 11/10일 23:59까지만 노출함
					if(payTypeDetail.payTypeCd == 'CP' || payTypeDetail.payTypeCd == 'JA') {
						if (!isConviAble(_pay_pnrDataObj.journeys[0].designator.departure) ) {
							payListResult.payTypeList[i].payTypeDetailList.splice(j, 1); //결제수단에서 제거
							
							//결제수단 그룹에 모든 결제수단이 제거됐을경우 그룹도 제거
							if(payListResult.payTypeList[i].payTypeDetailList.length == 0) {
								payListResult.payTypeList.splice(i,1);
							}
						}
						
					}
				}
				
				//IOS는 삼성페이 제외
				if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && payTypeDetail.payTypeCd == 'SP') {
					payListResult.payTypeList[i].payTypeDetailList.splice(j, 1); //결제수단에서 제거
				}
				
			}
		}
	}
	
	return payListResult;
}

/**편의점 결제 가능여부 판단.
 */
function isConviAble(depDate) {
	var jsResultDate  = 0;	// 계산된 날짜
	
	depDate = depDate.replace(/[^0-9]/g, '');
	var jsFltDate  = new Date(depDate.substr(0,4), Number(depDate.substr(4,2))-1, depDate.substr(6,2));
	var jsCurrDate = new Date();
	
	jsResultDate = Math.ceil((jsFltDate.getTime() - jsCurrDate.getTime()) / (1000 * 60 * 60 * 24));
	
	// 현재일 + 4 이전 예약에 대해서는 E-Context 현금(편의점) 결제를 제한한다.
	if (jsResultDate <= 4) {
		return false;	
	}
	
	return true;
}


function getPaxName() {
	
	//회원이름이 없다면 (비회원인경우) 첫번째 탑승자명으로 대체
	var paxName = '';
	
	if(isUndefined(typeof _pay_paxName)) {
		if (!isUndefined(typeof _pay_pnrDataObj) ) {
			if ( !isUndefined(typeof _pay_pnrDataObj.passengers) ) {
				var passengers = _pay_pnrDataObj.passengers;
				
				var delimiter = '';
				if (!isUndefined(typeof _pay_payTypeCd) ) {
					delimiter = (_pay_payTypeCd == 'JA' || _pay_payTypeCd == 'JO') ? '/':''; //구분자. 일본 결제는 성/이름으로 나누어서 사용
				}
				
				paxName = passengers[Object.keys(passengers)[0]].name.last +delimiter+ passengers[Object.keys(passengers)[0]].name.first;
				
				//KRP는 특수문자 제거
				if (!isUndefined(typeof _pay_payTypeCd) ) {
					if(_pay_payTypeCd == 'OC' || _pay_payTypeCd == 'WC' || _pay_payTypeCd == 'PL') {
						paxName = paxName.replace(/[^A-Za-z가-힣]/gi, ' ');
					}
				}
			}
		}
	} else {
		paxName = _pay_paxName;
		
		//KRP는 특수문자 제거
		if(_pay_payTypeCd == 'OC' || _pay_payTypeCd == 'WC' || _pay_payTypeCd == 'PL') {
			paxName = paxName.replace(/[^A-Za-z가-힣]/gi, ' ');
		}
	}
	
	//byte로 자르기
	for(b=i=0;c=paxName.charCodeAt(i);) {

		b+=c>>7?3:1; //UTF-8 3byte
		
		if (b > 30) break; //30byte
		
		i++;
		
	}

	paxName = paxName.substring(0,i); //이름 30byte로 제한 (결제사중 이름필수, 최소길이인 이니시스 기준)
	
	return paxName;
}

/**
 * 페이팔 결제시 사용되는 파라미터 Airline관련 데이터 생성
 */
function makeAirlineData() {
	var airLineData = "";
	
	var depDates = "";
	var depStns = "";
	var arrStns = "";
	var fltNos = "";
	var fareBasises = "";
	
	var delimiter = "";
	
	for (var i=0; i < _pay_pnrDataObj.journeys.length; i++) {
		
		if (0 < i) delimiter = "/";
		
		depDates += (delimiter + _pay_pnrDataObj.journeys[i].designator.departure.replace(/[^0-9]/g, ''));
	/*	
		depStns += (delimiter + _pay_pnrDataObj.journeys[i].designator.destination);
		arrStns += (delimiter + _pay_pnrDataObj.journeys[i].designator.origin);
	*/	
		depStns += (delimiter + _pay_pnrDataObj.journeys[i].designator.origin); 
		arrStns += (delimiter + _pay_pnrDataObj.journeys[i].designator.destination);
		fltNos += (delimiter + _pay_pnrDataObj.journeys[i].segments[0].identifier.identifier);
		fareBasises += (delimiter + _pay_pnrDataObj.journeys[i].segments[0].fares[0].fareBasisCode);
	}
	
	airLineData += "|depDate=";
	airLineData += depDates;
	
	airLineData += "|depStn=";
	airLineData += depStns;
	
	airLineData += "|arrStn=";
	airLineData += arrStns;
	
	airLineData += "|fltNo=";
	airLineData += fltNos;
	
	airLineData += "|fareBasis=";
	airLineData += fareBasises;
	
	return airLineData;
}

function isUndefined(type) {
	if ( type ==="undefined" || type === null ){
		return true;
	}
	return false;
}

function setBaseBeforeRq(request) {
	request.setRequestHeader("User-Id", isUndefined(_pay_loginUserId) ? "" :  _pay_loginUserId);
	request.setRequestHeader("Pnr", isUndefined(_pay_pnrDataObj) ? "" :  _pay_pnrDataObj.recordLocator);
	if (!isUndefined(typeof _pay_userName)) {
		request.setRequestHeader("User-Name", encodeURIComponent(_pay_userName));
	} else {
		request.setRequestHeader("User-Name", encodeURIComponent(getPaxName()));
	}
}

/**
 * Form에 값을 셋팅하여 팝업창에서 PG사 화면으로 넘어가는경우 input셋팅 함수
 */
function makePayDefaultForm(preProcRs) {
	
	var paySaleTypeCd;
	if (isUndefined(typeof _pay_saleTypeCd)) { 
		paySaleTypeCd = 'NOR';
	} else {
		paySaleTypeCd = _pay_saleTypeCd;
	}
	
	//판매구분코드
	var quotabase;
	if (isUndefined(typeof _pay_quotabase)) { 
		quotabase = '';
	} else {
		quotabase = _pay_quotabase;
	}
	
	var paxName = this.getPaxName();
	var agentId = isUndefined(typeof _pay_agentId) ? _pay_pnrDataObj.sales.created.agentCode : _pay_agentId;
	
	var inputHtml = ''; 
	
	inputHtml += '<input type="hidden" name="systemType" value="'+_pay_systemType+'">';
	inputHtml += '<input type="hidden" name="channelCd" value="'+_pay_channelCd+'">';
	inputHtml += '<input type="hidden" name="productTypeCode" value="'+_pay_productTypeCode+'">';
	inputHtml += '<input type="hidden" name="mid" value="'+_pay_mid+'">';
	inputHtml += '<input type="hidden" name="currency" value="'+_pay_currency+'">';
	inputHtml += '<input type="hidden" name="payTypeCode" value="'+_pay_payTypeCd+'">';
	inputHtml += '<input type="hidden" name="payTypeDetailCode" value="'+_pay_payTypeDetailCd+'">';
	inputHtml += '<input type="hidden" name="token" value="'+_pay_pssToken+'">';
	inputHtml += '<input type="hidden" name="amount" value="'+_pay_amount+'">';
	inputHtml += '<input type="hidden" name="productName" value="'+_pay_productName+'">';
	inputHtml += '<input type="hidden" name="userId" value="'+_pay_loginUserId+'">';
	inputHtml += '<input type="hidden" name="paxName" value="'+paxName+'">';
	inputHtml += '<input type="hidden" name="cultureCd" value="'+_pay_cultureCd+'">';
	inputHtml += '<input type="hidden" name="bookType" value="'+_pay_bookType+'">';

	inputHtml += '<input type="hidden" name="email" value="'+_pay_pnrDataObj.contacts[Object.keys(_pay_pnrDataObj.contacts)[0]].emailAddress+'">';
	inputHtml += '<input type="hidden" name="telNo" value="'+_pay_pnrDataObj.contacts[Object.keys(_pay_pnrDataObj.contacts)[0]].phoneNumbers[0].number+'">';

	inputHtml += '<input type="hidden" name="pnrNo" value="'+_pay_pnrDataObj.recordLocator+'">';


	inputHtml += '<input type="hidden" name="orderId" value="'+preProcRs.orderId+'">';
	inputHtml += '<input type="hidden" name="checkoutPage" value="'+preProcRs.checkoutPage+'">';
	inputHtml += '<input type="hidden" name="androidAppScheme" value="'+preProcRs.android_app_scheme+'">';
	inputHtml += '<input type="hidden" name="iosAppScheme" value="'+preProcRs.ios_app_scheme+'">';

	inputHtml += '<input type="hidden" name="bookingKey" value="'+_pay_pnrDataObj.bookingKey+'">';
	inputHtml += '<input type="hidden" name="agentId" value="'+agentId+'">';
	inputHtml += '<input type="hidden" name="pnrNo" value="'+_pay_pnrDataObj.recordLocator+'">';
	inputHtml += '<input type="hidden" name="saleTypeCd" value="'+paySaleTypeCd+'">';
	
	inputHtml += '<input type="hidden" name="quotabase" value="'+quotabase+'">';
	
	if (typeof _pay_issuercountry == 'undefined') { 
		inputHtml += '<input type="hidden" name="issuercountry" value="">';
	} else {
		inputHtml += '<input type="hidden" name="issuercountry" value="'+_pay_issuercountry+'">';
	}
	
	//--------------STEP 1.1 결제수단별로 오픈에 필요한 값들을 추가로 Form에 셋팅--------------//
	inputHtml += addInputByPayType(preProcRs, paySaleTypeCd);
	
	//--------------STEP 1.2 포인트/바우처 결제시 필요한 추가정보를 Form에 셋팅--------------//
	inputHtml += addInputByBookType();
	
	$('#_pay_approveFrm').append(inputHtml);
}

/**
 * 결제수단별 추가 필요값 input 추가
 */
function addInputByPayType(preProcRs, paySaleTypeCd) {
	
	var addInput = '';
	
	if (_pay_payTypeCd == 'KG') {
		
		//이니시스 카드 
		addInput += '<input type="hidden" name="acceptCardCode" value="'+_pay_acceptCardCd+'">';
		
    } else if (_pay_payTypeCd == 'KC') {
		
		//실시간 계좌이체
		addInput += '<input type="hidden" name="hd_firm_name" value="'+preProcRs.bankInfo.companyNm+'">';
		addInput += '<input type="hidden" name="tx_receipt_acnt" value="'+preProcRs.bankInfo.accountNo+'">';
		addInput += '<input type="hidden" name="hd_serial_no" value="'+preProcRs.reserveId+'">';
		
		//국내: D, 국제: I
		if (isUndefined(typeof _pay_saleTypeCd) || _pay_routeType == 'D') {
			addInput += '<input type="hidden" name="tx_user_define" value="DIB">';	
		} else {
			addInput += '<input type="hidden" name="tx_user_define" value="IIB">';
		}
	
		
	} else if (_pay_payTypeCd == 'OC' || _pay_payTypeCd == 'JO') {
		
		//해외카드, 읿본카드
		addInput += '<input type="hidden" name="cardNo" value="'+_pay_cardNo+'">';
		addInput += '<input type="hidden" name="expireDate" value="'+_pay_expireDate+'">';
		
		if (_pay_payTypeCd == 'JO') {
			addInput += '<input type="hidden" name="sessionIdBy3dSecure" value="'+_pay_3DSSessionId+'">';
		} 
	} else if(_pay_payTypeCd == 'PL') {
		//페이팔
		var param1 = "";
		param1 += "PNRAlphaNo=";
		param1 += _pay_pnrDataObj.recordLocator;
		
		param1 += "|paxName=";
		param1 += this.getPaxName();
		
		//스포츠카드는 여정이 없는 pnr을 만듦으로, 여정정보 주지않음
		if (paySaleTypeCd != 'SPC') {
			var airlineData = this.makeAirlineData(); //Paypal 승인에 사용되는 AirlineData 생성
			
			param1 += airlineData;
		}
		
		addInput += '<input type="hidden" name="param1" value="'+param1+'">';
	} else if(_pay_payTypeCd == 'JP') {
		//자체페이
		addInput += '<input type="hidden" name="wpayUserKey" value="'+_pay_reserved1+'">';
		addInput += '<input type="hidden" name="wpayToken" value="'+_pay_reserved2+'">';
		
		var couponCode = "";
		var maxAmt = "";
		var minAmt = "";
		
		//즉시할인시 쿠폰정보 입력
		if (_pay_payTypeDetailCd == 'JP1' && preProcRs.dcInfo != null) {
			couponCode = preProcRs.dcInfo.couponCode;
			maxAmt = preProcRs.dcInfo.maxAmt;
			minAmt = preProcRs.dcInfo.minAmt;
		}
		
		addInput += '<input type="hidden" name="couponCode" value="'+couponCode+'">';
		addInput += '<input type="hidden" name="maxAmt" value="'+maxAmt+'">';
		addInput += '<input type="hidden" name="minAmt" value="'+minAmt+'">';
	}
    
	//KRP결제 (페이팔, 해외카드, 위챗)
	if (_pay_payTypeCd == 'OC' || _pay_payTypeCd == 'PL' || _pay_payTypeCd == 'WC') {
		var destination = '';
		var flightnm = '';
		var depDate = '';
	
		//스포츠카드는 여정이 없는 pnr을 만듦으로, 여정정보 주지않음
		if (paySaleTypeCd != 'SPC') {
			destination = _pay_pnrDataObj.journeys[0].designator.destination;
			flightnm = _pay_pnrDataObj.journeys[0].segments[0].identifier.identifier;
			
			depDate = _pay_pnrDataObj.journeys[0].designator.departure;
			depDate = depDate.replace(/[^0-9]/g, '');
			depDate = depDate.substr(0,8);
		}
		
		addInput += '<input type="hidden" name="depDate" value="'+depDate+'">';
		addInput += '<input type="hidden" name="destination" value="'+destination+'">';
		addInput += '<input type="hidden" name="flightnm" value="'+flightnm+'">';
		
	}
	
	return addInput;
}

/**
 * bookType별 추가 필요값 input 추가
 */
function addInputByBookType() {
	
	var addInput = '';
	//바우처 결제일시 필요한값 셋팅
	if (_pay_bookType == 'Voucher') {
		
		var voucherReferenceNo = isUndefined(typeof _pay_voucherReferenceNo) ? "" : _pay_voucherReferenceNo;
		var voucherAmount = 	 isUndefined(typeof _pay_voucherAmount) ? "" : _pay_voucherAmount;
		var voucherCurrencyCode =  isUndefined(typeof _pay_voucherCurrencyCode) ? "" : _pay_voucherCurrencyCode;
		
		addInput += '<input type="hidden" name="voucherReferenceNo" value="'+voucherReferenceNo+'">';
		addInput += '<input type="hidden" name="voucherAmount" value="'+voucherAmount+'">';
		addInput += '<input type="hidden" name="voucherCurrencyCode" value="'+voucherCurrencyCode+'">';
	} else {
		
		var pointFfpNo = isUndefined(typeof _pay_ffpNo) ? "" : _pay_ffpNo;
		var pointCustNo = 	 isUndefined(typeof _pay_custNo) ? "" : _pay_custNo;
		var ffpName =  isUndefined(typeof _pay_userName) ? "" : _pay_userName;
		
		addInput += '<input type="hidden" name="pointFfpNo" value="'+pointFfpNo+'">';
		addInput += '<input type="hidden" name="pointCustNo" value="'+pointCustNo+'">';
		addInput += '<input type="hidden" name="pointFfpName" value="'+ffpName+'">';
	}
	
	return addInput;
}