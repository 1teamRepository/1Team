"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-new */

/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */

/* eslint-disable consistent-return */

/* eslint no-extra-boolean-cast: 2 */

/* eslint no-eval: 0 */
var MOBILE_WIDTH = 1080;
var PORTRAIT = 'portrait';
var LANDSCAPE = 'landscape'; // UTIL - DOM style 가져오기

function getStyle(target, value) {
  if (!window.getComputedStyle) {
    window.getComputedStyle = function (element) {
      return element.currentStyle;
    };
  }

  var style = window.getComputedStyle(target, null);
  return style[value];
} // UTIL - DOM style 가져오기 (Numberic)


function getStyleNumber(target, value) {
  var result = getStyle(target, value);
  result = Number(result.substr(0, result.length - 2));
  return result;
} //  UTIL - 디바이스 정보 가져오기 (userAgent) (Numberic)


var getMobileDevice = function getMobileDevice(agent) {
  // let useragent       = navigator.userAgent.toLowerCase();
  // ['iphone', 'ipod', 'ipad', 'android', 'blackberry', 'windows ce',
  // 'nokia', 'webos', 'opera mini', 'samsung', 'lg', 'mi', 'sonyericsson',
  // 'opera mobi', 'iemobile', 'huawei', 'oppo', 'mot', 'Macintosh']; // 참고용
  var device = {};
  var lowcase = String(agent).toLocaleLowerCase();

  if (navigator.platform) {
    var isiOSPhone = /iphone|ipod/i.test(lowcase);
    var isiOSTablet = /ipad/i.test(lowcase);
    var isiOSTabletNew = /macintosh/i.test(lowcase); // 차세대 아이패드는 기존 iPad와 달리 Mac운영체제를 씀

    var isAndroid = /android/i.test(lowcase);
    var isAndTablet = /tablet/i.test(lowcase);
    device.isiOS = isiOSPhone || isiOSTablet || isiOSTabletNew;
    device.isAndroid = isAndroid || isAndTablet;
    device.isMSTablet = window.navigator.maxTouchPoints > 1 && device.isiOS === false && device.isAndroid === false;

    if (device.isiOS) {
      device.isTablet = isiOSTablet || isiOSTabletNew;
    } else {
      device.isTablet = isAndTablet;
    }

    device.isMobile = device.isiOS || device.isAndroid;
    device.isMac = isiOSTabletNew;
  }

  return device;
}; // text형 input 모바일에서 활성화 시 sticky Dom 요소 모두 sticky 비 활성화 처리 - (ex NA_1_51)


var inputControlForSticky = function inputControlForSticky() {
  var deviceMode;
  var inputs = $('input[type="text"], input[type="tel"], input[type="email"], input[type="textarea"]');

  var arrangeStickys = function arrangeStickys() {
    var BANSTICKYMEMBERS = [{
      selector: '.sticky__inner',
      type: 'isSticky'
    }, {
      selector: '.booking-sticky',
      type: 'banSticky'
    }];
    var len = BANSTICKYMEMBERS.length;
    var i = 0;

    var _loop = function _loop() {
      var doms = $(BANSTICKYMEMBERS[i].selector);
      var changetype = BANSTICKYMEMBERS[i].type;
      doms.each(function (index, dom) {
        if (changetype === 'isSticky') {
          $(window).trigger('scroll'); // $(window).trigger('scroll');
        } else if (changetype === 'banSticky') {
          if (window.stickyBanMode) {
            $(dom).addClass('banSticky');
          } else {
            $(dom).removeClass('banSticky');
          }
        }
      });
    };

    for (i = 0; i < len; i += 1) {
      _loop();
    }
  };

  var inputStickyHandler = function inputStickyHandler(e) {
    var cur = window.innerWidth > window.innerHeight ? LANDSCAPE : PORTRAIT;

    switch (e.type) {
      case 'focus':
      case 'blur':
        window.stickyBanMode = e.type === 'focus';
        if (cur === LANDSCAPE) window.stickyBanMode = true;
        break;

      case 'resize':
        {
          if (deviceMode !== cur) {
            var summary = $('.booking-sticky');
            deviceMode = cur;

            if (deviceMode === LANDSCAPE) {
              window.stickyBanMode = true;
            } else {
              window.stickyBanMode = false;
            }

            summary.trigger('afterChange', [undefined, deviceMode]); // summary.close();
          }

          break;
        }

      default:
        break;
    }

    arrangeStickys();
  };

  inputs.each(function (i, dom) {
    $(dom).on('focus.inputStickyFocus', inputStickyHandler);
    $(dom).on('blur.inputStickyFocus', inputStickyHandler);
  });
  $(window).on('resize.inputStickyFocus', inputStickyHandler);
  inputStickyHandler({
    type: 'resize'
  });
}; 
// window scroll 에 따라 특정 Dom 요소 fixed 처리


var sticky = function () {
  if (window.stickyElement === undefined) {
    window.stickyElement = [];
    window.position = [];
  }

  var options = {
    win: $(window),
    element: window.stickyElement,
    position: window.position
  }; // 스티키 위치

  function set(stickyElem) {
    var posY = $(stickyElem).offset().top;
    return posY;
  }

  var stickyActiveElement = []; // 상단 sticky가 2개 이상일때 쌓는 구조

  function arrangeSticks() {
    var age = 0;
    var len = stickyActiveElement.length;

    for (var i = 0; i < len; i += 1) {
      var item = stickyActiveElement[i];
      item.style['margin-top'] = "".concat(age, "px");
      var dom = item[0];
      age += item.offsetHeight;
    }
  } 
  
  // 스크롤 이벤트
  function scrollEvent(position) {
    var positionY = 0;
    var elementHeight = 0;
    var mobileBool;
    $('.is-sticky:visible').each(function (i, e) {
      elementHeight += $(e).closest('.sticky-wrap').outerHeight(true);
    });

    var scrollHandler = function scrollHandler(e) {
      if (e.type === 'resize') {
        // 모바일 상에서 화면 전환만 sticky 대응 하도록 처리
        var rDev = window.innerWidth <= MOBILE_WIDTH;
        if (mobileBool === rDev) return;
        mobileBool = rDev;
      }


      positionY = window.scrollY || window.pageYOffset;

      position.forEach(function (k, i) {
        var mem = $(options.element[i]).closest('.sticky-wrap')[0];

        if (mem === undefined) {
          var parent = options.element[i];
          mem = parent.parentElement;
        }

        var yv = 0;

        if (mem !== undefined) {
          yv = mem.getBoundingClientRect().top;
        }

        var paddingSize = $(options.element[i]).outerHeight(true);
        var mobileOnly = options.element[i].getAttribute('data-sticky') === 'mobile-only';
        var pcBan = mobileOnly && window.innerWidth >= MOBILE_WIDTH;

        if (yv < 0 && window.stickyBanMode !== true && pcBan === false) {
          $(options.element[i]).addClass('is-sticky');
          $(options.element[i]).trigger('onSticky');
          $(options.element[i]).closest('.sticky-wrap').css({
            'padding-top': paddingSize
          });
          var stindex = stickyActiveElement.indexOf(options.element[i]);

          if (stindex < 0) {
            stickyActiveElement.push(options.element[i]);
          }
        } else {

          $(options.element[i]).closest('.sticky-wrap').css({
            'padding-top': 0
          });
          options.element[i].style.removeProperty('margin-top');
          $(options.element[i]).removeClass('is-sticky');
          $(options.element[i]).trigger('offSticky');

          var _stindex = stickyActiveElement.indexOf(options.element[i]);

          if (_stindex >= 0) {
            stickyActiveElement.splice(_stindex, 1);
          }
        }
      });
      arrangeSticks();
    };

    options.win.on('scroll.dataSticky', scrollHandler);
    options.win.on('resize.dataSticky', scrollHandler);
  }

  return function (sky, callback) {
    if (callback === true) {// options.element.length = 0;
      // options.position.length = 0;
    }

    $(sky).each(function (i, v) {
      var steps = v.querySelectorAll('[aria-current="step"]');

      if (steps.length === 0 && options.element.indexOf(v) < 0) {
        var item = $(v);
        options.element.push(v);
        options.position.push(set(item));
      }
    });
    scrollEvent(options.position);
  };
}(); // window.ratioMobile = window.innerWidth > window.innerHeight ? PORTRAIT : PORTRAIT;

var SCROLLMEMBERS = ['.gnb'];

var responsive = function () {
  function getResponsive() {
    if (window.innerWidth < MOBILE_WIDTH) {
      $('body').addClass('isMobile').removeClass('isPc').trigger('changeDevice', ['mobile']);
      if ($('#body').find('.sticky-wrap').length > 0) {
        $('body').addClass('has-sticky-wrap');      
      }
    } else {
      $('body').removeClass('isMobile has-sticky-wrap').addClass('isPc').trigger('changeDevice', ['pc']);
    };
    
     //모바일 공항선택 레이어 오픈시 body 스크롤막기 - 이중스크롤생김
     $(".isMobile .ticketing-target .txt").click(function(){
        $(".isMobile").css('overflow', 'hidden') 
        });
          $(".isMobile .layer-close").click(function(){
            $(".isMobile").removeAttr("style"); 
      });     
  } 

  return function () {
    getResponsive();
    $(window).on('resize ', function () {
      getResponsive();
    });
  };
}(); 

// 모달이나 다이얼로그 상황일 경우 window 스크롤 막는 기능 boo === true 일때 막음
var allScrollPrevent = function allScrollPrevent(bool) {
  var deviceObj = getMobileDevice(navigator.userAgent);
  var hidenCheck = bool;
  var len = SCROLLMEMBERS.length;

  if (hidenCheck) {
    var scY = window.scrollY;
    // document.body.style.height = '100%';
    // document.body.style.overflow = 'hidden';
    // document.body.style['touch-action'] = 'none';
    document.body.style['min-height'] = 'none';
    document.querySelector('html').style.height = '100%';
    document.querySelector('html').style.overflow = 'hidden';
    document.querySelector('html').style['touch-action'] = 'none';
    document.querySelector('html').style['min-height'] = 'none';
    if (scY !== 0) document.body.scrollTop = scY;
  } else {
    if (window.bookingActive === true && window.innerWidth < window.innerHeight) return;
    var bgscrollTop = document.body.scrollTop;
    document.body.removeAttribute('style');
    document.querySelector('html').removeAttribute('style');
    if (bgscrollTop !== 0) window.scrollTo(0, bgscrollTop);
  } // 최종 스크롤 요소가 window 가 아닌 div일 경우 같이 overflow = hidden 처리


  for (var i = 0; i < len; i += 1) {
    var selector = SCROLLMEMBERS[i];
    $(selector).each(function (index, el) {
      var pts = $(el).parents('[data-element="bottomSheet"]');

      if (pts.length === 0) {
        if (hidenCheck) {
          el.style.overflow = 'hidden';
        } else {
          el.style.removeProperty('overflow');
        }
      }
    });
  }
};

var tooltip = function () {
  var options = {};
  if ($('.wrap, .component-sub').length === 0) return;
  var wrapPL = Number($('.wrap, .component-sub').css('padding-left').replace('px', ''));

  var defaultOpt = function defaultOpt() {
    // defaults 컨포넌트때문에 수정 -> 나중에 width 부분 조건문 빼줘야함
    var defaults = {
      width: $('.component-sub').length > 0 ? $('.component-sub').outerWidth(true) - 20 : $(window).outerWidth(true) - wrapPL * 2,
      style: true
    };
    return defaults;
  };

  var bodyClickHandler;

  var tooltipClose = function tooltipClose(obj) {
    var $tooltip = obj.parents('[data-element="tooltip"]');
    var $anchor = $tooltip.find('[data-element="tooltip__anchor"]');
    obj.removeClass('show');
    $('body').attr('aria-hidden', false);

    if ($tooltip.closest('.number-wrap').length) {
      $tooltip.closest('.number-wrap').removeAttr('style');
    }

    if ($tooltip.parents('.carousel').length) {
      $tooltip.closest('.carousel__item').css('z-index', '1');
    }

    $('.area').remove();
    $anchor.removeClass('active');
    obj.closest('.title, .list-guide__item').removeAttr('style');
    document.body.removeEventListener('click', bodyClickHandler, true);
  };

  var tooltipOpen = function tooltipOpen(obj) {
    var $tooltip = obj.parents('[data-element="tooltip"]');
    var $anchor = $tooltip.find('[data-element="tooltip__anchor"]'); // $('body').prepend('<span class="area"></span>');

    if ($tooltip.find('[data-element="tooltip__close"]').length) {
      $tooltip.addClass('with-close');
    }

    if ($tooltip.closest('.number-wrap').length) {
      $tooltip.closest('.number-wrap').css('z-index', '2');
    }

    if ($tooltip.parents('.carousel').length) {
      $tooltip.closest('.carousel__item').css('z-index', '2');
    }

    $anchor.addClass('active');
    obj.closest('.title, .list-guide__item').css('z-index', 100);
    obj.addClass('show'); // obj.attr('tabindex', 0).focus();

    $('body').attr('aria-hidden', true); // 다른 이벤트 쪽에서 e.stopPropagation()으로 막힐수 있어서 capture 단계 phasing 처리.

    document.body.addEventListener('click', bodyClickHandler, true);
  };

  bodyClickHandler = function bodyClickHandler(e) {
    var $allPanel = $('.tooltip__panel');
    var $tgPoint = $(e.target);
    tooltipClose($allPanel);
    // if (!$tgPoint.parents('.tooltip').is(':visible')) {
    //   tooltipClose($allPanel);
    //   $
    // }
  };

  var tooltipPoY = function tooltipPoY(obj) {
    var $arrow = obj.find('.tooltip-arrow');
    var $panel = obj.find('[data-element="tooltip__panel"]');
    var elemPosLeft = obj.offset().left;
    var elemMgLeft = Number(obj.css('margin-left').replace('px', ''));
    var objWidth = obj.data('width') === undefined ? $(window).outerWidth(true) - wrapPL * 2 : Number(obj.data('width'));
    // $panel.css({
    //   width: objWidth
    // });
    $panel.css({
      //left: (elemPosLeft - wrapPL) * -1
      marginLeft: -(Math.floor(elemPosLeft - obj.width() / 2 - $arrow.width() / 2))
    });
    $arrow.css({
      left: Math.floor(elemPosLeft - obj.width() / 2 - $arrow.width() / 2)
    });

    // if (obj.data('width') < $(window).outerWidth(true) - wrapPL * 2) {
    //   $panel.css({
    //     left: 'auto',
    //     right: ($(window).width() - elemPosLeft - wrapPL - obj.width() + Number(elemMgLeft)) * -1
    //   });
    //   $arrow.css({
    //     left: 'auto',
    //     right: $(window).width() - elemPosLeft - wrapPL - obj.width() + Number(elemMgLeft) + 2
    //   });
    // }

    // if (elemPosLeft < $(window).outerWidth(true) / 2) {
    //   $panel.css({
    //     left: (elemPosLeft - wrapPL) * -1,
    //     right: 'auto'
    //   });
    //   $arrow.css({
    //     left: Math.floor(elemPosLeft - obj.width() / 2 - $arrow.width() / 2),
    //     right: 'auto'
    //   });
    // }

    // if (obj.data('position') === 'center') {
    //   $panel.css({
    //     left: (obj.data('width') / 2 - obj.width() / 2) * -1,
    //     right: 'auto'
    //   });
    //   $arrow.css({
    //     left: Math.floor(obj.data('width') / 2 - obj.width() / 2),
    //     right: 'auto'
    //   });
    // }

    // if (window.innerWidth > MOBILE_WIDTH && obj.data('set') !== undefined) {
    //   $panel.css({
    //     width: Number(obj.data('set').width),
    //     left: Number(obj.data('set').left),
    //     right: 'auto'
    //   });
    //   $arrow.css({
    //     left: Number(obj.data('set').arrow)
    //   });
    // }
  };

  var tooltipEvent = function tooltipEvent(elem) {
    var $elem = $(elem);
    var $panel = $elem.find('[data-element="tooltip__panel"]');
    var $allPanel = $('.tooltip__panel');
    var $openBtn = $elem.find('[data-element="tooltip__anchor"]');
    var $closeBtn = $elem.find('[data-element="tooltip__close"]');
    //var $closeBtn = $('#body');

    // if ($elem.data('set').hover) {
    //   $elem.off().on({
    //     mouseenter: function mouseenter(event) {
    //       var $tg = event.target.tagName === 'BUTTON' ? $(event.target).closest('[data-element="tooltip"]') : $(event.target);
    //       var $targetPanel = $tg.find('.tooltip__panel');
    //       tooltipClose($allPanel);
    //       tooltipOpen($targetPanel);
    //     },
    //     mouseleave: function mouseleave() {
    //       tooltipClose($allPanel);
    //     }
    //   });
    // }

    $openBtn.off('click').on('click', function (e) {
      var $tgPoint = $(e.target);
      var $tgPanel = $tgPoint.next($panel);
      tooltipPoY($elem);

      if ($tgPoint.hasClass('active')) {
        tooltipClose($allPanel);
      } else {
        tooltipClose($allPanel);
        tooltipOpen($tgPanel);
      }
    });
    $closeBtn.off('click').on('click', function (e) {
      var $tgPoint = $(e.target);
      var obj = $tgPoint.closest($panel);
      var $tgFocus = obj.prev($openBtn);
      tooltipClose(obj);
      $tgFocus.focus();
    });
    $('body').on('changeDevice', function () {
      tooltipPoY($elem);
    })
  };

  return {
 init: function init(el , type) {
      var $el = $(el);
      $el.each(function (i, elem) {
        var $elem = $(elem);
        var $panel = $elem.find('[data-element="tooltip__panel"]');
        var $arrow = $elem.find('.tooltip-arrow');
        var settings = {
          width: $elem.data('width'),
          position: $elem.data('position'),
          style: $elem.data('style')
        };
        options = $.extend(defaultOpt(), settings);

        if (options.style === false) {
          $panel.removeAttr('style');
          $arrow.removeAttr('style');
        }

        tooltipEvent(elem);
		if(type ==='Flight'){
			tooltipPoY($elem);
		}
      });
    },
    close: function close() {
      $('[data-element="tooltip"]').find('[data-element="tooltip__panel"]').removeClass('show');
      $('[data-element="tooltip"]').find('.area').remove();
    }
  };
}(); 

