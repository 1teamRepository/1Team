BIZ_COMMONS_SCRIPT.callI18n("0000000321")
let sessionLayerTimeOut;
let termLayerShow	  = 420000; //7분 (240000)후
//let termLayerShow	  = 10000; //5초
let sessionTime;
let remainFlag = false;

let _tl_processType = 'Booking';

let TLLayerTimeOut;
let setOccupancyTimeOut;

//let termTLLayerShow = dUtil.diffTime('${pnrData}'.hold.expiration.replace(/[^0-9]/g,'') , dUtil.toDateTime())*1000*60
let pnrTLTime;

clearTimeout(sessionLayerTimeOut);
sessionLayerTimeOut = setTimeout( function() {showSessionLayer();}, termLayerShow);	//7분 (420000)후  showSessionLayer 실행

clearTimeout(TLLayerTimeOut);

//자동 초기화 안내 레이어 호출
function showSessionLayer(){
	$('#sessionLayerForm').html("");   
	let html = '';
	let noticeMsg = '';
	if (_tl_processType === 'Booking') { 								// 항공권 예약
		noticeMsg = BIZ_COMMONS_SCRIPT.getI18n("0000000321.msg00034");
	} else if (_tl_processType === 'Exchange') { 						// 항공권 변경
		noticeMsg = BIZ_COMMONS_SCRIPT.getI18n("0000000321.msg00042");
	} else if (_tl_processType === 'Cancel') { 							// 항공권 취소
		noticeMsg = BIZ_COMMONS_SCRIPT.getI18n("0000000321.msg00041");
	} else if (_tl_processType === 'AncillaryPurchase') { 				// 부가서비스 구매
		noticeMsg = BIZ_COMMONS_SCRIPT.getI18n("0000000321.msg00043");
	} else if (_tl_processType === 'AncillaryCancel') { 				// 부가서비스 취소
		noticeMsg = BIZ_COMMONS_SCRIPT.getI18n("0000000321.msg00044");
	}
	html += '<div class="modal-content"><p class="alert-title">'+BIZ_COMMONS_SCRIPT.getI18n("0000000321.msg00033")+'</p><p class="alert-text size_small">'+noticeMsg+
	'</p><div class="modal__time" tltle="'+BIZ_COMMONS_SCRIPT.getI18n("0000000321.msg00035")+'" id="divLayerCount"></div></div><div class="modal__button-area button-wrap">'+
	'<button type="button" class="button button--secondary" onclick="javascript:showSessionBanner(this);"><span class="button__text">'+BIZ_COMMONS_SCRIPT.getI18n("0000000321.msg00036")+'</span></button>'+
	'<button type="button" class="button button--secondary button--active" onclick="javascript:sendExtTripsell();"><span class="button__text">'+BIZ_COMMONS_SCRIPT.getI18n("0000000321.msg00037")+'</span></button>'+
	'</div><a href="#" rel="modal:close" class="modal__close" onclick="javascript:showSessionBanner(this);"><span class="blind">'+BIZ_COMMONS_SCRIPT.getI18n("0000000321.msg00038")+'</span></a>'
	$('#sessionLayerForm').html(html);
	
	remainFlag = false;
	sessionTime = new Date();
	sessionTime.setSeconds(sessionTime.getSeconds() +120.5);	    
    $("#sessionLayer").trigger('click');
}

//메인 이동
function showTLLayer(){
	$('#sessionLayerForm').html("");
	let html = '';
	html += '<div class="modal-content"><p class="alert-text size_small">'+BIZ_COMMONS_SCRIPT.getI18n("0000000321.msg00039")+
	'</p></div><div class="modal__button-area button-wrap">'+
	'<button type="button" class="button button--secondary button--active" onclick="javascript:liftOff();"><span class="button__text">'+BIZ_COMMONS_SCRIPT.getI18n("0000000321.msg00037")+'</span></button>'+
	'</div>'
	$('#sessionLayerForm').removeClass('modal-layer NA_1_23').html(html);
	
	remainFlag = false;    
	pnrTLTime = new Date();
	pnrTLTime.setSeconds(pnrTLTime.getSeconds() +120.5);	
    $("#sessionLayer").trigger('click');
    $('#divLayerCount').countdown({until: pnrTLTime});
}

//tripsell 호출부터 savepassenger 까지 15분 이내에 처리되어야 함 
function showSeatOccupancy(){
	$('#sessionLayerForm').html("");
	let html = '';
	html += '<div class="modal-content"><p class="alert-text size_small">'+BIZ_COMMONS_SCRIPT.getI18n("0000000321.msg00039")+
	'</p></div><div class="modal__button-area button-wrap">'+
	'<button type="button" class="button button--secondary button--active" onclick="javascript:liftOff();"><span class="button__text">'+BIZ_COMMONS_SCRIPT.getI18n("0000000321.msg00037")+'</span></button>'+
	'</div>'
	$('#sessionLayerForm').removeClass('modal-layer NA_1_23').html(html);
	remainFlag = false;
	$("#sessionLayer").trigger('click');
}


