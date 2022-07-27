/**
 * @file 기내유실물서비스 메인 페이지 스크립트
 * @since 2021.07.01
 * @author 김영완
 * @description
 * 2021.07.01 김영완 (신한DS) / 최초 구축 프로젝트 / 최초 작성
 * Copyright (c) 2021 Jejuair Inc. All Rights Reserved
 */

//비교
Handlebars.registerHelper('compare', function (v1, operator, v2, options) {
	'use strict';
	var operators = {
	'==': v1 == v2 ? true : false,
	'===': v1 === v2 ? true : false,
	'!=': v1 != v2 ? true : false,
	'!==': v1 !== v2 ? true : false,
	'>': v1 > v2 ? true : false,
	'>=': v1 >= v2 ? true : false,
	'<': v1 < v2 ? true : false,
	'<=': v1 <= v2 ? true : false,
	'||': v1 || v2 ? true : false,
	'&&': v1 && v2 ? true : false
	}
	if (operators.hasOwnProperty(operator)) {
		if (operators[operator]) {
			return options.fn(this);
		}
		return options.inverse(this);
	}
	return console.error('Error: Expression "' + operator + '" not found');
});

 /* 업무 변수 */
 var CUSTOMERSERVICE_CABINLOST_VARIABLES = {
	datas : []
}


