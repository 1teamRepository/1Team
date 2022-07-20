BIZ_COMMONS_SCRIPT.callI18n("0000000307")
const weekLang = I18N.language
var autoCompleteAirport = function autoCompleteAirport(airportACData, sourceDatas) {
	var select = false;
	$('#'+airportACData.txtAirportId).autocomplete({
		appendTo : '#' + airportACData.divAirportACId,
		autoFocus: false,
		delay: 0,
		minLength: 1,
		source: sourceDatas,
		close: function() {
			$(this).removeClass('ui-corner-top').addClass('ui-corner-all');
			$(this).autocomplete('widget').find('li').remove();
		},
		open: function(event, ui) {
			$('ul[id^=ui-id]').css("width", "");
			$('ul[id^=ui-id]').css("top", "");
			$('ul[id^=ui-id]').css("left", "");
			$(this).removeClass('ui-corner-all').addClass('ui-corner-top');
		},
		select: function(event, ui) {
			//출도착지 자동 완성 결과 클릭시 값 저장
			if(ui.item) {
				if(event.target.id.indexOf("MultiDEP") > -1){
					ui.item.stationType ="MultiDEP"
				}else if(event.target.id.indexOf("MultiARR") > -1){
					ui.item.stationType ="MultiARR"
				}else if(event.target.id.indexOf("DEP") > -1){
					ui.item.stationType ="DEP"
				}else if(event.target.id.indexOf("ARR") > -1){
					ui.item.stationType ="ARR"
				}
				setAirportInfo(ui.item);				
			}
		},
		focus: function(event, ui) {
			return false;
		}
	}).focusout(function(event, ui) {
		$(this).val('');
		//$(this).next().next().next().find('div[name=search_auto] > ul').children().remove();
	}).keypress(function(event, ui) {
		var key = event.which || event.keyCode;
		if(key == 27) { // ESC Key
			$(this).val('');
		}else if(key == 13) { // ENTER Key
			if($(this).autocomplete('widget').find('li').length == 1) {
				event.preventDefault();
				$(this).autocomplete('widget').find('li').click();			
				return false;
			}
		}
	}).autocomplete('instance')._renderItem = function(ul, item) {
		$('span[aria-live="assertive"]').remove();	
    	if(navigator.userAgent.indexOf('Firefox') > -1) {
	        var targetId = ul.parent().attr('target'),target = $('#'+targetId);
	    	if(isKoreanChar(target.val())) {
	    		var $inner = ul.closest('.inner');
	    		$inner.find('div[name=search_lately]').hide();
	    		$inner.find('div[name=search_auto]').show();
	    	}
        }
    	let label,value;
		label = item.value;				
		var lowerLabel = label.toLowerCase();
		var tempTerm = this.term;	
		var insertFIndex = lowerLabel.search(tempTerm.toLowerCase());	
		if(insertFIndex > -1) {
			var insertLIndex = insertFIndex + this.term.length;			
			label = label.substr(0, insertLIndex) + '</span>' + label.substr(insertLIndex);
			label = label.substr(0, insertFIndex) + '<span class="match">' + label.substr(insertFIndex);
			label = '<span class="name">'+label + '</span>';
		}else {			
			label = '<span class="name">'+label + '</span>';
		}		
    	var $li	= $('<li/>').appendTo(ul);
        $('<div/>').addClass('predictive-search__item').html(label).appendTo($li);
        return $li;
	};
};

function selectDepartureAirports(type) {
	$.ajax({
		url: searchUrl+'/'+I18N.language+'/ibe/booking/selectDepartureStations.json',
		type: 'POST',
		beforeSend: function (request)
        {
			request.setRequestHeader("Channel-Code", cname);
            request.setRequestHeader("User-Id", typeof JSON.parse(USER_INFO.get()).userId != 'undefined' ? JSON.parse(USER_INFO.get()).userId : "");
			request.setRequestHeader("User-Name", encodeURIComponent(JSON.parse(USER_INFO.get()).name) != 'undefined' ? encodeURIComponent(JSON.parse(USER_INFO.get()).name) : "");			
        },
		data	: {
			bookType : bookType,
			cultureCode : cultureCode.replace("_","-"),
			pageId : pageId
		},    
		success: function (data) {
			paintAirports(data.data.data.stations , type);			
			if(type =='MultiDEP'){
				//최근검색
				setRecentSearchAirports('MultiDEP');
				// 즐겨찾기 
				selectFavoritesAirports();
			}	
			//이벤트 링크 param 을 전달 받은 경우		
			if(typeof cmsDepStn != 'undefined' && cmsDepStn !=''){
				if(cmsArrStn !=''){
					$('.ticketing-type .item-btn').eq(0).trigger('click');
				}else{
					$('.ticketing-type .item-btn').eq(1).trigger('click');
				}
				let trip = {}
				for(let i=0; i<$("#depAirportLayer").find('div.tab__panel-wrap').find('.choise__button').length; i++){
				    if ($("#depAirportLayer").find('div.tab__panel-wrap').find('.choise__button').eq(i).data('stationcode') === cmsDepStn) {
						trip = {
								stationCode: cmsDepStn,
								stationType : 'DEP',
								stationName : $("#depAirportLayer").find('div.tab__panel-wrap').find('.choise__button').eq(i).data('stationname'),
								countryCode : $("#depAirportLayer").find('div.tab__panel-wrap').find('.choise__button').eq(i).data('countrycode')							
							};
						$("#depAirportLayer").data("target" , "spanDepartureDesc")	
						break;
				    }
				}
				setAirportInfo(trip);
			}				
		}
	});
}

function paintAirports(result , type) {
	const Airports = result;
	const uniqueAreaNames = getUniqueObjectArray(Airports, 'area');
	//공항 정보 paint 전 지역 , 공항 초기화 
	if(type==="DEP"){
		//Panel 초기화
		$("#divDepArea").eq(0).html("")	
		$("#divDepArea").next().html("")
		//Map 초기화
		$(".tab-top-list").eq(0).html("")
	}else if(type==="MultiDEP"){
		$("#divMultiDepArea").eq(0).html("")	
		$("#divMultiDepArea").next().html("")
	}else if(type==="ARR"){
		$("#divArrArea").eq(0).html("")	
		$("#divArrArea").next().html("")
		$(".tab-top-list").eq(1).html("")
	}else if(type==="MultiARR"){
		$("#divMultiArrArea").eq(0).html("")	
		$("#divMultiArrArea").next().html("")
	}	
	uniqueAreaNames.forEach(function(areaName , index) {
		let areaCode = "";
		for(let i=0; i<Airports.length; i++){
			if(Airports[i].area === areaName){
				areaCode = Airports[i].areaCode
				break;
			}
		}
		paintTabAnchor(index , areaName , areaCode ,type);
		paintTabPanel(index , areaName, Airports , type);		
	});
	var airportACData = {
		txtAirportId	: 'txt'+type+'Airport',
		divAirportACId	: 'div'+type+'AirportAC'
	};	
	autoCompleteAirport(airportACData , Airports)
	
	//tab plugin
	if(type==="DEP"){
		$("#divDepArea").closest(".main--destination-select").tab()
		if(window.location.href.indexOf('AvailSearch')==-1 ){
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(findNearestStore);	
			}
		}	
	}else if(type==="MultiDEP"){
		$("#divMultiDepArea").closest(".main--destination-select").tab()	
	}else if(type==="ARR"){
		$("#divArrArea").closest(".main--destination-select").tab()	
	}else if(type==="MultiARR"){
		$("#divMultiArrArea").closest(".main--destination-select").tab()	
	}
}

function findNearestStore(position) {
	if(typeof $("#departureData").data('stationcode') =='undefined'){
		let latitude = position.coords.latitude;
		let longitude = position.coords.longitude;
		let maxDistance = 9999
		let selectedIdx = 0;
		for(let i=0; i<$("#depAirportLayer").find('div.tab__panel-wrap').find('.choise__button').length; i++){
		    if (distance(latitude , longitude , $("#depAirportLayer").find('div.tab__panel-wrap').find('.choise__button').eq(i).data('latitude'), 
				$("#depAirportLayer").find('div.tab__panel-wrap').find('.choise__button').eq(i).data('longitude'), "K") <= maxDistance) {
				maxDistance = 	distance(latitude , longitude , $("#depAirportLayer").find('div.tab__panel-wrap').find('.choise__button').eq(i).data('latitude'), 
				$("#depAirportLayer").find('div.tab__panel-wrap').find('.choise__button').eq(i).data('longitude'), "K");
		        selectedIdx = i;
		    }
		}
		$("#depAirportLayer").data("target" , "spanDepartureDesc")
		$("#depAirportLayer").find('div.tab__panel-wrap').find('.choise__button').eq(selectedIdx).trigger('click');
	}
}

function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = Math.PI * lat1/180
  var radlat2 = Math.PI * lat2/180
  var theta = lon1-lon2
  var radtheta = Math.PI * theta/180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  if (unit=="K") { dist = dist * 1.609344 }
  if (unit=="N") { dist = dist * 0.8684 }
  return dist
}

// 지역명의 중목 제거
function getUniqueObjectArray(array, key) {
	const unique = array.map(function (val, index) {
		return val[key];
	}).filter(function (val, index, arr) {
		return arr.indexOf(val) === index;
	});
	return unique;
}

function paintTabAnchor(index , areaName , areaCode , type) {	
	//첫번째 구간의 도착지의 국가와 두번째 구간의 출발지 국가가 동일해야함
	if(tripType ==='MT' && type === 'MultiDEP' && $("#arrivalData").data("areacode") != areaCode){
	}else{	
		let anchorListHtml = '<div data-element="tab__list" class="tab__button" role="presentation">'
		+'<button type="button" tabindex="" data-element="tab__anchor" role="tab" data-index="'+index+'" id="plugin-'+type+'tab-'+Number(index+2)+'"';
		if(index == 0){
			anchorListHtml+='class="tab__anchor is-active" aria-selected="true" aria-expanded="true"';
		}else{
			anchorListHtml+='class="tab__anchor" aria-selected="false" aria-expanded="false"';
		}
		anchorListHtml+='>'+areaName +'</button></div>';
	
		let anchorMapHtml ='<li class="tab-top-item"><a href="#" class="tab-top-btn" data-areacode="'+areaCode+'">'+areaName+'</a></li>';
		if(type==="DEP"){
			//Panel 정보
			$("#divDepArea").eq(0).append(anchorListHtml);
			//Map 정보
			$(".tab-top-list").eq(0).append(anchorMapHtml);
			if(index == 0){
				$(".tab-top-list").eq(0).find('a').addClass('on')
			}
		}else if(type==="MultiDEP"){
			$("#divMultiDepArea").eq(0).append(anchorListHtml);
		}else if(type==="ARR"){
			$("#divArrArea").eq(0).append(anchorListHtml)
			$(".tab-top-list").eq(1).append(anchorMapHtml);
			if(index == 0){
				$(".tab-top-list").eq(1).find('a').addClass('on')
			}
		}else if(type==="MultiARR"){
			$("#divMultiArrArea").eq(0).append(anchorListHtml)
		}
	}		
}

