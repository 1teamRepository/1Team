

const tripBtn = document.querySelectorAll('.item-btn');			//<a href="#" class="item-btn">왕복</a>
const ticketing = document.querySelector('.ticketing');
const itemBtnOW = document.querySelector("[data-triptype='OW'] > .item-btn");
const itemBtnRT = document.querySelector("[data-triptype='RT'] > .item-btn");

const departureLayer = document.getElementById('depAirportLayer');	//<div class="flight-layer flight-start" id="depAirportLayer">
const targetLayer = document.getElementById('arrAirportLayer');		//<div class="flight-layer flight-start" id="depAirportLayer">
const customerLayer = document.getElementById('customerLayer'); 	//<div class="customer-layer" id="customerLayer">

//달력
const dateRound = document.getElementById('date-round');
const dateOneWay = document.getElementById('date-one-way');

const departureDesc = document.getElementById('spanDepartureDesc');
const arrivalDesc = document.getElementById('spanArrivalDesc');

const adtCount = document.getElementById('adtCount');
const btnClose = document.getElementsByTagName('button');
const btnPassengers = document.getElementsByClassName('btn-passengers')[0];

const tabAnchor = document.getElementsByClassName('tab__anchor');
const tabPanel = document.getElementsByClassName('tab__panel');

const searchFlight = document.getElementById('searchFlight');

const passengerNum = Number(document.getElementById("passengerNum").getAttribute("value"));
const gradeDefault = document.querySelectorAll(".tab-btn");

let departureData = document.querySelector("#departureData").getAttribute("value");
let arrivalData = document.querySelector("#arrivalData").getAttribute("value");
let roundStartDateRes = roundStartArr[0]+"-"+roundStartArr[1]+"-"+roundStartArr[2];
let roundEndDateRes = roundEndArr[0]+"-"+roundEndArr[1]+"-"+roundEndArr[2];
let onewayStartDateRes = onewayStartArr[0]+"-"+onewayStartArr[1]+"-"+onewayStartArr[2];
let reserveRouteRes = document.getElementById('reserveRoute').getAttribute("value")

console.log("======출발도착 정보======")
console.log(departureData)
console.log(arrivalData)
console.log(roundStartDateRes)
console.log(roundEndDateRes)
console.log(reserveRouteRes)
console.log("======출발도착 정보======")

