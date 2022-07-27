/**
 * @file 공항정보
 * @since 2021.08.04
 * @author 백승건
 * @description
 *      2021.08.04 백승건 (신한DS) / 최초 구축 프로젝트 / 최초 작성
 *
 * Copyright (c) 2021 AKIS Inc. All Rights Reserved
 */

 /* 업무 변수 */
 var LINKSERVICE_AIRPORT_VARIABLES = {
}

/* 업무 스크립트 */
var LINKSERVICE_AIRPORT_SCRIPT = {
    /**
     * 초기화
     */
    init: function() {
    },
	/**
	 * 공항관리화면코드로 공항정보 검색하기
	 * @param {string} boardingNo 
	 */
	search : function(boardingNo) {
		if(boardingNo == "") {
			$(".airport-info").hide();
			return;
		} else {
			$(".airport-info").show();
		}
		var that = this;
		var params = {
			"url": '/api/linkService/airport/info.json',
			"body" : {
				'boardingNo' : boardingNo
			}
		}
		Api.post(params, function(results) {	
			that.infoWrite(results);
		}, function(error) {});
	},
	/**
	 * 화면에 데이터를 그린다.
	 * @param {string} data 
	 */
	infoWrite : function(data) {
		var code = data.code;
		var d = data.data;
		if(code != "0000") {
			return;
		}
		if(d.filePathCont == "" || d.filePathCont === undefined) {
			$("#airportImage").html("");
			$("#airportImage").hide();
		} else {
			var $img = $("<div class='banner_single-img' style='background-image: url(" + $("#imgPath").val()+d.filePathCont + ")'></div>");
			$img.attr("alt", d.replacementTextNm);
			$("#airportImage").html($img);
			$("#airportImage").show();
		}
		$("#boldCountryNm").html(d.popupNm);
		$("#tableCaption").html(d.airportNm);
		$("#tableAirportNm").html(d.airportNm);
		$("#tableAirportAddress").html(d.locationCont);
		$("#tableAirportKiosk").html(d.kioskUsePsbleCont);
		$("#tableEntryInfoCont").html(d.entryInfoCont);
		$("#tableAirportInfomation").html(d.counterInfoCont.replaceAll("\n","<br>"));

		
		if(d.airportHomepageUrlCont == "") {
			$("#tableAirportHomepage").html("");
		} else {
			var $hompageLink = $("<a></a>");
			$hompageLink.attr('target', '_blank');
			$hompageLink.attr('href', d.airportHomepageUrlCont);
			$hompageLink.text(d.airportHomepageUrlCont);
			$("#tableAirportHomepage").html($hompageLink);
		}

	}
}

$(document).ready(function () {
	LINKSERVICE_AIRPORT_SCRIPT.init();
	$('#airportChange').on('change', function (e) {
		var $this = $(this);
		var boardingNo = $this.val();
		LINKSERVICE_AIRPORT_SCRIPT.search(boardingNo);
	});

	if(typeof location.hash !== 'undefined') {
		var boardingNo = location.hash.substring(1);
		$('#airportChange').val(boardingNo).trigger('change');
	}
});
