"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable no-lonely-if */

/*
  'no-plusplus': 0,
*/
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    module.exports = factory;
  } else {
    root = factory(root);
  }
})(void 0, function () {
  var COMMON = {};

  (function () {
    COMMON.uuid = function () {
      var uuid = 0;
      return function (prefix) {
        uuid += 1;
        var prefixName = '';

        if (prefix) {
          prefixName = prefix;
        } else {
          prefixName = '';
        }

        return prefixName + uuid;
      };
    }();

    COMMON.checkPrevId = function ($element, pluginName) {
      var piName = false;

      if ($element.attr('id').indexOf(pluginName) !== -1) {
        piName = false;
      } else {
        piName = true;
      }

      return piName;
    };

    COMMON.checkFocusibleElement = function ($element) {
      var tagName = $element[0].tagName.toLowerCase();
      var boolTagname = false;

      if (tagName === 'a' || tagName === 'button') {
        boolTagname = true;
      } else {
        boolTagname = false;
      }

      return boolTagname;
    };
  })(); 
  
  
  // toggle
  (function () {
    var pluginName = 'toggle';
    var defaults = {
      mode: 'static',
      event: 'click',
      speed: 300,
      easing: 'swing',
      anchorEl: '[data-element="toggle__anchor"]',
      panelEl: '[data-element="toggle__panel"]',
      onChangeBeforeText: null,
      onChangeAfterText: null,
      activeClassName: 'is-active',
      clickToClose: false,
      isOpened: false
    };

    function Plugin(element, options) {
      var plugin = this;
      plugin.element = element;
      plugin.name = pluginName;
      plugin.defaults = defaults;
      plugin.options = $.extend({}, plugin.defaults, options);
      plugin.flag = false;
      plugin.textFlag = false;
      plugin.idx = 0;
      plugin.init();
    }

    $.extend(Plugin.prototype, {
      init: function init() {
        var plugin = this;
        plugin.buildCache();
        plugin.bindEvents();

        if (plugin.options.isOpened) {
          plugin.open();
        } else {
          plugin.close();
        }
      },
      destroy: function destroy() {
        var plugin = this;
        plugin.flag = false;
        plugin.textFlag = false;
        plugin.unbindEvents().removeCache();
        plugin.$element.removeData("plugin_".concat(plugin.name));
      },
      buildCache: function buildCache() {
        var plugin = this;
        plugin.$element = $(plugin.element);
        plugin.$anchor = plugin.$element.find(plugin.options.anchorEl);
        plugin.$panel = plugin.$element.find(plugin.options.panelEl);
        plugin.options.isOpened = plugin.$anchor.data('open');

        if (!COMMON.checkFocusibleElement(plugin.$anchor)) {
          plugin.$anchor.attr({
            role: 'button',
            tabIndex: 0
          });
        }

        var elemId = '';

        if (plugin.$panel.attr('id')) {
          elemId = plugin.$panel.attr('id');
        } else {
          elemId = COMMON.uuid("".concat(plugin.name, "-"));
        }

        plugin.$anchor.attr('aria-controls', elemId);
        plugin.$panel.attr({
          id: elemId
        });

        if (plugin.options.onChangeAfterText !== null && plugin.options.onChangeBeforeText !== null) {
          plugin.textFlag = true;
        }
      },
      removeCache: function removeCache() {
        var plugin = this;
        plugin.$anchor.removeAttr('aria-expanded aria-controls tabindex role');
        plugin.$panel.removeAttr('aria-expanded style');

        if (!COMMON.checkPrevId(plugin.$panel, plugin.name)) {
          plugin.$panel.removeAttr('id');
        }
      },
      bindEvents: function bindEvents() {
        var _this = this;

        var plugin = this;

        var eventName = function eventName() {
          var events = plugin.options.event;
          var returnEvent;

          if (events === 'focusin') {
            returnEvent = "focusin.".concat(plugin.name, " mouseenter.").concat(plugin.name);
          } else if (events === 'click') {
            returnEvent = "click.".concat(plugin.name, " keydown.").concat(plugin.name);
          } else {
            return "".concat(events, ".").concat(plugin.name);
          }

          return returnEvent;
        };

        var event = eventName();
        plugin.$anchor.off(event).on(event, function (e) {
          e.stopPropagation();
          var key = e.witch || e.keyCode;

          if (e.type === 'click' || e.type === 'focusin' || key === 13 || key === 32) {
            plugin.idx = $(_this).data('index');
            plugin.toggle();
            e.preventDefault();
          }
        });
        plugin.$element.off("show.".concat(plugin.name)).on("show.".concat(plugin.name), function () {
          plugin.show();
        });
        plugin.$element.off("hide.".concat(plugin.name)).on("hide.".concat(plugin.name), function () {
          plugin.hide();
        });

        if (plugin.options.clickToClose) {
          $(document).on('click', function (e) {
            if (e.target !== plugin.$panel && $(e.target).closest(plugin.options.panelEl).length === 0) {
              plugin.close();
            }
          });
        }
      },
      unbindEvents: function unbindEvents() {
        var plugin = this;
        plugin.$anchor.off(".".concat(plugin.name));
        plugin.$panel.off(".".concat(plugin.name));
      },
      beforeChange: function beforeChange($anchor, $panel) {
        var plugin = this;
        plugin.$element.trigger('beforeChange', [plugin, $anchor, $panel]);
      },
      afterChange: function afterChange($anchor, $panel) {
        var plugin = this;
        plugin.$element.trigger('afterChange', [plugin, $anchor, $panel]);
      },
      toggle: function toggle() {
        var plugin = this;

        if (plugin.flag) {
          plugin.close();
        } else {
          plugin.open();
        }
      },
      open: function open() {
        var plugin = this;
        var option = plugin.options;
        plugin.flag = true;
        plugin.beforeChange(plugin.$anchor, plugin.$panel);

        if (plugin.textFlag) {
          plugin.$anchor.text(option.onChangeAfterText);
        }

        plugin.$anchor.addClass(option.activeClassName).attr('aria-expanded', true);

        if (option.parentClass) {
          plugin.$anchor.closest(option.parentClass).addClass(option.activeClassName);
        }

        if (option.mode === 'fade') {
          plugin.$panel.stop().fadeIn(option.speed, option.easing);
        } else if (option.mode === 'slide') {
          plugin.$panel.stop().slideDown(option.speed, option.easing);
          console.log(option.mode);
          // if (!plugin.$element.hasClass('breadcrumb__item')) {
          //   console.log($(this).parent().hasClass());
          //   var relativeTop = plugin.$panel.offset().top;
          //   var htmlScTop = $('html').scrollTop();
          //   var bodyScTop = $('body').scrollTop();
          //   if (!plugin.$panel.hasClass('booking-sticky__bottom'))
          //   {
          //     var mainTicketing = plugin.$element.parents('.main-ticketing');
          //     var ticketing = plugin.$element.parents('.ticketing');
          //     if ($('.modal').length > 0) {
          //       $('.modal-content').animate({
          //         scrollTop: 99999
          //       })
          //     } 
          //     if (mainTicketing.length > 0 || ticketing.length > 0 ) {
          //       console.log('ticketing')
          //       $('.layer-content').animate({
          //         scrollTop: 99999
          //       })
          //     }
          //   }
          // }
        } else if (option.mode === 'move scroll') {
          plugin.$panel.stop().slideDown(option.speed, option.easing);
          console.log('move scroll')
          if (plugin.$anchor.hasClass('is-active') && $('body').hasClass('isMobile'))
          {
            var ancTop = plugin.$panel.offset().top;
            var headerH = $('.header__inner').height();
            var ancH = plugin.$anchor.height();
            $('html').animate({
              scrollTop: ancTop - headerH - ancH
            })
            console.log('move scroll is-active', ancTop, headerH)
          }
        } else if (option.mode === 'modal move scroll') {
          plugin.$panel.stop().slideDown(option.speed, option.easing);
          console.log('modal move scroll')
          var ancTop = plugin.$panel.offset().top;
          $('.modal-content').animate({
            scrollTop: ancTop
          })
        }
        else {
          plugin.$panel.stop().show();
          plugin.afterChange(plugin.$anchor, plugin.$panel);
        }

        // setTimeout(function () {
        //   var panelDom = plugin.$panel[0];
        //   var rect = panelDom.getBoundingClientRect();
        //   var heightV = window.innerHeight;
        //   var area = rect.top + rect.height;

        //   if (area > heightV) {
        //     var current = window.scrollY + area - heightV;
        //     window.scrollTo(0, current);
        //   }
        // }, 300);
        plugin.afterChange(plugin.$anchor, plugin.$panel);
      },
      close: function close() {
        var plugin = this;
        var option = plugin.options;
        plugin.flag = false;
        plugin.beforeChange(plugin.$anchor, plugin.$panel);

        if (plugin.textFlag) {
          plugin.$anchor.text(option.onChangeBeforeText);
        }

        plugin.$anchor.removeClass(option.activeClassName).attr('aria-expanded', false);

        if (option.parentClass) {
          plugin.$anchor.closest(option.parentClass).removeClass(option.activeClassName);
        }

        if (option.mode === 'fade') {
          plugin.$panel.stop().fadeOut(option.speed, option.easing);
        } else if (option.mode === 'slide') {
          plugin.$panel.stop().slideUp(option.speed, option.easing);
        } else if (option.mode === 'move scroll') {
          plugin.$panel.stop().slideUp(option.speed, option.easing);
        } else {
          plugin.$panel.stop().hide();
        }

        plugin.afterChange(plugin.$anchor, plugin.$panel);
      }
    });

    $.fn[pluginName] = function init(options) {
      return this.each(function (i, elem) {
        //if (!$.data(elem, "plugin_".concat(pluginName))) {
          $.data(elem, "plugin_".concat(pluginName), new Plugin(elem, options || $(elem).data('options')));
        //}
      });
    };

    $(function () {
      $('[data-element="toggle"]').toggle();
    });
  })(); // tab


  (function () {
    var pluginName = 'tab';
    var defaults = {
      mode: 'static',
      event: 'click',
      speed: 300,
      easing: 'swing',
      list: '[data-element="tab__list"]',
      anchor: '[data-element="tab__anchor"]',
      panel: '[data-element="tab__panel"]',
      scroller: '[data-element="tab__scroll"]',
      scrollWrap: '[data-element="tab__scroll-wrap"]',
      direction: '[data-tab-direction]',
      offsets: [],
      activeClassName: 'is-active',
      disabledClassName: 'is-disabled',
      tabType: 'default',
      tabAlign: 'normal',
      bookingTab: false,
      autoScroll: false,
      isInitActive: true,
      initIndex: 0,
      linkedTab: false,
      activeTab: 0,
      firstScr: true
    };

    function Plugin(element, options) {
      var plugin = this;
      plugin.element = element;
      plugin.name = pluginName;
      plugin.defaults = defaults;
      plugin.options = $.extend({}, plugin.defaults, options);
      plugin.flag = false;
      plugin.initialized = false;
      plugin.idx = 0;
      plugin.init();
    }

    $.extend(Plugin.prototype, {
      init: function init() {
        var plugin = this;
        plugin.buildCache();
        plugin.bindEvents();

        if (plugin.options.isInitActive) {
          plugin.$anchor.eq(plugin.options.initIndex).trigger(plugin.options.event);
        }

        plugin.getWidth();
      },
      destroy: function destroy() {
        var plugin = this;
        plugin.index = 0;
        plugin.flag = false;
        plugin.initialized = false;
        plugin.$element.removeData("plugin_".concat(plugin.name));
        plugin.unbindEvents().removeCache();
      },
      buildCache: function buildCache() {
        var plugin = this;
        var anchorId = [];
        plugin.$element = $(plugin.element);
        plugin.$anchor = plugin.$element.find(plugin.options.anchor);
        plugin.$list = plugin.$element.find(plugin.options.list);
        plugin.$direction = plugin.$element.find(plugin.options.direction);
        plugin.options.isBooking = true;
        plugin.options.offsets = [];

        if (plugin.options.linkedTab) {
          plugin.$panel = $(plugin.options.linkedTab).children(plugin.options.panel);
        } else {
          plugin.$panel = plugin.$element.find(plugin.options.panel);
        }

        plugin.$anchor.each(function (idx, el) {
          var $this = $(el);
          var tabId = $this.attr('id') ? $this.attr('id') : COMMON.uuid("plugin-".concat(pluginName, "-"));
          var focusible = COMMON.checkFocusibleElement($this);
          $this.data("".concat(plugin.name, "_target"), plugin.$panel.eq(idx)).attr({
            'data-index': idx,
            id: tabId,
            role: 'tab',
            tabIndex: focusible ? '' : 0
          });

          if (plugin.options.isBooking) {
            plugin.options.offsets.push(Math.round($this.position().left - plugin.$anchor.position().left / 2));
          } else {
            plugin.options.offsets.push($this.offset().left - plugin.$anchor.offset().left);
          }

          anchorId.push(tabId);
        });
        plugin.$panel.each(function (idx, el) {
          var $this = $(el);
          $this.attr({
            'aria-labelledby': anchorId[idx],
            role: 'tabpanel',
            tabindex: 0
          });
        });
        plugin.$element.find('.tab-wrap__menu').attr({
          role: 'tablist'
        });
        plugin.$list.attr({
          role: 'presentation'
        });
      },
      removeCache: function removeCache() {
        var plugin = this;
        plugin.$list.removeAttr('role');
        plugin.$anchor.removeData("".concat(plugin.name, "_target")).removeAttr('style role').removeClass(plugin.options.activeClassName);
        plugin.$panel.removeAttr('style role aria-labelledby').removeClass(plugin.options.activeClassName);

        if (!COMMON.checkPrevId(plugin.$panel, plugin.name)) {
          plugin.$panel.removeAttr('id');
        }
      },
      bindEvents: function bindEvents() {
        var plugin = this;
        var $element = $(plugin.element);
        var $scrollWrap = $element.find(plugin.options.scrollWrap);
        var $scroller = $element.find(plugin.options.scroller);
        if ($scrollWrap.hasClass('modal-tab-scroll')) {
          if($scroller.find('.tab__button').length < 2)
          {
            $('.tab__scroll-left').hide();
            $('.tab__scroll-right').hide();
          }
        }
        else
        {
          $scroller.each(function (i) {
            if($(this).hasClass('number-tab'))
            {
              console.log('number')
              if($(this).find('.tab__button').length < 5)
              {
                console.log($(this).find('.tab__button').length)
                console.log('scroller')
                $('.tab__scroll').eq(i).find('.tab__scroll-left').hide();
                $('.tab__scroll').eq(i).find('.tab__scroll-right').hide();
              }
            }
          })
        }

        var eventName = function eventName() {
          var events = plugin.options.event;
          var event = '';

          if (events === 'focusin') {
            event = "focusin.".concat(plugin.name, " mounseenter.").concat(plugin.name);
          } else if (events === 'click') {
            event = "click.".concat(plugin.name, " keydown.").concat(plugin.name);
          } else {
            return "".concat(events, ".").concat(plugin.name);
          }

          return event;
        };

        var event = eventName();

        if (plugin.options.swipe) {
          $scrollWrap.css({
            overflow: 'hidden'
          });
          $scroller.on("touchstart.".concat(plugin.name, " touchend.").concat(plugin.name), function (e) {
            plugin.swipeEvent(e);
          });
        }

        plugin.$direction.on(event, function (e) {
          var gotoIdx = plugin.options.activeTab;
          var targetElem = e.target;
          var $this;

          if (targetElem.tagName !== 'BUTTON' || targetElem.tagName !== 'A') {
            $this = $(targetElem).closest('button, a'); // eslint-disable-next-line prefer-destructuring

            targetElem = $this[0];
          } else {
            $this = $(targetElem);
          }

          if ($this.data('tab-direction') === 'next') {
            if (plugin.$anchor.length - 1 === gotoIdx) {
              $this.addClass('disabled');
            } else {
              gotoIdx += 1;
              $this.removeClass('disabled');
            } // gotoIdx = plugin.$anchor.length - 1 === gotoIdx ? gotoIdx : gotoIdx + 1;

          } else {
            if (gotoIdx <= 0) {
              gotoIdx = 0;
              $this.addClass('disabled');
            } else {
              gotoIdx -= 1;
              $this.removeClass('disabled');
            } // gotoIdx = gotoIdx <= 0 ? 0 : gotoIdx - 1;

          }

          var gotoElem = plugin.$anchor[gotoIdx];
          plugin.close(gotoElem);
          plugin.open(gotoElem);
        });
        plugin.$anchor.on(event, function (e) {
          var targetElem = e.target;
          var $this;

          if (targetElem.tagName !== 'BUTTON' || targetElem.tagName !== 'A') {
            $this = $(targetElem).closest('button, a'); // eslint-disable-next-line prefer-destructuring

            targetElem = $this[0];
          } else {
            $this = $(targetElem);
          }

          var returnValue = true; // false 값이 되면 이벤트를 막는데 왜 막는 지 모르겠다.
          // if ($this.hasClass(plugin.options.activeClassName)
          //   || $this.hasClass(plugin.options.disabledClassName)
          //   || plugin.flag) {
          //   returnValue = true;
          // }
          // console.log('returnValue', returnValue);

          var key = e.which;

          if (e.type === 'click' || e.type === 'focusin' || key === 13 || key === 32) {
            plugin.idx = $(targetElem).data('index');
            plugin.close(targetElem);
            plugin.open(targetElem);
            e.preventDefault();
            e.stopPropagation();
          }

          return returnValue;
        });
      },
      unbindEvents: function unbindEvents() {
        var plugin = this;
        plugin.$anchor.off(".".concat(plugin.name));
        plugin.$element.off(".".concat(plugin.name));
      },
      beforeChange: function beforeChange($anchor, $panel) {
        var plugin = this;
        plugin.$element.trigger('beforeChange', [plugin, $anchor, $panel]);
        plugin.getWidth();
      },
      afterChange: function afterChange($anchor, $panel) {
        var plugin = this;
        var linkedPanel;

        if (plugin.options.tabType === 'scroll' || plugin.options.tabType === 'booking') {
          linkedPanel = $(plugin.$panel[plugin.idx]).find('[data-element="tab"]');
          plugin.scrollTab($anchor);
        }

        plugin.$element.trigger('afterChange', [plugin, $anchor, $panel, linkedPanel]);
        plugin.getWidth();

        if (plugin.$element.find('[data-element="tab"]').length) {
          plugin.buildCache();
        }

        if (plugin.$direction.length) {
          if (plugin.options.activeTab === 0) {
            $(plugin.element).find('[data-tab-direction="prev"]').addClass('disabled');
          } else if (plugin.options.activeTab >= plugin.$anchor.length - 1) {
            $(plugin.element).find('[data-tab-direction="next"]').addClass('disabled');
          } else {
            plugin.$direction.removeClass('disabled');
          }
        } // plugin.reInit();

      },
      centerMode: function centerMode(scrollTo) {
        var plugin = this;
        var $element = $(plugin.element); // const $scrollWrap = $element.find(plugin.options.scrollWrap);

        var $scrollInner = $element.find(plugin.options.scroller);
        var $activated = plugin.$anchor.eq(plugin.options.initIndex);
        var positionLeft = $activated.outerWidth();
        var bookingScroller = $element.find('.booking-tab__scroller__inner');
        var width = bookingScroller.width() / 2;

        if ($(window).width() > 1080) {
          $scrollInner.css({
            transform: "translateX(".concat(width - (scrollTo + positionLeft * 2), "px)")
          });
        } else {
          $scrollInner.css({
            transform: "translateX(".concat(width - (positionLeft * 2 + scrollTo), "px)")
          });
        }
      },
      swipeEvent: function swipeEvent(touch) {
        var plugin = this;
        var gotoIdx = plugin.options.activeTab;

        if (touch.type === 'touchstart') {
          plugin.options.touchFirst = touch.changedTouches[0].screenX;
        }

        var direction = plugin.options.touchFirst - touch.changedTouches[0].screenX;

        if (Math.abs(direction) > 50) {
          if (direction > 0) {
            if (gotoIdx === plugin.$anchor.length - 1) {
              gotoIdx = plugin.$anchor.length - 1;
            } else {
              gotoIdx += 1;
            }
          } else {
            if (gotoIdx <= 0) {
              gotoIdx = 1;
            }

            gotoIdx -= 1;
          }

          var targetElem = plugin.$anchor[gotoIdx];
          plugin.close(targetElem);
          plugin.open(targetElem);
        }
      },
      getWidth: function getWidth() {
        var plugin = this;
        var $element = $(plugin.element);
        var $scroller = $element.find(plugin.options.scroller);
        $scroller.width(function () {
          var list = $scroller.find(plugin.options.list);
          var width = 0;
          list.each(function (i, elem) {
            width += Math.round($(elem).outerWidth(true));
          });
          return width;
        });
      },
      scrollTab: function scrollTab(target) {
        var plugin = this;
        var $element = $(plugin.element);
        var $scrollWrap = $element.find(plugin.options.scrollWrap);
        var scrollTo = plugin.options.offsets[target.data('index')]; // const anchorWidth = Math.round($(target).outerWidth());

        if (plugin.options.tabAlign === 'center') {
          plugin.centerMode(scrollTo);
        } 
        else if ($scrollWrap.parents('.tab__scroll')) {
          // 고객정보 입력 탭, 탭버슨 사이즈 동일해야함
          var scrollValue = [];
          $('[data-element="tab__list"]').each(function (i) {
            scrollValue[i] = $(this).offset().left;
          });
          if ($scrollWrap.hasClass('tab__scroll-wrap'))
          {
            $scrollWrap.stop().animate({
              scrollLeft: (target.outerWidth(true) + Number(target.parent().css('margin-left').replace(/[^0-9]/g, ''))) * target.data('index')
            }, 300);
          }
          else if ($scrollWrap.hasClass('tab__button-wrap'))
          {
            $scrollWrap.stop().animate({
              scrollLeft: scrollValue[target.data('index')] - 50,
            }, 300);
          }
        } 
        else {
          $scrollWrap.stop().animate({
            scrollLeft: scrollTo - 20
          }, 300);
        }
      },
      open: function open(target) {
        var plugin = this;
        var $anchor = $(target);
        var $panel = $anchor.addClass(plugin.options.activeClassName).attr({
          'aria-selected': true,
          'aria-expanded': true
        }).data("".concat(plugin.name, "_target")).addClass(plugin.options.activeClassName);
        plugin.flag = true;
        plugin.options.activeTab = $anchor.data('index');
        plugin.beforeChange($anchor, $panel);

        if (plugin.options.mode === 'fade') {
          $panel.stop().fadeIn(plugin.options.speed, plugin.options.easing, function () {
            plugin.flag = false;
            plugin.afterChange($anchor, $panel);
          });
        } else if (plugin.options.mode === 'slide') {
          $panel.stop().slideDown(plugin.options.speed, plugin.options.easing, function () {
            plugin.flag = false;
            plugin.afterChange($anchor, $panel);
          });
        } else {
          $panel.stop().show();
          plugin.flag = false;
          plugin.afterChange($anchor, $panel);
        }

        if (plugin.options.autoScroll && plugin.initialized) {
          $('html, body').stop().animate({
            scrollTop: plugin.$element.offset().top
          }, plugin.options.speed);
        }
      },
      close: function close(target) {
        var plugin = this;
        plugin.$anchor.not(target).each(function (i, elem) {
          var $panel = $(elem).removeClass(plugin.options.activeClassName).attr({
            'aria-selected': false,
            'aria-expanded': false
          }).data("".concat(plugin.name, "_target")).removeClass(plugin.options.activeClassName);

          if (plugin.options.mode === 'fade') {
            $panel.stop().fadeOut(plugin.options.speed, plugin.options.easing);
          } else if (plugin.options.mode === 'slide') {
            $panel.stop().slideUp(plugin.options.speed, plugin.options.easing);
          } else {
            $panel.stop().hide();
          }
        });
      },
      go: function go(idx, autoScroll) {
        var plugin = this;
        plugin.$anchor.eq(idx).trigger(plugin.options.event);

        if (autoScroll && plugin.initialized) {
          $('html, body').stop().animate({
            scrollTop: plugin.$element.offset().top
          }, plugin.options.speed);
        }
      },
      reInit: function reInit() {
        var plugin = this;
        plugin.idx = 0;
        plugin.flag = false;
        plugin.initialized = false;
        plugin.unbindEvents();
        plugin.removeCache();
        plugin.init();
      }
    });

    $.fn[pluginName] = function init(options) {
      return this.each(function (i, elem) {
        //if (!$.data(elem, "plugin_".concat(pluginName))) {
          $.data(elem, "plugin_".concat(pluginName), new Plugin(elem, options || $(elem).data('options')));
        //}
      });
    };

    $(function () {
      $('[data-element="tab"]').tab();
    });
  })(); // image upload


  (function () {
    var pluginName = 'uploader';
    var defaults = {
      max: 3,
      wrapperClass: 'file',
      imageClass: 'file__image',
      item: '[data-element="file__input"]',
      wrap: '[data-element="file__wrap"]',
      clear: '[data-element="file__remove"]',
      label: '[data-element="file__label"]',
      images: '[data-element="file__images"]',
      image: '[data-element="file__image"]',
      countWrap: '[data-element="count__file"]',
      countCurrent: '[data-element="count__current"]',
      countMax: '[data-element="count__max"]',
      imageWrap: '<div data-element="file__image" />',
      clearButton: '<button type="button" class="file__clear" data-element="file__remove" />',
      leng: 0,
      imageMax: 8
    };

    function Plugin(element, options) {
      var plugin = this;
      plugin.element = element;
      plugin.name = pluginName;
      plugin.defaults = defaults;
      plugin.options = $.extend({}, plugin.defaults, options);
      plugin.flag = false;
      plugin.initialized = false;
      plugin.init();
    }

    $.extend(Plugin.prototype, {
      init: function init() {
        var plugin = this;
        plugin.bindCache();
        plugin.bindEvents();
      },
      bindCache: function bindCache() {
        var plugin = this;
        plugin.$element = $(plugin.element);
        plugin.$anchor = plugin.$element.find(plugin.options.label);
        plugin.$file = plugin.$element.find(plugin.options.item);
        plugin.$images = plugin.$element.find(plugin.options.images);
        plugin.$counter = $(plugin.options.countWrap);
        plugin.$counter.each(function (idx, el) {
          plugin.$countCurrent = $(el).find(plugin.options.countCurrent);
          plugin.$countMax = $(el).find(plugin.options.countMax);
          plugin.options.imageMax = plugin.$countMax[0].innerHTML * 1;
        });
        plugin.$anchor.each(function (idx, el) {
          var $this = $(el);
          var chkMultiple = $(this).prop('multiple');
          var $for = $this.attr('for') ? $this.attr('for') : COMMON.uuid("plugin-".concat(plugin.name, "-"));
          var $id = $this.attr('id') ? $this.attr('id') : COMMON.uuid("plugin-".concat(plugin.name, "-label-"));
          $this.attr({
            id: $id,
            for: $for,
            tabIndex: 0
          }).siblings(plugin.options.item).attr({
            id: $for,
            multiple: chkMultiple,
            'aria-labelledby': $id
          });
        });
      },
      bindEvents: function bindEvents() {
        var plugin = this;
        plugin.$anchor.off('click keydown').on('click keydown', function (e) {
          e.stopPropagation();
          plugin.$file.trigger('click');
          e.preventDefault();
        });
        plugin.$file.on('change', function (e) {
          var file = e.target.files;
          var fileName = plugin.$file.val();
          var ext = fileName.split('.').pop().toLowerCase();
          var fileSize = plugin.$file[0].files[0].size;
          var maxSize = 10 * 1024 * 1024;
          if($.inArray(ext, ['gif','png','jpg','jpeg','pdf']) == -1) {
            alert('등록 할수 없는 파일명입니다.');
          } 
          else if (fileSize > maxSize) {
            alert('10MB 이하의 파일만 업로드 가능합니다.')
          } 
          else {
            plugin.addImage(file);
          }  
          plugin.countImage();
        });
        plugin.$images.off('click').on('click', plugin.options.clear, function (e) {
          plugin.removeImage(e.target);
          plugin.countImage();
        });
      },
      addImage: function addImage(file) {
        var plugin = this;
        $(file).each(function (i, el) {
          console.log(el)
          var temp = plugin.options;
          var item = plugin.$images.append(temp.imageWrap);
          var image = URL.createObjectURL(el);
          var wrapper = '';

          if (temp.leng < temp.imageMax) {
            item.find('div:last-child').addClass(temp.imageClass);
            wrapper = plugin.$images.find(".".concat(temp.imageClass, ":last-child"));

            if (item.hasClass('file--pdf__images')) {
              wrapper.append("<p>".concat(file[i].name, "</p>").concat(temp.clearButton));
            } else {
              wrapper.append("<img src=\"".concat(image, "\" alt=\"").concat(file[i].name, "\">").concat(temp.clearButton));
            }

            temp.leng += 1;
          } // console.log(temp.leng);
          plugin.afterChange(plugin.$images);
        });
      },
      removeImage: function removeImage(btn) {
        var plugin = this;
        var temp = plugin.options;
        var $button = $(btn);
        var wrap = $button.closest(temp.image);
        wrap.remove();
        temp.leng -= 1;
        plugin.afterChange(plugin.$images);
      },
      countImage: function countImage() {
        var plugin = this;
        var temp = plugin.options;

        if (plugin.$countCurrent) {
          plugin.$countCurrent.text(temp.leng);
        }
      },
      afterChange: function afterChange($target) {
        var plugin = this;
        plugin.$element.trigger('afterChange', [plugin, $target]);
      }
    });

    $.fn[pluginName] = function init(options) {
      return this.each(function (i, elem) {
        if (!$.data(elem, "plugin_".concat(pluginName))) {
          $.data(elem, "plugin_".concat(pluginName), new Plugin(elem, options || $(elem).data('options')));
        }
      });
    };

    $(function () {
      $('[data-element="file__wrap"]').uploader();
    });
  })(); // accordion

  (function () {
    var pluginName = 'accordion';
    var defaults = {
      mode: 'slide',
      speed: 200,
      easing: 'linear',
      item: '[data-element="accordion__item"]',
      anchor: '[data-element="accordion__anchor"]',
      panel: '[data-element="accordion__panel"]',
      activeClassName: 'is-active',
      initIndex: 0,
      isInitActive: false,
      autoFold: true,
      autoScroll: false
    };

    function Plugin(element, options) {
      var plugin = this;
      plugin.element = element;
      plugin.name = pluginName;
      plugin.defaults = defaults;
      plugin.options = $.extend({}, plugin.defaults, options);
      plugin.flag = false;
      plugin.initialized = false;
      plugin.init();
    }

    $.extend(Plugin.prototype, {
      init: function init() {
        var plugin = this;
        plugin.buildCache();
        plugin.bindEvents();

        if (plugin.options.isInitActive) {
          plugin.open(plugin.$anchor.eq(plugin.options.initIndex));
        }

        plugin.initialized = true;
      },
      destroy: function destroy() {
        var plugin = this;
        plugin.flag = false;
        plugin.initialized = false;
        plugin.$element.removeData("plugin_".concat(plugin.name));
        plugin.unbindEvents().removeCache();
      },
      buildCache: function buildCache() {
        var plugin = this;
        plugin.$element = $(plugin.element).attr('role', 'presentation');
        plugin.$header = plugin.$element.find(plugin.options.item);
        plugin.$anchor = plugin.$element.find(plugin.options.anchor);
        plugin.$panel = plugin.$element.find(plugin.options.panel).hide();
        var tabsId = [];
        plugin.$anchor.each(function (idx, elem) {
          var $this = $(elem);
          var anchorId;

          if ($this.attr('id')) {
            anchorId = $this.attr('id');
          } else {
            anchorId = COMMON.uuid("plugin-".concat(plugin.name, "-"));
          }

          $this.data("".concat(plugin.name, "_target"), plugin.$panel.eq(idx)).data('title', $.trim($this.text())).attr({
            id: anchorId,
            'aria-expanded': false,
            'aria-controls': "".concat(anchorId, "-panel")
          });
          tabsId.push(anchorId);
        });
        plugin.$panel.each(function (idx, elem) {
          $(elem).attr({
            'aria-labelledby': tabsId[idx],
            role: 'region'
          }).hide();
        });
      },
      removeCache: function removeCache() {
        var plugin = this;
        plugin.$anchor.removeData("".concat(plugin.name, "_target")).removeData('title').removeAttr('id aria-expanded aria-controls').removeClass(plugin.options.activeClassName);
        plugin.$panel.removeAttr('aria-labeledby role').removeClass(plugin.options.activeClassName);

        if (!COMMON.checkPrevId(plugin.$anchor, plugin.name)) {
          plugin.$anchor.removeAttr('id');
        }
      },
      bindEvents: function bindEvents() {
        var plugin = this;
        plugin.$element.on("click.".concat(plugin.name), plugin.options.anchor, function (e) {
          e.stopPropagation();
          e.preventDefault();
          var target = $(e.target);

          if (e.target.tagName !== 'BUTTON' || e.target.tagName !== 'A') {
            target = $($(e.target).closest(plugin.options.anchor));
          }

          if (target.attr('disabled') !== 'disabled') {
            plugin.toggle(target);
          }
        });
        plugin.$anchor.on("open.".concat(plugin.name), function (e) {
          plugin.open($(e.target));
        });
        plugin.$anchor.on("close.".concat(plugin.name), function (e) {
          plugin.close($(e.target));
        });
      },
      unbindEvents: function unbindEvents() {
        var plugin = this;
        plugin.$element.off(".".concat(plugin.name));
        plugin.$header.off(".".concat(plugin.name));
      },
      beforeChange: function beforeChange($activeTarget) {
        var plugin = this;
        plugin.$element.trigger('beforeChange', [plugin, $activeTarget]);
      },
      afterChange: function afterChange($activeTarget) {
        var plugin = this;
        plugin.$element.trigger('afterChange', [plugin, $activeTarget]);
      },
      toggle: function toggle($targetAnchor) {
        var plugin = this;
        plugin.flag = true;

        if ($targetAnchor.hasClass(plugin.options.activeClassName)) {
          plugin.close($targetAnchor);
        } else {
          plugin.open($targetAnchor);
        }
      },
      open: function open($targetAnchor) {
        var plugin = this;
        plugin.beforeChange($targetAnchor);
        var $panel = $targetAnchor.attr('aria-expanded', true).addClass(plugin.options.activeClassName).data("".concat(plugin.name, "_target")).addClass(plugin.options.activeClassName);

        if (plugin.initialized && plugin.options.mode === 'slide') {
          $panel.stop().slideDown(plugin.options.speed, plugin.options.easing, function () {
            plugin.flag = false;

            if (plugin.options.autoScroll) {
              $('html, body').stop().animate({
                scrollTop: $targetAnchor.offset().top
              }, 100);
            }
          });
        } else {
          $panel.stop().show();
          plugin.flag = false;
        }

        if (plugin.options.autoFold) {
          plugin.$anchor.not($targetAnchor).each(function (i, elem) {
            plugin.close($(elem));
          });
        }

        plugin.afterChange($targetAnchor);
      },
      close: function close($targetAnchor) {
        var plugin = this;
        plugin.beforeChange($targetAnchor);
        var $panel = $targetAnchor.attr('aria-expanded', false).removeClass(plugin.options.activeClassName).data("".concat(plugin.name, "_target")).removeClass(plugin.options.activeClassName);

        if (plugin.options.mode === 'slide') {
          $panel.stop().slideUp(plugin.options.speed, plugin.options.easing, function () {
            plugin.flag = false;
          });
        } else {
          $panel.stop().hide();
          plugin.flag = false;
        }
      },
      go: function go(idx, autoScroll) {
        var plugin = this;
        plugin.$anchor.eq(idx).trigger('click');

        if (autoScroll) {
          plugin.autoScroll();
        }
      },
      autoScroll: function autoScroll() {
        var plugin = this;
        $('html, body').stop().animate({
          scrollTop: plugin.$wrap.offset().top
        }, plugin.options.speed);
      },
      reInit: function reInit() {
        var plugin = this;
        plugin.flag = false;
        plugin.initialized = false;
        plugin.unbindEvents().removeCache().init();
      }
    });

    $.fn[pluginName] = function init(options) {
      return this.each(function (i, elem) {
        // if (!$.data(elem, "plugin_".concat(pluginName))) {
        $.data(elem, "plugin_".concat(pluginName), new Plugin(elem, options || $(elem).data('options')));
        // }
      });
    };

    $(function () {
      $('[data-element=accordion]').accordion();
    });
  })();

});

