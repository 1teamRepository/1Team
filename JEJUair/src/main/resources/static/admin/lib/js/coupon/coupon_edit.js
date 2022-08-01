$(function(){
    $(document).on('click', '#sendit', function(){
        let category = document.getElementById("category").getAttribute("value");
        if(!$('#copCode').val()){
            alert('쿠폰코드를 입력하세요');
            $('#copCode').focus();
            return false;
        }

        if(!$('#copName').val()) {
            alert('쿠폰명을 입력하세요');
            $('#copName').focus();
            return false;
        }

        if(!$('#copStartDate').val()){
            alert('시작일자를 입력하세요');
            $('#copStartDate').focus();
            return false;
        }

        if(!$('#copEndDate').val()){
            alert('종료일자를 입력하세요');
            $('#copEndDate').focus();
            return false;
        }

        if(!$('#copSale').val()){
            alert('할인금액/할인율 입력하세요');
            $('#copSale').focus();
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
                copIdx: $('#copIdx').val(),
                copCode: $('#copCode').val(),
                copName: $('#copName').val(),
                copStartDate: $('#copStartDate').val(),
                copType: "MONEY",
                copEndDate: $('#copEndDate').val(),
                copSale: $('#copSale').val()
            }
        }

        $.ajax({
            url: '/api/'+category,
            type: "PUT",
            data: JSON.stringify(jsonData),
            dataType: 'json',
            contentType: 'application/json',
            success: function(){
                alert('수정성공!');
                location.href='/admin/coupon/list';
            },
            error: function(){
                alert('수정실패!');
                location.reload();
            }
        });
    });
});
