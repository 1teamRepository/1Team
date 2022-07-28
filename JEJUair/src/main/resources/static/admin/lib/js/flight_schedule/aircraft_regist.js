$(function(){
    let category = document.getElementById("category").getAttribute("value");
    $(document).on('click', '#sendit', function(){
        if(!$('#acftBizLiteSeats').val()){
            alert('BIZ-LITE Clas 수용 좌석 을 입력해주세요');
            $('#acftBizLiteSeats').focus();
            return false;
        }

        if(!$('#acftNomalSeats').val()) {
            alert('일반석 수용 좌석을 입력해주세요');
            $('#acftNomalSeats').focus();
            return false;
        }

        if(!$('#acftTotalSeats').val()){
            alert('총 수용 좌석을 입력해주세요');
            $('#acftTotalSeats').focus();
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

        let jsonData = {
            transaction_time: new Date(),
            resultCode:"ok",
            description:"ok",
            data:{
                acftAircraftType: $('#acftAircraftType').val(),
                acftAircraftName: $('#acftAircraftName').val(),
                acftDomesticOverseas: $('#acftDomesticOverseas').val(),
                acftBizLiteSeats: $('#acftBizLiteSeats').val(),
                acftNomalSeats: $('#acftNomalSeats').val(),
                acftTotalSeats: $('#acftTotalSeats').val(),

            }
        }

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
