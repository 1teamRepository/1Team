
let resIdx = 0;
let acftIdx = 0;
let schFlyDiscount = 0;
let schBizLiteDiscount = 0;
let resIdx2 = 0;
let acftIdx2 = 0;
let schFlyDiscount2 = 0;
let schBizLiteDiscount2 = 0;


//편도, 왕복 가는편 로직
if(tripJson.resRoute==="ONEWAY" || tripJson.resRoute==="ROUNDGO") {

    $.get({
        url: '/api/flight_schedule/' + tripJson["schIdx"],
        dataType: "json",
        contentType: 'application/json',
        async: false,
        success: function (response) {
            console.log(response.data)
            schFlyDiscount = response.data.schFlyDiscount;
            schBizLiteDiscount = response.data.schBizLiteDiscount;
            acftIdx = response.data.tbAircraftAcftIdx;
        }
    })

//예약 create
    let tbReservation = {
        transaction_time: new Date(),
        resultCode: "ok",
        description: "ok",
        data: {
            resRoute: tripJson.resRoute,
            tbMemberMemIdx: tripJson["memIdx"],
            tbFlightScheduleSchIdx: tripJson["schIdx"]
        }
    }

    $.post({
        url: '/api/reservation',
        data: JSON.stringify(tbReservation),
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        success: function (response) {
            console.log("===== reservation response ====")
            console.log(response.data);
            console.log(response.data.resIdx);
            resIdx = response.data.resIdx;

            document.querySelector(".departure_port").innerHTML = tripJson.schDeparture;
            document.querySelector(".arrival_port").innerHTML = tripJson.schArrival;
            document.querySelector(".res_idx").innerHTML = resIdx;

        },
        error: function () {
            alert('reservation 오류가 발생했습니다. 예매 시작화면으로 돌아갑니다.');
            // location.href = "/user/ticket_reservation"
        }
    });

//결제 create
    let tbPayment = {
        transaction_time: new Date(),
        resultCode: "ok",
        description: "ok",
        data: {
            payAmount: tripJson["spanCost"],
            payUserid: tripJson["memUserid"],
            tbReservationResIdx: resIdx
        }
    }

    $.post({
        url: '/api/payment',
        data: JSON.stringify(tbPayment),
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        success: function (response) {
            console.log("===== payment response ====")
            console.log(response.data);
        },
        error: function () {
            alert('payment 오류가 발생했습니다. 예매 시작화면으로 돌아갑니다.');
            // location.href = "/user/ticket_reservation"
        }
    });

// 포인트 create

    let tbPoint = {
        transaction_time: new Date(),
        resultCode: "ok",
        description: "ok",
        data: {
            pntUserid: tripJson["memUserid"],
            pntContent: "항공권 결제 적립 포인트",
            pntAmount: tripJson.seatValue === "eco" ? tripJson.spanCost * schFlyDiscount * 0.01 : tripJson.spanCost * schBizLiteDiscount * 0.01,
            pntStatus: "SAVE",
            pntMemIdx: tripJson.memIdx
        }
    }

    $.post({
        url: '/api/point',
        data: JSON.stringify(tbPoint),
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        success: function (response) {
            console.log("===== point response ====")
            console.log(response.data);
        },
        error: function () {
            alert('point 오류가 발생했습니다. 예매 시작화면으로 돌아갑니다.');
            // location.href = "/user/ticket_reservation"
        }
    });

//    멤버 point update

    let tbMember = {
        transaction_time: new Date(),
        resultCode: "ok",
        description: "ok",
        data: {
            memIdx: tripJson.memIdx,
            memPoint: tripJson.seatValue === "eco" ? tripJson.spanCost * schFlyDiscount * 0.01 : tripJson.spanCost * schBizLiteDiscount * 0.01
        }
    }

    $.post({
        url: '/api/customer/save',
        method: "PUT",
        data: JSON.stringify(tbMember),
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        success: function (response) {
            console.log("===== member response ====")
            console.log(response.data);
        },
        error: function () {
            alert('member 오류가 발생했습니다. 예매 시작화면으로 돌아갑니다.');
            // location.href = "/user/ticket_reservation"
        }
    });
    console.log("-------schIdx------")
    console.log(Number(tripJson["schIdx"]))


//  passenger create

    for (let i = 0; i < tripJson.schPassengerNum; i++) {
        let tbPassenger = {
            transaction_time: new Date(),
            resultCode: "ok",
            description: "ok",
            data: {
                pasFirstname: passJson["passFirstName" + i],
                pasLastname: passJson["passLastName" + i],
                pasBirthDate: passJson["passYear" + i] + "-" + passJson["selMonth" + i] + "-" + passJson["selDate" + i],
                pasSeat: passJson["pasSeat" + i],
                tbFlightScheduleSchIdx: Number(tripJson["schIdx"]),
                tbReservationResIdx: resIdx,
                tbAirlineFoodFoodIdx: passJson["pasMealIdx" + i],
                tbBaggageBagIdx: passJson["pasBagIdx" + i]
            }
        }

        $.post({
            url: '/api/passenger',
            data: JSON.stringify(tbPassenger),
            dataType: 'json',
            contentType: 'application/json',
            async: false,
            success: function (response) {
                console.log("===== passenger" + i + " response ====")
                console.log(response.data);
            },
            error: function () {
                alert('passenger 오류가 발생했습니다. 예매 시작화면으로 돌아갑니다.');
                // location.href = "/user/ticket_reservation"
            }
        });
    }

}if(tripJson2.resRoute === "ROUNDBACK"){                  //왕복 결제 로직

    document.querySelector(".roundback_hidden").style.display = "block";

    $.get({
        url: '/api/flight_schedule/' + tripJson2["schIdx"],
        dataType: "json",
        contentType: 'application/json',
        async: false,
        success: function (response) {
            console.log(response.data)
            schFlyDiscount2 = response.data.schFlyDiscount;
            schBizLiteDiscount2 = response.data.schBizLiteDiscount;
            acftIdx2 = response.data.tbAircraftAcftIdx;
        }
    })

    let tbReservation2 = {
        transaction_time: new Date(),
        resultCode: "ok",
        description: "ok",
        data: {
            resRoute: tripJson2.resRoute,
            tbMemberMemIdx: tripJson2["memIdx"],
            tbFlightScheduleSchIdx: tripJson2["schIdx"]
        }
    }

    $.post({
        url: '/api/reservation',
        data: JSON.stringify(tbReservation2),
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        success: function (response) {
            console.log("===== reservation response2 ====")
            console.log(response.data);
            resIdx2 = response.data.resIdx;

            document.querySelectorAll(".departure_port")[1].innerHTML = tripJson2.schDeparture;
            document.querySelectorAll(".arrival_port")[1].innerHTML = tripJson2.schArrival;
            document.querySelectorAll(".res_idx")[1].innerHTML = resIdx2;
        },
        error: function () {
            alert('reservation 오류가 발생했습니다. 예매 시작화면으로 돌아갑니다.');
            // location.href = "/user/ticket_reservation"
        }
    });


//결제 create
    let tbPayment2 = {
        transaction_time: new Date(),
        resultCode: "ok",
        description: "ok",
        data: {
            payAmount: tripJson2["spanCost"],
            payUserid: tripJson2["memUserid"],
            tbReservationResIdx: resIdx2
        }
    }

    $.post({
        url: '/api/payment',
        data: JSON.stringify(tbPayment2),
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        success: function (response) {
            console.log("===== payment response2 ====")
            console.log(response.data);
        },
        error: function () {
            alert('payment 오류가 발생했습니다. 예매 시작화면으로 돌아갑니다.');
            // location.href = "/user/ticket_reservation"
        }
    });

// 포인트 create

    let tbPoint2 = {
        transaction_time: new Date(),
        resultCode: "ok",
        description: "ok",
        data: {
            pntUserid: tripJson2["memUserid"],
            pntContent: "항공권 결제 적립 포인트",
            pntAmount: tripJson2.seatValue === "eco" ? tripJson2.spanCost * schFlyDiscount2 * 0.01 : tripJson2.spanCost * schBizLiteDiscount2 * 0.01,
            pntStatus: "SAVE",
            pntMemIdx: tripJson2.memIdx
        }
    }

    $.post({
        url: '/api/point',
        data: JSON.stringify(tbPoint2),
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        success: function (response) {
            console.log("===== point response2 ====")
            console.log(response.data);
        },
        error: function () {
            alert('point 오류가 발생했습니다. 예매 시작화면으로 돌아갑니다.');
            // location.href = "/user/ticket_reservation"
        }
    });

//    멤버 point update

    let tbMember2 = {
        transaction_time: new Date(),
        resultCode: "ok",
        description: "ok",
        data: {
            memIdx: tripJson2.memIdx,
            memPoint: tripJson2.seatValue === "eco" ? tripJson2.spanCost * schFlyDiscount2 * 0.01 : tripJson2.spanCost * schBizLiteDiscount2 * 0.01
        }
    }

    $.post({
        url: '/api/customer/save',
        method: "PUT",
        data: JSON.stringify(tbMember2),
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        success: function (response) {
            console.log("===== member response2 ====")
            console.log(response.data);
        },
        error: function () {
            alert('member 오류가 발생했습니다. 예매 시작화면으로 돌아갑니다.');
            // location.href = "/user/ticket_reservation"
        }
    });
    console.log("-------schIdx------")
    console.log(Number(tripJson2["schIdx"]))


//  passenger create

    for (let i = 0; i < tripJson2.schPassengerNum; i++) {
        let tbPassenger2 = {
            transaction_time: new Date(),
            resultCode: "ok",
            description: "ok",
            data: {
                pasFirstname: passJson2["passFirstName" + i],
                pasLastname: passJson2["passLastName" + i],
                pasBirthDate: passJson2["passYear" + i] + "-" + passJson2["selMonth" + i] + "-" + passJson2["selDate" + i],
                pasSeat: passJson2["pasSeat" + i],
                tbFlightScheduleSchIdx: Number(tripJson2["schIdx"]),
                tbReservationResIdx: resIdx2,
                tbAirlineFoodFoodIdx: passJson2["pasMealIdx" + i],
                tbBaggageBagIdx: passJson2["pasBagIdx" + i]
            }
        }

        $.post({
            url: '/api/passenger',
            data: JSON.stringify(tbPassenger2),
            dataType: 'json',
            contentType: 'application/json',
            async: false,
            success: function (response) {
                console.log("===== passenger" + i + " response2 ====")
                console.log(response.data);
            },
            error: function () {
                alert('passenger 오류가 발생했습니다. 예매 시작화면으로 돌아갑니다.');
                // location.href = "/user/ticket_reservation"
            }
        });


    }

}

$(document).on('click', '#btnHome', function () {
    location.href="/user";
})

$(document).on('click', '#btnList', function () {
    location.href="/user/viewReservationList";
})