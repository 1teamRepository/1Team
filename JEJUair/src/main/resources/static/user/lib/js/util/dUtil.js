/**
 * =======================================================================================
 * [dUtil.js] - Date Utility
 * ---------------------------------------------------------------------------------------
 *  지원 포멧 : y.m.d, y/m/d, y-m-d, h:m:s, y.m, y/m, y-m, h:m
 *  
 * 	- cvtDate(date, format)						일자 형식 변경(ymd or y?m?d -> y?m?d)
 *  - cvtTime(time, format)						시간 형식 변경(hms or h?m?s -> h?m?s)
 *  - cvtDateTime(dt, format)					일시 형식 변경(ymdhms or y?m?d h?m?s -> y?m?d h?m?s)
 *  - toDate()									현재 날짜를 ymd 형태로 반환
 *  - toTime()									현재 시간을 hms 형태로 반환
 *  - toDateTime()								현재 일시를 ymdhms 형태로 반환
 *  - termDate(termType, term, format, date)	기간 후 날짜 반환('Y|M|D', 기간, 반환형태 default:ymd, 기준일)
 *  - termTime(termType, term, format, date)	기간 후 날짜 반환('H', 기간, 반환형태 default:ymd, 기준일)
 * =======================================================================================
 * Create by kyo.
 */