$(function(){
    const date = roundStartArr[0]+roundStartArr[1]+roundStartArr[2];
    const year = parseInt(date.substring(0, 4));
    const month = parseInt(date.substring(4, 6));
    const day = parseInt(date.substring(6, 8));
    let searchDate = new Date(year, month, day);

    let startDate = dateCal(searchDate, 3, 'sub');
    let dateWeek
    let dateName = new Array();


    let topList = new Vue({
        el: '#dateList',
        data: {
            dateList: {}
        }
    });

    console.log("---searchDate---")
    console.log(searchDate)
    function dateCal(date, num , cal){
        // console.log('들어옴 /dateCal')
        let newDate;
        if(cal == 'sum'){
            newDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() + num)
        }else if(cal == 'sub'){
            newDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() - num)
        }else {
            return null;
        }
        return newDate;
    }

    function findDayOfWeek(date){
        // console.log('들어옴 /findDayOfWeek')
        let week = ['일', '월', '화', '수', '목', '금', '토'];
        return week[date.getDay()];
    }

    function sumZero(data){
        // console.log('들어옴 /sumZero')
        if(data < 10){
            data = '0' + data
        }
        return data;
    }
    // console.log(startDate)
    for(let i=0; i<7; i++){
        // console.log('들어옴 /for')
        dateWeek = dateCal(startDate, i, 'sum');
        let data1 = sumZero(dateWeek.getMonth())
        let data2 = sumZero(dateWeek.getDate())
        let data3 = findDayOfWeek(dateWeek)
        dateName[i] = `${data1}.${data2}(${data3})`;
        // console.log(dateName[i]);
    }
    // console.log(dateName);
    topList.dateList = [
        { text: dateName[0], price:  '5000' },
        { text: dateName[1], price:  '5000' },
        { text: dateName[2], price:  '4000' },
        { text: dateName[3], price:  '3000' },
        { text: dateName[4], price:  '2000' },
        { text: dateName[5], price:  '1000' },
        { text: dateName[6], price:  '900' },
    ];

    // console.log(dateList)


    let flightList = new Vue({
        el: '#flightList',
        data: {
            flyScheduleList: {}
        }
    });


    searchStart(0);

    function searchStart(index){
        // let category = document.getElementById("category").getAttribute("value");
        $.get("/api/flight_schedule?page="+index, function(response){
            console.log(response)
            // let pagination = response.pagination;
            // pageNum.totalPages = pagination.totalPages;
            // pageNum.currentPage = pagination.currentPage + 1;
            let exdata = response.data;
            // console.log(typeof exdata)
            let schdata = [] ;
            choiceSchedule()
            console.log("---schdata---")
            console.log(schdata)
            schdata = total()

            route()

            function route(){
                if(reserveRouteRes == 'oneway'){
                    document.getElementById('route').innerText = "가는 편";
                }if(reserveRouteRes == 'round'){
                    document.getElementById('route').innerText = "왕복 가는 편";
                    if(false){
                        document.getElementById('route').innerHTML = "";

                    }
                }
            }

            function choiceSchedule(){
                // console.log('choiceSchedule 들어옴')
                exdata.forEach((item)=>{
                    if(reserveRouteRes == 'oneway') {
                        if (onewayStartDateRes == `${item.schDepartureDate}` &&
                            departureData == `${item.schDeparture}` &&
                            arrivalData == `${item.schArrival}`) {
                            console.log("=== ONEWAY 스케줄 ===")
                            console.log(item)
                            schdata.push(item)
                        }
                    }if(reserveRouteRes == 'round'){
                        if(roundStartDateRes == `${item.schDepartureDate}` &&
                            departureData == `${item.schDeparture}` &&
                            arrivalData == `${item.schArrival}`){
                            console.log("===ROUNDGO 스케줄 ===")
                            console.log(item)
                            schdata.push(item)
                        }

                    }if(reserveRouteRes == 'roundback'){
                        if(roundEndDateRes == `${item.schDepartureDate}` &&
                            arrivalData == `${item.schDeparture}` &&
                            departureData == `${item.schArrival}`){
                            console.log("===ROUNDBACK 스케줄 ===")
                            console.log(item)
                            schdata.push(item)
                        }
                    }
                })
            }


            function total(){
                schdata.forEach((item)=>{
                    var departure = new Date(`${item.schDepartureDate} ${item.schDepartureTime}`)
                    var arrival = new Date(`${item.schArrivalDate} ${item.schArrivalTime}`)
                    item.totalTime = calcTime(departure, arrival)
                })
                return schdata;
            }

            function calcTime(deT, arT){
                const gap = arT - deT;
                const hour = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const min = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));

                return `${hour}시간${min}분`;
            }
            flightList.flyScheduleList = schdata;
        });
    }
});



$(document).on('click', '.item-btn', function () {
    selectTrip(this);
});

$(document).on('click', '.js-target-pick.start', function () {
    ticketingDisplay();
    selectDeparture();
})

$(document).on('click', '.js-target-pick.target', function () {
    ticketingDisplay();
    selectTarget();
})

$(document).on('click', '.btn-passengers', function () {
    selectPassengers();
});

$(document).on('click', '#btnDatePicker', function () {
    selectDate(this);
})

$(document).on('click', '.layer-close', function () {
    closeLayer();
})

$(document).on('click', '.input__number-minus', function () {
    inputNumberMinus(this);
})

$(document).on('click', '.input__number-plus', function () {
    inputNumberPlus(this);
})
$(document).on('click', '#btnSetPassenger', function () {
    passCnt(this);
})

$(document).on('click', '.tab__anchor', function () {
    selectCountry(this);
})

$(document).on('click', '.choise__button', function () {
    selectAirport(this);
})

$(document).on('click', '#btnSummary', function () {
    paymentModal(this);
})

$(document).on('click', '.tab-btn', function () {
    openModal();
    fareCal(this);
})

$(document).on('click', '.ticketing-date', function() {
    ticketingDisplay();
})


reserveProgress();
btnAble();


