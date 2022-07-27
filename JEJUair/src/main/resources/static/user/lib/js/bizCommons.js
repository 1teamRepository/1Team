/**
 * @file 공통
 * @since 2021.05.24
 * @author 백승건
 * @description
 *  2021.03.24 백승건 (신한DS) / 최초 구축 프로젝트 / 최초 작성
 * Copyright (c) 2021 JejuAir Inc. All Rights Reserved
 */
var BIZ_COMMONS_VARIABLES = {
	url : {
		join : "/"+I18N.language+"/member/memberJoin/join.do",// 가입
		findUserInfo : "/"+I18N.language+"/member/find/findUserInfo.do", // 아이디 패스워드 찾기
		login : "/"+I18N.language+"/member/auth/login.do", // 로그인
		//logout : "/"+I18N.language+"/member/auth/logout.do", // 로그아웃
		main : "/", // 메인페이지
		refreshPoint : "/"+I18N.language+"/memberBenefit/refreshPoint/main.do", // 리프레시포인트
		event : "", // 이벤트
		mypage : "/"+I18N.language+"/member/mypage/main.do", // 마이페이지
		tourAndTicket : "", //  투어&티켓
		flightSearch : "", // 출도착조회
		bookingSearch : "/"+I18N.language+"/ibe/mypage/viewOnOffReservationList.do", // 예약조회
		cs : "", // 고객센터


		transactions : "/"+I18N.language+"/terms/page/transactions.do", // 특정상거래법표기
		homepageTerms : "/"+I18N.language+"/terms/page/homepageTerms.do", // 홈페이지 이용약관
		carriageTemrs : "/"+I18N.language+"/terms/page/carriageTemrs.do", // 여객운송약관
		personalTerms : "/"+I18N.language+"/terms/page/personalTerms.do", // 개인정보처리방침
		emailNoTerms : "/"+I18N.language+"/terms/page/emailNoTerms.do", // 항공교통이용자 서비스 계획
		company : "/"+I18N.language+"/corpService/infomation/main.do", // 기업우대
		devList : "/"+I18N.language+"/compList.do", // 기업우대
		travelAgencyD : {// 여행사우대 국내선
			path : "https://jj.jejuair.net/dom/main.do", 
			target : "_blank"
		},
			travelAgencyF : {// 여행사우대 국제선
		  path : "https://7c.jejuair.net/int/main.do",
			target : "_blank"
		},
		travelAgencyJ : {// 여행사우대 국제선 일본어
		 	path : "https://7c.jejuair.net/int/main.do?langCd=ja", 
			target : "_blank"
		},
		travelAgencyE : {// 여행사우대 국제선 영어
		 	path : "https://7c.jejuair.net/int/main.do?langCd=en", 
			target : "_blank"
		},
		ticketing : "/"+I18N.language+"/booking/Availability.do",
		ir : "/"+I18N.language+"/about/ir/page.do",
		irNotice : "/"+I18N.language+"/about/ir/page.do?tab=2&pageNum=1",
		about : "/"+I18N.language+"/about/corp/page.do",
		incruit : {
			path : "https://recruit.jejuair.net/",
			target : "_blank"
		},
		sitemap : "/"+I18N.language+"/about/sitemap/page.do",
		/* Family Site (13 개) */
		familyAekyung : { // ㈜애경산업
			path : "http://www.aekyung.co.kr/KR/main/main.do",
			target : "_blank"
		},
		familyAtecltd : { // ㈜에이텍
			path : "https://www.atecltd.com/",
			target : "_blank"
		},
		familyAekyngst : { // 애경S.T
			path : "https://www.aekyungst.co.kr/aekyungst/front/view/main/index.jsp",
			target : "_blank"
		},
		familyAkis : { // 에이케이아이에스㈜
			path : "https://www.akis.co.kr/index.do",
			target : "_blank"
		},
		familyAdmission : { // 애드미션
			path : "https://www.admission.co.kr/",
			target : "_blank"
		},
		familyNeopharm : { // 네오팜
			path : "http://www.neopharm.co.kr/ko/default.do",
			target : "_blank"
		},
		familyAkp : { // 애경유화㈜
			path : "https://www.akp.co.kr/index.do",
			target : "_blank"
		},
		familyAkc : { // 애경화학㈜
			path : "https://www.akc.co.kr/index.do",
			target : "_blank"
		},
		familyAkchemtech : { // 에이케이켐텍
			path : "https://www.akchemtech.com/kor/main/index.html",
			target : "_blank"
		},
		familyKospa : { // 코스파
			path : "http://www.kospa.co.kr/main/main.php",
			target : "_blank"
		},
		familyAkplaza : { // AK PLAZA
			path : "http://www.akplaza.com/main.do",
			target : "_blank"
		},
		familyAekyunggroup : { // AK홀딩스
			path : "http://www.aekyunggroup.co.kr/",
			target : "_blank"
		},
		familyAkdjbcc : { // 애경개발
			path : "https://www.akdjbcc.co.kr/",
			target : "_blank"
		},
		/* / Family Site */
		
		valueAlliance : { // VALUE ALLIANCE
			path : "https://www.valuealliance.com/#/search",
			target : "_blank"
		},
		iOSBtn : { // iOS
			path : "https://itunes.apple.com/kr/app/id373053637",
			target : "_blank"
		},
		AndroidBtn : { // Android
			path : "https://play.google.com/store/apps/details?id=com.parksmt.jejuair.android16&feature=nav_result#?t=W251bGwsMSwyLDNd",
			target : "_blank"
		}
	}
}