var dUtil = function() {
	return {
		cvtDate : function(date, format) {
			if(typeof date == null || date == null || date == 'null' || date == '' ) {
				return '';
			}
			
			var obj = $('<input>');
			obj.attr('type', 'hidden');
			obj.attr('name', 'tmp');
			obj.attr('data-date-format', format);
			obj.val(date);
			
			var rtn_date = obj.cvtDateFormat();
			obj.remove();
			
			return rtn_date;
		},
		cvtTime : function(time, format) {
			if(typeof time == null || time == null || time == 'null' || time == '' ) {
				return '';
			}
			
			var obj = $('<input>');
			obj.attr('type', 'hidden');
			obj.attr('name', 'tmp');
			obj.attr('data-time-format', format);
			obj.val(time);
			
			var rtn_time = obj.cvtTimeFormat();
			obj.remove();
			
			return rtn_time;
		},
		cvtDateTime : function(dt, format) {
			if(typeof dt == null || dt == null || dt == 'null' || dt == '' ) {
				return '';
			}
			
			var obj = $('<input>');
			obj.attr('type', 'hidden');
			obj.attr('name', 'tmp');
			obj.attr('data-datetime-format', format);
			obj.val(dt);
			
			var rtn_date_time = obj.cvtDateTimeFormat();
			obj.remove();
			
			return rtn_date_time;
		},
		toDate : function() {
			var dt = new Date();
			var y = dt.getFullYear();
			var m = dt.getMonth() + 1;
			var d = dt.getDate();
			
			if(parseInt(m) < 10) {
				m = '0' + parseInt(m);
			}
			if(parseInt(d) < 10) {
				d = '0' + parseInt(d);
			}
			
			return y + '' + m + '' + d;
		},
		toTime : function() {
			var dt = new Date();
			var h = dt.getHours();
			var m = dt.getMinutes();
			var s = dt.getSeconds();
			
			if(parseInt(h) < 10) {
				h = '0' + parseInt(h);
			}
			if(parseInt(m) < 10) {
				m = '0' + parseInt(m);
			}
			if(parseInt(s) < 10) {
				s = '0' + parseInt(s);
			}
			
			return h + '' + m + '' + s;
		},
		toDateTime : function() {
			
			var dt = new Date();
			var _year  = dt.getFullYear();
			var _month = dt.getMonth() + 1;
			var _day   = dt.getDate();
			
			if(parseInt(_month) < 10) {
				_month = '0' + parseInt(_month);
			}
			if(parseInt(_day) < 10) {
				_day = '0' + parseInt(_day);
			}
			
			var _hour = dt.getHours();
			var _min  = dt.getMinutes();
			var _sec  = dt.getSeconds();
			
			if(parseInt(_hour) < 10) {
				_hour = '0' + parseInt(_hour);
			}
			if(parseInt(_min) < 10) {
				_min = '0' + parseInt(_min);
			}
			if(parseInt(_sec) < 10) {
				_sec = '0' + parseInt(_sec);
			}
			
			return _year + '' + _month + '' + _day + '' + _hour + '' + _min + '' + _sec;
		},
		termDate : function(termType, term, format, date) {
			
			var _date;
			var _format;
			
			if(typeof format == 'undefined' || format == null || $.trim(format) == '') {
				_format = 'ymd';
			}
			else {
				_format = format;
			}
			
			if(typeof date == 'undefined' || date == null || $.trim(date) == '') {
				_date = this.toDate();
			}
			else {
				_date = this.cvtDate(date, 'ymd');
			}
			
			var _dateArray = [_date.substr(0,4), _date.substr(4,2), _date.substr(6,2)];
			var dt = new Date(_dateArray[0], (_dateArray[1]-1), _dateArray[2]);
			
			if(termType == 'Y') {
				dt.setYear(dt.getFullYear() + term);
			}
			else if(termType == 'M') {
				
				dt.setDate(1);
				dt.setMonth(dt.getMonth() + term);
				
				var _lastDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
				var _year  = dt.getFullYear();
				var _month = dt.getMonth() + 1;
				
				if ( (_year%4 == 0) && (_year%100 != 0) || (_year%400 == 0) ){
					_lastDays[1] = 29;
				}
				
				var _day = _lastDays[_month-1];
				
				if(_dateArray[2] > _day) {
					dt.setDate(_day);
				}
				else{
					dt.setDate(_dateArray[2]);
				}
			}
			else if(termType == 'W') {
				dt.setDate(dt.getDate() + (term*7));
			}
			else if(termType == 'D') {
				dt.setDate(dt.getDate() + term);
			}
			
			var y = dt.getFullYear();
			var m = dt.getMonth()+1;
			var d = dt.getDate();
			
			if(parseInt(m) < 10) {
				m = '0' + parseInt(m);
			}
			if(parseInt(d) < 10) {
				d = '0' + parseInt(d);
			}
			
			var ymd = y + '' + m + '' + d;
			return (this.cvtDate(ymd, _format));
		},
		TLTime : function() {			
			var date = new Date(); 						
			var _year  = date.getUTCFullYear();
			var _month = date.getUTCMonth() + 1;
			var _day   = date.getUTCDate();
			if(parseInt(_month) < 10) {
				_month = '0' + parseInt(_month);
			}
			if(parseInt(_day) < 10) {
				_day = '0' + parseInt(_day);
			}
			
			var _hour = date.getUTCHours();
			var _min  = date.getUTCMinutes();
			var _sec  = date.getUTCSeconds();
			
			if(parseInt(_hour) < 10) {
				_hour = '0' + parseInt(_hour);
			}
			if(parseInt(_min) < 10) {
				_min = '0' + parseInt(_min);
			}
			if(parseInt(_sec) < 10) {
				_sec = '0' + parseInt(_sec);
			}		
			return _year + '' + _month + '' + _day + '' + _hour + '' + _min + '' + _sec;
		},
		diffTime : function(secondDate , firstDate , changeType) {
			if (firstDate.length == 8) {
				firstDate += "000000";
			}
			if (secondDate.length == 8) {
				secondDate += "000000";
			}			
			var firstDateObject = new Date(firstDate.substring(0,4), parseInt(firstDate.substring(4,6),10) - 1, firstDate.substring(6,8), firstDate.substring(8,10), firstDate.substring(10,12), firstDate.substring(12,14)).valueOf();
			var secondDateObject = new Date(secondDate.substring(0,4), parseInt(secondDate.substring(4,6),10) - 1, secondDate.substring(6,8), secondDate.substring(8,10), secondDate.substring(10,12), secondDate.substring(12,14)).valueOf();		
			var differentTime = secondDateObject - firstDateObject;
			var differentTimeParse = null;
	
			if (changeType == "DAY") {
				differentTimeParse = Math.floor(differentTime / (24 * 60 * 60 * 1000) * 1);
			} else if (changeType == "HOUR") {
				differentTimeParse = Math.floor(differentTime / (60 * 60 * 1000) * 1);
			} else if (changeType == "MIN") {
				differentTimeParse = Math.floor(differentTime / (60 * 1000) * 1);
			} else if (changeType == "SEC") {
				differentTimeParse = Math.floor(differentTime / 1000 * 1);
			}

			return differentTimeParse;
		},		
		dateWeekNameTime : function(dateString, lang) {			
			var chgValue = "";
			var dateObj;
			var week;
			if(lang == "ko") {
				//week = new Array("일", "월", "화", "수", "목", "금", "토");
				week = new Array("\uC77C","\uC6D4","\uD654","\uC218","\uBAA9","\uAE08","\uD1A0");
			} else if(lang == "en") {
				week = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
			} else if(lang == "ja") {
				//week = new Array("日", "月", "火", "水", "木", "金", "土");
				week = new Array("\u65E5","\u6708","\u706B","\u6C34","\u6728","\u91D1","\u571F");
			} else if(lang == "zh-cn") {
				//week = new Array("日", "一", "二", "三", "四", "五", "六");
				week = new Array("\u5468\u65E5", "\u5468\u4E00" ,"\u5468\u4E8C" ,"\u5468\u4E09" ,"\u5468\u56DB" ,"\u5468\u4E94" ,"\u5468\u516D");
			} else if(lang == "zh-hk") {
				//week = new Array("週日", "週一", "週二", "週三", "週四", "週五", "週六");
				week = new Array("\u9031\u65E5", "\u9031\u4E00" ,"\u9031\u4E8C" ,"\u9031\u4E09" ,"\u9031\u56DB" ,"\u9031\u4E94" ,"\u9031\u516D");
			} else if(lang == "zh-tw") {
				//week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
				week = new Array("\u9031\u65E5", "\u9031\u4E00" ,"\u9031\u4E8C" ,"\u9031\u4E09" ,"\u9031\u56DB" ,"\u9031\u4E94" ,"\u9031\u516D");
			}
			if(dateString.length < 8 ) {
				return dateString;
			}else if(dateString.length == 8){
				var y = dateString.substr(0,4);
				var m = dateString.substr(4,2);
				var d = dateString.substr(6,2);
				chgValue = y + "." + m + "." + d;
				dateObj  = new Date(y, m - 1, d);
				return chgValue+' ('+week[dateObj.getDay()]+') ';	    
			}else{
				var y = dateString.substr(0,4);
				var m = dateString.substr(4,2);
				var d = dateString.substr(6,2);
				chgValue = y + "." + m + "." + d;
				var t = dateString.substr(8,2);
				var mm = dateString.substr(10,2);
				dateObj  = new Date(y, m - 1, d);
				return chgValue+' ('+week[dateObj.getDay()]+') ' + t +":"+mm;	    			
			}
		}
	}
}();