// 서브탭    
$.fn.subTab = function () {
  return this.each(function (index) {
    var $wrap = $(this).eq(index)
    var $tabBtn = $wrap.find('.sub-tab-btn')
    var $pannel = $wrap.find('.sub-tab__panel')
    $tabBtn.on('click', function () {
      var currentIdx = $(this).index();
      $tabBtn.removeClass('on').eq(currentIdx).addClass('on')
      $pannel.removeClass('on').eq(currentIdx).addClass('on')
    })
  })
}

// 스크롤 영역에 따른 가격 표시 & PC사이즈 시트 네비
$.fn.displaySeatValue = function () {
  var selectSeat = [];
  var seatMap = [];
  var seatMapH = [];
  return this.each(function (i) {
    selectSeat[i] = $(this);
    seatMap[i] = selectSeat[i].find('.select-seat__map');
    var selectSeatY = selectSeat[i].offset().top
    var tagList = $('.select-seat__tag-list')
    var tag = tagList.children('.select-seat__tag')
    var tagA = tagList.children('.group-a')
    var tagB = tagList.children('.group-b')
    var tagC = tagList.children('.group-c')
    var seatNav = selectSeat[i].find('.seat-nav')
    var seatPos = selectSeat[i].find('.seat-pos')
    $(window).on('scroll', function () {
      var stickyCheck = $('.sticky__inner').hasClass('is-sticky')
      var posY = $(this).scrollTop()
      if ($('.tab__panel.is-active').length > 0)
      {
        var panelIndex = $('.tab__panel.is-active').index();
        var seatMapH = seatMap[panelIndex - 1].height();
      }
      else
      {
        var seatMapH = seatMap[0].height();
      }
      var headerH = $('.header').height();
      var breadcrumbH = $('.breadcrumb').height()
      if ($('.title').length > 0) {
        var titleH = $('.title').height();
      }
      else {
        var titleH = 0;
      }
      var tabScrollWrapH = $('.tab__scroll-wrap').height()
      var stickyHeaderHeight = $('.sticky-header').height() + $('.sticky__inner').innerHeight()
      var seatViewH = ($(window).height() - stickyHeaderHeight - $('.booking-sticky__top').height())
      var seatViewHPercent = seatViewH / seatMapH * 100
      var seatPosY = posY - stickyHeaderHeight - $('.booking-sticky__top').height()
      var seatImg = $('.seat-img')
      var seatImgH = seatImg.height();
      var seatScrollPosY = seatPosY - seatViewH 
      var movingDistance = seatImgH - seatViewHPercent
      var seatNavH =  Math.floor(seatScrollPosY / movingDistance * 100);
      //console.log('tagList',tagList.length, tag.length, tagA.length, tagB.length, tagC.length, selectSeat.length);
      //console.log('461', posY, headerH, breadcrumbH, titleH, tabScrollWrapH)
      if (!$('body').hasClass('isPc')) 
      {
        if (posY > headerH + breadcrumbH + titleH + tabScrollWrapH)
        {
          tag.hide()
          if (posY - stickyHeaderHeight > seatMapH * 0 && posY - stickyHeaderHeight < seatMapH * (1/3))
          {
            tagA.css('display', 'inline-block')
            console.log ('tagA')
          } 
          else if (posY - stickyHeaderHeight > seatMapH * (1/3) && posY - stickyHeaderHeight < seatMapH * (2/3))
          {
            tagB.css('display', 'inline-block')
            console.log ('tagB')
          }
          else
          {
            tagC.css('display', 'inline-block')
            console.log ('tagC')
          }
        }
        else
        {
          tag.css('display', 'inline-block')
        }
      }
      if (stickyCheck)
      {
        seatNav.addClass('on')
        seatPos.css({
          'height': seatViewHPercent + '%',
        })
        if (seatPosY > 0)
        {
          seatPos.css({
            'top': seatPosY / seatMapH * 100 + '%',
            'background-position': '0 ' + seatPosY / (seatMapH - seatViewH) * 100 + '%'
          })
        }
        if (seatPosY > seatMapH - seatViewH)
        {
          seatPos.css({
            'top': 100 - seatViewHPercent + '%',
            'background-position': '0 100%'
          })
        }
        if (seatPosY < 0)
        {
          seatNav.removeClass('on')
        }
      }
      else
      {
        seatNav.removeClass('on')
      }
    })
  })
}

