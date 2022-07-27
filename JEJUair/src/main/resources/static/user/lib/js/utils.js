var utils = {
    // local storage 
    evtDevice: null,
    evtTitle : null,
    init: function() {

        this.evtDevice = jQuery.Event('evt:device');
       // this.evtTitle  = jQuery.Event('evt:title');

      //  this.storage.init();
        this.platform.init();

        $( window ).resize( function() {
            utils.platform.init();
        });
    /*
        // breadcrumb 셋팅
        $(document).off('evt:title')
                  .on('evt:title',function(e, datas){
                     console.log(datas);
                     utils.titles(datas);
                  });
    
        var datas = [
                        {
                            title:'title1',
                            link:'link1',
                            
                        },
                        {
                            title:'title2',
                            link:'link2',
                            children:[
                                {
                                title: 'subtitle2',
                                link:'sublink2'
                                }
                            ]
                        },
                    ];
        $(document).trigger('evt:title', [datas]);
        */
    },
    /* 사용되지 않음.
    storage: {
        init: function(){
            try{
                this.isSupport = localforage.supports(localforage.INDEXEDDB);
                if(this.isSupport) {
                    // 우선 순위 설정
                    localforage.config({
                        driver: [
                                    localforage.INDEXEDDB,
                                    localforage.LOCALSTORAGE,
                                    //localforage.WEBSQL,
                                ],
                        name: 'jejuAir',
                        storeName: 'local'
                    });
                    utils.console.log('storage init fired!!!!!');
                }
            }catch(e){
                //console.log(e);
            }
        },
        //지원여부
        isSupport: false,
        setItem: function(k, v, callback) {
            localforage.setItem(k,v, callback);
        },
        getItem: function(k, callback) {
            localforage.getItem(k, callback);
        },
      
        removeItem: function(k, callback) {
            localforage.removeItem(k, callback);
        },
        clear: function( callback ) {
            localforage.clear( callback );
        }
   },
   */
   //단말 정보
   platform: {
      init: function() {

            this.isMobile   =  !window.matchMedia("(min-width: 1080px)").matches;
            this.isPc       =  !this.isMobile;
            this.device     =  this.isMobile?'mobile':'pc';
            this.browser    =  this.browserCheck();
            
            if(this.tempDevice !== this.device){// device platform change trigger
                $(document).trigger(utils.evtDevice, this.device);
                this.tempDevice = this.device;
            }
        },
        isMobile:  false,
            isPc:  false,
      tempDevice:  'unkown',
          device:  'unkown',
         browser:  'unkown',
      browserCheck: function() {
        var userAgent = navigator.userAgent;
        var browser = "unkown";
        // Detect browser name
        browser = (/ucbrowser/i).test(userAgent) ? 'UCBrowser' : browser;
        browser = (/edg/i).test(userAgent) ? 'Edge' : browser;
        browser = (/googlebot/i).test(userAgent) ? 'GoogleBot' : browser;
        browser = (/chromium/i).test(userAgent) ? 'Chromium' : browser;
        browser = (/firefox|fxios/i).test(userAgent) && !(/seamonkey/i).test(userAgent) ? 'Firefox' : browser;
        browser = (/; msie|trident/i).test(userAgent) && !(/ucbrowser/i).test(userAgent) ? 'IE' : browser;
        browser = (/chrome|crios/i).test(userAgent) && !(/opr|opera|chromium|edg|ucbrowser|googlebot/i).test(userAgent) ? 'Chrome' : browser;;
        browser = (/safari/i).test(userAgent) && !(/chromium|edg|ucbrowser|chrome|crios|opr|opera|fxios|firefox/i).test(userAgent) ? 'Safari' : browser;
        browser = (/opr|opera/i).test(userAgent) ? 'Opera' : browser;

        switch (browser) {
            case 'UCBrowser': return [browser.toUpperCase(), this.browserVersion(userAgent,/(ucbrowser)\/([\d\.]+)/i)];
            case 'Edge':      return [browser.toUpperCase(), this.browserVersion(userAgent,/(edge|edga|edgios|edg)\/([\d\.]+)/i)];
            case 'GoogleBot': return [browser.toUpperCase(), this.browserVersion(userAgent,/(googlebot)\/([\d\.]+)/i)];
            case 'Chromium':  return [browser.toUpperCase(), this.browserVersion(userAgent,/(chromium)\/([\d\.]+)/i)];
            case 'Firefox':   return [browser.toUpperCase(), this.browserVersion(userAgent,/(firefox|fxios)\/([\d\.]+)/i)];
            case 'Chrome':    return [browser.toUpperCase(), this.browserVersion(userAgent,/(chrome|crios)\/([\d\.]+)/i)];
            case 'Safari':    return [browser.toUpperCase(), this.browserVersion(userAgent,/(safari)\/([\d\.]+)/i)];
            case 'Opera':     return [browser.toUpperCase(), this.browserVersion(userAgent,/(opera|opr)\/([\d\.]+)/i)];
            case 'IE': 
                var version = this.browserVersion(userAgent,/(trident)\/([\d\.]+)/i);
                // IE version is mapped using trident version 
                // IE/8.0 = Trident/4.0, IE/9.0 = Trident/5.0
                return version ? [browser, parseFloat(version) + 4.0] : [browser,'7.0'];
            default: return ['unknown','0.0.0.0'];
        }
      },
      browserVersion: function(userAgent,regex) {
        return userAgent.match(regex) ? userAgent.match(regex)[2] : null;
      } 
   },
   
   console: {
       log: function(message) {
            console.log(message);
       },
       debug: function(message) {
            console.debug(message);
       },
       trace: function() {
            console.trace();
       },
       warn: function(message) {
            console.warn(message);
       },
       error: function(message) {
            console.error(message);
       },
       info: function(message) {
            console.info(message);
       }, 
    },
   
    alert: function(message) {
        alert(message);
        return false;
    },
    
    confirm: function(message){
        if(this.confirm(message)) {
            return true;
        }
        return false;
    },

   //외부 스크립트 지연 로드하기 위함
   script: function(url, callback) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = url;
        var x = document.getElementsByTagName('body')[0];
        x.appendChild(s);
    },
    
    titles: function(datas) {
        var vHtml = '';
        for(var i=0;i<datas.length;i++) {
            if(i===(datas.length-1)) {//마지막
                vHtml += '<div class="breadcrumb__item breadcrumb__item--current" aria-current="page" data-element="toggle" data-options="{&quot;mode&quot;: &quot;slide&quot;, &quot;speed&quot;: 100, &quot;clickToClose&quot;: true}">'+
                            '<button type="button" class="breadcrumb__link breadcrumb__link--list" data-element="toggle__anchor" aria-controls="toggle-28" aria-expanded="false">'+datas[i].title+'</button>'+
                            '<div class="breadcrumb__siblings-list" data-element="toggle__panel" id="toggle-28">';
                for(j=0;j<datas[i].children.length;j++) {
                    vHtml += '<a href="#" class="item">'+datas[i].children[j].title+'</a>';
                }
                vHtml +=  '</div>'+
                        '</div>';
            }else{
                vHtml += '<div class="breadcrumb__item">'+
                            '<a href="'+datas[i].link+'" class="breadcrumb__link">'+datas[i].title+'</a>'+
                        '</div>';
            }
        }
        $('#breadcrumb > nav.breadcrumb__inner').html(vHtml);
    },

    //공백 체크
    isEmpty: function(data) {
        if(typeof(data) === 'object'){
            if(JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]'){
                return true;
            }else if(!data){
                return true;
            }
            return false;
        }else if(typeof(data) === 'string'){
            if(!data.trim()){
                return true;
            }
            return false;
        }else if(typeof(data) === 'undefined'){
            return true;
        }else{
            return false;
        }
    },

    comma: function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    emailCheck : function(email) {
        // var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

        // if(exptext.test(email)==false){
        // //이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐 경우
        //     return false;
        // }
        // return true;
		var regExp = /^[0-9a-zA-Z\_\-\.]*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        return regExp.test(email);
    },
    phoneCheck : function(phone) {
        var regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
        return regExp.test(phone);
    },
    copyJson : function(data) {
        return JSON.parse(JSON.stringify(data));
    },
    
    setCookie : function(cookie_name, value, days) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + days);
        // 설정 일수만큼 현재시간에 만료값으로 지정
        var cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
        document.cookie = cookie_name + '=' + cookie_value;
      }
}

