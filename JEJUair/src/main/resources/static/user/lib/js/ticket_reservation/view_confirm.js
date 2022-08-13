
loadSchInfo();
console.log("/api/flight_schedule/" + tripJson["schIdx"]);
function loadSchInfo() {
    $.get("/api/flight_schedule/" + tripJson["schIdx"], function (response) {
        const schInfo = response.data;

        let depDay = new Date(schInfo.schDepartureDate);
        let arrDay = new Date(schInfo.schArrivalDate);
        const weekday = ['(일)&nbsp', '(월)&nbsp', '(화)&nbsp', '(수)&nbsp', '(목)&nbsp', '(금)&nbsp', '(토)&nbsp'];
        if(tripJson2.resRoute === "ROUNDBACK"){
            document.getElementById("roundBackInfo").style.display = "flex";
        }

        $.get({
            url: '/api/customer/'+tripJson["memIdx"],
            dataType : "json",
            contentType: 'application/json',
            async: false,
            success: function(response){
                console.log(response)
                console.log(response.data)
                memPoint = response.data.memPoint;
            }
        })

        console.log("===schInfo===")
        console.log(schInfo);
        document.querySelector(".aircraft_name").innerHTML = schInfo.schAircraftName;
        document.querySelector(".marked--brand").innerHTML = tripJson["seatValue"] == "biz" ? "BIZ LITE" : "FLY";
        document.querySelector(".departure_date").innerHTML = schInfo.schDepartureDate + weekday[depDay.getDay()];
        document.querySelector(".departure_time").innerHTML = schInfo.schDepartureTime;
        document.querySelector(".arrival_date").innerHTML = schInfo.schArrivalDate + " " + weekday[arrDay.getDay()];
        document.querySelector(".arrival_time").innerHTML = schInfo.schArrivalTime;
        document.querySelector(".departure_port").innerHTML = schInfo.schDeparture;
        document.querySelector(".arrival_port").innerHTML = schInfo.schArrival;

        if(tripJson2.resRoute === "ROUNDBACK") {
            $.get("/api/flight_schedule/" + tripJson2["schIdx"], function (response) {
                const schInfo2 = response.data;
                document.querySelectorAll(".aircraft_name")[1].innerHTML = schInfo2.schAircraftName;
                document.querySelectorAll(".marked--brand")[1].innerHTML = tripJson2["seatValue"] == "biz" ? "BIZ LITE" : "FLY";
                document.querySelectorAll(".departure_date")[1].innerHTML = schInfo2.schDepartureDate + weekday[depDay.getDay()];
                document.querySelectorAll(".departure_time")[1].innerHTML = schInfo2.schDepartureTime;
                document.querySelectorAll(".arrival_date")[1].innerHTML = schInfo2.schArrivalDate + " " + weekday[arrDay.getDay()];
                document.querySelectorAll(".arrival_time")[1].innerHTML = schInfo2.schArrivalTime;
                document.querySelectorAll(".departure_port")[1].innerHTML = schInfo2.schDeparture;
                document.querySelectorAll(".arrival_port")[1].innerHTML = schInfo2.schArrival;
            });
        }

        document.querySelectorAll(".passengerNum")[0].innerHTML = String(tripJson["schPassengerNum"]);
        document.querySelectorAll(".passengerNum")[1].innerHTML = String(tripJson["schPassengerNum"]);
        document.querySelectorAll(".passengerNum")[2].innerHTML = String(tripJson["schPassengerNum"]);

        document.querySelector(".divFare").innerHTML = Number(tripJson.divFare + tripJson2.divFare).toLocaleString();
        document.querySelector(".divTax").innerHTML = Number(tripJson.divTax + tripJson2.divTax).toLocaleString() ;
        document.querySelector(".divFuel").innerHTML = Number(tripJson.divFuel + tripJson2.divFuel).toLocaleString();
        document.querySelector(".divSeat").innerHTML = Number(tripJson.divSeat + tripJson2.divSeat).toLocaleString();
        document.querySelector(".divBaggageFee").innerHTML = Number(tripJson.divBaggageFee + tripJson2.divBaggageFee).toLocaleString();
        document.querySelector(".divFood").innerHTML = Number(tripJson.divMealFee + tripJson2.divMealFee).toLocaleString();

        document.querySelectorAll(".spanCost")[0].innerHTML =  Number(tripJson.spanCost + tripJson2.spanCost).toLocaleString();
        document.querySelectorAll(".spanCost")[1].innerHTML = Number(tripJson.spanCost + tripJson2.spanCost).toLocaleString();
        document.querySelector(".divTotalFare").innerHTML = Number(tripJson.divFare + tripJson2.divFare+ tripJson.divTax + tripJson2.divTax + tripJson.divFuel + tripJson2.divFuel).toLocaleString();
        document.querySelector(".divTotalService").innerHTML = Number(tripJson.divSeat + tripJson2.divSeat + tripJson.divBaggageFee + tripJson2.divBaggageFee + tripJson.divMealFee + tripJson2.divMealFee).toLocaleString();

        document.querySelector(".spanFinalCost").innerHTML = Number(tripJson.spanCost + tripJson2.spanCost).toLocaleString();

        let passengerNum = tripJson["schPassengerNum"];

        document.getElementById("hasPoint").setAttribute("value", memPoint);

        for (let i = 0; i < passengerNum; i++) {

            const seatPrice1 = passJson["pasSeat"+i] === "" ? 0 : (tripJson.seatValue === "eco" ? 5000 : 10000);
            let seatPrice2 = 0;
            if(tripJson2.resRoute === "ROUNDBACK"){
                seatPrice2 = passJson2["pasSeat"+i] === "" ? 0 : (tripJson2.seatValue === "eco" ? 5000 : 10000);
            }

            let passengerHTML = ' <dl class="line-list-item">\n' +
                '                    <dt class="title">\n' +
                '                        <div class="txt-left"> '+passJson["passLastName"+i]+passJson["passFirstName"+i]+'</div>\n' +
                '                        <div class="price"><p><span class="price_txt">'+(Number((tripJson["divFare"]+tripJson2["divFare"])/passengerNum)+Number((tripJson["divFuel"]+tripJson2["divFuel"])/passengerNum)+Number((tripJson["divTax"]+tripJson2["divTax"])/passengerNum)+Number(passJson["pasBaggagePrice"+i] + passJson2["pasBaggagePrice"+i])+seatPrice1+seatPrice2+ Number(passJson["pasMeal"+i] + passJson2["pasMeal"+i])).toLocaleString()+'</span>\n' +
                '                            <span class="unit">&nbsp원</span></p></div>\n' +
                '                    </dt>\n' +
                '                    <dd class="list">\n' +
                '                        <ul>\n' +
                '                            <li>\n' +
                '                                <div class="txt-left">항공운임</div>\n' +
                '                                <div class="txt-right"><span class="price_txt">'+Number((tripJson["divFare"]+tripJson2["divFare"])/passengerNum).toLocaleString()+'</span>\n' +
                '                                    <span class="unit">&nbsp원</span></div>\n' +
                '                            </li>\n' +
                '                            <li>\n' +
                '                                <div class="txt-left">유류할증료</div>\n' +
                '                                <div class="txt-right"><span class="price_txt">'+Number((tripJson["divFuel"]+tripJson2["divFuel"])/passengerNum).toLocaleString()+'</span>\n' +
                '                                    <span class="unit">&nbsp원</span></div>\n' +
                '                            </li>\n' +
                '                            <li>\n' +
                '                                <div class="txt-left">공항시설 사용료</div>\n' +
                '                                <div class="txt-right"><span class="price_txt">'+Number((tripJson["divTax"]+tripJson2["divTax"])/passengerNum).toLocaleString()+'</span>\n' +
                '                                    <span class="unit">&nbsp원</span></div>\n' +
                '                            </li>\n' +
                '                        </ul>\n' +
                '                        <p class="sub-title">부가서비스 내역</p>\n' +
                '                        <div class="modal-receipt">\n' +
                '                            <div class="payment-amount">\n' +
                '                                <div class="payment-amount__title">가는 편</div>\n' +
                '                            </div>\n' +
                '                            <div class="payment-amount">\n' +
                '                                <table class="tbl_receipt">\n' +
                '                                    <tbody>\n' +
                '                                    <tr>\n' +
                '                                        <td class="receipt_title oneline"><span class="receipt_ti">사전 수하물</span>\n' +
                '                                        </td>\n' +
                '                                        <td class="receipt_conts">\n' +
                '                                            <ul>\n' +
                '                                                <li><span class="item">'+passJson["pasBaggage"+i]+'</span> <span\n' +
                '                                                    class="price"><span class="price_txt">'+passJson["pasBaggagePrice"+i].toLocaleString()+'</span><span class="unit">&nbsp&nbsp원</span></span>\n' +
                '                                                </li>\n' +
                '                                            </ul>\n' +
                '                                        </td>\n' +
                '                                    </tr>\n' +
                '                                    <tr>\n' +
                '                                        <td class="receipt_title oneline"><span class="receipt_ti">사전 기내식</span>\n' +
                '                                        </td>\n' +
                '                                        <td class="receipt_conts">\n' +
                '                                            <ul>\n' +
                '                                                <li><span class="item">'+passJson["pasMealName"+i]+'</span><span\n' +
                '                                                    class="price"><span class="price_txt">'+passJson["pasMeal"+i].toLocaleString()+'</span><span class="unit">&nbsp&nbsp원</span></span>\n' +
                '                                                </li>\n' +
                '                                            </ul>\n' +
                '                                        </td>\n' +
                '                                    </tr>\n' +
                '                                    <tr>\n' +
                '                                        <td class="receipt_title oneline"><span class="receipt_ti">사전 좌석</span>\n' +
                '                                        </td>\n' +
                '                                        <td class="receipt_conts">\n' +
                '                                            <ul>\n' +
                '                                                <li><span class="item">'+passJson["pasSeat"+i]+'</span> <span class="price"><span\n' +
                '                                                    class="price_txt">'+seatPrice1.toLocaleString()+'</span><span class="unit">&nbsp&nbsp원</span></span>\n' +
                '                                                </li>\n' +
                '                                            </ul>\n' +
                '                                        </td>\n' +
                '                                    </tr>\n' +
                '                                    </tbody>\n' +
                '                                </table>\n' +
                '                            </div>\n' +
                '                        </div>\n' +

                '                        <div class="modal-receipt roundbackReceipt">\n' +
                '                            <div class="payment-amount">\n' +
                '                                <div class="payment-amount__title">오는 편</div>\n' +
                '                            </div>\n' +
                '                            <div class="payment-amount">\n' +
                '                                <table class="tbl_receipt">\n' +
                '                                    <tbody>\n' +
                '                                    <tr>\n' +
                '                                        <td class="receipt_title oneline"><span class="receipt_ti">사전 수하물</span>\n' +
                '                                        </td>\n' +
                '                                        <td class="receipt_conts">\n' +
                '                                            <ul>\n' +
                '                                                <li><span class="item">'+passJson2["pasBaggage"+i]+'</span> <span\n' +
                '                                                    class="price"><span class="price_txt">'+passJson2["pasBaggagePrice"+i].toLocaleString()+'</span><span class="unit">&nbsp&nbsp원</span></span>\n' +
                '                                                </li>\n' +
                '                                            </ul>\n' +
                '                                        </td>\n' +
                '                                    </tr>\n' +
                '                                    <tr>\n' +
                '                                        <td class="receipt_title oneline"><span class="receipt_ti">사전 기내식</span>\n' +
                '                                        </td>\n' +
                '                                        <td class="receipt_conts">\n' +
                '                                            <ul>\n' +
                '                                                <li><span class="item">'+passJson2["pasMealName"+i]+'</span> <span\n' +
                '                                                    class="price"><span class="price_txt">'+passJson2["pasMeal"+i].toLocaleString()+'</span><span class="unit">&nbsp&nbsp원</span></span>\n' +
                '                                                </li>\n' +
                '                                            </ul>\n' +
                '                                        </td>\n' +
                '                                    </tr>\n' +
                '                                    <tr>\n' +
                '                                        <td class="receipt_title oneline"><span class="receipt_ti">사전 좌석</span>\n' +
                '                                        </td>\n' +
                '                                        <td class="receipt_conts">\n' +
                '                                            <ul>\n' +
                '                                                <li><span class="item">'+passJson2["pasSeat"+i]+'</span> <span class="price"><span\n' +
                '                                                    class="price_txt">'+seatPrice2.toLocaleString()+'</span><span class="unit">&nbsp&nbsp원</span></span>\n' +
                '                                                </li>\n' +
                '                                            </ul>\n' +
                '                                        </td>\n' +
                '                                    </tr>\n' +
                '                                    </tbody>\n' +
                '                                </table>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </dd>\n' +
                '                </dl>'
            $('#passengerFareList').append(passengerHTML);
            if(tripJson.resRoute === "ONEWAY"){
                document.querySelectorAll(".roundbackReceipt")[i].style.display = "none";
            }

        }

        $(document).on('click', ".change_point", function(){
            setPoint();
        })

        function setPoint(){
            if(Number(document.querySelector("#hasPoint").value) > Number(document.querySelector("#inputPoint").value)){
                document.querySelector(".spanPoint").innerHTML = document.querySelector("#inputPoint").value;
                document.querySelector(".spanFinalCost").innerHTML = (Number(document.querySelectorAll(".spanCost")[0].innerHTML.replaceAll(",","")) - Number(document.querySelector(".spanPoint").innerHTML)).toLocaleString();
            }else{
                alert("사용포인트는 가용포인트를 초과할 수 없습니다.");
            }
        }
    });
}

