/**
 * @file   이벤트 스크립트
 * @since 2021.05.26
 * @author 양성일
 * @description
 * 2021.05.26 양성일 (신한DS) / 최초 구축 프로젝트 / 최초 작성
 * Copyright (c) 2021 Jejuair Inc. All Rights Reserved
 */

/* 업무 변수 */
var EVENT_EVENT_VARIABLES = {
    eventListCnt: 0,
    eventListLimit: 999
}

/* 업무 스크립트 */
var EVENT_EVENT_SCRIPT = {

    /**
     * 초기화
     */
    init: function() {
        BIZ_COMMONS_SCRIPT.callI18n("0000000607")
    },
    loadEventPage: function(pageNum) {
        if($('.current--event .search-result__item').length < EVENT_EVENT_VARIABLES.eventListLimit) {
            BIZ_COMMONS_SCRIPT.getHtml({
                url: 'eventList.do',
                body: {
                    pageNum: pageNum
                }
            }, function (html) {
                EVENT_EVENT_VARIABLES.pageNum = pageNum;
                $('.search-result--event .search-result__contents').append(html);
                EVENT_EVENT_SCRIPT._showMoreInEventTab();
            }, function (error) {
                EVENT_EVENT_SCRIPT._showAlert(BIZ_COMMONS_SCRIPT.getI18n("0000000607.msg00007", "이벤트 목록을 로딩하는데 실패하였습니다."));
            });
        }
    },
    setEventListCnt: function(totCnt, totalPage, pageNum) {
        EVENT_EVENT_VARIABLES.totCnt = totCnt;
        EVENT_EVENT_VARIABLES.totalPage = totalPage;
        EVENT_EVENT_VARIABLES.pageNum = pageNum;
        this._showMoreInEventTab();
    },
    _showMoreInEventTab: function() {
        var showEventCnt = $('.search-result--event .search-result__item').length;

        if(EVENT_EVENT_VARIABLES.totalPage === EVENT_EVENT_VARIABLES.pageNum) {
            $('.more-wrap').html('');
        } else {
            $('.more-wrap').html('<button type="button" class="more__button"><span class="more__button-text">'+BIZ_COMMONS_SCRIPT.getI18n("0000000607.msg00009", "더보기")+' (<span class="more__button--color">'+showEventCnt+'</span>/'+EVENT_EVENT_VARIABLES.totCnt+')</span></button>')
            var nextPageNum = EVENT_EVENT_VARIABLES.pageNum + 1;
            $('.more-wrap').find('.more__button').click(function() {
                EVENT_EVENT_SCRIPT.loadEventPage(nextPageNum);
            });
        }
    },
    _showAlert: function(msg) {
        var htmlMsg = msg.replace(/(?:\ r\n|\r|\n)/g,'<br>');
        $.JJAlert({
            message: htmlMsg
        });
    }
}
$(document).ready(function(){
    EVENT_EVENT_SCRIPT.init();
});