utils.init();

//page 이동
var Navigator = {
    next: function(url, param) {
        $.JJLocation(url, param);
       // location.href=url;
       // $("body").append("<form id='hybdComForm'><input type='hidden' name='parameter' value='" + JSON.stringify(param) + "'/></form>");
       // $("#hybdComForm").prop("action", url).prop("method", "post").prop("target", "_self").submit();
        //or native 호출
    },
    nextPop: function() {
        if(param && param.host){
			menuUrl = param.host + menuUrl;
		}
		
    	$("body").append("<form id='hybdComForm'><input type='hidden' name='parameter' value='" + JSON.stringify(param) + "'/></form>");
    	$("#hybdComForm").prop("action", menuUrl).prop("method", "get").prop("target", "_blank").submit();
		$("#hybdComForm").remove();
    },
    prev: function() {
        window.history.back();
        //or native 호출
    },
    prevPop: function(param) {
        //TODO : 
        var p = {
                prevParam : param
        };
        
        opener.onJSResult(p);
        window.close();
    }
};

//api ajax요청
var Api = {
    headers: function() {
    },
    get:  function(params, sucCallback, errCallback) {
        this.request('GET', params, sucCallback, errCallback);
    },
    post: function(params, sucCallback, errCallback) {
        this.request('POST', params, sucCallback, errCallback);
    },
    sendRequest: function(params, sucCallback, errCallback) {
        this.request('POST', params, sucCallback, errCallback);
    },
    request: function(type, params, sucCallback, errCallback) {

        $.ajax({
            type:         type,
            url:          params.url,
            data:         JSON.stringify(params.body),
            timeout:      20000,
            dataType :    "json",
            contentType : "application/json",
            async : true,
            beforeSend: function() {
                //loading start
                try{
                    //$.JJLoadingShow();
					Progress.show();

                }catch(e){}
            },
            complete: function() {
                //loading end
                try{
                    $.JJLoadingHide();
                }catch(e){}
            },
            success: function(data) {
                
                if(data.code === '0000' || data.code === 'S' || data.resultCode === '0000') {
                    // sucCallback(data.DATA);
                    sucCallback(data);
                }else {
                    errCallback(data);
                }
                //setTimeout(function(){
                //     try{
                //    $.JJLoadingHide();
                //     }catch(e){}
                //}, 500);
            },
            error : function(data, textStatus, errorThrown) {
                // try{
                //     $.JJLoadingHide();
                // }catch(e){}
                console.log("Ajax Error textStatus >> " + textStatus + "\nerrorThrown >> " + errorThrown);
                //utils.alert(data.ER_TT + "[" + data.RU_CD + "]");
                errCallback(data);
            },
        });

    }
};

var Progress = {
    show:function(callback){
        $.JJLoadingShow(null, callback);
    },
    hide:function(){
        $.JJLoadingHide();
    },
    air: {
        //항공권 조회 - 마케팅형
        bookingShow: function() {
            var params = {'categoryNo':'0000000375'};
            $.JJAirLoadingShow(params);
        },
        passportShow: function() {
            var params = {'categoryNo':'0000000376'};
            $.JJAirLoadingShow(params);
        },
        hide: function() {
            $.JJAirLoadingHide();
        }
    }
}