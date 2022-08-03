$('.input__text').on('input', checkInput);


// input 입력 시에 checkInput 함수실행
function checkInput() {
    //let idCheck = $('.id_input').val();   // idCheck 변수
    let inputPassword = $('.input__text').val();   // idCheck 변수
    let button = $('.button--primary');

    if (inputPassword === '') {
        // 기본 로그인 버튼 색상
        button.removeClass('button--active');
    } else {
        // ID 비밀번호 입력 시에 로그인 버튼 배경색 변경
        button.addClass('button--active');
    }
}