// 칩셀렉트
$.fn.selectChips = function () {
  return this.each(function (i, obj) {
    var wrap = $(this);
    var chipBtn = wrap.find('.chip-btn');
    chipBtn.on('click', function () {
      chipBtn.removeClass('checked')
      $(this).addClass('checked')
      var curIdx = $(this).data('index')
      $('[data-chip-show]').removeClass('show')
      $('[data-chip-show=' + curIdx + ']').addClass('show')
      if ($('[data-chip-show=' + curIdx + ']').find('[first]').length > 0) {
        $('[data-chip-show=' + curIdx + ']').find('[first]').removeClass('hide');
      }
    });
    var chipSwiper = new Swiper(wrap, {
      slidesPerView: "auto",
      observer: true,
      observeParents: true,
    });
  })
}

// 부킹 출발, 도착 지도 탭
// $.fn.mapInnerTab = function () {
//   return this.each(function (i) {
//     var flightMap = $(this);
//     var areaBtn = flightMap.find('.tab-top-btn');
//     var tabSwiper = flightMap.find('.tab-swipe');
//     var tabSwiperWrapper = flightMap.find('.tab-swipe-wrapper');
//     var areaBtn02 = flightMap.find('.tab-swipe-item');
//     var btnWish = flightMap.find('.btn-wish');
//     areaBtn.on('click', function (e) {
//       e.preventDefault();
//       areaBtn.removeClass('on');
//       $(this).addClass('on');
//       let selectedTopIdx = $(this).data('index')
//       //airportMapLayer.changeZoomArea(selectedTopIdx);
//       let selectedAirportLayer;
//       if($("#depAirportLayer").is(":visible")){
//         selectedAirportLayer = $("#depAirportLayer")
//       }else{
//         selectedAirportLayer = $("#arrAirportLayer")
//       } 		
//       for(let i=0; i<selectedAirportLayer.find('div.tab-swipe-wrapper').find('.tab-swipe-item').length; i++){
//         let $this = selectedAirportLayer.find('div.tab-swipe-wrapper').find('.tab-swipe-item').eq(i)
//         if($this.data('index') == selectedTopIdx){
//           $this.show();
//         }else{
//           $this.hide();
//         }
//       }
//       $('.map-wrap').mapInnerTab()    
//     })
//     areaBtn02.on('click', function (e) {
//       e.preventDefault();
//       areaBtn02.removeClass('on');
//       $(this).addClass('on');
//       console.log('지도 위 하단탭');
//     })
//     // 하단 스와이프
//     var tabSwipe = new Swiper(tabSwiper, {    
//       slidesPerView: 'auto',
//     });
//   })
// }

