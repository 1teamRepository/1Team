/**
 * @file   지난 이벤트 스크립트
 * @since 2021.08.05
 * @author 양성일
 * @description
 * 2021.05.26 양성일 (신한DS) / 최초 구축 프로젝트 / 최초 작성
 * Copyright (c) 2021 Jejuair Inc. All Rights Reserved
 */

/* 업무 변수 */
var EVENT_PAST_EVENT_VARIABLES = {

}

/* 업무 스크립트 */
var EVENT_PAST_EVENT_SCRIPT = {

    /**
     * 초기화
     */
    init: function() {
        BIZ_COMMONS_SCRIPT.callI18n("0000000607")
    },
    loadPastEventPage: function(pageNum, limit, totCnt) {
        BIZ_COMMONS_SCRIPT.getHtml({
            url: 'pastEventList.do',
            body: {
                pageNum: pageNum
            }
        }, function(html) {
            EVENT_PAST_EVENT_VARIABLES.pageNum = pageNum;
            $('.search-result--event .search-result__contents').html(html);
            pagination.createPagination('.paging-center', 'javascript:EVENT_PAST_EVENT_SCRIPT.loadPastEventPage({{pageNum}}, {{limit}}, {{totCnt}});',
                limit, pageNum, totCnt);
        }, function(error) {
            EVENT_PAST_EVENT_SCRIPT._showAlert(BIZ_COMMONS_SCRIPT.getI18n("0000000607.msg00007", "이벤트 목록을 로딩하는데 실패하였습니다."));
        });
    },
    _showAlert: function(msg) {
        var htmlMsg = msg.replace(/(?:\ r\n|\r|\n)/g,'<br>');
        $.JJAlert({
            message: htmlMsg
        });
    }
}
$(document).ready(function(){
    EVENT_PAST_EVENT_SCRIPT.init();
});