//편도, 왕복 선택
function selectTrip(item) {
    let li = item.parentNode;
    let ticketing_item = item.parentNode.parentNode.parentNode.parentNode;
    const trip_type = $(li).attr('data-triptype');  //ow, rt

    closeLayer();
    for (let i = 0; i < tripBtn.length; i++) {
        tripBtn[i].parentElement.classList.remove('selected');
    }

    li.classList.add('selected');
    ticketing.classList.remove('one-way');
    ticketing.classList.remove('round');

    if (trip_type == 'OW') {
        ticketing_item.classList.add("one-way");
        dateOneWay.style.display = "block";
        dateRound.style.display = "none";
        document.getElementById('reserveRoute').setAttribute("value", "oneway");

        console.log("=======oneway=======")
        console.log(document.getElementById('reserveRoute'));
        console.log(document.getElementById('departureData'));
        console.log(document.getElementById('arrivalData'));
        console.log(document.getElementById('onewayStart'));
        console.log(document.getElementById('passengerNum'));
        console.log("=======oneway=======")
    } else if (trip_type == 'RT') {
        ticketing_item.classList.add("round");
        dateRound.style.display = "block";
        dateOneWay.style.display = "none";
        document.getElementById('reserveRoute').setAttribute("value", "round");

        console.log("=======round=======")
        console.log(document.getElementById('reserveRoute'));
        console.log(document.getElementById('departureData'));
        console.log(document.getElementById('arrivalData'));
        console.log(document.getElementById('roundStart'));
        console.log(document.getElementById('roundEnd'));
        console.log(document.getElementById('passengerNum'));
        console.log("=======round=======")
    }
}

// 출발지 선택 모달
function selectDeparture() {
    closeLayer();
    departureDesc.parentElement.classList.add('on');
    departureLayer.style.display = "block";
    selectCountry(document.getElementById("plugin-DEPtab-2"));
}

//도착지 선택 모달
function selectTarget() {
    closeLayer();
    arrivalDesc.parentElement.classList.add('on');
    targetLayer.style.display = "block";
    selectCountry(document.getElementById("plugin-ARRtab-2"));
}

// 승객수 선택 모달
function selectPassengers() {
    closeLayer();
    ticketingDisplay();
    btnPassengers.classList.add('on');
    customerLayer.style.display = "block";
}

// 모달 닫기버튼
function closeLayer() {
    departureLayer.style.display = "none";
    targetLayer.style.display = "none";
    customerLayer.style.display = "none";

    for (let i = 0; i < btnClose.length; i++) {
        btnClose[i].classList.remove('on');
    }
}

// 승객수 -1 버튼
function inputNumberMinus(select) {
    const inputBox = select.nextElementSibling;
    $(inputBox).attr('value', Number(inputBox.value) - 1);
    document.getElementById("passengerNum").setAttribute("value", $(inputBox).attr('value'));
    btnAble();
}

// 승객수 +1 버튼
function inputNumberPlus(select) {
    const inputBox = select.previousElementSibling;
    $(inputBox).attr('value', Number(inputBox.value) + 1);
    document.getElementById("passengerNum").setAttribute("value", $(inputBox).attr('value'));
    btnAble();
}

// 승객수 표시
function passCnt(select) {
    let passText = btnPassengers.firstChild;
    passText.innerHTML = "성인" + adtCount.value;
    closeLayer();
}

// 승객수 제한(1~4명)
function btnAble() {
    if (Number(adtCount.value) >= 4) {
        $(adtCount.nextElementSibling).attr('disabled', true);
    } else if (Number(adtCount.value) <= 1) {
        $(adtCount.previousElementSibling).attr('disabled', true);
    } else {
        $(adtCount.nextElementSibling).attr('disabled', false);
        $(adtCount.previousElementSibling).attr('disabled', false);
    }
}

// 출발지, 도착지 국가 및 지역 선택 탭
function selectCountry(select) {
    for (let i = 0; i < tabAnchor.length; i++) {
        tabAnchor[i].classList.remove('is-active');
        $(tabAnchor[i]).attr('aria-selected', false);
        $(tabAnchor[i]).attr('aria-expanded', false);
    }

    for (let i = 0; i < tabPanel.length; i++) {
        tabPanel[i].classList.remove('is-active');
        tabPanel[i].style.display = "none";
        if ($(tabPanel[i]).attr('aria-labelledby') == $(select).attr('id')) {
            tabPanel[i].style.display = "block";
        }
    }

    select.classList.add('is-active');
    $(select).attr('aria-selected', true);
    $(select).attr('aria-expanded', true);
    select.style.display = "block";

}

