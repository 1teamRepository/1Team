/**
 * @file 기내유실물서비스 메인 페이지 스크립트
 * @since 2021.07.01
 * @author 김영완
 * @description
 * 2021.07.01 김영완 (신한DS) / 최초 구축 프로젝트 / 최초 작성
 * Copyright (c) 2021 Jejuair Inc. All Rights Reserved
 */


 /* 업무 변수 */
 var CUSTOMERSERVICE_CSCENTER_VARIABLES = {
	datas : []
}


/* 업무 스크립트 */
var CUSTOMERSERVICE_CSCENTER_SCRIPT = {

    /**
     * 초기화
     */
    init: function() {
		BIZ_COMMONS_SCRIPT.callI18n("0000000612")
	},
	
	formSubmit: function() {
		var form = document.getElementById("mainform");			
		form.submit();
	},
	
	showBottom: function() {
		$("#footer").insertAfter("#iframe");
		$("#footer").show();
	},
	
	resizeBody: function(iHeight, param){
		var topHeight = $("#header").height();
		var bottomHeight = $("#footer").height();
		var totalHeight = iHeight+topHeight+bottomHeight;		
		
		
		$("#iframe").height(iHeight+10);			
		$("body").height(totalHeight);			
		
		if(param) $(document).scrollTop(0);
	},
	
	goPage: function(index) {
		var _url = '';
		// 로그인 
		if(index == "Login") _url =  '/'+I18N.language+'/member/auth/login.do?targetUrl=/'+I18N.language+'/customerService/csCenter/faqList.do';
		// 기업우대
		if(index == "CorpService") _url =  '/'+I18N.language+'/corpService/infomation/main.do';
		// 1:1 문의 리스트
		if(index == "qnaFormList") _url =  '/'+I18N.language+'/customerService/csCenter/qnaFormList.do';
		//1:1 문의 등록
		if(index == "qnaForm") _url =  '/'+I18N.language+'/customerService/csCenter/qnaForm.do';
			
		if(_url == '') {
			alert("서비스 준비중입니다.");
		}else {
			document.location = _url;
		}
	},
	
	showAlert: function(alertMsg) {
		alert(alertMsg);
	},
	
	questionPopup: function() {
    	document.querySelector(".isMobile").classList.add("popup");
	},
	
 	questionPopupClose: function() {
    	document.querySelector(".isMobile").classList.remove("popup");
	}

}

$(document).ready(function(){
	$("#iframe").on("load", function(){
		$(window).scroll(function(){
			var win_top =$(window).scrollTop();
			
			var topHeight = $("#header").height();
			
			var totalTop = 0;
			
			if(win_top - topHeight > 0) {
				totalTop = win_top - topHeight;						
			} else {
				totalTop = topHeight;
			}
			
			if($("#active").val() == "prod") {
				window.iframe.postMessage({type:'moveIcon',top:win_top}, 'https://jejuair.secure.force.com');
			} else {
				window.iframe.postMessage({type:'moveIcon',top:win_top}, 'https://partsb-jejuair.cs74.force.com');		
			}
			
					
			
		});
    });
	CUSTOMERSERVICE_CSCENTER_SCRIPT.formSubmit();
	
	window.addEventListener('message', function(e) {
		/*
		console.log("e : "+e);
		console.log("e.origin : "+e.origin);
		console.log("_urlSalesforce : '<%=_urlSalesforce%>'");
		*/
		if($("#active").val() == "prod") {
			if(e.origin == 'https://jejuair.secure.force.com' && e.data.type == 'movePage') {
			CUSTOMERSERVICE_CSCENTER_SCRIPT.goPage(e.data.pageName);
			} else if(e.origin == 'https://jejuair.secure.force.com' && e.data.type == 'pageResize') {
				iframeHeight = e.data.iframeHeight;
				CUSTOMERSERVICE_CSCENTER_SCRIPT.resizeBody(e.data.iframeHeight, false);
			} else if(e.origin == 'https://jejuair.secure.force.com' && e.data.type == 'pageResizeMove') {
				iframeHeight = e.data.iframeHeight;
				CUSTOMERSERVICE_CSCENTER_SCRIPT.resizeBody(e.data.iframeHeight, true);
			} else if(e.origin == 'https://jejuair.secure.force.com' && e.data.type == 'includeBottom') {
				CUSTOMERSERVICE_CSCENTER_SCRIPT.showBottom();
			} else if(e.origin == 'https://jejuair.secure.force.com' && e.data.type == 'alert') {
				CUSTOMERSERVICE_CSCENTER_SCRIPT.showAlert(e.data.alertMsg);
			} else if(e.origin == 'https://jejuair.secure.force.com' && e.data.type == 'questionPopup') {
				CUSTOMERSERVICE_CSCENTER_SCRIPT.questionPopup();
			} else if(e.origin == 'https://jejuair.secure.force.com' && e.data.type == 'questionPopupClose') {
				CUSTOMERSERVICE_CSCENTER_SCRIPT.questionPopupClose();
			}
		} else {
			if(e.origin == 'https://partsb-jejuair.cs74.force.com' && e.data.type == 'movePage') {
				CUSTOMERSERVICE_CSCENTER_SCRIPT.goPage(e.data.pageName);
			} else if(e.origin == 'https://partsb-jejuair.cs74.force.com' && e.data.type == 'pageResize') {
				iframeHeight = e.data.iframeHeight;
				CUSTOMERSERVICE_CSCENTER_SCRIPT.resizeBody(e.data.iframeHeight, false);
			} else if(e.origin == 'https://partsb-jejuair.cs74.force.com' && e.data.type == 'pageResizeMove') {
				iframeHeight = e.data.iframeHeight;
				CUSTOMERSERVICE_CSCENTER_SCRIPT.resizeBody(e.data.iframeHeight, true);
			} else if(e.origin == 'https://partsb-jejuair.cs74.force.com' && e.data.type == 'includeBottom') {
				CUSTOMERSERVICE_CSCENTER_SCRIPT.showBottom();
			} else if(e.origin == 'https://partsb-jejuair.cs74.force.com' && e.data.type == 'alert') {
				CUSTOMERSERVICE_CSCENTER_SCRIPT.showAlert(e.data.alertMsg);
			} else if(e.origin == 'https://partsb-jejuair.cs74.force.com' && e.data.type == 'questionPopup') {
				CUSTOMERSERVICE_CSCENTER_SCRIPT.questionPopup();
			} else if(e.origin == 'https://partsb-jejuair.cs74.force.com' && e.data.type == 'questionPopupClose') {
				CUSTOMERSERVICE_CSCENTER_SCRIPT.questionPopupClose();
			}		
		}
		
	});		
	
	CUSTOMERSERVICE_CSCENTER_SCRIPT.init();
	setTimeout(function(){
		//타이틀 설정
		$('header.mobile-only h2.header__page-name').text(BIZ_COMMONS_SCRIPT.getI18n("0000000612.msg00001", "고객센터"));
		$('header.pc-only h2.header__page-name').text(BIZ_COMMONS_SCRIPT.getI18n("0000000612.msg00001", "고객센터"));
	}, 1000);
	

});

