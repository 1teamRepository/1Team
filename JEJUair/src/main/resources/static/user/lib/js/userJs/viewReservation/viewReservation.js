$(function () {

    let itemList = new Vue({
        el: '#itemList', data: {
            itemList: {}
        }
    });

    let category = document.getElementById("category").getAttribute("value");
    let str = $(location).attr('href').split('/').reverse();
    let passengerNum = 0;


    readView(str[0]);

    function readView(index) {

        $.get("/api/" + category + "/" + index, function (response) {
            itemList.itemList = response.data;
            console.log("resIdx : " + str[0]);

            $.get({
                url: '/api/passenger/' + str[0] + '/passengerInfo',
                dataType: "json",
                contentType: 'application/json',
                async: false,
                success: function (response) {
                    console.log(response.data);
                    passengerNum = response.data.length;
                    let seatGrade = response.data[0].pasSeat.substring(0, 3) === "BIZ" ? 10000 : 5000;
                    let fare = response.data[0].pasSeat.substring(0, 3) === "BIZ"
                        ? response.data[0].schBizLitePrice * passengerNum : response.data[0].schFlyPrice * passengerNum;
                    let fuelPrice = 22000 * passengerNum;
                    let taxPrice = 4000 * passengerNum;
                    let baggagePrice = 0;
                    let foodPrice = 0;

                    document.querySelector(".passenger_num").innerHTML = passengerNum;
                    document.querySelector(".divFare").innerHTML = fare.toLocaleString();
                    document.querySelector(".divFuel").innerHTML = fuelPrice.toLocaleString();
                    document.querySelector(".divTax").innerHTML = taxPrice.toLocaleString();
                    document.querySelector(".divSeat").innerHTML = (seatGrade * passengerNum).toLocaleString();

                    for (let i = 0; i < passengerNum; i++) {
                        baggagePrice += response.data[i].bagPrice;
                        foodPrice += response.data[i].foodKrwPrice;
                    }
                    document.querySelector(".divBaggageFee").innerHTML = baggagePrice.toLocaleString();
                    document.querySelector(".divFood").innerHTML = foodPrice.toLocaleString();

                    document.querySelector(".spanCost").innerHTML = (fare+fuelPrice+taxPrice+(seatGrade * passengerNum)+baggagePrice+foodPrice).toLocaleString();

                }
            })

        });
    }



});