// 셀렉트 selected 처리
$.fn.selectedOption = function () {
  var select = [];
  return this.each(function (i) {
    select[i] = $(this);
    var options = select[i].find('option').attr('selected');
    if (options == 'selected')
    {
      select[i].addClass('selected')
    }
    select[i].on('change', function () {
      var current = $(this).val();
      if (current != 'null') {
        $(this).addClass('selected');
      } else {
        $(this).removeClass('selected');
      }
    });    
  })
}
$('.select-wrap__select').selectedOption();

// 팝업 탭 고정
$.fn.modalTabSticky = function () {
  var mTab = this;
  var panelTop = mTab.find('.tab__panel').position().top;
  console.log(panelTop);
  var modalH = mTab.parents('.modal').height();
  //mTab.find('.tab__panel').css('height', modalH - panelTop + 'px');
}

// 셀렉트탭
$.fn.selectTab = function () {
  var selectTabBody = this;
  var selectTab = selectTabBody.find('select');
  selectTab.on('change', function () {
    var currentValue = $(this).val();
    console.log(currentValue)
    $('[data-select-tab-content]').removeClass('show').addClass('hide');
    $('[data-select-tab-content=' + currentValue  + ']').addClass('show').removeClass('hide');
  });
}

// 모달 관련
function fullPopOpen (popId) {
  var broserHeight = $(window).height();
  var modelH = broserHeight * 0.7;
  var modalEl = $('#' + popId);
  var wrapperHtml = '<div class="modal-wrapper ' + popId + ' on"></div>';
  $('body').append(wrapperHtml);
  $('.modal-wrapper.' + popId).append(modalEl);
  $('#' + popId).css('display', 'inline-block');
  var modalHeaerHeight = $('#' + popId).find('.modal-header').height();
  $('#' + popId).find('.modal-content').css('max-height', modelH - modalHeaerHeight + 'px');
  $('html').addClass('open-modal open-modal--full');
  console.log(broserHeight);
}

