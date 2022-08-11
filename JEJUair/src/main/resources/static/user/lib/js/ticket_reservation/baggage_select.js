const schIdx = Number(tripJson["schIdx"]);
let passengerNum = tripJson["schPassengerNum"];

$('#divFare').find('.flight__cost')[0].innerHTML = (tripJson.divFare + tripJson2.divFare).toLocaleString();;
$('#divTax').find('.flight__cost')[0].innerHTML = (tripJson.divTax + tripJson2.divTax).toLocaleString(); ;
$('#divFuel').find('.flight__cost')[0].innerHTML = (tripJson.divFuel + tripJson2.divFuel).toLocaleString();;
$('#divSeatFee').find('.flight__cost')[0].innerHTML = (tripJson.divSeat + tripJson2.divSeat).toLocaleString();;
$('#spanCost').find('.flight__cost')[0].innerHTML =  (tripJson.spanCost + tripJson2.spanCost).toLocaleString();;

reserveProgress();

let passengerNames = []
for (let i = 0; i < passengerNum; i++) {
    passengerNames[i] = passJson["passLastName"+i]+passJson["passFirstName"+i]
    console.log(passengerNames[i])
}

for (let i = 0; i < passengerNum; i++) {
    let passengerHTML = '<div class="tab__button" data-element="tab__list" role="presentation"><button class="tab__anchor" type="button" data-element="tab__anchor" onclick="btnMember_Click(this);" data-index="' + i + '"  id="passenger' + i + '" role="tab" tabindex="" select-seat="" aria-selected="true" aria-expanded="true"><span class="passenger"><span class="num">' + (i + 1) + '</span><strong class="name">' + passengerNames[i] + '</strong><span name="passengerTypeCode" style="display: none">ADT</span> <span name="passengerKey" style="display: none" value="' + i + '"></span><span name="unitKey" style="display: none"></span><span name="seat" class="seat" ></span><span name="variant" style="display: none"></span></span></button></div>'
    $('#divPassengerTab').append(passengerHTML);
}

