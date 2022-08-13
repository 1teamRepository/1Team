
window.localStorage.removeItem("passJson");
window.localStorage.removeItem("passJson2");
window.localStorage.removeItem("tripJson");
window.localStorage.removeItem("tripJson2");

let tripJson = {
    divFare: 0,
    divTax: 0,
    divFuel: 0,
    divSeat: 0,
    divBaggageFee: 0,
    divMealFee: 0,
    spanCost: 0
}

let tripJson2 = {
    resRoute: "",
    divFare: 0,
    divTax: 0,
    divFuel: 0,
    divSeat: 0,
    divBaggageFee: 0,
    divMealFee: 0,
    spanCost: 0
}
localStorage.setItem("tripJson", JSON.stringify(tripJson));
localStorage.setItem("tripJson2", JSON.stringify(tripJson2));

$(document).on('click', '.item-btn', function () {
    selectTrip(this);
});

$(document).on('click', '.js-target-pick.start', function () {
    selectDeparture();
})

$(document).on('click', '.js-target-pick.target', function () {
    selectTarget();
})

$(document).on('click', '.btn-passengers', function () {
    selectPassengers();
});

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

$(document).on('click', '.gnb__button', function () {
    gnbBtn();
})

//selectTrip
const tripBtn = document.querySelectorAll('.item-btn');
const mainTicketing = document.querySelector('.main-ticketing');

const departureLayer = document.getElementById('depAirportLayer');
const targetLayer = document.getElementById('arrAirportLayer');
const customerLayer = document.getElementById('customerLayer');

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
const isForeign = document.getElementById("foreign");

//hidden input
let reserveRoute = document.querySelector("#reserveRoute");
let arrivalData = document.querySelector("#arrivalData");
let departureData = document.querySelector("#departureData");
let onewayStart = document.querySelector("#onewayStart");
let roundStart = document.querySelector("#roundStart");
let roundEnd = document.querySelector("#roundEnd");
let passengerNum = document.querySelector("#passengerNum");

let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1 < 10 ? "0"+(today.getMonth() + 1) : today.getMonth() + 1;  // 월
let date = today.getDate() < 10 ? "0"+today.getDate() : today.getDate();  // 날짜
onewayStart.setAttribute("value", year + '-' + month + '-' + date);
roundStart.setAttribute("value", year + '-' + month + '-' + date);
roundEnd.setAttribute("value", year + '-' + month + '-' + date);

function selectTrip(item) {
    let li = item.parentNode;										//<li class="item selected" data-tripType="RT"><a href="#" class="item-btn">왕복</a></li>
    let mainTicketing_item = item.parentNode.parentNode.parentNode.parentNode;
    const trip_type = $(li).attr('data-triptype');  //ow, rt

    closeLayer();
    for (let i = 0; i < tripBtn.length; i++) {
        tripBtn[i].parentElement.classList.remove('selected');
    }

    li.classList.add('selected');
    mainTicketing.classList.remove('one-way');
    mainTicketing.classList.remove('round');

    if (trip_type == 'OW') {
        mainTicketing_item.classList.add("one-way");
        dateOneWay.style.display = "block";
        dateRound.style.display = "none";
        document.getElementById('reserveRoute').setAttribute("value", "oneway");

        console.log("====oneway====")
        console.log(document.getElementById('reserveRoute'));
        console.log(document.getElementById('departureData'));
        console.log(document.getElementById('arrivalData'));
        console.log(document.getElementById('onewayStart'));
        console.log(document.getElementById('passengerNum'));

    } else if (trip_type == 'RT') {
        mainTicketing_item.classList.add("round");
        dateRound.style.display = "block";
        dateOneWay.style.display = "none";
        document.getElementById('reserveRoute').setAttribute("value", "round");

        console.log("====round====")
        console.log(document.getElementById('reserveRoute'));
        console.log(document.getElementById('departureData'));
        console.log(document.getElementById('arrivalData'));
        console.log(document.getElementById('roundStart'));
        console.log(document.getElementById('roundEnd'));
        console.log(document.getElementById('passengerNum'));

    }
}

function selectDeparture() {
    closeLayer();
    departureDesc.parentElement.classList.add('on');
    departureLayer.style.display = "block";
    selectCountry(document.getElementById("plugin-DEPtab-2"));
}

function selectTarget() {
    closeLayer();
    arrivalDesc.parentElement.classList.add('on');
    targetLayer.style.display = "block";
    selectCountry(document.getElementById("plugin-ARRtab-2"));
}

function selectPassengers() {
    closeLayer();
    btnPassengers.classList.add('on');
    customerLayer.style.display = "block";
}

function closeLayer() {
    departureLayer.style.display = "none";
    targetLayer.style.display = "none";
    customerLayer.style.display = "none";

    for (let i = 0; i < btnClose.length; i++) {
        btnClose[i].classList.remove('on');
    }
}

function inputNumberMinus(select) {
    const inputBox = select.nextElementSibling;
    $(inputBox).attr('value', Number(inputBox.value) - 1);
    document.getElementById("passengerNum").setAttribute("value", $(inputBox).attr('value'));
    btnAble();
}

function inputNumberPlus(select) {
    const inputBox = select.previousElementSibling;
    $(inputBox).attr('value', Number(inputBox.value) + 1);
    document.getElementById("passengerNum").setAttribute("value", $(inputBox).attr('value'));
    btnAble();
}

function passCnt(select) {
    let passText = btnPassengers.firstChild;
    passText.innerHTML = "성인" + adtCount.value;
    closeLayer();
}

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

function selectAirport(select) {
    let station = $(select).attr('data-stationname');
    console.log(station);
    if ($(select).attr('data-stationtype') === "DEP") {
        selectTarget();
        departureDesc.innerText = station;
        departureDesc.setAttribute("data-countrycode", select.getAttribute("data-countrycode"));
        departureData.setAttribute("value", station);
    } else if ($(select).attr('data-stationtype') === "ARR") {
        selectPassengers();
        $(searchFlight).attr('disabled', false);
        arrivalDesc.innerText = station;
        arrivalDesc.setAttribute("data-countrycode", select.getAttribute("data-countrycode"));
        arrivalData.setAttribute("value", station);
    }
    if(departureDesc.getAttribute("data-countrycode")==="KR" && arrivalDesc.getAttribute("data-countrycode")==="KR"){
        isForeign.setAttribute("value", "false");
    }else{
        isForeign.setAttribute("value", "true");
    }
}

function gnbBtn(){
    if (!document.querySelector(".gnb__button").classList.contains("active")){
        document.querySelector(".gnb__button").classList.add("active");
        document.querySelector("#gnb").style.display = "block";
        document.querySelector("html").classList.add("active-gnb");
    }else{
        document.querySelector(".gnb__button").classList.remove("active");
        document.querySelector("#gnb").style.display = "none";
        document.querySelector("html").classList.remove("active-gnb");
    }
}




//왕복 or 편도 : reserveRoute // 출발지 : departureData // 도착지 : arrivalData // 왕복 날짜 : onewayStart // 왕복 날짜 : roundStart, roundEnd // 성인 승객 수 : adtCount

//왕복 노선은 출발지와 도착지가 바뀜!