function paintTabPanel(index , areaName, Airports , type) {
	let tapPanelHtml = $('<div data-element="tab__panel" class="tab__panel" aria-labelledby="plugin-'+type+'tab-'+Number(index+2)+'" role="tabpanel" tabindex="0" style="display: none;"></div>');
	let mapBottomHtml = $('<div></div>');
	for(let i=0; i<Airports.length; i++){
		let airport = Airports[i];
		if (airport.area === areaName) {
			if(tripType ==='MT' && type === 'MultiDEP' && airport.countryCode !=  $("#arrivalData").data("countrycode")){
				var skipPanel = true
				if($("#arrivalData").data("countrycode") ==='MO' && airport.countryCode =='HK'){
					skipPanel = false;
				}
				if($("#arrivalData").data("countrycode") ==='HK' && airport.countryCode =='MO'){
					skipPanel = false;
				}
				if(skipPanel){
					continue;
				}
			}
			let longitude = Number(airport.longitude.replace(/[^0-9]/g,''))*0.0001
			let latitude = Number(airport.latitude.replace(/[^0-9]/g,''))*0.0001
			//편도 판매 날짜 체크
			if(airport.onlyOneWay ==='Y'){
				if(!(airport.oneWayPeriods[0].oneWayStart<=currentDate && currentDate<=airport.oneWayPeriods[0].oneWayEnd)){
					airport.onlyOneWay ='N'
				}
			}
			let tapPanelInnerHtml = '<div class="choise">'+
				'<button type="button" class="choise__button" data-countryCode="' + airport.countryCode + '" data-areacode="'+airport.areaCode+'" data-onlyoneway="'+airport.onlyOneWay+'"'+ 
				' data-latitude ="' + latitude +'" data-longitude ="' + longitude +'" data-stationcode ="' + airport.stationCode + '" data-stationType="' + type + '" data-stationName="' + airport.stationName + '">';
				if(cultureCode.substring(0,2) != 'en'){
					tapPanelInnerHtml+='<span class="stationName">' + airport.stationName + '</span><span class="airport">'+ airport.stationCode +'</span>';				
				}else{
					tapPanelInnerHtml+='<span class="stationName">' + airport.stationCode + '</span><span class="airport">'+ airport.stationName +'</span>';
				}
				tapPanelInnerHtml+='</button><div class="fav-check"><button type="button" onclick="javascript:clickBtnFavorites(this);" class="button-favorites">' +    
				'<span class="hidden">'+BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00072")+'</span></label></div></div>';
			//출도착 panel
			$(tapPanelHtml).append(tapPanelInnerHtml);
					
			let airportMap = airport;
			airportMap.id = airport.stationCode
			airportMap.longitude = Number(airportMap.longitude.replace(/[^0-9]/g,''))*0.0001+0.2
			airportMap.latitude = Number(airportMap.latitude.replace(/[^0-9]/g,''))*0.0001+0.2
			
			let mapBottomInnerHtml = $('<a class="tab-swipe-item swiper-slide"><div class="city-name">'+airport.stationName+'<span class="sub">'+airport.stationCode+'</span></div>'+
			'<button type="button" name="btnAAMChartAirport" class="btn-choose-city js-choose-city" data-countryCode="' + airport.countryCode + '"'+
			'data-areacode ="' + airport.areaCode +'" data-latitude ="' + airport.latitude +'" data-longitude ="' + airport.longitude +'"'+
			'data-stationcode ="' + airport.stationCode + '" data-stationType="' + type + '" data-stationName="' + airport.stationName + '">'+BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00111")+'</button>'+
			'<button type="button" onclick="javascript:clickBtnFavorites(this);" class="btn-wish"><span class="hidden">'+BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00072")+'</span></button></a>');									
			$(mapBottomInnerHtml).hide();
			if(cultureCode.substring(0,2) =='en'){
				$(mapBottomInnerHtml).find('.city-name').html(airport.stationCode+"<span class='sub'>"+airport.stationName+"</span>")
			}
			if(type =="DEP"){
				departureAiportsMap.push(airportMap);
				mapBottomHtml.append(mapBottomInnerHtml);	
			}else if(type=="ARR"){
				//연결구간이 아닌것만 지도 표시
				if(airportMap.connectYn ==='N'){				
					arrivalAiportsMap.push(airportMap);										
					if(airportMap.onlyOneWay ==='Y' && tripType != 'OW'){
						arrivalAiportsMap.pop();
					}else{
						mapBottomHtml.append(mapBottomInnerHtml);						
					}
				}			
			}			
			if(type.indexOf("ARR") > -1){
				//편도전용 노선 제거
				if(airportMap.onlyOneWay ==='Y' && tripType != 'OW'){
					$(tapPanelHtml).children().last().remove()
				}				
				if(tripType==='MT' && airportMap.connectYn ==='Y'){
					$(tapPanelHtml).children().last().remove()					
				}
			}
		}
		//항공권 선택화면에서 이미 출/도착지가 선택되어저있기 때문에 부족한 DATA SET
		if($("#departureData").data("stationcode") === airport.stationCode){
			$("#departureData").data("countrycode" , airport.countryCode)
		}
		if($("#arrivalData").data("stationcode") === airport.stationCode){
			$("#arrivalData").data("countrycode" , airport.countryCode)
		}
		if(tripType ==='MT'){
			if($("#multiDepartureData").data("stationcode") === airport.stationCode){
				$("#multiDepartureData").data("countrycode" , airport.countryCode)
			}
			if($("#multiArrivalData").data("stationcode") === airport.stationCode){
				$("#multiArrivalData").data("countrycode" , airport.countryCode)
			}
		}		
	}
	if(type==="DEP"){
		$("#depAirportLayer").find('div.tab__panel-wrap').append(tapPanelHtml);
		if(index ===0){
			$("#depAirportLayer").find('div.tab-swipe-wrapper')[0].innerText = "";			
			//panel
			$("#depAirportLayer").find('div.tab__panel-wrap').children("div")[0].classList.add("is-active")
			$("#depAirportLayer").find('div.tab__panel-wrap').children("div")[0].style.display="block";
			mapBottomHtml.children().show();
		}
		$("#depAirportLayer").find('div.tab-swipe-wrapper').append(mapBottomHtml.children());	
	}else if(type==="MultiDEP"){
		if($(tapPanelHtml).children('div').length > 0){
			$("#depMultiAirportLayer").find('div.tab__panel-wrap').append(tapPanelHtml);
			if(index ===0){			
				$("#depMultiAirportLayer").find('div.tab__panel-wrap').children("div")[0].classList.add("is-active")
				$("#depMultiAirportLayer").find('div.tab__panel-wrap').children("div")[0].style.display="block";
			}	
		}
	}else if(type==="ARR"){
		//connectYn , onlyOneWay 로 인해서 공항이 다 없어진 경우 지역도 hide처리
		if(tapPanelHtml.children().length == 0){
			$("#arrAirportLayer").find('#'+tapPanelHtml.attr('aria-labelledby')).eq(0).parent().remove()			
			$("#arrAirportLayer").find('.tab-top-list').children().eq(index).remove()			
		}else{
			$("#arrAirportLayer").find('div.tab__panel-wrap').append(tapPanelHtml);		
			//첫번째 지역 활성화
			if($("#arrAirportLayer").find('div.tab__panel-wrap').children(".is-active").length ==0){		
				//panel
				$("#arrAirportLayer").find('div.tab__panel-wrap').children("div")[0].classList.add("is-active")
				$("#arrAirportLayer").find('div.tab__panel-wrap').children("div")[0].style.display="block";
				//map 하단 버튼 초기화 / 상단 버튼 default 선택
				$("#arrAirportLayer").find('.tab-top-list').find('a').addClass('on')
				$("#arrAirportLayer").find('div.tab-swipe-wrapper')[0].innerText = "";	
				$("#arrAirportLayer").find('div.tab-swipe-wrapper').append(mapBottomHtml.children());		
				$("#arrAirportLayer").find('div.tab-swipe-wrapper').children('a').show();
			}else{
				$("#arrAirportLayer").find('div.tab-swipe-wrapper').append(mapBottomHtml.children());		
			}
		}
			
	}else if(type==="MultiARR"){
		//connectYn , onlyOneWay 로 인해서 공항이 다 없어진 경우 지역도 hide처리
		if(tapPanelHtml.children().length == 0){
			$("#arrMultiAirportLayer").find('#'+tapPanelHtml.attr('aria-labelledby')).eq(0).remove()			
			$("#arrMultiAirportLayer").find('.tab-top-list').children().eq(index).remove()				
		}else{
			$("#arrMultiAirportLayer").find('div.tab__panel-wrap').append(tapPanelHtml);
			//첫번째 지역 활성화
			if($("#arrMultiAirportLayer").find('div.tab__panel-wrap').children(".is-active").length ==0){
				$("#arrMultiAirportLayer").find('div.tab__panel-wrap').children("div")[0].classList.add("is-active")
				$("#arrMultiAirportLayer").find('div.tab__panel-wrap').children("div")[0].style.display="block";
			}		
		}		
	}	
}

function checkPromoCode(){
	$("#WarnPromoCode").removeClass("error");
	const promoCode = $("#txtPromoCode").val().trim().toUpperCase();
	let rst;
	let journeys = [];
	
	if(tripType !='MT'){
		const trip1 = {
			journeyNo : "1",
			departureStation : $("#departureData").data("stationcode"),
		    arrivalStation : $("#arrivalData").data("stationcode"),
		    travelDate: $("#departureDate").val().replace(/[^0-9]/g,'')
		}			
		journeys.push(trip1);
		if(tripType !='OW'){
			let trip2;
			trip2 = {
				journeyNo : "2",
				departureStation : $("#arrivalData").data("stationcode"),
		    	arrivalStation : $("#departureData").data("stationcode"),
		    	travelDate: $("#arrivalDate").val().replace(/[^0-9]/g,'')
			}
			journeys.push(trip2);
		}
	}else{
		const trip1 = {
			departureStation: $("#departureData").data("stationcode"),
			arrivalStation: $("#arrivalData").data("stationcode"),
		    travelDate: $("#departureDate").val().replace(/[^0-9]/g,'')
		}			
		journeys.push(trip1);
		if(tripType !='OW'){
			let trip2;
			trip2 = {
				departureStation: $("#multiArrivalData").data("stationcode"),
				arrivalStation: $("#multiDepartureData").data("stationcode"),
				travelDate: $("#multiArrivalData").val().replace(/[^0-9]/g,'')
			}
			journeys.push(trip2);
		}
	}
	
	const userData = {
		userId : JSON.parse(USER_INFO.get()).userId,
		ffpNo : JSON.parse(USER_INFO.get()).ffpNo,			
		customerNo : JSON.parse(USER_INFO.get()).customerNo
	}
	const user = {
		birthday : JSON.parse(USER_INFO.get()).birthDate		
	}
		
	const checkPromotion = {		
		journeys: journeys,		
		code : promoCode,
		tripType : tripType,
		routeType : domIntType,
		user : user
	};	
	$.ajax({		
		url: searchUrl+'/'+I18N.language+'/ibe/booking/checkPromotion.json',
		type: 'POST',
		async: false,
		beforeSend: function (request)
        {
			request.setRequestHeader("Channel-Code", cname);
            request.setRequestHeader("User-Id", typeof JSON.parse(USER_INFO.get()).userId != 'undefined' ? JSON.parse(USER_INFO.get()).userId : "");
			request.setRequestHeader("User-Name", encodeURIComponent(JSON.parse(USER_INFO.get()).name) != 'undefined' ? encodeURIComponent(JSON.parse(USER_INFO.get()).name) : "");
        },
		data	: {			
			checkPromotion : JSON.stringify(checkPromotion),
			userData : JSON.stringify(userData),
			pageId : pageId
		},    
		success: function (data) {
			rst =  data.data
		},
			error: function () {
		}
	});
	return rst	
}

function checkVoucher(){
	let rst;
	let journeys = [];
	
	if($("#selectGifticket").find(":selected").data('value').tripType != tripType){
		return '0001'
	}			
	
	if(domIntType =='D' && (jsAdtCount != '1' || jsChdCount != '0')){
		return '0002'
	}
	
	if(domIntType =='I' && (jsAdtCount != '1' || jsChdCount != '0' || jsInfCount != '0')){
		return '0003'
	}

	const userData = {
		userId : JSON.parse(USER_INFO.get()).userId,
		ffpNo : JSON.parse(USER_INFO.get()).ffpNo,			
		customerNo : JSON.parse(USER_INFO.get()).customerNo
	}
	if(tripType !='MT'){
		const trip1 = {
			journeyNo : "1",
			departureStation : $("#departureData").data("stationcode"),
		    arrivalStation : $("#arrivalData").data("stationcode"),
		    travelDate: $("#departureDate").val().replace(/[^0-9]/g,'')
		}			
		journeys.push(trip1);
		if(tripType !='OW'){
			let trip2;
			trip2 = {
				journeyNo : "2",
				departureStation : $("#arrivalData").data("stationcode"),
		    	arrivalStation : $("#departureData").data("stationcode"),
		    	travelDate: $("#arrivalDate").val().replace(/[^0-9]/g,'')
			}
			journeys.push(trip2);
		}
	}else{
		const trip1 = {
			departureStation: $("#departureData").data("stationcode"),
			arrivalStation: $("#arrivalData").data("stationcode"),
		    travelDate: $("#departureDate").val().replace(/[^0-9]/g,'')
		}			
		journeys.push(trip1);
		if(tripType !='OW'){
			let trip2;
			trip2 = {
				departureStation: $("#multiArrivalData").data("stationcode"),
				arrivalStation: $("#multiDepartureData").data("stationcode"),
				travelDate: $("#multiArrivalData").val().replace(/[^0-9]/g,'')
			}
			journeys.push(trip2);
		}
	}
		
	const checkVoucher = {		
		journeys: journeys,		
		voucherReferenceNo : $("#selectGifticket").find(":selected").data('value').voucherReferenceNo,
		voucherBasisCode : $("#selectGifticket").find(":selected").data('value').voucherBasisCode,
		tripType : tripType,
		routeType : domIntType,	
		rebook : false
	};	
	$.ajax({
		url: searchUrl+'/'+I18N.language+'/ibe/booking/checkVoucher.json',
		type: 'POST',
		async: false,
		beforeSend: function (request)
        {
			request.setRequestHeader("Channel-Code", cname);
            request.setRequestHeader("User-Id", typeof JSON.parse(USER_INFO.get()).userId != 'undefined' ? JSON.parse(USER_INFO.get()).userId : "");
			request.setRequestHeader("User-Name", encodeURIComponent(JSON.parse(USER_INFO.get()).name) != 'undefined' ? encodeURIComponent(JSON.parse(USER_INFO.get()).name) : "");		
        },	
		data	: {			
			checkVoucher : JSON.stringify(checkVoucher),
			userData : JSON.stringify(userData),
			pageId : pageId
		},    
		success: function (data) {
			rst =  data.data.code
		},
			error: function () {
		}
	});
	return rst	
}

function keyDownPromotion(event){	
	if($("#confirmModalLayer").is(":visible")){
		return;
	}
	if(USER_INFO.get() == '{}'){			
		fullPopOpen('confirmModalLayer')
	}
}

function preventClick(event){
	event.preventDefault();
}
//항공권 검색 버튼 활성화
function activeSearchFlight(){	
	let btndisFlag = true;			
	if(typeof $("#departureData").data("stationcode") != "undefined" && $("#arrivalData").data("stationcode") != null && $("#departureDate").val() != ""){
		btndisFlag = false;
	}
	if(tripType =='RT' && !btndisFlag){
		if($("#arrivalDate").val() != ""){
			btndisFlag = false;
		}
	}
	if(tripType =='MT' && !btndisFlag){
		btndisFlag = true;
		if(typeof $("#multiDepartureData").data("stationcode") != "undefined" && $("#multiArrivalData").data("stationcode") != null){
				btndisFlag = false;
		}
	}	
	$("#searchFlight").attr("disabled" , btndisFlag);
	if($(".air-flight-prev").length > 0){
		$(".air-flight-prev").attr("disabled", btndisFlag)
		$(".air-flight-next").attr("disabled", btndisFlag)
		if(availSearchDataJSON.tripRoute[0].originAirport != $("#departureData").data('stationcode') ||
				availSearchDataJSON.tripRoute[0].destinationAirport != $("#arrivalData").data('stationcode')){
			$(".air-flight-prev").attr("disabled", true)
			$(".air-flight-next").attr("disabled", true)
		}
	}	
}

function clickPromotionButton(event){
	let $target = $(this);	
	if($target.parents('.flight-layer').attr('id') ==='depAirportLayer' || $target.parents('.flight-layer').attr('id') ==='depMultiAirportLayer'){				
		let item = {}
		for(let i=0; i<$("#depAirportLayer").find('div.tab__panel-wrap').find('.choise__button').length; i++){
		    if ($("#depAirportLayer").find('div.tab__panel-wrap').find('.choise__button').eq(i).data('stationcode') === $target.data("depstationcode")) {
				item = {
					stationCode: $target.data("depstationcode"),
					stationName: $("#depAirportLayer").find('div.tab__panel-wrap').find('.choise__button').eq(i).data('stationname'),
					stationType : $target.data("depstationtype"),
					countryCode : $target.data("depcountrycode"),
					latitude : $target.data("deplatitude"),
					longitude : $target.data("deplongitude"),
					areaCode : $target.data("areacode")
				};
				//선택한 공항을 세팅
				$("#depAirportLayer").data("target" , "spanDepartureDesc")
				setAirportInfo(item);			
				break;
			}
		}
	}

	if($target.data("arrstationcode") != ''){
		for(let i=0; i<$("#depAirportLayer").find('div.tab__panel-wrap').find('.choise__button').length; i++){
		   if ($("#depAirportLayer").find('div.tab__panel-wrap').find('.choise__button').eq(i).data('stationcode') === $target.data("arrstationcode")) {
				item = {
					stationCode: $target.data("arrstationcode"),
					stationName: $("#depAirportLayer").find('div.tab__panel-wrap').find('.choise__button').eq(i).data('stationname'),
					stationType : $target.data("arrstationtype"),
					countryCode : $target.data("arrcountrycode"),
					latitude : $target.data("arrlatitude"),
					longitude : $target.data("arrlongitude"),
					areaCode : $target.data("areacode")
				};
				//선택한 공항을 세팅
				$("#arrAirportLayer").data("target" , "spanArrivalDesc")
				setAirportInfo(item);
				break;		
			}
		}
	}	
}

function loginModal(){
//	if(window.location.href.indexOf('AvailSearch')>-1){
		setSearchAvailParam(false)
//	}
	BIZ_COMMONS_SCRIPT.formPostLogin("availSearchForm", window.location.pathname);
}

function clickAAMChartBtn(event){
	//이미 선택된 경우 아래 zoom 처리 skip
	if(!$(this).hasClass('on')){
		if($("#depAirportLayer").is(":visible")){
			$("#depAirportLayer").find('.tab-swipe-item').removeClass('on');
		}else{
			$("#arrAirportLayer").find('.tab-swipe-item').removeClass('on');
		}
		$(this).addClass('on');	
		airportMapLayer.zoomIn($(this))		
	}
}

//공항선택 레이어에서 공항을 선택한 경우 처리
function clickChoiseButton(event) {
	let $target = $(this);
	if($(this).parent().hasClass('tab-swipe-item')){
		$(this).parent().data('selected' , 'false');
	}	
	const item = {
			stationCode: $target.data("stationcode"),
			stationName: $target.data("stationname"),
			stationType : $target.data("stationtype"),
			countryCode : $target.data("countrycode"),
			latitude : $target.data("latitude"),
			longitude : $target.data("longitude"),
			areaCode : $target.data("areacode"),
			onlyoneway : $target.data("onlyOneWay"),
	};
	//선택한 공항을 세팅
	setAirportInfo(item);
}
//자동화 검색
function autoComplete() {	
	$(this).keyup(function() {				
		if($(this).val() === "") {				
			$(this).parents().find('div[name=search_auto]').hide();
		}else{	
			$(this).parents().find('div[name=search_auto]').show();
		}
	});
}

//리스트, 맵 변경
function viewTabMap (target, type) {
	if (target == 'start' && type == 'map'){
		$('.flight-start').eq(0).addClass('map')
		airportMapLayer = new AirportMapLayer('map-start');
		uiCarousel.init();
		mapListType = 'Map';
	}else if (target == 'start' && type != 'map'){
		$('.flight-start').removeClass('map')
		mapListType = 'List';
	}else if (target == 'target' && type == 'map'){
		//map 영역 버튼 그리기
		$('.flight-target').eq(0).addClass('map')
		airportMapLayer = new AirportMapLayer('map-target');
		
		if($("#arrivalData").data("stationcode") != null && $("#arrAirportLayer").is(":visible")){
			//도착지 정보
			let arrivalMapData;
			for(let i=0; i<arrivalAiportsMap.length; i++){
				if(arrivalAiportsMap[i].stationCode === $("#arrivalData").data("stationcode")){
					arrivalMapData = arrivalAiportsMap[i]
					break;
				}
			}		
			
			let departureMapData = [];
			departureMapData.push($("#departureData").data("stationcode"));
			departureMapData.push($("#departureData").data("latitude"));
			departureMapData.push($("#departureData").data("longitude"));
			
			let drawLineData = {		
				departureMapData : departureMapData,
				arrivalMapData: arrivalMapData			
			};			
			airportMapLayer.showLines(drawLineData)	
		}			  
	}else if (target == 'target' && type != 'map'){
		$('.flight-target').removeClass('map')
	}
}

// 공항 선택
function setAirportInfo(item) {
	let name = item.stationName;	
	if(cultureCode.substring(0,2) == 'en'){		
		if(item.stationName.indexOf('(') > -1){
			name = item.stationCode+"<em class='sub'><span>(</span>"
			let stationNames = item.stationName.split('(');
			name = name+ stationNames[0]+"<br class='mobile-only'>("+stationNames[1]+"</span></em>"
		}else{
			name = item.stationCode+"<em class='sub'><span></span>"+item.stationName+"<span></span></em>"
		}
	}
	let airportSelector
	let hidAirportData
	let dateLayerSelector
	let arrAirportData
	let arrhidAirportData
	let thisLayer,nextLayer
	//let areaData
	if(item.stationType ==='DEP'){
		airportSelector = $("#depAirportLayer").data("target");
		thisLayer = $("#depAirportLayer")
		nextLayer = $("#spanArrivalDesc").parent()
		hidAirportData = $("#departureData")
		arrAirportData = $("#arrivalData")
		arrhidAirportData = $("#spanArrivalDesc")
		dateLayerSelector = $("#dateLayer")
		if(typeof airportMapLayer != 'undefined'){
			airportMapLayer.clearOldLines()
			$("#arrAirportLayer").find('.tab-swipe-item').removeClass('on')
		}					
		selectArrivalAirports(item , 'ARR');
		if(tripType =='MT'){
			$("#multiArrivalData,#multiDepartureData").data("stationcode" , null)	
			$("#multiArrivalData").data("arrivalname", null)	
			$("#multiArrivalData,#multiDepartureData").data("countrycode", null)	
			$("#spanMultiArrivalDesc,#spanMultiDepartureDesc").parent().removeClass('active')
			$("#spanMultiDepartureDesc").text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00085"))
			$("#spanMultiArrivalDesc").text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00083"))
			$("#spanMultiArrivalDesc,#spanMultiDepartureDesc").addClass("before-select")	
		}	
	}else if(item.stationType ==='MultiDEP'){
		airportSelector = $("#depMultiAirportLayer").data("target");
		hidAirportData = $("#multiDepartureData")
		arrAirportData = $("#multiArrivalData")
		arrhidAirportData = $("#spanMultiArrivalDesc")
		dateLayerSelector = $("#multiDateLayer")				
		selectArrivalAirports(item , 'MultiARR');
		thisLayer = $("#depMultiAirportLayer")
		nextLayer = $("#spanMultiArrivalDesc").parent()	
	}
	if(item.stationType.indexOf('DEP')> -1){
		airportSelector = $("#"+airportSelector)[0];
		airportSelector.innerHTML  = name;
		airportSelector.classList.remove("before-select")		
		$(airportSelector).parent().hasClass('active') == true ? '' : $(airportSelector).parent().addClass('active')	
		hidAirportData.data("stationcode" , item.stationCode);
		hidAirportData.data("departurename" , item.stationName);
		hidAirportData.data("latitude" , item.latitude);
		hidAirportData.data("longitude" , item.longitude);
		hidAirportData.data("countrycode" , item.countryCode);			
		hidAirportData.data("areacode" , item.areaCode);	
		dateLayerSelector.find('.location').eq(0).html(hidAirportData.data("departurename"))		
		/*출발지 선택시 도착지 초기화*/
		arrAirportData.data("stationcode" , null)	
		arrAirportData.data("arrivalname", null)	
		arrAirportData.data("countrycode", null)	
		arrhidAirportData.parent().removeClass('active')
		arrhidAirportData.text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00083"))
		arrhidAirportData.addClass("before-select")				
		if($("div[id$=Layer]").is(":visible")){
			thisLayer.find(".layer-close").trigger('click');
			nextLayer.trigger('click');
		}
	}
	if(item.stationType ==='ARR'){
		airportSelector = $("#arrAirportLayer").data("target");
		hidAirportData = $("#arrivalData")
		dateLayerSelector = $("#dateLayer")
		thisLayer = $("#arrAirportLayer")
		nextLayer = 'undefined'
		if(tripType ==='MT'){
			selectDepartureAirports('MultiDEP');
			nextLayer = $("#spanMultiDepartureDesc").parent()		
		}else{
			nextLayer = $("#btnDatePicker")	
		}
	}else if(item.stationType ==='MultiARR'){
		airportSelector = $("#arrMultiAirportLayer").data("target");
		hidAirportData = $("#multiArrivalData")
		dateLayerSelector = $("#multiDateLayer")
		thisLayer = $("#arrMultiAirportLayer")
		nextLayer = $("#btnDatePicker")
	}
	if(item.stationType.indexOf('ARR')> -1){
		airportSelector = $("#"+airportSelector)[0];
		airportSelector.innerHTML  = name;
		airportSelector.classList.remove("before-select")	
		$(airportSelector).parent().hasClass('active') == true ? '' : $(airportSelector).parent().addClass('active')				
		hidAirportData.data("stationcode" , item.stationCode);
		hidAirportData.data("arrivalname" , item.stationName);
		hidAirportData.data("countrycode" , item.countryCode);	
		hidAirportData.data("areacode" , item.areaCode);		
		hidAirportData.data("onlyoneway" , item.onlyOneWay);
		dateLayerSelector.find('.location').eq(1).text(hidAirportData.data("arrivalname"))						
		// 도착지 세팅하자마자 달력 호출-현재 열려있는 달력의 첫날짜를 기준으로 호출
		let year = $(".flatpickr-wrapper").eq(0).find(".dayContainer").eq(0).find('.year').html()
		let month = $(".flatpickr-wrapper").eq(0).find(".dayContainer").eq(0).find('.month').html()
		if(month.length ==1){
			month = "0"+month;
		}
		if(bookType ==='Common' && $("#txtPromoCode").val() == "" && $("#paymentRadio01").is(":checked") && (item.stationType ==='ARR' && tripType !='MT')){	
			searchlowestFareCalendar(item.stationType);
		}	
		if(bookType ==='Common' && $("#txtPromoCode").val() == "" && $("#paymentRadio01").is(":checked") && (item.stationType ==='MultiARR' && tripType ==='MT')){	
			searchlowestFareCalendar(item.stationType);
		}		
		if(item.countryCode === 'KR' && $("#departureData").data("countrycode") ==='KR'){
			domIntType = "D"
			$("#adtMsg").html(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00187"))
			$("[name=chdMsg]").html(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00127").replace('{0}' , '2').replace('{1}' , '13'))
			$("[name=infantDesc]").html(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00030"))			
		}else{
			domIntType = "I"
			$("#adtMsg").html(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00076"))
			$("[name=chdMsg]").html(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00077").replace('{0}' , '2').replace('{1}' , '12'))
			$("[name=infantDesc]").html(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00031"))
		}
		
		if($("div[id$=Layer]").is(":visible")){
			thisLayer.find(".layer-close").trigger('click');
			if(nextLayer != 'undefined'){
				nextLayer.trigger('click');
			}
		}
	}
	
	// 최근 검색 공항 set 
	if(localStorage.getItem('recentSearchAirport') != null) {		
		searchLatelyDatas = JSON.parse(localStorage.getItem('recentSearchAirport'));
		let pushFlag = true;
		for(let i=0; i<searchLatelyDatas.length; i++){
			if(searchLatelyDatas[i].stationCode == item.stationCode && searchLatelyDatas[i].cultureCode == cultureCode.replace("_","-")){
				pushFlag = false;
				break;
			}
		}
		if(pushFlag){
			//저장한 사이트에서만 조회가능하도록 수정
			item.cultureCode = cultureCode.replace("_","-");
			searchLatelyDatas.push(item)
			localStorage.setItem('recentSearchAirport', JSON.stringify(searchLatelyDatas));
		}
	}else{
		//저장한 사이트에서만 조회가능하도록 수정
		item.cultureCode = cultureCode.replace("_","-");
		searchLatelyDatas.push(item)
		localStorage.setItem('recentSearchAirport', JSON.stringify(searchLatelyDatas));
	}
	activeSearchFlight();
}

function selectArrivalAirports(original , selectedLayer) {
	$.ajax({
		async : true,      		
		url: searchUrl+'/'+I18N.language+'/ibe/booking/selectArrivalStations.json',
		type: 'POST',
			beforeSend: function (request)
        {
			request.setRequestHeader("Channel-Code", cname);
            request.setRequestHeader("User-Id", typeof JSON.parse(USER_INFO.get()).userId != 'undefined' ? JSON.parse(USER_INFO.get()).userId : "");
			request.setRequestHeader("User-Name", encodeURIComponent(JSON.parse(USER_INFO.get()).name) != 'undefined' ? encodeURIComponent(JSON.parse(USER_INFO.get()).name) : "");		
        },			
		data	: {		
			bookType : bookType,
			cultureCode : cultureCode.replace("_","-"),
			originAirport : original.stationCode,
			pageId : pageId
		},  
		success: function (data) {
			//지도는 OW/RT 밖에 안되기 때문에 다구간에서는 첫번째 구간의 도착 정보를 계속해서 저장하고 있는다-
			if(selectedLayer !="MultiARR"){
				arrivalAiportsMap = [];
			}			
			paintAirports(data.data.data.stations , selectedLayer);  
			
			//최근검색
			setRecentSearchAirports(selectedLayer);
			// 즐겨찾기 
			selectFavoritesAirports();
			// 프로모션 조회
			if(selectedLayer =="ARR"){
				selectPromotionsAirports($("#departureData").data("stationcode"))
			}
			if(typeof cmsArrStn != 'undefined' && cmsArrStn !=''){
				let trip = {}
				for(let i=0; i<$("#arrAirportLayer").find('div.tab__panel-wrap').find('.choise__button').length; i++){
				    if ($("#arrAirportLayer").find('div.tab__panel-wrap').find('.choise__button').eq(i).data('stationcode') === cmsArrStn) {
						trip = {
								stationCode: cmsArrStn,
								stationType : 'ARR',
								stationName : $("#arrAirportLayer").find('div.tab__panel-wrap').find('.choise__button').eq(i).data('stationname'),
								countryCode : $("#arrAirportLayer").find('div.tab__panel-wrap').find('.choise__button').eq(i).data('countrycode')					
							};
						$("#arrAirportLayer").data("target" , "spanArrivalDesc")	
						break;
				    }
				}		
				setAirportInfo(trip);				
				if(cmsArrDate != ''){
					tripType = 'RT'
					$("#departureDate").val(cmsDepDate)
					$("#arrivalDate").val(cmsArrDate)
					$("#departureDate").prev().find('.txt').text(dUtil.dateWeekNameTime($("#departureDate").val().replace(/[^0-9]/gi,''),weekLang)+" ~ "+dUtil.dateWeekNameTime($("#arrivalDate").val().replace(/[^0-9]/gi,''),weekLang));
					$("div[name=divFromDate]").eq(0).next().removeClass('one-way')
					$("div[name=divFromDate]").eq(0).next().addClass('round-trip')
				}else{
					tripType = 'OW'
					$("#departureDate").val(cmsDepDate)
					$("#departureDate").prev().find('.txt').text(dUtil.dateWeekNameTime($("#departureDate").val().replace(/[^0-9]/gi,''),weekLang))
					$("#arrivalDate").val("");
					$("div[name=divFromDate]").eq(0).next().addClass('one-way')
					$("div[name=divFromDate]").eq(0).next().removeClass('round-trip')	
				}
			}
			$('.flight-target .map-wrap').eq(0).mapInnerTab();
			if(mapListType === 'Map'){
				viewTabMap('target','map')
			}
		}
	});
}

//최저가 달력 호출
function searchlowestFareCalendar(stationType) {
	let tmpCalendarCount = 0;
	let loopCount = document.getElementsByClassName('flatpickr-wrapper')[0].getElementsByClassName('dayContainer').length;
	
	lowestFareJson = {};
	
	let lowestFareCalendarObj = function lowestFareCalendarObj(){
		let includeTaxesAndFee  =  true;
		let tripRoute = null;
		let passengers = null;
	};
	
	for (let i=0; i<loopCount; i++) {
		if (i % 2 === 1) {
			continue;
		}
		
		tmpCalendarCount++;
		
		let selectedDate = $('.yearMonthContainer .year').eq(i).html() + '-' + ($('.yearMonthContainer .month').eq(i).html().length > 1 ? $('.yearMonthContainer .month').eq(i).html() : '0' + $('.yearMonthContainer .month').eq(i).html()) + '-01';
		
		let tripRoute = [];
		let trip1 = {
			searchStartDate: selectedDate,
			originAirport: $("#departureData").data("stationcode"),
			destinationAirport: $("#arrivalData").data("stationcode")
		}
		tripRoute.push(trip1);
		if(typeof stationType != 'undefined' && stationType ==='MultiARR'){
			let trip2 = {
				searchStartDate: selectedDate,
				originAirport: $("#multiDepartureData").data("stationcode"),
				destinationAirport: $("#multiArrivalData").data("stationcode")
			}
			tripRoute.push(trip2);
		}	
		if(tripType ==='RT'){
			let trip2;
			trip2 = {
				searchStartDate: selectedDate,
				originAirport: $("#arrivalData").data("stationcode"),
				destinationAirport: $("#departureData").data("stationcode")
			}
			tripRoute.push(trip2);
		}
			
		let passengers = [];
		let paxType = jsAdtCount != 0 ? 'ADT' : 'CHD'
		let paxCount = jsAdtCount != 0 ? jsAdtCount : jsChdCount
		const passenger = {
			type: paxType,
			count: paxCount
		}
		passengers.push(passenger);
	
		let lowestFareCalendar = new lowestFareCalendarObj();
		lowestFareCalendar.tripRoute = tripRoute;
		lowestFareCalendar.passengers = passengers;		
	    $.ajax({		
			url: searchUrl+'/'+I18N.language+'/ibe/booking/searchlowestFareCalendar.json',		
			type: 'post',
			dataType: "json",
			beforeSend: function (request)
	        {
				request.setRequestHeader("Channel-Code", cname);
	            request.setRequestHeader("User-Id", typeof JSON.parse(USER_INFO.get()).userId != 'undefined' ? JSON.parse(USER_INFO.get()).userId : "");
				request.setRequestHeader("User-Name", encodeURIComponent(JSON.parse(USER_INFO.get()).name) != 'undefined' ? encodeURIComponent(JSON.parse(USER_INFO.get()).name) : "");		
	        },		
			data: {
				lowestFareCalendar : JSON.stringify(lowestFareCalendar),
				pageId : pageId
			},
			complete: function() {
				tmpCalendarCount--;
			},
			success: function (data) {
				if (Object.keys(lowestFareJson).length === 0) {
					lowestFareJson = data.data.lowfares;
				} else {
					lowestFareJson.lowFareDateMarkets = lowestFareJson.lowFareDateMarkets.concat(data.data.lowfares.lowFareDateMarkets);
				}
			}
		});
	}
	
	let intervalCalendar = setInterval(function() {
		if (tmpCalendarCount === 0) {
			clearInterval(intervalCalendar);
			
			if (tripType !='MT') {
				drawlowestFare(lowestFareJson, stationType);
			} else {
				drawlowestFare(lowestFareJson, 'ARR');
				drawlowestFare(lowestFareJson, 'MultiARR');
			}
		}
	}, 1000)
}

//최저가 그리기
function drawlowestFare(lowestFare , stationType) {
	let datePickerContainer
	let originAiportCode
	datePickerContainer = document.getElementsByClassName("flatpickr-wrapper")[0].getElementsByClassName("dayContainer")
	let arrDraw = false;
	for(let k=0; k<datePickerContainer.length; k++){
		let dayContainer = datePickerContainer[k];
		//이미 가는편이 선택되 있는 경우
		if($(dayContainer).find('.selected').length == 1){
			arrDraw = true;
			break;
		} 
	}
	originAiportCode = $("#departureData").data("stationcode")
	if(typeof stationType != 'undefined' && stationType ==='MultiARR'){
		datePickerContainer = document.getElementsByClassName("flatpickr-wrapper")[1].getElementsByClassName("dayContainer")
		originAiportCode = $("#multiDepartureData").data("stationcode")
	}
	//PMS1271285820,1271286847
	if(arrDraw){
		originAiportCode = $("#arrivalData").data("stationcode")	
	}		
	if(typeof lowestFare == 'undefined'){
		for(let k=0; k<datePickerContainer.length; k++){
			let dayContainer = datePickerContainer[k];
			for(let i=0; i<dayContainer.childElementCount; i++){												
				$(dayContainer.children[i]).find('.label').remove()
			}
		}
	}else{
		if(lowestFare.currencyCode != 'null'){
			let printCurrency = lowestFare.currencyCode;
			if(cultureCode.substring(0,2) == 'ko' && printCurrency ==='KRW'){
				printCurrency = '원'
			}
			$("span[name=currency]").text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00177")+ printCurrency)
		}	
		for(let k=0; k<datePickerContainer.length; k++){
			let dayContainer = datePickerContainer[k];
			for(let i=0; i<dayContainer.childElementCount; i++){		
				for(let j=0; j<lowestFare.lowFareDateMarkets.length; j++){
					let lowFareDateMarkets = lowestFare.lowFareDateMarkets[j];
					if(originAiportCode === lowFareDateMarkets.origin){			
						if($(dayContainer.children[i]).attr('aria-label') ===
							lowFareDateMarkets.departureDate.replace(/[^0-9]/g,'').substring(0,8)){												
							$(dayContainer.children[i]).find('.label').remove()
							if(lowFareDateMarkets.noFlights){
								if(APP_DATA.deviceType == "PC"){
									$(dayContainer.children[i].children[0]).addClass('flatpickr-disabled')
									break;
								}else{
									$(dayContainer.children[i]).addClass('flatpickr-disabled')
									break;
								}
							}else{
								if(APP_DATA.deviceType == "PC"){
									$(dayContainer.children[i].children[0]).removeClass('flatpickr-disabled')
									$(dayContainer.children[i].children[0]).after('<span class="label">'+sUtil.setComma(lowFareDateMarkets.lowestFareAmount.fareAmount)+'</span>')
									break;
								}else{
									$(dayContainer.children[i]).removeClass('flatpickr-disabled')
									$(dayContainer.children[i].children[0]).after('<span class="label">'+sUtil.setComma(lowFareDateMarkets.lowestFareAmount.fareAmount)+'</span>')
									break;
								}
							}									
						}
					}
				}
			}
		}
	}
}

function drawArrlowestFare(dayElem , dObj){	
	let safari = false;
	if(USER_DEVICE.getName() !="APP"){
		if(USER_DEVICE.getName() != "PC"){
			let agt = navigator.userAgent.toLowerCase();
			if(agt.indexOf("safari") != -1){
				safari = true;
			}
		}
	}
	
	//if(!safari) {		
		dayElem.find('.label').remove()
		let lowestFareData = lowestFareJson
		let departureStatin = $("#departureData").data("stationcode")
		if($("#multiDateLayer").is(":visible")){
			departureStatin = $("#multiDepartureData").data("stationcode")
		}
		if(typeof lowestFareData != 'undefined' && typeof lowestFareData.lowFareDateMarkets != 'undefined' && bookType==='Common'){
			for(let i=0; i<lowestFareData.lowFareDateMarkets.length; i++){
				let lowFareDateMarkets = lowestFareData.lowFareDateMarkets[i];						
				let compareStation = lowFareDateMarkets.origin
				if(tripType =='RT'){
					compareStation = lowFareDateMarkets.destination
				}
				if(departureStatin === compareStation){
					if(lowFareDateMarkets.departureDate.replace(/-/gi, '').substring(0,8) >= currentDate){				
						if(lowFareDateMarkets.departureDate.replace(/-/gi, '').substring(0,8) === dayElem.attr('aria-label')){					
							if(lowFareDateMarkets.noFlights){
								if(APP_DATA.deviceType == "PC"){
									dayElem.find('span').addClass('flatpickr-disabled')
									break;
								}else{
									dayElem.addClass('flatpickr-disabled')
									break;
								}	
							}else{
								//선택한 가는날 이후부터 운임 표시
								if(APP_DATA.deviceType == "PC"){
									if(lowFareDateMarkets.departureDate.replace(/-/gi, '').substring(0,8) > dObj[0].toISOString().replace(/[^0-9]/g, '').substring(0,8)){
										dayElem.find('span').removeClass('flatpickr-disabled')			
										dayElem.find('span').after('<span class="label">'+sUtil.setComma(lowFareDateMarkets.lowestFareAmount.fareAmount)+'</span>')
										break;
									}	
								}else{
									if(lowFareDateMarkets.departureDate.replace(/-/gi, '').substring(0,8) > dObj[0].toISOString().replace(/[^0-9]/g, '').substring(0,8)){ 		
										dayElem.removeClass('flatpickr-disabled')			
										dayElem.find('span').after('<span class="label">'+sUtil.setComma(lowFareDateMarkets.lowestFareAmount.fareAmount)+'</span>')
										break;
									}
								}
								
							}								
						}						
					}
				}									
			}
		}
	//}else{
		//dayElem.find('.label').remove()
	//}				
}

// 최근 검색 목록
function setRecentSearchAirports(stationType){
	paintRecentAirports(JSON.parse(localStorage.getItem('recentSearchAirport')) , stationType);
}

// 즐겨찾기 목록
function selectFavoritesAirports() {
	if(typeof JSON.parse(USER_INFO.get()).userId != 'undefined'){	
		$.ajax({
			url: searchUrl+'/'+I18N.language+'/ibe/booking/selectAirportFavorites.json',
			type: 'post',
			async : false,
			dataType: "json",
			beforeSend: function (request)
        	{
				request.setRequestHeader("Channel-Code", cname);
            	request.setRequestHeader("User-Id", typeof JSON.parse(USER_INFO.get()).userId != 'undefined' ? JSON.parse(USER_INFO.get()).userId : "");
				request.setRequestHeader("User-Name", encodeURIComponent(JSON.parse(USER_INFO.get()).name) != 'undefined' ? encodeURIComponent(JSON.parse(USER_INFO.get()).name) : "");		
        	},
			data: {
				mbrId: JSON.parse(USER_INFO.get()).userId,
				pageId : pageId
			},
			success: function (data) {
			  const list = data.data.mtxTt;
			  paintFavoritesAirports(list);
			}
		});
	}else{
		$("div[name=favorites]").text("");
		let btnFavoriteAirport = '<div class="tag-list__no-result">'+BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00178")+'</div>'   
		$("div[name=favorites]").append(btnFavoriteAirport)	
	}
}

//최근 검색 공항 그리기
function paintRecentAirports(localStorageDatas , stationType) {
	$("div[name=latelySearch]").text("");
	let btnRecentAirport = '';
	if(localStorageDatas != null && localStorageDatas.length !=0){				
		
		localStorageDatas.forEach(function (recentAirport) {
			let skipFlag = true;
			if(stationType === 'DEP' || stationType === 'MultiDEP'){
				skipFlag = false;		
			}
			if(stationType === 'ARR'){				
				//도착지 목록에 없는 노선은 제외
				for(let i=0; i<$("#divArrArea").next('.tab__panel-wrap').find('.choise').length; i++){
					let airport = $("#divArrArea").next('.tab__panel-wrap').find('.choise').eq(i)				
					if(airport.find('.airport').text() === recentAirport.stationCode){
						skipFlag = false;
						break;
					}
				}
			}
			if(stationType === 'MultiARR'){
				//도착지 목록에 없는 노선은 제외
				for(let i=0; i<$("#divMultiArrArea").next('.tab__panel-wrap').find('.choise').length; i++){
					let airport = $("#divMultiArrArea").next('.tab__panel-wrap').find('.choise').eq(i)				
					if(airport.find('.airport').text() === recentAirport.stationCode){
						skipFlag = false;
						break;
					}
				}
			}
			//cultureCode 가 없으면 표출하지 않음
			if(typeof recentAirport.cultureCode === 'undefined'){
				skipFlag = true;	
			}
			//해당 사이트가 아니면 표출하지 않음
			if(typeof recentAirport.cultureCode != 'undefined' 
				&& !cultureCode.replace("_","-").startsWith(recentAirport.cultureCode) 
				&& !recentAirport.cultureCode.startsWith(cultureCode.replace("_","-"))){
				skipFlag = true;
			}

			if(!skipFlag){
			btnRecentAirport+= '<div class="tag-list__item tag-list__item--tag" data-element="tab__list" role="presentation">'+
				'<button type="button" name="btnLatelyAirport"class="tag-list__text"'+
				'data-stationcode="'+ recentAirport.stationCode+'"'+
				'data-latitude="'+ recentAirport.latitude+'"data-longitude="'+ recentAirport.longitude+'"data-countrycode="'+ recentAirport.countryCode+'"'+
				'data-stationtype="'+ stationType +'" data-stationname="'+recentAirport.stationName+'">'+
				recentAirport.stationName+'<span class="airport" style="display: none;">'+recentAirport.stationCode+'</span></button>'+
		      '<button type="button" class="tag-list__remove" onclick="javascript:deletelatelySearch(this);"><span class="hidden">'+BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00101")+'</span></button></div>';	
			}	      
		})
	}	
	if(btnRecentAirport ==""){
		btnRecentAirport = '<div class="tag-list__no-result">'+BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00165")+'</div>'    
	}
	$("div[name=latelySearch]").append(btnRecentAirport) 
}

//즐겨찾기 그리기
function paintFavoritesAirports(favoritesAirports){
	let targetLayerId = $(".flight-layer:visible").attr('id');
	if(typeof targetLayerId === 'undefined' && tripType ==='MT'){
		targetLayerId = 'depMultiAirportLayer'
	}
	let targetLayer = $("#"+targetLayerId);
	$("div[name=favorites]").text("");
	if(favoritesAirports.length ==0){
		let btnFavoriteAirport = '<div class="tag-list__no-result">'+BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00178")+'</div>'
		$("div[name=favorites]").append(btnFavoriteAirport)
	}else{
		let checkCnt = 0
		let choiseList = targetLayer.find('.choise')
		//탭 하트 버튼 제어
		for(let j=0; j<choiseList.length; j++){
			let choise = choiseList.eq(j)
			choise.find('.button-favorites').removeClass("on");
			for(let i=0; i<favoritesAirports.length; i++){
				let favoritesAirport = {
					stationCode: favoritesAirports[i].AIRPORT_CD,
					stationName: "",
					stationType : "",
					countryCode : "",
					latitude : "",
					longitude : ""
				};
				if(choise.find('button').data('stationcode') === favoritesAirport.stationCode) {
					choise.find('.button-favorites').addClass("on");
					favoritesAirport.stationName = choise.find('button').eq(0).data('stationname')
					favoritesAirport.stationType = choise.find('button').eq(0).data('stationtype')
					favoritesAirport.countryCode = choise.find('button').eq(0).data('countrycode')
					favoritesAirport.latitude = choise.find('button').eq(0).data('latitude')
					favoritesAirport.longitude = choise.find('button').eq(0).data('longitude')
					favoritesAirport.areaCode = choise.find('button').eq(0).data('areacode')
					paintFavoritesTag(favoritesAirport);
					checkCnt++;
					break;	
				}
				
			}
		}
		
		let choiseMapList = targetLayer.find('.tab-swipe-item')
		if(choiseMapList.length === 0){
			choiseMapList = $('.tab-swipe-item');
		}
		//지도 하트 버튼 제어
		for(let j=0; j<choiseMapList.length; j++){
			let choise = choiseMapList.eq(j)
			choise.find('.button').eq(1).removeClass("on");
			for(let i=0; i<favoritesAirports.length; i++){		
				if(choise.find('button').eq(0).data('stationcode') === favoritesAirports[i].AIRPORT_CD) {
					choise.find('button').eq(1).addClass("on");		
					break;	
				}			
			}
		}
		if(checkCnt ==0){
			let btnFavoriteAirport = '<div class="tag-list__no-result">'+BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00178")+'</div>'
			$("div[name=favorites]").append(btnFavoriteAirport)
		}
	}
}

//즐겨찾기 tag item 그리기
function paintFavoritesTag(favoritesAirport) {
	const favoritesHtml = '<div class="tag-list__item tag-list__item--tag" data-element="tab__list" role="presentation">'+
		'<button type="button" name="btnFavoriteAirport"class="tag-list__text" data-stationcode="'+ favoritesAirport.stationCode+'"'+
		'data-areacode="'+ favoritesAirport.areaCode+'" data-stationcode="'+ favoritesAirport.stationCode+'" data-latitude="'+ favoritesAirport.latitude+'"data-longitude="'+ favoritesAirport.longitude+'"'+
		'data-countrycode="'+ favoritesAirport.countryCode+'" data-stationtype="'+ favoritesAirport.stationType +'" data-stationname="'+favoritesAirport.stationName+'">#' + favoritesAirport.stationName + '</button>' +
		'<button type="button" class="tag-list__remove" onclick="javascript:deleteFavorites(this);"><span class="hidden">'+BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00101")+'</span></button></div>';
	if($("div[name=favorites]").find('.tag-list__no-result').length != 0){
		$("div[name=favorites]").find('.tag-list__no-result').remove()
	}
	$("div[name=favorites]").append(favoritesHtml)
}

// 프로모션 목록
function selectPromotionsAirports(airportCode) {
	let depAirportCode = airportCode
	if(typeof depAirportCode ==='undefined'){
		depAirportCode = ''
	}
	$.ajax({		
		url: searchUrl+'/'+I18N.language+'/ibe/booking/selectPromotionsAirports.json',	
		type: 'post',
		dataType: "json",
		beforeSend: function (request)
        {
			request.setRequestHeader("Channel-Code", cname);
            request.setRequestHeader("User-Id", typeof JSON.parse(USER_INFO.get()).userId != 'undefined' ? JSON.parse(USER_INFO.get()).userId : "");
			request.setRequestHeader("User-Name", encodeURIComponent(JSON.parse(USER_INFO.get()).name) != 'undefined' ? encodeURIComponent(JSON.parse(USER_INFO.get()).name) : "");		
        },			
		data: {
			depAirportCode: depAirportCode,
			lang : cultureCode.substring(0,2),
			pageId : pageId
		},
		success: function (data) {
			const promotionAirports = data.data.mtxTt;
			paintPromotionAirports(promotionAirports);
		}
	});
}

//프로모션 그리기
function paintPromotionAirports(promotionAirports) {
	$("div[name=promotionSearch]").text("");
	let promotionHTML = ''
	promotionAirports.forEach(function (promotionAirport) {	
		promotionHTML+='<button type="button" class="tag-list__item tag-list__item--promo" data-element="tab__list" role="presentation" name="btnPromotion"';	
		promotionHTML+='data-depstationcode="'+ promotionAirport.DEP_STATION+'" data-depcurrencycode="'+ promotionAirport.DEP_STATION+'"'+
		'data-depcountrycode="'+ promotionAirport.DEP_COUNTRYCODE+'"'+
		'data-depstationtype="DEP" data-depstationname="'+promotionAirport.DEP_AIRPORT_NM+'"'+
		'data-arrstationcode="'+ promotionAirport.ARR_STATION+'" data-arrcurrencycode="'+ promotionAirport.ARR_STATION+'"'+
		'data-arrcountrycode="'+ promotionAirport.ARR_COUNTRYCODE+'"'+
		'data-arrstationtype="ARR" data-arrstationname="'+promotionAirport.ARR_AIRPORT_NM+'">';		
		if(promotionAirport.STARTPOINT_TAG_NM !=''){
			promotionHTML+='<span class="new">'+promotionAirport.STARTPOINT_TAG_NM+'</span>'
		}
		promotionHTML+='<span class="tag-list__text" style="color:'+promotionAirport.DESTINATION_TAG_TCOLOR_CD+';">'+promotionAirport.PROMOTION_NM+'</span></button>'
	});
	if($("#depAirportLayer").is(":visible")){
		$("div[name=promotionSearch]").eq(0).append(promotionHTML) 
	}else{
		$("div[name=promotionSearch]").eq(1).append(promotionHTML) 
	}	
}

// 최근검색 삭제 
function deletelatelySearch(_this) {
	const parentButton = $(_this).parent('div');	
	const airport =  $(_this).prev().data('stationcode')
	//storage에서 삭제 처리
	if(localStorage.getItem('recentSearchAirport') != null) {		
		searchLatelyDatas = JSON.parse(localStorage.getItem('recentSearchAirport'));	
		if(searchLatelyDatas.length == 1){
			localStorage.removeItem('recentSearchAirport')
			searchLatelyDatas = [];
		}else{
			for(let i=0; i<searchLatelyDatas.length; i++){
				if(searchLatelyDatas[i].stationCode == airport && searchLatelyDatas[i].cultureCode == cultureCode.replace("_","-")){
					searchLatelyDatas.splice(i,1);
				}
			}
			localStorage.setItem('recentSearchAirport', JSON.stringify(searchLatelyDatas));	
		}
	}
	let emptyDesc ='';
	if(parentButton.parent('.tag-list').children('.tag-list__item').length==1){
		emptyDesc = parentButton.parent('.tag-list')
	}
	parentButton.remove();
	if(emptyDesc != ''){
		emptyDesc[0].innerHTML = '<div class="tag-list__no-result">'+BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00165")+'</div>'
	}
}

// 즐겨찾기 삭제 
function deleteFavorites(_this) {	
	const stationcode = $(_this).prev().data("stationcode");
	let targetLayer
	if($(_this).prev().data("stationtype") === 'DEP'){
		targetLayer = $("#depAirportLayer")
	}else if($(_this).prev().data("stationtype") === 'ARR'){
		targetLayer = $("#arrAirportLayer")
	}else if($(_this).prev().data("stationtype") === 'MultiDEP'){
		targetLayer = $("#depMultiAirportLayer")
	}else if($(_this).prev().data("stationtype") === 'MultiARR'){
		targetLayer = $("#arrMultiAirportLayer")
	}
	//db에서 삭제 처리
	deleteFavoritesAirport(stationcode , targetLayer);
}

//즐겨찾기 공항 DB 삭제
function deleteFavoritesAirport(code , targetLayer) {
	if(USER_INFO.get() != '{}'){	
		$.ajax({			
			url: searchUrl+'/'+I18N.language+'/ibe/booking/deleteAirportFavorites.json',				
			type: 'post',
			beforeSend: function (request)
	        {
				request.setRequestHeader("Channel-Code", cname);
    	        request.setRequestHeader("User-Id", typeof JSON.parse(USER_INFO.get()).userId != 'undefined' ? JSON.parse(USER_INFO.get()).userId : "");
				request.setRequestHeader("User-Name", encodeURIComponent(JSON.parse(USER_INFO.get()).name) != 'undefined' ? encodeURIComponent(JSON.parse(USER_INFO.get()).name) : "");		
			},
			data: {
				mbrId: JSON.parse(USER_INFO.get()).userId,
				code: code,
				pageId : pageId
			},
			success: function (data) {
				//x 버튼 제어	
				for(let i=0; i<targetLayer.find('.tag-list').eq(1).children('.tag-list__item').length; i++){
					let choise = targetLayer.find('.tag-list').eq(1).children('.tag-list__item').eq(i)
					if (choise.find('button').eq(0).data('stationcode') === code) {
						choise.remove()
						break;
					}
				}
				if(targetLayer.find('.tag-list').length > 0 && targetLayer.find('.tag-list').eq(1).children('.tag-list__item').length == 0){
					targetLayer.find('.tag-list').eq(1)[0].innerHTML = '<div class="tag-list__no-result">'+BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00178")+'</div>'
				}
				
				//하트 버튼 제어	
				for(let i=0; i<targetLayer.find('.choise').length; i++){
					let choise = targetLayer.find('.choise').eq(i)
					if (choise.find('button').eq(0).data('stationcode') === code) {
						choise.find('.button-favorites').removeClass("on")
						break;
					}
				}
				//amchart 하단 버튼 제어
				for(let j=0; j<$('.tab-swipe-wrapper').find('a').length; j++){
					let tmp = targetLayer.find('div.tab-swipe-wrapper').find('a').eq(j);
					if(tmp.find('.btn-choose-city').data('stationcode') === code) {
						tmp.find('.btn-wish').removeClass("on")
						break;
					}
				}
			},
			error: function () {
			}
		});
	}else{
		if(window.location.href.indexOf('AvailSearch')>-1){
			setSearchAvailParam(false)
		}else{
			let targetUrl = "/"+I18N.language+"/main/base/index.do";
			if (APP_DATA.deviceType === 'APP') {
				targetUrl = "/"+I18N.language+"/ibe/booking/Availability.do";
			}
			BIZ_COMMONS_SCRIPT.formPostLogin("availSearchForm", targetUrl);	
		}
	}
}

//공항 검색 레이어에서 공항 즐겨찾기 버튼 클릭 이벤트 처리
function clickBtnFavorites(_this) {
	const $target = $(_this);
	let favoritesButton = $target.closest('.choise').find('button').eq(0);		
	let stationName = favoritesButton.data('stationname')
	let stationCode = favoritesButton.data('stationcode')
	/*amChart*/
	if($target.hasClass('btn-wish')){
		stationName = $target.parent().children('button').eq(0).data('stationname')
		stationCode =  $target.parent().children('button').eq(0).data('stationcode')
	}
	let favoritesAirport = {
		stationCode: stationCode,
		stationName: stationName,
		stationType : favoritesButton.data('stationtype'),
		countryCode : favoritesButton.data('countrycode'),
		latitude : favoritesButton.data('latitude'),
		longitude : favoritesButton.data('longitude')
	};
	
	if(typeof JSON.parse(USER_INFO.get()).userId != 'undefined'){
		if ($target.hasClass("on")) {
			//DB에서 즐겨찾기 정보 제거
			deleteFavoritesAirport(favoritesAirport.stationCode , $target.parents('.flight-layer'));			
		} else {
			//DB에 저장 
			insertFavoritesAirport(favoritesAirport.stationCode);					
			//즐겨찾기 tag item 추가
			paintFavoritesTag(favoritesAirport);
			//텝 하트 버튼 추가
			$target.addClass("on")	
			//지도 하트 버튼 추가
			for(let i=0; i<$('.tab-swipe-wrapper').length; i++){
				let swipe = $('.tab-swipe-wrapper').eq(i)
				for(let j=0; j<swipe.find('a').length; j++){
					let btnchoose = swipe.find('a').eq(j);
					if(btnchoose.find('.btn-choose-city').data('stationcode') === favoritesAirport.stationCode) {
						btnchoose.find('.btn-wish').addClass("on")
						break;
					}
				}
			}
		}
	}else{
		if(window.location.href.indexOf('AvailSearch')>-1){
			setSearchAvailParam(false)
		}else{
			let targetUrl = "/"+I18N.language+"/main/base/index.do";
			if (APP_DATA.deviceType === 'APP') {
				targetUrl = "/"+I18N.language+"/ibe/booking/Availability.do";
			}
			BIZ_COMMONS_SCRIPT.formPostLogin("availSearchForm", targetUrl);	
		}
	}
}

// 슬라이딩 공통 이벤트 
$.fn.sliding = function () {
	var ticketingWrap = this
	var rowBot = ticketingWrap.find('.ticketing-row-bot')
	var btnPick = ticketingWrap.find('.js-target-pick')
	var btnStart = ticketingWrap.find('.start.js-target-pick')
	var btnTarget = ticketingWrap.find('.target.js-target-pick')
	var btnDate = ticketingWrap.find('.btn-date')
	var rowTop = ticketingWrap.find('.ticketing-row-top')
	var ticketPath = ticketingWrap.find('.ticket-path')
	var promotionTop = ticketingWrap.find('.promotion-top')
	var promotionInp = ticketingWrap.find('.promotion-inp .inp-txt')
	var btnPc = ticketingWrap.find('.pc-toggle-btn')
    var btnMo = ticketingWrap.find('.mobile-btn')
	var layerClose = ticketingWrap.find('.layer-close')

	// 탑승자 선택
	var btnPassengers = ticketingWrap.find('.btn-passengers');
	var customerLayer = ticketingWrap.find('.customer-layer');
		
	//편도, 왕복, 다구간 탭
	var typeTab = ticketingWrap.find('.ticketing-type')
	var typeTabItem = ticketingWrap.find('.ticketing-type .item')
	var typeTabBtn = ticketingWrap.find('.ticketing-type .item-btn')
	//기본 날짜
	var now = new Date();		
	var departureDate = new Date(now.setDate(now.getDate()))
	let _dm = departureDate.getMonth()+1
	let _dd = departureDate.getDate()
	if(_dm <10){_dm = '0'+_dm}
	if(_dd <10){_dd = '0'+_dd}		
	var arrivalDate = '';

	var arrivalDate = new Date(now.setDate(now.getDate() + 7))
	let _am = arrivalDate.getMonth()+1
	let _ad = arrivalDate.getDate()
	if(_am <10){_am = '0'+_am}
	if(_ad <10){_ad = '0'+_ad}
	// 도착일을 현재일 기준으로 +7일과 출발일 설정기준+7을 나누기위한 플래그, 여정 처음 조회 시 플래그 값 변경
	var setArrDateFirst = true;

	typeTabBtn.on('click', function (e) {
		e.preventDefault()	
		//레이어열려있을시 닫음
		$(".flight-layer,.date-layer").hide();
		var currentIndex = $(this).parent().index()
		typeTabItem.removeClass('selected')
		$(this).parent().addClass('selected')
		if (currentIndex == 0) {
			tripType = 'RT'
			//날짜 초기화
			$("#selectDate").data("picker" , "range");
			datepicker.init('[data-picker]' , 'change');		
			if(setArrDateFirst )  {
				arrivalDate = new Date(dUtil.cvtDate( $("#departureDate").val() ,'Y-M-D'  ));
				arrivalDate.setDate(arrivalDate.getDate() + 7);
				_am = arrivalDate.getMonth()+1;
				_ad = arrivalDate.getDate();
				if(_am <10){_am = '0'+_am}
				if(_ad <10){_ad = '0'+_ad}
			}
			setArrDateFirst = false;
	//		$("#departureDate").val(departureDate.getFullYear()+"-"+_dm+"-"+_dd)
			$("#arrivalDate").val(arrivalDate.getFullYear()+"-"+_am+"-"+_ad)	
			$("#departureDate").prev().find('.txt').text(dUtil.dateWeekNameTime($("#departureDate").val().replace(/[^0-9]/gi,''),weekLang)+" ~ "+dUtil.dateWeekNameTime($("#arrivalDate").val().replace(/[^0-9]/gi,''),weekLang));
			$(".main-ticketing").eq(0).addClass('round')
			$(".main-ticketing").eq(0).removeClass('one-way multi')			
			$(".ticketing").addClass('round')
			$(".ticketing").removeClass('multi-wrap one-way multi')		
			$("div[name=divFromDate]").eq(0).next().addClass('round-trip')
			$("div[name=divFromDate]").eq(0).next().removeClass('one-way')
			$(".booking-trip__switch").removeClass('one-way')		
			if($("#departureData").data('stationcode') != '' && typeof $("#departureData").data('stationcode') != 'undefined'){
				let item = {
					stationCode: $("#departureData").data('stationcode')
				};	
				if(typeof airportMapLayer != 'undefined'){
					airportMapLayer.clearOldLines()
					$("#arrAirportLayer").find('.tab-swipe-item').removeClass('on')
				}					
				selectArrivalAirports(item , 'ARR');		
				setArrDateFirst = false ;
			}	
		}else if (currentIndex == 1) {						
			tripType = 'OW'	
			//날짜 초기화
			if($("#searchFlight").attr("disabled")!='disabled'){
				setArrDateFirst = false;
			}
			$("#selectDate").data("picker" , "single");
			datepicker.init('[data-picker]' , 'change');
			departureDate = new Date(dUtil.cvtDate( $("#departureDate").val() ,'Y-M-D'  ));
			_dm = departureDate.getMonth()+1
			_dd = departureDate.getDate()
			if(_dm <10){_dm = '0'+_dm}
			if(_dd <10){_dd = '0'+_dd}					
			arrivalDate = new Date(dUtil.cvtDate( $("#arrivalDate").val() ,'Y-M-D'  ));
			_am = arrivalDate.getMonth()+1
			_ad = arrivalDate.getDate()		
			if(_am <10){_am = '0'+_am}
			if(_ad <10){_ad = '0'+_ad}					
			$("#departureDate").prev().find('.txt').text(dUtil.dateWeekNameTime($("#departureDate").val().replace(/[^0-9]/gi,''),weekLang));
			$("#arrivalDate").val("");						
			$(".main-ticketing").eq(0).addClass('one-way')
			$(".main-ticketing").eq(0).removeClass('round multi')	
			$(".ticketing").addClass('one-way')
			$(".ticketing").removeClass('multi-wrap round multi')
			$("div[name=divFromDate]").eq(0).next().addClass('one-way')
			$("div[name=divFromDate]").eq(0).next().removeClass('round-trip')
			$(".booking-trip__switch").addClass('one-way')				
			if($("#departureData").data('stationcode') != '' && typeof $("#departureData").data('stationcode') != 'undefined'){
				let item = {
					stationCode: $("#departureData").data('stationcode')
				};	
				if(typeof airportMapLayer != 'undefined'){
					airportMapLayer.clearOldLines()
					$("#arrAirportLayer").find('.tab-swipe-item').removeClass('on')
				}					
				selectArrivalAirports(item , 'ARR');
			}												
		}	
		$(".ticketing-row-top.multi").hide();
		//운임조회 / 메인,항공권 예매 CSS 가 다름
		if(window.location.href.indexOf('AvailSearch')>-1){
			rowTop.eq(0).removeClass('route1')
			rowTop.eq(1).hide();
			ticketingWrap.find('.ticketing-people').eq(0).show();
			ticketingWrap.find('.ticketing-people').eq(1).hide();
			ticketingWrap.find('.ticketing-row-hidden').eq(1).hide();
			$("button[name=btnINSJourney]").show()	
		}
		//노선 프로모션 초기화,기프티켓 초기화,탑승객 초기화 ,맵버튼 초기화
		$('div[name=divPromotion],.payment-giftticket,#owrtPeople,.floating-button').show();
		//최근검색노선 초기화
		if($("#divRecentRoute").parents(".search").find('.search__box').length > 0)$("#divRecentRoute").parents(".search").show()		
		$("#customerLayer").find("[id^='adtCount']").val(jsAdtCount)
		$("#customerLayer").find("[id^='chdCount']").val(jsChdCount)
		$("#customerLayer").find("[id^='infCount']").val(jsInfCount)
		let passengerCount = BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00005")+jsAdtCount;    
		if(jsChdCount != '0'){
			passengerCount += ", "+BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00006")+jsChdCount;
		}
		if(jsInfCount != '0'){
			passengerCount += ", "+BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00007")+jsInfCount;
		}	
		$(".btn-passengers").eq(0).children().eq(0)[0].innerText = passengerCount
		$("#multiArrivalData,#multiDepartureData").data("stationcode" , null)	
		$("#multiArrivalData").data("arrivalname", null)				
		if (currentIndex == 2) {		
			tripType = 'MT'
			//노선 프로모션 초기화
			$('div[name=divPromotion]').hide();
			if(bookType ==='Voucher'){
				$(".radio-wrap").find('.radio__input').eq(0).trigger('click');
			}
			departureDate = new Date(dUtil.cvtDate( $("#departureDate").val() ,'Y-M-D'  ));
			_dm = departureDate.getMonth()+1
			_dd = departureDate.getDate()
			if(_dm <10){_dm = '0'+_dm}
			if(_dd <10){_dd = '0'+_dd}
			//날짜 초기화	
			datepicker.init('[data-picker]', 'multi');	
			$("#selectDate").data("picker" , "single");	
			datepicker.init('[data-picker]' , 'change');		
			$("#departureDate").val(departureDate.getFullYear()+"-"+_dm+"-"+_dd)			
			$("#departureDate").prev().find('.txt').text(dUtil.dateWeekNameTime($("#departureDate").val().replace(/[^0-9]/gi,''),weekLang));
			$("#multiArrivalDate").val(departureDate.getFullYear()+"-"+_dm+"-"+_dd)
			$("#multiArrivalDate").prev().find('.txt').text(dUtil.dateWeekNameTime($("#departureDate").val().replace(/[^0-9]/gi,''),weekLang));
			$("div[name=divFromDate]").eq(0).next().addClass('one-way')
			$("div[name=divFromDate]").eq(0).next().removeClass('round-trip')
			$(".booking-trip__switch").addClass('one-way')		
			//운임조회와 /메인,항공권예매 화면에 CSS 구조가 다름			
			if(window.location.href.indexOf('AvailSearch')>-1){
				rowTop.eq(0).addClass('route1')
				rowTop.eq(1).show()
				$(".ticketing-people").eq(0).hide();
				$(".ticketing-people").eq(1).show();
				$(".ticketing").addClass('multi-wrap')
				$(".ticketing").removeClass('one-way round')		
				$("button[name=btnINSJourney]").hide()			
			}else{
				$(".ticketing-row-top").eq(1).show()
				$(".main-ticketing").eq(0).addClass('multi')
				$(".main-ticketing").eq(0).removeClass('one-way round')							
			}		
			ticketingWrap.find('.ticketing-row-hidden').eq(1).show();		
			$("#spanMultiDepartureDesc").text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00085"))
			$("#spanMultiArrivalDesc").text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00083"))
			$("#spanMultiDepartureDesc,#spanMultiArrivalDesc").addClass("before-select")		
			$("#spanMultiDepartureDesc,#spanMultiArrivalDesc").parent().removeClass('active')					
			$("#divRecentRoute").parents(".search").hide()
			$(".floating-button,.payment-giftticket,#owrtPeople").hide();	
			$('.flight-start,.flight-target').removeClass('map')			
			$("#multiCustomerLayer").find("[id^='adtCount']").val(jsAdtCount)
			$("#multiCustomerLayer").find("[id^='chdCount']").val(jsChdCount)
			$("#multiCustomerLayer").find("[id^='infCount']").val(jsInfCount)			
			$(".ticketing-row-top").find(".btn-wish").hide();
			let passengerCount = BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00005")+jsAdtCount;    
			if(jsChdCount != '0'){
				passengerCount += ", "+BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00006")+jsChdCount;
			}
			if(jsInfCount != '0'){
				passengerCount += ", "+BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00007")+jsInfCount;
			}	
			$(".btn-passengers").eq($(".btn-passengers").length-1).children().eq(0)[0].innerText = passengerCount
			if($("#arrivalData").data("stationcode") != null){
				selectDepartureAirports('MultiDEP');
			}	
			//항공권 다시 검색 초기화
			$("#searchFlight").attr("disabled" , true);		
		}
		if($("#departureData").data('stationcode') != '' && $("#arrivalData").data('stationcode') != null){		
			if($("#departureData").data("countrycode") == 'KR' && $("#arrivalData").data("countrycode") == 'KR'){
				domIntType = 'D'
			}else{
				domIntType = 'I'
			}
			let year = $(".flatpickr-wrapper").eq(0).find(".dayContainer").eq(0).find('.year').html()
			let month = $(".flatpickr-wrapper").eq(0).find(".dayContainer").eq(0).find('.month').html()
			if(month.length ==1){
				month = "0"+month;
			}
			if(bookType ==='Common' && $("#txtPromoCode").val() == "" && $("#paymentRadio01").is(":checked") && tripType != 'MT'){	
				searchlowestFareCalendar('ARR');
			}									
		}
		
		//탑승개 레이어
		$(".customer-layer").hide()
		activeSearchFlight();		
	});
	// 가려진 부분 열기
	btnPick.on('click', function () {
		open(this)
	})
	
	//항공편 선택 전용
	btnPc.on('click', function () {
		var check = ticketingWrap.hasClass('open')
		if (check) {
			close ()
		}else {
			open ()
		}
    })

	//항공편 선택 전용
    btnMo.on('click', function () {
		var check = ticketingWrap.hasClass('open')
		if (check) {
        	close ()
			ticketPath.show()
			rowTop.hide()
		}else {
			open ()			
		}
    })

	// 내부 슬라이드 요소 닫을 때
	layerClose.on('click', function () {
		$('.quick-booking').removeClass('active')
		$('.quick-booking').trigger('removeClassActive');
		$(this).addClass('on');
	});

	function open (obj) {
		ticketingWrap.removeClass('closed').addClass('open')
		typeTab.show()
    	rowBot.show()
		rowTop.eq(0).show()		
		if(tripType != 'MT'){        	
			rowTop.eq(1).hide()	
		}else{
			rowTop.eq(1).show()	
		}
	}
	function close () {
		ticketingWrap.removeClass('open').addClass('closed')
		typeTab.hide()
    	rowBot.hide()
		$('.quick-booking').removeClass('active')
		$('.quick-booking').trigger('removeClassActive');
	}

	//결제 방법  선택
	var payment = ticketingWrap.find('.payment')
	var paymentRadio = ticketingWrap.find('.radio__input')
	var promotion = ticketingWrap.find('.promotion')
	var gTicket = ticketingWrap.find('.g-ticket')
	paymentRadio.on('change', function () {
		var currentIndex = $(this).parent().index()
		if (currentIndex == 0) {
			bookType = "Common"
			gTicket.hide()
			promotion.css('display', 'block')	
			if($("#txtPromoCode").val() == ""){	
				clearDate();
			}			
		}else if (currentIndex == 1) {
			if(USER_INFO.get() != '{}'){
				let loginData = JSON.parse(USER_INFO.get());
				if(sUtil.isEmpty(loginData.customerNo)){
					$('#paymentRadio01').prop('checked', true);
					$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00437"))
					fullPopOpen('alertModalLayer')				
					if(window.location.href.indexOf('index')==-1){
						location.href = "/"+I18N.language+"/main/base/index.do";
					}				
					return;
				}
			}
			bookType = "Point"
			gTicket.hide()
			promotion.hide()
			let pickerType = tripType == 'RT' ? 'range' : 'single'
			$("#selectDate").data("picker" , pickerType);
			datepicker.init('[data-picker]' , 'change');		
		}else {
			gTicket.show()
			promotion.hide()		
			if(typeof JSON.parse(USER_INFO.get()).userId != 'undefined'){		
				const userData = {
					userId : JSON.parse(USER_INFO.get()).userId,
					ffpNo : JSON.parse(USER_INFO.get()).ffpNo,
					customerNo : JSON.parse(USER_INFO.get()).customerNo
				}
				const voucherSearch = {		
					cultureCode : cultureCode.replace("_","-")
				};
				$.ajax({					
					url: searchUrl+'/'+I18N.language+'/ibe/booking/selectGifticket.json',		
					type: 'POST',
					beforeSend: function (request)
      				{
						request.setRequestHeader("Channel-Code", cname);
						request.setRequestHeader("User-Id", typeof JSON.parse(USER_INFO.get()).userId != 'undefined' ? JSON.parse(USER_INFO.get()).userId : "");
						request.setRequestHeader("User-Name", encodeURIComponent(JSON.parse(USER_INFO.get()).name) != 'undefined' ? encodeURIComponent(JSON.parse(USER_INFO.get()).name) : "");		
        			},	
					data	: {
						voucherSearch : JSON.stringify(voucherSearch),
						userData : JSON.stringify(userData),
						pageId : pageId
					},    
					success: function (data) {
						if(data.code == '0000'){
							const gifticketsJson = data.data.voucherList;
							$('#selectGifticket').empty();			 
							let option = [];
							if(typeof gifticketsJson =="undefined" || gifticketsJson.length ==0){										
								$('[name=nodataGift]').show();
								$('#selectGifticket').hide();		
							}else{	
								option.push($("<option value=''>"+BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00188")+"</option>"));
								$('#selectGifticket').append(option);					
								for(let count = 0; count < gifticketsJson.length; count++){								
									if(gifticketsJson[count].tripType === "1"){
										gifticketsJson[count].tripType = "OW"
									}else if(gifticketsJson[count].tripType === "2"){
										gifticketsJson[count].tripType = "RT"
									}else if(gifticketsJson[count].tripType === "3"){
										gifticketsJson[count].tripType = "MD"
									}
									let selected = "";
									if(window.location.href.indexOf('AvailSearch')>-1){
										if(availSearchDataJSON.voucherInfo.voucherReferenceNo === gifticketsJson[count].voucherReferenceNo){
											selected = "selected"
										}
									}													   								
									option.push(
									$('<option '+selected+' data-value=\'{"voucherType":"'+gifticketsJson[count].voucherType+'","voucherBasisCode":"'+gifticketsJson[count].voucherBasisCode+
									'","voucherReferenceNo":"'+gifticketsJson[count].voucherReferenceNo+'","voucherCurrencyCode":"'+gifticketsJson[count].voucherCurrencyCode+
									'","voucherAmount":"'+gifticketsJson[count].voucherAmount+'","classOfService":"'+gifticketsJson[count].classOfService+
									'","productClass":"'+gifticketsJson[count].productClass+'","maximumPax":"'+gifticketsJson[count].maximumPax+'","tripType":"'+gifticketsJson[count].tripType+'"}\'>'+
									gifticketsJson[count].voucherName+'</option>'));		
								}
								$('#selectGifticket').append(option);	
								$('div[name=nodataGift]').hide();
								$('#selectGifticket').show();							
							}
							bookType = "Voucher"
							let pickerType = tripType == 'RT' ? 'range' : 'single'
							$("#selectDate").data("picker" , pickerType);
							datepicker.init('[data-picker]' , 'change');		
						}else{
							$('[name=nodataGift]').show();
								$('#selectGifticket').hide();		
						}
									
					}
				});				
			}else{
				fullPopOpen('confirmModalLayer')
			}
		}
	});

	//출발레이어 열기
	btnStart.on('click', function () {
		$('.flight-layer').hide();
		$('.date-layer').hide();	
		customerLayer.hide();	
		$('.predictive-search').hide();
		$('.quick-booking').addClass('active')
		$('.quick-booking').trigger('addClassActive');
		// 다구간의 두번째 구간의 출발지를 선택한 경우 
		if($(this).find('.txt')[0].id==='spanMultiDepartureDesc'){
			if($("#arrivalData").data("stationcode") == null){								
				$('#alertModalLayer').find('.alert-text').text("구간1 도착지를 먼저 선택하세요.")
				fullPopOpen('alertModalLayer')
				return;
			}
			ticketingWrap.find('.flight-start').eq(1).show();
			$("#depMultiAirportLayer").data("target" , $(this).find('.txt')[0].id)
		}else{
			ticketingWrap.find('.flight-start').eq(0).show();			
			$("#depAirportLayer").data("target" , $(this).find('.txt')[0].id)
			
			//최근검색
			setRecentSearchAirports('DEP');
			// 즐겨찾기 
			selectFavoritesAirports();
			// 프로모션 조회
			selectPromotionsAirports();	

			$('.flight-start .map-wrap').mapInnerTab();
		}
		removeUnderLine ()
		$(this).addClass('on');		
	}) 
	
	//도착레이어 열기
	btnTarget.on('click', function () {				
		$('.flight-layer').hide();
		$('.date-layer').hide();	
		ticketingWrap.find('.customer-layer').hide()
		$('.predictive-search').hide();
		$('.quick-booking').addClass('active')
		$('.quick-booking').trigger('addClassActive');
		if($(this).find('.txt')[0].id==='spanArrivalDesc'){
			if($("#departureData").data("stationcode") == null){										
				$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00176"))
				fullPopOpen('alertModalLayer')
				return;
			}
			ticketingWrap.find('.flight-target').eq(0).show();		
			$("#arrAirportLayer").data("target" , $(this).find('.txt')[0].id)			
		}else if($(this).find('.txt')[0].id==='spanMultiArrivalDesc'){
			if($("#arrivalData").data("stationcode") == null){											
				$('#alertModalLayer').find('.alert-text').text("구간1 도착지를 먼저 선택하세요.")
				fullPopOpen('alertModalLayer')
				return;
			}	
			$("#arrMultiAirportLayer").data("target" , $(this).find('.txt')[0].id)						
			if($("#multiDepartureData").data("stationcode") == null){														
				$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00176"))
				fullPopOpen('alertModalLayer')		
				return;
			}
			ticketingWrap.find('.flight-target').eq(1).show();		
		}
		removeUnderLine ()
		$(this).addClass('on');	
	})

	//날짜 선택
	btnDate.on('click', function () {
		if(typeof $("#departureData").data("stationcode") == "undefined" || $("#arrivalData").data("stationcode") == null){						
			if(tripType ==='MT'){
				$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00179"))
				fullPopOpen('alertModalLayer')			
				return;
			}else{
				$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00175"))
				fullPopOpen('alertModalLayer')			
				return;
			}
		}
		if(tripType ==='MT'){
			if($("#multiDepartureData").data("stationcode") == "" || $("#multiArrivalData").data("stationcode") == null){				
				$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00179"))
				fullPopOpen('alertModalLayer')			
				return;
			}
		}
		$('.flight-layer').hide();
		$('.date-layer').hide();
		ticketingWrap.find('.customer-layer').hide()
		$('.quick-booking').addClass('active');
	    $('.quick-booking').trigger('addClassActive');
		removeUnderLine();    	
		$(this).addClass('on');
		if($(this).attr('id')==='btnDatePicker'){
			open()			
			$("#dateLayer").show();
		}else{
			open()
			$("#multiDateLayer").show();
		}	
	});
	
	btnPassengers.on('click', function () {		
		if(typeof $("#departureData").data("stationcode") == "undefined" || $("#arrivalData").data("stationcode") == null){						
			$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00190"))
			fullPopOpen('alertModalLayer')			
			return;
		}
		
		$('.flight-layer,.date-layer').hide();
		open ()	
		if(ticketingWrap.find('.customer-layer').length > 1 && tripType =='MT'){
			customerLayer = ticketingWrap.find('.customer-layer').eq(1)
		}else{
			customerLayer = ticketingWrap.find('.customer-layer').eq(0)
		}
		customerLayer.show();
		$('.quick-booking').addClass('active')
		if(typeof $("#departureData").data("departurename") !='undefined'){		
			let customerLayerDep = $("#departureData").data("departurename")+"<span class='schedule'>"+$("#btnDatePicker").find('.txt').text().split("~")[0]+"</span>"		
			customerLayer.find('.location').eq(0)[0].innerHTML = customerLayerDep	
		}	
		if(tripType !='MT' && $("#arrivalData").data("arrivalname") != null){
			let selectedDate = tripType === 'RT' ? $("#btnDatePicker").find('.txt').text().split("~")[1] : ""
			let customerLayerDep = $("#arrivalData").data("arrivalname")+"<span class='schedule'>"+selectedDate+"</span>"		
			customerLayer.find('.location').eq(1)[0].innerHTML = customerLayerDep
		}else if(tripType =='MT'&& $("#multiArrivalData").data("arrivalname") != null){
			let customerLayerDep = $("#multiArrivalData").data("arrivalname")+"<span class='schedule'>"+$("#btnMultiDatePicker").find('.txt').text()+"</span>"		
			customerLayer.find('.location').eq(1)[0].innerHTML = customerLayerDep		
		}else if(tripType =='OW'){
			customerLayer.find('.location').eq(1).find('.schedule').remove()
		}
		removeUnderLine ();
		$(this).addClass('on');
		$("[id^='adtCount']").val(jsAdtCount)
		$("[id^='chdCount']").val(jsChdCount)
		$("[id^='infCount']").val(jsInfCount)
	});

	// 프로모션 코드 활성화 체크
	promotionInp.on('focusin', function () {
		promotionTop.addClass('focus')
		removeUnderLine ();    
	});
	promotionInp.on('focusout', function () {
		promotionTop.removeClass('focus')
	});
}

//나이계산기 연수 계산
function focusoutCalcYear(){
	const calcYear = parseInt($("input[name=txtCalYear]:visible").val());
	const date = new Date();
	const currentYear = date.getFullYear();

	$("#calcError").text("");		
	if (isNaN(calcYear)) {
		$("#calcError").text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00180"));
		$("[name=selCalMonth]:visible option:eq(0)").prop("selected", true);
		$("[name=selCalMonth]:visible").prop("disabled", true);
		$("[name=selCalDate]:visible option:eq(0)").prop("selected", true);
		$("[name=selCalDate]:visible").prop("disabled", true);	
	} else {
		if (calcYear <= 1900 || calcYear > currentYear) {
			$("#calcError").text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00180"));
			$("[name=selCalMonth]:visible option:eq(0)").prop("selected", true);
			$("[name=selCalMonth]:visible").prop("disabled", true);			
			$("[name=selCalDate]:visible option:eq(0)").prop("selected", true);
			$("[name=selCalDate]:visible").prop("disabled", true);			
		} else {
			$("[name=selCalMonth]:visible").prop("disabled", false);
			$("[name=selCalDate]:visible").prop("disabled", false);
		}
	}
}

//나이계산기 month 변경
function changeCalcMonth(){
	let year =  $("input[name=txtCalYear]:visible").val();
    let month =  $('[name=selCalMonth]:visible > option:selected').val();
	if(month.replace(/[^0-9]/g, '') == ''){
		let $addDayOption =  $("[name=selCalDate]:visible");
		$addDayOption.children('option').remove();
		$addDayOption.append(new Option(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00033"), '0', false, false));   
	}else{
		if (year !== "") {	
			if (month.length === 1) {
			  	month = "0" + month;
			}
			let date = year + month + '01';
			let maxDay = (new Date(Number(date.substring(0, 4)), Number(date.substring(4, 6)), 0)).getDate();
			
			let $addDayOption = $("[name=selCalDate]:visible");
			$addDayOption.children('option').remove();
			for (let i = 1; i <= maxDay; i++) {
			  $addDayOption.append(new Option(i.toString(), i.toString(), false, false));
			}
			$("[name=selCalDate]:visible option:eq(0)").prop("selected", true);
			$addDayOption.prop("disabled", false);
			$('#calcError').text("");			
		}else {
			$("[name=selCalDate]:visible option:eq(0)").prop("selected", true);
			$('#calcError').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00181"));
	    }	
	}  
}

function getAge(year, month, date, baseDate) {
	const toYear = baseDate.substring(0, 4);
	const toMonth = baseDate.substring(5, 7);
	const toDate = baseDate.substring(8, 10);
	
	const today = new Date(toYear, toMonth, toDate);
	const birthDate = new Date(year, month, date);
	
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
	  age--;
	}
	return age;
}

//즐겨찾기 공항 DB 저장
function insertFavoritesAirport(airportCode) {
	$.ajax({		
		url: searchUrl+'/'+I18N.language+'/ibe/booking/insertAirportFavorites.json',		
		type: 'post',
		beforeSend: function (request)
        {
            request.setRequestHeader("User-Id", JSON.parse(USER_INFO.get()).userId != 'undefined' ? JSON.parse(USER_INFO.get()).userId : "");
			request.setRequestHeader("User-Name", encodeURIComponent(JSON.parse(USER_INFO.get()).name) != 'undefined' ? encodeURIComponent(JSON.parse(USER_INFO.get()).name) : "");		
        },		
		data: {			
			mbrId: JSON.parse(USER_INFO.get()).userId,
			airportCode: airportCode,
			pageId : pageId
		},
		success: function (data) {
			const result = data.result;
		},
		error: function () {
		}
	});
}

function closeLoginModal(obj){
	if(bookType === 'Common'){
		$(".radio-wrap").find('.radio__input').eq(0).trigger('click');
	}else if(bookType === 'Point'){
		$(".radio-wrap").find('.radio__input').eq(1).trigger('click');
	}
	$("#txtPromoCode").val('')
	closeCurrentModal(obj);
}


function pickerMoveMonth(){
	let year = $(".flatpickr-wrapper").eq(0).find(".dayContainer").eq(0).find('.year').html()
	let month = $(".flatpickr-wrapper").eq(0).find(".dayContainer").eq(0).find('.month').html()
	if(month.length ==1){
		month = "0"+month;
	}
	if(bookType ==='Common' && $("#txtPromoCode").val() == "" && $("#paymentRadio01").is(":checked")){	
		let stationType = 'ARR'
		if($(".date-layer:visible").attr('id') == 'multiDateLayer'){
			stationType = 'MultiARR'
		}
		searchlowestFareCalendar(stationType);
	}
}

function selectDate(){
	let startRange,endRange;
	let ticketingDate = $('.date-layer:visible').parent().prev().find('.ticketing-date')

	if(tripType == 'RT'){
		if(typeof $('.endRange').attr('aria-label') =='undefined'){
			return;
		}
		startRange = $("#selectDate").data("startdate")
		endRange = $('.endRange').attr('aria-label')
		ticketingDate.find('.txt').text(dUtil.dateWeekNameTime(startRange,weekLang)+" ~ "+dUtil.dateWeekNameTime(endRange,weekLang))
		$("#departureDate").val(startRange.substring(0,4)+'-'+startRange.substring(4,6)+'-'+startRange.substring(6,8));
		$("#arrivalDate").val(endRange.substring(0,4)+'-'+endRange.substring(4,6)+'-'+endRange.substring(6,8));
	}else{	
		if($("#multiDateLayer").is(":visible")){
			startRange = $("#selectMultiDate").next().find('.flatpickr-day.selected').eq(0).attr('aria-label')		
			$("#multiArrivalDate").val(startRange.substring(0,4)+'-'+startRange.substring(4,6)+'-'+startRange.substring(6,8));
			if($("#departureDate").val().replace(/[^0-9]/g,'') > startRange){
				$("#departureDate").val(startRange.substring(0,4)+'-'+startRange.substring(4,6)+'-'+startRange.substring(6,8));
				$('.ticketing-date').eq(0).find('.txt').text(dUtil.dateWeekNameTime(startRange,weekLang))				
			}
		}else{
			startRange = $("#selectDate").next().find('.flatpickr-day.selected').eq(0).attr('aria-label')					
			$("#departureDate").val(startRange.substring(0,4)+'-'+startRange.substring(4,6)+'-'+startRange.substring(6,8));
			//MT의 경우 구간2를 자동 SET 
			if(tripType ==='MT'){			
				if(startRange >= $("#multiArrivalDate").val().replace(/[^0-9]/g,'')){
					$('.ticketing-date').eq(1).find('.txt').text(dUtil.dateWeekNameTime(startRange,weekLang))
					$("#multiArrivalDate").val(startRange.substring(0,4)+'-'+startRange.substring(4,6)+'-'+startRange.substring(6,8));					
				}
			}
		}
		ticketingDate.find('.txt').text(dUtil.dateWeekNameTime(startRange,weekLang))	
	}
	if($("div[id$=Layer]").is(":visible")){
		$(".layer-close").trigger('click');
	}
	activeSearchFlight();	
}

function setPassengerData(){
	if($(".customer-layer:visible").length > 0){
		jsAdtCount = $(".customer-layer:visible").find("[id^='adtCount']").val()
		jsChdCount = $(".customer-layer:visible").find("[id^='chdCount']").val()
		jsInfCount = $(".customer-layer:visible").find("[id^='infCount']").val()
	}
	if(jsAdtCount == '0'){
		if((jsChdCount == '0') || (jsChdCount != '0' && jsInfCount != '0')){
			$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00436"))
			fullPopOpen('alertModalLayer')
			return false;
		}		
	}	
	if(Number(jsAdtCount) + Number(jsChdCount) > 9  ){	
		$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00182"))
		fullPopOpen('alertModalLayer')
		return false;
	}
	if(Number(jsAdtCount) < Number(jsInfCount)){	
		$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00183"))
		$("[id^='infCount']").val($("[id^='adtCount']").val())
		fullPopOpen('alertModalLayer')
		return false;
	}
	let passengerCount = BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00005")+jsAdtCount;    
	if(jsChdCount != '0'){
		passengerCount += ", "+BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00006")+jsChdCount;
	}
	if(jsInfCount != '0'){
		passengerCount += ", "+BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00007")+jsInfCount;
	}		
	if(window.location.href.indexOf('AvailSearch')>-1){	
		$(".customer-layer:visible").parent().prev().find('.btn-passengers').eq(0).children().eq(0)[0].innerText = passengerCount
	}else{
		$(".ticketing-row-bot").find('.btn-passengers').eq(0).children().eq(0)[0].innerText = passengerCount
	}	
	if($("div[id$=Layer]").is(":visible")){
		$(".layer-close").trigger('click');
	}
}

function exchangeRoute(){
	let selectedDepartureData = $("#departureData")
	let selectedDepartureDesc = $("#spanDepartureDesc")
	let selectedArrivalData = $("#arrivalData")	
	let selectedArrivalDesc = $("#spanArrivalDesc")
	let stationType = "ARR"
	if($(this).data('route') ==='Multi'){
		selectedDepartureData = $("#multiDepartureData")
		selectedDepartureDesc = $("#spanMultiDepartureDesc")
		selectedArrivalData = $("#multiArrivalData")
		selectedArrivalDesc = $("#spanMultiArrivalDesc")
		stationType = "MultiARR"
	}	
	if(selectedDepartureData.data("stationcode") != null &&  selectedArrivalData.data("stationcode") != null){
		let temCode = selectedDepartureData.data("stationcode")
		let temName = selectedDepartureData.data("departurename")
		let temHTML = selectedDepartureDesc[0].textContent
			
		selectedDepartureDesc[0].textContent = selectedArrivalDesc[0].textContent;
		selectedDepartureData.data("stationcode" , selectedArrivalData.data("stationcode"));
		selectedDepartureData.data("departurename" , selectedArrivalData.data("arrivalname"));		

		selectedArrivalDesc[0].textContent = temHTML;
		selectedArrivalData.data("stationcode" , temCode);
		selectedArrivalData.data("arrivalname" , temName);
		//최저가 재조회
		if(bookType ==='Common' && $("#txtPromoCode").val() == "" && $("#paymentRadio01").is(":checked")){	
			searchlowestFareCalendar(stationType);
		}
	}	
}

// 항공권 조회 
function setSearchAvailParam(submitType , clickObject) {
	let trips = [];
	let passengers = [];
	let classOfService = [];
	let discountInfo = {};
	let voucherInfo = {};		
	bookType = "Common"
	
	if(jsAdtCount != '0'){
		const passenger = {
		  type: 'ADT',
		  count: jsAdtCount
		}
		passengers.push(passenger)
	}
	if(jsChdCount != '0'){
		const passenger = {
		  type: 'CHD',
		  count: jsChdCount
		}
		passengers.push(passenger)
	}
	if(jsInfCount != '0'){
		const passenger = {
		  type: 'INF',
		  count: jsInfCount
		}
		passengers.push(passenger)
	}	
	if($("#txtPromoCode").val() != ''){		
		let promotion = checkPromoCode()
		if(promotion.code !='0000'){
			showPromoCodeError();
			return false;
		}
		if(typeof promotion.data.promotion != 'undefined'){
			if(USER_INFO.get() != '{}'){
				let loginData = JSON.parse(USER_INFO.get());
				if(sUtil.isEmpty(loginData.customerNo)){
					showPromoCodeError();
					return false;
				}
			}
			discountInfo = {
				cardCode : promotion.data.promotion.cardCode,
				discountType: "P",
				discountNumber: promotion.data.promotion.promotionCode,
				inputType : $("#txtPromoCode").val()				
			}
			bookType = "Promotion"			
		}
		if(typeof promotion.data.foc != 'undefined'){
			if(domIntType =='D' && (jsAdtCount != '1' || jsChdCount != '0')){
				$('#alertModalLayer').find('.alert-text').text("성인1 또는 성인1, 유아1 예약만 가능합니다.")
				fullPopOpen('alertModalLayer')
				return false;
			}
			
			if(domIntType =='I' && (jsAdtCount != '1' || jsChdCount != '0' || jsInfCount != '0')){
				$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00435")) 
				fullPopOpen('alertModalLayer')
				return false;
			}
			discountInfo = {
				discountType: promotion.data.foc.focNumber.startsWith('FT') == true ? 'FT' : 'JP' ,
				discountNumber: promotion.data.foc.focNumber,
				fareTypes : promotion.data.foc.fareType,
				fareBasis : promotion.data.foc.fareBasis,
				discountCode : typeof promotion.data.foc.paxDiscountCode ==='undefined' ? "" : promotion.data.foc.paxDiscountCode,				
				inputType : $("#txtPromoCode").val()
			}
			bookType = "FOC"
		}
	}
	
	if(tripType =='RT'){
		if($("#departureDate").val().replace(/[^0-9]/g,'') > $("#arrivalDate").val().replace(/[^0-9]/g,'')){					
			$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00186"))
			fullPopOpen('alertModalLayer')						
			return false;
		}
	}else if(tripType =='MT'){
		if($("#departureDate").val().replace(/[^0-9]/g,'') > $("#multiArrivalDate").val().replace(/[^0-9]/g,'')){	
			$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00186"))
			fullPopOpen('alertModalLayer')			
			return false;
		}
	}
	
	if($("#paymentRadio02").is(":checked")){
		bookType ="Point"
	}
	
	if($("#paymentRadio03").is(":checked") && submitType){
		if($("#selectGifticket").val() != null && $("#selectGifticket").val() != ''){
			let checkVoucherRes = checkVoucher()			
			if(checkVoucherRes !='0000'){		
				if(checkVoucherRes === '0002'){
					$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00167"))   
					fullPopOpen('alertModalLayer')	
					return;
				}else if(checkVoucherRes === '0003'){
					$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00168"))
					fullPopOpen('alertModalLayer')	
					return;
				}else{					
					$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00169"))
					fullPopOpen('alertModalLayer')
					return;		
				}	
			}
			
			for(let i=0; i<$("#selectGifticket").find(":selected").data('value').classOfService.length; i++){
				if($("#selectGifticket").find(":selected").data('value').classOfService[i] != ','){
					classOfService.push($("#selectGifticket").find(":selected").data('value').classOfService[i])
				}			
			}
			voucherInfo = {
				voucherType: $("#selectGifticket").find(":selected").data('value').voucherType,
				voucherBasisCode : $("#selectGifticket").find(":selected").data('value').voucherBasisCode,
				voucherReferenceNo : $("#selectGifticket").find(":selected").data('value').voucherReferenceNo,
				voucherAmount : $("#selectGifticket").find(":selected").data('value').voucherAmount,
				voucherCurrencyCode: $("#selectGifticket").find(":selected").data('value').voucherCurrencyCode,
				classOfService: classOfService,
				productClass: $("#selectGifticket").find(":selected").data('value').productClass ==='undefined' ? '' : $("#selectGifticket").find(":selected").data('value').productClass ,
				maximumPax: $("#selectGifticket").find(":selected").data('value').maximumPax,
				tripType: $("#selectGifticket").find(":selected").data('value').tripType
				
			}
			bookType = "Voucher"
		}else{			
			$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00169"))
			fullPopOpen('alertModalLayer')	
			return;
		}
	}

	const trip1 = {
		originAirport: $("#departureData").data("stationcode"),
		originName: $("#departureData").data("departurename"),
		destinationAirport: $("#arrivalData").data("stationcode"),
	    destinationName: $("#arrivalData").data("arrivalname"),
	    flightDate: $("#departureDate").val(),
		sortOptions : "EarliestDeparture,EarliestArrival"
	}			
	trips.push(trip1);
	if(tripType =='RT'){
		let trip2;
		trip2 = {
			originAirport: $("#arrivalData").data("stationcode"),
			originName: $("#arrivalData").data("arrivalname"),
			destinationAirport: $("#departureData").data("stationcode"),
			destinationName: $("#departureData").data("departurename"),
			flightDate: $("#arrivalDate").val(),
			sortOptions : "EarliestDeparture,EarliestArrival"
		}
		trips.push(trip2);	
	}
	if(tripType =='MT'){
		let trip2;
		trip2 = {
			originAirport: $("#multiDepartureData").data("stationcode"),
			originName: $("#multiDepartureData").data("departurename"),
			destinationAirport: $("#multiArrivalData").data("stationcode"),
			destinationName: $("#multiArrivalData").data("arrivalname"),
			flightDate: $("#multiArrivalDate").val(),
			sortOptions : "EarliestDeparture,EarliestArrival"
		}
		trips.push(trip2);
		
		if($("#multiDepartureData").data("countrycode") == 'KR' && $("#multiArrivalData").data("countrycode") == 'KR'
		&& $("#departureData").data("countrycode") == 'KR' && $("#arrivalData").data("countrycode") == 'KR'){
			domIntType = 'D'
		}else{
			domIntType = 'I'
		}
		if($("#departureData").data("stationcode") === $("#multiArrivalData").data("stationcode")
			&& $("#arrivalData").data("stationcode") === $("#multiDepartureData").data("stationcode")){
			tripType = 'RT'
		}		
	}
	const availSearchData = {		
		tripRoute: trips,		
		passengers: passengers,
		tripType : tripType,
		bookType : bookType,
		domIntType : domIntType,
		cultureCode:cultureCode.replace("_","-"),
		lowfareIncludeTaxesAndFee : "false",
		discountInfo : discountInfo,
		voucherInfo : voucherInfo		
	};
	$('#availSearchData').val(JSON.stringify(availSearchData));	
	if(submitType){
		if(availSearchData.tripRoute[0].originAirport == null || availSearchData.tripRoute[0].destinationAirport == null){
			$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00175"))
			fullPopOpen('alertModalLayer')
			return;
		}
		if(bookType ==='Common' && tripType !='MT'){		
			let recentSearchRoutes = []
			if(localStorage.getItem('recentSearchRoutes') != null) {		
				let oldRecentSearchRoutes = JSON.parse(localStorage.getItem('recentSearchRoutes'));
				let skipFlag = false;
				for(let i=0; i<oldRecentSearchRoutes.length; i++){
					let oldRecentSearchRoute = oldRecentSearchRoutes[i]
					recentSearchRoutes.push(oldRecentSearchRoute)
					//가는편 여정 비교
					if(oldRecentSearchRoute.tripRoute[0].originAirport === availSearchData.tripRoute[0].originAirport &&
						oldRecentSearchRoute.tripRoute[0].destinationAirport === availSearchData.tripRoute[0].destinationAirport &&
						oldRecentSearchRoute.tripRoute[0].flightDate === availSearchData.tripRoute[0].flightDate){
						skipFlag = true;
					}	
					//오는편 여정 비교
					if(oldRecentSearchRoute.tripType ==='RT' && skipFlag && availSearchData.tripRoute.length > 1){			
						if(oldRecentSearchRoute.tripRoute[1].originAirport === availSearchData.tripRoute[1].originAirport &&
							oldRecentSearchRoute.tripRoute[1].destinationAirport === availSearchData.tripRoute[1].destinationAirport &&
							oldRecentSearchRoute.tripRoute[1].flightDate === availSearchData.tripRoute[1].flightDate){
							skipFlag = true;
						}
					}
					
					for(let j=0; j<oldRecentSearchRoute.passengers.length; j++){
						for(let k=0; k<availSearchData.passengers.length; k++){
							if(oldRecentSearchRoute.passengers[j].type === availSearchData.passengers[k].type){
								if(oldRecentSearchRoute.passengers[j].count != availSearchData.passengers[k].count){
									skipFlag = false;
									break;
								}
							}
						}
					}
				}
				//맨앞에 추가
				if(!skipFlag){
					recentSearchRoutes.unshift(availSearchData)
					if(recentSearchRoutes.length > 11){
						//10개까지만 저장
						recentSearchRoutes.pop();
					}
				}
				
				localStorage.setItem('recentSearchRoutes', JSON.stringify(recentSearchRoutes));
			}else{
				//아무것도 없을때는 바로 추가
				recentSearchRoutes.push(availSearchData)
				localStorage.setItem('recentSearchRoutes', JSON.stringify(recentSearchRoutes));
			}
		}
		
		if(window.location.href.indexOf('AvailSearch')>-1){	
			availSearchDataJSON = availSearchData;
			if($('div[name=ARR_area]').css('display') != 'none' && typeof clickObject != 'undefined'){
				callAvailSchedule()
			}else{
				$('#availSearchForm').attr({'method': 'POST','onsubmit': 'return true','action': '../../ibe/booking/AvailSearch.do'}).submit();	
			}				
		}else{			
			$('#availSearchForm').attr({'method': 'POST','onsubmit': 'return true','action': '../../ibe/booking/AvailSearch.do'}).submit();	
		}	
	}	
}
function clearDate(){
	if(typeof $("#departureData").data("stationcode") !='undefined' && typeof $("#arrivalData").data("stationcode") !='undefined'){
		pickerMoveMonth($(this).data('station'));
	}
}

function chkAdtCount(multi){
	if($("#infCount"+multi).val() >= $("#adtCount"+multi).val()){		
		$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00183"))
		fullPopOpen('alertModalLayer')
		$("[id^='infCount']").val($("[id^='adtCount']").val()-1)
	}
}

function chkInfCount(multi){
	if($("#infCount"+multi).val() >= $("#adtCount"+multi).val()){		
		$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00183"))
		fullPopOpen('alertModalLayer')
		$("[id^='infCount']").val($("[id^='adtCount']").val()-1)
	}
}

function removeUnderLine () {
	$('.main-ticketing, .ticketing').find('.start, .target, .btn-date, .btn-passengers').removeClass('on')
} 

function closeLayer(){
	$(".layer-close").trigger('click')
}

function showPromoCodeError(){
	$("#txtPromoCode").val('')
	if(typeof $("#WarnPromoCode")[0] ==='undefined'){				
		//항공권 선택화면은 ALERT 표출
		$('#alertModalLayer').find('.alert-text').text(BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00157"))
		fullPopOpen('alertModalLayer')
	}else{
		$("#WarnPromoCode").addClass("error");
		$("#WarnPromoCode").show()
	}
}

function clickPrevButton(){
	if($("#depAirportLayer").is(":visible")){
		$("#depAirportLayer").find(".layer-close").trigger('click');
	}else if($("#arrAirportLayer").is(":visible")){
		$("#arrAirportLayer").find(".layer-close").trigger('click');
		$("#spanDepartureDesc").parent().trigger('click');	
	}else if($("#dateLayer").is(":visible")){
		$("#dateLayer").find(".layer-close").trigger('click');
		$("#spanArrivalDesc").parent().trigger('click');	
	}else if($("#customerLayer").is(":visible")){
		$("#customerLayer").find(".layer-close").trigger('click');
	}else if($("#depMultiAirportLayer").is(":visible")){
		$("#depMultiAirportLayer").find(".layer-close").trigger('click');
	}else if($("#arrMultiAirportLayer").is(":visible")){
		$("#arrMultiAirportLayer").find(".layer-close").trigger('click');
		$("#spanMultiDepartureDesc").parent().trigger('click');	
	}else if($("#multiDateLayer").is(":visible")){
		$("#multiDateLayer").find(".layer-close").trigger('click');
		$("#spanMultiArrivalDesc").parent().trigger('click');	
	}else if($("#multiCustomerLayer").is(":visible")){
		$("#multiCustomerLayer").find(".layer-close").trigger('click');
	}
}

//am4 map
let AirportMapLayer = function (mapNum) {	
	am4core.useTheme(am4themes_animated);	
	am4core.addLicense("MP280293716")
	var chart = am4core.create(mapNum, am4maps.MapChart);
	chart.geodata = am4geodata_worldHigh;

	// 기본 지역 셋팅 
	chart.homeZoomLevel = 5;
	chart.homeGeoPoint = {
		latitude: 30,
		longitude: 95
	};
	chart.projection = new am4maps.projections.Miller();

	//기본 권역 static 설정
	this.changeZoomArea = function (num) {
		let latitude , longitude , zoomLevel
		if(num == 'RGTP000001'){
			latitude = 35.5593
			longitude = 126.8030
			zoomLevel = 25
		}else if(num == 'RGTP000002'){
			latitude = 35.41
			longitude = 125.8030
			zoomLevel = 10
		}else if(num == 'RGTP000003'){
			latitude = 13.7522
			longitude = 100.494
			zoomLevel = 10
		}else if(num == 'RGTP000004'){
			latitude = 15.1189
			longitude = 145.729
			zoomLevel = 25
		}else if(num == 'RGTP000005'){
			latitude = 43.13
			longitude = 131.9
			zoomLevel = 25
		}
		chart.zoomToGeoPoint({latitude: latitude,longitude: longitude}, zoomLevel , true);		
	}
    const labelsContainer = chart.createChild(am4core.Container);
    labelsContainer.isMeasured = false;
    labelsContainer.x = 80;
    labelsContainer.y = 27;
    labelsContainer.layout = "horizontal";
    labelsContainer.zIndex = 1;
    
    const originTitle = labelsContainer.createChild(am4core.Label);
    originTitle.text = "";
    originTitle.isMeasured = true;
    originTitle.fill = am4core.color("#cc0000");
    originTitle.fontSize = 15;
    originTitle.valign = "middle";
    originTitle.dy = 2;
   	originTitle.marginLeft = 15;

    const destinationTitle = labelsContainer.createChild(am4core.Label);
    destinationTitle.text = "";
    destinationTitle.isMeasured = true;
    destinationTitle.fill = am4core.color("#cc0000");
    destinationTitle.fontSize = 15;
    destinationTitle.valign = "middle";
    destinationTitle.dy = 2;
    destinationTitle.marginLeft = 15;

	//배경 바다색 정의
	chart.background.fill = am4core.color("#BFE3FF");
	chart.background.fillOpacity = 1;

    //The world 지도 데이터를 이용하여 지도를 그림
    let worldPolygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    worldPolygonSeries.useGeodata = true;
    worldPolygonSeries.fillOpacity = 1;
    worldPolygonSeries.exclude = ["AQ"];    // Exclude Antractica 남극 대륙 제외 ISO2 코드('KR')

	// Configure series
	let polygonTemplate = worldPolygonSeries.mapPolygons.template;
	polygonTemplate.fill = am4core.color("#F8F8F8");
	polygonTemplate.fillOpacity = 1;
	
	// Create image series
	var ImageSeries = chart.series.push(new am4maps.MapImageSeries());
		
	// Create Icon
	var ImageTemplate = ImageSeries.mapImages.template;
	var marker = ImageTemplate.createChild(am4core.Image);
	marker.href = "/resources/images/icon/pin_destination.png";
	marker.width = 20;
	marker.height = 20;
	marker.nonScaling = true;
	marker.horizontalCenter = "middle";
	marker.verticalCenter = "bottom";
	
	//클릭 비활성화    
	ImageTemplate.cursorOverStyle = am4core.MouseCursorStyle.default;
	
	// Set property fields
	ImageTemplate.propertyFields.latitude = "latitude";
	ImageTemplate.propertyFields.longitude = "longitude";

    // 지도의 초기 데이터 주입
    if(mapNum.indexOf('target')>-1){
		//가는편의 공항을 그려줘야 선이 그려짐
		for(let i=0; i<departureAiportsMap.length; i++){
			if(departureAiportsMap[i].stationCode == $("#departureData").data("stationcode")){
				arrivalAiportsMap.push(departureAiportsMap[i])
				break;
			}
		}	    
    	ImageSeries.data = arrivalAiportsMap;
	}else{
		 ImageSeries.data = departureAiportsMap;
	}

    chart.events.on("ready", function () {
    	//조회된 도시 중 가장 첫번째 도시로 ZOOM
		zoomGeoPoint(ImageSeries.dataItems.getIndex(0));
    })
    
	function zoomGeoPoint(drawLineData) {	
	    var dataContext = drawLineData.dataContext;
	    chart.zoomToGeoPoint({ latitude: dataContext.latitude, longitude: dataContext.longitude }, 20.0, true);	
	}
	
	//라인 object 생성
	let lineSeries = chart.series.push(new am4maps.MapLineSeries());
	
	this.zoomIn = function(_this){		
		if($("#depAirportLayer").is(":visible")){
			let latitude = _this.find('button').eq(0).data('latitude')
			let longitude = _this.find('button').eq(0).data('longitude')	
			chart.zoomToGeoPoint({ latitude: latitude, longitude: longitude }, 35.0, true);
			_this.data('selected' , 'true');
		}		
		if($("#arrAirportLayer").is(":visible")){
			//도착지 정보
			let arrivalMapData;
			for(let i=0; i<arrivalAiportsMap.length; i++){
				if(arrivalAiportsMap[i].stationCode === _this.find('button').eq(0).data('stationcode')){
					arrivalMapData = arrivalAiportsMap[i]
					break;
				}
			}		
			
			let departureMapData = [];
			departureMapData.push($("#departureData").data("stationcode"));
			departureMapData.push($("#departureData").data("latitude"));
			departureMapData.push($("#departureData").data("longitude"));
			
			let drawLineData = {		
				departureMapData : departureMapData,
				arrivalMapData: arrivalMapData			
			};			
			airportMapLayer.showLines(drawLineData)			
		}
	}

    this.showLines = function(drawLineData){    
		//기존 LINE 삭제    
		lineSeries.mapLines.clear();

		const arrivalMapData = drawLineData.arrivalMapData;
        const departureMapData = drawLineData.departureMapData;

		$.ajax({
			url: searchUrl+'/'+I18N.language+'/ibe/booking/selectFlyingTime.json',			
			type: 'POST',
			beforeSend: function (request)
        	{
            	request.setRequestHeader("User-Id", JSON.parse(USER_INFO.get()).userId != 'undefined' ? JSON.parse(USER_INFO.get()).userId : "");
				request.setRequestHeader("User-Name", encodeURIComponent(JSON.parse(USER_INFO.get()).name) != 'undefined' ? encodeURIComponent(JSON.parse(USER_INFO.get()).name) : "");		
        	},
			data	: {
				departure : departureMapData[0],
				arrival : arrivalMapData.stationCode,
				pageId : pageId
			},    
			success: function (data) {
				//라인 색상
			    lineSeries.mapLines.template.stroke = am4core.color("#ff5500");
				
				//tooltip 배경색
				lineSeries.fill = am4core.color("#ff5500");
				lineSeries.mapLines.template.alwaysShowTooltip = true
			    lineSeries.mapLines.template.shortestDistance = false;  // If you'd like the lines to appear straight, use shortestDistance = false setting:
			    lineSeries.mapLines.template.strokeWidth = 3;
			    lineSeries.mapLines.template.nonScalingStroke = true;

			    //toolTip Text
				if(typeof data.data.FLIGHT_TM !="undefined"){
					lineSeries.mapLines.template.tooltipHTML = data.data.FLIGHT_TM.substring(0,2)+":"+data.data.FLIGHT_TM.substring(2,4)
					lineSeries.mapLines.template.tooltipPosition = "fixed"
				}else{
					lineSeries.mapLines.template.tooltipHTML = BIZ_COMMONS_SCRIPT.getI18n("0000000307.msg00439")
					lineSeries.mapLines.template.tooltipPosition = "fixed"
				}
				//라인 그리기
				let line = lineSeries.mapLines.create();
				line.imagesToConnect = [departureMapData[0] , arrivalMapData.id];
				//선을 그었을때 그 중간값
				let zoomLatitude = (arrivalMapData.latitude+departureMapData[1])/2
				let zoomLongitude = (arrivalMapData.longitude+departureMapData[2])/2
				let zoomLevel = 20.0
				if(Math.abs(arrivalMapData.latitude-departureMapData[1]) > 20){
					zoomLevel = 8.0		
				}
        		chart.zoomToGeoPoint({latitude: zoomLatitude,longitude: zoomLongitude}, zoomLevel, true);       
			}
		});
	}
	
	this.clearOldLines = function(){
      lineSeries.mapLines.clear();
      lineSeries.toBack();
      worldPolygonSeries.toBack();
    }

    const graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());  // 격자 모양 출력
    graticuleSeries.mapLines.template.line.strokeOpacity = 0.04;                // 격자의 투명도

	let selectedStationcode = "";
	let selectedMapButton;
	if($("#depAirportLayer").is(":visible") && typeof $("#departureData").data("stationcode") != "undefined"){
		selectedStationcode = $("#departureData").data("stationcode")
		selectedMapButton = $(".tab-swipe-wrapper").eq(0)
	}
	if($("#arrAirportLayer").is(":visible") && typeof $("#arrivalData").data("stationcode") != "undefined"){
		selectedStationcode = $("#arrivalData").data("stationcode")
		selectedMapButton = $(".tab-swipe-wrapper").eq(1)
	}
	if($("#depMultiAirportLayer").is(":visible") && typeof $("#multiDepartureData").data("stationcode") != "undefined"){
		selectedStationcode = $("#multiDepartureData").data("stationcode")
		selectedMapButton = $(".tab-swipe-wrapper").eq(2)
	}
	if($("#arrMultiAirportLayer").is(":visible") && typeof $("#multiArrivalData").data("stationcode") != "undefined"){
		selectedStationcode = $("#multiArrivalData").data("stationcode")
		selectedMapButton = $(".tab-swipe-wrapper").eq(3)
	}
	if(selectedStationcode !=""){
		for(let i=0; i<selectedMapButton.find('.tab-swipe-item').length; i++){
			if(selectedStationcode === selectedMapButton.find('.tab-swipe-item').eq(i).find('button').eq(0).data('stationcode')){
				selectedMapButton.find('.tab-swipe-item').eq(i).addClass('on')
			}else{
				selectedMapButton.find('.tab-swipe-item').eq(i).removeClass('on')
			}
		}
	}
}

//amchart 상단 , 하단 버튼 클릭
$.fn.mapInnerTab = function () {
	return this.each(function (i) {
		var flightMap = $(this);
	    var areaBtn = flightMap.find('.tab-top-btn');
	    var tabSwiper = flightMap.find('.tab-swipe');
		//상단 버튼
		areaBtn.on('click', function (e) {
			e.preventDefault();
			areaBtn.removeClass('on');
			$(this).addClass('on');
			let selectedTopIdx = $(this).data('areacode')
			airportMapLayer.changeZoomArea(selectedTopIdx);
			let selectedAirportLayer;
			if($("#depAirportLayer").is(":visible")){
			  selectedAirportLayer = $("#depAirportLayer")
			}else{
				selectedAirportLayer = $("#arrAirportLayer")
			} 		
			for(let i=0; i<selectedAirportLayer.find('div.tab-swipe-wrapper').find('.btn-choose-city').length; i++){
				let $this = selectedAirportLayer.find('div.tab-swipe-wrapper').find('.btn-choose-city').eq(i)
				if($this.data('areacode') == selectedTopIdx){
			    	$this.parent().show();
				}else{
					$this.parent().hide();
			    }
			} 
		})
		// 하단 스와이프
		var tabSwipe = new Swiper(tabSwiper, {    
			slidesPerView: 'auto',
		});
	})
}