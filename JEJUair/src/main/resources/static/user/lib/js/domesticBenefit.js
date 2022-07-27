/**
 * @file 국내선 운임안내
 * @since 2021.08.10
 * @author 김현욱
 * @description
 *      2021.08.10 김현욱        / 최초작성
 *
 * Copyright (c) 2021 AKIS Inc. All Rights Reserved
 */

/* 업무 변수 */
var DOMESTIC_BENEFIT_VARIABLES = {

	
}

/* 업무 스크립트 */
var DOMESTIC_BENEFIT_SCRIPT = {
	_variables : DOMESTIC_BENEFIT_VARIABLES,
	
	/**
	 * 초기화
	 */
	init : function() {
		var _that = this;
		BIZ_COMMONS_SCRIPT.callI18n("0000000446")
		_that.getPeakSeason(dUtil.toDate().substr(0,4));
		_that.getBaf();
	},
	
	/**
	 * 국내선 성수기 안내
	 * @param 
	 */
	getPeakSeason : function (year) {
		var langCd = $('#langCd').val();
		year = Number(year);
		var params = {
			"url": '/'+langCd+'/prepare/fare/seasonPeak.json',
			"body" : {
			    "cultureCode" : "ko-KR"
			    , "applyYear" : year
			    , "cntryCd" : "KR"
			    , "routeType" : "D"
			}
		}

		Api.post(params, function(results) {
			if(results.data && results.data.seasonPickList){
				var $col = $("<div class='col' />");
				var $table_caption = $("<div class='table-caption' />");
				var $table_horizontal = $("<div class='table-horizontal'/>");
				var $table = $("<table />");
				var $caption = $("<caption />");
				var $tbody = $("<tbody class='table-horizontal__tbody' />");
                var y ;
		
				$col.append($table_caption).append($table_horizontal.append($table.append($caption).append($tbody)));
				$col.find(".table-caption").empty();

				$(results.data.seasonPickList).each(function(i,v){
                    // 첫 해
                    if(i == 0){
                        y = v.applyYear;
                        $col.find(".table-caption").text(y+BIZ_COMMONS_SCRIPT.getI18n("0000000446.msg00035", "년 성수기"));
                        $col.find(".table-horizontal table caption").text(y+BIZ_COMMONS_SCRIPT.getI18n("0000000446.msg00035", "11년 성수기"));
                    }
                    // 그 다음 해
                    if(y != v.applyYear){
                        y = v.applyYear;
                        
                        $("#domesticPick .pc-col2").append($col);
                        
                        $col = $("<div class='col' />");
                        $table_caption = $("<div class='table-caption' />");
                        $table_horizontal = $("<div class='table-horizontal'/>");
                        $table = $("<table />");
                        $caption = $("<caption />");
                        $tbody = $("<tbody class='table-horizontal__tbody' />");
                        $col.append($table_caption).append($table_horizontal.append($table.append($caption).append($tbody)));
                        $col.find(".table-caption").empty();
                        $col.find(".table-caption").text(y+BIZ_COMMONS_SCRIPT.getI18n("0000000446.msg00035", "년 성수기"));
                        $col.find(".table-horizontal table caption").text(y+BIZ_COMMONS_SCRIPT.getI18n("0000000446.msg00035", "년 성수기"));
                    }
                    
					var $trtd = $("<tr><td class='table-horizontal__td'>"+v.applyStartDt + " ~ " + v.applyEndDt+"</td></tr>");
					$col.find('.table-horizontal__tbody').append($trtd);
				});
				
				$("#domesticPick .pc-col2").append($col);
		
			}
			
		}, function(error) {
			console.log(error);
		});
	},

	//유료할증료
	getBaf : function() {
		var langCd = $('#langCd').val();
        var params = {
			"url": '/'+langCd+'/prepare/fare/baf.json',
			"body" : {
				inputTypeDivCd:'TDTP000007'
			}
		}
		Api.post(params, function(results) {	
			var details = results.data.mtxTt;
			bbr._convertDatas('newView',details);
		}, function(error) {
			console.log(error);
		});
	}
}

/* JQUERY */
$(document).ready(function(){
	DOMESTIC_BENEFIT_SCRIPT.init();
	
	$(document)
		.on("click", "#domesticPenalty", function(ev) {
			location.href = $("#imgPath").val() + $(this).attr("data-path");
		});
	
	//리스트 가이트 랜들링 하기 위함
	$(document).on('evt:bbr',function(e,datas){
		//요약 정보
		try{
			var infos = datas['ITTP000030'];
			var items = infos.split('\n');
			
			var vHtml = '';
			for(var i=0;i<items.length;i++) {
				vHtml +=  '<li class="list-guide__item">'
						+ items[i]
						+ '</li>'
			}
			$('#listGuide'+datas['grp1']).html(vHtml);
		}catch(e){}
	});
	
});