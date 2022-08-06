$(function(){
    let category = document.getElementById("category").getAttribute("value");
    $(document).on('click', '#sendit', function(){

        if(!$('#acftAircraftName').val()){
            alert('항공기명을 선택해주세요');
            $('#acftAircraftName').focus();
            return false;
        }

        if(!$('#acftIdx').val()){
            alert('항공기번호를 선택해주세요');
            $('#acftIdx').focus();
            return false;
        }

        if(!$('#departure').val()){
            alert('출발지를 선택해주세요');
            $('#departure').focus();
            return false;
        }

        if(!$('#arrival').val()) {
            alert('도착지를 선택해주세요');
            $('#arrival').focus();
            return false;
        }

        if(!$('#schDepartureDate').val()){
            alert('출발일을 입력해주세요');
            $('#schDepartureDate').focus();
            return false;
        }

        if(!$('#schArrivalDate').val()){
            alert('도착일을 입력해주세요');
            $('#schArrivalDate').focus();
            return false;
        }

        if(!$('#schDepartureTime').val()){
            alert('출발시간를 입력해주세요');
            $('#schDepartureTime').focus();
            return false;
        }
        if(!$('#schArrivalTime').val()){
            alert('도착시간를 입력해주세요');
            $('#schArrivalTime').focus();
            return false;
        }
        if(!$('#schBizLitePrice').val()){
            alert('Biz-Lite 좌석의 가격을 입력해주세요');
            $('#schBizLitePrice').focus();
            return false;
        }
        if(!$('#schBizLiteDiscount').val()){
            alert('Biz-Lite 좌석의 적립율을 입력해주세요');
            $('#schBizLiteDiscount').focus();
            return false;
        }
        if(!$('#schFlyPrice').val()){
            alert('Fly 좌석의 가격을 입력해주세요');
            $('#schFlyPrice').focus();
            return false;
        }
        if(!$('#schFlyDiscount').val()){
            alert('Fly 좌석의 적립율을 입력해주세요');
            $('#schFlyDiscount').focus();
            return false;
        }

        /*
                    {
                        "transaction_time":"2022-07-12",
                        "resultCode":"ok",
                        "description":"ok",
                        "data":{
                            "userid":"ryu",
                            "userpw":"1111",
                            "name":"류"
                        }
                    }
         */
        let aircraft = document.getElementById("acftAircraftName");
        let aircraftName = aircraft.options[aircraft.selectedIndex].value;
        console.log(aircraftName)

        let aircraftIdx = document.getElementById("acftIdx");
        let acftIdx = aircraftIdx.options[aircraftIdx.selectedIndex].value;

        let departure = document.getElementById("departure");
        let departureName = departure.options[departure.selectedIndex].value;

        let arrival = document.getElementById("arrival");
        let arrivalName = arrival.options[arrival.selectedIndex].value;

        let jsonData = {
            transaction_time: new Date(),
            resultCode:"ok",
            description:"ok",
            data:{
                schDomesticOverseas: $('#schDomesticOverseas').val(),
                schAircraftName: aircraftName,
                tbAircraftAcftIdx: acftIdx,
                schDeparture: departureName,
                schArrival: arrivalName,
                schDepartureDate: $('#schDepartureDate').val(),
                schArrivalDate: $('#schArrivalDate').val(),
                schDepartureTime: $('#schDepartureTime').val(),
                schArrivalTime: $('#schArrivalTime').val(),
                schBizLitePrice: $('#schBizLitePrice').val(),
                schBizLiteDiscount: $('#schBizLiteDiscount').val(),
                schFlyPrice: $('#schFlyPrice').val(),
                schFlyDiscount: $('#schFlyDiscount').val(),
                schFood: $('#schFood').val()
            }
        }
        console.log(jsonData);
        $.post({
            url: '/api/'+category,
            data: JSON.stringify(jsonData),
            dataType: 'json',
            contentType: 'application/json',
            success: function(){
                alert('등록성공!');
                location.href='/admin/'+category+'/list';
            },
            error: function(){
                alert('등록실패!');
                location.reload();
            }
        });
    });
});