// PC용 select box 로직 (select2)
var customSelect = function () {
  var setSelect = function setSelect(el) {
    $(el).each(function (i, dom) {
      var container = dom.getAttribute('data-select-container');
      var param = {
        width: '100%'
      };
      param.dropdownAutoWidth = true; 
      
      // container를 지정하지 않으면 body 맨 아래에 붙기 때문에 'data-select-container' 속성을 선택자로 검색하여 그 dom에 붙임
      if (container) param.dropdownParent = $(container);
      var select2 = $(dom).select2(param);
      select2.on('select2:open', function (e) {
        var targetDom = $('.select2-results__options');
        var modalParent = $(container);

        if (modalParent.length > 0 && modalParent.hasClass('modal')) {
          setTimeout(function () {
            // 바로 height 사이즈가 결정되지 않아서 timeout으로 처리
            var modalRect = modalParent[0].getBoundingClientRect();
            var selectRect = targetDom[0].getBoundingClientRect();
            var remainSize = Math.floor(modalRect.top + modalRect.height - selectRect.top);

            if (remainSize < selectRect.height) {
              targetDom.css({
                'max-height': remainSize
              });
            }
          });
        }

        $(window).on('resize.select2Resize', function () {
          if (window.innerWidth <= MOBILE_WIDTH) $(dom).select2('close');
        }); // $('.select2-results__options').scrollbar();
      });
      select2.on('select2:close', function (e) {
        $(window).off('resize.select2Resize');
      });
    });
  };

  return {
    init: function init(el) {
      setSelect(el);
    }
  };
}(); 


// 아래 ns 의 선택자를 가진 Dom의 토글 요소 open close 로 예상됨
var customToggle = {
  ns: {
    wrap: '[data-custom-toggle="wrap"]',
    panel: '[data-custom-toggle="panel"]',
    button: '[data-custom-toggle="button"]',
    close: '[data-custom-toggle="close"]',
    flag: 'close'
  },
  showEvent: function showEvent($panel) {
    var _this = this;

    $panel.show().css('z-index', '110');
    setTimeout(function () {
      if ($panel.is(':visible')) {
        _this.ns.flag = 'open';
      } else {
        _this.ns.flag = 'close';
      }
    }, 100);
  },
  triggerClose: function triggerClose(elem) {
    var _this2 = this;

    $(this.ns.wrap).each(function (i, el) {
      var $el = $(el);
      var $panel = $el.find(_this2.ns.panel);
      $panel.hide().removeAttr('style');
      _this2.ns.flag = 'close';
    });

    if ($(elem).data('customToggle') === 'button') {
      var $panel = $(elem).closest(this.ns.wrap).find(this.ns.panel);
      this.showEvent($panel);
    }
  },
  initEvent: function initEvent() {
    var _this3 = this;

    $(this.ns.wrap).each(function (i, el) {
      var $el = $(el);
      var $panel = $el.find(_this3.ns.panel);

      _this3.triggerClose();

      $el.off('click').on('click', _this3.ns.button, function () {
        if ($panel.is(':visible') === false) {
          setTimeout(function () {
            _this3.showEvent($panel);
          }); // 이미 열려 있는 다른 패널이 있을 경우 작동 하지 않기 때문에 프레임으로 term을 줌
        } else {
          _this3.showEvent($panel);
        }
      });
      $(_this3.ns.close).off('click').on('click', function () {
        _this3.triggerClose();

        _this3.ns.flag = 'close';
      });
    });
    $('body').on('click', function (el) {
      if (_this3.ns.flag === 'open') {
        var btn = el.target.getAttribute('data-custom-toggle') === 'button' ? el.target : $(el.target).parents('[data-custom-toggle="button"]')[0];
        var parentDiv = el.target.getAttribute('data-custom-toggle') === 'panel' ? $(el.target) : $(el.target).parents(_this3.ns.panel);

        if (btn !== undefined) {
          _this3.triggerClose(btn.children[0]);
        } else if (parentDiv.length === 0) {
          _this3.triggerClose(el.target);
        }
      }
    });
  }
};

var modalUI = function () {
  var MODAL_MAX_HEIGHT_RATE = 0.7;
  var layerOption = {
    current: '',
    layerType: '',
    clickClose: false
  };
  var scTop = 0; // layer 형태 정의(alert, default, layerFull)

  var layerAlert = {
    modalClass: 'modal-alert'
  };
  var layerDefault = {
    // modal class 추가
    modalClass: 'modal-layer',
    // 모달 중첩여부
    closeExisting: true,
    showClose: false,
    escapeClose: true,
    clickClose: false
  };
  var layerFull = {
    showClose: false,
    clickClose: false
  }; // 팝업창 컨텐츠 사이즈에 따른 max-height 요소처리

  var modalMaxHeightSet = function modalMaxHeightSet(modal, bool) {
    var modalHeader = modal.find('.modal-header');
    var modalContent = modal.find('.modal-content');
    var modalBottom = modal.find('.fixed-wrap');
    if (modalHeader.length === 0 || modalContent.length === 0) return;

    if (modal.attr('data-max-height') !== undefined) {
      modalContent.css({
        'max-height': Number(modal.attr('data-max-height'))
      });
    } else if (modal.hasClass('h100')) {
      modalContent.css({
        'max-height': 'auto',
      });
    } else if (modal.data('tab-content')) {
      console.log('tab-content')
      heightV = heightV === undefined ? MODAL_MAX_HEIGHT_RATE : Number(heightV) / 100;
      var maxHeight = Math.floor(window.innerHeight * heightV);
      var contentSize = maxHeight - modalHeader[0].offsetHeight;
        if (modalBottom.length > 0) contentSize -= modalBottom[0].offsetHeight + 30;
        modalContent.css({
          'height': contentSize,
        });
    } else if (bool === false) {
      modalContent[0].style.removeProperty('max-height');
      var modalHeaderH = modalHeader.height();
      $('.modal-full .modal-content').css({
        'height': 'calc(100% - ' + modalHeaderH + 'px)',
      });
      // modalContent.css({
      //   'height': 'calc(100vh - ' + modalHeaderH + 'px)',
      // });
    } else {
      var heightV = modal.attr('data-max-rate');

      if (heightV !== 'none') {
        heightV = heightV === undefined ? MODAL_MAX_HEIGHT_RATE : Number(heightV) / 100;
        var maxHeight = Math.floor(window.innerHeight * heightV);
        var contentSize = maxHeight - modalHeader[0].offsetHeight;
        if (modalBottom.length > 0) contentSize -= modalBottom[0].offsetHeight + 30;
        modalContent.css({ 'height': contentSize }); // 220317 탭 선택시 높이값 동일하게 맞추기 위해 max-height에서 height로 수정
      }
    }
  };

  return function (el) {
    var $el = $(el);

    if(typeof $el.data('databind') !='undefined'){
      var $btn = $el.prop('tagName') !== 'BUTTON' ? $el.closest('[data-element="modal_anchor"]') : $el;
      layerOption.current = $btn.data('target');
      layerOption.layerType = $btn.data('modal-type');
      var option;

      if (layerOption.layerType === 'alert') {
        option = layerAlert;
      } else if (layerOption.layerType === 'datepicker') {
        option = layerFull;
      } else if (layerOption.layerType === 'full') {
        option = layerFull;
      } else {
        option = layerDefault;
      }

      scTop = window.scrollY;
      allScrollPrevent(true);
      var modal = $(layerOption.current).modal(option);
      modalMaxHeightSet(modal, window.innerWidth > MOBILE_WIDTH);
      modal.on($.modal.CLOSE, function () {
        $('html').removeClass('open-modal open-modal--full');
        allScrollPrevent(false);
      });
      $('html').addClass('open-modal');

      if (window.innerWidth > MOBILE_WIDTH) {
        $(layerOption.current).css({
          width: $btn.data('width'),
          'max-height': $btn.data('height')
        });
      }

      $(window).on('resize.popupwidthResize', function () {
        // 리사이징에 따른 팝업 사이즈 재 설정
        if (window.innerWidth > MOBILE_WIDTH) {
          $(layerOption.current).css({
            width: $btn.data('width')
          });
          modalMaxHeightSet($(layerOption.current));
        } else {
          $(layerOption.current)[0].style.removeProperty('width');
          modalMaxHeightSet($(layerOption.current), false);
        }
        if ($('.modal-content [data-element="tab"]').length > 0) {
          $('.modal-content [data-element="tab"]').modalTabSticky();
        }
      });

      if ($('html').find('.modal').hasClass('modal-full') && layerOption.layerType === 'full') {
        $('html').addClass('open-modal--full');
        $('.jquery-modal').addClass('jquery-modal--full');
      }

      if ($('html').find('.modal').hasClass('modal-full') && layerOption.layerType === 'datepicker') {
        $('html').addClass('open-modal--picker');
        $('.jquery-modal').addClass('jquery-modal--picker');
      } 

      uiCarousel.modal('[data-carousel]'); // eslint-disable-next-line no-use-before-define

      inputToggle.init('[data-element="inputToggle"]'); // eslint-disable-next-line no-use-before-define

      sticky('[data-sticky]', true);
      $(layerOption.current).on('click', '[data-select-date]', function (event) {
        var randomId = Math.random().toString(36).substr(2, 9);
        var selectDate = $(event.currentTarget).data('selectDate');
        $(window).off('resize.popupwidthResize');
        $btn.addClass('is-select').text($(selectDate).prop('value'));
        $.modal.close();
      });
      if ($('.modal-content [data-element="tab"]').length > 0) {
        $('.modal-content [data-element="tab"]').modalTabSticky();
      }
    } 
  
    else{	
      $el.off('click.modal_anchor_click').on('click.modal_anchor_click', function (e) {
        e.preventDefault();
        var $btn = e.target.tagName !== 'BUTTON' ? $(e.target).closest('[data-element="modal_anchor"]') : $(e.target);
        layerOption.current = $btn.data('target');
        layerOption.layerType = $btn.data('modal-type');
        var option;

        if (layerOption.layerType === 'alert') {
          option = layerAlert;
        } else if (layerOption.layerType === 'datepicker') {
          option = layerFull;
        } else if (layerOption.layerType === 'full') {
          option = layerFull;
        } else {
          option = layerDefault;
        }

        scTop = window.scrollY;
        allScrollPrevent(true);
        var modal = $(layerOption.current).modal(option);
        modalMaxHeightSet(modal, window.innerWidth > MOBILE_WIDTH);
        modal.on($.modal.CLOSE, function () {
          $('html').removeClass('open-modal open-modal--full');
          allScrollPrevent(false);
        });
        $('html').addClass('open-modal');
    
        if (window.innerWidth > MOBILE_WIDTH) {
          $(layerOption.current).css({
            width: $btn.data('width'),
            'max-height': $btn.data('height')
          });
        }
    
        $(window).on('resize.popupwidthResize', function () {
          // 리사이징에 따른 팝업 사이즈 재 설정
          if (window.innerWidth > MOBILE_WIDTH) {
            $(layerOption.current).css({
              width: $btn.data('width')
            });
            modalMaxHeightSet($(layerOption.current));
          } else {
            $(layerOption.current)[0].style.removeProperty('width');
            modalMaxHeightSet($(layerOption.current), false);
          }
          if ($('.modal-content [data-element="tab"]').length > 0) {
            $('.modal-content [data-element="tab"]').modalTabSticky();
          }
        });

        if ($('html').find('.modal').hasClass('modal-full') && layerOption.layerType === 'full') {
          $('html').addClass('open-modal--full');
          $('.jquery-modal').addClass('jquery-modal--full');
        }

        if ($('html').find('.modal').hasClass('modal-full') && layerOption.layerType === 'datepicker') {
          $('html').addClass('open-modal--picker');
          $('.jquery-modal').addClass('jquery-modal--picker');
        } 
        // eslint-disable-next-line no-use-before-define

        uiCarousel.modal('[data-carousel]'); // eslint-disable-next-line no-use-before-define

        inputToggle.init('[data-element="inputToggle"]'); // eslint-disable-next-line no-use-before-define
    
        sticky('[data-sticky]', true);
        $(layerOption.current).on('click', '[data-select-date]', function (event) {
          var randomId = Math.random().toString(36).substr(2, 9);
          var selectDate = $(event.currentTarget).data('selectDate');
          $(window).off('resize.popupwidthResize');
          $btn.addClass('is-select').text($(selectDate).prop('value'));
          $.modal.close();
        });
        if ($('.modal-content [data-element="tab"]').length > 0) {
          $('.modal-content [data-element="tab"]').modalTabSticky();
        }
      });
		}
	};
}(); 

// form
var formControl = function () {
  // 셀렉터 목록
  var defaults = {
    wrap: '[data-element="form"]',
    textarea: '[data-element="textarea"]',
    text: '[data-element="input"]',
    email: '[data-element="email"]',
    btn: '[data-element="remove"]',
    byte: '[data-element="checkByte"]',
    current: '[data-element="current"]',
    max: '[data-element="max"]',
    checkList: '[data-element="checkList"]',
    checkAll: '[data-element="checkAll"]',
    checkbox: '[data-element="checkbox"]',
    num: '[data-element="number__input"]',
    numBtn: '[data-element="number__button"]',
    numMinus: '[data-type="decrease"]',
    numPlus: '[data-type="increase"]',
    comma: '[data-string-number]',
    show: '[data-element="toggleShow"]',
    inpToggleWrap: '[data-element="inputToggle"]',
    inpToggleAnchor: '[data-toggle="toggle__anchor"]',
    inpTogglePanel: '[data-toggle="toggle__panel"]',
    keyCode: 0
  }; // 바이트 체크(utf-8)

  function checkByte(el) {
    var $el = $(el);
    var $current = $el.siblings(defaults.byte).find(defaults.current);
    var current = encodeURIComponent(el.value).replace(/%[A-F\d]{2}/g, 'U').length;
    $current.text(current);
  }

  function getData(data) {
    var result = {};

    if (typeof data === 'string') {
      var source = data;
      $.ajax({
        url: source,
        async: false
      }).done(function (response) {
        result = response;
      });
    } else {
      result = eval(data);
    }

    return result;
  } // 1000 단위 쉼표


  function localString(num) {
    var $num = typeof num === 'number' ? num : num.split(',').join('');
    $num *= 1;
    return $num.toLocaleString(undefined, {
      maximumFractionDigits: 5
    });
  } // 입력 숫자 변경(버튼이벤트)


  function changeNum(cur, ty) {
    var $value = cur.split(',').join('');
    $value *= 1;

    if (ty === 'increase') {
      $value += 1;
    } else {
      $value -= 1;
    }

    return localString($value);
  } // 입력 숫자 최대값 / 최소값 설정


  function checkNum(result, maximum) {
    var minimum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var msg = '';

    if (result > maximum || result < minimum) {
      msg = result > maximum ? 'max' : 'min';
    } else {
      msg = 'normal';
    }

    return msg;
  } // 일반 텍스트 입력시 삭제버튼 노출


  function input(el) {
    var $el = $(el);
    var $parent = $el.closest('[data-element="form"]');
    var $btn = $(defaults.btn); // 삭제버튼 노출 우선 삭제 (201203)

    if (el.value.length > 0) {
      $parent.find($btn).addClass('show').removeClass('hide');
    } else {
      $parent.find($btn).removeClass('show').addClass('hide');
    }
  } // 삭제버튼 클릭


  function del(el, target) {
    var $el = $(el);
    var $parent = $el.closest('[data-element="form"]');
    setTimeout(function () {
      $parent.find('[data-element="input"], [data-element="email"]').prop('value', '').focus();
      $el.removeClass('show').addClass('hide');
    }, 200);

    if ($(target).data('element') === 'textarea') {
      checkByte(target);
    }
  } // 입력 숫자 변경(버튼이벤트)


  function numberButton(el) {
    var $target = $(el);
    var $input = $target.siblings(defaults.num);
    var $current = $input.val();
    var $type = $target.data('type');
    var $res = changeNum(localString($current), $type);
    var $max = $input.data('max');
    var $min = $input.data('min') > 0 ? $input.data('min') : 0;
    var msg = checkNum($res, $max, $min);

    if (msg === 'normal') {
      $input.prop('value', $res);
      $input.siblings(defaults.numBtn).prop('disabled', false);
    }

    if ($input.val() >= $max) {
      $input.siblings(defaults.numPlus).prop('disabled', true);
    }

    if ($input.val() <= $min) {
      $input.siblings(defaults.numMinus).prop('disabled', true);
    }
  } // 입력 숫자 직접 입력시


  function numberInput(el) {
    var $el = $(el);
    var $max = $el.data('max');
    var $min = $el.data('min') > 0 ? $el.data('min') : 0;
    var $current = $el.val().split(',').join('') * 1;
    var $returnValue;
    $el.prop('value', function () {
      if ($current > $max) {
        $returnValue = $max;
      } else if ($current < $min) {
        $returnValue = $min;
      } else {
        $returnValue = $current;
      }

      return $returnValue;
    });
  } // 체크박스 전체 체크(전체체크버튼 변경)


  function checkAll(wrap, $max, $current) {
    if ($max === $current) {
      $(wrap).find(defaults.checkAll).prop('checked', true); // eslint-disable-next-line func-names

      $(wrap).find(defaults.inpToggleWrap).each(function () {
        if ($(this).find(defaults.inpToggleAnchor).prop('checked') === true) {
          $(this).find(defaults.inpToggleAnchor).attr('aria-expanded', 'true');
          $(this).find(defaults.inpTogglePanel).stop().slideDown(300);
        }
      });
    } else {
      $(wrap).find(defaults.checkAll).prop('checked', false); // eslint-disable-next-line func-names

      $(wrap).find(defaults.inpToggleWrap).each(function () {
        if ($(this).find(defaults.inpToggleAnchor).prop('checked') === false) {
          $(this).find(defaults.inpToggleAnchor).attr('aria-expanded', 'false');
          $(this).find(defaults.inpTogglePanel).stop().slideUp(300);
        }
      });
    }
  } 
  
  // 체크박스 전체 체크
  function checkbox(wrap, el) {
    var $max = wrap.find(defaults.checkbox).not(':disabled').length;
    var $state = el.prop('checked');
    var $current = 0;
    var $checkAll = false;

    if (el.data('element') === 'checkAll') {
      $checkAll = true;
    } else {
      $checkAll = false;
    }

    wrap.find(defaults.checkbox).each(function (i, item) {
      if ($checkAll) {
        $(item).not(':disabled').prop('checked', $state);

        if ($state) {
          $current = $max;
        } else {
          //$current = 0;
        }
      } else {
        $current = $(item).prop('checked') === true ? $current += 1 : $current += 0;
      }
    });
    checkAll(wrap, $max, $current);
  }

  function showPassword(btn) {
    var $btn = $(btn);
    var $text = $btn.siblings('.input__text');
    var $type = $text.attr('type');

    if ($type === 'password') {
      $text.attr('type', 'text');
      $btn // .css({
      //   'background-image': 'url(../images/icon/icon-password-on.png)',
      // })
      .closest('[data-element="form"]').addClass('show-password');
    } else {
      $text.attr('type', 'password');
      $btn // .css({
      //   'background-image': 'url(../images/icon/icon-password-on.png)',
      // })
      .closest('[data-element="form"]').removeClass('show-password');
    }
  } 
  
  // 폼 요소 이벤트
  function event() {
    var $form = $(defaults.wrap);
    var $check = $(defaults.checkList);

    var checkIsActive = function checkIsActive(targetInput) {
      var $parent = $(targetInput).closest($form);
      var $this = $(targetInput);
      var val = $this.val();

      if (val.trim() === '') {
        $parent.removeClass('is-active');
      } else {
        $parent.addClass('is-active');
      }
    };

    var item = '';
    $form.on('input', defaults.text, function (i) {
      item = i.target;
      input(item);
      checkIsActive(item);
    });
    $form.on('input', defaults.email, function (i) {
      item = i.target;
      input(item);
      checkIsActive(item);
    });
    $form.on('input', defaults.textarea, function (i) {
      item = i.target;
      checkByte(item);
      input(item);
      checkIsActive(item);
    });
    $form.on('click', defaults.btn, function (b) {
      del(b.target, item);
      $(this).prevAll('.input__text').val('');
    });
    $form.on('click', defaults.numBtn, function (e) {
      numberButton(e.target, defaults);
    });
    $form.on('click', defaults.show, function (e) {
      showPassword(e.target);
    });
    $form.on('blur', defaults.num, function (e) {
      numberInput(e.target);
    });
    $form.on({
      focusin: function focusin(e) {
        var $parent = $(e.target).closest($form);
        var $this = $(e.target);
        setTimeout(function () {
          var val = '';
          $parent.addClass('is-focus');
          $parent.parent('.input-box').addClass('label-active'); // 20210315 form 스타일추가 

          if ($this.is('input, textarea')) {
            val = $this.val();
          } else {
            val = $this.siblings('input, textarea').val();
          }

          if (val) {
            $parent.find('[data-element="remove"]').addClass('show').removeClass('hide');
          }
        }, 100);
      },
      focusout: function focusout(e) {
        var $this = $(e.target);
        var $parent = $this.closest($form);
        var val = '';

        if ($this.is('input, textarea')) {
          val = $this.val();
        } else {
          val = $this.siblings('input, textarea').val();
        }

        // 20210315 form 스타일추가 - s
        if (val) {
          $parent.addClass('is-active');
          $parent.parent('.input-box').addClass('label-active');
        } else {
          $parent.removeClass('is-active');
          $parent.parent('.input-box').removeClass('label-active');
        }
        // 20210315 form 스타일추가 - e 

        setTimeout(function () {
          if (!$parent.find('[data-element="remove"]').is(':focus')) {
            $parent.removeClass('is-focus').find('button.show').removeClass('show').addClass('hide');
          }
        }, 50);
      }
    });
    $check.on('change', '[type="checkbox"]', function (e) {
      var $elem = $(e.target);
      var $wrap = $elem.closest(defaults.checkList);
      checkbox($wrap, $elem);
    });
    $(defaults.comma).each(function (i, v) {
      var $val = v.value;
      $(v).prop('value', localString($val));
    });
    $form.on('blur', defaults.comma, function (i) {
      var $i = $(i.target);
      var $val = $i.prop('value');
      $i.prop('value', localString($val));
    });
    $form.on('focus', defaults.comma, function (i) {
      var $i = $(i.target);
      var $val = $i.prop('value');
      $i.prop('value', $val.split(',').join(''));
    });
    $(defaults.email).each(function (i, el) {
      var $elem = $(el);
      var domainURL = $elem.data('json');
      var domainList = getData(domainURL);
      // $elem.emailautocomplete({
      //   domains: domainList.domains
      // });
    });
    $('input').each(function (i, dom) {
      var attrType = dom.getAttribute('type');

      if (attrType === 'text' || attrType === 'email' || attrType === 'textarea') {
        checkIsActive(dom);
      }
    });
  }

  return {
    init: function init() {
      event();
    }
  };
}(); 

