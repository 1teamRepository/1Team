let detailBookType = "";
let confirmBookType ="";

$(document).ready(function() {
	if(typeof pageFlag == "undefined") {
		BIZ_COMMONS_SCRIPT.callI18n("0000000201", initPassengersFares);

		$(document).on('click', '#btnPaxDetail', function() {	
			$('#btnModalOpen').data('target', '#paxDetailLayer');
			$('#btnModalOpen').data('modal-type', 'full');
			$('#btnModalOpen').trigger('click');
		});
	}
});

//다국어 적용 함수 초기화
function initPassengersFares(){
	setTripTypeCode(rsResvDetail);
	setPassengersFares(rsResvDetail, emdInfo);
	setPaxDetailList(rsResvDetail);
	
	if(window.location.href.indexOf('viewReservationDetail')>-1 ){
		initReservationDetail();
	}
}

function setPaxDetailList(reservationDetailData){
	let totalPsFaresHtml = "";
	let passengerFareListHtml = "";
	
	let totalAmountObj = new Object();
	let totalTransportObj = new Object();
	let totalEmdObj = new Object();
	let totalDiscountObj = new Object();
	let totalPromoObj = new Object();
	
	let feeTotalObj = new Object();
	let feeSumObj = new Object();
	
	let rsStatus = rsResvDetail.closedBooking;
	
	let totalGfticketObj = new Object();
	
	for(let fdx in passengersFares){
		if(rsStatus != "Y"){
			for(let jdx in passengersFares[fdx].journeys){
				//운임의 커런시, 금액 세팅
				let fare = passengersFares[fdx].journeys[jdx].fareInfo.fare;
				let fareCurrency = passengersFares[fdx].journeys[jdx].fareInfo.fareCurrency;
				let fuel = passengersFares[fdx].journeys[jdx].fareInfo.fuel;
				let fuelCurrency = passengersFares[fdx].journeys[jdx].fareInfo.fuelCurrency;
				let tax = passengersFares[fdx].journeys[jdx].fareInfo.tax;
				let taxCurrency = passengersFares[fdx].journeys[jdx].fareInfo.taxCurrency;
				let discount = passengersFares[fdx].journeys[jdx].fareInfo.discount;
				let discountCurrency = passengersFares[fdx].journeys[jdx].fareInfo.discountCurrency;
				let promotion = passengersFares[fdx].journeys[jdx].fareInfo.promotion;
				let promoCurrency = passengersFares[fdx].journeys[jdx].fareInfo.promoCurrency;
				let gifticket = 0;
				let gifticketCurrency = "";
				
				if((confirmBookType == "VCH" && detailBookType == "") || (confirmBookType == "" && detailBookType == "VOUCHER")){
					gifticket = passengersFares[fdx].journeys[jdx].fareInfo.gifticket;
					gifticketCurrency = passengersFares[fdx].journeys[jdx].fareInfo.gifticketCurrency;
				}
				
				if(totalTransportObj[fareCurrency] == null) totalTransportObj[fareCurrency] = 0;
				totalTransportObj[fareCurrency] += fare;
				if(totalTransportObj[fuelCurrency] == null) totalTransportObj[fuelCurrency] = 0;
				totalTransportObj[fuelCurrency] += fuel;
				if(totalTransportObj[taxCurrency] == null) totalTransportObj[taxCurrency] = 0;
				totalTransportObj[taxCurrency] += tax;
				
				if(totalDiscountObj[discountCurrency] == null) totalDiscountObj[discountCurrency] = 0;
				totalDiscountObj[discountCurrency] += discount;
				if(totalPromoObj[promoCurrency] == null) totalPromoObj[promoCurrency] = 0;
				totalPromoObj[promoCurrency] += promotion;
				
				if(totalGfticketObj[gifticketCurrency] == null) totalGfticketObj[gifticketCurrency] = 0;
				totalGfticketObj[gifticketCurrency] += gifticket;
				
				if(passengersFares[fdx].journeys[jdx].emdInfo != null){
					for(let edx in passengersFares[fdx].journeys[jdx].emdInfo){
						for(let sdx in passengersFares[fdx].journeys[jdx].emdInfo[edx].segments){
							for(let emdx in passengersFares[fdx].journeys[jdx].emdInfo[edx].segments[sdx].emds){
								let amount = passengersFares[fdx].journeys[jdx].emdInfo[edx].segments[sdx].emds[emdx].amount;
								let currency = passengersFares[fdx].journeys[jdx].emdInfo[edx].segments[sdx].emds[emdx].currency;
								
								if(totalEmdObj[currency] == null) totalEmdObj[currency] = 0;
								totalEmdObj[currency] += amount;
							}
						}
					}
				}
			}
			
			if(passengersFares[fdx].etcEmds != null){
				for(let emdx in passengersFares[fdx].etcEmds){
					let amount = passengersFares[fdx].etcEmds[emdx].amount;
					let currency = passengersFares[fdx].etcEmds[emdx].currency;
					
					if(totalEmdObj[currency] == null) totalEmdObj[currency] = 0;
					totalEmdObj[currency] += amount;
				}
			}
			
			if(passengersFares[fdx].insure != null) {
				let insure = passengersFares[fdx].insure;
				let insureCurrency = passengersFares[fdx].insureCurrency;
				
				if(totalEmdObj[insureCurrency] == null) totalEmdObj[insureCurrency] = 0;
				totalEmdObj[insureCurrency] += insure;
			}
		}
		
		for(let feedx in passengersFares[fdx].feeInfo){
			if (feeSumObj[feedx] == null) {
				let feeCodeObj = new Object();
				
				feeCodeObj.name = passengersFares[fdx].feeInfo[feedx].name;
				feeCodeObj.feeTotalObj = new Object();
				
				feeSumObj[feedx] = feeCodeObj;
			}
			
			for(let ddx in passengersFares[fdx].feeInfo[feedx].datas){
				for(let ffdx in passengersFares[fdx].feeInfo[feedx].datas[ddx].fees){
	 				let currency = passengersFares[fdx].feeInfo[feedx].datas[ddx].fees[ffdx].currency;
	 				let amount = passengersFares[fdx].feeInfo[feedx].datas[ddx].fees[ffdx].amount;

					if (feeSumObj[feedx].feeTotalObj[currency] == null) {
						feeSumObj[feedx].feeTotalObj[currency] = 0;
					}

					if (feeTotalObj[currency] == null) {
						feeTotalObj[currency] = 0;
					}
					
					feeSumObj[feedx].feeTotalObj[currency] += amount;
					feeTotalObj[currency] += amount;
				}
			}
		}
	}
	
	if(rsStatus != "Y"){
		for(let tdx in totalTransportObj){
			if(totalAmountObj[tdx] == null) totalAmountObj[tdx] = 0;
			totalAmountObj[tdx] += totalTransportObj[tdx];
		}
		for(let tdx in totalEmdObj){
			if(totalAmountObj[tdx] == null) totalAmountObj[tdx] = 0;
			totalAmountObj[tdx] += totalEmdObj[tdx];
		}
		for(let tdx in totalDiscountObj){
			if(totalAmountObj[tdx] == null) totalAmountObj[tdx] = 0;
			totalAmountObj[tdx] -= totalDiscountObj[tdx];
		}
		for(let tdx in totalPromoObj){
			if(totalAmountObj[tdx] == null) totalAmountObj[tdx] = 0;
			totalAmountObj[tdx] -= totalPromoObj[tdx];
		}
		for(let tdx in feeTotalObj){
			if(totalAmountObj[tdx] == null) totalAmountObj[tdx] = 0;
			totalAmountObj[tdx] += feeTotalObj[tdx];
		}
		
		if((confirmBookType == "VCH" && detailBookType == "") || (confirmBookType == "" && detailBookType == "VOUCHER")){
			for(let tdx in totalGfticketObj){
				if(totalAmountObj[tdx] == null) totalAmountObj[tdx] = 0;
				totalAmountObj[tdx] -= totalGfticketObj[tdx];
			}
		}
		
		totalPsFaresHtml += '<dl class="line-list-item">';
		totalPsFaresHtml += '	<dt class="title total">';
		totalPsFaresHtml += '		<div class="txt-left">'+ BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00156") +'</div>';//총 결제금액
		totalPsFaresHtml += '		<div class="right">';
		for(let i = 0; i < Object.keys(totalAmountObj).length; i++) {
			totalPsFaresHtml += '			<p>'+ sUtil.FmtcurrencyCvt(I18N.language, Object.keys(totalAmountObj)[i], Object.values(totalAmountObj)[i]) +'</p>';
		}
		totalPsFaresHtml += '		</div>';
		totalPsFaresHtml += '	</dt>';
		totalPsFaresHtml += '	<dd class="list">';
		totalPsFaresHtml += '		<ul>';
		
			totalPsFaresHtml += '		<li>';
			totalPsFaresHtml += '			<div class="txt-left">'+ BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00157") +'</div>';//항공 운송료
			totalPsFaresHtml += '			<div class="txt-right">';
			for(let i = 0; i < Object.keys(totalTransportObj).length; i++) {
				totalPsFaresHtml += '				<p>'+ sUtil.FmtcurrencyCvt(I18N.language, Object.keys(totalTransportObj)[i], Object.values(totalTransportObj)[i]) +'</p>';
			}
			totalPsFaresHtml += '			</div>';
			totalPsFaresHtml += '		</li>';
		
		if(Object.keys(totalEmdObj).length > 0) {
			totalPsFaresHtml += '			<li>';
			totalPsFaresHtml += '				<div class="txt-left">'+ BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00158") +'</div>';//부가서비스
				totalPsFaresHtml += '			<div class="txt-right">';
				for(let i = 0; i < Object.keys(totalEmdObj).length; i++) {
					totalPsFaresHtml += '				<p>'+ sUtil.FmtcurrencyCvt(I18N.language, Object.keys(totalEmdObj)[i], Object.values(totalEmdObj)[i]) +'</p>';
				}
				totalPsFaresHtml += '			</div>';
			totalPsFaresHtml += '			</li>';
		}
		
		if((confirmBookType != "VCH" && detailBookType == "") || (confirmBookType != "" && detailBookType == "VOUCHER")){
			if(Object.keys(totalDiscountObj).length > 0 && Object.values(totalDiscountObj)[0] > 0) {
				for(let i = 0; i < Object.keys(totalDiscountObj).length; i++) {
					totalPsFaresHtml += '			<li>';
					if(i == 0) {
						totalPsFaresHtml += '				<div class="txt-left">'+ BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00164") +'</div>';//신분할인
					} else {
						totalPsFaresHtml += '				<div class="txt-left"></div>';
					}
					
					totalPsFaresHtml += '				<div class="txt-right">-' + sUtil.FmtcurrencyCvt(I18N.language, Object.keys(totalDiscountObj)[i], Object.values(totalDiscountObj)[i]) + '</div>';
					totalPsFaresHtml += '			</li>';
				}
			}
		}
		
		if(Object.keys(totalPromoObj).length > 0 && Object.values(totalPromoObj)[0] > 0) {
			for(let i = 0; i < Object.keys(totalPromoObj).length; i++) {
				totalPsFaresHtml += '			<li>';
				totalPsFaresHtml += '				<div class="txt-left">'+ BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00159") +'</div>';// 프로모션 할인
				totalPsFaresHtml += '				<div class="txt-right">-' + sUtil.FmtcurrencyCvt(I18N.language, Object.keys(totalPromoObj)[i], Object.values(totalPromoObj)[i]) + '</div>';	
				totalPsFaresHtml += '			</li>'; 
			}
		}
		
		if(Object.keys(totalGfticketObj).length > 0 && Object.values(totalGfticketObj)[0] > 0) {
			for(let i = 0; i < Object.keys(totalGfticketObj).length; i++) {
				totalPsFaresHtml += '			<li>';
				totalPsFaresHtml += '				<div class="txt-left">'+BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00271")+'</div>';// 기프티켓 할인
				totalPsFaresHtml += '				<div class="txt-right">-' + sUtil.FmtcurrencyCvt(I18N.language, Object.keys(totalGfticketObj)[i], Object.values(totalGfticketObj)[i]) + '</div>';	
				totalPsFaresHtml += '			</li>'; 
			}
		}
		
		if(Object.keys(feeTotalObj).length > 0) {
			totalPsFaresHtml += '			<li>';
			totalPsFaresHtml += '				<div class="txt-left">'+BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00275")+'</div>';//:수수료
				totalPsFaresHtml += '			<div class="txt-right">';
				for(let i = 0; i < Object.keys(feeTotalObj).length; i++) {
					totalPsFaresHtml += '				<p>'+ sUtil.FmtcurrencyCvt(I18N.language, Object.keys(feeTotalObj)[i], Object.values(feeTotalObj)[i]) +'</p>';
				}
				totalPsFaresHtml += '			</div>';
			totalPsFaresHtml += '			</li>';
		}
			
		totalPsFaresHtml += '		</ul>';
		totalPsFaresHtml += '	</dd>';
		totalPsFaresHtml += '</dl>';
	} else {
		totalPsFaresHtml += '	<dl class="line-list-item">';
		totalPsFaresHtml += '		<dt class="title total">';
		totalPsFaresHtml += '			<div class="txt-left">'+BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00276")+'</div>';//추가번역요청 : 총 수수료
		totalPsFaresHtml += '				<div class="right">';
		for(let ftdx in feeTotalObj){
			totalPsFaresHtml += '			<p>'+ sUtil.FmtcurrencyCvt(I18N.language, ftdx, feeTotalObj[ftdx]) +'</p>';
		}
		totalPsFaresHtml += '			</div>';
		totalPsFaresHtml += '		</dt>';
		totalPsFaresHtml += '		<dd class="list">';
		totalPsFaresHtml += '			<ul>';
		for(let fsdx in feeSumObj){
			totalPsFaresHtml += '			<li>';
			totalPsFaresHtml += '				<div class="txt-left">'+feeSumObj[fsdx].name+'</div>';
			totalPsFaresHtml += '				<div class="txt-right">';
			for(let ftdx in feeSumObj[fsdx].feeTotalObj){
				totalPsFaresHtml += '				<p>'+ sUtil.FmtcurrencyCvt(I18N.language, ftdx, feeSumObj[fsdx].feeTotalObj[ftdx]) +'</p>';
			}
			totalPsFaresHtml += '				</div>';
			totalPsFaresHtml += '			</li>';
		}
		totalPsFaresHtml += '			</ul>';
		totalPsFaresHtml += '		</dd>';
		totalPsFaresHtml += '	</dl>';
	}
		
	//탑승객 count
	let adtCnt = 0;
	let chdCnt = 0;
	let infCnt = 0;
	let passengerNum = 0;
	for(let pdx in reservationDetailData.passengers){
		if(reservationDetailData.passengers[pdx].passengerTypeCode == "ADT"){
			adtCnt++;
			if(reservationDetailData.passengers[pdx].infant != null){
				infCnt++;
			}
		} else if(reservationDetailData.passengers[pdx].passengerTypeCode == "CHD"){
			chdCnt++;
		} 
	}
	
	passengerFareListHtml += '<div class="passenger-info">';
	passengerFareListHtml += ' <div class="person">';
	passengerFareListHtml += ' 	<div class="person__item">';
	passengerFareListHtml += ' 		<i aria-label="성인" class="icon adult"></i><span>' + adtCnt + '</span><span class="hidden">명</span>';
	passengerFareListHtml += ' 	</div>';
	passengerFareListHtml += ' 	<div class="person__item">';
	passengerFareListHtml += ' 		<i aria-label="유아" class="icon child"></i><span>' + chdCnt + '</span><span class="hidden">명</span>';
	passengerFareListHtml += ' 	</div>';
	passengerFareListHtml += ' 	<div class="person__item">';
	passengerFareListHtml += ' 		<i aria-label="소아" class="icon baby"></i><span>' + infCnt + '</span><span class="hidden">명</span>';
	passengerFareListHtml += ' 	</div>';
	passengerFareListHtml += ' </div>';
	passengerFareListHtml += '</div>';

	//여정별 탑승객 운임 합 계산
	for(let fdx in passengersFares){
		let totalPassengerObj = new Object();
		let psSumFare 	= 0;
		let psSumFareCurrency; 
		let psSumfuel 	= 0;
		let psSumfuelCurrency;
		let psSumTax 	= 0;
		let psSumTaxCurrency;
		let psDiscount 	= 0;
		let psDiscountCurrency;
		let insureSum = 0;
		let insureSumCurrency;
		
		let psPromotion = 0;
		let psPromoCurrency;
		
		let psGifticket = 0;
		let psGifticketCurrency;
		
		if(rsStatus != "Y"){
			for(let jdx in passengersFares[fdx].journeys){
				let fare = passengersFares[fdx].journeys[jdx].fareInfo.fare;
				let fareCurrency = passengersFares[fdx].journeys[jdx].fareInfo.fareCurrency;
				let fuel = passengersFares[fdx].journeys[jdx].fareInfo.fuel;
				let fuelCurrency = passengersFares[fdx].journeys[jdx].fareInfo.fuelCurrency;
				let tax = passengersFares[fdx].journeys[jdx].fareInfo.tax;
				let taxCurrency = passengersFares[fdx].journeys[jdx].fareInfo.taxCurrency;
				let discount = passengersFares[fdx].journeys[jdx].fareInfo.discount;
				let discountCurrency = passengersFares[fdx].journeys[jdx].fareInfo.discountCurrency;
				
				let promotion = passengersFares[fdx].journeys[jdx].fareInfo.promotion;
				let promoCurrency = passengersFares[fdx].journeys[jdx].fareInfo.promoCurrency;
				
				let gifticket = 0;
				let gifticketCurrency = "";
				
				if((confirmBookType == "VCH" && detailBookType == "") || (confirmBookType == "" && detailBookType == "VOUCHER")){
					gifticket = passengersFares[fdx].journeys[jdx].fareInfo.gifticket;
					gifticketCurrency = passengersFares[fdx].journeys[jdx].fareInfo.gifticketCurrency;
				}
				
				if(totalPassengerObj[fareCurrency] == null) totalPassengerObj[fareCurrency] = 0;
				totalPassengerObj[fareCurrency] += fare ;
				if(totalPassengerObj[fuelCurrency] == null) totalPassengerObj[fuelCurrency] = 0;
				totalPassengerObj[fuelCurrency] += fuel;
				if(totalPassengerObj[taxCurrency] == null) totalPassengerObj[taxCurrency] = 0;
				totalPassengerObj[taxCurrency] += tax;
				if(totalPassengerObj[discountCurrency] == null) totalPassengerObj[discountCurrency] = 0;
				totalPassengerObj[discountCurrency] -= discount;
				if(totalPassengerObj[promoCurrency] == null) totalPassengerObj[promoCurrency] = 0;
				totalPassengerObj[promoCurrency] -= promotion;
				
				if((confirmBookType == "VCH" && detailBookType == "") || (confirmBookType == "" && detailBookType == "VOUCHER")){
					if(totalPassengerObj[gifticketCurrency] == null) totalPassengerObj[gifticketCurrency] = 0;
					totalPassengerObj[gifticketCurrency] -= gifticket;
				}
				
				if(passengersFares[fdx].journeys[jdx].emdInfo != null){
					for(let edx in passengersFares[fdx].journeys[jdx].emdInfo){
						for(let sdx in passengersFares[fdx].journeys[jdx].emdInfo[edx].segments){
							for(let emdx in passengersFares[fdx].journeys[jdx].emdInfo[edx].segments[sdx].emds){
								let amount = passengersFares[fdx].journeys[jdx].emdInfo[edx].segments[sdx].emds[emdx].amount;
								let currency = passengersFares[fdx].journeys[jdx].emdInfo[edx].segments[sdx].emds[emdx].currency;
								
								if(totalPassengerObj[currency] == null) totalPassengerObj[currency] = 0;
								totalPassengerObj[currency] += amount;
							}
						}
					}
				}
				
				psSumFare 	+= fare;
				psSumFareCurrency = fareCurrency;
				psSumfuel 	+= fuel;
				psSumfuelCurrency = fuelCurrency;
				psSumTax 	+= tax;
				psSumTaxCurrency = taxCurrency;
				
				psDiscount 	+= discount;
				psDiscountCurrency = discountCurrency;
				psPromotion += promotion;
				psPromoCurrency = promoCurrency;
				
				if((confirmBookType == "VCH" && detailBookType == "") || (confirmBookType == "" && detailBookType == "VOUCHER")){
					psGifticket += gifticket;
					psGifticketCurrency = gifticketCurrency;
				}
			}
	
			if(passengersFares[fdx].insure != null){
				let insure = passengersFares[fdx].insure;
				let insureCurrency = passengersFares[fdx].insureCurrency;
				
				if(totalPassengerObj[insureCurrency] == null) totalPassengerObj[insureCurrency] = 0;
				totalPassengerObj[insureCurrency] += insure;
				
				insureSum += insure;
				insureSumCurrency = insureCurrency;
			}
		}
		
		for(let feedx in passengersFares[fdx].feeInfo){
			for(let ddx in passengersFares[fdx].feeInfo[feedx].datas){
				for(let ffdx in passengersFares[fdx].feeInfo[feedx].datas[ddx].fees){
	 				let currency = passengersFares[fdx].feeInfo[feedx].datas[ddx].fees[ffdx].currency;
	 				let amount = passengersFares[fdx].feeInfo[feedx].datas[ddx].fees[ffdx].amount;

					if(totalPassengerObj[currency] == null) totalPassengerObj[currency] = 0;
					totalPassengerObj[currency] += amount;
				}
			}
		}
		
		passengerFareListHtml += '<dl class="line-list-item">';
		
		passengerFareListHtml += '<dt class="title">';
		passengerFareListHtml += '	<div class="txt-left">' + ++passengerNum + '. ' + passengersFares[fdx].name + '</div>';
		passengerFareListHtml += '	<div class="price">';
		for(let i = 0; i < Object.keys(totalPassengerObj).length; i++) {
			passengerFareListHtml += '		<p>' + sUtil.FmtcurrencyCvt(I18N.language, Object.keys(totalPassengerObj)[i], Object.values(totalPassengerObj)[i]) + '</p>';
		}
		passengerFareListHtml += '	</div>';
		passengerFareListHtml += '</dt>';
		
		passengerFareListHtml += '<dd class="list">';
		
		
		if(rsStatus != "Y"){
			passengerFareListHtml += '	<ul>';
			passengerFareListHtml += '		<li>';
			passengerFareListHtml += '			<div class="txt-left">'+ BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00160") +'</div>';//항공운임
			passengerFareListHtml += '			<div class="txt-right">' + sUtil.FmtcurrencyCvt(I18N.language, psSumFareCurrency, psSumFare) + '</div>';
			passengerFareListHtml += '		</li>';
			passengerFareListHtml += '		<li>';
			passengerFareListHtml += '			<div class="txt-left">'+ BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00162") +'</div>';//유류할증료
			passengerFareListHtml += '			<div class="txt-right">' + sUtil.FmtcurrencyCvt(I18N.language, psSumfuelCurrency, psSumfuel) + '</div>';
			passengerFareListHtml += '		</li>';
			passengerFareListHtml += '		<li>';
			passengerFareListHtml += '			<div class="txt-left">'+ BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00161") +'</div>';//공항시설사용료
			passengerFareListHtml += '			<div class="txt-right">' + sUtil.FmtcurrencyCvt(I18N.language, psSumTaxCurrency, psSumTax) + '</div>';
			passengerFareListHtml += '		</li>';
			
			if((confirmBookType != "VCH" && detailBookType == "") || (confirmBookType != "" && detailBookType == "VOUCHER")){
				if(psDiscount > 0){
					passengerFareListHtml += '		<li>';
					passengerFareListHtml += '			<div class="txt-left">'+ BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00164") +'</div>';//신분할인
					passengerFareListHtml += '			<div class="txt-right">-' + sUtil.FmtcurrencyCvt(I18N.language, psDiscountCurrency, psDiscount) + '</div>';
					passengerFareListHtml += '		</li>';
				}
			}
			
			if(psPromotion > 0){
				passengerFareListHtml += '		<li>';
				passengerFareListHtml += '			<div class="txt-left">'+ BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00159") +'</div>';//프로모션할인
				passengerFareListHtml += '			<div class="txt-right">- ' + sUtil.FmtcurrencyCvt(I18N.language, psPromoCurrency, psPromotion) + '</div>';
				passengerFareListHtml += '		</li>';
			}
			
			if(psGifticket > 0){
				passengerFareListHtml += '		<li>';
				passengerFareListHtml += '			<div class="txt-left">'+BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00271")+'</div>';// 기프티켓 할인
				passengerFareListHtml += '			<div class="txt-right">- ' + sUtil.FmtcurrencyCvt(I18N.language, psGifticketCurrency, psGifticket) + '</div>';
				passengerFareListHtml += '		</li>';
			}
			passengerFareListHtml += '	</ul>';
			
			let isEmd = false;
			
			if(passengersFares[fdx].etcEmds != null){
				isEmd = true;
			} else {
				for(let jdx in passengersFares[fdx].journeys){
					if(passengersFares[fdx].journeys[jdx].emdInfo != null){
						isEmd = true;
						break;
					}
				}
			}
			
			if(isEmd) {
				passengerFareListHtml += '	<p class="sub-title">'+ BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00165") +'</p>';//부가서비스 내역
				passengerFareListHtml += '	<div class="modal-receipt">';
				
				for(let jdx in passengersFares[fdx].journeys){
					if(passengersFares[fdx].journeys[jdx].emdInfo != null){
						passengerFareListHtml += '		<div class="payment-amount">';
						passengerFareListHtml += '			<div class="payment-amount__title">' + getTripName(jdx) + '</div>';
						passengerFareListHtml += '		</div>';
						
						passengerFareListHtml += '		<div class="payment-amount">';
						passengerFareListHtml += '			<table class="tbl_receipt">';
						
						for(let edx in passengersFares[fdx].journeys[jdx].emdInfo){
							passengerFareListHtml += '				<tr>';
							passengerFareListHtml += '					<td class="receipt_title oneline"><span class="receipt_ti">' + passengersFares[fdx].journeys[jdx].emdInfo[edx].classificationName + '</span></td>';
							passengerFareListHtml += '					<td class="receipt_conts">';
							passengerFareListHtml += '						<ul>';
							
							for(let sdx in passengersFares[fdx].journeys[jdx].emdInfo[edx].segments){
								let originName = passengersFares[fdx].journeys[jdx].emdInfo[edx].segments[sdx].originName;
								let destinationName = passengersFares[fdx].journeys[jdx].emdInfo[edx].segments[sdx].destinationName;
								
								for(let emdx in passengersFares[fdx].journeys[jdx].emdInfo[edx].segments[sdx].emds){
									let amount = passengersFares[fdx].journeys[jdx].emdInfo[edx].segments[sdx].emds[emdx].amount;
									let currency = passengersFares[fdx].journeys[jdx].emdInfo[edx].segments[sdx].emds[emdx].currency;
									let ssrName = passengersFares[fdx].journeys[jdx].emdInfo[edx].segments[sdx].emds[emdx].ssrName;
									
									if (ssrName == null) {
										ssrName = "";
									} else {
										if (reservationDetailData.journeys[jdx].segments.length	> 1) {
											ssrName += ' (' + originName + ' -> ' + destinationName + ')';
										}
									}
									
									if(edx == "BD" || edx == "SB" || edx == "ET"){ //번들, 스포츠멤버십, UM 의 경우 한번만 출력
										passengerFareListHtml += '							<li><span class="item"></span> <span class="price">' + sUtil.FmtcurrencyCvt(I18N.language, currency, amount) + '</span></li>';
									} else if(passengersFares[fdx].journeys[jdx].emdInfo[edx] != "BD" || passengersFares[fdx].journeys[jdx].emdInfo[edx] != "SB" ||  passengersFares[fdx].journeys[jdx].emdInfo[edx] != "ET"){
										passengerFareListHtml += '							<li><span class="item">' + ssrName + '</span> <span class="price">' + sUtil.FmtcurrencyCvt(I18N.language, currency, amount) + '</span></li>';
									}
								}
							}
							
							passengerFareListHtml += '						</ul>';
							passengerFareListHtml += '					</td>';
							passengerFareListHtml += '				</tr>';
						}
						
						passengerFareListHtml += '			</table>';
						passengerFareListHtml += '		</div>';
					}
				}
				
				if(passengersFares[fdx].etcEmds != null){
					passengerFareListHtml += '<div class="modal-receipt">';
					passengerFareListHtml += '  <div class="payment-amount">';
					passengerFareListHtml += '    <div class="payment-amount__title">'+BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00277")+'</div>';//추가번역요청 : 
					passengerFareListHtml += '  </div>';
					passengerFareListHtml += '  <div class="payment-amount">';
					passengerFareListHtml += '    <table class="tbl_receipt type01"><tbody>';
					
					for(let emdx in passengersFares[fdx].etcEmds){
						passengerFareListHtml += '      <tr>';
						passengerFareListHtml += '          <td class="receipt_title"><span>' + passengersFares[fdx].etcEmds[emdx].codeName + '</span></td>';
						passengerFareListHtml += '          <td class="receipt_conts">';
						passengerFareListHtml += '              <ul>';
						passengerFareListHtml += '                <li>';
						passengerFareListHtml += '                    <span class="item"></span>';
						passengerFareListHtml += '                    <span class="price">'+sUtil.FmtcurrencyCvt(I18N.language, passengersFares[fdx].etcEmds[emdx].currency, passengersFares[fdx].etcEmds[emdx].amount)+'</span>';
						passengerFareListHtml += '                </li>';
						passengerFareListHtml += '              </ul>';
						passengerFareListHtml += '          </td>';
						passengerFareListHtml += '      </tr>';
					}
					
					passengerFareListHtml += '    </tbody></table>';
					passengerFareListHtml += '  </div>';
					passengerFareListHtml += '</div>';
				}
				
				passengerFareListHtml += '	</div>';
			}
			
			if(passengersFares[fdx].insure != null){
				passengerFareListHtml += '<p class="sub-title">'+ BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00177") +'</p>';//여행보험
				passengerFareListHtml += '<ul>';
				passengerFareListHtml += '  <li>';
				passengerFareListHtml += '    <div class="txt-left">'+ BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00178") +'</div>';//보험료
				passengerFareListHtml += '    <div class="txt-right">' + sUtil.FmtcurrencyCvt(I18N.language, insureSumCurrency, insureSum) + '</div>';
				passengerFareListHtml += '  </li>';
				passengerFareListHtml += '</ul>';
			}
		}
		
		
		
		if(passengersFares[fdx].feeInfo != null){
			passengerFareListHtml += '<p class="sub-title">'+BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00275")+'</p>';//: 수수료
			passengerFareListHtml += '	<div class="modal-receipt">';
			for(let ffdx in passengersFares[fdx].feeInfo){
				passengerFareListHtml += '		<div class="payment-amount">';
				passengerFareListHtml += '			<div class="payment-amount__title">'+ passengersFares[fdx].feeInfo[ffdx].name +'</div>';
				passengerFareListHtml += '		</div>';
				for(let ddx in passengersFares[fdx].feeInfo[ffdx].datas){
					let currencyFeeData = new Object();
														
					for(let feedx in passengersFares[fdx].feeInfo[ffdx].datas[ddx].fees){
						let currency =  passengersFares[fdx].feeInfo[ffdx].datas[ddx].fees[feedx].currency;
						let amount = passengersFares[fdx].feeInfo[ffdx].datas[ddx].fees[feedx].amount;
						
						if (currencyFeeData[currency] == null) {
							currencyFeeData[currency] = 0;
						}
						
						currencyFeeData[currency] += amount;
					}
					
					passengerFareListHtml += '		<div class="payment-amount">';
					passengerFareListHtml += '			<table class="tbl_receipt type01">';
					passengerFareListHtml += '				<tr>';
					passengerFareListHtml += '					<td class="receipt_title"><span>' + passengersFares[fdx].feeInfo[ffdx].dateName + '('+ddx+')</span></td>';//일자
					passengerFareListHtml += '					<td class="receipt_conts">';
					passengerFareListHtml +='					<ul>';
					for(let feedx in currencyFeeData){
						passengerFareListHtml +='						<li>';
						passengerFareListHtml +='							<span class="items"></span>';
						passengerFareListHtml +='							<span class="price">'+ sUtil.FmtcurrencyCvt(I18N.language, feedx, currencyFeeData[feedx]) +'</span>';
						passengerFareListHtml +='						</li>';
					}
					passengerFareListHtml +='					</ul>';
					passengerFareListHtml += '					</td>';
					passengerFareListHtml += '				</tr>';
					passengerFareListHtml += '			</table>';
					passengerFareListHtml += '		</div>';
				}
			}
			passengerFareListHtml += '	</div>';
		}
			
		passengerFareListHtml += '</dd>';
		passengerFareListHtml += '</dl>';
	}
	
	$("#totalPsFares").html(totalPsFaresHtml);
	$("#passengerFareList").html(passengerFareListHtml);
}