$(document).on('click', "#btnPaxDetail", function(){
    document.getElementById("passModal").style.display = "inline-block";
})

$(document).on('click', '.modal__close', function(){
    document.getElementById("passModal").style.display = "none";
})


$(document).on('click', '#btnNext', function () {


    if(document.querySelector(".spanPoint").innerHTML !== "0"){

        //    멤버 point 차감

        let tbMember = {
            transaction_time: new Date(),
            resultCode:"ok",
            description:"ok",
            data:{
                memIdx: tripJson.memIdx,
                memPoint: Number("-"+document.querySelector(".spanPoint").innerHTML)
            }
        }

        $.post({
            url: '/api/customer/save',
            method: "PUT",
            data: JSON.stringify(tbMember),
            dataType: 'json',
            contentType: 'application/json',
            async: false,
            success: function(response){
                console.log("===== member response ====")
                console.log(response.data);
            },
            error: function(){
                alert('오류가 발생했습니다. 예매 시작화면으로 돌아갑니다.');
                // location.href = "/user/ticket_reservation"
            }
        });



        //포인트 사용 내역 추가

        let tbPoint = {
            transaction_time: new Date(),
            resultCode:"ok",
            description:"ok",
            data:{
                pntUserid: tripJson["memUserid"],
                pntContent: "항공권 결제 사용 포인트",
                pntAmount: Number("-"+document.querySelector(".spanPoint").innerHTML.replaceAll(",","")),
                pntStatus: "USE",
                pntMemIdx: tripJson.memIdx
            }
        }

        $.post({
            url: '/api/point',
            data: JSON.stringify(tbPoint),
            dataType: 'json',
            contentType: 'application/json',
            async: false,
            success: function(response){
                console.log("===== point response ====")
                console.log(response.data);
            },
            error: function(){
                alert('오류가 발생했습니다. 예매 시작화면으로 돌아갑니다.');
                // location.href = "/user/ticket_reservation"
            }
        });

        tripJson["spanFinalCost"] = Number(document.querySelector(".spanFinalCost").innerHTML.replaceAll(",",""));

        if(tripJson2.spanCost === 0){
            tripJson["spanCost"] = Number(tripJson.spanCost + Number(tbPoint.data.pntAmount));
        }else{
            tripJson["spanCost"] = Number(tripJson.spanCost + parseInt(tbPoint.data.pntAmount/2));
            tripJson2["spanCost"] = Number(tripJson2.spanCost + parseInt(tbPoint.data.pntAmount/2));
        }
    }

    localStorage.setItem("passJson", JSON.stringify(passJson));
    localStorage.setItem("tripJson", JSON.stringify(tripJson));
    localStorage.setItem("tripJson2", JSON.stringify(tripJson2));

    location.href = "/user/view_payment";
});