// carousel
var uiCarousel = function () {
  var makeCaroulsel = function makeCaroulsel(dom) {
    var type = dom.getAttribute('data-carousel');
    var carousel = null;

    switch (type) {
      case 'centerItem':
        {
          // data-carousel="centerItem" 로 검색'
          carousel = new Swiper(dom, {
            spaceBetween: 30,
            slidesPerView: 'auto',
            centeredSlides: true
          });
          break;
        }

      case 'buneleItem':
        {
          // data-carousel="buneleItem" 로 검색
          var bundleSet = {
            slidesPerView: 'auto',
            observer: true,
            observeParents: true,
            spaceBetween: 16
          };
          carousel = new Swiper(dom, bundleSet);
          break;
        }

      case 'bookingTicket':
        {
          var carousel = undefined;
          $('body').on('changeDevice', function () {
            var browserWidth = $(window).width();
            console.log('bookingTicket-changeDevice');
            if (browserWidth < 768 && carousel == undefined)
            {
              carousel = new Swiper(dom, {
                slidesPerView: 'auto',
                resistance: true,
                spaceBetween: 20,
                observer: true,
                observeParents: true,
                on: {
                  init: function init() {
                    var idx = $(dom).find('.package__item.selected').index();
                    this.slideTo(idx);
                  }
                }
              });
            }
            else if (browserWidth > 767 && carousel != undefined)
            {
              carousel.destroy();
              carousel = undefined;
            }
          })
          break;
        }

      case 'limitItem':
        {
          // data-carousel="limitItem" 로 검색
          carousel = new Swiper(dom, {
            slidesPerView: 'auto'
          });
          break;
        }

      case 'stampItem':
        {
          // data-carousel="stampItem" 로 검색
          carousel = new Swiper(dom, {
            slidesPerView: 'auto',
            spaceBetween: 20,
            observer: true,
            observeParents: true,
            pagination: {
              el: '.carousel__pagination-number',
              type: 'fraction'
            },
            navigation: {
              nextEl: '.carousel__button-next',
              prevEl: '.carousel__button-prev'
            }
          });
          break;
        }

      case 'savingItem':
        {
          // data-carousel="savingItem" 로 검색
          carousel = new Swiper(dom, {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 20,
            pagination: {
              el: '.carousel__pagination-number',
              type: 'fraction'
            }
          });
          break;
        }

      case 'cardGuideItem':
        {
          // data-carousel="cardGuideItem" 로 검색
          carousel = new Swiper(dom, {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 50,
            observer: true,
            observeParents: true,
            pagination: {
              el: '.carousel__pagination-number',
              type: 'fraction'
            }
          });
          break;
        }

      case 'cardGuideItem2':
        {
          // data-carousel="cardGuideItem2" 로 검색
          carousel = new Swiper(dom, {
            slidesPerView: 'auto',
            centeredSlides: true,
            observer: true,
            spaceBetween: 30,
            observeParents: true,
            slideToClickedSlide: true,
            breakpoints: _defineProperty({}, MOBILE_WIDTH, {
              slidesPerView: 'auto',
              spaceBetween: 30,
              centeredSlides: true
            }),
            pagination: {
              el: '.carousel__pagination-number',
              type: 'fraction'
            },
            navigation: {
              nextEl: '.carousel__button-next',
              prevEl: '.carousel__button-prev'
            }
          });
          break;
        }

      case 'productItem':
        {
          // data-carousel="productItem" 로 검색
          const slide = $(dom).find('.swiper-slide')
          const slideLeng = slide.length
          if (slideLeng > 1) {
            $(dom).addClass('on')
            var params = {
              slidesPerView: 'auto',
              centeredSlides: true,
              spaceBetween: 50,
              observer: true,
              observeParents: true,
              loop: dom.getAttribute('data-loop') === 'true',
              pagination: {
                el: '.carousel__pagination-number',
                type: 'fraction'
              },
              navigation: {
                nextEl: '.carousel__button-next',
                prevEl: '.carousel__button-prev'
              }
            };
          carousel = new Swiper(dom, params);
          }
          break;
        }

      case 'mainTop':
        {
          // data-carousel="mainTop" 로 검색
          var params = {
            speed: 0,
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 50,
            observer: true,
            observeParents: true,
            loop: true,
            pagination: {
              el: '.carousel__pagination-number',
              type: 'fraction'
            },
            navigation: {
              nextEl: '.carousel__button-next',
              prevEl: '.carousel__button-prev'
            }
          };
          carousel = new Swiper(dom, params);
          break;
        }

      case 'premiumItem':
        {
          // data-carousel="premiumItem" 로 검색
          carousel = new Swiper(dom, {
            slidesPerView: 'auto',
            spaceBetween: 20
          });
          break;
        }

      case 'benefitsItem':
        {
          // data-carousel="benefitsItem" 로 검색
          carousel = new Swiper(dom, {
            slidesPerView: 'auto',
            spaceBetween: 10,
            on: {
              transitionEnd: function transitionEnd() {
                tooltip.close();
                tooltip.init('[data-element="tooltip"]');
              }
            }
          });
          break;
        }

      case 'mainBenefit':
        {
          // data-carousel="mainBenefit" 로 검색
          carousel = new Swiper(dom, {
            slidesPerView: 'auto',
            spaceBetween: 10,
            scrollbar: {
              el: '.carousel__scrollbar',
              draggable: true
            }
          });
          break;
        }

      case 'recommendItem':
        {
          // data-carousel="recommendItem" 로 검색
          carousel = new Swiper(dom, {
            centeredSlides: true,
            spaceBetween: 32,
            loop: true,
            preventClicks: false,
            preventClicksPropagation: false,
            slidesPerView: 'auto',
            // threshold: 10,
            // freeModeMomentum: false,
            resistance: false
          });
          break;
        }
	  case 'premiumList':
		{
			var premiumListSize = document.querySelector('[data-carousel="premiumList"] .swiper-wrapper').children.length // 프리미엄 서비스 배너 갯수
			var isPc = $(dom).hasClass('premiumList-pc');
			
			if (isPc) {
				if(premiumListSize > 3) {
					carousel = new Swiper(dom, {
	                slidesPerView: 3,
	                observer: true,
	                observeParents: true,
	                navigation: {
	                  nextEl: '.carousel__button-next3',
	                  prevEl: '.carousel__button-prev3'
	                },
	                breakpoints:  {
	                  1080: {
	                    width: 224,
	                    slidesPerView: 'auto',
	                    centeredSlides: false
	                  }
	                },
	                slidesOffsetBefore: 0,
	                autoplay: false,
	                loop: true,
	              });
				}
				
				if (premiumListSize > 3) {
		            $('.carousel__button-next3, .carousel__button-prev3').addClass('show');
		        } else {
		            $('.carousel__button-next3, .carousel__button-prev3').removeClass('show');
		        }
			}
			
			break;	
		}
      case 'recommendTicket':
        {
          // data-carousel="recommendTicket" 로 검색
          var recommTcktSize = document.querySelector('[data-carousel="recommendTicket"] .swiper-wrapper').children.length // 추천 항공권 갯수
          var isPc = $(dom).hasClass('recommendTicket-pc')
          // 추천항공 pc
          if(isPc) {
            if(recommTcktSize > 4) {

              carousel = new Swiper(dom, {
                slidesPerView: 4,
                observer: true,
                observeParents: true,
                navigation: {
                  nextEl: '.carousel__button-next2',
                  prevEl: '.carousel__button-prev2'
                },
                breakpoints:  {
                  1080: {
                    width: 138,
                    slidesPerView: 'auto',
                    centeredSlides: false
                  }
                },
                slidesOffsetBefore: 0,
                autoplay: true,
                loop: true,
              });

            }
          }

          // 추천항공 mobile
          else {
            var mobileDom = document.querySelector('.recommendTicket-mobile .swiper-wrapper')
            var totalLength = mobileDom.children[0].offsetWidth * mobileDom.children.length

            // 추천항공권 길이가 컨테이너의 너비를 넘어서면
            if(mobileDom.offsetWidth < totalLength) {

              carousel = new Swiper(dom, {
                slidesPerView: 'auto',
                observer: true,
                observeParents: true,
                // navigation: {
                //   nextEl: '.carousel__button-next2',
                //   prevEl: '.carousel__button-prev2'
                // },
                breakpoints:  {
                  1080: {
                    width: 138,
                    slidesPerView: 'auto',
                    centeredSlides: false
                  }
                },
                slidesOffsetBefore: -10,
                autoplay: true,
                loop: true,
              });

            }
          }
          
          if (recommTcktSize > 4) {
            $('.carousel__button-next2, .carousel__button-prev2').addClass('show');
          } else {
            $('.carousel__button-next2, .carousel__button-prev2').removeClass('show');
          }
          break;
        }        

      case 'mainBanner':
        {
          // data-carousel="mainBanner" 로 검색
          let options = {};
          if($("[data-carousel='mainBanner'] .swiper-slide").length == 1){
            options = {
                loop: false,
                autoplay: false,
                watchOverflow : true,
                on : {
                    init : function () {
                        $(".main-banner-next").hide();
                        $(".main-banner-prev").hide();
                    }
                }
              }
          } else {
            options = {
                slidesPerView: 1,
                observer: true,
                observeParents: true,
                pagination: {
                  el: '.carousel__pagination',
                  clickable: true
                },
                navigation: {
                  nextEl: ".main-banner-next",
                  prevEl: ".main-banner-prev",
                },
                loop: true,
                autoplay: {
                  delay: 4000,
                  disableOnInteraction: false,
                }
              }
          }
          carousel = new Swiper(dom, options);
          break;
        }
                
      case 'spaceItem':
        {
          // data-carousel="spaceItem" 로 검색
          carousel = new Swiper(dom, {
            slidesPerView: 'auto',
            spaceBetween: 0,
            observer: true,
            observeParents: true,
            navigation: {
              nextEl: '.carousel__button-next',
              prevEl: '.carousel__button-prev'
            },
            breakpoints: _defineProperty({}, MOBILE_WIDTH, {
              slidesPerView: 'auto',
              spaceBetween: 16
            })
          });
          break;
        }

      case 'serviceItem':
        {
          // data-carousel="serviceItem" 로 검색
          carousel = new Swiper(dom, {
            slidesPerView: 'auto',
            spaceBetween: 16,
            pagination: {
              el: '.carousel__pagination',
              clickable: true
            },
            breakpoints: {
              1079: {
                spaceBetween: 10
              }
            }
          });
          break;
        }

      case 'destination':
        {
          // data-carousel="destination" 로 검색
          carousel = new Swiper(dom, {
            spaceBetween: 20,
            observer: true,
            observeParents: true,
            slidesPerView: 3,
            pagination: {
              el: '.carousel__pagination',
              clickable: true
            },
            on: {
              slideChange: function slideChange() {
                $(this.pagination.$el).find('.swiper-pagination-bullet').removeClass('swiper-pagination-bullet-active');
                $(this.pagination.$el).find('.swiper-pagination-bullet').eq(this.activeIndex).addClass('swiper-pagination-bullet-active');
              }
            },
            breakpoints: _defineProperty({}, MOBILE_WIDTH, {
              // slidesPerView: 'auto',
              spaceBetween: 22,
              slidesPerView: 1
            })
          });
          break;
        }

      case 'slideBanner':
        {
          // data-carousel="slideBanner" 로 검색
          carousel = new Swiper(dom, {
            observer: true,
            observeParents: true,
            pagination: {
              el: '.carousel__pagination',
              clickable: true
            }
          });
          break;
        }

      // case 'processItem1':
      // case 'processItem2':
      // case 'processItem3':
      // case 'processItem4':
      //   {
      //     // data-carousel="processItem4" 로 검색
      //     var param = {
      //       slidesPerView: 'auto',
      //       spaceBetween: 10
      //     };

      //     if (type === 'processItem1' || type === 'processItem2') {
      //       param.on = {
      //         transitionEnd: function transitionEnd() {
      //           // eslint-disable-next-line no-use-before-define
      //           tooltip.close(); // eslint-disable-next-line no-use-before-define

      //           tooltip.init('[data-element="tooltip"]');
      //         }
      //       };
      //     }

      //     carousel = new Swiper(dom, {
      //       slidesPerView: 'auto',
      //       spaceBetween: 10
      //     });
      //     break;
      //   }

      case 'scrollItem':
        {
          // data-carousel="scrollItem" 로 검색
          carousel = new Swiper(dom, {
            slidesPerView: '3.8',
            keyboardControl: true,
            centeredSlides: true,
            allowTouchMove: false,
            initialSlide: 2 // resistance: false,

          });
          $(dom).off('afterChange').on('afterChange', function (event, plugin, anchor) {
            var scrollItem = dom.carousel;
            var idx = plugin.idx + 2;
            scrollItem.slideTo(idx, 300, false);
          });
          break;
        }

      case 'fullItem':
        {
          // data-carousel="scrollItem" 로 검색
          var items = $(dom).find('.swiper-slide')
          if(items.length < 2) {
            $('[data-carousel="fullItem"] .carousel__pagination').hide() // hide pagination
            $('[data-carousel="fullItem"] .carousel__button-next, [data-carousel="fullItem"] .carousel__button-prev').hide() // hide navigation
          }

          var fullItem = new Swiper(dom, {
            spaceBetween: 30,
            effect: 'fade',
            observer: true,
            observeParents: true,
            pagination: {
              el: '.carousel__pagination',
              clickable: true
            },
            navigation: {
              nextEl: '.carousel__button-next',
              prevEl: '.carousel__button-prev'
            },
            autoplay: {
              delay: 4000,
              disableOnInteraction: false,
            },
            // autoplay: true,
            // loop: true,
          });
          
          break;
        }

      case 'fullItemAuto':
        {
          // data-carousel="scrollItem" 로 검색
          var fullItem = new Swiper('[data-carousel="fullItemAuto"]', {
            spaceBetween: 30,
            effect: 'fade',
            observer: true,
            observeParents: true,
            pagination: {
              el: '.carousel__pagination',
              clickable: true
            },
            navigation: {
              nextEl: '.carousel__button-next',
              prevEl: '.carousel__button-prev'
            },
            autoplay: {
              delay: 4000,
              disableOnInteraction: false,
            },
          });
          break;
        }

      default:
        break;
    }

    dom.carousel = carousel;
    return carousel;
  };

  var setCaroulsel = function setCaroulsel() {
    var carouselContent = $('[data-carousel]');
    carouselContent.each(function (i, dom) {
      makeCaroulsel(dom);
    });
  };

  return {
    init: function init() {
      setCaroulsel();
    },
    reset: function reset(dom) {
      if (dom.carousel !== undefined) {
        dom.carousel.destroy(true);
      }

      makeCaroulsel(dom);
    },
    modal: function modal() {
      var modalItem = new Swiper('[data-carousel="modal"]', {
        centeredSlides: true,
        effect: 'fade',
        pagination: {
          el: '.carousel__pagination',
          clickable: true
        }
      });
    },
    accordion: function accordion(anchor) {
      var $wrap = anchor.parents('[data-element="accordion__item"]');
      var accoReserve = new Swiper($wrap.find('[data-carousel]'), {
        slidesPerView: 'auto'
      });
    }
  };
}(); // 바텀 시트형 모달


