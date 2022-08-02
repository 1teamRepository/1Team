$(function (){
    $(document).on('click', '#decide', function () {
        decide();
    });

    function decide(){
        let jsonData = {
            transaction_time: new Date(),
            resultCode:"ok",
            description:"ok",
            data:{
                resIdx: $('#resIdx').val(),
                resStatus: 'DECIDE'
            }
        }

        $.ajax({
            url: '/api/reservation',
            type: "PUT",
            data: JSON.stringify(jsonData),
            dataType: 'json',
            contentType: 'application/json',
            success: function(){
                alert('예매가 확정되었습니다!');
                location.href='/admin/reservation/namelist';
            },
            error: function(){
                alert('변경실패!');
                location.reload();
            }
        });
    }


    $(document).on('click', '#cancel', function () {
        cancel();
    });

    function cancel(){
        let jsonData = {
            transaction_time: new Date(),
            resultCode:"ok",
            description:"ok",
            data:{
                resIdx: $('#resIdx').val(),
                resStatus: 'CANCEL'
            }
        }

        $.ajax({
            url: '/api/reservation',
            type: "PUT",
            data: JSON.stringify(jsonData),
            dataType: 'json',
            contentType: 'application/json',
            success: function(){
                alert('예매가 취소되었습니다!');
                location.href='/admin/reservation/namelist';
            },
            error: function(){
                alert('변경실패!');
                location.reload();
            }
        });
    }


});