// 검색 모달 확장
function ticketingDisplay(){
    document.querySelector(".ticketing").classList.add("open");
    document.querySelector(".ticketing-type").style.display = "block";
    document.querySelector(".ticketing-row-bot").style.display = "block";
}

// 출발지, 도착지 공항 선택 탭
function selectAirport(select) {
    let station = $(select).attr('data-stationname');
    console.log(station);
    if ($(select).attr('data-stationtype') === "DEP") {
        selectTarget();
        departureDesc.innerText = station;
        departureDesc.setAttribute("data-countrycode", select.getAttribute("data-countrycode"));
        document.querySelector("#departureData").setAttribute("value", station);
    } else if ($(select).attr('data-stationtype') === "ARR") {
        selectPassengers();
        $(searchFlight).attr('disabled', false);
        arrivalDesc.innerText = station;
        arrivalDesc.setAttribute("data-countrycode", select.getAttribute("data-countrycode"));
        document.querySelector("#arrivalData").setAttribute("value", station);
    }
    if(departureDesc.getAttribute("data-countrycode")==="KR" && arrivalDesc.getAttribute("data-countrycode")==="KR"){
        document.querySelector("#foreign").setAttribute("value", "false");
    }else{
        document.querySelector("#foreign").setAttribute("value", "true");
    }
}

if(reserveRouteRes == "round"){
    selectTrip(itemBtnRT);
}else if(reserveRouteRes =="oneway"){
    selectTrip(itemBtnOW);
}


//가격 표시 모달 활성화
function openModal(){
    document.getElementById("divBottomSheet").style.display="block";
}

// 가격 표시 모달 축소/확장(화살표 버튼 클릭 시)
function paymentModal(select){
    if(select.classList.contains("is-active")){
        document.getElementById("btnSummary").classList.remove("is-active");
        document.getElementById("toggle-2").style.display = "none";
    }else{
        document.getElementById("btnSummary").classList.add("is-active");
        document.getElementById("toggle-2").style.display = "block";
    }
}

// 가격 계산 로직
function fareCal(select){
    const gradeDefault = document.querySelectorAll(".tab-btn");
    const fare = Number($(select).find(".price_txt")[0].innerText.replace(",", ""));
    // 가격
    const divFare = fare*passengerNum;
    const divTax = 4000*passengerNum;
    const divFuel = 22000*passengerNum;
    const schIdx = select.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild;
    const schedules = document.querySelectorAll(".schIdx");

    for (let i = 0; i < gradeDefault.length; i++) {
        gradeDefault[i].classList.remove("active");
    }
    for (let i = 0; i < schedules.length; i++) {
        schedules[i].classList.remove("select_schIdx");
    }

    schIdx.classList.add("select_schIdx");
    select.classList.add("active");

    $('#divFare').find('.flight__cost')[0].innerHTML = Number(tripJson.divFare + divFare).toLocaleString();
    $('#divTax').find('.flight__cost')[0].innerHTML = Number(tripJson.divTax + divTax).toLocaleString();
    $('#divFuel').find('.flight__cost')[0].innerHTML = Number(tripJson.divFuel + divFuel).toLocaleString();
    $('#spanCost').find('.flight__cost')[0].innerHTML = Number(tripJson.spanCost + divFare + divTax + divFuel).toLocaleString();

    $('#divFare').find('.flight__cost')[0].setAttribute("value", divFare);
    $('#divTax').find('.flight__cost')[0].setAttribute("value", divTax);
    $('#divFuel').find('.flight__cost')[0].setAttribute("value", divFuel);
    $('#spanCost').find('.flight__cost')[0].setAttribute("value", divFare+divTax+divFuel);
}

function reserveProgress(){
    if(document.querySelector("#route").getAttribute("value") === "oneway"){
        document.getElementById("spanNextPC").firstElementChild.innerHTML = "다음";
        document.getElementById("btnNextPC").classList.add("onewayPage");
    }else if(document.querySelector("#route").getAttribute("value") === "round"){
        document.getElementById("spanNextPC").firstElementChild.innerHTML = "오는 편 선택하기";
        document.getElementById("btnNextPC").classList.add("roundPage");
    }else if(document.querySelector("#route").getAttribute("value") === "roundback"){
        document.getElementById("spanNextPC").firstElementChild.innerHTML = "다음";
        document.getElementById("btnNextPC").classList.add("roundbackPage");
    }
}