var bottomSheet = function () {
  var options = {
    show: false,
    fixed: false,
    $fixed: $('.bottom-sheet__fixed')
  };
  var active;
  return {
    init: function init(el, device) {
      var $el = $(el);

      if ($el.length < 0) {
        return false;
      }

      if (device === 'pc') {
        // PC modal Popup
        $el.each(function (i, elem) {
          var $elem = $(elem);
          var dataTarget = $elem.data('target');
          var $closeBtn = $elem.find('[data-element="bottomSheet__button-close"]');
          $elem.attr('id', dataTarget).removeAttr('data-target data-element').addClass('bottomSheet-modal');
          $("[data-target-open=\"".concat(dataTarget, "\"]")).attr({
            'data-target': "#".concat(dataTarget),
            'data-element': 'modal_anchor'
          });
          $closeBtn.after('<a href="#" rel="modal:close" class="bottom-sheet__button-close"><span class="blind">닫기</span></a>');
          $closeBtn.remove();
        });
        modalUI('[data-element="modal_anchor"]');
      } else {
        // Mobile bottom Sheet
        $el.each(function (i, elem) {
          var $elem = $(elem);
          var settings = {
            elelment: $elem,
            btnClose: $elem.find('[data-element="bottomSheet__button-close"]'),
            fixed: $elem.data('fixed')
          };
          options = $.extend(options, settings);
          $elem.css({
            bottom: $elem.outerHeight(true) * -1
          }); // event

          function resizeHandler(e) {
            if (active === null || active === undefined) return;
            $(active).css({
              bottom: 0
            });
          }

          function shutdownHandler(e) {
            var wrap = e.currentTarget.selectTarget;
            var closeBtn = $(wrap).find('[data-element="bottomSheet__button-close"]');
            closeBtn.trigger('click'); // e.stopPropagation();
            // e.stopImmediatePropagation();
          }

          function scrollPrevent(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
          }

          options.btnClose.on('click', function (e) {
            active = null;
            e.preventDefault();
            $(window).off('resize', resizeHandler);
            var $this = $(e.target);
            var $wrap = $this.parents(el);
            var target = $wrap.attr('data-target');
            var sheetHeight = $wrap.outerHeight(true);

            if (options.$fixed) {
              options.$fixed.css({
                bottom: options.$fixed.outerHeight(true) * -1
              });
            }

            var dimeds = document.querySelectorAll('.dim');
            var dimed = dimeds[dimeds.length - 1];

            if (dimed) {
              document.body.removeAttribute('style'); // dimed.removeEventListener('touchmove', shutdownHandler);

              $(dimed).off('scroll touchmove mousewheel', scrollPrevent);
              dimed.removeEventListener('click', shutdownHandler, true);
              allScrollPrevent(false);
            }

            $("[data-target=\"".concat(target, "\"]")).stop().animate({
              bottom: sheetHeight * -1
            }, function () {
              $("[data-target=\"".concat(target, "\"]")).css('display', 'none');
              $(dimed).animate({
                opacity: 0
              }, 200, function () {
                $(dimed).remove();
              });
            });
          });
          $('[data-target-open]').off('click').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(window).on('resize', resizeHandler);
            var $this = $(e.currentTarget);
            var target = $this.data('target-open');
            var wrapTarget = document.querySelector("[data-target=\"".concat(target, "\"]"));
            active = wrapTarget;
            $("[data-target=\"".concat(target, "\"]")).show();
            $('body').prepend('<div class="dim" aria-hidden="true"></div>');
            $("[data-target=\"".concat(target, "\"]")).stop().animate({
              bottom: 0,
              display: 'block'
            });
            var dimed = document.querySelector('.dim');
            dimed.selectTarget = wrapTarget;
            $(dimed).on('scroll touchmove mousewheel', scrollPrevent);
            allScrollPrevent(true);
            dimed.addEventListener('click', shutdownHandler, true);

            if (options.$fixed) {
              options.$fixed.stop().animate({
                bottom: 0
              }, 300);
            }
          });
        });
      }
    }
  };
}();

var slider = function () {
  var setting = {
    start: 0,
    format: wNumb({
      // eslint-disable-line
      decimals: 0,
      thousand: ','
    })
  };
  return {
    init: function init(el) {
      var _this4 = this;

      var $el = $(el);
      $el.each(function (i, elem) {
        var $elem = $(elem);
        var options = {
          start: $elem.data('start'),
          range: $elem.data('range'),
          step: $elem.data('step'),
          disableMobile: true
        };
        var defaults = $.extend(setting, options);
        var isRange = defaults.start.length > 1;

        if (isRange) {
          defaults.connect = [false, true, false];
        } else {
          defaults.connect = 'lower';
        }

        if ($elem.data('tooltip')) {
          var tooltips = [];

          if (options.start.length) {
            options.start.forEach(function () {
              tooltips.push(true);
            });
            options.pips = {
              mode: 'count',
              values: 5
            };
          } else {
            tooltips.push(true);
          }

          $.extend(defaults, {
            tooltips: tooltips
          });
        }

        if ($elem.data('pips') === 'kg') {
          var pips = {
            mode: 'positions',
            values: [0, 17.5, 35, 52.5, 70, 87.5, 100],
            density: 0,
            step: 5,
            format: wNumb({
              decimals: 0,
              suffix: 'kg'
            })
          };
          var valueSnap = {
            snap: true,
            connect: true,
            tooltips: [wNumb({
              suffix: 'kg'
            })]
          };
          $.extend(defaults, _objectSpread({}, valueSnap), {
            pips: pips
          });
        }

        _this4.bindSlider(elem, defaults, isRange);
      });
    },
    bindSlider: function bindSlider(elem, defaults, isRange) {
      var $element = $(elem);
      noUiSlider.create(elem, defaults); // eslint-disable-line

      var $minVal = $element.data('min-value');
      var $maxVal = $element.data('max-value');
      $minVal = $($minVal);
      $maxVal = $($maxVal);
      elem.noUiSlider.on('update', function (values) {
        if (isRange) {
          $minVal.text(values[0]);
          $maxVal.text(values[1]);
        } else {
          $maxVal.text(values[0]);
        }
      });
      elem.noUiSlider.on('update', function (a, b, c) {
        if (a[0] * 1 / defaults.range.max > 0.5) {
          $element.closest('.slider').addClass('over');
        } else {
          $element.closest('.slider').removeClass('over');
        }
      });
    }
  };
}();

var inputToggle = function () {
  var event = function event(tAnchor, act) {
    var controls = tAnchor.attr('aria-controls');

    if (act === 'slide' && tAnchor.prop('checked')) {
      tAnchor.attr('aria-expanded', true);
      $("#".concat(controls)).stop().slideDown(300, function () {
        $("#".concat(controls)).css('display', 'block');
      });
    } else if (act === 'slide' && !tAnchor.prop('checked')) {
      tAnchor.attr('aria-expanded', false);
      $("#".concat(controls)).stop().slideUp(300, function () {
        $("#".concat(controls)).css('display', 'none');
      });
    } else {
      tAnchor.attr('aria-expanded', true);

      if (tAnchor.attr('type') === 'radio') {
        var name = tAnchor.attr('name');
        var mems = $("input[type=\"radio\"][name=".concat(name, "]"));
        mems.each(function (i, dom) {
          var targetDom = document.getElementById(dom.getAttribute('aria-controls'));
          $(targetDom).css('display', 'none');
        });
      }

      $("#".concat(controls)).css('display', 'block');
      $("#".concat(controls)).animate({
        opacity: 1
      }, 300);
    }
  };

  return {
    init: function init(el) {
      var $el = $(el);

      if ($el.length < 0) {
        return false;
      }

      $el.each(function (i, element) {
        var $element = $(element);
        var $anchor = $element.find('[data-toggle="toggle__anchor"], .radio-wrap input[type="radio"]');
        var anchorId = $anchor.attr('id');
        var $panel = $element.find('[data-toggle="toggle__panel"]'); // setting

        for (var n = 0; n < $anchor.length; n += 1) {
          $anchor.eq(n).attr('aria-controls', "".concat(anchorId, "-").concat(n)).attr('aria-expanded', false);
          $panel.eq(n).attr('id', "".concat(anchorId, "-").concat(n)).css('display', 'none');

          if ($anchor.eq(n).is(':checked')) {
            $anchor.eq(n).attr('aria-expanded', true);
            $panel.eq(n).css('display', 'block');
          }
        }

        $anchor.each(function (v, dom) {
          if ($(dom).attr('type') === 'radio') {
            $(dom).on('change', function (e) {
              var radioTarget = e.currentTarget.getAttribute('name');
              var selector = "input[name=\"".concat(radioTarget, "\"][aria-expanded=\"true\"]");
              var prevTarget = document.querySelector(selector);

              if (prevTarget) {
                prevTarget.setAttribute('aria-expanded', false);
                var others = document.getElementById(prevTarget.getAttribute('aria-controls'));

                if (others) {
                  $(others).css({
                    display: 'none',
                    opacity: 0
                  });
                }
              }

              dom.setAttribute('aria-expanded', true);

              if ($(e.target).attr('data-toggle') === 'toggle__anchor') {
                $anchor.attr('aria-expanded', false);
                event($(e.target));
              } else {
                var controls = $anchor.attr('aria-controls');
                $anchor.attr('aria-expanded', false);
                $("#".concat(controls)).css('display', 'none');
              }
            });
          } else {
            $(dom).on('change', function (e) {
              event($(e.target), 'slide');
            });
            var subConnect = element.getAttribute('data-connect-subs') === 'true';

            if (subConnect) {
              $(element).on('change', function (e) {
                var input = e.target;
                var members = $(element).find('input[data-target-depth="sub"]');

                if (input.getAttribute('data-target-depth') === 'main') {
                  members.each(function (index, elem) {
                    elem.checked = input.checked;
                  });
                } else if (input.getAttribute('data-target-depth') === 'sub') {
                  var age = 0;
                  members.each(function (index, elem) {
                    if (elem.checked === false) {
                      age += 1;
                    }
                  });

                  if (age === members.length) {
                    var minput = element.querySelector('input[data-target-depth="main"]');
                    minput.checked = false;
                    $anchor.trigger('change');
                  }
                }
              });
            }
          }
        });
      });
    }
  };
}(); 