//부가서비스 타이틀 세팅
function getClassificationName(code){
	let name = "";
	
	if (code == "ST") {
		name = BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00237"); //사전좌석
	} else if (code == "XB") {
		name = BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00170"); //사전 수하물
	} else if (code == "ML") {
		name = BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00169"); //사전 기내식
	} else if (code == "SB") {
		name = BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00240"); //스포츠 수하물 위탁 수수료
	} else if (code == "SM") {
		name = BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00244"); //사이드 메뉴
	} else if (code == "LG") {
		name = BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00238");//라운지
	}
	
	return name;
}

// 탑승객별 운임 계산(운임 & 부가서비스)
// 해당 화면에서 let passengersFares = new Object(); 선언해서 사용 
function setPassengersFares(reservationDetail, confirmEmd){
	if(typeof reservationDetail.bookingKind != "undefined"){
		if(reservationDetail.bookingKind == "VOUCHER"){
			detailBookType = reservationDetail.bookingKind
		}
	}
	
	if(typeof _pay_saleTypeCd != "undefined"){
		if(_pay_saleTypeCd == "VCH"){
			confirmBookType = _pay_saleTypeCd;
		}
	}

	let adtNum = 0;
	let chdNum = 0;
	let infNum = 0;
	
	// 탑승객 모두 계산
	//passengers sort orderNum
	let sortedPassengersJsonArr = new Array();
	for(var idx in reservationDetail.passengers){ //승객 정렬
		sortedPassengersJsonArr.push(reservationDetail.passengers[idx]);
	}
	let convertStrSeqToNumber = function(strSeq){
		return Number(strSeq.substr(0,1));
	}
	sortedPassengersJsonArr.sort(function(a,b){
	    return convertStrSeqToNumber(a.order) < convertStrSeqToNumber(b.order) ? -1 : convertStrSeqToNumber(a.order) > convertStrSeqToNumber(b.order) ? 1 : 0;
	});
	
	for(let gdx in sortedPassengersJsonArr){
		let passengerObj = new Object();
		
		passengerObj.name = sortedPassengersJsonArr[gdx].name.last +" / "+ sortedPassengersJsonArr[gdx].name.first;
		passengerObj.passengerTypeCode = sortedPassengersJsonArr[gdx].passengerTypeCode;
		passengerObj.passengerKey = sortedPassengersJsonArr[gdx].passengerKey;
		

		if (passengerObj.passengerTypeCode == "ADT") {
			passengerObj.Num = ++adtNum;
		} else if (passengerObj.passengerTypeCode == "CHD") {
			passengerObj.Num = ++chdNum;
		}

		passengerObj.journeys = new Array();

		// 해당 탑승객의 모든 여정 계산
		for(let idx in reservationDetail.journeys){
			let fareInfoObj = new Object();
			
			// 운임, 세금, 유류, 신분할인
			let fare = 0;
			let tax = 0;
			let fuel = 0;
			let discount = 0;
			let fareCurrency = "";
			let taxCurrency = "";
			let fuelCurrency = "";
			let discountCurrency = "";
			
			let promotion = 0;
			let promoCurrency = "";
			
			for(let sdx in reservationDetail.journeys[idx].segments){
				for(let fdx in reservationDetail.journeys[idx].segments[sdx].fares){
					for(let rdx in reservationDetail.journeys[idx].segments[sdx].fares[fdx].passengerFares){
						if (reservationDetail.journeys[idx].segments[sdx].fares[fdx].passengerFares[rdx].passengerType == sortedPassengersJsonArr[gdx].passengerTypeCode) {
							if (sortedPassengersJsonArr[gdx].discountCode == null) {
								if (reservationDetail.journeys[idx].segments[sdx].fares[fdx].passengerFares[rdx].discountCode != null) {
									continue;
								}
							} else {
								if (reservationDetail.journeys[idx].segments[sdx].fares[fdx].passengerFares[rdx].discountCode != sortedPassengersJsonArr[gdx].discountCode) {
									continue;
								}
							}
							
							let passengersFare = passengerServiceChargeCal(reservationDetail.journeys[idx].segments[sdx].fares[fdx].passengerFares[rdx].serviceCharges, reservationDetail.currencyCode);
							
							if(sortedPassengersJsonArr[gdx].passengerTypeCode == "CHD" && sortedPassengersJsonArr[gdx].discountCode == null){
								fare -= passengersFare.discount;
							} else {
								discount += passengersFare.discount;
							}
							
							fare += passengersFare.fare;
							tax += passengersFare.tax;
							fuel += passengersFare.fuel;
							fareCurrency = passengersFare.fareCurrency;
							taxCurrency = passengersFare.taxCurrency;
							fuelCurrency = passengersFare.fuelCurrency;
							discountCurrency = passengersFare.discountCurrency;
							
							promotion += passengersFare.promotion;
							promoCurrency = passengersFare.promoCurrency;
						}
					}
				}
			}

			// 운임, 세금, 유류, 신분할인 금액 저장
			fareInfoObj.fare = fare;
			fareInfoObj.tax = tax;
			fareInfoObj.fuel = fuel;
			fareInfoObj.discount = discount;
			fareInfoObj.fareCurrency = fareCurrency;
			fareInfoObj.taxCurrency = taxCurrency;
			fareInfoObj.fuelCurrency = fuelCurrency;
			fareInfoObj.discountCurrency = discountCurrency;
			
			if((confirmBookType == "VCH" && detailBookType == "") || (confirmBookType == "" && detailBookType == "VOUCHER")){
				fareInfoObj.gifticket = fare;
				fareInfoObj.gifticketCurrency = fareCurrency;
			}
			
			fareInfoObj.promotion = promotion;
			fareInfoObj.promoCurrency = promoCurrency;

			passengerObj.journeys[idx] = new Object(); 
			passengerObj.journeys[idx].fareInfo = fareInfoObj;
		}
		
		
		// 여정별 부가서비스 찾기
		for(let idx in reservationDetail.journeys){
			let journeyEmdObj = new Object();

			// 해당 여정의 모든 세그에서 찾기
			for(let sdx in reservationDetail.journeys[idx].segments){
				let flightReferenceList = new Array();
				flightReferenceList.push(reservationDetail.journeys[idx].segments[sdx].flightReference);

				for(let ldx in reservationDetail.journeys[idx].segments[sdx].legs){
					flightReferenceList.push(reservationDetail.journeys[idx].segments[sdx].legs[ldx].flightReference);
				}
				
				for(let pdx in reservationDetail.journeys[idx].segments[sdx].passengerSegment){
					if(sortedPassengersJsonArr[gdx].passengerKey == reservationDetail.journeys[idx].segments[sdx].passengerSegment[pdx].passengerKey){
						// 사전좌석 외
						if(reservationDetail.journeys[idx].segments[sdx].passengerSegment[pdx].ssrs != null){
							for(let rdx in reservationDetail.journeys[idx].segments[sdx].passengerSegment[pdx].ssrs){
// 								let market = reservationDetail.journeys[idx].segments[sdx].passengerSegment[pdx].ssrs[rdx].market;
// 								let marketFlightReference = market.departureDate.substr(0, 10).replaceAll('-', '') + " " + market.identifier.carrierCode + (' ' + market.identifier.identifier).slice(-4) + " " + market.origin + market.destination;
								
								for(let fdx in sortedPassengersJsonArr[gdx].fees){
									if(sortedPassengersJsonArr[gdx].fees[fdx].type == "SsrFee"
										&& sortedPassengersJsonArr[gdx].fees[fdx].ssrCode == reservationDetail.journeys[idx].segments[sdx].passengerSegment[pdx].ssrs[rdx].ssrCode
										&& sortedPassengersJsonArr[gdx].fees[fdx].ssrNumber == reservationDetail.journeys[idx].segments[sdx].passengerSegment[pdx].ssrs[rdx].ssrNumber
										&& flightReferenceList.indexOf(sortedPassengersJsonArr[gdx].fees[fdx].flightReference) > -1){
// 										&& sortedPassengersJsonArr[gdx].fees[fdx].flightReference == marketFlightReference){
// 										&& sortedPassengersJsonArr[gdx].fees[fdx].flightReference == reservationDetail.journeys[idx].segments[sdx].flightReference){
										
										sortedPassengersJsonArr[gdx].fees[fdx].etcFlag = false;
											
										let bClassificationCd = sortedPassengersJsonArr[gdx].fees[fdx].classificationCd;
										let bSsrCode = sortedPassengersJsonArr[gdx].fees[fdx].ssrCode;
										let bSsrName = sortedPassengersJsonArr[gdx].fees[fdx].ssrName;
										let serviceChargeObj = serviceChargeCal(sortedPassengersJsonArr[gdx].fees[fdx].serviceCharges);
										let bAmount = serviceChargeObj.amount;
										let bCurrency = serviceChargeObj.currencyCode;
										
										if(reservationDetail.journeys[idx].segments[sdx].passengerSegment[pdx].ssrs[rdx].inBundle){ //bundle true 경우 bundleCode 세팅
											bClassificationCd = "BD";
											bSsrCode = reservationDetail.journeys[idx].segments[sdx].passengerSegment[pdx].bundleCode;
											
											if(reservationDetail.journeys[idx].segments[sdx].passengerSegment[pdx].bundleName != null){
												bSsrName = reservationDetail.journeys[idx].segments[sdx].passengerSegment[pdx].bundleName;
											} else {
												bSsrName = reservationDetail.journeys[idx].segments[sdx].passengerSegment[pdx].bundleCodeDesc;
											}
										}
										
										if (journeyEmdObj[bClassificationCd] == null) {
											let emdClassObj = new Object();
																									
											emdClassObj.classificationName = (bClassificationCd == "BD" || bClassificationCd == "ET") ? bSsrName : getClassificationName(bClassificationCd);
											emdClassObj.segments = new Object();
											
											journeyEmdObj[bClassificationCd] = emdClassObj;
										}
										
										if (journeyEmdObj[bClassificationCd].segments[sdx] == null) {
											let emdSegObj = new Object();
											
											emdSegObj.originName = reservationDetail.journeys[idx].segments[sdx].designator.originName;
											emdSegObj.destinationName = reservationDetail.journeys[idx].segments[sdx].designator.destinationName;
											emdSegObj.emds = new Array();
											
											journeyEmdObj[bClassificationCd].segments[sdx] = emdSegObj;
										}
										
										let emdObj = new Object();

										emdObj.ssrCode = bSsrCode;
										emdObj.ssrName = bSsrName;
										emdObj.amount = bAmount;
										emdObj.currency = bCurrency;
										
										if (bClassificationCd == "BD") {
											if (journeyEmdObj[bClassificationCd].segments[sdx].emds.length == 0) {
												journeyEmdObj[bClassificationCd].segments[sdx].emds.push(emdObj);
											} else {
												journeyEmdObj[bClassificationCd].segments[sdx].emds[0].amount += bAmount;
											}
										} else {
											journeyEmdObj[bClassificationCd].segments[sdx].emds.push(emdObj);
										}
									}
								}
							}
						}
	
						// 사전좌석
						if(reservationDetail.journeys[idx].segments[sdx].passengerSegment[pdx].seats != null){
							for(let tdx in reservationDetail.journeys[idx].segments[sdx].passengerSegment[pdx].seats){
								for(let fdx in sortedPassengersJsonArr[gdx].fees){
									if(sortedPassengersJsonArr[gdx].fees[fdx].type == "SeatFee"
										&& flightReferenceList.indexOf(sortedPassengersJsonArr[gdx].fees[fdx].flightReference) > -1){
// 										&& sortedPassengersJsonArr[gdx].fees[fdx].flightReference == reservationDetail.journeys[idx].segments[sdx].flightReference){
											
										sortedPassengersJsonArr[gdx].fees[fdx].etcFlag = false;
										
										let bClassificationCd = "ST";
										let bUnitDesignator = reservationDetail.journeys[idx].segments[sdx].passengerSegment[pdx].seats[tdx].unitDesignator;
										let serviceChargeObj = serviceChargeCal(sortedPassengersJsonArr[gdx].fees[fdx].serviceCharges);
										let bAmount = serviceChargeObj.amount;
										let bCurrency = serviceChargeObj.currencyCode;
										
										if (journeyEmdObj[bClassificationCd] == null) {
											let emdClassObj = new Object();
											
											emdClassObj.classificationName = getClassificationName(bClassificationCd);
											emdClassObj.segments = new Object();
											
											journeyEmdObj[bClassificationCd] = emdClassObj;
										}
										
										if (journeyEmdObj[bClassificationCd].segments[sdx] == null) {
											let emdSegObj = new Object();
											
											emdSegObj.originName = reservationDetail.journeys[idx].segments[sdx].designator.originName;
											emdSegObj.destinationName = reservationDetail.journeys[idx].segments[sdx].designator.destinationName;
											emdSegObj.emds = new Array();
											
											journeyEmdObj[bClassificationCd].segments[sdx] = emdSegObj;
										}
										
										let emdObj = new Object();

										emdObj.ssrCode = bUnitDesignator;
										emdObj.ssrName = bUnitDesignator;
										emdObj.amount = bAmount;
										emdObj.currency = bCurrency;
									
										journeyEmdObj[bClassificationCd].segments[sdx].emds.push(emdObj);
									}
								}
							}
						}
							
					}
				}
			}
				
			if(confirmEmd != null && Object.keys(confirmEmd).length > 0) {
				for(let cdx in confirmEmd){
					if(passengerObj.passengerKey == confirmEmd[cdx].passengerKey) {
						if(confirmEmd[cdx].journeys[idx] != null) {
							Object.assign(journeyEmdObj, confirmEmd[cdx].journeys[idx].emdInfo); //emdinfo 세팅
						} 
						
						break;
					}
				}
			}

			// 해당 여정에 부가서비스가 존재하면 저장
			if (Object.keys(journeyEmdObj).length) {
				passengerObj.journeys[idx].emdInfo = journeyEmdObj;
			}
		}
		
		// 추가 구매 내역
		let etcEmds = new Array();
		for(let fdx in sortedPassengersJsonArr[gdx].fees){
			//type 이 serviceCharge 이고 / ticketCode 가 OTA
			if (sortedPassengersJsonArr[gdx].fees[fdx].etcFlag == null && sortedPassengersJsonArr[gdx].fees[fdx].type == "ServiceFee") {
				let exceptFlag = false;
					
				for(let scdx in sortedPassengersJsonArr[gdx].fees[fdx].serviceCharges) {
					let ticketCode = sortedPassengersJsonArr[gdx].fees[fdx].serviceCharges[scdx].ticketCode;
					
//					if (ticketCode != null && (ticketCode == 'XXX' || (sortedPassengersJsonArr[gdx].fees[fdx].type == 'ServiceFee' && ticketCode == 'OTA'))) {
					if (ticketCode != null && (ticketCode == 'XXX' || ticketCode == 'OTA')) {
						exceptFlag = true;
						break;
					}
				}
				
				if (exceptFlag) {
					continue;
				}
					
				let serviceChargeObj = serviceChargeCal(sortedPassengersJsonArr[gdx].fees[fdx].serviceCharges);
				let bAmount = serviceChargeObj.amount;
				let bCurrency = serviceChargeObj.currencyCode;
				
				let emdObj = new Object();

				emdObj.code = sortedPassengersJsonArr[gdx].fees[fdx].code;
				emdObj.codeName = sortedPassengersJsonArr[gdx].fees[fdx].codeName;
				emdObj.amount = bAmount;
				emdObj.currency = bCurrency;
				
				etcEmds.push(emdObj);
			}
		}
		
		if (etcEmds.length > 0) {
			passengerObj.etcEmds = etcEmds;
		}

		// 보험료
		let insureAmount = 0; 
		let insureCurrency = "";
		
		let setInsure = false;
		
		if(confirmEmd != null && Object.keys(confirmEmd).length > 0) {
			for(let cdx in confirmEmd){
				if(passengerObj.passengerKey == confirmEmd[cdx].passengerKey) {
					if(confirmEmd[cdx].insure != null && confirmEmd[cdx].insure > 0) {
						insureAmount = confirmEmd[cdx].insure;
						insureCurrency = confirmEmd[cdx].insureCurrency;
						
						setInsure = true;
					}
					
					break;
				}
			}
		}
		
		if (!setInsure) {
			// 해당 탑승객의 모든 보험료 합산 
			for(let fdx in sortedPassengersJsonArr[gdx].fees){
				if(sortedPassengersJsonArr[gdx].fees[fdx].type == "NonFlightServiceFee" && sortedPassengersJsonArr[gdx].fees[fdx].code == "INSU"){
					let serviceChargeObj = serviceChargeCal(sortedPassengersJsonArr[gdx].fees[fdx].serviceCharges);
					insureAmount += serviceChargeObj.amount;
					insureCurrency = serviceChargeObj.currencyCode;
				}
			}
		}

		// 보험료가 존재하면 금액 저장
		if (insureAmount > 0) {
			passengerObj.insure = insureAmount;
			passengerObj.insureCurrency = insureCurrency;
		}
		
		// 수수료
		let passengerFeeObj = new Object();
		
		for(let fdx in sortedPassengersJsonArr[gdx].fees){
			if (['PenaltyFee', 'ConvenienceFee', 'NonFlightServiceFee', 'ServiceFee'].indexOf(sortedPassengersJsonArr[gdx].fees[fdx].type) > -1) {
				if (sortedPassengersJsonArr[gdx].fees[fdx].type == 'NonFlightServiceFee') {
					let exceptFlag = false;
					
					for(let scdx in sortedPassengersJsonArr[gdx].fees[fdx].serviceCharges) {
						let ticketCode = sortedPassengersJsonArr[gdx].fees[fdx].serviceCharges[scdx].ticketCode;
						
						if(ticketCode != null && ticketCode == 'IN') {
							exceptFlag = true;
							break;
						}
					}
					
					if (exceptFlag) {
						continue;
					}
				}
				
				if (sortedPassengersJsonArr[gdx].fees[fdx].type == 'ServiceFee') {
					let exceptFlag = false;
					
					for(let scdx in sortedPassengersJsonArr[gdx].fees[fdx].serviceCharges) {
						let ticketCode = sortedPassengersJsonArr[gdx].fees[fdx].serviceCharges[scdx].ticketCode;
						
						if(ticketCode != null && ticketCode != 'OTA') {
							exceptFlag = true;
							break;
						}
					}
					
					if (exceptFlag) {
						continue;
					}
				}
				
				let code = sortedPassengersJsonArr[gdx].fees[fdx].code;
				let createdDate = sortedPassengersJsonArr[gdx].fees[fdx].createdDate.substr(0, 10).replaceAll('-', '.');
				let serviceChargeObj = serviceChargeCal(sortedPassengersJsonArr[gdx].fees[fdx].serviceCharges);
				let bAmount = serviceChargeObj.amount;
				let bCurrency = serviceChargeObj.currencyCode;
				
				if (passengerFeeObj[code] == null) {
					let feeCodeObj = new Object();
					
					feeCodeObj.name = (sortedPassengersJsonArr[gdx].fees[fdx].penaltyFeeName == null) ? sortedPassengersJsonArr[gdx].fees[fdx].codeName : sortedPassengersJsonArr[gdx].fees[fdx].penaltyFeeName;
					feeCodeObj.dateName = getDateName(sortedPassengersJsonArr[gdx].fees[fdx].serviceCharges[0].ticketCode);
					feeCodeObj.datas = new Object();
					
					passengerFeeObj[code] = feeCodeObj;
				}
				
				if (passengerFeeObj[code].datas[createdDate] == null) {
					let feeDateObj = new Object();
					
					feeDateObj.fees = new Array();
					
					passengerFeeObj[code].datas[createdDate] = feeDateObj;
				}
				
				let feeObj = new Object();

				feeObj.amount = bAmount;
				feeObj.currency = bCurrency;
				
				passengerFeeObj[code].datas[createdDate].fees.push(feeObj);
			}
		}
		
		// 수수료가 존재하면 저장
		if (Object.keys(passengerFeeObj).length) {
			passengerObj.feeInfo = passengerFeeObj;
		}

		passengersFares[Object.keys(passengersFares).length] = passengerObj;
		
		//유아 존재시 운임 계산
		if(sortedPassengersJsonArr[gdx].infant != null){
			let infPassengerObj = new Object();
			
			infPassengerObj.name = sortedPassengersJsonArr[gdx].infant.name.last +" / "+ sortedPassengersJsonArr[gdx].infant.name.first;
			infPassengerObj.passengerTypeCode = "INF";
			infPassengerObj.Num = ++infNum;

			infPassengerObj.journeys = new Array();

			for(let idx in reservationDetail.journeys){
				let infFareInfoObj = new Object();
				
				let infFare = 0;
				let infTax = 0;
				let infFuel = 0;
				let infDiscount = 0;
				let infFareCurrency = "";
				let infTaxCurrency = "";
				let infFuelCurrency = "";
				let infDiscountCurrency = "";
				let infPromotion = 0;
				let infPoromoCurrency = "";

				for(let sdx in reservationDetail.journeys[idx].segments){
					for(let fdx in reservationDetail.journeys[idx].segments[sdx].fares){
						for(let rdx in reservationDetail.journeys[idx].segments[sdx].fares[fdx].passengerFares){
							if(reservationDetail.journeys[idx].segments[sdx].fares[fdx].passengerFares[rdx].passengerType == "INF"){
								let passengersFare = passengerServiceChargeCal(reservationDetail.journeys[idx].segments[sdx].fares[fdx].passengerFares[rdx].serviceCharges, reservationDetail.currencyCode);
								
								infFare += passengersFare.fare;
								infTax += passengersFare.tax;
								infFuel += passengersFare.fuel;
								infFare -= passengersFare.discount;
								infFareCurrency = passengersFare.fareCurrency;
								infTaxCurrency = passengersFare.taxCurrency;
								infFuelCurrency = passengersFare.fuelCurrency;
								infDiscountCurrency = passengersFare.discountCurrency;
								
								infPromotion += passengersFare.promotion;
								infPoromoCurrency = passengersFare.promoCurrency;
							}
						}
					}
				}
				
				//유아 운임 금액 저장
				infFareInfoObj.fare = infFare;
				infFareInfoObj.tax = infTax;
				infFareInfoObj.fuel = infFuel;
				infFareInfoObj.discount = infDiscount;
				infFareInfoObj.fareCurrency = infFareCurrency;
				infFareInfoObj.taxCurrency = infTaxCurrency;
				infFareInfoObj.fuelCurrency = infFuelCurrency;
				infFareInfoObj.discountCurrency = infDiscountCurrency;
				
				infFareInfoObj.promotion = infPromotion;
				infFareInfoObj.promoCurrency = infPoromoCurrency;
				
				if((confirmBookType == "VCH" && detailBookType == "") || (confirmBookType == "" && detailBookType == "VOUCHER")){
					infFareInfoObj.gifticket = infFare;
					infFareInfoObj.gifticketCurrency = infFareCurrency;
				}
	
				infPassengerObj.journeys[idx] = new Object();
				infPassengerObj.journeys[idx].fareInfo = infFareInfoObj;
			}
			
			passengersFares[Object.keys(passengersFares).length] = infPassengerObj;
		}
	}
}

