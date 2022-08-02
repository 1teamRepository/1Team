$(function(){
    $(document).on('click', '#sendit', function(){
        let category = document.getElementById("category").getAttribute("value");

        if(!$('#memUserpw').val()) {
            alert('비밀번호를 입력하세요');
            $('#memUserpw').focus();
            return false;
        }

        if(!$('#memEngLastname').val()){
            alert('성(영문)을 입력하세요');
            $('#memEngLastname').focus();
            return false;
        }

        if(!$('#memEngFirstname').val()){
            alert('이름(영문)을 입력하세요');
            $('#memEngFirstname').focus();
            return false;
        }

        if(!$('#memEngLastname').val()){
            alert('이름을 입력하세요');
            $('#memEngLastname').focus();
            return false;
        }
        if(!$('#memEmail').val()){
            alert('이메일을 입력하세요');
            $('#memEmail').focus();
            return false;
        }
        if(!$('#memHp').val()){
            alert('연락처를 입력하세요');
            $('#memHp').focus();
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
