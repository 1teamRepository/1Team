$(function () {
    //회원등록 정규식
    const expUserid = RegExp(/[a-zA-Z0-9]/);
    const expUserpw = RegExp(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/);
    const expSsn = RegExp(/^\d{6}$/);
    const expKoLastname = RegExp(/[가-힣]/);
    const expKoFirstname = RegExp(/[가-힣]/);
    const expEngLastname = RegExp(/[A-Za-z]/);
    const expEngFirstname = RegExp(/[A-Za-z]/);
    const expHp = RegExp(/^\d{3}\d{3,4}\d{4}$/);
    const expEmail = RegExp(/^[A-Za-z0-9\-\.]+@[A-Za-z0-9\-\.]+\.[A-Za-z0-9]+$/);

    $(document).on('keydown', '#memUserid', function (){
        $('#memUserid').attr("check_result","fail");
    })

    $(document).on('click', '#idCheck', function () {

        let memUserid = $('#memUserid').val();
        console.log(memUserid)


        if(memUserid.value == ''){
            alert('아이디를 입력하세요')
            memUserid.focus();
            return false;
        }
        if(!expUserid.test(memUserid.value)){
            alert('아이디를 다시 확인해주세요');
            memUserid.focus();
            return false;
        }

        $.ajax({
            url: '/api/customer/userIdCheck',
            type: 'post',
            data: {memUserid : memUserid},
            success:function(cnt){
                console.log("중복검사 진행");
                if(cnt == 0){
                    $('#memUserid').attr("check_result","success");
                    $('#txtIdChk1').hide();
                    $('#txtIdChk2').show(); //사용가능한 아이디입니다.
                }else if (cnt == 2){
                    alert('아이디를 입력하세요')
                    memUserid.focus();
                    return false;
                    $('#txtIdChk1').hide();
                    $('#txtIdChk2').hide(); //사용가능한 아이디입니다.
                }
                else{
                    $('#memUserid').attr("check_result","fail");
                    $('#txtIdChk2').hide();
                    $('#txtIdChk1').show(); //이미 사용 중인 아이디입니다.
                    return false;
                }
            },
            error:function(){
                console.log("검사실패");
                alert("중복된 아이디이거나 형식이 맞지 않습니다. 다시 입력해주세요.");
            }
        });

        if(memUserid.value == ''){
            alert('아이디를 입력하세요')
            memUserid.focus();
            return false;
        }
    });

    $(document).on('click', '#sendit', function (){
        const memUserid = document.getElementById('memUserid');
        const memGender = document.getElementById('memGender');
        const memUserpw = document.getElementById('memUserpw');
        const memUserpwCheck = document.getElementById('memUserpwCheck');
        const memSsn = document.getElementById('memSsn');
        const memEmail = document.getElementById('memEmail');
        const memKoLastname = document.getElementById('memKoLastname');
        const memKoFirstname = document.getElementById('memKoFirstname');
        const memEngLastname = document.getElementById('memEngLastname');
        const memEngFirstname = document.getElementById('memEngFirstname');
        const memHp = document.getElementById('memHp');

        if(memUserid.value == ''){
            alert('아이디를 입력하세요')
            memUserid.focus();
            return false;
        }

        if($('#memUserid').attr("check_result") == "fail"){
            alert('아이디 중복확인을 해주세요');
            memUserid.focus();
            return false;
        }

        if(memUserpw.value == ''){
            alert('비밀번호를 입력하세요')
            memUserpw.focus();
            return false;
        }
        if(!expUserpw.test(memUserpw.value)){
            alert('비밀번호는 문자, 숫자, 특수문자의 조합으로 8자리 이상 입력해주세요');
            memUserpw.focus();
            return false;
        }
        if(memUserpw.value != memUserpwCheck.value){
            alert('비밀번호가 맞지 않습니다. 다시 확인해주세요');
            memUserpwCheck.focus();
            return false;
        }


        if(!expSsn.test(memSsn.value)){
            alert('생년월일을 다시 확인해주세요');
            memSsn.focus();
            return false;
        }


        if($('#memGender option:selected').val()=='NULL'){
            alert("성별을 선택해주세요");
            memGender.focus();
            return false;
        }


        if(memEmail.value == ''){
            alert('이메일을 입력하세요')
            memEmail.focus();
            return false;
        }

        if(!expEmail.test(memEmail.value)){
            alert('이메일을 다시 확인해주세요');
            memEmail.focus();
            return false;
        }

        if(memHp.value == ''){
            alert('연락처를 입력하세요')
            memHp.focus();
            return false;
        }
        if(!expHp.test(memHp.value)){
            alert('연락처를 다시 확인해주세요');
            memHp.focus();
            return false;
        }

        if(memKoLastname.value == ''){
            alert('성(한글)을 입력하세요')
            memKoLastname.focus();
            return false;
        }
        if(!expKoLastname.test(memKoLastname.value)){
            alert('성(한글)을 다시 확인해주세요');
            memKoLastname.focus();
            return false
        }

        if(memKoFirstname.value == ''){
            alert('이름(한글)을 입력하세요')
            memKoFirstname.focus();
            return false;
        }
        if(!expKoFirstname.test(memKoFirstname.value)){
            alert('이름(한글)을 다시 확인해주세요');
            memKoFirstname.focus();
            return false
        }


        if(memEngLastname.value == ''){
            alert('성(영문)을 입력하세요')
            memEngLastname.focus();
            return false;
        }
        if(!expEngLastname.test(memEngLastname.value)){
            alert('성(영문)을 다시 확인해주세요');
            memEngLastname.focus();
            return false
        }


        if(memEngFirstname.value == ''){
            alert('이름(영문)을 입력하세요')
            memEngFirstname.focus();
            return false;
        }
        if(!expEngFirstname.test(memEngFirstname.value)){
            alert('이름(영문)을 다시 확인해주세요');
            memEngFirstname.focus();
            return false
        }

        let element = document.getElementsByClassName("button--primary")[0];
        element.classList.add("button--active");



        let jsonData = {
            transaction_time: new Date(),
            resultCode: "ok",
            description: "ok",
            data: {
                memUserid: $('#memUserid').val(),
                memUserpw: $('#memUserpw').val(),
                memSsn: $('#memSsn').val(),
                memEmail: $('#memEmail').val(),
                memHp: $('#memHp').val(),
                memKoLastname: $('#memKoLastname').val(),
                memKoFirstname: $('#memKoFirstname').val(),
                memEngLastname: $('#memEngLastname').val(),
                memEngFirstname: $('#memEngFirstname').val(),
                memGender: $('#memGender option:selected').val()
            }
        }

        $.post({
            url: '/api/customer',
            data: JSON.stringify(jsonData),
            dataType: 'json',
            contentType: 'application/json',
            success: function () {
                alert('등록되었습니다.');
                location.href = "/user";
            },
            error: function () {
                alert('등록실패 (확인요망)');
                location.reload();
            }

        });
    });
});