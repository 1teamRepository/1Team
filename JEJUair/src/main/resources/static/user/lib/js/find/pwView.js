$(function () {
    let userEmail;
    let memIdx;
    let category = document.getElementById("category").getAttribute("value");
    let arrEmail = [];
    let arrIdx = [];

    readView();

    function readView() {
        for (let i = 0; i < 100; i++) {
            $.get("/api/" + category + "/" +i, function (response) {
                userEmail = response.data;
                memIdx = response.data;
                let getEmail = `${userEmail.memEmail}`
                let getMemIdx = `${userEmail.memIdx}`
                arrEmail.push(getEmail)
                arrIdx.push(getMemIdx)
            });
        }
    }

    //이메일 찾기
    let nextAction = document.getElementById("nextAction");
    nextAction.onclick = function findEmail() {
        let inputEmail = document.getElementById("email").value;
        let findEmail = arrEmail.find(v => v == inputEmail)
        let errorArea = document.getElementById("input__error")

        let findEmailIdx = arrEmail.indexOf(findEmail)
        let findIdx = arrIdx[findEmailIdx]

        //session에 저장
        localStorage.setItem("sendData", findIdx)


        if (inputEmail == findEmail) {
            errorArea.innerHTML = ""
            location.href = '/user/findUserInfoList'
        } else {
            errorArea.innerHTML = "입력하신 정보의 계정을 찾을 수 없어요. <br>다시 입력해주세요."
        }


    }



    //버튼 색상 변경
    $('.input__text').on('input', btnChange);

    function btnChange() {

        let inputEmail = $('.input__text').val();
        let button = $('.button--primary');

        if (inputEmail === '') {
            button.removeClass('button--active');
        } else {
            button.addClass('button--active');
        }
    }

})