/* 업무 스크립트 */
var CUSTOMERSERVICE_CABINLOST_SCRIPT = {

    /**
     * 초기화
     */
    init: function() {
		BIZ_COMMONS_SCRIPT.callI18n("0000000626")	
		this.answer();
	},
	
	del: function(inquiryId) {
		var nData = CUSTOMERSERVICE_CABINLOST_VARIABLES.datas.filter(function(data){
			if(data.inquiryId===inquiryId){
				return data;
			}
		});
		var inquiryAnswerSeno = nData[nData.length-1]['inquiryAnswerSeno'];
		
		var params = {
			"url": "/"+I18N.language+'/customerService/cabinLost/regCabinLostInquireDel.json',
			"body" : {
				"inquiryId" : inquiryId,
				"inquiryAnswerSeno" : inquiryAnswerSeno						
			}
		}
		var result = confirm(BIZ_COMMONS_SCRIPT.getI18n("0000000626.msg10014", "문의 삭제하시겠습니까?."));

		check = true;
        
		if(result){
			check= false;
			Api.post(params, function() {
				location.href="/"+I18N.language+'/customerService/cabinLost/cabinLost.do';
				alert(BIZ_COMMONS_SCRIPT.getI18n("0000000626.msg10012", "문의가 삭제 되었습니다."));
			}, function(error) {
				console.log(error);
			});

		}

	},

	modify: function(inquiryId) {
		
		$('#modalLayer07 .modal-header__title').html(BIZ_COMMONS_SCRIPT.getI18n("0000000626.msg10001", "수정하기"));
		$('#modalLayer07 .section-title .title').html(BIZ_COMMONS_SCRIPT.getI18n("0000000626.msg10002", "수정내용"));
		$('#modalLayer07 #updateAnswer .button__text').html(BIZ_COMMONS_SCRIPT.getI18n("0000000626.msg10001", "수정하기"));
		
		var nData = CUSTOMERSERVICE_CABINLOST_VARIABLES.datas.filter(function(data){
			if(data.inquiryId===inquiryId){
				return data;
			}
		});
		
		$('#textarea1').val(nData[nData.length-1]['inquiryAnswerCont']);
		$('#inquiryId').val(inquiryId);
		$('#inquiryAnswerId').val(nData[nData.length-1]['inquiryAnswerId']);
		$('#inquiryAnswerSeno').val(nData[nData.length-1]['inquiryAnswerSeno']);
		
	},

	answer: function() {
		
		var params = {
			"url": "/"+I18N.language+'/customerService/cabinLost/cabinLostSelectInquiry.json',
			"body" : {}
		}
		
		Api.post(params, function(results) {

			CUSTOMERSERVICE_CABINLOST_VARIABLES.datas = results.data.resultData;
			//return false;
			var source = $("#answerTemplate").html();

			//핸들바 템플릿 컴파일
			var template = Handlebars.compile(source);
			var items = {
					datas: CUSTOMERSERVICE_CABINLOST_VARIABLES.datas
				}
			var html = template(items);
			var totCnt = 0;
			CUSTOMERSERVICE_CABINLOST_VARIABLES.datas.map(function(data){
				if(data.inquiryAnswerSeno === 1){
					totCnt++;
				}
			});
			$('#idddd').text(totCnt);
			$('#answerList').html(html);
			$('#answerList').accordion();	
			modalUI($('[data-element="modal_anchor"]')); //모달 초기화

			//modalUI($('.openModalLayer07')); //모달 초기화
		
		}, function(error) {
			console.log(error);
		});
		
	}, 
	
	expended: function(id, seno) {
		console.log(id+'===='+seno);

		if($('#accordion_'+id).data('flag')!=='Y'){

			var len = CUSTOMERSERVICE_CABINLOST_VARIABLES.datas.length-1;

			var nData = CUSTOMERSERVICE_CABINLOST_VARIABLES.datas.filter(function(data,k){
				if(id === data.inquiryId && data.inquiryAnswerSeno > seno) {
					data['isFlag'] = false;
					return data;
				}
			});
			
			if(nData.length!==0) {
				
				if((nData[nData.length-1].inquiryAnswerTypeCd)==='02'){
					nData[nData.length-1]['isFlag'] = true;
				}

				//return false;
				var source = $("#subAnswerTemplate").html();
				//핸들바 템플릿 컴파일
				var template = Handlebars.compile(source);
				var items = {
						datas: nData
					}
				var html = template(items);
				$('#accordion_'+id).append('<div class="accordion__panel" data-element="accordion__panel">'+html+'</div>');
				$('#accordion_'+id).accordion();	
				$('#accordion_'+id).attr('data-flag', 'Y');

				modalUI($('[data-element="modal_anchor"]')); //모달 초기화
			}
		};
		//CUSTOMERSERVICE_CABINLOST_VARIABLES.datas
	}

    , confirm : function(){
		var datas = {
			title: '&nbsp;'
		,    message: BIZ_COMMONS_SCRIPT.getI18n("0000000626.msg10003", "로그인 하지 않으실 경우 답변은 이메일로만 확인하실 수 있습니다.지금 로그인하시겠습니까?")		
		}; 
		$.JJConfirm(datas,function(results){
		utils.console.log(results);
			if(results =='Y'){
				location.href="/"+I18N.language+'/member/auth/login.do?targetUrl=/'+I18N.language+'/customerService/cabinLost/cabinLostInquire.do';
			}
			else{
				location.href="/"+I18N.language+'/customerService/cabinLost/cabinLostInquire.do';
			}
		});
	}

	, confirm2 : function(){
		var lostpropId = document.getElementById('lostpropId2').innerText.substr(0,10);
		var datas = {
			title: '&nbsp;'
		,    message: BIZ_COMMONS_SCRIPT.getI18n("0000000626.msg10004", "로그인 하지 않으실 경우 답변은 이메일로만 확인하실 수 있습니다.지금 로그인하시겠습니까?")			
		}; 
		$.JJConfirm(datas,function(results){
		utils.console.log(results);
			if(results =='Y'){
				location.href="/"+I18N.language+'/member/auth/login.do?targetUrl=/'+I18N.language+'/customerService/cabinLost/cabinLostInquireDetail/'+lostpropId+'.do';
			}
			else{				
				$('a[rel="modal:close"]').trigger('click');
				location.href='/'+I18N.language+'/customerService/cabinLost/cabinLostInquireDetail/'+lostpropId+'.do';
			}
		});
	}
	
	, confirm3 : function(){
		var lostpropId = document.getElementById('lostpropId2').innerText.substr(0,10);
		location.href='/'+I18N.language+'/customerService/cabinLost/cabinLostInquireDetail/'+lostpropId+'.do';
	}
}
 
function parseDateFormat() {
		let date,startDate,endDate,strDate;
		moment.lang(I18N.language);
		
		date = $('#lostPeriod').text().replace(/[^0-9]/gi,'');
		startDate = new Date(date.substring(0,4),date.substring(4,6)-1,date.substring(6,8));
		strDate = moment(startDate).format("yyyy.MM.DD(ddd)");
		
		if(date.length==16) {
			endDate = new Date(date.substring(8,12),date.substring(12,14)-1,date.substring(14,16));
			strDate += " ~ " +moment(endDate).format("yyyy.MM.DD(ddd)");	
		}
		
		$("#lostPeriod").text(strDate)
 }