function getDateName(code){
	let name = "";
	
	if (code == "CHG") {
		name = BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00254");//변경일
	} else if (code == "CXL" || code == "AXL" || code == "OTA") {//취소일
		name = BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00252");
	} else if (code == "ECN" || code == "NS" || code == "BKG" || code == "OD") {
		name = BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00253");//발생일
	}
	
	return name;
}

//  탑승객별 운임 계산 
function passengerServiceChargeCal(serviceCharge, defaultCurrency){
	let passengersFare = {
		fare : 0,
		tax : 0,
		fuel : 0,
		discount : 0,
		promotion : 0,
		fareCurrency : defaultCurrency,
		taxCurrency : defaultCurrency,
		fuelCurrency : defaultCurrency,
		discountCurrency : defaultCurrency,
		promoCurrency : defaultCurrency
	};

	for(let cdx in serviceCharge){
		if(serviceCharge[cdx].type == "FarePrice"){//운임
			passengersFare.fare +=  serviceCharge[cdx].amount;
			passengersFare.fareCurrency = serviceCharge[cdx].currencyCode;
		} else if(serviceCharge[cdx].type == "TravelFee" && serviceCharge[cdx].code.indexOf('YQ') > -1){ //유류할증료 계산
			passengersFare.fuel +=  serviceCharge[cdx].amount;
			passengersFare.fuelCurrency = serviceCharge[cdx].currencyCode;
		} else if(serviceCharge[cdx].type == "IncludedTravelFee" || serviceCharge[cdx].type == "IncludedTax"|| serviceCharge[cdx].type == "TravelFee"|| serviceCharge[cdx].type == "Tax"|| serviceCharge[cdx].type == "ServiceCharge" || serviceCharge[cdx].type == "FareSurcharge"){//시설사용료
			passengersFare.tax +=  serviceCharge[cdx].amount;
			passengersFare.taxCurrency = serviceCharge[cdx].currencyCode;
		} else if(serviceCharge[cdx].type == "Discount"){
			if((confirmBookType == "VCH" && detailBookType == "") || (confirmBookType == "" && detailBookType == "VOUCHER")){ //바우처 예약인 경우 discount 금액 -처리 ( - -라 + 처리 됨)
				passengersFare.fare -=  serviceCharge[cdx].amount;
				passengersFare.fareCurrency = serviceCharge[cdx].currencyCode;
			} else {
				passengersFare.discount +=  serviceCharge[cdx].amount;
				passengersFare.discountCurrency = serviceCharge[cdx].currencyCode;
			}
			
		} else if(serviceCharge[cdx].type == "PromotionDiscount"){
			passengersFare.promotion +=  serviceCharge[cdx].amount;
			passengersFare.promoCurrency = serviceCharge[cdx].currencyCode;
		}
	}
	
	return passengersFare;
}

