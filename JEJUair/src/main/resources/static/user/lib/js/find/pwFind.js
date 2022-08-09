$('.modal').on('hidden.bs.modal', function (e) {
    console.log('modal close');
    $(this).find('frm')[0].reset()
});

$("#nextAction").click(function () {
    let userEmail = $("#email").val();


    $.ajax({
        type: "GET",
        url: "/api/customer",
        data: {
            "memEmail": userEmail
        },
        success: function(){
            $('.input__error').style.display = "none"
            location.href= '/findUserInfoList';
        },
        error: function(){
            alert('수정실패!');
            $('.input__error').style.display = "block"
            location.reload();
        }

    })
})