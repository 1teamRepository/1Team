$(function () {

    let nextAction = document.getElementById("nextAction");

    //버튼 색상 변경
    $('.input__text').on('input', btnChange);
    function btnChange() {

        let inputEmail = $('.input__text').val();
        console.log(inputEmail)
        let button = $('.button--primary');

        if (inputEmail === '') {
            button.removeClass('button--active');
        } else {
            button.addClass('button--active');
        }
    }

    nextAction.onclick = function (){
        let inputEmail = $('.input__text').val();

        $.ajax({
            url: "/api/customer/emailCheck",
            type: "POST",
            data: {
                memEmail : inputEmail
            },
            success: function (cnt){
                console.log("중복검사 진행");
                if(cnt == 0){

                    $('#input__error').hide();
                    $('#input__error').show(); //있는 이메일입니다.
                    return false;
                }else if (cnt == 1){

                    $('#input__error').hide();
                    $('#input__error').hide(); //있는 이메일입니다.

                    $.ajax({
                        url: "/user/emailOk",
                        type: "POST",
                        data: {
                            memEmail : inputEmail
                        },
                        success: function () {
                            console.log("두번째 ajax 정상")
                            location.href="/user/findUserInfoList"
                        },
                        error: function (){
                            console.log("두번째 ajax 비정상")
                        }
                    })


                }else if (cnt == 2){
                    alert('이메일을 입력하세요')
                    inputEmail.focus();
                    return false;
                    $('#input__error').hide();
                    $('#input__error').show(); //있는 이메일입니다.
                }

            },
            error:function(){
                console.log("검사실패");
                alert("중복된 아이디이거나 형식이 맞지 않습니다. 다시 입력해주세요.");
            }
        });
    }

})
