$(document).ready(function() {
	/*항공권 운임 규정 동의*/
	$(document).on('click', '#fareRule', function() {		
		openModal("#fareRuleModalLayer", "full");
	});
	
	$(document).on('click', '#inpAgree-01', function() {		
		var checkProp = $(this).prop('checked');
       	if (checkProp) {
        	$(this).prop('checked', false);
         	openModal("#fareRuleModalLayer", "full");
       	}
	});

	/* 국내선 여객운송 약관 동의 */
	$(document).on('click', '#carriage', function() {
		openModal("#carriageModalLayer", "full");
	});
	
	$(document).on('click', '#inpAgree-02', function() {
		var checkProp = $(this).prop('checked');
       	if (checkProp) {
        	$(this).prop('checked', false);
         	openModal("#carriageModalLayer", "full");
       	}
	});
	
	/* 항공기 반입금지 위험물 확인 */
	$(document).on('click', '#dangerInfo', function() {
		openModal("#dangerInfoModalLayer", "full");
	});
	
	$(document).on('click', '#inpAgree-03', function() {		
		var checkProp = $(this).prop('checked');
       	if (checkProp) {
        	$(this).prop('checked', false);
         	openModal("#dangerInfoModalLayer", "full");
       	}
	});
	
	/* 부가서비스 환불 규정 동의 */
	$(document).on('click', '#serviceInfo', function() {
		openModal("#serviceInfoModalLayer", "full");
	});
	
	$(document).on('click', '#inpAgree-04', function() {		
		var checkProp = $(this).prop('checked');
       	if (checkProp) {
        	$(this).prop('checked', false);
         	openModal("#serviceInfoModalLayer", "full");
       	}
	});
	
	/* 자전거 캐링백 서비스 유의사항 동의 */
	$(document).on('click', '#carryingBagInfo', function() {
		openModal("#carryingBagInfoModalLayer", "full");
	});
	
	$(document).on('click', '#inpAgree-06', function() {		
		var checkProp = $(this).prop('checked');
       	if (checkProp) {
        	$(this).prop('checked', false);
         	openModal("#carryingBagInfoModalLayer", "full");
       	}
	});
	
	if(routeCheck == 1) { // 한개 존재
		/* 노선별 주의사항 확인 동의 */
		$(document).on('click', '#routeInfo', function() {
			openModal("#firstRouteInfoModalLayer", "full");
		});
		
		$(document).on('click', '#inpAgree-05', function() {		
			var checkProp = $(this).prop('checked');
	       	if (checkProp) {
	        	$(this).prop('checked', false);
	         	openModal("#firstRouteInfoModalLayer", "full");
	       	}	
		});
	}

	/* 공항시설 사용료  */
	$(document).on('click', '#taxInfo', function() {
		openModal("#taxInfoModalLayer", "full");
	});

	$("button[name=btnNext]").attr("disabled", true);
	//<%-- 약관 및 규정 동의 체크박스 체크 및 해제 --%>
	$(document).on('click', 'input[type="checkbox"][id^="inpAgree"]', function() {
		const _this = $(this).attr('id');
		let isNotChecked = false;
		let arrCheckPick = [];
		
		if (_this === 'inpAgreeAll') { // 전체동의 버튼
			if ($(this).is(':checked')) {
				$("button[name=btnNext]").attr("disabled", false);
				$('button[name=btnNext]').addClass('button--active'); // 다음 버튼 활성화
			} else {
				$("button[name=btnNext]").attr("disabled", true);
				$('button[name=btnNext]').removeClass('button--active');
			}
			
			$('input[type="checkbox"][id^="inpAgree-"]').each(function() { // 전체동의 버튼 클릭 시 나머지 비활성화 (IE, Chrome간 다른 전체동의 기능 보완)  
				if ($(this).is(':checked')) {
					arrCheckPick.push($(this).attr('id'));
				}
				$(this).prop('checked', false);
			});
			
			if(arrCheckPick.length < 6 && routeCheck > 0) {
				for (let i in arrCheckPick) {
					$("#"+arrCheckPick[i]).prop('checked', true);	
				}
			} else if (arrCheckPick.length < 5 && Number.isNaN(routeCheck)) {
				for (let i in arrCheckPick) {
					$("#"+arrCheckPick[i]).prop('checked', true);	
				}
			}
			
		} else {
			$('input[type="checkbox"][id^="inpAgree-"]').each(function() { // 나머지 버튼 전부 클릭이면 다음버튼 활성화
				if (!$(this).is(':checked')) {
					isNotChecked = true;
				}
			});
			
			if (!isNotChecked) {
				$("button[name=btnNext]").attr("disabled", false);
				$('button[name=btnNext]').addClass('button--active'); 
			} else {
				$("button[name=btnNext]").attr("disabled", true);
				$('button[name=btnNext]').removeClass('button--active');
			}
			
			$("#inpAgreeAll").prop('checked', false); // 나머지 버튼 클릭 시 전체동의 버튼 비활성화 (IE, Chrome간 다른 전체동의 기능 보완)
			
		}
		
	});
	
	//<%-- 팝업 내의 동의 버튼 클릭 --%>
	$(document).on('click', 'button[id^=btnAgree]', function() {
		const number = $(this).attr('id').substr(8, 2);
		
		$('input[type="checkbox"][id="inpAgree-' + number + '"]')[0].checked = true;
		checkAll();
		
		$.modal.close();
	});
	
	const checkAll = function() {
		let flag = true;
		$('input[type="checkbox"][id^="inpAgree-"]').each(function(index, item) {
			flag = flag && item.checked;
		});
		if (flag) {
			$('.agree-wrap .checkbox__input').prop('checked', true);
			$("button[name=btnNext]").attr("disabled", false);
			$('button[name=btnNext]').addClass('button--active');
		}
	}
	
	// 약관 및 규정 동의 내용
	var agreeData = [
		{
	      title: $("#fareRuleModalLayer > .modal-header > .modal-header__title").html(),
	      content: $("#fareRuleModalLayer > .modal-content").html()
	    },
	    {
	      title: $("#carriageModalLayer > .modal-header > .modal-header__title").html(),
	      content: $("#carriageModalLayer > .modal-content").html()
	    },
	    {
	      title: $("#dangerInfoModalLayer > .modal-header > .modal-header__title").html(),
	      content: $("#dangerInfoModalLayer > .modal-content").html()
	    },
	    {
	      title: $("#serviceInfoModalLayer > .modal-header > .modal-header__title").html(),
	      content: $("#serviceInfoModalLayer > .modal-content").html()
	    },
	    {
	      title: $("#carryingBagInfoModalLayer > .modal-header > .modal-header__title").html(),
	      content: $("#carryingBagInfoModalLayer > .modal-content").html()
	    }
	];
	
	switch(routeCheck){
		case 1 : agreeData.push({ title: $("#firstRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
			     				content: $("#firstRouteInfoModalLayer > .modal-content").html() }); break;
		
		case 2 : agreeData.push({ title: $("#firstRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
			     				content: $("#firstRouteInfoModalLayer > .modal-content").html() }); 
				 agreeData.push({ title: $("#secondRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
				      	        content: $("#secondRouteInfoModalLayer > .modal-content").html() }); break;
		
		case 3 : agreeData.push({ title: $("#firstRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
			     				content: $("#firstRouteInfoModalLayer > .modal-content").html() }); 
				 agreeData.push({ title: $("#secondRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
				      	        content: $("#secondRouteInfoModalLayer > .modal-content").html() }); 
				 agreeData.push({ title: $("#thirdRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
						      	content: $("#thirdRouteInfoModalLayer > .modal-content").html() });	break;
	
		case 4 : agreeData.push({ title: $("#firstRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
			     				content: $("#firstRouteInfoModalLayer > .modal-content").html() }); 
				 agreeData.push({ title: $("#secondRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
				      	        content: $("#secondRouteInfoModalLayer > .modal-content").html() }); 
				 agreeData.push({ title: $("#thirdRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
						      	content: $("#thirdRouteInfoModalLayer > .modal-content").html() });	
				 agreeData.push({ title: $("#fouthRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
			      				content: $("#fouthRouteInfoModalLayer > .modal-content").html() }); break;
	}

  // 약관 및 규정 동의
  $.fn.checkAgree = function (agreeData) {
  	 var agreeData = agreeData; // 약관 및 규정 동의 내용들
     var chkAgrWrap = this; 
     var checkAllBtn = chkAgrWrap.find('#inpAgreeAll'); // 전체동의 버튼
     var checkBtn = chkAgrWrap.find('.agree-wrap__item .item-inner'); // 각 체크버튼
     // var checkkItemLeng = $('.agree-wrap__item').length; // 각 동의 영역 개수
	 var checkkItemLeng = agreeData.length;
     var agreeViewBtn = $('.agree-wrap__button'); // 각 동의 버튼
     var allAgree = $('.js-check-all'); // 모두동의 영역
     var title = $('#allAgreeModalLayer .modal-header__title'); // 타이틀
     var content = $('#allAgreeModalLayer .modal-content'); // 내용
     var modalCheckAll = $('.js-check-all'); // 모두동의
     var prevBtn = $('#allAgreeModalLayer .agree-prev'); // 이전
     var nextBtn = $('#allAgreeModalLayer .agree-next'); // 다음
	
	// 전체동의 버튼
    checkAllBtn.on('click', function () {
        var checkProp = $(this).prop('checked');
       	if (checkProp) {
        	$(this).prop('checked', false);  
         	openAgree ('all');
       	}
    });

	// 팝업 모두동의 버튼
    allAgree.on('click', function () {
      var checkBtn = chkAgrWrap.find('.agree-wrap__item .checkbox__input');
    });
	// 모두 동의 버튼
    modalCheckAll.on('click', function () {
      $('.agree-wrap .checkbox__input').prop('checked', true);
	  $("button[name=btnNext]").attr("disabled", false);
	  $('button[name=btnNext]').addClass('button--active');
      //$('.modal__close').click();
	  $.modal.close();
    });

    function openAgree (index) {
   		var index = index;
   		if (index == 'all') {
      		title.html(agreeData[0].title);
      		content.html(agreeData[0].content);
      		modalCheckAll.show();
      		prevBtn.show();
      		nextBtn.show();
      		chkAgrWrap.attr('data-agree', 1)
   		}
   		//$('.open-modal').click();
		openModal("#allAgreeModalLayer", "full");
       	afterInnerHtml ()
    }
	// 이전 버튼
    prevBtn.on('click', function () {
       var current = chkAgrWrap.attr('data-agree');
       var newIdx = current - 1;
       if (newIdx === 0) {
         title.html(agreeData[checkkItemLeng - 1].title);
         content.html(agreeData[checkkItemLeng - 1].content);
         chkAgrWrap.attr('data-agree', checkkItemLeng);
       } else {
         title.html(agreeData[newIdx - 1].title);
         content.html(agreeData[newIdx - 1].content);
         chkAgrWrap.attr('data-agree', newIdx);
       }
       afterInnerHtml ()
    })
	// 다음 버튼
    nextBtn.on('click', function () {
      var current = parseInt(chkAgrWrap.attr('data-agree'));
      var newIdx = current + 1;
      if (newIdx - 1 === checkkItemLeng) {
        title.html(agreeData[0].title);
        content.html(agreeData[0].content);
        chkAgrWrap.attr('data-agree', 1);
      } else {
        title.html(agreeData[newIdx - 1].title);
        content.html(agreeData[newIdx - 1].content);
        chkAgrWrap.attr('data-agree', newIdx);
      }
      afterInnerHtml ()
    });
	
    function afterInnerHtml () {
		$('[data-element="tab"]').tab();
		$('[data-element="accordion"]').accordion();
    }

  }

  $('.agree-wrap').checkAgree(agreeData); // agree-wrap 전체동의 wrap
/////////////////////////////////////////////////////////////////////////////////////////////////////
  // 노선별 주의사항 확인 동의
 if(routeCheck > 1) { // 복수 존재
	  var routeData = [];

	switch(routeCheck) {
		case 1 : routeData.push({ title: $("#firstRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
			     				content: $("#firstRouteInfoModalLayer > .modal-content").html() }); break;
		
		case 2 : routeData.push({ title: $("#firstRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
			     				content: $("#firstRouteInfoModalLayer > .modal-content").html() }); 
				 routeData.push({ title: $("#secondRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
				      	        content: $("#secondRouteInfoModalLayer > .modal-content").html() }); break;
		
		case 3 : routeData.push({ title: $("#firstRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
			     				content: $("#firstRouteInfoModalLayer > .modal-content").html() }); 
				 routeData.push({ title: $("#secondRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
				      	        content: $("#secondRouteInfoModalLayer > .modal-content").html() }); 
				 routeData.push({ title: $("#thirdRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
						      	content: $("#thirdRouteInfoModalLayer > .modal-content").html() });	break;
	
		case 4 : routeData.push({ title: $("#firstRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
			     				content: $("#firstRouteInfoModalLayer > .modal-content").html() }); 
				 routeData.push({ title: $("#secondRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
				      	        content: $("#secondRouteInfoModalLayer > .modal-content").html() }); 
				 routeData.push({ title: $("#thirdRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
						      	content: $("#thirdRouteInfoModalLayer > .modal-content").html() });	
				 routeData.push({ title: $("#fouthRouteInfoModalLayer > .modal-header > .modal-header__title").html(),
			      				content: $("#fouthRouteInfoModalLayer > .modal-content").html() }); break;
	}
	// 노선별 주의사항 확인 동의
	$.fn.checkRouteAgree = function (routeData) {
		var routeData = routeData; // 약관 및 규정 동의 내용들
	    var chkAgrWrap = this; 
	    var checkAllBtn = chkAgrWrap.find('#inpAgree-05'); // 전체동의 버튼
	    /*var checkBtn = chkAgrWrap.find('.agree-wrap__item .item-inner'); // 각 체크버튼
	    var agreeViewBtn = $('.agree-wrap__button'); // 각 동의 버튼*/
		var checkkItemLeng = routeData.length; // 각 동의 영역 개수
	    var allAgree = $('#btnAgree05'); // 모두동의 영역
	    var title = $('#allRouteInfoModalLayer .modal-header__title'); // 타이틀
	    var content = $('#allRouteInfoModalLayer .modal-content'); // 내용
	    var modalCheckAll = $('#btnAgree05'); // 모두동의
	    var prevBtn = $('#allRouteInfoModalLayer .agree-prev'); // 이전
	    var nextBtn = $('#allRouteInfoModalLayer .agree-next'); // 다음
		
		// 전체동의 버튼
	    checkAllBtn.on('click', function () {
	        var checkProp = $(this).prop('checked');
	       	if (checkProp) {
	        	$(this).prop('checked', false);  
	         	openAgree ('all');
	       	}
	    });
	
		// 팝업 모두동의 버튼
	    allAgree.on('click', function () {
	        var checkBtn = chkAgrWrap.find('.agree-wrap__item .checkbox__input');
	    });
		// 모두 동의 버튼
	    modalCheckAll.on('click', function () {
	        $('.route_wrap .checkbox__input').prop('checked', true);
			$("button[name=btnNext]").attr("disabled", false);
		    $('button[name=btnNext]').addClass('button--active');
	        //$('.modal__close').click();
	  		$.modal.close();
	    });
	
	    function openAgree (index) {
	   		var index = index;
	   		if (index == 'all') {
	      		title.html(routeData[0].title);
	      		content.html(routeData[0].content);
	      		modalCheckAll.show();
	      		prevBtn.show();
	      		nextBtn.show();
	      		chkAgrWrap.attr('data-agree', 1)
	   		}
	   		//$('.open-modal').click();
			openModal("#allRouteInfoModalLayer", "full");
	       	afterInnerHtml ()
	    }
		// 이전 버튼
	    prevBtn.on('click', function () {
	        var current = chkAgrWrap.attr('data-agree');
	        var newIdx = current - 1;
	        if (newIdx === 0) {
	           title.html(routeData[checkkItemLeng - 1].title);
	           content.html(routeData[checkkItemLeng - 1].content);
	           chkAgrWrap.attr('data-agree', checkkItemLeng);
	        } else {
	           title.html(routeData[newIdx - 1].title);
	           content.html(routeData[newIdx - 1].content);
	           chkAgrWrap.attr('data-agree', newIdx);
	        }
	        afterInnerHtml ()
	    })
		// 다음 버튼
	    nextBtn.on('click', function () {
	        var current = parseInt(chkAgrWrap.attr('data-agree'));
	        var newIdx = current + 1;
	        if (newIdx - 1 === checkkItemLeng) {
	          title.html(routeData[0].title);
	          content.html(routeData[0].content);
	          chkAgrWrap.attr('data-agree', 1);
	        } else {
	          title.html(routeData[newIdx - 1].title);
	          content.html(routeData[newIdx - 1].content);
	          chkAgrWrap.attr('data-agree', newIdx);
	        }
	        afterInnerHtml ()
	    });
		
	    function afterInnerHtml () {
			$('[data-element="tab"]').tab();
			$('[data-element="accordion"]').accordion();
	    }
	
	  }
	
	  $('.route_wrap').checkRouteAgree(routeData); // agree-wrap 전체동의 wrap
 }
});	// ready	

const openModal = function(mTarget, mType) {
	$("#btnModalOpen").data("target", mTarget);
	$("#btnModalOpen").data("modal-type", mType);
	$("#btnModalOpen").trigger("click");
};

$(document).on('click', '#taxButton', function() {
	$.modal.close();
});