$('.input__text').on('input', checkInput);
$('.input__text_new').on('input', checkInput);


// input 입력 시에 checkInput 함수실행
function checkInput() {
    //let idCheck = $('.id_input').val();   // idCheck 변수
    let inputText = $('.input__text').val();
    let inputTextNew = $('.input__text_new').val();
    let button = $('.button--primary');

    if (inputText === '' || inputTextNew === '') {
        // 기본 로그인 버튼 색상
        button.removeClass('button--active');
    } else {
        // ID 비밀번호 입력 시에 로그인 버튼 배경색 변경
        button.addClass('button--active');
    }
}



$(function(){
    const expEngLastname = RegExp(/[A-Za-z]/);
    const expEngFirstname = RegExp(/[A-Za-z]/);

    $(document).on('click', '#btnChangeName', function (){
        const memEngLastname = document.getElementById('memEngLastname');
        const memEngFirstname = document.getElementById('memEngFirstname');

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
    });

});



