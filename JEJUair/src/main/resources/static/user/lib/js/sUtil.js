/**
 * =======================================================================================
 * [sUtil.js] - String Utility
 * ---------------------------------------------------------------------------------------
 *  - decrypt(val)									암호화값 복호화
 *  - isEmpty(val)									공백 체크(NULL 포함)
 *  - trim(val)										trim 스크립트
 *  - ltrim(val)									left trim 스크립트
 *  - rtrim(val)									right trim 스크립트
 *	- atrim(val)									all trim 스크립트
 *  - replaceAll(val, str1, str2)					replaceAll 스크립트
 *  - appendSpace(type, str, len)					공백 붙이는 스크립트
 *  - contains										포함여부
 *  - nvl(val, str)									val:값, str: val가 empty일 경우 return 값
 *  - nvl2(val, str1, str2)							isEmpty(val) ? str1 : str2
 *  - pointMasking(val, point, cnt)					val:값, point:마스킹 시작위치, cnt:마스킹 표시 자리수
 *  - addComma(this)								[onkeyup]금액 콤마 삽입
 *  - setComma(val)									금액 콤마 삽입
 *  - unComma(val)									금액 콤마 삭제
 *  - number(this)									[onkeyup]숫자값만 반환
 *  - digit(val)									숫자만 리턴
 *  - ceil(val, pos)								소수점 올림
 *  - floor(val, pos)								소수점 절삭
 *  - round(val, pos)								소수점 반올림
 *  - kor(this)										[onkeyup]한글 공백만 입력받는 스크립트
 *  - noKor(this)									[onkeyup]한글제외 입력받는 스크립트
 *  - koreng(this)									[onkeyup]한글+영문만 입력받는 스크립트
 *  - eng(this)										[onkeyup]영문 공백만 입력받는 스크립트
 *  - engUpper(this)								[onkeyup]영문대문자 공백만 입력받는 스크립트
 *  - alphaNumeric(this)							[onkeyup]영문+숫자 입력받는 스크립트
 *  - alphaNumericSpace(this)						[onkeyup]영문+숫자 공백만 입력받는 스크립트
 *  - alphaNumericSymbol(this, symbolType)			[onkeyup]영문대문자+숫자 특수문자 공백만 입력받는 스크립트
 *  	7002(symbolType) 	 							/[^A-Za-z0-9.,\-+()\/?\s]/g
 *  	7004(symbolType) 	 							/[^A-Za-z0-9@\-#&*^~\s]/g
 *  	7005(symbolType) 	 							/[^A-Za-z0-9\/\-:().,*{}&#\s]/g
 *  	7006(symbolType) 	 							/[^A-Za-z0-9\-]/g
 *  	Addr(symbolType) 								/[^A-Z0-9@\-#&*^,.()\/:;\s]/g
 *  - noSymbol(this)								[onkeyup]특수문자를 제외하고 입력 받는 스크립트
 *  - regExp(this, regexp)							[onkeyup]정규식에 따라 치환 후 정보 반환
 *  - getBytes(val, trimFlag)						값 바이트 환산
 *  - xssFilter(val)								XSS Filter <, >, #, ' HTML Tag 치환
 *  - getString(val)								String 형태로 값 반환
 *  - getInt(val)									Integer 형태로 값 반환
 *  - getNumber(val)								Number 형태로 값 반환
 *  - cvtAmtToKor(obj, lastUnitText)				[onkeyup] 입력 금액 한글 출력
 *  - tranAmtToKor(val)								금액 한글 변환(외화 사용)
 *  - fmtAccnNum(val)								계좌 번호 포멧 적용
 *  - fmtPhoneNum(val)								전화번호/ 휴대폰번호 포멧적용
 *  - replaceQuot(val)								상품 콘텐츠의 &quot;를 "로 변경 처리
 *  - getLastConsonant(val)							마지막 글자 받침 유무를 판단하여 을/를 정보 반환
 * =======================================================================================
 * Create by kyo.
 */