/**
 * =======================================================================================
 * 일자 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. ymd -> ymd
 * 2. ymd -> y/m/d
 * 3. ymd -> y-m-d
 * 4. ymd -> y.m.d
 * 5. ymd -> y년m월d일
 * =======================================================================================
 */
$.fn.cvtDateFormat = function() {

	var format = $(this).attr('data-date-format');
	var val;

	if( format == 'ymd' || format == 'ym' ) {
		val = $(this).cvtDateDefault();
	}
	else if( format == 'y/m/d' || format == 'y/m') {
		val = $(this).cvtDateSlash();
	}
	else if( format == 'y-m-d' || format == 'y-m') {
		val = $(this).cvtDateHyphen();
	}
	else if( format == 'y.m.d' || format == 'y.m') {
		val = $(this).cvtDateDot();
	}
	else if( format == 'kor' ) {
		val = $(this).cvtDateKor();
	}
	else {
		val = $(this).val();
	}
	
	return val;
};

/**
 * =======================================================================================
 * 일자 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. ymd 	-> ymd
 * 2. y?m?d -> ymd
 * =======================================================================================
 */
$.fn.cvtDateDefault = function() {
	var val = $(this).val();
	var format = $(this).attr('data-date-format');
	
	var regexp = /[^0-9]/g;
	val = val.replace(regexp, '');
	
	var y = val.substr(0,4);
	var m = val.substr(4,2);
	var d = val.substr(6,2);
	
	if(parseInt(m) < 10) {
		m = '0' + parseInt(m);
	}
	if(parseInt(d) < 10) {
		d = '0' + parseInt(d);
	}

	if(format == 'ym') {
		return y + m;
	}
	else {
		return y + m + d;
	}
};

