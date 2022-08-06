$('.input__text').on('input', checkInput);
$('.new_password').on('input', checkInput);
$('.new_password_again').on('input', checkInput);


// input 입력 시에 checkInput 함수실행
function checkInput() {
    //let idCheck = $('.id_input').val();   // idCheck 변수
    let inputPassword = $('.input__text').val();
    let inputNewPassword = $('.new_password').val();
    let inputNewPasswordAgain = $('.new_password_again').val();// idCheck 변수
    let button = $('.button--primary');

    if (inputPassword === '' || inputNewPassword === '' || inputNewPasswordAgain === '') {
        // 기본 로그인 버튼 색상
        button.removeClass('button--active');
    } else {
        // ID 비밀번호 입력 시에 로그인 버튼 배경색 변경
        button.addClass('button--active');
    }
}


    $(function(){
        $("input").keyup(function(){
            let pwd1=$('.new_password').val();
            let pwd2=$('.new_password_again').val();
            if(pwd1 != "" || pwd2 != ""){
                if(pwd1 == pwd2){
                    $('.input__error').css('display', 'none');
                }else{
                    $('.input__error').css('display', 'block');

                }
            }
        });
    });



$(function(){
    $(document).on('click', '#btnChangePw', function(){

        if(!$('#memUserpw').val()){
            alert('현재 비밀번호를 입력하세요');
            $('#memUserpw').focus();
            return false;
        }

        if(!$('#newmemUserpw').val()) {
            alert('새로운 비밀번호를 입력하세요');
            $('#newmemUserpw').focus();
            return false;
        }

        if(!$('#againmemUserpw').val()){
            alert('비밀번호 재확인을 입력하세요');
            $('#againmemUserpw').focus();
            return false;
        }

        if(!$('#againmemUserpw').val() == $('#newmemUserpw').val){
            alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요');
            $('#againmemUserpw').focus();
            return false;
        }


    });
});
