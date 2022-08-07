const schIdx = Number(tripJson["schIdx"]);
let bizSeats = 0;
let ecoSeats = 0;

// 승객 수
let passengerNum = Number(tripJson["schPassengerNum"]);
const divFare = Number(tripJson["divFare"]);
const divTax = Number(tripJson["divTax"]);
const divFuel = Number(tripJson["divFuel"]);
let seatValue = tripJson["seatValue"];
let bizO = "";
let bizX = document.getElementById("divBusinessLite");

let passengerNames = []
for (let i = 0; i < passengerNum; i++) {
    passengerNames[i] = passJson["passLastName"+i]+passJson["passFirstName"+i]
    console.log(passengerNames[i])
}


if (seatValue == "biz") {
    bizX.style.display = "block";
    bizO = "disabled";
}

const ColArr = ['A', 'B', 'C', 'D', 'E', 'F'];

let bizSeatMapHTML = "";
let bizSeatLineHTML = "";
let bizEmptyHTML = "";
let bizSeatLineNum = 1;

let ecoSeatMapHTML = "";
let ecoSeatLineHTML = "";
let ecoEmptyHTML = "";
let ecoSeatLineNum = 1;

let ecoPrice = 5000;
let bizPrice = 5000;

$('#divFare').find('.flight__cost')[0].innerHTML = divFare;
$('#divTax').find('.flight__cost')[0].innerHTML = divTax;
$('#divFuel').find('.flight__cost')[0].innerHTML = divFuel;
$('#spanCost').find('.flight__cost')[0].innerHTML =  Number(divFare) + Number(divTax) + Number(divFuel);

let existingSeatArray = []

$.get("/api/flight_schedule/"+schIdx, function(response){
    let schRead = response.data;
    console.log(schRead);
    console.log("tbAircraftAcftIdx : " + schRead["tbAircraftAcftIdx"]);
    console.log("acftBizLiteSeats :" + schRead["acftBizLiteSeats"]);
    console.log("acftBizLiteSeats : "+schRead["acftNomalSeats"]);
    bizSeats = Number(schRead["acftBizLiteSeats"]);
    ecoSeats = Number(schRead["acftNomalSeats"]);

    $.get({
        url: '/api/passenger/seatFind/'+schRead["tbAircraftAcftIdx"],
        dataType : "json",
        contentType: 'application/json',
        async: false,
        success: function(response){
            console.log(response)
            console.log(response.data)
            console.log(response.data[0])
            console.log(response.data[0].tbAircraftAcftIdx)
            existingSeatArray = response.data

        }
    })

    for (let i = 0; i < bizSeats + 2*(bizSeatLineNum-1); i++) {
        const designator = i % 6 == 0 ? "BIZ" + bizSeatLineNum + ColArr[i % 6] : "BIZ" + (bizSeatLineNum - 1) + ColArr[i % 6];
        bizSeatMapHTML = '<button type="button" class="select-seat__seat seat-challenger" data-seat="" designator="' + designator + '" passenger-num=""><span class="selected"></span></button>';
        bizEmptyHTML = '<button type="button" class="select-seat__seat" data-seat="" designator="' + designator + '"></button>'
        bizSeatLineHTML = '<div class="number-wrap"><span class="number"><span data-seat="row">' + bizSeatLineNum + '</span></span></div>'

        let dataColumn = $('.bizseat')[i % 6];
        $(dataColumn).append(bizSeatMapHTML);
        if (i % 6 == 0) {
            $('.column--numbers--premium').append(bizSeatLineHTML);
            bizSeatLineNum++;
        }
    }

    for (let i = 0; i < ecoSeats + 3; i++) {
        const designator = i % 6 == 0 ? ecoSeatLineNum + ColArr[i % 6] : (ecoSeatLineNum - 1) + ColArr[i % 6];
        ecoSeatMapHTML = '<button type="button" ' + bizO + ' class="select-seat__seat seat-master" data-seat="" designator="' + designator + '" passenger-num=""><span class="selected"></span></button>';
        ecoEmptyHTML = '<div data-seat="name" designator="' + designator + '" style="height: 38px; width: 36px; margin-top: 16px"></div>'
        ecoSeatLineHTML = '<div class="number-wrap"><span class="number"><span data-seat="row">' + ecoSeatLineNum + '</span></span></div>'
        //클래스 column을 선택자로, attr로 data-column을 지정

        if (i >= 3 && i < 6) {
            let dataColumn = $('.economyseat1')[i % 6];
            $(dataColumn).append(ecoEmptyHTML);
        } else if (i < 78) {
            let dataColumn = $('.economyseat1')[i % 6];
            $(dataColumn).append(ecoSeatMapHTML);
            if (i % 6 == 0) {
                $('.econum1').append(ecoSeatLineHTML);
                ecoSeatLineNum++;
            }
        } else if (i < 84) {
            let dataColumn = $('.economyseat2')[i % 6];
            $(dataColumn).append(ecoSeatMapHTML);
            if (i % 6 == 0) {
                $('.econum2').append(ecoSeatLineHTML);
                ecoSeatLineNum++;
            }
        } else {
            let dataColumn = $('.economyseat3')[i % 6];
            $(dataColumn).append(ecoSeatMapHTML);
            if (i % 6 == 0) {
                $('.econum3').append(ecoSeatLineHTML);
                ecoSeatLineNum++;
            }
        }
    }

    for (let i = 0; i < existingSeatArray.length; i++) {
        console.log(document.querySelector('.select-seat__seat[designator = "'+existingSeatArray[i].pasSeat+'"]'));
        document.querySelector('.select-seat__seat[designator = "'+existingSeatArray[i].pasSeat+'"]').setAttribute("disabled", true);
    }


});