/**
 * =======================================================================================
 * 일자 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. ymd -> y-m-d
 * =======================================================================================
 */
$.fn.cvtDateHyphen = function() {
	var val = $(this).cvtDateDefault();
	var format = $(this).attr('data-date-format');
	
	var y = val.substr(0,4);
	var m = val.substr(4,2);
	var d = val.substr(6,2);
	
	if(format == 'y-m') {
		return y + "-" + m;
	}
	else {
		return y + "-" + m + "-" + d;
	}
};

/**
 * =======================================================================================
 * 일자 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. ymd - > y.m.d
 * =======================================================================================
 */
$.fn.cvtDateDot = function() {
	var val = $(this).cvtDateDefault();
	var format = $(this).attr('data-date-format');
	
	var y = val.substr(0,4);
	var m = val.substr(4,2);
	var d = val.substr(6,2);
	
	if(format == 'y.m') {
		return y + "." + m;
	}
	else {
		return y + "." + m + "." + d;
	}
};

/**
 * =======================================================================================
 * 일자 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. ymd - > y/m/d
 * =======================================================================================
 */
$.fn.cvtDateSlash = function() {
	var val = $(this).cvtDateDefault();
	var format = $(this).attr('data-date-format');
	
	var y = val.substr(0,4);
	var m = val.substr(4,2);
	var d = val.substr(6,2);
	
	if(format == 'y/m') {
		return y + "/" + m;
	}
	else {
		return y + "/" + m + "/" + d;
	}
};

/**
 * =======================================================================================
 * 일자 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. ymd - > y년m월d
 * =======================================================================================
 */
$.fn.cvtDateKor = function() {
	var val = $(this).cvtDateDefault();
	var y = val.substr(0,4);
	var m = val.substr(4,2);
	var d = val.substr(6,2);
	
	return y + "년" + m + "월" + d + "일";
};

/**
 * =======================================================================================
 * 시간 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. hms -> hms
 * 2. hms -> h:m:s
 * 3. hms -> h시m분s초
 * =======================================================================================
 */
$.fn.cvtTimeFormat = function() {

	var format = $(this).attr('data-time-format');
	var val;

	if( format == 'hms' || format == 'hm' ) {
		val = $(this).cvtTimeDefault();
	}
	else if( format == 'h:m:s' || format == 'h:m') {
		val = $(this).cvtTimeColon();
	}
	else if( format == 'kor' ) {
		val = $(this).cvtTimeKor();
	}
	else {
		val = $(this).val();
	}
	
	return val;
};

/**
 * =======================================================================================
 * 시간 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. hms 	-> hms
 * 2. h?m?s -> hms
 * =======================================================================================
 */
$.fn.cvtTimeDefault = function() {

	var val = $(this).val();
	var format = $(this).attr('data-time-format');
	
	var regexp = /[^0-9]/g;
	val = val.replace(regexp, '');
	
	var h = val.substr(0,2);
	var m = val.substr(2,2);
	var s = val.substr(4,2);
	
	if(parseInt(h) < 10) {
		h = '0' + parseInt(h);
	}
	if(parseInt(m) < 10) {
		m = '0' + parseInt(m);
	}
	if(parseInt(s) < 10) {
		s = '0' + parseInt(s);
	}

	if(format == 'hm') {
		return h + m;
	}
	else {
		return h + m + s;
	}
};

/**
 * =======================================================================================
 * 시간 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. hms - > h:m:s
 * =======================================================================================
 */
$.fn.cvtTimeColon = function() {
	var val = $(this).cvtTimeDefault();
	var format = $(this).attr('data-time-format');
	
	var h = val.substr(0,2);
	var m = val.substr(2,2);
	var s = val.substr(4,2);
	
	if(format == 'h:m') {
		return h + ":" + m;
	}
	else {
		return h + ":" + m + ":" + s;
	}
};

/**
 * =======================================================================================
 * 시간 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. hms - > h시m분s초
 * =======================================================================================
 */
$.fn.cvtTimeKor = function() {
	var val = $(this).cvtTimeDefault();
	var h = val.substr(0,2);
	var m = val.substr(2,2);
	var s = val.substr(4,2);
	
	return h + "시" + m + "분" + s + "초";
};

