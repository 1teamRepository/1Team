$(function(){

    let category = document.getElementById("category").getAttribute("value");
    $(document).on('click', '#sendit', function(){

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
                ansIdx: $('#ansIdx').val(),
                ansInquiryTitle: $('#ansInquiryTitle').val(),
                ansInquiryContent: $('#ansInquiryContent').val(),
                ansUserid: $('#ansUserid').val(),
                ansAnswerCheck: $('#ansAnswerCheck').val(),
                ansAnswerContent: $('#ansAnswerContent').val(),
                ansInquiryRegDate: $('#ansInquiryRegDate').val()
            }
        }

        $.ajax({
            url: '/api/'+category,
            type: "PUT",
            data: JSON.stringify(jsonData),
            dataType: 'json',
            contentType: 'application/json',
            success: function(){
                alert('답변 등록 성공!');
                location.href='/admin/inquiry/list';
            },
            error: function(){
                alert('답변 등록 실패!');
                location.reload();
            }
        });

    });
});
