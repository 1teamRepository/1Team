const schIdx = Number(tripJson["schIdx"]);
const schIdx2 = Number(tripJson2["schIdx"]);
console.log("schIdx : ", schIdx)
console.log("schIdx2 : ", schIdx2)
let bizSeats = 0;
let ecoSeats = 0;

// 승객 수
let passengerNum = Number(tripJson["schPassengerNum"]);
let bizO = "";
let bizX = document.getElementById("divBusinessLite");

let passengerNames = []

for (let i = 0; i < passengerNum; i++) {
    passengerNames[i] = passJson["passLastName"+i]+"/"+passJson["passFirstName"+i]
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
let bizPrice = 10000;

$('#divFare').find('.flight__cost')[0].innerHTML = (tripJson.divFare + tripJson2.divFare).toLocaleString();
$('#divTax').find('.flight__cost')[0].innerHTML = (tripJson.divTax + tripJson2.divTax).toLocaleString();
$('#divFuel').find('.flight__cost')[0].innerHTML = (tripJson.divFuel + tripJson2.divFuel).toLocaleString();
$('#spanCost').find('.flight__cost')[0].innerHTML =  (tripJson.spanCost + tripJson2.spanCost).toLocaleString();

let existingSeatArray = [];
let existingSeatArray2 = [];

reserveProgress();

$.get("/api/flight_schedule/"+schIdx, function(response){
    let schRead = response.data;
    console.log(schRead);
    bizSeats = Number(schRead["acftBizLiteSeats"]);
    ecoSeats = Number(schRead["acftNomalSeats"]);

    $.get({
        url: '/api/passenger/seatFind/'+schIdx,
        dataType : "json",
        contentType: 'application/json',
        async: false,
        success: function(response){
            existingSeatArray = response.data
            console.log(existingSeatArray)
        }
    })

    if(passJson["roundCheck"]==="true"){
        $.get({
            url: "/api/flight_schedule/"+schIdx2,
            dataType: "json",
            contentType: 'application/json',
            async: false,
            success: function (res) {
                let schRead2 = res.data;
                bizSeats = Number(schRead2["acftBizLiteSeats"]);
                ecoSeats = Number(schRead2["acftNomalSeats"]);

                $.get({
                    url: '/api/passenger/seatFind/' + schIdx2,
                    dataType: "json",
                    contentType: 'application/json',
                    async: false,
                    success: function (response2) {
                        existingSeatArray2 = response2.data
                        console.log(existingSeatArray2)
                    }
                })
            }

        })

    }

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

    if(tripJson.resRoute==="ONEWAY" || passJson["roundCheck"] === "false"){
        for (let i = 0; i < existingSeatArray.length; i++) {
            if(existingSeatArray[i].pasSeat !== "BIZ" && existingSeatArray[i].pasSeat !== "ECO"){
                if(existingSeatArray[i].pasSeat != null){
                    document.querySelector('.select-seat__seat[designator = "'+existingSeatArray[i].pasSeat+'"]').setAttribute("disabled", true);
                }
            }
        }
    }if(passJson["roundCheck"] === "true"){
        for (let i = 0; i < existingSeatArray2.length; i++) {
            if(existingSeatArray2[i].pasSeat !== "BIZ" && existingSeatArray2[i].pasSeat !== "ECO"){
                if(existingSeatArray2[i].pasSeat != null) {
                    document.querySelector('.select-seat__seat[designator = "' + existingSeatArray2[i].pasSeat + '"]').setAttribute("disabled", true);
                }
            }
        }
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
    const totalSeatPrice = Number(ecoSelected * ecoPrice) + Number(bizSelected * bizPrice);


    $('#divSeat').find('.flight__cost')[0].innerHTML = (tripJson.divSeat + totalSeatPrice).toLocaleString();
    $('#divSeat').find('.flight__cost')[0].setAttribute("value", totalSeatPrice);
    $('#spanCost').find('.flight__cost')[0].innerHTML =  (tripJson.spanCost + tripJson2.spanCost + totalSeatPrice).toLocaleString();

    if (ecoSelected + bizSelected !== 0) {
        document.getElementById('extraServiceFee').style.display = "block";
    } else {
        document.getElementById('extraServiceFee').style.display = "none";
    }
}

for (let i = 0; i < passengerNum; i++) {
    let passengerHTML = '<div class="tab__button" data-element="tab__list" role="presentation"><button class="tab__anchor" type="button" data-element="tab__anchor" data-index="' + i + '" id="passenger' + i + '" role="tab" tabindex="" select-seat="" aria-selected="true" aria-expanded="true"><span class="passenger"><span class="num">' + (i + 1) + '</span><strong class="name"> ' + passengerNames[i] + '  </strong><span name="passengerTypeCode" style="display: none">ADT</span> <span name="passengerKey" style="display: none" value="' + i + '"></span><span name="unitKey" style="display: none"></span><span name="seat" class="seat selected_seat" ></span><span name="variant" style="display: none"></span></span></button></div>'
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

function reserveProgress(){
    if(tripJson.resRoute === "ONEWAY"){
        document.getElementById("sectionName").innerHTML = "가는 편(편도)";
        document.getElementById("spanNextPC").firstElementChild.innerHTML = "다음";
        document.getElementById("btnNextPC").classList.add("onewayPage");

        if (tripJson.seatValue === "biz") {
            bizX.style.display = "block";
            bizO = "disabled";
        }

    }else if(passJson["roundCheck"]==="false"){
        document.getElementById("sectionName").innerHTML = "가는 편(왕복)";
        document.getElementById("spanNextPC").firstElementChild.innerHTML = "오는 편 선택하기";
        document.getElementById("btnNextPC").classList.add("roundPage");

        if (tripJson.seatValue === "biz") {
            bizX.style.display = "block";
            bizO = "disabled";
        }

    }else if(passJson["roundCheck"]==="true"){
        document.getElementById("sectionName").innerHTML = "오는 편(왕복)";
        document.getElementById("spanNextPC").firstElementChild.innerHTML = "다음";
        document.getElementById("btnNextPC").classList.add("roundbackPage");

        if (tripJson2.seatValue === "biz") {
            bizX.style.display = "block";
            bizO = "disabled";
        }
    }
}

$(document).on('click', '.onewayPage', function () {

    for (let i = 0; i < tripJson["schPassengerNum"]; i++) {
        if(document.getElementById("passenger"+i).getAttribute("select-seat") == null || document.getElementById("passenger"+i).getAttribute("select-seat") === ""){
            if(tripJson.seatValue === "biz"){
                passJson["pasSeat"+i] = "BIZ";
            }else{
                passJson["pasSeat"+i] = "ECO";
            }
        }else{
            passJson["pasSeat"+i] = document.querySelectorAll(".selected_seat")[i].innerHTML;
        }
    }

    tripJson["divSeat"] = Number($('#divSeat').find('.flight__cost')[0].getAttribute("value"));
    tripJson["spanCost"] = tripJson["spanCost"]+tripJson["divSeat"];
    localStorage.setItem("passJson", JSON.stringify(passJson));
    localStorage.setItem("tripJson", JSON.stringify(tripJson));

    location.href="/user/baggage_select";
})

$(document).on('click', '.roundPage', function () {

    for (let i = 0; i < tripJson["schPassengerNum"]; i++) {
        if(document.getElementById("passenger"+i).getAttribute("select-seat") == null || document.getElementById("passenger"+i).getAttribute("select-seat") === ""){
            if(tripJson.seatValue === "biz"){
                passJson["pasSeat"+i] = "BIZ";
            }else{
                passJson["pasSeat"+i] = "ECO";
            }
        }else{
            passJson["pasSeat"+i] = document.querySelectorAll(".selected_seat")[i].innerHTML;
        }
    }

    tripJson["divSeat"] = Number($('#divSeat').find('.flight__cost')[0].getAttribute("value"));
    tripJson["spanCost"] = tripJson["spanCost"]+tripJson["divSeat"];
    passJson["roundCheck"] = "true";
    localStorage.setItem("passJson", JSON.stringify(passJson));
    localStorage.setItem("tripJson", JSON.stringify(tripJson));

    location.href="/user/seat_select";
})

$(document).on('click', '.roundbackPage', function () {

    for (let i = 0; i < tripJson["schPassengerNum"]; i++) {
        if(document.getElementById("passenger"+i).getAttribute("select-seat") == null || document.getElementById("passenger"+i).getAttribute("select-seat") === ""){
            if(tripJson.seatValue === "biz"){
                passJson2["pasSeat"+i] = "BIZ";
            }else{
                passJson2["pasSeat"+i] = "ECO";
            }
        }else{
            passJson2["pasSeat"+i] = document.querySelectorAll(".selected_seat")[i].innerHTML;
        }
    }

    tripJson2["divSeat"] = Number($('#divSeat').find('.flight__cost')[0].getAttribute("value"));
    tripJson2["spanCost"] = tripJson2["spanCost"]+tripJson2["divSeat"];
    passJson["roundCheck"] = "false";
    localStorage.setItem("passJson", JSON.stringify(passJson));
    localStorage.setItem("passJson2", JSON.stringify(passJson2));
    localStorage.setItem("tripJson2", JSON.stringify(tripJson2));

    location.href="/user/baggage_select";
})