// 예약 datepicker (개발 기능)
var datepicker = function () {
  var picker = flatpickr; // eslint-disable-line
  var optionDefault = {
    dateFormat: 'Y.m.d (D)',
    // altFormat: 'Y, F j',
    //ariaDateFormat: 'Y, F j',
    ariaDateFormat: 'Ymd',
    disableMobile: 'true',
    nextArrow: '',
    prevArrow: '',
    showMonths: 12,
    inline: true,
    static: true,
    prevMonthNav: 'left arrow',
    enxtMonthNav: 'left arrow'
  };
  var optionSingle = {
    mode: 'single'
  };
  var optionRange = {
    mode: 'range'
  };
  var pickerOptions;
  var calendarElem;

  function formatDate(date, yesterday) {
    if (!date) return;
    var d = date;
    var year = d.getFullYear();
    var month = "".concat(d.getMonth() + 1);
    var day = d.getDate();

    if (month.length < 2) {
      month = "0".concat(month);
    }

    if (day < 10) {
      day = "0".concat(day);
    }

    if (yesterday) {
      day -= 1;
    }

    return "".concat(year, "-").concat(month, "-").concat(day);
  }

  var setDay = {
    onDayCreate: function onDayCreate(dObj, dStr, fp, dayElem) {
      var dayText = $(dayElem).html();
      $(dayElem).append("<span class=\"date\" aria-hidden=\"true\">".concat(dayText, "</span>"));
    }
  };

  var setSchedule = function setSchedule(el, dates) {
    var round = el.getAttribute('data-oneday-round') === 'true';
    el.calendar.updateSchedule(dates);
    var selector = $(el).closest('.modal-full--picker');
    var targetName = "#".concat(selector.attr('id'));
    var eleCal = document.querySelector(targetName);
    var pickerId = eleCal.getAttribute('id');
    var btn = $("button[data-target=\"#".concat(pickerId, "\"]"));
    var result;

    if (round && dates.length === 2 && formatDate(dates[0]) === formatDate(dates[1])) {
      result = "".concat($(el).prop('value'), " ~ ").concat($(el).prop('value'));
    } else {
      result = $(el).prop('value');
    }

    btn.addClass('is-select').text(result);
  };

  var getSchedule = function getSchedule(el) {
    return el.calendar.selectedDates;
  };

  var setPicker = function setPicker(el, options) {
    var $el = $(el);
    var dataPicker = $el.data('picker');
    var pickerType = dataPicker === 'single' ? optionSingle : optionRange;
    var setting = $.extend(options, optionDefault, pickerType);
    var randomId = Math.random().toString(36).substr(2, 9);
    var pickerId = "#".concat(randomId);
    var calendar;

    el.setSchedule = function (dates) {
      setSchedule(el, dates);
    };

    el.getSchedule = function () {
      return getSchedule(el);
    };

    setting.dateFormat = $el.data('format') || optionDefault.dateFormat;
    setting.headerFirst = $el.data('header-first') || 'year';

    if ($el.data('set-from')) {
      var onReady = {
        onReady: function onReady() {
          this.jumpToDate($el.data('set-from'));
        }
      };
      $.extend(setting, onReady);
    }

    if ($el.data('min-date')) {
      setting.minDate = $el.data('min-date') || new Date();
    }

	if ($el.data('max-date')) {
      setting.maxDate = $el.data('max-date') || new Date();
    }
	if ($el.data('air-max-date')) {
		setting.maxDate = dUtil.termDate('D', 362, 'ymd', setting.minDate);
		setting.maxDate = setting.maxDate.substring(0,4)+"-"+setting.maxDate.substring(4,6)+"-"+setting.maxDate.substring(6,8);
    }

    pickerOptions = setting;

    if (el.tagName === 'INPUT') {
      calendar = $el.flatpickr(setting);
      calendarElem = $el;
    } else {
      $el.append("<input type=\"text\" id=\"".concat(randomId, "\" class=\"hidden\">"));
      calendar = $(pickerId).flatpickr(setting);
      $(pickerId).on('change', function (e) {
        e.preventDefault();
        var $val = e.target.value.split(' ~ ');
        $el.find('[data-range="start"]').val($val[0]);
        $el.find('[data-range="end"]').val($val[1]);
      });
    }

    var weekday = $('.flatpickr-rContainer');
    var weekdayPosition = weekday.offset().top;

    if (weekday.closest('.modal')) {
      weekday.closest('.modal').on($.modal.OPEN, function (event, plugin) {
        //weekdayPosition = plugin.$elm.find('.flatpickr-rContainer').offset().top;
        plugin.$elm.on('scroll', function () {
          if (plugin.$elm.scrollTop() >= weekdayPosition) {
            weekday.addClass('fixed');
          } else {
            weekday.removeClass('fixed');
          }
        });
      });
    }

    var text = $(el).data('text');

    if (text) {
      var subText = "<span class=\"info\">".concat(text, "</span>");
      $('.flatpickr-rContainer').prepend(subText);
    }
  };

  function getData(data) {
    var result;

    if (typeof data === 'string') {
      var source = data;
      $.ajax({
        url: source,
        async: false
      }).done(function (response) {
        result = response;
      }).fail(function () {
        result = 'error';
      });
    } else {
      result = JSON.parse(data);
    }

    return result;
  }

  function changeEvent(selectDates, bef) {
    if (selectDates.length === 2 && !bef) {
      $('body').addClass('selectRange').removeClass('selectSingle');
    } else if (selectDates.length === 1 || bef) {
      $('body').addClass('selectSingle').removeClass('selectRange');
    } else {
      $('body').removeClass('selectSingle selectRange');
    } // calendarElem.changeMonth(0, false);

  }

  function setPeriodText() {
    var choiseBefore;
    var result = {
      onDayCreate: function onDayCreate(dObj, dStr, fp, dayElem) {
        var dayText = $(dayElem).html();
		var weekClass = "";        
		var message = $(fp.element).data('rangeText') || undefined;
        $(dayElem).append("<span class=\"date\" aria-hidden=\"true\">".concat(dayText, "</span>"));
		switch (dayElem.dateObj.getDay()) {
			case 0:
				weekClass = 'sun'
				break;
			case 1:
				weekClass = 'mon'
			    break;		
			case 2:
				weekClass = 'tue'
			    break;			
			case 3:
				weekClass = 'wed'
			    break;			
			case 4:
				weekClass = 'thu'
			    break;			
			case 5:
				weekClass = 'fri'
			    break;			
			case 6:
				weekClass = 'sat'
			    break;
			default:
				break;
		}
		 $(dayElem).addClass(weekClass);        
		if (message) {
			if ($(dayElem).hasClass('startRange') && !$(dayElem).hasClass('endRange')) {
				$(dayElem).append("<strong class=\"sub\">".concat(message.start, "</strong>"));
				if(typeof $("#selectDate") != 'undefined'){
					$("#selectDate").data("startdate" , $(dayElem).attr("aria-label"))
					$("#selectDate").data("startweek" , weekClass)
				}
			}			
			if ($(dayElem).hasClass('endRange') && !$(dayElem).hasClass('startRange')) {
				$(dayElem).append("<strong class=\"sub\">".concat(message.end, "</strong>"));
			}
			if ($(dayElem).hasClass('startRange endRange')) {
				$(dayElem).append("<strong class=\"sub\">".concat(message.current, "</strong>"));
			}
		}
        //돌아오는편 최저가 운임 표출
		if(typeof dObj[0] != 'undefined' && typeof lowestFareJson !='undefined'){
			drawArrlowestFare($(dayElem) , dObj)
		}
		var maxDate;
		if (typeof dUtil ==="undefined"){
			maxDate =  "20220512"
		}else{
			maxDate =  dUtil.termDate('D', 362, 'ymd', $(fp.element).data('defaultdate')) 	
		}
		if($(dayElem).attr('aria-label') >=maxDate){
			$(dayElem).addClass('flatpickr-disabled')
			$('.flatpickr-next-month').addClass('flatpickr-disabled')
	    }else{
			$('.flatpickr-next-month').removeClass('flatpickr-disabled')
		}
      }
    };
    return result;
  }
  function setDate(dateObject) {
    var date = dateObject;
    var disable = [];
    date.disabled.forEach(function (d) {
      d.date.forEach(function (v) {
        disable.push(v);
      });
    });
    disable = {
      disable: disable
    };
    var choiseBefore;
    var result = {
      onDayCreate: function onDayCreate(dObj, dStr, fp, dayElem) {
        var dayText = $(dayElem).html();
        var message = $(fp.element).data('rangeText') || undefined;
        var selectDate = formatDate(fp.selectedDates[0]);
        var day = dayElem.dateObj;
        day = formatDate(day);

        switch (dayElem.dateObj.getDay()) {
          case 0:
            $(dayElem).addClass('sun');
            break;

          case 1:
            $(dayElem).addClass('mon');
            break;

          case 2:
            $(dayElem).addClass('tue');
            break;

          case 3:
            $(dayElem).addClass('wed');
            break;

          case 4:
            $(dayElem).addClass('thu');
            break;

          case 5:
            $(dayElem).addClass('fri');
            break;

          case 6:
            $(dayElem).addClass('sat');
            break;

          default:
            break;
        }
		var maxDate;
		if (typeof dUtil ==="undefined"){
			maxDate =  "20220512"
		}else{
			maxDate =  dUtil.termDate('D', 362, 'ymd', $(fp.element).data('defaultdate')) 	
		}
		if($(dayElem).attr('aria-label') >=maxDate){
			$(dayElem).addClass('flatpickr-disabled')
			$('.flatpickr-next-month').addClass('flatpickr-disabled')
	    }else{
			$('.flatpickr-next-month').removeClass('flatpickr-disabled')
		}	

        $(dayElem).append("<span class=\"date\" aria-hidden=\"true\">".concat(dayText, "</span>"));
        date.price.forEach(function (p) {
          p.date.forEach(function (d) {
            if (d === day) {
              $(dayElem).addClass(p.class);

              if (p.label) {
                $(dayElem).append("<span class=\"label\">".concat(p.label, "</span>"));
              }
            }
          });
        });
        date.disabled.forEach(function (d) {
          d.date.forEach(function (dd) {
            if (dd === day) {
              $(dayElem).addClass('flatpickr-disabled') // .removeAttr('tabindex')
              .append("<span class=\"label\">".concat(d.label, "</span>"));
            }
          });
        });

        if (selectDate >= day) {
          $(dayElem).addClass('selectBefore');
        }

        if (message) {
          if ($(dayElem).hasClass('startRange') && !$(dayElem).hasClass('endRange')) {
            $(dayElem).append("<strong class=\"sub\">".concat(message.start, "</strong>"));
          }

          if ($(dayElem).hasClass('endRange') && !$(dayElem).hasClass('startRange')) {
            $(dayElem).append("<strong class=\"sub\">".concat(message.end, "</strong>"));
          }

          if ($(dayElem).hasClass('startRange endRange')) {
            $(dayElem).append("<strong class=\"sub\">".concat(message.current, "</strong>"));
          }
        }
      },
      onChange: function onChange(selectedDates, dateStr, instance) {
        var bef = false;

        if (choiseBefore) {
          if (formatDate(choiseBefore) > (formatDate(instance.latestSelectedDateObj) || formatDate(selectedDates[0]))) {
            choiseBefore = instance.latestSelectedDateObj || selectedDates[0];
            pickerOptions.defaultDate = formatDate(choiseBefore);
            $(this.element).flatpickr(pickerOptions).changeMonth(instance.currentMonth, false);
            bef = true;
          } else {
            bef = false;
          }
        } // choiseBefore = instance.latestSelectedDateObj || selectedDates[0];


        var dataOnedayRound = instance.input.getAttribute('data-oneday-round') === 'true' && selectedDates.length >= 2;

        if (dataOnedayRound && formatDate(selectedDates[0]) === formatDate(selectedDates[1])) {
          var dateOneStr = instance.input.value;
          instance.input.value = "".concat(dateOneStr, " ~ ").concat(dateOneStr);
        }

        changeEvent(selectedDates, bef);
      }
    };
    $.extend(result, disable);
    return result;
  }

  return {
	init: function init(el , type , useReset) {
      var $el = $(el);	
		if(type !='multi'){
			$el = $el.eq(0)
		}
		if(type ==='multi'){
			$el = $el.eq(1)
		}

      $el.each(function (i, elem) {
        var $elem = $(elem);
        var setting = $.extend({}, optionDefault, setDay); // locale set

		setting.locale = $elem.data('locale') || 'ko';
		//flatpickr 은 zh 로 들어가야함
		setting.locale = setting.locale.substring(0,2);
		setting.dateFormat = $elem.data('date-format') || setting.dateFormat;

		if ($elem.data('ajax')) {
          var ajaxData = getData($elem.data('ajax'));
          var date = ajaxData === 'error' ? {} : setDate(ajaxData);
          $.extend(setting, setPeriodText(), date);
        } else {
          var setPeriod = setPeriodText();
          $.extend(setting, setPeriod);
        } // if ($elem.data('defaultDate')) {
		
		// ja시 요일 별도 처리
		if (setting.locale == 'ja') {
			optionDefault.locale =  {
		      weekdays: {
		        shorthand: ["日", "月", "火", "水", "木", "金", "土"]
		      }
		    }
		}

        if ($elem.attr('data-defaultDate')) {
          var dateDate = $elem.attr('data-defaultDate');
			$.extend(setting, {
            	defaultDate: dateDate
			});
        } // }
        //화면 열릴때 초기화
		if(type =='' || type=='Flight'){
				var setPeriod = setPeriodText();
		       	$.extend(setting, setPeriod);  
		        setPicker(elem, setting);
        }
		if(useReset == '' || typeof(useReset) == "undefined"){
		    pickerOptions.mode = $(elem).data('picker');
		    var mon = $(elem).flatpickr(pickerOptions).currentMonth;
        $(document).on('click', '[data-reset-date]', function (event) {
          pickerOptions.mode = $(elem).data('picker'); 
          $(elem).flatpickr(pickerOptions).clear();
          $(elem).flatpickr(pickerOptions).changeMonth(0);
        }); //20211008 에어소프트 수정
		}
      });
    },
    responsive: function responsive(device) {
      if ($('[data-picker]').length) {
        if (device === 'pc') {
          pickerOptions.showMonths = 2;
          $('[data-picker]').each(function (i, elem) {
            pickerOptions.mode = $(elem).data('picker');
            $(elem).flatpickr(pickerOptions).redraw();
          });
        } else {
          pickerOptions.showMonths = 12;
          $('[data-picker]').each(function (i, elem) {
            $(elem).flatpickr(pickerOptions).redraw();
          });
        } 
        // const text = calendarElem.data('text');
        // if (text) {
        //   const subText = `<span class="info">${text}</span>`;
        //   $('.flatpickr-rContainer').prepend(subText);
        // }
      }
    },
    
    // mobile화면에서 datepicker를 minDate부터 maxDate까지 표시하도록 변경
    redrawShowMonthsFromMinDateToMaxDate: function redrawShowMonthsFromMinDateToMaxDate(device) {
	if ($('[data-picker]').length) {
        if (device === 'pc') {
			pickerOptions.showMonths = 2;
			$('[data-picker]').each(function (i, elem) {
            	pickerOptions.mode = $(elem).data('picker');
	            $(elem).flatpickr(pickerOptions).redraw();
          	});
        } else { 
          var minDate = new Date(pickerOptions.minDate);
          var maxDate = pickerOptions.maxDate === 'today' ? new Date() : new Date(pickerOptions.maxDate)
          var period = getDifMonth(minDate, maxDate) + 1; // 표시할 기간
          
          var defaultDate;
          if(pickerOptions.defaultDate) {
            var defaultDateStr = pickerOptions.defaultDate.toString().replace(/[^0-9]/g,'')
            defaultDate = new Date(defaultDateStr.substring(0,4), defaultDateStr.substring(4,6) - 1, defaultDateStr.substring(6,8));
          } else {
            defaultDate = new Date();
          }
          var changeMonth = getDifMonth(minDate, defaultDate); // 기본달에서 앞으로 이동할 달

          pickerOptions.showMonths = period;
          $('[data-picker]').each(function (i, elem) {
            $(elem).flatpickr(pickerOptions).redraw();
            $(elem).flatpickr(pickerOptions).changeMonth(-changeMonth);
          });
        }
      }
    },

	initPointDatepicker: function initPointDatepicker(el , type , useReset) { // 211224 포인트조회 페이지 날짜 선택의 datepicker init
      var $el = $(el);	
		if(type !='multi'){
			$el = $el.eq(0)
		}
		if(type ==='multi'){
			$el = $el.eq(1)
		}
		
		var $selectDate = $el.find('[id=selectDate]').prevObject.prevObject;
		
      $selectDate.each(function (i, elem) {
        var $elem = $(elem);
        var setting = $.extend({}, optionDefault, setDay); // locale set

		setting.locale = $elem.data('locale') || 'ko';
		//flatpickr 은 zh 로 들어가야함
		setting.locale = setting.locale.substring(0,2);
		setting.dateFormat = $elem.data('date-format') || setting.dateFormat;

		if ($elem.data('ajax')) {
          var ajaxData = getData($elem.data('ajax'));
          var date = ajaxData === 'error' ? {} : setDate(ajaxData);
          $.extend(setting, setPeriodText(), date);
        } else {
          var setPeriod = setPeriodText();
          $.extend(setting, setPeriod);
        } // if ($elem.data('defaultDate')) {


        if ($elem.attr('data-defaultDate')) {
          var dateDate = $elem.attr('data-defaultDate');
			$.extend(setting, {
            	defaultDate: dateDate
			});
        } // }
        //화면 열릴때 초기화
		if(type =='' || type=='Flight'){
				var setPeriod = setPeriodText();
		       	$.extend(setting, setPeriod);  
		        setPicker(elem, setting);
        }
		if(useReset == '' || typeof(useReset) == "undefined"){
		    pickerOptions.mode = $(elem).data('picker');
		    var mon = $(elem).flatpickr(pickerOptions).currentMonth;
        $(document).on('click', '[data-reset-date]', function (event) {
          pickerOptions.mode = $(elem).data('picker'); 
          $(elem).flatpickr(pickerOptions).clear();
          $(elem).flatpickr(pickerOptions).changeMonth(0);
        }); 
		}
      });
    },
  };
}(); 

// 하단 토스트 창 fixed 영역
var toast = function () {
  var options = {};

  var defaultOpt = function defaultOpt() {
    var defaults = {
      delay: 1500,
      width: {
        mob: 'calc(100% - 40px)',
        pc: 640
      },
      distance: {
        mob: 30,
        pc: 100
      },
      position: 'bottom'
    };
    return defaults;
  };

  var event = function event() {
    var _$element$stop$animat;

    var $element = $('.toast');
    $element.focus();
    $element.stop().animate((_$element$stop$animat = {}, _defineProperty(_$element$stop$animat, options.position, window.innerWidth < MOBILE_WIDTH ? options.distance.mob : options.distance.pc), _defineProperty(_$element$stop$animat, "opacity", 1), _$element$stop$animat), 500, 'easeInOutQuint', function () {
      $element.addClass('is-active')
      if (options.delay !== 'none') {
        var timer = setTimeout(function () {
          var _$element$stop$animat2;

          $element.stop().animate((_$element$stop$animat2 = {}, _defineProperty(_$element$stop$animat2, options.position, 0), _defineProperty(_$element$stop$animat2, "opacity", 0), _$element$stop$animat2), 100, function () {
            $element.remove();
          });
          clearTimeout(timer);
          $(options.focus).focus();
        }, options.delay);
      }
    });
  };

  return {
    init: function init(opt) {
      if (opt === undefined) {
        return false;
      } // setting

      if (!$('body').find('.toast').is(':visible')) {
        var _$$css;

        $('body').append("<div class=\"toast\"><div class=\"toast-box\"><p class=\"toast__text\">".concat(opt.text, "</p></div></div>"));
        var settings = {
          delay: opt.delay,
          width: opt.width,
          position: opt.position,
          distance: opt.distance,
          focus: $(opt.focus)
        };
        options = $.extend(defaultOpt(), settings);
        $('.toast').css((_$$css = {}, _defineProperty(_$$css, options.position, "".concat(100 * -1, "%")), _defineProperty(_$$css, "display", 'block'), _defineProperty(_$$css, "width", window.innerWidth < MOBILE_WIDTH ? options.width.mob : options.width.pc), _defineProperty(_$$css, "opacity", 0), _$$css)); 
        // .attr('tabindex', 0);

        if (opt.slot) {
          $('.toast').append($.parseHTML(opt.slot));
        }

        event();
        $('body').on('changeDevice.toastResize', function (e, device) {
          $('.toast').css(_defineProperty({
            width: window.innerWidth < MOBILE_WIDTH ? options.width.mob : options.width.pc
          }, options.position, window.innerWidth < MOBILE_WIDTH ? options.distance.mob : options.distance.pc));
        });
      } else {
        return false;
      }
    }
  };
}();

var defaultMsg = function () {
  return {
    init: function init(opt) {
      $(opt).find('.default-message__close').on('click', function (e) {
        var $wrap = $(e.currentTarget).parents('[data-default-message]');
        //$wrap.stop().hide(function () {
        $wrap.remove();
        //});
      });
      $(window).on('scroll', function () {
        if ($('.default-message--notice').hasClass('ticketing_top_bar') && $('body').hasClass('isMobile'))
        {
          $('.default-message--notice').removeClass('on');
        }
      })
    }
  };
}();

var topCustomBanner = function () {
  return {
    init: function init(opt) {
      $(opt).find('.top-custom-banner__close').on('click', function (e) {
        var $wrap = $(e.currentTarget).parents('.top-custom-banner');
        $wrap.stop().hide(function () {
          $wrap.remove();
        });
      });
      $(window).on('scroll', function () {
        if ($('.top-custom-banner').hasClass('ticketing_top_bar') && $('body').hasClass('isMobile'))
        {
          $('.top-custom-banner').removeClass('on');
        }
      })
    }
  };
}();

var buttonTextToggle = function () {
  var options = {
    anchor: '[data-text-anchor]',
    label: '[data-text-label]'
  };
  return {
    init: function init(el) {
      $(el).each(function (i, elem) {
        var $elem = $(elem);
        var $anchor = $elem.find(options.anchor);
        var $label = $elem.find(options.label);
        var settings = [];
        var set = {
          openText: $label.data('open'),
          closeText: $label.data('close')
        };
        settings.push(set);
        $label.text(set.openText);

        if ($anchor.hasClass('is-active')) {
          $label.text(set.closeText);
        } else {
          $label.text(set.openText);
        }

        $anchor.on('click', function (e) {
          var $target = $(e.currentTarget);
          settings.forEach(function (index) {
            if ($target.hasClass('is-active')) {
              $label.text(index.closeText);
            } else {
              $label.text(index.openText);
            }
          });
        });
      });
    }
  };
}(); // 모바일 형 select bottomSheet 셀렉트(마크업 동적으로 생성)