function closeCurrentModal (obj) {
  var currentModal = $(obj).parents('.modal-wrapper');
  var modalEl = currentModal.children();
  $('body').append(modalEl);
  modalEl.hide();
  currentModal.remove();
  if ($('.modal-wrapper').length < 1)
  {
    $('html').removeClass('open-modal open-modal--full');
  }
  console.log(currentModal, modalEl);
}

function closeModal (popId) {
  var moodalEl = [];
  var modalId = popId.split(' ');
  for (var i = 0; i < modalId.length; i ++)
  {
    moodalEl[i] = $('.' + modalId[i]).children();
    $('body').append(moodalEl[i]);
    moodalEl[i].hide();
    $('.' + modalId[i]).remove();
  }
  if ($('.modal-wrapper').length < 1)
  {
    $('html').removeClass('open-modal open-modal--full');
  }
  console.log(modalId[i]);
}

function closeRemoteModal (popId) {
  var moodalEl = [];
  var modalId = popId.split(' ');
  for (var i = 0; i < modalId.length; i ++)
  {
    moodalEl[i] = $('.' + modalId[i]).children();
    moodalEl[i].hide();
    $('.' + modalId[i]).remove();
  }
  if ($('.modal-wrapper').length < 1)
  {
    $('html').removeClass('open-modal open-modal--full');
  }
  console.log('closeRemoteModal', modalId[i]);
}