/**
 * =======================================================================================
 * 일시 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. ymdhms -> ymdhms
 * 2. ymdhms -> y/m/d h:m:s
 * 3. ymdhms -> y-m-d h:m:s
 * 4. ymdhms -> y.m.d h:m:s
 * 5. ymdhms -> y년m월d일 h시m분s초
 * =======================================================================================
 */
$.fn.cvtDateTimeFormat = function() {

	var format = $(this).attr('data-datetime-format');
	var val;

	if( format == 'ymdhms' ) {
		val = $(this).cvtDateTimeDefault();
	}
	else if( format == 'y/m/d h:m:s' ) {
		val = $(this).cvtDateTimeSlash();
	}
	else if( format == 'y-m-d h:m:s' ) {
		val = $(this).cvtDateTimeHyphen();
	}
	else if( format == 'y.m.d h:m:s' ) {
		val = $(this).cvtDateTimeDot();
	}
	else if( format == 'kor' ) {
		val = $(this).cvtDateTimeKor();
	}
	else if( format == 'APkor' ) {
		val = $(this).cvtDateTimeAPKor();
	}
	else {
		val = $(this).val();
	}
	
	return val;
};

/**
 * =======================================================================================
 * 일시 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. ymdhms 	  -> ymdhms
 * 2. y?m?d h?m?s -> ymdhms
 * =======================================================================================
 */
$.fn.cvtDateTimeDefault = function() {

	var val = $(this).val();
	var regexp = /[^0-9]/g;
	val = val.replace(regexp, '');
	
	var _year  = val.substr(0,4);
	var _month = val.substr(4,2);
	var _day   = val.substr(6,2);
	var _hour  = val.substr(8,2);
	var _min   = val.substr(10,2);
	var _sec   = val.substr(12,2);
	
	if(parseInt(_month) < 10) {
		_month = '0' + parseInt(_month);
	}
	if(parseInt(_day) < 10) {
		_day = '0' + parseInt(_day);
	}
	if(parseInt(_hour) < 10) {
		_hour = '0' + parseInt(_hour);
	}
	if(parseInt(_min) < 10) {
		_min = '0' + parseInt(_min);
	}
	if(parseInt(_sec) < 10) {
		_sec = '0' + parseInt(_sec);
	}

	return _year + '' + _month + '' + _day + '' + _hour + '' + _min + '' + _sec;
};

/**
 * =======================================================================================
 * 일시 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. ymdhms -> y-m-d h:m:s
 * =======================================================================================
 */
$.fn.cvtDateTimeHyphen = function() {
	var val = $(this).cvtDateTimeDefault();
	var _year  = val.substr(0,4);
	var _month = val.substr(4,2);
	var _day   = val.substr(6,2);
	var _hour  = val.substr(8,2);
	var _min   = val.substr(10,2);
	var _sec   = val.substr(12,2);
	
	return _year + '-' + _month + '-' + _day + ' ' + _hour + ':' + _min + ':' + _sec;
};

/**
 * =======================================================================================
 * 일시 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. ymdhms - > y.m.d h:m:s
 * =======================================================================================
 */
$.fn.cvtDateTimeDot = function() {
	var val = $(this).cvtDateTimeDefault();
	var _year  = val.substr(0,4);
	var _month = val.substr(4,2);
	var _day   = val.substr(6,2);
	var _hour  = val.substr(8,2);
	var _min   = val.substr(10,2);
	var _sec   = val.substr(12,2);
	
	return _year + '.' + _month + '.' + _day + ' ' + _hour + ':' + _min + ':' + _sec;
};

/**
 * =======================================================================================
 * 일시 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. ymdhms - > y/m/d h:m:s
 * =======================================================================================
 */
$.fn.cvtDateTimeSlash = function() {
	var val = $(this).cvtDateTimeDefault();
	var _year  = val.substr(0,4);
	var _month = val.substr(4,2);
	var _day   = val.substr(6,2);
	var _hour  = val.substr(8,2);
	var _min   = val.substr(10,2);
	var _sec   = val.substr(12,2);
	
	return _year + '/' + _month + '/' + _day + ' ' + _hour + ':' + _min + ':' + _sec;
};

/**
 * =======================================================================================
 * 일시 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. ymdhms -> y년m월d일 h시m분s초
 * =======================================================================================
 */