$(document).ready(function(){
	$('#rslt').hide();
	
	var isFlag = false;
    $('#select_btn, #moreBtn').click(function(){
		
		var type = $(this).data('type');
		
		var pageNum = 0;

		if(type === 'search') {
			$('#moreBtn').attr('data-page', 1);
			$('#moreBtn').data("page", 1);
			isFlag = false;
		}else{
			if(isFlag){
				return false;
			}
			$('#moreBtn').attr('data-page', parseInt($(this).data('page'))+1);
			$('#moreBtn').data("page", parseInt($(this).data('page'))+1)

		}

		console.log(type);
        var pickupSpotCont = '7C' + $('#inp3-1').val();
        var itemCd = $('#itemCd').val();
        var hueCd = $('#hueCd').val();
        var pickupSeatNo = $('#pickupSeatNo').val();
		
		var checkStr = /[^0-9.]/g;
 		var dateStr = $('#lostPeriod').text().replace(checkStr, "");
		dateStr = dateStr.replaceAll('.', '-')
		$('#inquiryStartDt').val(dateStr.substr(0,10));
		$('#inquiryEndDt').val(dateStr.substr(10,10));
		
		
		if($('#inquiryStartDt').val() == '' || $('#inquiryEndDt').val() == '') {
			alert(BIZ_COMMONS_SCRIPT.getI18n("0000000626.msg10005", "올바른 기간을 설정해주세요."));
			return;
		}
		
        var pageNum = $('#moreBtn').attr('data-page');
        var params = {
			"url": "/"+I18N.language+'/customerService/cabinLost/cabinLostSelect.json',
			"body" : {
                "itemCd" : $('#itemCd').val(),
                "hueCd" : $('#hueCd').val(),
                "pickupSpotCont" : pickupSpotCont,
                "pickupSeatNo" : $('#pickupSeatNo').val(),
                "inquiryStartDt" : $('#inquiryStartDt').val(),
				"inquiryEndDt" : $('#inquiryEndDt').val(),
				"pageNum" : pageNum
			}
		}
		Api.post(params, function(results) {	
            $('#rslt').show();
            var source = $("#listTemplate").html();
			//핸들바 템플릿 컴파일
			var template = Handlebars.compile(source);
			var items = {
					datas: results.data.mtxTt
				}
			var html = template(items);
			console.log(results.data.TOTCNT);
			console.log(results.data.mtxCt);
			console.log(results.data.mtxTt);

			$('.totalCnt').html(results.data.TOTCNT);
			//$('#totalCnt').html(results.data.TOTCNT);
            if(type === 'search'){
				$('#resultsList').html(html);      
				if(results.data.mtxCt===0){
					$('.finish-item-wrap').show();
					$('.more-wrap').hide();
					$('.totalCnt').html(0);
				}else{
					$('.finish-item-wrap').hide();
					$('.more-wrap').show();
				}
            }
            else{
                $('#resultsList').append(html);
			}
			
			$('#currentCnt').html($('#resultsList > div.list-card__item').length);
			
			if(results.data.TOTALPAGE === parseInt(pageNum)){
				isFlag = true;
			}
			modalUI($('#resultsList > div.list-card__item')); //모달 초기화
			
			
		}, function(error) {
			console.log(error);
		});
	});
	
	$(document).on( 'click' , '[data-select-date]',  function(ev){
		parseDateFormat();
	});
	
	$(document).on( 'click' , '#modalPop',  function(ev){
			var lostpropId = $(ev.currentTarget).find('.list-card__image').find('input').val();
			$('.table-horizontal__td').empty();
			$('#itemImages').empty();
			
			var params = {
				"url": "/"+I18N.language+'/customerService/cabinLost/cabinLostSelectDetail.json',
				"body" : {
					"lostpropId" : lostpropId
				}
			}
			
			Api.post(params, function(results) {
				
				console.log(results.data);				
				console.log(results.data.resultData.hueCd);
				for(i = 0; i < results.data.imgList.length; i++) {
					var info = results.data.imgList[i];
					$('#itemImages').append(
						"<div class=\"carousel__list swiper-slide\">"
				  	  + "<div class=\"carousel__contents\">"
				      + "<img src=\"/"+I18N.language+"/customerService/cabinLost/getAttachFileSrc.json?fileMgmtNo="+ info.fileMgmtNo+"\" alt=\""+ i +"\"></div></div>");
				}
				
									
				$('#lostpropId2').prepend(results.data.resultData.lostpropId);
				$('#lostpropId2').append("<div class=\'label-wrap label-wrap--lost\'>"
								+ "<span class=\'label-wrap__item label-wrap__item--type2 badge\' id=\'keepingStatCd\'></span>"
								+ "<span class=\'label-wrap__item label-wrap__item--type1 badge\' id=\'keepingStatCd2\'></span></div>")
				
				if(results.data.resultData.keepingStatCd === '01'){
					$('#keepingStatCd').text(BIZ_COMMONS_SCRIPT.getI18n("0000000626.msg10006", "보관중"));
					$('#keepingStatCd2').hide();	
				}else if(results.data.resultData.keepingStatCd === '02'){
					$('#keepingStatCd').hide();
					$('#keepingStatCd2').text(BIZ_COMMONS_SCRIPT.getI18n("0000000626.msg10007", "수령완료"));	
				}else{
					$('#keepingStatCd').hide();
					$('#keepingStatCd2').text(BIZ_COMMONS_SCRIPT.getI18n("0000000626.msg10008", "폐기"));
					$('#keepingChgDt').prepend(results.data.resultData.KEEPINGCHGDT);
				}

				
				$('#detailPickupDt').prepend(results.data.resultData.pickupDt);
				$('#detailItemCd').prepend(results.data.resultData.itemCd);
				$('#detailPickupSpotCont').prepend(results.data.resultData.pickupSpotCont);
				$('#detailHueCd').prepend(results.data.resultData.hueCd);
				$('#detailRegBranchId').prepend(results.data.resultData.regBranchId);
				//상세내용
				$('#imageReplacementSentenceCont').prepend(results.data.resultData.imageReplacementSentenceCont);
				
			}, function(error) {
				console.log(error);
			});
		});

		$('.btn-lost-more').on('click', function () {
			var checkClass = $(this).hasClass('on');
			if (checkClass)
			{
			  $(this).removeClass('on');
			  $('.toggle-row').slideUp('fast');
			}
			else
			{
			  $(this).addClass('on');
			  $('.toggle-row').slideDown('fast');
			}
		  });


		
		$(document).on('click' , '.openModalLayer07', function (e) { 

		 	$('#modalLayer07 .modal-header__title').html(BIZ_COMMONS_SCRIPT.getI18n("0000000626.msg10009", "추가문의 작성"));
		    $('#modalLayer07 .section-title .title').html(BIZ_COMMONS_SCRIPT.getI18n("0000000626.msg10010", "추가문의 내용"));
		    $('#modalLayer07 #updateAnswer .button__text').html(BIZ_COMMONS_SCRIPT.getI18n("0000000626.msg10011", "추가 문의하기"));

			$('#textarea1').val('');
			$('#inquiryId').val('');
			$('#inquiryAnswerId').val('');
			var id = $(this).attr('data-id');
			$('#modalLayer07').find('input[name=inquiryId]').val(id);
		}); 

		$(document).on('click' , '.closepop', function (e) { 
			$('#modalLayer07').find('textarea[id=textarea1]').val("")
		}); 

		$(document).on('click' , '#updateAnswer', function (e) { 
			var textarea1 = $('#modalLayer07').find('textarea[id=textarea1]').val();
			var inquiryId = $('#modalLayer07').find('input[name=inquiryId]').val();
			var inquiryAnswerId = $('#modalLayer07').find('input[name=inquiryAnswerId]').val();
			var inquiryAnswerSeno = $('#modalLayer07').find('input[name=inquiryAnswerSeno]').val();
			console.log(textarea1);
			console.log(inquiryId);
			console.log(inquiryAnswerSeno);
			var dealDiv = 'I';
			if(inquiryAnswerId!==''){
				dealDiv = 'U';
			}
			var params = {
				
				"url": "/"+I18N.language+'/customerService/cabinLost/regCabinLostInquireAdd.json',
				"body" : {
					"inquiryId" : inquiryId,
					"inquiryAnswerCont" : textarea1,
					"inquiryAnswerId" : inquiryAnswerId,
					"inquiryAnswerSeno" : parseInt(inquiryAnswerSeno),
					"dealDiv": dealDiv
				}
			}

			Api.post(params, function(results) {
			
				$('a[rel="modal:close"]').trigger('click');
				CUSTOMERSERVICE_CABINLOST_SCRIPT.answer();
			}, function(error) {
				console.log(error);
				alert(BIZ_COMMONS_SCRIPT.getI18n("0000000626.msg10013", "저장 실패하였습니다."));
				$('a[rel="modal:close"]').trigger('click');
			});

			
		
		}); 
		
		$(document).on('change' , '#pickupSeatNo', function (e) { 
			$(this).val(sUtil.trim($(this).val().toUpperCase()));
		}); 

	CUSTOMERSERVICE_CABINLOST_SCRIPT.init();

	parseDateFormat();
});