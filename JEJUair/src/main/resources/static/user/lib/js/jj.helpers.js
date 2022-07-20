var pJaxDirection = '';
 //팝업에 팝업 위한 array
var popupArray = [];
var toastArray = [];
function JJRandom(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function navMenu() { //menu활성화

    var pageType = 'gnb';
    
    for(var i=0;i<$('a.quick-menu__item').length;i++){
        try{
            if($('a.quick-menu__item:eq('+i+')').attr('onclick').indexOf(window.location.pathname)!==-1){

                pageType = 'main';
                $('a.quick-menu__item').removeClass('on').removeAttr('disabled');
                $('a.quick-menu__item:eq('+i+')').addClass('on').attr('disabled', 'disabled')
                $('.isSubPage').hide();
                $('.isMainPage').show();
                $('#footer div.footer').show();
                $('#footer div.quick-menu').css('display','flex');
                
                break;
            }
        }catch(e){}
    }

    //main이 아닐경우
    if(pageType==='gnb') {
       
        $('#footer div.mobile-only').hide();
        $('.isMainPage').hide();
        $('.isSubPage').show();
    }

    if($('#gnb').is(':visible')) {//gnb닫기
        $('#gnb a.gnb-close').trigger('click');
    }

    if($('[data-element=gnbToggle] > button.gnb__button').hasClass('active')) {
        $('[data-element=gnbToggle] > button.active').trigger('click');
    }
    
}

/*
$(document).off('evt:device').on('evt:device' ,function(e, results){
    if(results === 'pc') {
        utils.loadPc();
    }else{
        utils.loadMobile();
    }
});
*/

(function ( $ ) {

    //pjax이동내에 파라미터 전달
    var parameter = function () {
        var param = {parameter:{}};
        return {
            set:function(datas) {
                param = datas;
            },
            get:function() {
                return param;
            }
        }
    }();
    
    var comInit = function() {
        
        if(pJaxDirection===''){// browser back/forward 아닐경우만 호출
            //처음 로드시에만 이벤트 발생
            onJSReady(parameter.get());
        }

      //  CustomEvent();

        customSelect.init('.select .select__selection');
        formControl.init();
       // modalUI('[data-element="modal_anchor"]');
        uiCarousel.init('[data-carousel]');
       // datepicker.init('[data-picker]');
        slider.init('.slider .slider__item');
      //  toast.init();
        setBottom.init();
        inputToggle.init('[data-element="inputToggle"]');
        
        uiSelect.destroy();
        setTimeout(function(){
            uiSelect.init('[data-element="select"]'); //사이드 메뉴 상단 언어선택이 호출하는만큼 생성이 됨
        },10);
        
        anchorMove.init('[data-anchor]');
        sticky('[data-sticky]');
        defaultMsg.init('[data-default-message]');
        tooltip.init('[data-element="tooltip"]');
        wideScroll.init('.wideScroll');
        buttonTextToggle.init('[data-text-toggle]'); // 수정
      
        customToggle.initEvent();
        seatMap();
        responsive();

        $('[data-element="tab"]').tab();
        $('[data-element="toggle"]').toggle();
        $('[data-element=accordion]').accordion();

       pJaxDirection = '';
        
    };
    
    $.JJLocation = function(params, datas) {
        
        if(sUtil.isEmpty(params)){
            return false;
        }

        var options = {};

        if(typeof params === 'string') {

              options = {
                    container : '#body'
                  , fragment  : '#body'
               };
            //동일 페이지시 이동 불가
            if(window.location.href.indexOf(params) !== -1){
                return false;
            };
            options.url = params;

        }else {
            
            if(!params.url) {
               return false;
            }

            //동일 페이지시 이동 불가
            if(window.location.href.indexOf(params.url) !== -1){
                return false;
            };

            options = params;

            if(params.url) {
                options.url = params.url;
            }

            if(!params.container) {
                options.container = '#body';
            }
    
            if(!params.fragment) {
                options.fragment = '#body';
            }

        }
        parameter.set({parameter:{}});
        if(!sUtil.isEmpty(datas)) {//값전달
            options.type = 'POST';
            options.data = {parameter:JSON.stringify(datas)};
            parameter.set({parameter:datas});
        }
        console.log(options);

        $.pjax(options);
        
    };


    /**
     * a tag href에 링크가 있어 처리 필요시
     */
    $(document).off('click','.js-pjax').on('click','.js-pjax', function(event){

         //동일 페이지시 이동 불가
        if(window.location.href.indexOf($(this).attr('href')) !== -1){
            navMenu();
            return false;
        };
        var container = $(this).attr('data-container');
        var fragment  = $(this).attr('data-fragment'); 
        var replace   = $(this).attr('data-replace');  
        var push   = $(this).attr('data-push');  
        var options   = {};
        if(!container){
            container = '#body';
        }
        if(!fragment){
            fragment = '#body';
        }
        if(replace){
            options.replace = JSON.parse(replace);
        }
        if(push){
            options.push = JSON.parse(push);
        }
        options.container = container;
        options.fragment  = fragment;

        $.pjax.click(event, options);

    });

    $(document).on('ready pjax:beforeSend', function() {
       //$.JJLoadingShow('test');
      // $('.jjComponent').remove();
    });

    // $(document).on('ready pjax:start', function() {
    //     console.log('ready pjax:start');
    //     $.JJLoadingShow('test');
    // });
  
    $(document).on('ready pjax:end', function(event) {

        $('.jjComponent').remove();
        //플러그인들 초기화
        comInit();
        //메뉴 중복 클릭   
        navMenu();
        $(document).trigger('evt:device', utils.platform.device);
    });

    $(document).on('ready pjax:popstate', function(event) {
        pJaxDirection = event.direction;
        //back/forward 시 modal 및 sheet이 있을경우 닫기
        $('[rel="modal:close"], [data-element="bottomSheet__button-close"]').trigger('click');
    });

}( jQuery ));


(function ( $ ) {
    // 
    $.fn.JJComponent = function(params, evtCallback, complete) {

        var $this = this;
         //이미 로드 여부
        if(params.page!=='pcMenu' && params.page!=='mobileMenu' && $(this).attr('data-load')==='Y') {
            if(complete) { //로드 완료 콜백
               complete($this);
            }
            return false;
        }else{
            if((params.page==='pcMenu' && $(this).hasClass('pc-only')) || (params.page==='mobileMenu' && $(this).hasClass('mobile-only'))) {
                if(complete) { //로드 완료 콜백
                    complete($this);
                }
                return false;
            }
        }

        if(!params.topic) {
            params.topic = params.page+'_'+ params.random;
        }
        // params.pagePath = resource+'/components/'+params.page+'.hbs';
        var datas = null;
        if(!params.pagePath) { // 없을경우 컴퍼넌트
           // params.pagePath = PROP.assetsUrl+'/components/'+params.page+'.hbs';
           params.pagePath = '/'+I18N.language+'/common/components/'+params.page+'.do';
        }else{
            datas = params.datas;
        }
     //   }
       // setTimeout(function(){
        $($this).load(params.pagePath, datas, function( response, status, xhr ){

            if(status === 'success'){ //로드 성공 완료
                $(this).attr('data-load','Y');
            }

            try{
               // var topic = params.page.split('/').pop().split('.')[0];
                var comp = params.page+'Comp';
                //초기화
                eval(comp).init(params, $this);

                if(evtCallback){
                    $(document).off(params.topic)
                                .on(params.topic, function(e, results) {
                        evtCallback(results);
                    })
                }
            }catch(e){
                if(evtCallback){
                    evtCallback(null);
                }
            }

            if(complete) { //로드 완료 콜백
                complete($this);
            }

        });
       // }, 0);

    };

}( jQuery ));

//alert confirm
(function ( $ ) {

     $.JJModal = function(el, params, evtCallback) { //modal형태 화면

        if(!$(el).is('[data-target]')){
            params.random = JJRandom(1, 999)+''+new Date().getTime();
            $(el).attr('data-target','#'+params.page+'ModalLayer_'+params.random)
                 .attr('data-element','modal_anchor')
                 .attr('data-modal-type','full');

            $('body').append($('<div class="jj'+params.page+'_'+params.random+'">'));
            $('div.jj'+params.page+'_'+params.random).JJComponent( params, function(results) {
                if(evtCallback){
                    evtCallback(results);
                }
            }, function(){ //로드 완료후 펼치기
                modalUI($(el));//modal 초기화 필요
                $(el).trigger('click');
                //$('div.jj'+params.page+'_'+params.random).remove();
            });
        }
       
    }
    //국가 코드 선택
    $.JJSelectCountry = function(el, evtCallback) {
        var params = {
            page: 'selectCountry',
        }
        $.JJModal(el, params, evtCallback);
    }


    //국가별 언어 조회 - 선택
    $.JJSelectCountryAndLanguage = function(el, evtCallback) {
        var params = {
            page: 'countryLangSelector',
        }
        $.JJModal(el, params, evtCallback);
    }


    //우편번호 검색
    $.JJSelectAddress = function(el, evtCallback) {
        var params = {
            page: 'selectAddress',
        }
        $.JJModal(el, params, evtCallback);
    }
     //출발/도착지 선택
    $.JJSelectArea = function(el, evtCallback) {
        var params = {
            page: 'selectArea',
        }
        $.JJModal(el, params, evtCallback);
    }
    
    //sns공유하기
    $.JJSnsShare = function(el, url) {
        var params = {
              page: 'snsShare'
            , datas: {url:url}
        } 
        $.JJModal(el, params);
    }

     //<a data-element="sns_share" data-url="https://jejuair.net" data-callback="" data-types="KS">공유하기</a>
    $(document).off('click', '[data-element="sns_share"]').on ('click', '[data-element="sns_share"]', function() {
        var device  = APP_DATA.deviceType;
        var deviceos = APP_DATA.deviceOs;
        var contents = BIZ_COMMONS_SCRIPT.getI18n("0000000608.msg02602", "제주항공");
        var url      = !$(this).attr('data-url') ? window.location.href : $(this).attr('data-url');
        var callback = $(this).attr('data-callback'); 
        var types    = $(this).attr('data-types');
        var params = {
            page: 'snsShare'
          , datas: {
                    url:url,
                    callback: callback,
                    types:types,
                  }
        } 

        if( device == "APP"){
            // APP 일 경우
			if (APP_DATA.shortUrl !== '') {
				url = APP_DATA.shortUrl;
			}
            
           //이벤트 공유 일경우
            if(url.indexOf('event/eventDetail.do') != -1) {
                url = window.location.origin+'/common/connect/shareLink.do'+window.location.search+'&langCd='+I18N.language;
            }
            
            var appData = {
                "contents" : contents, 
                "url" : url
            }
            if(deviceos == "aos"){
                // Android
                window.JejuAir.goShare(JSON.stringify(appData));
            } else if(deviceos == "ios") {
                // IOS
                window.webkit.messageHandlers.goShare.postMessage(JSON.stringify(appData));
            }
        } else {
            $.JJModal(this, params);
        }
    });
  
    $.JJPopup = function(datas, evtCallback) {
        //alert(message);
        if(utils.isEmpty(datas)) {
            utils.console.log('data is empty!!!');
             return false;   
        }
        setTimeout(function(){
            var random = JJRandom(1, 999)+''+new Date().getTime();
            var params = {
                               page: 'alert'
                            , random: random
                            , datas: {}
                        }
            
            if(typeof(datas) === 'object'){
                params.datas = datas;
            }else if(typeof(datas) === 'string') {
                params.datas.message = datas;
            }
    
          //  params.datas.random = random;
        
            popupArray.push(random);
    
            $('body').append($('<div class="alertConts_'+random+' jjAlert_'+random+' jjComponent" data-element="modal_anchor" data-target="#alertModalLayer_'+random+'">'));

            $('.alertConts_'+random).JJComponent( params, function(results) {
                if(evtCallback) {
                    if(results) {
                        evtCallback(results.val);
                    }
                }
                popupArray = popupArray.slice(0,popupArray.length-1);
                if(popupArray.length>0){ //alert이 여러개 일경우
                    var preRandom =  popupArray[popupArray.length-1];
                    $('div.alertConts_'+preRandom+'[data-element="modal_anchor"]').trigger('click');
                }else{
                    if(!$('.jquery-modal').hasClass('current')) {
                        closeModal('alertModalLayer_'+results.random);
                    }
                    // $('#alertModalLayer_'+results.random+' a.temp_modal__close').trigger('click');
                }
                //생성한 tag삭제
                $('.jjAlert_'+results.random+', .alertModalLayer_'+results.random).remove();
                try{
                    if($('.jquery-modal').html().length===0){
                        $('.jquery-modal').remove();
                    }
                }catch(e){}
            },function(){ //complete
                try{
                    if(popupArray.length>1) {
                        var preRandom = popupArray[popupArray.length-2];
                        $('.alertModalLayer_'+preRandom).removeClass('on');
                    }
                }catch(e){}
            }); // Y/N 
        }, 0);
        return false;
     }

    /*
        $.JJAlert('테스트입니다.');
    */
     $.JJAlert = function(datas, evtCallback) {
        datas.type='alert';
        $.JJPopup(datas, evtCallback);
     }

     $.JJConfirm = function(datas, evtCallback) {
        datas.type='confirm';
        $.JJPopup(datas, evtCallback);
     }

     //로딩 show
     $.JJLoadingShow = function(message, complete) {

        if(utils.isEmpty(message)) {
            message = 'LOADING';
        }
        if($('body div.jjLoading').attr('data-load')==='Y'){
            $('body div.jjLoading div.loading__text').html(message);
            $('body div.jjLoading').show();
            if(complete) {
                complete();
            }
        }else{
            $('body').append($('<div class="jjLoading">'));
            $('body div.jjLoading').JJComponent( {page:'loading', datas:{message:message}},null, complete);
        }

     }
     //로딩 hide
     $.JJLoadingHide = function() {
        $('body div.jjLoading').hide();
     }

     //bottom sheet형태
     $.JJSheet = function(el, params, evtCallback) {
        var attr = $(el).attr('data-target-open');
        if(utils.isEmpty(attr)){//미로드시

           params.random = JJRandom(1, 999)+''+new Date().getTime();
           $(el).attr('data-target-open', 'bottomSheet_'+params.random);
           $('body').append($('<div class="bootSheetConts_'+params.random+' jjComponent">'));
           $('.bootSheetConts_'+params.random).JJComponent( params, function(result){
               evtCallback(result);
           }, function(){
               $(el).trigger('click');
           } );
           
       }
     }

     //bottom sheet
     $.JJBottomSheet = function(el, datas, evtCallback) {
        var params = {
            page: 'bottomSheet'
          , datas: datas
        } 
        $.JJSheet(el, params, evtCallback);
     }

       //은행선택
     $.JJBankSheet = function(el, datas, evtCallback) {
        var params = {
            page: 'bankSheet'
          , datas: datas
        } 
        $.JJSheet(el, params, evtCallback);
     }

     $.JJToast = function(datas, evtCallback) {
         if(utils.isEmpty(datas)) {
             utils.console.log('data is empty!!!');
             return false;
         } else if(typeof datas === 'object' && utils.isEmpty(datas.message)) {
             utils.console.log('data.message is empty!!!');
             return false;
         }

         setTimeout(function() {
             var random = JJRandom(1, 999) + '' + new Date().getTime();
             var message;
             if(typeof datas === 'string') {
                 message = datas;
             } else if(typeof datas === 'object') {
                 message = datas.message;
             } else {
                 return;
             }

             if($('div.toast').length === 0) {
                 $('body').append($('<div class="toast is-active"></div>'));
             }

             $('<div id="toast_'+random+'" class="toast-box"><p class="toast__text">'+message+'</p></div>').prependTo('div.toast').hide().fadeIn('slow');
             setTimeout(function() {
                 $('div.toast').find('#toast_' + random).fadeOut('slow', function() {
                     $(this).remove();
                 });
             }, 3000);
         });
     }

     //항공권 조회 로딩 show
     $.JJAirLoadingShow = function(datas) {

        if($('body div.jjAirLoading').attr('data-load')==='Y'){
            $('body div.jjAirLoading').show();
        }else{
            $('body').append($('<div class="jjAirLoading">'));
            var params = {
                  page : 'airLoading'
                , pagePath: '/'+I18N.language+'/common/air/loading.do'
                , datas : datas
            }
            $('body div.jjAirLoading').JJComponent(params);
        }

     }
     //항공권 조회 로딩 hide
     $.JJAirLoadingHide = function() {
        $('body div.jjAirLoading').hide();
     }

}( jQuery ));


//datepicker
var JJDatePicker = function() {

    $(document).off('click', 'button[data-jj="date_picker"]')
                .on('click', 'button[data-jj="date_picker"]', function() {
                    var $this = this;
                    var random = JJRandom(1, 999)+''+new Date().getTime();
                    $(this).after('<div id="tempDatePicker_'+random+'">');
                    var params = {
                                      page: 'datePicker'
                                    , datas: {random: random}
                                };

                    $(this).attr('data-element', 'modal_anchor');
                    $(this).attr('data-modal-type', 'datepicker');
                    var jjStartName = $(this).data('jj-start-name');
                    $(this).attr('data-target', '#'+jjStartName+'ModalLayer'+random);
                    $('#tempDatePicker_'+random).JJComponent( params , null, function(){
                        modalUI($($this)); //모달 초기화
                        $($this).removeAttr('data-jj');
                        $($this).trigger('click');
                    });
                })
   
}();


$(document).ready(function(){
  // $(document).trigger('evt:device', utils.platform.device);
});

