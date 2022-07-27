/**
 * @file 메인페이지
 * @since 2021.03.24
 * @author 백승건
 * @description
 *      2021.03.24 백승건 (신한DS) / 최초 구축 프로젝트 / 최초 작성
 *
 * Copyright (c) 2021 AKIS Inc. All Rights Reserved
 */

 /* 업무 변수 */
 var MAIN_BASE_INDEX_VARIABLES = {
	
}

/* 업무 스크립트 */
var MAIN_BASE_INDEX_SCRIPT = {

    /**
     * 초기화
     */
    init: function() {
        console.log("초기화 작동");
    }
}

$(document).ready(function () {
	$('.button-bookmark').on('click', function (e) {
		console.log(11);
		$(e.currentTarget).toggleClass('on');
	});
	if ($(window).width() > 380) {
		$('.carousel--main .carousel__contents').addClass('w380');
	}
	
	// quick-booking type : 왕복, 편도
	$('.quick-booking-top > li > a').on('click', function () {
		$(this).parent('li').siblings().removeClass('active');
		$(this).parent('li').addClass('active');
	});
	$('.quick-booking-top .booking-type1 > a').on('click', function () {
		$(this).parents('.quick-booking').find('.booking-cont.type2').removeClass('active');
		$(this).parents('.quick-booking').find('.booking-cont.type1').addClass('active');
	});
	$('.quick-booking-top .booking-type2 > a').on('click', function () {
		$(this).parents('.quick-booking').find('.booking-cont.type1').removeClass('active');
		$(this).parents('.quick-booking').find('.booking-cont.type2').addClass('active');
	});

	$('.goto-quick-booking > a').on('click', function () {
		$('.sticky-booking').addClass('sticky-booking-active');
	});
	$('.quick-booking .dimmed').on('click', function () {
		$('html').removeClass('sticky-booking-active');
		// $dateLayer.slideUp(300);
	});
});

// 프리미엄 서비스 슬라이드
var premiumSv;

function initPremiumSvSwiper() {
	var displayChk = $('body').hasClass('isPc')
	console.log(displayChk, premiumSv)
	if (displayChk && premiumSv != undefined) {
		premiumSv.destroy(true)
		premiumSv = undefined
		$('.premium-service .swiper-wrapper').removeAttr('style');
		$('.premium-service .swiper-slide').removeAttr('style');
	} else if (!displayChk && premiumSv == undefined) {
		premiumSv = new Swiper('.premium-service', {
			slidesPerView: 'auto',
		});
	}
}
$(window).on('load resize', function () {
	initPremiumSvSwiper()
})