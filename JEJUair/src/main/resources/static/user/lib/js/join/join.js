// var app = require('http').createServer(handler),fs = require('fs');
// const io = require('socket.io')(app);

$(function () {

    // let test = new Vue({
    //     el : '#content', //content안에 있는 애들은 vue가 먹힘
    //     data : {
    //         list : {},
    //         info : {
    //             userId : null,
    //             userPw : null,
    //             userPwCheck : null,
    //             userSsn : null,
    //             userGender : null,
    //             userEmail : null,
    //             userHp : null,
    //             userKoLastname : null,
    //             userKoFirstname : null,
    //             userEngLastname : null,
    //             userEngFirstname : null
    //         },
    //         flag : 0
    //     },
    //     method : {
    //         //function 처럼 함수 만들기
    //     }
    // })

    // console.log(`${test._data.info.userId}`)


    // $('.input__text').on('input', checkInput);

    $(document).on('change', '.input__text', function(){
    let button = $('.button--primary');
    let InputOK = false
    let InputSelect = document.querySelectorAll(".input__text");
        console.log(InputSelect)



    if (InputOK == true) {
        button.addClass('button--active');
    } else {
        button.removeClass('button--active');
    }



    $(document).on('click', '#sendit', function(){

        let jsonData = {
            transaction_time: new Date(),
            resultCode:"ok",
            description:"ok",
            data:{
                memUserid: $('#memUserid').val(),
                memUserpw: $('#memUserpw').val(),
                memSsn: $('#memSsn').val(),
                memGender: $('#memGender').val(),
                memEmail: $('#memEmail').val(),
                memHp: $('#memHp').val(),
                memKoLastname: $('#memKoLastname').val(),
                memKoFirstname: $('#memKoFirstname').val(),
                memEngLastname: $('#memEngLastname').val(),
                memEngFirstname: $('#memEngFirstname').val()
            }
        }

        $.post({
            url: '/api/customer',
            data: JSON.stringify(jsonData),
            dataType: 'json',
            contentType: 'application/json',
            success: function(){
                alert('가입완료!');
                location.href='/user';
            },
            error: function(){
                alert('가입실패!');
                location.reload();
            }
        });
    });
});
});