$(document).on('click', '.select-seat__seat', function () {
    selectSeat(this);
});

function selectSeat(select) {
    console.log(select);
    let activePassenger = document.querySelector("#divMember>.tab__button>.is-active");

    if ($(select).hasClass('selected') && $(select).attr("data-seat")) {
        if ($(select).attr("data-seat") === document.querySelector(".is-active>.passenger>.name").innerHTML &&
            select.firstChild.innerHTML === document.querySelector(".is-active>.passenger>.num").innerHTML) {
            $(activePassenger).attr("select-seat", "");
            document.querySelector(".is-active>.passenger>.seat").innerHTML = "";
            select.classList.remove('selected');
            select.classList.remove('on');
            select.classList.remove('selectPrice');
            $(select).attr("data-seat", "");
            select.firstChild.innerHTML = "";
        }
    } else {
        if ($(activePassenger).attr("select-seat") === "" && $(select).attr("data-seat") === "") {
            console.log(typeof ($(select).attr('data-seat')));
            $(activePassenger).attr("select-seat", $(select).attr("designator"));
            document.querySelector(".is-active>.passenger>.seat").innerHTML = $(select).attr("designator");
            select.classList.add('selected');
            select.classList.add('on');
            select.classList.add('selectPrice');
            $(select).attr("data-seat", document.querySelector(".is-active>.passenger>.name").innerHTML);
            select.firstChild.innerHTML = document.querySelector(".is-active>.passenger>.num").innerHTML;
        }
    }
    let selectPrice = $('.selectPrice');
    let ecoSelected = 0;
    let bizSelected = 0;

    for (let i = 0; i < selectPrice.length; i++) {
        if ($(selectPrice[i]).hasClass('seat-master')) {
            ecoSelected++;
        } else if ($(selectPrice[i]).hasClass('seat-challenger')) {
            bizSelected++;
        }
    }
    let totalSeatPrice = ecoSelected * ecoPrice + bizSelected * bizPrice;

    $('#spanCost').find('.flight__cost')[0].innerHTML =  Number(divFare) + Number(divTax) + Number(divFuel) + totalSeatPrice;
    $('#divSeat').find('.flight__cost')[0].innerHTML = totalSeatPrice;

    if (ecoSelected + bizSelected != 0) {
        document.getElementById('extraServiceFee').style.display = "block";
    } else {
        document.getElementById('extraServiceFee').style.display = "none";
    }
}

for (let i = 0; i < passengerNum; i++) {
    let passengerHTML = '<div class="tab__button" data-element="tab__list" role="presentation"><button class="tab__anchor" type="button" data-element="tab__anchor" onclick="btnMember_Click(this);" data-index="' + i + '" id="passenger"' + i + 'role="tab" tabindex="" select-seat="" aria-selected="true" aria-expanded="true"><span class="passenger"><span class="num">' + (i + 1) + '</span><strong class="name"> ' + passengerNames[i] + '  </strong><span name="passengerTypeCode" style="display: none">ADT</span> <span name="passengerKey" style="display: none" value="' + i + '"></span><span name="unitKey" style="display: none"></span><span name="seat" class="seat selected_seat" ></span><span name="variant" style="display: none"></span></span></button></div>'
    $('#divMember').append(passengerHTML);
}

window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementsByClassName('seat-nav')[0].classList.add("on");
    } else {
        document.getElementsByClassName('seat-nav')[0].classList.remove("on");
    }
}


$(document).on('click', '#btnNextPC', function () {

    for (let i = 0; i < Number(tripJson["schPassengerNum"]); i++) {
        console.log(document.querySelectorAll(".selected_seat")[i]);
        passJson["pasSeat"+i] = document.querySelectorAll(".selected_seat")[i].innerHTML;
        console.log(document.querySelectorAll(".selected_seat")[i].innerHTML);
    }

    tripJson["divSeat"] = Number($('#divSeat').find('.flight__cost')[0].innerHTML);
    tripJson["spanCost"] = tripJson["divSeat"]+divFare + divTax + divFuel;
    localStorage.setItem("passJson", JSON.stringify(passJson));
    localStorage.setItem("tripJson", JSON.stringify(tripJson));
    location.href="/user/oneway/baggage_select";
})