//세션 종료
function liftOff() {
	if(remainFlag == false) {
		if(window.location.href.indexOf('mypage')==-1){		
			if(typeof ssTimeoutRecordLocator != 'undefined' && ssTimeoutRecordLocator != ''){
				const rqCancelPnr = {
					recordLocator	: ssTimeoutRecordLocator,
					bookingKey		: ssTimeoutBookingKey,
				};
				
				$.ajax({
					async: false,
					type: 'post',
					url: '../payment/cancelPnr.json',
					beforeSend: function(request) {
						request.setRequestHeader('PssToken', ssTimeoutPssToken);
					},
					data: {
						rqCancelPnr : JSON.stringify(rqCancelPnr)
					},
					success: function(data) {
					}
				});
			}
			//부가서비스 단독 구매
			if(window.location.href.indexOf('ancillary')>-1 && typeof ssTimeoutRecordLocator != 'undefined'  && ssTimeoutRecordLocator ===''){
				let resvDetailReq = {
					recordLocator	: pnrData.recordLocator,
					cultureCode		: cultureCode,
					depDate			: depDate,
					orderSearchType	: 'P'
				};
				$('#resvDetailReq').val(JSON.stringify(resvDetailReq));
				
				const formObj = $('#frmNext');
				
				formObj.attr('action', '../mypage/viewReservationDetail.do');
				formObj.submit();
			}else{
				if(USER_DEVICE.getName() == "APP"){
					APPCALL.goMain(); 
				}else{
					$('<form action="../../main/base/index.do" method="post"></form>').appendTo('body').submit().remove();			
				}
			}	
		}else{
			let resvDetailReq = {
				recordLocator	: $('#formDetail [name="recordLocator"]').val(),
				cultureCode		: $('#formDetail [name="cultureCode"]').val(),
				depDate			: $('#formDetail [name="depDate"]').val(),
				orderSearchType	: 'P'
			};
			$('#formDetail [name="resvDetailReq"]').val(JSON.stringify(resvDetailReq));
			
			const formObj = $('#formDetail');
			
			formObj.attr('action', '../mypage/viewReservationDetail.do');
			formObj.submit();
		}
	}
}

//Session Layer CountDown
function watchLayerCount(periods) {
	$('#divLayerCount').text(periods[5] +":"+ periods[6]);
}

//Session Banner CountDown
function watchBannerCount(periods) {
	$('.ticketing_top_bar strong').text(periods[5] +":"+ periods[6]);
}

function sendExtTripsell() {
	let isPointToken = 'true';
	if(window.location.href.indexOf('mypage')==-1 ){		
		//부가서비스 단독 구매
		if(window.location.href.indexOf('ancillary')>-1 && typeof ssTimeoutRecordLocator != 'undefined' &&ssTimeoutRecordLocator ===''){		
			isPointToken = 'N';
		}
	}else{
		//마이페이지
		isPointToken = 'N';
	}

	$.ajax({
		url: window.location.origin + '/' + I18N.language + '/ibe/booking/sendExtTripsell.json',
		type: 'POST',
		beforeSend: function (request)
        {
            request.setRequestHeader("PssToken", PssToken);
        },
		data	: {
			bookType : bookType,
			cultureCode : I18N.language + '-' + I18N.country,
			isPointToken : isPointToken
		},    
		success: function (data) {	
			if(data.data.code == '0000'){
				remainFlag = true;				
				clearTimeout(sessionLayerTimeOut);
				$(".ticketing_top_bar").removeClass('on');
				sessionLayerTimeOut = setTimeout( function() {showSessionLayer();}, termLayerShow);
				$("#sessionLayerForm").find('.modal__close').trigger('click');		
			} else {
				location.href = '/';
			}
		},
			error: function () {
			remainFlag = false;
		}
	});	
}

function showSessionBanner(_this){	
	if($(_this).hasClass('button')){
	    $("#sessionLayerForm").find('.modal__close').trigger('click');
	}
	if(!remainFlag){
    	$(".ticketing_top_bar").addClass('on');
    	$(".ticketing_top_bar").show();
		$(".ticketing_top_bar").focus();   
    	$('.ticketing_top_bar strong').countdown({until: sessionTime, onExpiry: liftOff, onTick: watchBannerCount})
	}	    
}			