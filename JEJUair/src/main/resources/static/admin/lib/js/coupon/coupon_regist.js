$(function(){
    let category = document.getElementById("category").getAttribute("value");
    $(document).on('click', '#sendit', function(){
        if(!$('#copCode').val()){
            alert('쿠폰코드를 입력하세요');
            $('#copCode').focus();
            return false;
        }

        if(!$('#copName').val()){
            alert('쿠폰명을 입력하세요');
            $('#copName').focus();
            return false;
        }

        if(!$('#copStartDate').val()) {
            alert('시작일자를 입력하세요');
            $('#copStartDate').focus();
            console.log($('#copStartDate').val().add("T00:00:00"))
        }


        if(!$('#copEndDate').val()){
            alert('종료일자 입력하세요');
            $('#coupon_type').focus();
            return false;
        }

        if(!$('#copSale').val()){
            alert('할인금액을 입력하세요');
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

        let couponType = document.getElementById("copType");
        let selectedcopType = couponType.options[couponType.selectedIndex].value;

        let jsonData = {
            transaction_time: new Date(),
            resultCode:"ok",
            description:"ok",
            data:{
                copCode: $('#copCode').val(),
                copName: $('#copName').val(),
                copStartDate: $('#copStartDate').val(),
                copType: selectedcopType,
                copEndDate: $('#copEndDate').val(),
                copSale: $('#copSale').val()
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