var BIZ_COMMONS_SCRIPT = {
	init: function() {

		/* 정보성 안내물 wrap */
		var $infoToggleWrap = $(".service-information");
		if($infoToggleWrap.length > 0 ) {
			this.initInfoToggle($infoToggleWrap);
		}

		/* 해더 채우기 */
		this._topHeaderTitleInjecter();

		/* 메뉴를 init 한다 */
		this._menuInit();

		this._removeActiveBtn();
		
		BIZ_COMMONS_SCRIPT.callI18n("0000000127")
	},
	refreshPoint : function() {
		
		if(USER_INFO.get() === '{}'){	
			return false;
		}

		var params = {
			"url":'/api/common/biz/setUserPoint.json',
			"body" : {
				 "apiRequestType" : "BQ"
				,"ffpNo" : JSON.parse(USER_INFO.get()).ffpNo
				,"offerType" : "JPNT"
			}
		}
		
		Api.post(params, function(results) {
			$("[data-user-info-box='availPoint']").text(utils.comma(results.data.availPoint)+"P");
		}, function(error) {
		});
	},
	/**
	 * 폼값을 유지하기 위한 로그인 요청
	 * 즐겨찾기등에서 로그인 요청 시, 페이지의 정보를 유지하기 위함
	 */
	formPostLogin: function(formId, targetUrl) {

		var $form = $("#"+formId);
		var $targetUrl = $("<input type='hidden' name='targetUrl' value='"+targetUrl+"'/>");
		if($form.find("input[name='targetUrl']").length > 0 ){
			$form.find("input[name='targetUrl']").remove();
		}
		$form.append($targetUrl);
		$form.attr("action", "/"+I18N.language+"/member/auth/loginRequier.do");
		$form.attr("method", "post");
		$form.submit();
	},
	/**
	 * 해더
	 */
	_topHeaderTitleInjecter : function() {
		var $body = $("#subLayoutBody");
		if($body) {
			/* 타이틀 해더에 붙이기 */
			var $title = $body.find(".page-title-wrap .page-title");
			var $headerTitles = $("header h2.header__page-name");
			var $headerTitle = $headerTitles;
			// var $headerTitle = $("h2.header__page-name:first-ntd");
			if($headerTitles.length > 1) { // 왜그러는지 :first-ntd 가 페이지별로 이상작동한다...그래서 해당으로 변경 작성
				$headerTitle = $headerTitles.eq(1);
			}
			if($title && $headerTitle) {
				$headerTitle.html($title.html());
			}
			var $stepHeader = $("#stepHeader");
			if($stepHeader.length == 1) {
				var $stepGroup = $stepHeader.find(" > *");
				$headerTitle.after($stepGroup);
			}
		}
	},
	/**
	 * 메뉴 초기화
	 */
	_menuInit : function() {
		$("body").on("click", "[data-action='menu']", function(e){
			
			var menuName = $(this).data("menuName");
			if(menuName === undefined) {
				return;
			}
			var menuUrl = BIZ_COMMONS_VARIABLES.url[menuName] ;
			if(menuUrl === undefined) {
				return;
			}

			//toggle close
			if(menuName === 'travelAgencyD' || menuName === 'travelAgencyF' || menuName.indexOf('family')!==-1) {
				$('[data-element="toggle"]').toggle();
			}

			if(typeof menuUrl == "string") {
				if(menuName === 'main') {
					//device별 메인 이동
					APPCALL.goMain();
				}else{
					location.href = menuUrl;
				}
			} else if(typeof menuUrl == "object") {
				window.open(menuUrl['path'], menuUrl['target']);
			}
		});
	},

	_removeActiveBtn: function() {
		$(document).on('click','[data-element="remove"]', function() {
			if($(this).data('type')==='N') {
				return false;
			}
			$('[data-action="nextBtn"]').removeClass('button--active');
		});
	},
	/**
	 * 초기화 - 정보성 안내물(아코디언) 작동
	 */
	initInfoToggle : function($wraps) {

		$wraps.each(function(i,v)  {
			var $wrap = $(v);
			var action = $(v).data("action") || "";
			if(action != "info-toggle") {
				return true;
			}

			var $panelData = $wrap.find("[data-element='toggle__panel'] > *");
			$panelData.remove(); // 삭제

			/* 토클 아이디 - 안내문 구분값 */
			var categoryCd = $(v).data("toggleId") || "";
			var param = {
				url : "/api/common/biz/guideInfo.json",
				body : {
					langCd : I18N.language,
					categoryNo : categoryCd
				}
			};
			Api.post(param, function(data) { // 성공
				if(data === undefined) {
					$wraps.remove();
					return;
				}
				
				// $(v).slideToggle();
				$wrap.attr("data-options","{\"mode\": \"move scroll\"}");
				$wrap.toggle();
				$wrap.find("[data-element='toggle__panel']").html(data.data.editorCont);
			}, function(data){ // 실패
				console.log(data);
			});
		});
	},
	getHtml: function(params, okCallback, errCallback){
		if(!sUtil.isEmpty(params) && !sUtil.isEmpty(okCallback)) {
			if (typeof params === 'string') {
				params = {
					url: params
				};
			}

			if(!sUtil.isEmpty(params.url)) {
				if (sUtil.isEmpty(params.body)) {
					params.body = {};
				}

				$.ajax({
					type: 'GET',
					url: params.url,
					data: params.body,
					timeout: 20000,
					dataType: 'html',
					contentType: 'text/html',
					async: true,
					beforeSend: function () {
						//loading start
					},
					complete: function () {
						//loading end
					},
					success: function (results) {
						if (results.code && results.code !== '0000') {
							if (errCallback) {
								errCallback(results);
							}
						} else {
							okCallback($.trim(results));
						}
					},
					error: function (error) {
						if (errCallback) {
							errCallback(error);
						}
					}
				});
			}
		}
	},
	/**
	 * 페이지별 스크립트로 다국어 사용 시, ready에서 호출 할 것
	 * pageNo는 "0000000001"로 단건 호출이 가능하며,
	 * "0000000001_0000000002"로 "_"구분으로 다건 호출이 가능합니다.
	 * @param {string} pageNo 
	 */
	callI18n : function(pageNo, callback) {
		$.i18n()
			.load("/api/common/biz/i18nPageInfo.json?pageId="+pageNo)
			.done(function() {
				$.i18n().locale = I18N.language;
				if(callback) {
					callback();
				}
			}
		);
	},
	/**
	 * 페이지별 다국어 사용 시, 메시지코드를 넣어 호출한다.
	 * msgCode를 넣고 호출 시, 같은 값을 i18n에서 호출한다면 ""값으로 반환한다.
	 * @param {string} msgCode 
	 * @returns 
	 */
	getI18n : function(msgCode,defaultMsg) {
		var msg = $.i18n(msgCode);
		if(msg == msgCode) {
			msg = "";
		}
        if(msg == "" && defaultMsg !== "undefined"){
            return defaultMsg;
        }
		return msg;
	},
	/**
	 * 정상 : 0000
	 * 사용불가능한 특수문자 : 7000
	 * 동일한 문자 4자이상 연속 사용 : 7100
	 * 아이디와 일치하거나 4자이상 동일한 패스워드 : 7200
	 * 비밀번호 오류 : 8000
	 */
	isPasswordValid : function(targetPassword, userId) {
		var alpha = /[a-zA-Z]/;
		var num = /[0-9]/;
		var mark = /[!@#%^*~]/;
		var regexp = /[A-Za-z0-9!@#%^*~]$/;
		var count = 0;

		/**
		 * 역속된 혹은 중복된 문자, 숫자
		 * @param {string}} str 
		 * @param {number} limit 
		 * @returns 
		 */
		function stck(str, limit){
			var o, d, p, n = 0, l = limit==null ? 4 : limit;
			for(var i=0; i<str.length; i++){
				var c = str.charCodeAt(i);
				if(i > 0 && (p = o - c) >-2 && p < 2 && (n = p == d ? n+1 : 0) > l-3) return false;
				d = p, o = c;
			}
			return true;
		}

		/**
		 * 각 비교값간 유사성 찾기
		 * @param {string} destPassword 
		 * @param {string} targetPassword 
		 * @param {number} limit 
		 * @returns 
		 */
		function isPasswordLike(destPassword, targetPassword, limit) {
			if(destPassword.length < limit ||  targetPassword.length < limit) {
				return true;
			}
			
			var idx = targetPassword.length - limit;
			var arr = [];
			for(i = 0; i <= idx; i++) {
				arr.push(targetPassword.substring(i+0, limit+i));
			}

			for(j = 0; j < arr.length; j++) {
				if(destPassword.indexOf(arr[j]) > -1) {
					return false;
				}
			}
			return true;
		}


		if(alpha.test(targetPassword)) {
			count++;
		}
		if(num.test(targetPassword)) {
			count++;
		}
		if(mark.test(targetPassword)) {
			count++;
		}
		if(count < 2) {
			return "8000"; // 영문/숫자/특수문자 조합이 중 2가지 미만
		}
		var len = targetPassword.length;
		if(len < 8 || len > 20) {
			return "8000"; // 패스워드 길이는 8~20자이여야 한다.
		}

		if(!regexp.test(targetPassword)) {
			return "7000"; // 허용되지 않은 특수문자
		}

		if(!stck(targetPassword, 4)) {
			return "7100"; // 4자이상 동일한 패스워드, 4자이상 연속된
		}

		if(userId !== undefined && !isPasswordLike(targetPassword, userId, 4)) {
			return "7200";
		}

		return "0000";
	},
	/**
	 * 쿠키 동의 선택 시,
	 */
	cookieAgree : function(obj) {
		var $this = $(obj);
		var no = $this.data("no");
		utils.setCookie("cookie_agree", no, 365);
		$("#cookieAgreeBox").remove();
	},


	
	/* 이메일전송
	body ={
		host:location.origin,
		url: '/'+I18N.language+'/member/setup/passwordInit.do',
		ffpNo:MEMBER_AUTH_FINDUSERINFOLIST_VARIABLES.ffpNo
	}
	*/
	sendEmail: function(body, flag, callback) {
		if(!body.host) {
			body['host'] = location.origin;
		}
		var params = {
			"url":'/api/member/login/sendEmailJson.json',
			"body" : body
		}
		
		Api.post(params, function(results) {
			
			if(results.code==='0000') {
				if(results.data.code==='00') {//인증 성공
					if(flag!=='N') {
						// 이메일 가이드 화면으로 이동
						var url = '/'+I18N.language+'/member/login/emailSendGuide.do';
						var vHtml = "<form id='hybdComForm'>"
										+"<input type='hidden' name='email' value='" + results.data.email + "'/>"
										+"<input type='hidden' name='url' value='" + results.data.url + "'/>"
										+"<input type='hidden' name='ffpNo' value='" + results.data.ffpNo + "'/>"
										+"<input type='hidden' name='title' value='" + results.data.title + "'/>"
									+"</form>" ;
						$("body").append(vHtml);
      					$("#hybdComForm").prop("action", url).prop("method", "post").prop("target", "_self").submit();
					}else{
						try{
							callback('SUCCESS');
						}catch(e){};
					}
					
					return false;
				}else{
					try{
						callback('FAIL');
					}catch(e){};
					return false;
				}
			}
			
			$.JJAlert({
				message: '통신중 오류가 발생하여씁니다.'
			});
			
		}, function(error) {
		});
	},
	
	
	/*국가코드 번호 전송
	*/
	phoneCountryText : function() {
		var countryText = "";
		if(I18N.country == "KR"){
			countryText ="82";
		}else if(I18N.country == "US"){
			countryText ="1";
		}else if(I18N.country == "PH"){
			countryText ="63";
		}else if(I18N.country == "SG"){
			countryText ="65";
		}else if(I18N.country == "LA"){
			countryText ="856";
		}else if(I18N.country == "MY"){
			countryText ="60";
		}else if(I18N.country == "VN"){
			countryText ="84";
		}else if(I18N.country == "RU"){
			countryText ="7";
		}else if(I18N.country == "TH"){
			countryText ="66";
		}else if(I18N.country == "JP"){
			countryText ="81";
		}else if(I18N.country == "CN"){
			countryText ="86";
		}else if(I18N.country == "TW"){
			countryText ="886";
		}else if(I18N.country == "HK"){
			countryText ="852";
		}else if(I18N.country == "MO"){
			countryText ="853";
		}
		return countryText;
	},
	
	/* 로그인x/비회원 로그인 시 링크 211005 추가
	*/
	confirmHomepageMenu : function(menuName, menuUrl) {
		if(menuName == '나의 예약 현황' || menuName == '나의 탑승 내역'){
			location.href="/"+I18N.language+"/ibe/mypage/viewOnOffReservationList.do";
		}else{
			if(menuUrl.indexOf('viewCheckin.do') !== -1) { //탑승권 시 wcc로 넘어가야함
				URL_LINK.getHwUrl(menuUrl);
			}else{
				Progress.show(function(){ //로딩바
					location.href="/"+I18N.language+menuUrl;
				});
			}
		}
	},
	
	confirmLogout : function() {
		$.JJConfirm({
			message: BIZ_COMMONS_SCRIPT.getI18n("0000000127.msg00154", "로그아웃 하시겠습니까?")
		}, 
		function(results) {
			if (results === 'Y') {
				Progress.show(function(){ //로딩바
					location.href = "/"+I18N.language+"/member/auth/logout.do";
				});
			} else {
				return;
			}
		});
	}

}

/* JQUERY */
$(document).ready(function(){
	BIZ_COMMONS_SCRIPT.init();
	var $btnCountrySelector = $("#btnCountrySelector");
	var $languageChoice = $("#languageChoice");
	
	$btnCountrySelector.click(function(e){
		$.JJSelectCountryAndLanguage(this, function(results) {});
	});
	$("body").on("change", "#countryChoice",function(e){
		var selected = $(this).val();
		var languages = [];
		$.each(I18N.countryAndLanguage, function(k,v){
			if(v.cntryCd ==selected) {
				languages = v.languages;
			}
		});

		$languageChoice.find(" > *").remove();
		$.each(languages, function(k,v){
			var $option = $("<option value='"+v.langCd+"'>"+v.langNm+"</option>");
			$languageChoice.append($option);
		});
	}).on("click", "#countryAndLanguageChoiceBtn",function(e){
		var $languageChoice = $("#languageChoice");
		var $countryChoice = $("#countryChoice");
		var locale = $languageChoice.val()+"_"+$countryChoice.val();
		var flag = $(this).data('flag');
		location.href = "/common/locale/change.do?localeValue="+locale+"&flag="+flag;
	}).on("click", "#cookieAgreeSign",function(e){
		BIZ_COMMONS_SCRIPT.cookieAgree(this);
	}).on("click", "#logout",function(e){
		BIZ_COMMONS_SCRIPT.confirmLogout();
	});
});

function openAuthFrame(type) {
	/*
	switch(type) {
		case "open":
			$("#body").css("display", "none");
			$("#header").css("display", "none");
			$("#ifmWrap").css("display", "block");
			break;
		case "close":
			$("#body").css("display", "block");
			$("#header").css("display", "block");
			$("#ifmWrap").css("display", "none");
			break;
	} 
	*/
}