// 예매
$.fn.ticketing = function (type) {
  var ticketingWrap = this;
  var type = type;
  var rowTop = ticketingWrap.find('.ticketing-row-top');
  var rowBot = ticketingWrap.find('.ticketing-row-bot');
  var btnPick = ticketingWrap.find('.js-target-pick');
  var btnStart = ticketingWrap.find('.start.js-target-pick');
  var btnTarget = ticketingWrap.find('.target.js-target-pick');
  var btnOpen = ticketingWrap.find('.btn-open.js-target-pick');
  var flightStart = ticketingWrap.find('.flight-start');
  var flightTarget = ticketingWrap.find('.flight-target');
  var ticketPath = ticketingWrap.find('.ticket-path');
  var btnPc = ticketingWrap.find('.pc-toggle-btn');
  var btnMo = ticketingWrap.find('.mobile-btn');
  var promotionTop = ticketingWrap.find('.promotion-top');
  var promotionInp = ticketingWrap.find('.promotion-inp .inp-txt');

  // 편도, 왕복, 다구간 탭
  var typeTab = ticketingWrap.find('.ticketing-type');
  var typeTabItem = ticketingWrap.find('.ticketing-type .item');
  var typeTabBtn = ticketingWrap.find('.ticketing-type .item-btn');

  // 탑승자 선택
  var btnPassengers = ticketingWrap.find('.btn-passengers');
  var customerLayer = ticketingWrap.find('.customer-layer');
  typeTabBtn.on('click', function (e) {
    e.preventDefault()
    var currentIndex = $(this).parent().index()
    typeTabItem.removeClass('selected')
    $(this).parent().addClass('selected')
    if (currentIndex == 0) {
      console.log('왕복')
      ticketingWrap.removeClass('one-way multi').addClass('round');
    }
    else if (currentIndex == 1) {
      console.log('편도')
      ticketingWrap.removeClass('round multi').addClass('one-way');
    }
    else {
      console.log('다구간')
      ticketingWrap.removeClass('round one-way').addClass('multi');
    }
  });

  // 가려진 부분 열기
  btnPick.on('click', function () {
    open ()
  })
  btnPc.on('click', function () {
    var check = ticketingWrap.hasClass('open')
    if (check) {
      close ()
    }
    else {
      open ()
    }
  })
  btnMo.on('click', function () {
    var check = ticketingWrap.hasClass('open')
    if (check) {
      close ()
      ticketPath.show()
      rowTop.hide()
    }
    else {
      open ()
      ticketPath.hide()
      rowTop.show()
    }
  })

  function open () {
    ticketingWrap.removeClass('closed').addClass('open')
    typeTab.show()
    rowBot.show()
  }

  function close () {
    ticketingWrap.removeClass('open').addClass('closed')
    typeTab.hide()
    rowBot.hide()
  }

  // 결제 방법
  var payment = ticketingWrap.find('.payment')
  var paymentRadio = ticketingWrap.find('.radio__input')
  var promotion = ticketingWrap.find('.promotion')
  var gTicket = ticketingWrap.find('.g-ticket')
  paymentRadio.on('change', function () {
    var currentIndex = $(this).parent().index()
    if (currentIndex == 0) {
      console.log('일반')
      gTicket.hide()
      if ($('body').hasClass('isPc')) {
        promotion.css('display', 'block')
      }
      else {
        promotion.css('display', 'block')
      }
    }
    else if (currentIndex == 1) {
      console.log('포인트')
      gTicket.hide()
      promotion.hide()
    }
    else {
      console.log('기프티켓')
      gTicket.show()
      promotion.hide()
    }
  });

  // 출발, 도착지 선택
  btnStart.on('click', function () {
    customerLayer.hide();
    dateLayer.hide();
    flightTarget.hide();
    flightStart.hide();
    var curIdx = $(this).parents('.ticketing-row-top').index();
    if (type == 'multi') {
      if (curIdx == '2')
      {
        ticketingWrap.find('.route2').next().find('.flight-start').show();
      }
      else if (curIdx == '4')
      {
        ticketingWrap.find('.route1').next().find('.flight-start').show();
      }
    }
    else
    {
      rowTop.next().find('.flight-start').show();
    }
    console.log('curIdx', curIdx)
    // 맵 위에 탭 plugin.js
    $('.flight-layer').removeClass('map');
    removeUnderLine ()
    $(this).addClass('on');
  })
  btnTarget.on('click', function () {
    customerLayer.hide();
    flightStart.hide();
    dateLayer.hide();
    flightTarget.hide();
    // 맵 위에 탭 plugin.js
    $('.flight-layer').removeClass('map');
    removeUnderLine ();
    $(this).addClass('on');
    var curIdx = $(this).parents('.ticketing-row-top').index();
    if (type == 'multi') {
      if (curIdx == '2')
      {
        ticketingWrap.find('.route2').next().find('.flight-target').show();
      }
      else if (curIdx == '4')
      {
        ticketingWrap.find('.route1').next().find('.flight-target').show();
      }
    }
    else
    {
      rowTop.next().find('.flight-target').show();
    }
    console.log('curIdx', curIdx)
  })

  // 날짜 선택
  var btnDate = ticketingWrap.find('.btn-date');
  var dateLayer = ticketingWrap.find('.date-layer');

  btnDate.on('click', function () {
    open ()
    customerLayer.hide();
    flightStart.hide();
    flightTarget.hide();
    dateLayer.hide()
    $(this).show()
    removeUnderLine ();
    $(this).addClass('on');
    var curIdx = $(this).parents('.ticketing-row-top').index();
    if (type == 'multi')
    {
      if (curIdx == '2')
      {
        ticketingWrap.find('.route2').next().find('.date-layer').show();
      }
      else if (curIdx == '4')
      {
        ticketingWrap.find('.route1').next().find('.date-layer').show();
      }
    }
    else
    {
      rowTop.next().find('.date-layer').show();
    }
    console.log('curIdx', curIdx)
  });

  btnPassengers.on('click', function () {
    open ()
    dateLayer.hide();
    flightStart.hide();
    flightTarget.hide();
    customerLayer.show()
    removeUnderLine ();
    $(this).addClass('on');
  });

  // 찜하기
  var btnWish = ticketingWrap.find('.btn-wish')
  btnWish.on('click', function () {
    var checkWish = $(this).hasClass('selected')
    if (checkWish) {
      $(this).removeClass('selected')
    } 
    else {
      $(this).addClass('selected')
    }
  });

  // 프로모션 코드 활성화 체크
  promotionInp.on('focusin', function () {
    promotionTop.addClass('focus');
    removeUnderLine ();    
  });
  promotionInp.on('focusout', function () {
    promotionTop.removeClass('focus')
  });

  // common.js
  // removeUnderLine () 
}