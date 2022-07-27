/**
 * @file  고객센터 공지사항페이지 스크립트
 * @since 2021.07.07
 * @author 황명기
 * @description
 * 2021.07.07 황명기 (신한DS) / 최초 구축 프로젝트 / 최초 작성
 * Copyright (c) 2021 Jejuair Inc. All Rights Reserved
 */

 /* 업무 변수 */
var CUSTOMERSERVICE_NOTICE_VARIABLES = {
    pageNum:1,
    limit:5
}

/* 업무 스크립트 */
var CUSTOMERSERVICE_NOTICE_SCRIPT = {

    /**
     * 초기화
     */
    init: function() {
        if($('#billboardNo').val()){
            this._getDetail();
        }else{
            $('#noData').show();
        }
    },

    _getDetail: function() {

        var langCd = $('#langCd').val();
        var params = {
			"url": '/'+langCd+'/customerServiceCenter/noticeDetail.json',
			"body" : {
                billboardNo: $('#billboardNo').val()
			}
		}
		Api.post(params, function(results) {	
            var details = results.data.mtxTt;
            bbr._convertDatas('newsView',details);
		}, function(error) {
			console.log(error);
		});
    },     
    
}
$(document).ready(function(){
	CUSTOMERSERVICE_NOTICE_SCRIPT.init();
});