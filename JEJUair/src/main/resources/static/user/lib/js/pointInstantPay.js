/**
 * 
 */
BIZ_COMMONS_SCRIPT.callI18n("0000000388")

//로그인 정보 세팅
let userInfo = JSON.parse(USER_INFO.get());
let _pay_payTypeCd = "";
let _pay_pnrNo = "";
let _pay_optionCd = "";
let resvProductCode = $("[name=productTypeCode]").val();
let _pay_ffpNo = userInfo.customerNo;

//동의버튼 체크 이벤트 제어
$(document).ready(function() {
	$(document).on("click", "[name=agreePointPay]", function() {
		if($(this).is(":checked")){
			$("#purchasePointBtn").addClass("button--active");
			$("#purchasePointBtn").removeAttr("disabled");
		} else {
			$("#purchasePointBtn").removeClass("button--active");
			$("#purchasePointBtn").attr("disabled", true);
		}
	});
	
	//다음 버튼 클릭
	$(document).on("click", "#purchasePointBtn", function() {
		if($(this).hasClass("button--active")) {
			if(!checkField()){
				return false;		
			}
		}
	});

	$(document).on("click", "#normalPaymentBtn", function() {
		$("#alertModalConfirmLayer").find(".alert-text").text(BIZ_COMMONS_SCRIPT.getI18n("0000000388.msg00013"));
		//[일반결제] 선택 시 선택하신 내용이 삭제되며, 초기 여정조회 화면으로 이동합니다. 그대로 진행하시겠습니까?
		fullPopOpen("alertModalConfirmLayer");
	});
});

//lguplus결제
function paymentInstantPoint(){
	if(checkField()){
		let requestData = new Object();
		let usablePay = "";
		let deviceType = "";
		_pay_pnrNo = rsResvDetail.recordLocator;
		_pay_optionCd = $("[name=inputRadio]:checked").val();
		_pay_productTypeCode = "PNT";
		
		if(USER_DEVICE.getName() == "PC"){
			deviceType = "P";
		} else {
			deviceType = "M";
		}
		
 		if(_pay_optionCd == "C"){
 			usablePay = "card";
 	 	} else if (_pay_optionCd == "A"){
 	 		usablePay = "cash";
 	 	}

 		orderId = createEMDSOrderId(); //orderID 세팅

 		requestData = {
			orderId : orderId,
 			amount : $("[name=payPoint]").val(),
 			buyer : rsResvDetail.contacts["P"].name.last + rsResvDetail.contacts["P"].name.first,
 			productInfo : "포인트 즉시구매",
 			loginId : _pay_loginUserId,
 			email : rsResvDetail.contacts["P"].emailAddress,
 			productCode : "A03",
 			usablePay : usablePay,
 			cultureCd : _pay_cultureCd,
 			deviceType : deviceType,
			productTypeCd : "PIT",
			ffpNo : _pay_ffpNo
		}
 		
		const approvalObj = requestLGApproval(requestData, movePaymentPage);
	} 
}

function movePaymentPage(result){
	if(result.code == "0000"){
		BIZ_COMMONS_SCRIPT.refreshPoint();
		_pay_productTypeCode = resvProductCode;
		
		$.JJAlert(BIZ_COMMONS_SCRIPT.getI18n("0000000388.msg00020"), function() {
		//포인트 충전이 완료되었습니다. 유류할증료 및 공항이용료 결제를 진행하셔야 예약이 완료됩니다.
		 	if(addSeatFlag) {
				fnAddSeat();
			} else if (addSSRFlag) {
				fnAddSSR();
			} else {
				fnFindBookingPnr();
			}
		});
	} else {
		$.JJAlert(result.message);
	}
}

//운임세팅
function setPointAmount(basePoint){
	if((basePoint > Number($("[name=payPoint]").val())) || (Number($("[name=payPoint]").val()) > 4000000)){
		$("[name=payPoint]").val(basePoint);
	}
}

// validation Check
function checkField(){
	if($("[name=payPoint]").val() == ""){
		$("#inputPointDiv").addClass("input--error");
		$("#inputPointError").text(BIZ_COMMONS_SCRIPT.getI18n("0000000388.msg00017"));
		//추가요청 : 포인트를 입력해주세요.
		
		return false;
	} else {
		$("#inputPointDiv").removeClass("input--error");
		$("#inputPointError").text("");
	}
	
	return true;
}
