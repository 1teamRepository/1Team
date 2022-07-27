/**
 * @file 사전좌석운임조회
 * @since 2021.08.11
 * @author 김현욱
 * @description
 *      2021.08.11 김현욱        / 최초작성
 *
 * Copyright (c) 2021 AKIS Inc. All Rights Reserved
 */

/* 업무 변수 */
var PRE_ORDERED_SEAT_VARIABLES = {
	data : {
		zoneCodeList : ['PSBA000000' , 'PSBB000000' , 'PSBC000000' , 'PSBD000000']
		,zone1 : "PSBA000000"
		,zone2 : "PSBB000000"
		,zone3 : "PSBC000000"
		,zone4 : "PSBD000000"
		,zoneFlag : {
			default :{
				zone1_1 : "0000000275"
				,zone1_2 : "0000000276"
				,zone1_3 : "0000000277"
				,zone1_4 : "0000000278"
				,zone2_4 : "0000000517"
			}
			,bizlite : {
				zone1_1 : "0000000270"
				,zone1_2 : "0000000271"
				,zone1_3 : "0000000272"
				,zone1_4 : "0000000273"
				,zone2_4 : "0000000516"
				
			}
		}
	}
	
}

/* 업무 스크립트 */
var PRE_ORDERED_SEAT_SCRIPT = {
	_variables : PRE_ORDERED_SEAT_VARIABLES,
	
	/**
	 * 초기화
	 */
	init : function() {
		var _that = this;
		//BIZ_COMMONS_SCRIPT.callI18n("0000000519")
		//_that.makeDepatureList();
		BIZ_COMMONS_SCRIPT.callI18n("0000000519", function() {_that.makeDepatureList()})
		this.dataCall("#termBox01");
	},
	
	/**
	 * 출발지 생성
	 * @param 
	 */
	makeDepatureList : function () {
		var _that = this;
		var langCd = $('#langCd').val();
		var params = {
			"url": '/'+langCd+'/additionalService/service/selectCommonCodeList.json',
			"body" : {
			    langCd : langCd
				, hcommCdList :  _that._variables.data.zoneCodeList
			}
		}
		
		_that.callApiPost(params , function(result) {
			if(result.data && result.data.commonCodeList){
				
				var $dCity = $("#depature-city");
				var $opt = $("<option />" , {text:BIZ_COMMONS_SCRIPT.getI18n("0000000519.msg00016", "출발지 선택"),value:""}); //"출발지 선택"
				$dCity.append($opt);
				
				$(result.data.commonCodeList).each(function(i,v){
					$opt = $("<option />"  , {text:v.mnlNm , value:v.hcommCd} );
					$dCity.append($opt);
				});
				
				$("#arrival-city").append($("<option />" , {text:BIZ_COMMONS_SCRIPT.getI18n("0000000519.msg00017", "도착지 선택"),value:""})); //"도착지 선택"
				
			}
		});
	},
	
	/**
	 * 도착지 생성
	 * @param string 
	 */
	makeArrivalList : function (hcommCd) {
		var _that = this;
		var zone ;
		
		if(hcommCd == _that._variables.data.zone1){
			zone = [_that._variables.data.zone1,_that._variables.data.zone2,_that._variables.data.zone3,_that._variables.data.zone4];
		} else if (hcommCd == _that._variables.data.zone2) {
			zone = [_that._variables.data.zone1,_that._variables.data.zone4];
		} else if (hcommCd == _that._variables.data.zone3) {
			zone = [_that._variables.data.zone1];
		} else if (hcommCd == _that._variables.data.zone4) {
			zone = [_that._variables.data.zone2,_that._variables.data.zone1];
		} else {
			return false;
		}
		
		var langCd = $('#langCd').val();
		var params = {
			"url": '/'+langCd+'/additionalService/service/selectCommonCodeList.json',
			"body" : {
			    langCd : langCd
				, hcommCdList :  zone
			}
		}
		
		_that.callApiPost(params , function(result) {
			if(result.data && result.data.commonCodeList){
				
				var $aCity = $("#arrival-city");
				$aCity.empty();
				var $opt = $("<option />" , {text:BIZ_COMMONS_SCRIPT.getI18n("0000000519.msg00017", "도착지 선택"), value:""}); //"도착지 선택"
				$aCity.append($opt);
				
				$(result.data.commonCodeList).each(function(i,v){
					$opt = $("<option />"  , {text:v.mnlNm , value:v.hcommCd} );
					$aCity.append($opt);
				});
			}
		});
	},
	
	/**
	 * 좌석 운임 조회
	 * @param 
	 */
	makeSeatPrice : function (depCityZoneCd,arrCityZoneCd) {
		var _that = this;
		var dafaultCategoryNo;
		var bizliteCategoryNo;
		var imgPath = $("#imgPath").val();

		/*
		* zone1-zone1 은 zone1->zone1
		* zone1-zone2 는 zone1->zone2, zone2->zone1
		* zone1-zone3 은 zone1->zone3, zone3->zone1
		* zone1-zone4 는 zone1->zone4, zone4->zone1
		* zone2-zone4 는 zone2->zone4, zone4->zone2
		*/
		var zone1 = _that._variables.data.zone1;
		var zone2 = _that._variables.data.zone2;
		var zone3 = _that._variables.data.zone3;
		var zone4 = _that._variables.data.zone4;

		if (zone1 == depCityZoneCd && zone1 == arrCityZoneCd) {
			dafaultCategoryNo = _that._variables.data.zoneFlag.default.zone1_1;
			bizliteCategoryNo = _that._variables.data.zoneFlag.bizlite.zone1_1;

		} else if ((zone1 == depCityZoneCd && zone2 == arrCityZoneCd) || (zone2 == depCityZoneCd && zone1 == arrCityZoneCd)) {
			dafaultCategoryNo = _that._variables.data.zoneFlag.default.zone1_2;
			bizliteCategoryNo = _that._variables.data.zoneFlag.bizlite.zone1_2;
			
		}  else if ((zone1 == depCityZoneCd && zone3 == arrCityZoneCd) || (zone3 == depCityZoneCd && zone1 == arrCityZoneCd)) {
			dafaultCategoryNo = _that._variables.data.zoneFlag.default.zone1_3;
			bizliteCategoryNo = _that._variables.data.zoneFlag.bizlite.zone1_3;
			
		}  else if ((zone1 == depCityZoneCd && zone4 == arrCityZoneCd) || (zone4 == depCityZoneCd && zone1 == arrCityZoneCd)) {
			dafaultCategoryNo = _that._variables.data.zoneFlag.default.zone1_4;
			bizliteCategoryNo = _that._variables.data.zoneFlag.bizlite.zone1_4;

		}  else if ((zone2 == depCityZoneCd && zone4 == arrCityZoneCd) || (zone4 == depCityZoneCd && zone2 == arrCityZoneCd)) {
			dafaultCategoryNo = _that._variables.data.zoneFlag.default.zone2_4;
			bizliteCategoryNo = _that._variables.data.zoneFlag.bizlite.zone2_4;
		}
				
		
		
		var langCd = $('#langCd').val();
		var params = {
			"url": '/'+langCd+'/additionalService/service/selectZoneInfo.json',
			"body" : {
			    langCd : langCd
				, categoryNo :  bizliteCategoryNo
			}
		}
		
		_that.callApiPost(params , function(result) {
			if(result.data){
				$("#seat-contents .plan_lite").empty();
				$("#seat-contents .plan_lite").html(result.data.editorCont);
				
				var $img = $("<img />" , {src:imgPath+result.data.filePathCont , alt:BIZ_COMMONS_SCRIPT.getI18n("0000000519.msg00018", "좌석 배치 안내 이미지")}) // "좌석 배치 안내 이미지"
				$("#seat-contents .select-seat__plan .plan_lite").empty();
				$("#seat-contents .select-seat__plan .plan_lite").html($img);
				
			}
		});
		
		params.body.categoryNo = dafaultCategoryNo;
		_that.callApiPost(params , function(result) {
			if(result.data){
				$("#seat-contents .plan_normal").empty();
				$("#seat-contents .plan_normal").html(result.data.editorCont);
				
				var $img = $("<img />" , {src:imgPath+result.data.filePathCont , alt:BIZ_COMMONS_SCRIPT.getI18n("0000000519.msg00018", "좌석 배치 안내 이미지")}) //"좌석 배치 안내 이미지"
				$("#seat-contents .select-seat__plan .plan_normal").empty();
				$("#seat-contents .select-seat__plan .plan_normal").html($img);
			}
		});
		
		$("#seat-contents").show();
	},
	
	
	
	/**
	 * api 조회
	 * @param 
	 */
	callApiPost : function (params , cb) {
		Api.post(params, function(results) {
			cb(results);
		}, function(error) {
			cb("");
			console.log(error);
		});
	},

	/**
	 * 약관 조회
	 * @param {*} selector 
	 * @param {*} categoryNo 
	 */
	dataCall : function(selector) {
		var params = {
			"url": '/api/common/biz/term.json',
			"body" : {
				categoryNo: "0000000018"
			}
		}

		Api.post(params, function(results) {	
			var code = results.code;
			if(code != "0000") {
				return;
			}

			var data = results.data || {};
			var info = data.info || {};

			$(selector).html(info.editorCont);
		
		}, function(error) {});
	},
	
	/**
	 * 구매 링크 211001 수정
	 */
	buySeat : function(authorities) {
		
		if(authorities){
			location.href = "/"+I18N.language+"/ibe/mypage/viewReservationList.do";
		} else {
			location.href = "/"+I18N.language+"/ibe/mypage/viewOnOffReservationList.do";
		}
		
	}
	
	
}