var uiSelect = function () {
  var template = "\n    <div class=\"bottom-sheet\" role=\"listbox\" data-element=\"bottomSheet\"><div data-element=\"bottomSheet-box\" role=\"listbox\"></div></div>";

  function clickHandler(e) {
    var $selectWrap = $(e.currentTarget).parents('[data-element="select"]');
    var closebtn = $selectWrap.find('[data-element="select__button-close"]');
    closebtn.trigger('click');
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

  function scrollPrevent(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

  var open = function open(element) {
    var $this = element;
    var $selectWrap = $this.parents('[data-element="select"]');
    var $selButton = $selectWrap.find('[data-element="select__button"]');
    var $bottomSheet = $selectWrap.find('.bottom-sheet');
    $this.parent().prepend('<div class="dim" aria-hidden="true"></div>');
    var dimed = $this.parent().find('.dim');
    dimed.on('scroll touchmove mousewheel', scrollPrevent);
    dimed[0].addEventListener('click', clickHandler, true);
    var eventTargetDom = element.parents('[data-element="select"]')[0];

    eventTargetDom.resizeHandler = function (e) {
      var $stWrap = $this.parents('[data-element="select"]');
      var $btSheet = $stWrap.find('.bottom-sheet');
      $btSheet.css({
        bottom: 0
      });
      $stWrap.find('[data-target-index]').css({
        width: window.innerWidth
      });
      selectLen = $stWrap.find('[data-target-index]').length;
      currentNum = -$stWrap.prop('currentNum');
      $stWrap.find('[data-element="selectbox-wrap"]').css({
        width: window.innerWidth * selectLen,
        'margin-left': window.innerWidth * currentNum
      });
      var selectWrap = $stWrap.find('[data-element="selectbox-wrap"]');
      if (selectWrap.length > 0) selectWrap[0].style.removeProperty('transition');

      if (window.innerWidth > MOBILE_WIDTH) {
        selectWrap.find('[data-element="select__button-close"]').trigger('click');
      }
    };

    allScrollPrevent(true);
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style['touch-action'] = 'none';
    document.body.style['min-height'] = 'none';
    window.addEventListener('resize', eventTargetDom.resizeHandler);
    $bottomSheet.css('display', 'block');
    setTimeout(function () {
      $bottomSheet.css({
        bottom: 0,
        'z-index': 2000,
        transition: 'all 0.3s'
      });
    }, 50);
  };

  var close = function close(element) {
    var $this = element;
    var $selectWrap = $this.parents('[data-element="select"]');
    var $bottomSheet = $selectWrap.find('.bottom-sheet');
    var dimed = $selectWrap.find('.dim');
    document.body.removeAttribute('style');
    allScrollPrevent(false);
    dimed.off('scroll touchmove mousewheel', scrollPrevent);

    if (dimed.length > 0) {
      dimed[0].removeEventListener('click', clickHandler, true);
    }

    var eventTargetDom = element.parents('[data-element="select"]')[0];
    window.removeEventListener('resize', eventTargetDom.resizeHandler);
    $bottomSheet.css({
      bottom: $bottomSheet.outerHeight(true) * -1
    });
    setTimeout(function () {
      $bottomSheet.css('display', 'none');
    }, 100);
    dimed.remove();
    $selectWrap.find('[data-element="select__button"]').focus();
  };

  return {
    // select 박스 클릭 시 옵션값을 자바스크립트로 마크업 appendChild
    buildOption: function buildOption(elem) {
      var $element = $(elem);
      $element.prop('currentNum', 0);
      var $select = $element.find('[data-element="select__select"]'); // select 마크업 하나당 한개 씩 붙이는  comp를 innerHtml로 동적으로 붙인다.

      var comp = "<div class=\"bottom-sheet__top\">\n      <div class=\"title\">\n        <h2 class=\"title__main\"></h2>\n      </div>\n    </div>\n    <div class=\"select-wrap__option-wrap\" data-element=\"select-wrap__options\"></div>"; // eslint-disable-next-line no-plusplus

      var container = elem.querySelector('[data-element="bottomSheet-box"]');
      container.innerHTML = '<div data-element="selectbox-wrap"></div>';
      elem.querySelector('[data-element="bottomSheet"]').appendChild(container);
      var selectLen = $select.length;
      $select.each(function (i, select) {
        var domDiv = document.createElement('div');
        domDiv.setAttribute('data-target-index', i);
        domDiv.innerHTML = comp;
        var titleArr = $(select).attr('title').split(' ');
        var tit = titleArr.slice(0, titleArr.length - 1);
        var $selButton = $(container).find('[data-element="select__button"]');
        var $selOpt = $(select).find('option');
        var $selOptOn = $(select).find(':selected');
        var selOptLen = $selOpt.length;
        var htmlOption = '';

        for (var index = 0; index < selOptLen; index += 1) {
          var $selOptCurrent = $selOpt.eq(index);

          if ($selOptCurrent.text().length) {
            htmlOption += "<button type=\"button\" role=\"option\" value=\"".concat($selOptCurrent.val(), "\" class=\"select-wrap__option-item\" aria-selected=\"false\">");
            htmlOption += "<span class=\"ui-select-txt\">".concat($selOptCurrent.text(), "</span>");
            htmlOption += '</button>';
          }
        }

        if (i > 0) {
          var prevBtn = document.createElement('button');
          prevBtn.classList.add('btn-select-bt-prev-btn');
          domDiv.querySelector('.bottom-sheet__top').insertBefore(prevBtn, domDiv.querySelector('.bottom-sheet__top .title'));
        }

        $(domDiv).find('.bottom-sheet__top .title__main').text(tit.join().replace(/,/g, ' ')); // $(window).on('resize');

        $(domDiv).find('.select-wrap__option-wrap').append(htmlOption);

        if (selectLen > 1) {
          var advSize = 120;
          $(domDiv).find('.select-wrap__option-wrap').css({
            height: advSize,
            width: '100%'
          });
          $(domDiv).css({
            width: window.innerWidth,
            float: 'left',
            position: 'relative'
          });
          $(container).find('[data-element="selectbox-wrap"]').css({
            width: window.innerWidth * selectLen,
            transition: 'margin-left .4s',
            position: 'relative' // height: advSize,

          });
        }

        container.querySelector('[data-element="selectbox-wrap"]').appendChild(domDiv);
        var selectedIndex = select.selectedIndex === undefined ? 0 : select.selectedIndex;

        if ($(select).find('option[selected]').length > 0) {
          // 마크업으로 option selected 일때(개발단에서 selected 값을 넣을때)
          selectedIndex = $(select).find('option[selected]').index();
          $(select).find('option[selected]').removeAttr('selected'); // 로드된 이후에는 속성 삭제

          select.selectedIndex = selectedIndex;
        }

        var $selOption = $(select).find('option');
        var $selOptionBtn = $(domDiv).find('[data-element="select-wrap__options"] button');

        if ($selOptOn.text()) {
          $selButton.addClass('active').text($selOptOn.text());
          var selectNum = $selOption.length !== $selOptionBtn.length ? selectedIndex - 1 : selectedIndex;
          $(domDiv).find('.select-wrap__option-item').eq(selectNum).addClass('on').attr('aria-selected', true);
        }

        var htmlCloseBtn = '<button type="button" data-element="select__button-close" class="bottom-sheet__button-close" aria-label="close"></button>';
        domDiv.innerHTML += htmlCloseBtn;
      });
    },
    clearOption: function clearOption(elem) {
      var $element = $(elem);
      var $options = $element.find('.select-wrap__option-item');
      $options.remove();
    },
    init: function init(el) {
      var _this5 = this;

      $(el).each(function (i, element) {
        if ($(this).find('.bottom-sheet').length < 1)
        {
          var $element = $(element);
          var $select = $element.find('[data-element="select__select"]');
          var customClass = $select.data('class') || false;
          var defaultValue = $select.prop('value');
          $select.attr('tabindex', -1);
          $select.attr('aria-hidden', true); // bottom-sheet template
  
          var htmlButton = '';
          var htmlOptWrap = template; // bottom-sheet option
  
          if (customClass) {
            $element.find('[data-element="bottomSheet"]').addClass(customClass);
          }
  
          if (defaultValue) {
            htmlButton = "<button type=\"button\" class=\"select-wrap__button active\" data-element=\"select__button\" role=\"combobox\">".concat($select.find('option:selected').html(), "</button>");
          } else {
            htmlButton = "<button type=\"button\" class=\"select-wrap__button\" data-element=\"select__button\" role=\"combobox\">".concat($select.data('placeholder'), "</button>");
          }
  
          $element.append(htmlButton); // select button append
  
          $element.append(htmlOptWrap); //  select option-wrap append
  
          if (element.getAttribute('data-step') !== null) {
            element.style.overflow = 'hidden';
            element.style.width = '1px';
            element.style.height = '1px';
            var titleCont = element.querySelector('.bottom-sheet__top');
            var title = titleCont.querySelector('.title');
            var btn = document.createElement('button');
            btn.classList.add('btn-select-bt-prev-btn');
            titleCont.insertBefore(btn, title);
          }
  
          var $bottomSheet = $element.find('[data-element="bottomSheet"]');
  
          if (!$bottomSheet.is(':visible')) {
            $bottomSheet.css({
              bottom: $(window).height() * -1
            });
          } else {
            $bottomSheet.css({
              bottom: $bottomSheet.outerHeight(true) * -1
            });
          }
        }

        $('.select2').remove();
      }); // open event

      if (!$(document).find('.dim').is(':visible')) {
        $('[data-element="select__button"]').off('click').on('click', function (e) {
          var $this = $(e.currentTarget);
          var $selectWrap = $this.parents('[data-element="select"]');
          var $select = $selectWrap.find('[data-element="select__select"]');

          if (!$select.is(':disabled')) {
            _this5.buildOption($selectWrap[0]);

            open($(e.currentTarget));
          } else {
            return false;
          }
        });
      } else {
        return false;
      } // 2중 select 박스 이상일 경우 최초 셀렉트 옵션을 제외하고 뒤로 가기 버튼 이벤트


      $('[data-element="select"]').off('click').on('click', '.btn-select-bt-prev-btn', function (e) {
        var $this = $(e.currentTarget);
        var $selectWrap = $this.parents('[data-element="select"]');
        var currentSelect = $this.parents('[data-target-index]');
        var dataIndex = Number(currentSelect.attr('data-target-index')) - 1;
        var leftValue = dataIndex * window.innerWidth;
        $selectWrap.prop('currentNum', dataIndex);
        $selectWrap.find('[data-element="selectbox-wrap"]').css({
          transition: 'margin-left .4s',
          'margin-left': -leftValue
        });
      }); // close event

      $('[data-element="select"]').on('click', '[data-element="select-wrap__options"] button, [data-element="select__button-close"]', function (e) {
        var $this = $(e.currentTarget);
        var $selectWrap = $this.parents('[data-element="select"]');
        var $selButton = $selectWrap.find('[data-element="select__button"]');
        var currentSelect = $this.parents('[data-target-index]');
        var dataIndex = Number(currentSelect.attr('data-target-index'));
        var selectDom = $selectWrap.find('[data-element="select__select"]')[dataIndex];
        var $selOption = $(selectDom).find('option');
        var $selOptionBtn = currentSelect.find('.select-wrap__option-item');
        var optionCheck = e.currentTarget.classList.contains('select-wrap__option-item');

        if (optionCheck) {
          var idx = 0;

          if ($selOption.length !== $selOptionBtn.length) {
            idx = $this.index() + 1;
          } else {
            idx = $this.index();
          }

          if ($(e.currentTarget).hasClass('select-wrap__option-item')) {
            $selOption.removeClass('on').removeAttr('selected');
            $selOptionBtn.removeClass('on');
            $selOption.prop('selected', false);
            $selButton.addClass('active');
            $selOptionBtn.eq($this.index()).addClass('on');
            $selOption.eq(idx).prop('selected', true).attr('selected', true);
            var aimTarget = $(e.target).parents('[data-target-index]');
            var currentIndex = Number(aimTarget.attr('data-target-index'));
            var aimIndex = currentIndex + 1;
            $selectWrap.prop('currentNum', aimIndex);
            var nextSelect = $selectWrap.find("[data-target-index=\"".concat(aimIndex, "\"]"));

            if (nextSelect.length > 0) {
              var leftValue = aimIndex * window.innerWidth;
              $selectWrap.find('[data-element="selectbox-wrap"]').css({
                transition: 'margin-left .4s',
                'margin-left': -leftValue
              });
            } else {
              close($this);

              _this5.clearOption($selectWrap[0]);
            }

            selectDom.selectedIndex = idx;
            $(selectDom).trigger('change', selectDom.value);
            var activeTarget = $selectWrap.attr('data-select-target');
            var selectTarget;

            if (activeTarget === undefined) {
              var _$selectWrap$find = $selectWrap.find('[data-element="select__select"]');

              var _$selectWrap$find2 = _slicedToArray(_$selectWrap$find, 1);

              selectTarget = _$selectWrap$find2[0];
            } else if (Number.isNaN(activeTarget)) {
              // 선택자일 경우
              var _$selectWrap$find3 = $selectWrap.find(activeTarget);

              var _$selectWrap$find4 = _slicedToArray(_$selectWrap$find3, 1);

              selectTarget = _$selectWrap$find4[0];
            } else {
              // 인덱스일 경우
              selectTarget = $selectWrap.find('[data-element="select__select"]')[Number(activeTarget)];
            }

            $selButton.text(selectTarget.querySelectorAll('option')[selectTarget.selectedIndex].textContent);
          }
        } else {
          close($this);

          _this5.clearOption($selectWrap[0]);
        }
      });
    },
    reset: function reset(el) {
      var $element = $(el).closest('[data-element="select"]');
      var $select = $element.find('[data-element="select__select"]');
      $select.each(function (i, dom) {
        $(dom).removeAttr('selected');
        var $selOption = $(dom).find('option');
        $selOption.removeAttr('selected');
        $selOption.eq(0).prop('selected', true).attr('selected', true);
      });
      $selectButton.text($select.find('option')[0].textContent).removeClass('active');
    },
    destroy: function destroy() {
      var $el = $('[data-element="select"]');
      customSelect.init('[data-element="select"] [data-element="select__select"]');
      setTimeout(function () {
        $el.find('.select-wrap__button').remove();
        $el.find('.bottom-sheet').remove();
      });
    }
  };
}();

var setBottom = function () {
  var $content = $('.content');

  function set(el) {
    var $el = $(el);
    var space = $el.data('space') || 20;
    $content.css({
      paddingBottom: $el.height() + space
    });
    $el.css({
      position: 'absolute',
      bottom: space,
      left: 0
    });

    if ($el.find('[data-element]')) {
      var elem = $el.find('[data-element]');

      if (elem.data('element') === 'toggle') {
        elem.on('afterChange', function (plugin, anghor, panel) {
          var height = elem.height();
          $content.css({
            paddingBottom: height + space
          });
        });
      }
    }
  }

  function remove(el) {
    var $el = $(el);
    $el.removeAttr('style');
    $content.removeAttr('style');
  }

  return {
    init: function init() {
      $('[data-element="bottomContent"]').each(function (i, el) {
        set(el);
      });
    },
    destroy: function destroy() {
      $('[data-element="bottomContent"]').each(function (i, el) {
        remove(el);
      });
    }
  };
}();

var anchorMove = function () {
  var options = {
    wrap: '[data-anchor]',
    item: '[data-anchor-list]'
  };

  var scroller = function scroller(list) {
    var width = 0;
    list.find('a').each(function (i, el) {
      var w = $(el).outerWidth(true);
      width += Math.ceil(w);
    });

    if (width < $(window).width()) {
      list.addClass('flex');
    } else {
      return width;
    }
  };

  return {
    init: function init(wrap) {
      var $wrap = $(wrap);
      var $list = $wrap.find(options.item);
      var settings = [];
      var scrollWidth = scroller($list);
      var activeAnchor = '';
      var positionY = 0;
      $list.width(scrollWidth);
      setTimeout(function () {
        $list.find('a').each(function (i, anchor) {
          var $anchor = $(anchor);
          var $target = $($anchor.attr('href'));
          var $offsetY = $target.offset().top;
          var $offsetX = $anchor.offset().left;
          var set = {
            anchor: $anchor,
            target: $target,
            offsetY: $offsetY - $list.height(),
            offsetX: Math.round($offsetX)
          };
          settings.push(set);
        });
      }, 100);
      $list.on('click', 'a', function (e) {
        e.preventDefault();
        var target = $(e.target);

        if (e.target.tagName !== 'A') {
          target = e.target.closest('a');
        }

        var destination = $(target).attr('href');
        $('html, body').stop().animate({
          scrollTop: $(destination).offset().top - $list.outerHeight(true)
        }, function(){ // when scrolling stops
          $(target).trigger('changeAnchor')
        });
      });
      $(window).on('scroll', function () {
        positionY = window.scrollY || window.pageYOffset;
        settings.forEach(function (i) {
          if (positionY >= i.offsetY - 50) {
            i.anchor.addClass('is-active').siblings('a').removeClass('is-active');
            activeAnchor = i.anchor;
            $list.trigger('change', i);
          }
        });
      });
      $list.on('change', function (event, item) {
        var scrollTo = item.offsetX;
        $list.closest('[data-sticky]').stop().animate({
          scrollLeft: Math.round(scrollTo)
        }, 300);
      });
    }
  };
}();

// var wideScroll = function () {
//   var width = 0;
//   var total = 0;

//   var widthCheck = function widthCheck(element) {
//     element.find('.wideScroll-item').each(function (i, elem) {
//       var w = $(elem).outerWidth(true);
//       width += w;
//       total = width;
//       return total;
//     });
//   };

//   return {
//     init: function init(el) {
//       $(el).each(function (i, element) {
//         var $element = $(element);
//         var $list = $(element).find('.wideScroll-list');
//         var elPr = Number($list.css('padding-right').replace('px', ''));
//         widthCheck($element);
//         $list.css({
//           width: Math.ceil(total + elPr)
//         });
//         width = 0;
//       });
//     }
//   };
// }();

var dragDirection = function () {
  var defaults = {
    wrap: '[data-drag-wrap]',
    ground: '[data-drag-ground]'
  };

  function afterChange(direction) {
    defaults.$wrap.trigger('afterChange', direction);
  }

  return {
    init: function init(ground) {
      var plugin = this;
      var drag = $(defaults.wrap);
      defaults.$wrap = $(defaults.wrap);
      plugin.event(drag);
    },
    event: function event(ground) {
      var plugin = this;
      var direction = '';
      var pointX = 0;
      var pointY = 0;
      ground.on('touchstart', defaults.ground, function (evt) {
        var touches = evt.touches[0];
        pointX = touches.pageX;
        pointY = touches.pageY;
      });
      ground.on('touchend', defaults.ground, function (evt) {
        var touches = evt.changedTouches[0];

        if (pointX - touches.pageX >= 100 && Math.abs(pointY - touches.pageY) < 100) {
          direction = 'left';
        } else if (pointX - touches.pageX <= 100 && Math.abs(pointY - touches.pageY) < 100) {
          direction = 'right';
        } else {
          direction = 'nothing';
        }

        afterChange(direction);
      });
    }
  };
}();

var seatMap = function () {
  var map = $('[data-seat-map]');
  var column = map.find('.column');
  return function () {
    column.each(function (idx, el) {
      $(el).find('[data-seat]').each(function (i, child) {
        var num = $(el).siblings('.column--numbers').find('[data-seat="row"]').eq(i).text();

        if ($(child).data('seat') === 'name') {
          var seat = $(el).data('column'); // const text = $(child).data('seatText');

          $(child).attr('aria-label', "".concat(seat).concat(num));
        }
      });
    });
  };
}();

// dateLayer. flightLayer, 승객인원 퀵부킹 레이어 임의처리
var $btnPickerOpen = $('.date-layer-button');
var $dateLayer = $('.date-layer');
var $btnFlightOpen = $('.flight-button');
var $flightLayer = $('.flight-layer');
var $btnCustomerOpen = $('.btn-customer');
var $customerLayer = $('.customer-layer');

var dateLayer = function () {
  $btnPickerOpen.on('click', function () {
    $dateLayer.show();
    $flightLayer.hide();
    $customerLayer.hide();
  });
  $dateLayer.find('.layer-close').on('click', function () { 
    $dateLayer.hide();
    removeUnderLine ()
  });
}(); 
var flightLayer = function () {
  $btnFlightOpen.on('click', function () {
    $flightLayer.show();
    $dateLayer.hide();
    $customerLayer.hide();
  });
  $flightLayer.find('.layer-close').on('click', function () { 
    $flightLayer.hide();
    removeUnderLine ()
  });  
}(); 
var customerLayer = function () {
  $btnCustomerOpen.on('click', function () {
    $customerLayer.show();
    $flightLayer.hide();
    $dateLayer.hide();
  });
  $customerLayer.find('.layer-close').on('click', function () { 
    $customerLayer.hide();
    removeUnderLine ()
  });  
}();

function removeUnderLine () {
  $('.main-ticketing, .ticketing').find('.start, .target, .btn-date, .btn-passengers').removeClass('on')
} 

var uiGnb = function () {
  return function (device) {
    if (!(device == 'pc' || device == 'mobile'))
    {
      console.log('GNB : 앱');
    }
    else
    {
      console.log('GNB : PC 모바일')
      var el = '[data-element="gnbToggle"]';
      var $btnOpen = $(el).find('.gnb__button');
      var $gnbWrap = $(el).closest('.header__inner').find('.gnb');
      var $btnClose = $gnbWrap.find('.gnb-close');
  
      function closeOption() {
        $('html').removeClass('active-gnb');
      }
  
      var gnbClose; // GNB 포커스에서 나갔을 경우 GNB 닫힘 처리
  
      function focusHandler(e) {
        var pDom = $(e.target).hasClass('gnb') ? $(e.target) : $(e.target).parents('.gnb');
        var gnbBtn = $(e.target).hasClass('gnb__button') ? $(e.target) : $(e.target).parents('.gnb__button');
  
        if (pDom.length === 0 && gnbBtn.length === 0) {
          gnbClose();
        }
      }
  
      function openOption() {
        $btnOpen.addClass('active');
  
        if ($('.before').is(':visible')) {
          sticky('.gnb-sticky1', true);
        } else {
          sticky('.gnb-sticky2', true);
        }
      }
  
      gnbClose = function gnbClose() {
        document.body.removeEventListener('focus', focusHandler, true);
        window.mobileGnbOpen = false;
  
        if (device === 'mobile') {
          $gnbWrap.stop().animate({
            right: $(window).width() * -1
          }, 300, function () {
            closeOption();
            $gnbWrap.css('display', 'none'); // .removeAttr('tabindex');
          });
        } else {
          $gnbWrap.stop().slideUp(300);
          closeOption();
        }
  
        $('body').off('click.pcgnb');
        $btnOpen.removeClass('active');
        console.log('GNB CLOSE');
      };
  
      function gnbOpen() {
        document.body.addEventListener('focus', focusHandler, true);
        var open = false;
        $('html').addClass('active-gnb');
  
        if (device === 'mobile') {
          $gnbWrap.css('display', 'block'); // .attr('tabindex', 0);
  
          $gnbWrap.stop().animate({
            right: 0
          }, 300, function () {
            openOption();
          });
          window.mobileGnbOpen = true;
        } else {
          openOption();
          $gnbWrap.stop().slideDown(300);
        }
  
        $gnbWrap.focus();
        $('body').on('click.pcgnb', function (evt) {
          if (window.innerWidth >= MOBILE_WIDTH) {
            var parentGnb = evt.target.classList.contains('gnb') ? $(evt.target) : $(evt.target).parents('.gnb');
            var parentTest = evt.target.classList.contains('gnb__button') === false && parentGnb.length === 0;
  
            if (evt.target.getAttribute('data-custom-toggle') === 'button' || parentTest) {
              gnbClose();
              open = false; // evt.stopPropagation();
            }
          }
        });
        $gnbWrap.on('scroll.GNBScroll', function (e) {
          var topSticker = $gnbWrap.find('.gnb__header-top');
  
          if (window.mobileGnbOpen === true) {
            if ($gnbWrap[0].scrollTop > 5) {
              if (topSticker.hasClass('header-fixed') === false) {
                topSticker.addClass('header-fixed');
              }
            } else if (topSticker.hasClass('header-fixed') === true) {
              topSticker.removeClass('header-fixed');
            }
          } else if (topSticker.hasClass('header-fixed') === true) {
            topSticker.removeClass('header-fixed');
          }
        });
        setTimeout(function () {
          open = true;
        }, 200);
        console.log('GNB OPEN');
        scrollDisable()
      }
  
      var ratioMobile = window.innerWidth > window.innerHeight ? PORTRAIT : PORTRAIT;
  
      if (device === 'mobile') {
        if (ratioMobile === window.ratioMobile) return;
        $('html').removeClass('active-gnb');
        $gnbWrap.css({
          right: $gnbWrap.outerWidth(true) * -1,
          top: 0
        });
        window.ratioMobile = ratioMobile;
        $btnOpen.removeClass('active');
      } else {
        $('html').removeClass('active-gnb');
        $gnbWrap.removeAttr('style');
        $gnbWrap.slideUp();
        $btnOpen.removeClass('active');
      }
  
      $btnOpen.off('click').on('click', function () {
        if ($btnOpen.hasClass('active')) {
          gnbClose();
        } else {
          gnbOpen();
        }
      });
      $btnClose.off('click').on('click', function () {
        gnbClose();
      });
    };
  }
}(); 

// 좌우 마우스 드롭 컴퍼넌트
var touchDrop = function touchDrop(el, scroller) {
  var currentX;
  var startX;
  var threshold;
  var clickable;
  var moveHandler;
  var scrollStartX;

  function registEvent(_el, bool) {
    if (bool) {
      _el.addEventListener('touchmove', moveHandler);

      _el.addEventListener('mousemove', moveHandler);

      document.body.addEventListener('touchend', moveHandler);
      document.body.addEventListener('mouseup', moveHandler);
      document.body.addEventListener('mouseleave', moveHandler);
    } else {
      _el.removeEventListener('touchmove', moveHandler);

      _el.removeEventListener('mousemove', moveHandler);

      document.body.removeEventListener('touchend', moveHandler);
      document.body.removeEventListener('mouseup', moveHandler);
      document.body.removeEventListener('mouseleave', moveHandler);
    }
  }

  moveHandler = function moveHandler(e) {
    switch (e.type) {
      case 'click':
        {
          if (scrollStartX === undefined) {
            var starter = el.querySelector(scroller).querySelectorAll('[data-element="tab__list"]')[0];
            if (starter != undefined)
            {
              scrollStartX = starter.offsetLeft;
            }
          }

          if (clickable === false) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
          } else {
            var item = e.target.getAttribute('data-element') === 'tab__list' ? e.target : $(e.target).parents('[data-element="tab__list"]');
            var dom = item[0];
            if (dom === undefined) return;
            var leftV = dom.offsetLeft - scrollStartX;
            el.querySelector(scroller).scrollLeft = leftV;
          }

          break;
        }

      case 'touchstart':
      case 'mousedown':
        {
          startX = e.touches === undefined ? e.clientX : e.touches[0].clientX;
          registEvent(el, true);
          clickable = true;
          threshold = 10;
          break;
        }

      case 'mousemove':
      case 'touchmove':
        {
          currentX = e.touches === undefined ? e.clientX : e.touches[0].clientX;
          var gap = currentX - startX;
          threshold -= Math.abs(gap);
          if (threshold < 0) clickable = false;
          startX = currentX;
          var leftVal = el.querySelector(scroller).scrollLeft - gap;
          el.querySelector(scroller).scrollLeft = leftVal;
          break;
        }

      case 'touchend':
      case 'mouseup':
      case 'mouseleave':
        {
          registEvent(el, false);
          break;
        }

      default:
        break;
    }
  };

  function init() {
    if (el.querySelector(scroller) === null) return;
    var option = el.getAttribute('data-options');
    var param = option === null ? null : JSON.parse(option);
    el.querySelector(scroller).removeEventListener('touchstart', moveHandler);
    el.querySelector(scroller).removeEventListener('mousedown', moveHandler);
    el.querySelector(scroller).removeEventListener('click', moveHandler, true);
    el.querySelector(scroller).addEventListener('touchstart', moveHandler);
    el.querySelector(scroller).addEventListener('mousedown', moveHandler);
    if (param === null || param.clickable !== false) el.querySelector(scroller).addEventListener('click', moveHandler, true);
  }

  init();
}; 

// 커스텀 이벤트
var CustomEvent = function () {
  // accordion
  (function () {
    var reserveAccordion = $('[data-element].list-reserve');
    reserveAccordion.on('afterChange', function (event, plugin, anchor) {
      uiCarousel.accordion(anchor);
    });
  })(); // toggle


  (function () {
    var toogleEvent = $('[data-element].toggle-wrap__item');
  })(); // linked Tab


  (function () {
    var tab = '[data-element="tab"]';
    var $tab = $(tab);
    var opt = $tab.data('options'); // tab callback

    $tab.on('afterChange', function (event, plugin, anchor) {
      var anchorIdx = Number($(anchor).attr('data-index'));
      var anchorId = $(anchor).attr('id');
      //wideScroll.init("#".concat(anchorId, " .wideScroll"));
      tooltip.init('[data-element="tooltip"]');
      var carouselDom = event.target.querySelector('[data-carousel]');

      // if (carouselDom) {
      //   uiCarousel.reset(carouselDom);
      // } 
      // uiCarousel.init('[data-carousel]');


      if (plugin.$element.hasClass('tab-sticky')) {
        switch (anchorIdx) {
          case 0:
            sticky('[data-sticky-tab1]', true);
            break;

          case 1:
            sticky('[data-sticky-tab2]', true);
            break;

          default:
            return false;
        }
      }

      var panel = $('[data-element="tab__panel"]')[anchorIdx];
      var savingItem = new Swiper('[data-carousel="savingItem"]', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 10,
        pagination: {
          el: '.carousel__pagination-number',
          type: 'fraction'
        }
      });
    });
    $tab.each(function (i, el) {
      touchDrop(el, '.tab__button-wrap');
    });

    if (opt === undefined) {
      return false;
    }

    if (opt.linkedTab) {
      $tab.on('afterChange', function (plugin, $anchor, $panel, linked) {
        var $subTab = linked.find(tab).is(':visible') ? linked.find(tab).data('plugin_tab') : null;

        if ($subTab) {
          $subTab.getWidth();
          $subTab.go(0, false);
        }
      });
    }
  })(); // booking header

  (function () {
    $('[data-toggle="bookingHeader"]').on('click', function (e) {
      var $elem = $(e.target);
      $elem.closest('.main--booking').addClass('expend');

      if ($('.main--booking').hasClass('expend')) {
        $(window).on('scroll', function (event) {
          $('.main--booking').removeClass('expend');
        });
        bookingTicket.update();
      }
    });
    $('.main--booking').on('onSticky', function (e) {
      // bookingTicket.update();
      var $current = $(e.currentTarget);
      var $stickyElem = $current.find('.booking-header');
      var $height = Math.round($stickyElem.height());
      $current.css({
        paddingTop: $height
      });
    });
    $('.main--booking').on('offSticky', function (e) {
      var $current = $(e.currentTarget);
      $current.removeAttr('style');
    });
  })(); 
  // loading map


  (function () {
    var $square = $('[data-element="square"]');

    if ($square.length) {
      var $wrap = $square.closest('[data-element="map"]');
      var $from = $wrap.find('[data-destination="from"]');
      var $to = $wrap.find('[data-destination="to"]');
      var destinationFrom = $from.offset();
      var destinationTo = $to.offset();
      var position = {
        startY: destinationFrom.top > destinationTo.top ? destinationTo.top + $to.outerHeight() : destinationFrom.top + $from.outerHeight(),
        startX: destinationFrom.left > destinationTo.left ? destinationTo.left + $to.outerWidth() / 2 : destinationFrom.left + $from.outerWidth() / 2,
        endY: destinationFrom.top > destinationTo.top ? destinationFrom.top : destinationTo.top,
        endX: destinationFrom.left > destinationTo.left ? destinationFrom.left + $from.outerWidth() / 2 : destinationTo.left + $to.outerWidth() / 2
      };
      $square.css({
        top: position.startY,
        left: position.startX,
        height: position.endY - position.startY,
        width: position.endX - position.startX
      });
    }
  })();

  (function () {
    $('[data-select-letter]').on('click', '.item', function (e) {
      e.preventDefault();
      var target = $(e.target).attr('href');
      var $target = $(target);
      $target.closest('.modal ').animate({
        scrollTop: $target.offset().top - 60
      }, 200);
    });
  })();

  (function () {
    $('#tabList').on('afterChange', function (e) {
      sticky('.sticky-wrap');
      $(window).trigger('scroll');
    });
  })();

  (function () {
    var $header = $('#header');
    var $breadcrumb = $('#breadcrumb');
    var searchToggle = $header.find('[data-element="toggle"]');
    var breadcrumbToggle = $breadcrumb.find('[data-element="toggle"]'); // const breadcrumbPlugin = breadcrumbToggle.data('plugin_toggle');

    searchToggle.on('afterChange', function () {
      if (searchToggle.data('plugin_toggle')) {
        // breadcrumbToggle.data('plugin_toggle').close();
        if (searchToggle.data('plugin_toggle').flag) {
          $header.addClass('active-header');
        } else {
          $header.removeClass('active-header');
        }
      }
    });
    breadcrumbToggle.on('afterChange', function () {
      if (breadcrumbToggle.data('plugin_toggle')) {
        // searchToggle.data('plugin_toggle').close();
        if (breadcrumbToggle.data('plugin_toggle').flag) {
          $breadcrumb.addClass('active-breadcrumb');
        } else {
          $breadcrumb.removeClass('active-breadcrumb');
        }
      }
    });
  })();

  (function () {
    $('body').on('changeDevice', function (event, device) {
      uiGnb(device);
      bottomSheet.init('[data-element="bottomSheet"]', device);
    });
  })();

  (function () {
    $('.sticky-word__close').on('click', function (e) {
      var target = $(e.target);
      target.closest('.sticky-word-wrap').hide();
    });
  })(); // responsive image


  (function () {
    var src = $('[data-src]');
    src.each(function (i, el) {
      var $el = $(el);
      var imgPc = $el.data('src');
      var imgMobile = $el.attr('src');
      $el.data('src', {
        pc: imgPc,
        mobile: imgMobile
      });
    });
    $('body').on('changeDevice', function (e, device) {
      src.each(function (i, el) {
        var $el = $(el);

        if ($el.attr('src') !== $el.data('src')[device]) {
          $el.attr('src', $el.data('src')[device]);
        }
      });
    });
  })(); 
  
  // hide-to-scroll
  (function () {
    var hide = $('[hide-to-scroll]');
    var hideBottom = $('[hide-to-bottom]');

    if (window.innerWidth < MOBILE_WIDTH) {
      if (hideBottom.length > 0) {
        $(window).on('scroll', function () {
          var hideElemBottom = JSON.parse(hideBottom.attr('hide-to-bottom'));
          hideElemBottom.forEach(function (el) {
            var $el = $(el);
            $el.hide().fadeIn(300);
          });
        });
      }
    }

    if (hide.length > 0) {
      $(window).on('scroll', function () {
        var hideElem = JSON.parse(hide.attr('hide-to-scroll'));
        hideElem.forEach(function (el) {
          var $el = $(el);
          $el.hide().fadeIn(300);
        });
      });
    }
  })();

  (function () {
    if ($('.wrap--main').length) {
      $(window).on('scroll', function () {
        var $header = $('#header');
        var $boarding = $('.boarding');

        if ((window.scrollY || window.pageYOffset) >= $header.offset().top) {
          $('#header').addClass('sticky');
          $('.quick-menu').removeClass('hide');
        } else {
          $('#header').removeClass('sticky');
          $('.quick-menu').addClass('hide');
        }

        if ($boarding.length) {
          if ((window.scrollY || window.pageYOffset) >= $boarding.offset().top) {
            $('#header').addClass('active-boarding');
          } else {
            $('#header').removeClass('active-boarding');
          }
        }

        if ((window.scrollY || window.pageYOffset) === 0) {
          $('#header').removeClass('sticky');
          $('.quick-menu').addClass('hide');
          $('#header').removeClass('active-boarding');
        }

        if ((window.scrollY || window.pageYOffset) >= $('.quick-sticky-controller').next().offset().top - 50) {
          $('html').addClass('sticky-booking');
        } else {
          $('html').removeClass('sticky-booking sticky-booking-active');
        }
        
      });
      setTimeout(function () {
        $('.quick-menu').addClass('hide');
      }, 2000);
    }
  })();

  (function () {
    var bookingToggle = $('.booking-header__toggle[data-element="toggle"]');
    bookingToggle.on('afterChange', function (evt, plugin) {
      if (plugin.flag) {
        bookingToggle.closest('.booking-header').addClass('expend');
      } else {
        bookingToggle.closest('.booking-header').removeClass('expend');
      }
    });
  })();
}();