// 부가서비스 운임 계산 
function serviceChargeCal(serviceCharge){
	let resultObj = new Object();
	let currencyObj = new Object();
	
	for(let cdx in serviceCharge){
		let currencyCode = serviceCharge[cdx].currencyCode;
		
		if (currencyObj[currencyCode] == null) {
			currencyObj[currencyCode] = 0;
		}
		
		if(serviceCharge[cdx].type == "ServiceCharge"){
			currencyObj[currencyCode] += serviceCharge[cdx].amount;
		} else if(serviceCharge[cdx].type == "Discount"){
			currencyObj[currencyCode] -= serviceCharge[cdx].amount;
		}
	}
	
	for(let cdx in currencyObj){
		if(currencyObj[cdx] > 0 || Object.keys(currencyObj).length == 1) {
			resultObj.currencyCode = cdx;
			resultObj.amount = currencyObj[cdx];
			
			break;
		}
	}

	return resultObj;
}

// tripType setting
function setTripTypeCode(reservationDetail){
	let jLength = reservationDetail.journeys.length;
	if(jLength == 1){
		tripType =  "OW";
	} else if (jLength == 2){
		if(reservationDetail.journeys[0].designator.origin == reservationDetail.journeys[1].designator.destination && reservationDetail.journeys[0].designator.destination == reservationDetail.journeys[1].designator.origin){
			tripType = "RT";
		} else {
			tripType = "MT";
		}
	} else {
		tripType =  "MT";
	}
}

// 편 이름 세팅 
function getTripName(index){
	let journeyName = "";
	
	if(tripType == "OW" || tripType == "RT"){
		if(index == 0){
			journeyName = BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00166");//가는편
		} else if(index == 1){
			journeyName = BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00167");//오는편
		}
	} else {
		journeyName = BIZ_COMMONS_SCRIPT.getI18n("0000000201.msg00168").replace("{0}", (++index)); //구간
	}

	return journeyName;
}