$.fn.cvtDateTimeKor = function() {
	var val = $(this).cvtDateTimeDefault();
	var _year  = val.substr(0,4);
	var _month = val.substr(4,2);
	var _day   = val.substr(6,2);
	var _hour  = val.substr(8,2);
	var _min   = val.substr(10,2);
	var _sec   = val.substr(12,2);
	
	return _year + '년' + _month + '월' + _day + '일' + ' ' + _hour + '시' + _min + '분' + _sec + '초';
};

/**
 * =======================================================================================
 * 일시 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. ymdhms -> y-m-d 오전/오후 h:m
 * =======================================================================================
 */
$.fn.cvtDateTimeAPKor = function() {
	var val = $(this).cvtDateTimeDefault();
	var _year  = val.substr(0,4);
	var _month = val.substr(4,2);
	var _day   = val.substr(6,2);
	var _hour  = val.substr(8,2);
	var _min   = val.substr(10,2);
	var _ap    = (parseInt(_hour) > 12) ? "오후":"오전";
	
	return _year + '-' + _month + '-' + _day + ' ' + _ap + ' ' + (parseInt(_hour) > 12 ? parseInt(_hour) : _hour) + ':' + _min;
};

$.fn.momentDateFormat = function(pDate, dateFormat) {	
	var oDateFormat = dateFormat.toUpperCase();
	if(pDate.length < 8 ) {
		return pDate;
	}	
	var chgValue = moment(stringToDate(pDate)).format(oDateFormat);	
	return chgValue;
};

$.fn.dayByLang = function(dateStr, lang) {
	var day = "";
	var week;
	if(lang == "ko" || lang == "KO"){
		week     = new Array("\uC77C","\uC6D4","\uD654","\uC218","\uBAA9","\uAE08","\uD1A0");
	} else if(lang == "en" || lang == "EN"){
		week     = new Array("SU", "MO", "TU", "WE", "TH", "FR", "SA");
	} else if(lang == "ja" || lang == "JA"){
		//week     = new Array("日", "月", "火", "水", "木", "金", "土");
		week     = new Array("\u65E5","\u6708","\u706B","\u6C34","\u6728","\uF90A","\u571F");
	} else if(lang == "ch" || lang == "CH"){
		//week     = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
		week     = new Array("\u5468\u65E5","\u5468\u4E00","\u5468\u4E8C","\u5468\u4E09","\u5468\u56DB","\u5468\u4E94","\u5468\u516D");
	} else if(lang == "ru" || lang == "RU"){
		//week     = new Array("Воскр",  "Пон", "Вт", "Ср", "Чет", "Пят",  "Субб");
		week     = new Array("\u0412\u043E\u0441\u043A\u0440","\u041F\u043E\u043D","\u0412\u0442","\u0421\u0440","\u0427\u0435\u0442","\u041F\u044F\u0442","\u0421\u0443\u0431\u0431");
	} else if(lang == "de" || lang == "DE"){
		week     = new Array("SO","MO","DI","MI","DO","FR","SA");
	} else if(lang == "fr" || lang == "FR"){
		week     = new Array("DI","LU","MA","ME","JE","VE","SA");
	} else if(lang == "zh" || lang == "ZH"){
		week     = new Array("\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\uf9d1");
	} else if(lang == "es" || lang == "ES"){
		//week = new Array(dom, lun, mar, mié, jue, vie, sáb);
		week     = new Array("dom","lun","mar","\u006d\u0069\u00e9","jue","vie","\u0073\u00e1\u0062");
	}else if(lang == "vi" || lang == "VI"){ //베트남어 추가
		week = new Array("Chủ Nhật", "thứ hai", "Thứ Ba", "Thứ Tư", "thứ năm", "Thứ Sáu", "thứ bảy");
	}
	if (dateStr != undefined) {
		var yyyymmdd = dateStr.replace(/-/g, "");
	    var yyyy     = yyyymmdd.substr(0,4);
	    var mm       = yyyymmdd.substr(4,2);
	    var dd       = yyyymmdd.substr(6,2);
	    var dateObj  = new Date(yyyy, mm - 1, dd);	    
	    day = week[dateObj.getDay()];
	}  
    return day;
};