var responsiveJs = function () {
  $('body').on('changeDevice', function (e, dev) {
    if (dev === 'mobile') {
      // mobile start
      setBottom.init();
      uiSelect.init('[data-element="select"]');
      datepicker.responsive(dev); // $('.scrollbar-inner, .select2-results__options').scrollbar('destroy');
    } else {
      // pc start
      setBottom.destroy();
      uiSelect.destroy();
      datepicker.responsive(dev); // $('.scrollbar-inner, .select2-results__options').scrollbar();
    }
  });
}(); 
// 스티키 하단 예상 결제 금액 스크롤링 바디 영향 안주도록 처리

// 셀렉트 동적 생성후 실행
function afterAppendSelect () {
  var defaultDevice = '';
  var widthSize = $(window).width()
  if (widthSize > 1080)
  {
    defaultDevice = 'desktop'
  }
  else
  {
    defaultDevice = 'mobile'
  }
  if (defaultDevice === 'mobile') {
    console.log('afterAppendSelect-device=', defaultDevice)
    // mobile start
    setBottom.init();
    uiSelect.init('[data-element="select"]');
  } else {
    console.log('afterAppendSelect-device=', defaultDevice)
    // pc start
    uiSelect.init('[data-element="select"]');
    uiSelect.destroy();
  }
}