/* JQUERY */
$(document).ready(function(){
	PRE_ORDERED_SEAT_SCRIPT.init();
	
	$(document)
		.on("change", "#depature-city", function(ev) {
			var hcommCd = $(this).find(":selected").val();
			if(hcommCd == ""){
				return false;
			}
			
			PRE_ORDERED_SEAT_SCRIPT.makeArrivalList(hcommCd);
		})
		
		.on("click", "#searchSeatBtn", function(ev) {
			var depCityZoneCd = $("#depature-city :selected").val();
			var arrCityZoneCd = $("#arrival-city :selected").val();

			if(depCityZoneCd == ""){
				alert(BIZ_COMMONS_SCRIPT.getI18n("0000000519.msg00019", "출발지를 선택해주세요")); //"출발지를 선택해주세요"
				return false;
			}
			if(arrCityZoneCd == ""){
				alert(BIZ_COMMONS_SCRIPT.getI18n("0000000519.msg00020", "도착지를 선택해주세요")); //"도착지를 선택해주세요"
				return false;
			}
			
			PRE_ORDERED_SEAT_SCRIPT.makeSeatPrice(depCityZoneCd,arrCityZoneCd);
		})
		
		.on('change',"#switchItem1", function () {
			var checkChecked = $(this).prop('checked');
			if (checkChecked) {
				// 비지니스 라이트
				$('.plan_lite').show();
				$('.plan_normal').hide();
			} else {
				// 일반좌석
				$('.plan_lite').hide();
				$('.plan_normal').show();
			}
		})
		
		/*.on('click',"#buySeat", function () {
			PRE_ORDERED_SEAT_SCRIPT.buySeat();
		});*/
		
		
	
});