$(document).on('click', '.onewayPage', function () {
    let tripJson = {
        resRoute: "ONEWAY",
        schDeparture: $('#depData').val(),
        schArrival: $('#arrData').val(),
        schDepartureDate: $('#owStart').val(),
        schPassengerNum: Number($('#pasNum').val()),
        seatValue: document.querySelector(".tab-btn.active").getAttribute("value"),
        divFare: Number($('#divFare').find('.flight__cost')[0].getAttribute("value")),
        divTax: Number($('#divTax').find('.flight__cost')[0].getAttribute("value")),
        divFuel: Number($('#divFuel').find('.flight__cost')[0].getAttribute("value")),
        divSeat: 0,
        divBaggageFee: 0,
        divMealFee: 0,
        spanCost: Number($('#spanCost').find('.flight__cost')[0].getAttribute("value")),
        schIdx: $('.select_schidx').val(),
        memIdx: idx,
        memUserid: userid,
        foreign: $('#overseas').val()
    }

    localStorage.setItem("tripJson", JSON.stringify(tripJson));
    location.href="/user/view_passenger_input";
})

$(document).on('click', '.roundPage', function () {
    function sendPost(url, params) {
        let form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', url);
        document.characterSet = "UTF-8";

        for (let key in params) {
            let hiddenField = document.createElement('input');
            hiddenField.setAttribute('type', 'hidden');
            hiddenField.setAttribute('name', key);
            hiddenField.setAttribute('value', params[key]);
            form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        form.submit();
    }

    let tripJson = {
        resRoute: "ROUNDGO",
        schDeparture: $('#depData').val(),
        schArrival: $('#arrData').val(),
        schDepartureDate: $('#rtStart').val(),
        schPassengerNum: Number($('#pasNum').val()),
        seatValue: document.querySelector(".tab-btn.active").getAttribute("value"),
        divFare: Number($('#divFare').find('.flight__cost')[0].getAttribute("value")),
        divTax: Number($('#divTax').find('.flight__cost')[0].getAttribute("value")),
        divFuel: Number($('#divFuel').find('.flight__cost')[0].getAttribute("value")),
        divSeat: 0,
        divBaggageFee: 0,
        divMealFee: 0,
        spanCost: Number($('#spanCost').find('.flight__cost')[0].getAttribute("value")),
        schIdx: $('.select_schidx').val(),
        memIdx: idx,
        memUserid: userid,
        foreign: $('#overseas').val()
    }
    localStorage.setItem("tripJson", JSON.stringify(tripJson));

    sendPost("/user/avail_search_form", {
        reserveRoute : "roundback",
        departureData: $('#depData').val(),
        arrivalData: $('#arrData').val(),
        onewayStart: $('#owStart').val(),
        roundStart: $('#rtStart').val(),
        roundEnd: $('#rtEnd').val(),
        passengerNum: $('#pasNum').val(),
        foreign: $('#overseas').val()
    });
})

$(document).on('click', '.roundbackPage', function () {
    let tripJson2 = {
        resRoute: "ROUNDBACK",
        schDeparture: $('#arrData').val(),
        schArrival: $('#depData').val(),
        schDepartureDate: $('#rtEnd').val(),
        schPassengerNum: Number($('#pasNum').val()),
        seatValue: document.querySelector(".tab-btn.active").getAttribute("value"),
        divFare: Number($('#divFare').find('.flight__cost')[0].getAttribute("value")),
        divTax: Number($('#divTax').find('.flight__cost')[0].getAttribute("value")),
        divFuel: Number($('#divFuel').find('.flight__cost')[0].getAttribute("value")),
        divSeat: 0,
        divBaggageFee: 0,
        divMealFee: 0,
        spanCost: Number($('#spanCost').find('.flight__cost')[0].getAttribute("value")),
        schIdx: $('.select_schidx').val(),
        memIdx: idx,
        memUserid: userid,
        foreign: $('#overseas').val()
    }

    localStorage.setItem("tripJson2", JSON.stringify(tripJson2));
    location.href="/user/view_passenger_input";
})