var bottomBookingDimedSet = function bottomBookingDimedSet() {
  var summary = $('.booking-sticky');
  var activeAnchor = null;
  summary.on('afterChange', function (plugin, $anchor, $panel) {
    if ($anchor !== undefined) activeAnchor = $anchor.$anchor;

    if ($panel === LANDSCAPE) {
      allScrollPrevent(false);
    } else if ($panel === PORTRAIT) {
      if (activeAnchor !== null) {
        allScrollPrevent(activeAnchor.hasClass('is-active'));
      }
    } else if ($panel.hasClass('is-active')) {
      window.bookingActive = true;
      allScrollPrevent(!window.stickyBanMode);
    } else {
      window.bookingActive = false;
      allScrollPrevent(false);
    }
  });
}; 
// modal 플러그 인 위에서 세부 작업

$(document).ready(function () {
  // uiGnb();
  customUiInit ()
  seatMap();
  bottomBookingDimedSet(); // sticky 활성 비활성은 모바일에서만 작동하도록 조치

  var deviceObj = getMobileDevice(navigator.userAgent);

  if (deviceObj.isMobile === true && deviceObj.isMac === false) {
    inputControlForSticky();
  } 
  
  // 좋아요 토글버튼
  $('.button-favorites').on('click', function (e) {
    $(e.currentTarget).toggleClass('on');
  });

  $(".boarding--checkbox").click(function(e){
    $(this).toggleClass("checked");           
    e.preventDefault();
  });	   

  // 예약 타이머 공지
  ticketingTimerNotice()

  // 퀵부킹 프로모션 코드
  $('.main-ticketing .promotion-inp .inp-txt, .ticketing .promotion-inp .inp-txt').on('keyup', function () {
    var valLeng = $(this).val().length;
    if (valLeng > 0)
    {
      $(this).next().show();
    }
    else
    {
      $(this).next().hide();
    }
    console.log('value-length', valLeng)
  });  
  $('.main-ticketing .promotion-inp .input__remove-button, .ticketing .promotion .input__remove-button').on('click', function () {
    $(this).hide().prev().val('');
  });  
});

// 예약 타이머 공지
var ticketingTimerNotice = function () {
  var defMsg = $('.default-message')
  if (defMsg.length > 0)
  {
    $('.default-message__close').on('click', function () {
      defMsg.removeClass('on')
    })
  }
}

function customUiInit () {
  //customSelect.init('.select .select__selection');
  formControl.init();
  modalUI('[data-element="modal_anchor"]');
  uiCarousel.init();
  if ($('[data-picker]').length > 0) {
    datepicker.init('[data-picker]', '');
  }
  slider.init('.slider .slider__item');
  toast.init();
  setBottom.init();
  inputToggle.init('[data-element="inputToggle"]');
  uiSelect.init('[data-element="select"]');
  anchorMove.init('[data-anchor]');
  sticky('[data-sticky]');
  defaultMsg.init('[data-default-message]');
  topCustomBanner.init('.top-custom-banner');
  if ($('[data-element="tooltip"]').length > 0)
  {
    tooltip.init('[data-element="tooltip"]');
  }
  //wideScroll.init('.wideScroll');
  buttonTextToggle.init('[data-text-toggle]'); // 수정
  customToggle.initEvent();
  responsive();
}
    
// 메인 레이아웃 회원가입, 로그인 버튼 영역 스티키
$('.gnb').on('scroll', function () {
  var scrollTopVal = $(this).scrollTop()
  var mainLayoutLogin = $('.sticky-wrap')  /* 이은권 수정 (11/1)*/
  var mainLayoutLoginTop = mainLayoutLogin.position().top
  console.log('gnb scrolling')
  var gnbH = $('.gnb__header-top').height()
  if (mainLayoutLoginTop < 0)
  {
    mainLayoutLogin.children().addClass('is-sticky')
  }
  else
  {
    mainLayoutLogin.children().removeClass('is-sticky')
  }
  if (scrollTopVal > gnbH)
  {
    $('.after-login .gnb-sticky2').addClass('is-sticky')
  }
  else
  {
    $('.after-login .gnb-sticky2').removeClass('is-sticky')
  }
});

/*셀렉트 옵션값 선택하면 조회버튼 활성화*/ 
$('.select-special-cargo').on('change', function () {
  $('.btn-special-cargo').removeClass('button--disabled').addClass('button--active')
})
$('.btn-special-cargo').on('click', function () {
  var chkActive = $(this).hasClass('button--active')
  var curOpt = $('.select-special-cargo').val()
  if (chkActive)
  {
    window.open('NF_5_31.html?option' + curOpt + '', '_blank')
  }
})

//jjpay 팝업
function openJjpayPop (jjW, jjH) {
  if (jjW == '' || jjW == undefined)
  {
    var jjW = 400;
  }
  else
  {
    var jjW = jjW;
  }
  if (jjH == '' || jjH == undefined)
  {
    var jjH = 640;
  }
  else
  {
    var jjH = jjH + 10;
  }
  var pathname = location.pathname;
  pathname = pathname.split('/JJPAY/');
  pathname = pathname[1].split('.html');
  var url = pathname[0] + '_pop.html';
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  console.log(pathname, url)
  if ($('body').hasClass('isPc'))
  {
    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=no,top=" + (windowHeight/2 - jjH/2) + ",left=" + (windowWidth/2 - jjW/2) + ",width=" + jjW + ",height=" + jjH);
  }
  else
  {
    window.open(url, "_blank");
  }
}

// 모달 모바일 달력 스크롤 공통적용
$('.modal-content').on('scroll', function () {
  if ($('body').hasClass('isMobile'))
  {
    var layerHeaderH = $('.modal-header').innerHeight();
    //var bookingTripH = $('.booking-trip').height();
    var scrollLength = $(this).scrollTop();
    if (scrollLength > layerHeaderH)
    {
      $('.picker').addClass('fixed-days')
      $('.flatpickr-weekdays').css('top', layerHeaderH + 'px');
      console.log('scrolled', layerHeaderH);
    }
    else
    {
      $('.picker').removeClass('fixed-days')
      $('.flatpickr-weekdays').css('top', 'auto');
    }
  }
})

// 팝업 당고 해당인풋텍스트 활성
function labelActAfterModalClose (labelInpBox) {
  var labelInpBox = labelInpBox;
  $('.' + labelInpBox).addClass('label-active');
}

// 데이트피커 표시 날짜 변경
function datePickerDefaultDateSet (selectorId, defDate) {
	$("#" + selectorId).flatpickr().destroy();
	$("#" + selectorId).attr('data-default-date', defDate);
	datepicker.initPointDatepicker('[data-picker]');
}

// 퀵부킹 모바일 달력 스크롤
$('.date-layer .layer-content').on('scroll', function () {
  if ($('body').hasClass('isMobile'))
  {
    var layerHeaderH = $('.layer-header').innerHeight();
    var bookingTripH = $('.booking-trip').height();
    var scrollLength = $(this).scrollTop();
    if (scrollLength > layerHeaderH + bookingTripH)
    {
      $('.date-layer').addClass('fixed-days')
      $('.flatpickr-weekdays').css('top', layerHeaderH + 'px');
     // $('.date-layer .layer-content').css('height', 'calc(100vh - 60px)');
     // $('.date-layer .layer-content').css('padding-bottom', '60px');
      console.log('scrolled', layerHeaderH);
    }
    else
    {
      $('.date-layer').removeClass('fixed-days')
      $('.flatpickr-weekdays').css('top', 'auto');
    }
  }
})

// 전체메뉴
function scrollDisable(){
  var bodyScTop = $('.active-gnb body').scrollTop();
  $('body').on('scroll', function () {
    var thisScTop = $(this).scrollTop();
    $(this).scrollTop(bodyScTop);
    $('html').scrollTop(bodyScTop);
    console.log('scrollDisable', bodyScTop, thisScTop)
  });
}

// 퀵부킹 모바일 레이어 활성화에 뒷 스크롤 방지
var mobileQuickBackScrollDisable = function () {
  if ($('body').hasClass('isMobile'))
  {
    $('.quick-booking').on('addClassActive', function () {
      $('html').addClass('over-hidden');
    });
  }
  $('.quick-booking').on('removeClassActive', function () {
    $('html').removeClass('over-hidden');
  });
}();


// 앱설치안내 닫기
$('.btn-close-app').on('click', function () {
  $('.app-instollation').hide();
});

// 두 날짜 사이 월 차이 계산
function getDifMonth(fromDate, toDate) {
  var dif = toDate - fromDate;
  var cDay = 24 * 60 * 60 * 1000; // 시 * 분 * 초 * 밀리세컨
  var cMonth = cDay * 30;
  return parseInt(dif / cMonth);
}

// 모바일화면에서 datepicker를 miDate부터 maxDate까지 표시하도록 변경
function initRedrawShowMonthsFromMinDateToMaxDate() {
  $('body').on('changeDevice', function (e, dev) {
    if (dev === 'mobile') {
      // mobile start
      setBottom.init();
      uiSelect.init('[data-element="select"]');
      datepicker.redrawShowMonthsFromMinDateToMaxDate(dev);
    } else {
      // pc start
      setBottom.destroy();
      uiSelect.destroy();
      datepicker.redrawShowMonthsFromMinDateToMaxDate(dev);
    }
  });
}



//리플레시배너 페이지네이션 숨기기
$(function(){
  var length = $('.reflash-pay-banner .swiper-slide').length;     
  //alert(length);
  if (length == 1) {
     $(this).find('.carousel__pagination').hide();
     $(this).find('.carousel__button-prev').hide();
     $(this).find('.carousel__button-next').hide();
  }
});

// 20211104 바닥스크롤막기 
// $('.btn-date').on('click', function () {
//   $('.isMobile').css('overflow', 'hidden').css('touch-action','none').css('height','100%');  
// });


$(function(){
  var length = $('.tab .tab__button').length;     
 // alert(length);
  if (length <= 4) {
     $(this).find('.tab__scroll-right').hide();
     $(this).find('.tab__scroll-left').hide();
  }
});




// Jquery Window Error Start
$(window).on("error",function(event) {
	let originalEvent = event.originalEvent;
	
	let errorMsg	= originalEvent.message;
	let errorStack	= "-";
	if(originalEvent.error) {
		errorStack = originalEvent.error.stack;
	}
	let message = "";
	if (errorMsg) {
		message = [
			'Message: '	+ errorMsg					+ '\n',
			'URL: '		+ originalEvent.filename	+ '\n',
			'Line: '	+ originalEvent.lineno		+ '\n',
			'Column: '	+ originalEvent.colno		+ '\n',
			'Browser: ' + getBrowserVersion()		+ '\n',
			'Error: '	+ errorStack
		].join(' - ');
	} else {
		message = "Unsupported browser."
	}
	$.ajax({
		url: '/api/common/biz/scriptErroLog.json',
		type: 'POST',
		beforeSend: function (request)
        {
            request.setRequestHeader("ecode", "FRTUSV001");
			request.setRequestHeader("emessage", message.replace(/\n/g,""));
        },
		data	: {
			message : message
		},    
		success: function (data) {
		}
	});
	return false;	
});

function cfn_ticlogEvent() {
	//ex --> open tic			: cfn_ticlogEvent("PointRefund", "PnrCancelConfirm", "PageOpen", null);
	//ex --> button click tic	: cfn_ticlogEvent("PointRefund", "PnrCancelConfirm", "click", null);
	//ex --> radio click tic	: cfn_ticlogEvent("PointRefund", "PnrCancelConfirm", "check", "{index}");
	var dataObject	= {};
	var arg0		= arguments[0];
	var arg1		= arguments[1];
	var arg2		= arguments[2];
	var arg3		= arguments[3];
	
	dataObject = {
		EVENTNAME	: arg0,
		PAGENAME	: arg1,
		EVENTTYPE	: arg2,
		EVENTVALUE  : arg3,
		BROWSER		: getBrowserVersion(),
		REFERER		: document.referrer
	};
	
	$.ajax({
		url: '/api/common/biz/ticHistorySave.json',
		type: 'POST',
		data	: {
			message : dataObject
		},    
		success: function (data) {
		}
	});
}

function getBrowserVersion() {
	var version = '';
	var agt = navigator.userAgent.toLowerCase();
	
	if (agt.indexOf("msie") != -1 || agt.indexOf("trident") != -1) version = 'IE';
	else if (agt.indexOf("iphone") != -1)      version = 'iPhone';
	else if (agt.indexOf("ipod") != -1)        version = 'iPod';
	else if (agt.indexOf("ipad") != -1)        version = 'iPad';
	else if (agt.indexOf("firefox") != -1)     version = 'Firefox';
	else if (agt.indexOf("chrome") != -1)      version = 'Chrome';
	else if (agt.indexOf("safari") != -1)      version = 'Safari';
	else if (agt.indexOf("android") != -1)     version = 'Android';
	else if (agt.indexOf("opera") != -1)       version = 'Opera';
	else if (agt.indexOf("staroffice") != -1)  version = 'Star Office';
	else if (agt.indexOf("webtv") != -1)       version = 'WebTV';
	else if (agt.indexOf("beonex") != -1)      version = 'Beonex';
	else if (agt.indexOf("chimera") != -1)     version = 'Chimera';
	else if (agt.indexOf("netpositive") != -1) version = 'NetPositive';
	else if (agt.indexOf("phoenix") != -1)     version = 'Phoenix';
	else if (agt.indexOf("skipstone") != -1)   version = 'SkipStone';
	else if (agt.indexOf("netscape") != -1)    version = 'Netscape';
	else if (agt.indexOf("mozilla/5.0") != -1) version = 'Mozilla';
	
	if (version == 'IE') {
		var rv = -1; // Return value assumes failure.
		if (navigator.appName == 'Microsoft Internet Explorer') {
	        var ua = navigator.userAgent;
	        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	        if (re.exec(ua) != null) {
	        	rv = parseFloat(RegExp.$1);
	        }
	    }
	    if (rv != -1) {
	  		if (rv < 8) {
				var trident = navigator.userAgent.match(/Trident\/(\d.\d)/i);
				if (trident != null) {
					rv = trident[1]*1 + 4;
				}
			}
			version += rv;
	    }
	} else if (version == 'Android') {
		var ua = navigator.userAgent;
	  	var regex = /Android (.*);.*;\s*(.*)\sBuild/;
			var match = regex.exec(ua);

	 	if(match) {
		  	var ver = match[1];
		  	var dev_name = match[2];
	  		version += ver + " " + dev_name;
			}
	} else if (version == 'iPhone' || version == 'iPod' || version == 'iPad') {
		var res = navigator.userAgent.match(/; CPU.*OS (\d_\d)/);
		if(res) {
	        var strVer = res[res.length-1];
	        strVer = strVer.replace("_", ".");
	        version += strVer;
			}
	} else if (version == 'Mozilla') {	// IE11부터는 USER_AGENT에 MSIE가 없음
		if (agt.indexOf("like gecko") != -1) {
			var trident = navigator.userAgent.match(/Trident\/(\d.\d)/i);
			if (trident != null) {
			 	version = 'IE' + (trident[1]*1 + 4);
			}
		}
	}
	
	return version;
}

function getShortUrl(type, encData) {
	let absoulteUrl = '';
	
	if (type === 'booking') {
		absoulteUrl = '/ibe/booking/AvailSearch.do?availSearchData=';
	} else if (type === 'mypage') {
		absoulteUrl = '/ibe/mypage/viewOnOffReservationList.do?resvDetailData=';		
	}
	
	$.ajax({
		async: false,
		url: '../../ibe/booking/getShortUrl.json',
		type: 'post',
		beforeSend: function(request) {
            request.setRequestHeader('User-Id', JSON.parse(USER_INFO.get()).userId !== undefined ? JSON.parse(USER_INFO.get()).userId : '');
			request.setRequestHeader('User-Name', JSON.parse(USER_INFO.get()).name !== undefined ? encodeURIComponent(JSON.parse(USER_INFO.get()).name) : '');			
        },
		data: {
			type: type,
			longUrl : window.location.origin + '/' + I18N.language + absoulteUrl + encData,
			mbrId: JSON.parse(USER_INFO.get()).userId !== undefined ? JSON.parse(USER_INFO.get()).userId : 'SYSTEM'
		},
		success: function(data) {
			if (data.code === '0000') {
				APP_DATA.shortUrl = window.location.origin + '/' + I18N.language + '/share/' + type + '/' + data.data.shortUrl;
				
				$('.sns-share__link').val(APP_DATA.shortUrl);
				$('.sns-share__copy').attr('data-clipboard-text', APP_DATA.shortUrl);
			}
		},
		error: function(request, status, error) {
			$.JJAlert('code: ' + request.status + ' message: ' + request.responseText);
		}
	});
}