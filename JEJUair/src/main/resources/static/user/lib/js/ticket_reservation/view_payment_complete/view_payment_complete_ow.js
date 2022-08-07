console.log("================jsonparse=============")

const passJson = JSON.parse(localStorage.getItem("passJson"))
console.log("passJson");
console.log(passJson);
const tripJson = JSON.parse(localStorage.getItem("tripJson"))
console.log("tripJson");
console.log(tripJson);
let resIdx = 0;
let acftIdx = 0;
console.log("================jsonparse=============")

let schFlyDiscount = 0;
let schBizLiteDiscount = 0;


$.get({
    url: '/api/flight_schedule/'+tripJson["schIdx"],
    dataType : "json",
    contentType: 'application/json',
    async: false,
    success: function(response){
        console.log(response)
        console.log(response.data)
        schFlyDiscount = response.data.schFlyDiscount;
        schBizLiteDiscount = response.data.schBizLiteDiscount;
        acftIdx = response.data.tbAircraftAcftIdx;
    }
})
console.log("schFlyDiscount : "+schFlyDiscount);
console.log("schBizLiteDiscount : "+schBizLiteDiscount);

//예약 create
let tbReservation = {
    transaction_time: new Date(),
    resultCode:"ok",
    description:"ok",
    data:{
        resRoute: "ONEWAY",
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
    success: function(response){
        console.log("===== reservation response ====")
        console.log(response);
        console.log(response.data.resIdx);
        resIdx = response.data.resIdx;
    },
    error: function(){
        alert('오류가 발생했습니다. 예매 시작화면으로 돌아갑니다.');
        location.href = "/user/ticket_reservation"
    }
});

//결제 create
let tbPayment = {
    transaction_time: new Date(),
    resultCode:"ok",
    description:"ok",
    data:{
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
    success: function(response){
        console.log("===== payment response ====")
        console.log(response.data);
    },
    error: function(){
        alert('오류가 발생했습니다. 예매 시작화면으로 돌아갑니다.');
        location.href = "/user/ticket_reservation"
    }
});

// 포인트 create

let tbPoint = {
    transaction_time: new Date(),
    resultCode:"ok",
    description:"ok",
    data:{
        pntUserid: tripJson["memUserid"],
        pntContent: "항공권 결제 적립 포인트",
        pntAmount: tripJson.seatValue === "eco" ? tripJson.spanCost * schFlyDiscount *0.01 : tripJson.spanCost * schBizLiteDiscount *0.01,
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
    success: function(response){
        console.log("===== point response ====")
        console.log(response.data);
    },
    error: function(){
        alert('오류가 발생했습니다. 예매 시작화면으로 돌아갑니다.');
        // location.href = "/user/ticket_reservation"
    }
});

//    멤버 point update

let tbMember = {
    transaction_time: new Date(),
    resultCode:"ok",
    description:"ok",
    data:{
        memIdx: tripJson.memIdx,
        memPoint: tripJson.seatValue === "eco" ? tripJson.spanCost * schFlyDiscount *0.01 : tripJson.spanCost * schBizLiteDiscount *0.01
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


//  passenger create

for (let i = 0; i < tripJson.schPassengerNum; i++) {
    let tbPassenger = {
        transaction_time: new Date(),
        resultCode:"ok",
        description:"ok",
        data:{
            pasFirstname: passJson["passFirstName"+i],
            pasLastname: passJson["passLastName"+i],
            pasBirthDate: passJson["passYear"+i]+"-"+passJson["selMonth"+i]+"-"+passJson["selDate"+i],
            pasSeat: passJson["pasSeat"+i],
            tbAircraftAcftIdx:acftIdx,
            tbReservationResIdx: resIdx,
            tbAirlineFoodFoodIdx: 46,
            tbBaggageBagIdx: passJson["pasIdx"+i]
        }
    }

    $.post({
        url: '/api/passenger',
        data: JSON.stringify(tbPassenger),
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        success: function(response){
            console.log("===== passenger"+i+" response ====")
            console.log(response.data);
        },
        error: function(){
            alert('오류가 발생했습니다. 예매 시작화면으로 돌아갑니다.');
            // location.href = "/user/ticket_reservation"
        }
    });


}

