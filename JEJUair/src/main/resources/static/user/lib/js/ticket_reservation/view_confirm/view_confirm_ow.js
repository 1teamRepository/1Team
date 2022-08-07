const schIdx = Number(tripJson["schIdx"]);
let memPoint = 0;

loadSchInfo();

function loadSchInfo() {
    $.get("/api/flight_schedule/" + schIdx, function (response) {
        const schInfo = response.data;

        let depDay = new Date(schInfo.schDepartureDate);
        let arrDay = new Date(schInfo.schArrivalDate);
        const weekday = ['(일)&nbsp', '(월)&nbsp', '(화)&nbsp', '(수)&nbsp', '(목)&nbsp', '(금)&nbsp', '(토)&nbsp'];

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

        console.log(memPoint);

        console.log("===schInfo===")
        console.log(schInfo);
        console.log(document.querySelector(".aircraft_name"));
        document.querySelector(".aircraft_name").innerHTML = schInfo.schAircraftName;
        document.querySelector(".marked--brand").innerHTML = tripJson["seatValue"] == "biz" ? "BIZ LITE" : "FLY";
        document.querySelector(".departure_date").innerHTML = schInfo.schDepartureDate + weekday[depDay.getDay()];
        document.querySelector(".departure_time").innerHTML = schInfo.schDepartureTime;
        document.querySelector(".arrival_date").innerHTML = schInfo.schArrivalDate + " " + weekday[arrDay.getDay()];
        document.querySelector(".arrival_time").innerHTML = schInfo.schArrivalTime;
        document.querySelector(".departure_port").innerHTML = schInfo.schDeparture;
        document.querySelector(".arrival_port").innerHTML = schInfo.schArrival;
        document.querySelectorAll(".passengerNum")[0].innerHTML = String(tripJson["schPassengerNum"]);
        document.querySelectorAll(".passengerNum")[1].innerHTML = String(tripJson["schPassengerNum"]);

        document.querySelector(".divFare").innerHTML = tripJson["divFare"];
        document.querySelector(".divFuel").innerHTML = tripJson["divFuel"];
        document.querySelector(".divTax").innerHTML = tripJson["divTax"];
        document.querySelector(".divSeat").innerHTML = String(tripJson["divSeat"]);
        document.querySelector(".divBaggageFee").innerHTML = String(tripJson.divBaggageFee);
        document.querySelectorAll(".spanCost")[0].innerHTML = tripJson.spanCost;

        document.querySelectorAll(".spanCost")[1].innerHTML = tripJson.spanCost;
        document.querySelector(".divTotalFare").innerHTML = tripJson["divFare"] + tripJson["divFuel"] + tripJson["divTax"];
        document.querySelector(".divTotalService").innerHTML = tripJson["divSeat"] + tripJson["divBaggageFee"]; //+tripJson["divFood"]

        document.querySelector(".spanFinalCost").innerHTML = tripJson.spanCost;

        let passengerNum = tripJson["schPassengerNum"];

        document.getElementById("hasPoint").setAttribute("value", memPoint);

        for (let i = 0; i < passengerNum; i++) {
            let passengerHTML = '                <dl class="line-list-item">\n' +
                '                    <dt class="title">\n' +
                '                        <div class="txt-left"> '+passJson["passLastName"+i]+passJson["passFirstName"+i]+'</div>\n' +
                '                        <div class="price"><p><span class="price_txt">'+(Number(tripJson["divFare"]/passengerNum)+Number(tripJson["divFuel"]/passengerNum)+Number(tripJson["divTax"]/passengerNum)+Number(passJson["pasBaggagePrice"+i])+5000)+'</span>\n' +
                '                            <span class="unit">&nbsp원</span></p></div>\n' +
                '                    </dt>\n' +
                '                    <dd class="list">\n' +
                '                        <ul>\n' +
                '                            <li>\n' +
                '                                <div class="txt-left">항공운임</div>\n' +
                '                                <div class="txt-right"><span class="price_txt">'+(tripJson["divFare"]/passengerNum)+'</span>\n' +
                '                                    <span class="unit">&nbsp원</span></div>\n' +
                '                            </li>\n' +
                '                            <li>\n' +
                '                                <div class="txt-left">유류할증료</div>\n' +
                '                                <div class="txt-right"><span class="price_txt">'+(tripJson["divFuel"]/passengerNum)+'</span>\n' +
                '                                    <span class="unit">&nbsp원</span></div>\n' +
                '                            </li>\n' +
                '                            <li>\n' +
                '                                <div class="txt-left">공항시설 사용료</div>\n' +
                '                                <div class="txt-right"><span class="price_txt">'+(tripJson["divTax"]/passengerNum)+'</span>\n' +
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
                '                                                    class="price"><span class="price_txt">'+passJson["pasBaggagePrice"+i]+'</span><span class="unit">&nbsp&nbsp원</span></span>\n' +
                '                                                </li>\n' +
                '                                            </ul>\n' +
                '                                        </td>\n' +
                '                                    </tr>\n' +
                '                                    <tr>\n' +
                '                                        <td class="receipt_title oneline"><span class="receipt_ti">사전 기내식</span>\n' +
                '                                        </td>\n' +
                '                                        <td class="receipt_conts">\n' +
                '                                            <ul>\n' +
                '                                                <li><span class="item">생선요리와 화이트와인</span> <span\n' +
                '                                                    class="price"><span class="price_txt">11,000</span><span class="unit">&nbsp&nbsp원</span></span>\n' +
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
                '                                                    class="price_txt">5000</span><span class="unit">&nbsp&nbsp원</span></span>\n' +
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
        }

        $(document).on('click', ".change_point", function(){
            setPoint();
        })

        function setPoint(){

            if(Number(document.querySelector("#hasPoint").value) > Number(document.querySelector("#inputPoint").value)){
                document.querySelector(".spanPoint").innerHTML = document.querySelector("#inputPoint").value;
                document.querySelector(".spanFinalCost").innerHTML = String(Number(document.querySelectorAll(".spanCost")[0].innerHTML) - Number(document.querySelector(".spanPoint").innerHTML));
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
            pntAmount: Number("-"+document.querySelector(".spanPoint").innerHTML),
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
    tripJson["spanCost"] = Number(document.querySelector(".spanFinalCost").innerHTML);

    localStorage.setItem("passJson", JSON.stringify(passJson));
    localStorage.setItem("tripJson", JSON.stringify(tripJson));

    location.href = "/user/oneway/view_payment";
});