for (let i = 0; i < passengerNum-1; i++) {
    let baggageHTML = '                    <div id="divBaggage'+(i+1)+'" class="tab__panel" data-element="tab__panel"\n' +
        '                         aria-labelledby="passenger'+(i+1)+'" role="tabpanel" tabindex="'+(i+1)+'">\n' +
        '                        <div class="sub-tab-wrap">\n' +
        '                            <div class="sub-tab" style="display: none;">\n' +
        '                                <button name="btnjourneysName" class="sub-tab-btn on" type="button"></button>\n' +
        '                            </div>\n' +
        '                            <div class="sub-tab__panel on">\n' +
        '                                <div name="divBag" class="sub-section">\n' +
        '                                    <div class="section-title">\n' +
        '                                        <span class="icon icon-bag"></span>위탁 수하물\n' +
        '                                    </div>\n' +
        '                                    <div name="divXB0" class="button-list pc-flex pc-row3 pc-row3--baggage">\n' +
        '                                        <div name="divDefault" class="button-list__item selected baggage_selected" bagIdx="1" role="button"style="cursor:pointer">\n' +
        '                                            <div class="top-area">\n' +
        '                                                <div class="title"><span name="baggageValue" style="display: none">0</span><span class="title__sub weight"><strong class="baggage_weight">15KG</strong></span><span class="title__sub able">기본 제공</span></div>\n' +
        '                                                <div name="divSsrCode" style="display: none">XBXB</div>\n' +
        '                                            </div>\n' +
        '                                            <div class="bottom-area"><div class="price-wrap"><div class="price"><span><span class="price_txt baggage_cost">0</span><span class="unit"> 원</span></span></div></div></div>\n' +
        '                                        </div>\n' +
        '\n' +
        '                                        <div class="button-list__item" role="button" bagIdx="2" style="cursor:pointer">\n' +
        '                                            <div class="top-area">\n' +
        '                                                <div class="title"><span name="baggageValue" style="display: none">20</span><span class="title__sub"><strong class="baggage_weight">20KG</strong></span></div><div name="divCategoryCode" style="display: none">XB</div>\n' +
        '                                                <div name="divSsrCode" style="display: none">XB20</div><div class="labels"></div>\n' +
        '                                            </div>\n' +
        '                                            <div class="bottom-area"><div class="price-wrap"><div class="price"><span class="price_txt baggage_cost">8,000</span><span class="unit"> 원</span></div></div><div name="divMarketIndex" style="display: none">0</div></div>\n' +
        '                                        </div>\n' +
        '\n' +
        '                                        <div class="button-list__item" role="button" bagIdx="3"  style="cursor:pointer">\n' +
        '                                            <div class="top-area">\n' +
        '                                                <div class="title"><span name="baggageValue" style="display: none">25</span><span class="title__sub"><strong class="baggage_weight">25KG</strong></span></div><div name="divCategoryCode" style="display: none">XB</div>\n' +
        '                                                <div name="divSsrCode" style="display: none">XB25</div><div class="labels"></div>\n' +
        '                                            </div>\n' +
        '                                            <div class="bottom-area"><div class="price-wrap"><div class="price"><span class="price_txt baggage_cost">16,000</span><span class="unit"> 원</span></div></div><div name="divMarketIndex" style="display: none">0</div></div>\n' +
        '                                        </div>\n' +
        '\n' +
        '                                        <div class="button-list__item" role="button" bagIdx="4"  style="cursor:pointer">\n' +
        '                                            <div class="top-area">\n' +
        '                                                <div class="title"><span name="baggageValue" style="display: none">30</span><span class="title__sub"><strong class="baggage_weight">30KG</strong></span></div><div name="divCategoryCode" style="display: none">XB</div>\n' +
        '                                                <div name="divSsrCode" style="display: none">XB30</div><div class="labels"></div>\n' +
        '                                            </div>\n' +
        '                                            <div class="bottom-area"><div class="price-wrap"><div class="price"><span class="price_txt baggage_cost">24,000</span><span class="unit"> 원</span></div></div><div name="divMarketIndex" style="display: none">0</div></div>\n' +
        '                                        </div>\n' +
        '\n' +
        '                                        <div class="button-list__item" role="button" bagIdx="5"  style="cursor:pointer">\n' +
        '                                            <div class="top-area">\n' +
        '                                                <div class="title"><span name="baggageValue" style="display: none">35</span><span class="title__sub"><strong class="baggage_weight">35KG</strong></span></div><div name="divCategoryCode" style="display: none">XB</div>\n' +
        '                                                <div name="divSsrCode" style="display: none">XB35</div><div class="labels"></div>\n' +
        '                                            </div>\n' +
        '                                            <div class="bottom-area"><div class="price-wrap"><div class="price"><span class="price_txt baggage_cost">32,000</span><span class="unit"> 원</span></div></div><div name="divMarketIndex" style="display: none">0</div></div>\n' +
        '                                        </div>\n' +
        '\n' +
        '                                        <div class="button-list__item" role="button" bagIdx="6"  style="cursor:pointer">\n' +
        '                                            <div class="top-area">\n' +
        '                                                <div class="title"><span name="baggageValue" style="display: none">40</span><span class="title__sub"><strong class="baggage_weight">40KG</strong></span></div><div name="divCategoryCode" style="display: none">XB</div>\n' +
        '                                                <div name="divSsrCode" style="display: none">XB40</div><div class="labels"></div>\n' +
        '                                            </div>\n' +
        '                                            <div class="bottom-area"><div class="price-wrap"><div class="price"><span class="price_txt baggage_cost">40,000</span><span class="unit"> 원</span></div></div><div name="divMarketIndex" style="display: none">0</div></div>\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>'


    $('#divPanel').append(baggageHTML);
}



$(document).on('click', '.button-list__item', function () {
    baggageSelect(this);
});

function baggageSelect(select){
    let totalBaggagePrice = 0;
    console.log(select.parentNode.querySelectorAll('.button-list__item'));

    for (let i = 0; i < select.parentNode.querySelectorAll('.button-list__item').length; i++) {
        select.parentNode.querySelectorAll('.button-list__item')[i].classList.remove("selected");
        select.parentNode.querySelectorAll('.button-list__item')[i].classList.remove("baggage_selected");
    }

    select.classList.add("selected");
    select.classList.add("baggage_selected");

    const countSelected = document.querySelectorAll(".baggage_selected");
    console.log(countSelected);

    for (let i = 0; i < countSelected.length; i++) {
        console.log(countSelected[i].querySelector(".baggage_cost").innerHTML);
        let baggageCost = 0;
        if(countSelected[i].querySelector(".baggage_cost").innerHTML != 0){
            baggageCost = Number(countSelected[i].querySelector(".baggage_cost").innerHTML.replaceAll(",",""));
        }
        totalBaggagePrice += Number(baggageCost);
    }

    document.querySelector("#divBaggageFee .flight__cost").innerHTML = Number(tripJson.divBaggageFee + totalBaggagePrice).toLocaleString();
    document.querySelector("#divBaggageFee .flight__cost").setAttribute("value", String(totalBaggagePrice));
    $('#spanCost').find('.flight__cost')[0].innerHTML = Number(tripJson.spanCost + tripJson2.spanCost + totalBaggagePrice).toLocaleString();
}


