/**
 * @file 출입국 신고서 작성 안내 스크립트
 * @since 2021.05.27
 * @author 백승건
 * @description
 * 2021.05.27 백승건 (신한DS) / 최초 구축 프로젝트 / 최초 작성
 * Copyright (c) 2021 Jejuair Inc. All Rights Reserved
 */

 /* 업무 변수 */
 var CABINSERVICE_IMMIGRATION_FORMGUIDE_VARIABLES = {

}

/* 업무 스크립트 */
var CABINSERVICE_IMMIGRATION_FORMGUIDE_SCRIPT = {

    /**
     * 초기화
     */
    init: function() {
		console.log("호출확인");
    },
	
}

$(document).ready(function(){
	CABINSERVICE_IMMIGRATION_FORMGUIDE_SCRIPT.init();
	$("#body")
		/* 조회 버튼 */
		.on("change", "#countrySelector", function(ev) {
			var formNo = $(this).val();
			location.href = "?formNo="+formNo;
		});

		
});