var sUtil = function() {
	return {
		isEmpty : function(val) {
			if( val === undefined || val == null || val == '' || $.trim(val) == '') {
				return true;
			}
			else if(typeof val === 'object') {
				for(var key in val) {
					if(val.hasOwnProperty(key)) {
						return false;
					}
				}
				return true;
			}
			else {
				return false;
			}
		},
		decrypt : function(val) {
			if( val === undefined || val == null || val == '' || $.trim(val) == '') {
				return '';
			}
			var aesUtil = new AesUtil(keySize, iterationCount);
			var decrypt = aesUtil.decrypt(salt, iv, passPhrase, val);
			return decrypt;
			
		},			
		trim : function(val) {
			return $.trim(val);
		},
		ltrim : function(val) {
			return val.replace(/^\s+/g,'');
		},
		rtrim : function(val) {
			return val.replace(/^\s+$/g,'');
		},
		atrim : function(val) {
			return val.replace(/\s/gi,'');
		},
		replaceAll : function(val, str1, str2) {
			return val.split(str1).join(str2);
		},
		appendSpace : function(type, str, len) {
			
			var strLen = str.length;
			var spaceLen = len - strLen;
			var rtn = '';
			
			for(var i = 0; i < spaceLen; i++) {
				rtn = rtn + ' ';
			}
			
			if(type == 'L') {
				rtn = rtn + str;
			}
			else if(type == 'R') {
				rtn = str + rtn;
			}
			
			return rtn;
		},
		contains : function(val, str) {
			if(val.indexOf(str) >= 0) {
				return true;
			}
			else {
				false;
			}
		},
		nvl : function(val, str) {
			if( this.isEmpty(val) ) {
				return str;
			}
			else {
				return val;
			}
		},
		nvl2 : function(val, str1, str2) {
			if( this.isEmpty(val) ) {
				return str1;
			}
			else {
				return str2; 
			}
		},
		pointMasking : function(val, point, cnt) {
			point = (point - 1);
			
			var maskingSymbol = '*';
			var strFront = val.substr(0, point);
			var strMid = '';
			var idx = cnt;
			
			if( val.length < (point+cnt) ) {
				return val;
			}
			
			for(var i = 0; i < idx; i++) {
				strMid += maskingSymbol;
			}
			
			var strEnd = val.substr(point+cnt);
			
			return strFront + strMid + strEnd;
		},
		addComma : function(obj) {
		//addComma : function(obj, maxsize) {
			/*
			var _maxsize;
			if(typeof maxsize == 'undefined' || maxsize == null || $.trim(maxsize) == '') {
				_maxsize = 15;
			}
			else {
				_maxsize = Number(maxsize);
			}
			*/
			var val = $(obj).val();
			var num = String(val).replace(/\..*|[^\d]/g, '');
			num = Number(num);
			var regexp = /(-?[0-9]+)([0-9]{3})/;
			/*
			if(num.length > _maxsize) {
				num = num.substr(0, _maxsize)
			}
			*/
			if(num > 0) {
				num = String(num);
				while(regexp.test(num)) {
					num = num.replace(regexp, '$1,$2');
				}
				$(obj).val(num);
			}
			else {
				$(obj).val('');
			}
		},
		setComma : function(val, txt) {
			var num = String(val).replace(/\.[^\d]/g, '');
			var regexp = /(-?[0-9]+)([0-9]{3})/;
			
			var cvtNum = Number(num);
			num = String(cvtNum);
			
			while(regexp.test(num)) {
				num = num.replace(regexp, '$1,$2');
			}
			
			if(!this.isEmpty(txt)) {
				return num + '' + txt;
			}
			
			return num;
		},
		unComma : function(val) {
			return this.replaceAll(val, ',', '');
		},
		number : function(obj, nextFocusId) {
			var val = $(obj).val();
			var max = $(obj).attr('maxlength');
			var regexp = /[^0-9]/g;
			val = val.replace(regexp, '');
			$(obj).val(val);
			
			if(!this.isEmpty(nextFocusId) && val.length == max) {
				$('#' + nextFocusId).focus();
			}
		},
		digit : function(val) {
			val = $.trim(val + '');
		    return val.replace(/[^\d]/g, '');
		},
		ceil : function(val, pos) {
			val = Number(val);
			if(pos == 0) {
				return Math.ceil(val);
			}
			else {
				var mp = Math.pow(10, pos-1);
				var mc = Math.ceil(val*mp)/mp;
				return mc.toFixed(pos-1);
			}
		},
		floor : function(val, pos) {
			val = Number(val);
			if(pos == 0) {
				return Math.floor(val);	
			}
			else {
				var mp = Math.pow(10, pos-1);
				var mf = Math.floor(val*mp)/mp;
				return mf.toFixed(pos-1);
			}
		},
		round : function(val, pos) {
			val = Number(val);
			if(pos == 0) {
				return Math.round(val);
			}
			else {
				var mp = Math.pow(10, pos-1);
				var mr = Math.round(val*mp)/mp;
				return mr.toFixed(pos-1);
			}
		},
		kor : function(obj) {
			var val = $(obj).val();
			var regexp = /[^가-힣ㄱ-ㅎㅏ-ㅣ\u318D\u119E\u11A2\u2002\u2025\u00B7\uFE55\x20]/g;
			
			val = val.replace(regexp, '');
			$(obj).val(val);
		},
		noKor : function(obj) {
			var val = $(obj).val();
			var regexp = /[ㄱ-ㅎ|ㅏ-ㅑ|ㄱ-힣]/g;
			
			val = val.replace(regexp, '');
			$(obj).val(val);
		},
		koreng : function(obj) {
			var val = $(obj).val();
			var regexp = /[^A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ\u318D\u119E\u11A2\u2002\u2025\u00B7\uFE55\x20]/g;
			
			val = val.replace(regexp, '');
			$(obj).val(val);
		},
		eng : function(obj) {
			var val = $(obj).val();
			var regexp = /[^A-Za-z\s]/g;
			
			val = val.replace(regexp, '');
			$(obj).val(val);
		},
		engUpper : function(obj) {
			var val = $(obj).val();
			var regexp = /[^A-Z\s]/g;
			
			val = val.replace(regexp, '');
			$(obj).val(val);
		},
		alphaNumeric : function(obj){
			var val = $(obj).val();
			var regexp = /[^A-Za-z0-9]/g;
			
			val = val.replace(regexp, '');
			$(obj).val(val);
		},
		alphaNumericSpace : function(obj){
			var val = $(obj).val();
			var regexp = /[^A-Za-z0-9\s]/g;
			
			val = val.replace(regexp, '');
			$(obj).val(val);
		},
		alphaNumericSymbol : function(obj, symbolType){
			
			var val = $(obj).val();
			var regexp;
			
			if(symbolType == '7002') {
				regexp = /[^A-Za-z0-9.,\-+()\/?\s]/g;
			}
			else if(symbolType == '7004') {
				regexp = /[^A-Za-z0-9@\-#&*^~\s]/g;
			}
			else if(symbolType == '7005') {
				regexp = /[^A-Za-z0-9\/\-:().,*{}&#\s]/g;
			}
			else if(symbolType == '7006') {
				regexp = /[^A-Za-z0-9\-]/g;
			}
			else if(symbolType == 'Addr') {
				regexp = /[^A-Z0-9@\-#&*^,.()\/:;\s]/g;
			}
			else {
				$(obj).val('');
				alert('Symbol Type을 지정해 주세요.');
				return;
			}
			
			val = val.replace(regexp, '');
			$(obj).val(val);
		},
		noSymbol : function(obj) {
			var val = $(obj).val();
			var regexp = /[^A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\u318D\u119E\u11A2\u2002\u2025\u00B7\uFE55\x20]/g;
			
			val = val.replace(regexp, '');
			$(obj).val(val);
		},
		noSymbol2 : function(obj) {
			var val = $(obj).val();
			var regexp = /(?:[`~￦!@#$%^&-+=()\-.,_\[\]{}£¥•|\\\'\";:\/?]|[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
			return !regexp.test(val);
		},
		noSymbol3 : function(obj) {
			var val = $(obj).val();
			var regexp = /(?:[`~￦!@#$%^&-+=()\-.,_\[\]{}£¥•|\\\'\";:\/?]|[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
			return !regexp.test(val);
		},
		regExp : function(obj, regexp) {
			var val = $(obj).val();
			val = val.replace(regexp, '');
			$(obj).val(val);
		},
		getBytes : function(val, isTrim) {
			var value = val;
			if(isTrim) {
				value = $.trim(value);
			}
			var _bytes = 0;
			var str;
			
			for(var i = 0; i < value.length; i++) {
				str = value.charAt(i);
				// 한글 3바이트 계산
				if( escape(str).length > 4 ) {
					_bytes += 3;
				}
				// 그 외 1바이트 계산
				else {
					_bytes++;
				}
			}
			
			return _bytes;
		},
		xssFilter : function(val) {
			
			if (this.isEmpty(val)) {
				return '';
			}
			
			val = val.replace(/</g, "&lt;");
			val = val.replace(/>/g, "&gt;");
			val = val.replace(/#/g, "&#35;");
			val = val.replace(/'/g, "&#39;");
			
			return val;
		},
		fileExt : function(val) {
			var ext = '';
			var extLen = val.lastIndexOf(".");
			
			ext = val.substring(extLen + 1);
			ext = ext.toLowerCase();
			
			return ext;
		},
		getString : function(val){
			if( this.isEmpty(val) ) {
				return '';
			}
			else {
				return val;
			}
		},
		getInt : function(val){
			if( this.isEmpty(val) ) {
				return 0;
			}
			else {
				return parseInt(val, 10);
			}
		},
		getNumber : function(val){
			if( this.isEmpty(val) ) {
				return 0;
			}
			else {
				return Number(val);
			}
		},
		cvtAmtToKor : function(obj, lastUnitText) {
			
			var val = $(obj).val();
			var num1 = String(val).replace(/\..*|[^\d]/g, ''); // 콤마 적용 시 사용
			var num2 = String(val).replace(/\..*|[^\d]/g, ''); // 한글 변환 시 사용
			var regexp = /(-?[0-9]+)([0-9]{3})/;
			
			/* 금액 콤마 적용 */
			if(sUtil.isEmpty(num1)) {
				$(obj).val('');
			}
			else if(num1 > 0) {
				while(regexp.test(num1)) {
					num1 = num1.replace(regexp, '$1,$2');
				}
				$(obj).val(num1);
			}
			else {
				$(obj).val('0');
			}
			
			/* 한글 텍스트 설정 */
			if(sUtil.isEmpty(num2)) {
				if(sUtil.isEmpty(lastUnitText)) {
					return '';
				}
				else {
					return '' + lastUnitText;
				}
			}
			else if(num2 == 0) {
				if(sUtil.isEmpty(lastUnitText)) {
					return '영';
				}
				else {
					return '영' + lastUnitText;
				}
			}
			else {
				var amt = num2;
				
				var korNumberList 		= ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
				var korSmallUnitList 	= ['', '십', '백', '천'];
				var korBigUnitList 		= ['', '만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극'];
				
				var smallUnitIdx, bigUnitIdx;	// 각 단위 인덱스
				var nowNum, nowUnit; 			// 현재숫자, 현재 단위
				
				var strAmtLength = amt.length;
				var rtn = '';
				var num = '';
						
				for (var i = 0; i < strAmtLength; i++) {

					nowNum 	= amt.substring(i, i + 1);
					nowUnit = strAmtLength - i;

					smallUnitIdx = parseInt((nowUnit - 1) % 4, 10);
					bigUnitIdx = parseInt((nowUnit - 1) / 4, 10);
					
					rtn += korNumberList[parseInt(nowNum, 10)];  // 숫자

					if (nowNum != '0') {
						rtn += korSmallUnitList[smallUnitIdx]; // 작은단위
					}

					if ((nowUnit - 1) % 4 == 0) {
						num += nowNum;
						if(parseInt(num, 10) > 0){
							rtn += korBigUnitList[bigUnitIdx]; // 큰단위는 값이 존재할때 삽입한다.
						}
						num = '';
					}else{
						num += nowNum;
					}
				}
				if(sUtil.isEmpty(lastUnitText)) {
					return rtn;
				}
				else {
					return rtn + lastUnitText;
				}
			}
		},
		tranAmtToKor : function(val) {
			
			if(sUtil.isEmpty(val)) {
				return '';
			}
			
			var amt = String(val).replace(/\..*|[^\d]/g, ''); // 한글 변환 시 사용
			
			/* 한글 텍스트 설정 */
			if(amt == 0) {
				return '영';
			}
			else {
				var korNumberList 		= ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
				var korSmallUnitList 	= ['', '십', '백', '천'];
				var korBigUnitList 		= ['', '만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극'];
				
				var smallUnitIdx, bigUnitIdx;	// 각 단위 인덱스
				var nowNum, nowUnit; 			// 현재숫자, 현재 단위
				
				var strAmtLength = amt.length;
				var rtn = '';
				var num = '';
						
				for (var i = 0; i < strAmtLength; i++) {

					nowNum 	= amt.substring(i, i + 1);
					nowUnit = strAmtLength - i;

					smallUnitIdx = parseInt((nowUnit - 1) % 4, 10);
					bigUnitIdx = parseInt((nowUnit - 1) / 4, 10);
					
					rtn += korNumberList[parseInt(nowNum, 10)];  // 숫자

					if (nowNum != '0') {
						rtn += korSmallUnitList[smallUnitIdx]; // 작은단위
					}

					if ((nowUnit - 1) % 4 == 0) {
						num += nowNum;
						if(parseInt(num, 10) > 0){
							rtn += korBigUnitList[bigUnitIdx]; // 큰단위는 값이 존재할때 삽입한다.
						}
						num = '';
					}else{
						num += nowNum;
					}
				}

				return rtn;
			}
		},
		fmtAccnNum : function(val) {
			var rtn = '';
			
			var firstAccnNum 	= val.substring(0,2);
			var secondAccnNum 	= val.substring(2,4);
			var thirdAccnNum 	= val.substring(4);
			
			rtn = firstAccnNum + '-' + secondAccnNum + '-' + thirdAccnNum;
			
			return rtn;
		},
		fmtPhoneNum : function(val) {
			var rtn = "";
			
			rtn = sUtil.trim(val.substring(0,4)) + '-' + sUtil.trim(val.substring(4,8)) + '-' + sUtil.trim(val.substring(8));
			return rtn;
		},
		fmtHpNum : function(val) {
			var regExp = /([0-9]{2,3})([0-9]{3,4})([0-9]{4}$)/;
			val = val.replace(regExp, "$1-$2-$3");
			var cnt = 0;
			 
			for (var i = 0; i < val.length; i++) {
				if (val.charAt(i) == "-") {
					cnt++;
				}
			}
			
			if (val.length > 0 && cnt < 2) {
				alert("전화번호를 확인하세요.");
				return "";
			}
			
			return val;
		},
		fmtNum : function(val) {
			var regExp = /([0-9]{2,3})([0-9]{3,4})([0-9]{4}$)/;
			val = val.replace(regExp, "$1-$2-$3");
			var cnt = 0;
			 
			for (var i = 0; i < val.length; i++) {
				if (val.charAt(i) == "-") {
					cnt++;
				}
			}
			
			if (val.length > 0 && cnt < 2) {
				alert("숫자만 입력이 가능합니다.");
				return "";
			}
			
			return val;
		},
		replaceQuot : function(val) {
			val = $.trim(val + '');
		    return val.replace(/=&quot;([\w\s가-힣.,\/\-_]+)&quot;/g, '="$1"');
		},
		replaceQuotAcute : function(val) {
			val = $.trim(val + '');
		    return val.replace(/&quot;/g, '"').replace(/&acute;/g, '\'').replace(/&#37;/g, '%')
		},
		getLastConsonant : function(val) {
			var rtn = '';
			
			val = val.replace(/\([^]+\)/g, ''); // 괄호안의 내용 삭제
			val = val.charCodeAt(val.length -1);
			
			if( (val - 0xac00) % 28 > 0 ) {
				rtn = '을';
			}
			else {
				rtn = '를';
			}
			return rtn;
		},
		menuCheck : function(val) {
			var cnt = 0;
			
			$("input[name^='MNU_NM']").each(function () {
				if ($.trim($(this).val()) != "" && val != "" && $.trim($(this).val()) == $.trim(val)) {
					cnt++;
				}
			});
			
			if (cnt > 1) {
				alert("메뉴명이 중복되었습니다.");
				return "";
			}
			return val;
		},
		menuGroupCheck : function(type,val,groupVal) {
			var cnt = 0;
			$("input:text[name^='MNU_NM']").each(function () {
				//19.01.17. 배진성계장 요청으로 '그룹명+메뉴명'으로 중복체크 처리함
				if ($.trim($(this).val()) != "" && val != "" && $.trim($(this).prev().val())+$.trim($(this).val()) == $.trim(groupVal)+$.trim(val)) {
					cnt++;
				}
			});
			
			if (cnt > 1) {
				alert("그룹명+메뉴명이 중복되었습니다.");
				return "";
			}
			
			if (type == '1') { //그룹메뉴에서 체크하는 경우
				return groupVal;
			} else {
				return val;
			}
		},
		fnChkHsTag : function(obj) {
				
			var strHsTag = $("#HSTAG_TT").val();

			// 모든 공백 제거
			strHsTag = strHsTag.replace(/(\s*)/g,"");
			// ","를 "#"로 치환
	 		strHsTag = strHsTag.replace(/,/g, "#");
			//특수문자를 공백으로 치환
			strHsTag = strHsTag.replace(/[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\$%&\\\=\(\'\"]/gi,"");

			if (strHsTag.charAt(0) != "#") { // #으로 시작하지 않는 경우
				strHsTag = "#" + strHsTag;
			}

			var reg = /#+/g;

			if (reg.test(strHsTag))	{
				strHsTag = strHsTag.replace(reg, "#");
			}

			if (strHsTag.charAt(strHsTag.length - 1) == "#") { // 마지막이 #으로 끝나는 경우
				strHsTag = strHsTag.substring(0, strHsTag.length - 1);
			}

			return $.trim(strHsTag.replace(/#/g, " #"));
			
		},
		fnChkHp : function(obj) {
			var strHp = $(obj).val();
			var chkChar = ",";
			var flag = true;
			
			for(var i=0; i<strHp.length; i++){
				if(-1 != chkChar.indexOf(strHp.charAt(i))){
					flag = false;
				}
			}
			
			if(!flag){
				alert(",이후 내용은 추가버튼을 이용하세요.");
				for(var i=0; i<strHp.length; i++){
					if(chkChar == strHp.charAt(i)){
						idx = strHp.indexOf(strHp.charAt(i));
						strHp = strHp.substring(0, idx);
						$(obj).val(strHp);
					}
					
				}
			}
		},
		emailCheck : function(id) {
			var email = $("#" + id).val();
			var exptext = /^[0-9a-zA-Z\_\-\.]*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

			//if(exptext.test(email)==false){
			//이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐 경우
			//	return false;
			//}
			return exptext.test(email);
		},
		FmtcurrencyCvt : function(lang , currency , amount , _target){
			if((lang ==='ko' && currency==='KRW') || currency ==='PNT'){							
				let tmpCurrency = "원"
				if(currency ==='PNT'){
					tmpCurrency ="P"
				}
				if(typeof _target === "undefined"){
					return "<span class='price_txt'>"+sUtil.setComma(amount)+"</span>\n<span class='unit'>"+tmpCurrency+"</span>"
				}else{
					_target.children().remove()
					_target.append("<span class='price_txt'>"+sUtil.setComma(amount)+"</span>\n") 
					_target.append("<span class='unit'>"+tmpCurrency+"</span>")
				}
			}else{
				if(typeof _target === "undefined"){
					return "<span class='unit'>"+currency+"</span>\n<span class='price_txt'>"+sUtil.setComma(Number(amount).toFixed(2))+"</span>"
				}else{					
					_target.children().remove()
					_target.append("<span class='unit'>"+currency+"</span>\n")
					_target.append("<span class='price_txt'>"+sUtil.setComma(Number(amount).toFixed(2))+"</span>") 					
				}
			}
		}
	}
}();
