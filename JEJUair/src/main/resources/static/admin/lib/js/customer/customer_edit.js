$(function(){
    $(document).on('click', '#sendit', function(){
        let category = document.getElementById("category").getAttribute("value");



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
        console.log("들어옴")
        let jsonData = {
            transaction_time: new Date(),
            resultCode:"ok",
            description:"ok",
            data:{
                memIdx: $('#memIdx').val(),
                memUserid: $('#memUserid').val(),
                memUserpw: $('#memUserpw').val(),
                memKoLastname: $('#memKoLastname').val(),
                memKoFirstname: $('#memKoFirstname').val(),
                memEngLastname: $('#memEngLastname').val(),
                memEngFirstname: $('#memEngFirstname').val(),
                memGender: $('#memGender').val(),
                memEmail: $('#memEmail').val(),
                memSsn: $('#memSsn').val(),
                memHp: $('#memHp').val(),
                memPoint: $('#memPoint').val()

            }
        }
        debugger
        console.log($('#memIdx').val())
        console.log(jsonData);

        $.ajax({
            url: '/api/'+category,
            type: "PUT",
            data: JSON.stringify(jsonData),
            dataType: 'json',
            contentType: 'application/json',
            success: function(){
                alert('수정성공!');
                location.href='/admin/'+category+'/list';
            },
            error: function(){
                alert('수정실패!');
                location.reload();
            }
        });
    });
});