function reserveProgress(){
    if(tripJson.resRoute === "ONEWAY"){
        document.querySelector(".page-title-add").innerHTML = "가는 편(편도)";
        document.getElementById("spanNextPC").firstElementChild.innerHTML = "다음";
        document.getElementById("btnNextPC").classList.add("onewayPage");
    }else if(passJson["roundCheck"]==="false"){
        document.querySelector(".page-title-add").innerHTML = "가는 편(왕복)";
        document.getElementById("spanNextPC").firstElementChild.innerHTML = "오는 편 선택하기";
        document.getElementById("btnNextPC").classList.add("roundPage");
    }else if(passJson["roundCheck"]==="true"){
        document.querySelector(".page-title-add").innerHTML = "오는 편(왕복)";
        document.getElementById("spanNextPC").firstElementChild.innerHTML = "다음";
        document.getElementById("btnNextPC").classList.add("roundbackPage");
    }
}


$(document).on('click', '.onewayPage', function () {

    for (let i = 0; i < Number(tripJson["schPassengerNum"]); i++) {
        if(document.querySelectorAll(".baggage_selected .baggage_cost")[i].innerHTML == 0){
            passJson["pasBaggagePrice"+i] = 0;
        }else{
            passJson["pasBaggagePrice"+i] = Number(document.querySelectorAll(".baggage_selected .baggage_cost")[i].innerHTML.replaceAll(",", ""));
        }
        passJson["pasBaggage"+i] = document.querySelectorAll(".baggage_selected .baggage_weight")[i].innerHTML;
        passJson["pasBagIdx"+i] = document.querySelectorAll(".baggage_selected")[i].getAttribute("bagIdx");
    }

    tripJson["divBaggageFee"] = Number($('#divBaggageFee').find('.flight__cost')[0].getAttribute("value"));
    tripJson["spanCost"] = tripJson["spanCost"]+tripJson["divBaggageFee"];
    localStorage.setItem("passJson", JSON.stringify(passJson));
    localStorage.setItem("tripJson", JSON.stringify(tripJson));

    console.log(passJson);
    console.log(tripJson);
   // location.href="/user/meal_select";
    location.href="/user/view_confirm";
})

$(document).on('click', '.roundPage', function () {

    for (let i = 0; i < Number(tripJson["schPassengerNum"]); i++) {
        if(document.querySelectorAll(".baggage_selected .baggage_cost")[i].innerHTML == 0){
            passJson["pasBaggagePrice"+i] = 0;
        }else{
            passJson["pasBaggagePrice"+i] = Number(document.querySelectorAll(".baggage_selected .baggage_cost")[i].innerHTML.replaceAll(",", ""));
        }
        passJson["pasBaggage"+i] = document.querySelectorAll(".baggage_selected .baggage_weight")[i].innerHTML;
        passJson["pasBagIdx"+i] = document.querySelectorAll(".baggage_selected")[i].getAttribute("bagIdx");
    }

    tripJson["divBaggageFee"] = Number($('#divBaggageFee').find('.flight__cost')[0].getAttribute("value"));
    tripJson["spanCost"] = tripJson["spanCost"]+tripJson["divBaggageFee"];
    passJson["roundCheck"] = "true";
    localStorage.setItem("passJson", JSON.stringify(passJson));
    localStorage.setItem("tripJson", JSON.stringify(tripJson));

    console.log(passJson);
    console.log(tripJson);
    location.href="/user/baggage_select";
})


$(document).on('click', '.roundbackPage', function () {

    for (let i = 0; i < Number(tripJson["schPassengerNum"]); i++) {
        if(document.querySelectorAll(".baggage_selected .baggage_cost")[i].innerHTML == 0){
            passJson2["pasBaggagePrice"+i] = 0;
        }else{
            passJson2["pasBaggagePrice"+i] = Number(document.querySelectorAll(".baggage_selected .baggage_cost")[i].innerHTML.replaceAll(",", ""));
        }
        passJson2["pasBaggage"+i] = document.querySelectorAll(".baggage_selected .baggage_weight")[i].innerHTML;
        passJson2["pasBagIdx"+i] = Number(document.querySelectorAll(".baggage_selected")[i].getAttribute("bagIdx"));
        console.log(document.querySelectorAll(".baggage_selected .baggage_cost")[i].innerHTML);
    }

    tripJson2["divBaggageFee"] = Number($('#divBaggageFee').find('.flight__cost')[0].getAttribute("value"));
    tripJson2["spanCost"] = tripJson2["spanCost"]+tripJson2["divBaggageFee"];
    passJson["roundCheck"] = "true";
    localStorage.setItem("passJson", JSON.stringify(passJson));
    localStorage.setItem("passJson2", JSON.stringify(passJson2));
    localStorage.setItem("tripJson2", JSON.stringify(tripJson2));

    console.log(passJson2);
    console.log(tripJson2);
    // location.href="/user/meal_select";
    location.href="/user/view_confirm";
})