$(function(){
    let category = document.getElementById("category").getAttribute("value");
    $(document).on('click', '#sendit', function(){
        if(!$('#admAdminId').val()){
            alert('아이디를 입력하세요');
            $('#admAdminId').focus();
            return false;
        }

        if(!$('#admAdminPw').val()) {
            alert('비밀번호를 입력하세요');
            $('#admAdminPw').focus();
            return false;
        }

        if(!$('#admKorName').val()){
            alert('이름을 입력하세요');
            $('#admKorName').focus();
            return false;
        }

        if(!$('#admEngName').val()){
            alert('이름을 입력하세요');
            $('#admEngName').focus();
            return false;
        }

        if(!$('#admEmployee').val()){
            alert('사번을 입력하세요');
            $('#admEmployee').focus();
            return false;
        }
        if(!$('#admAdminHp').val()){
            alert('휴대전화번호를 입력하세요');
            $('#admAdminHp').focus();
            return false;
        }
        if(!$('#admDeparture').val()){
            alert('직무를 입력하세요');
            $('#admDeparture').focus();
            return false;
        }
        if(!$('#admEmail').val()){
            alert('이메일을 입력하세요');
            $('#admEmail').focus();
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
                admAdminId: $('#admAdminId').val(),
                admAdminPw: $('#admAdminPw').val(),
                admEmployee: $('#admEmployee').val(),
                admAdminHp: $('#admAdminHp').val(),
                admDeparture: $('#admDeparture').val(),
                admKorName: $('#admKorName').val(),
                admEngName: $('#admEngName').val(),
                admEmail: $('#admEmail').val()
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
