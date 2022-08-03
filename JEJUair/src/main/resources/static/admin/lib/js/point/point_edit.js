$(function(){
    let category = document.getElementById("category").getAttribute("value");
    $(document).on('click', '#sendit', function(){
        if(!$('#pntUserid').val()){
            alert('아이디를 입력하세요');
            $('#pntUserid').focus();
            return false;
        }

        if(!$('#pntAmount').val()) {
            alert('사용금액을 입력하세요');
            $('#pntAmount').focus();
            return false;
        }


        if(!$('#pntContent').val()){
            alert('내용을 입력하세요');
            $('#pntContent').focus();
            return false;
        }

        if(!$('#pntStatus').val()){
            alert('0, 1중 선택하세요 (0=USE, 1=SAVE)');
            $('#pntStatus').focus();
            return false;
        }


        let Status = document.getElementById("pntStatus");
        let pntStatus = Status.options[Status.selectedIndex].value;
        if(pntStatus == "null" || pntStatus == undefined){
            alert('상태를 선택하세요');
            $('#pntStatus').focus();
            return false;
        }

        let jsonData = {
            transaction_time: new Date(),
            resultCode:"ok",
            description:"ok",
            data:{
                pntIdx: $('#pntIdx').val(),
                pntUserid: $('#pntUserid').val(),
                pntAmount: $('#pntAmount').val(),
                pntContent: $('#pntContent').val(),
                pntStatus: pntStatus
            }
        }

        $.ajax({
            url: '/api/'+category,
            type: "PUT",
            data: JSON.stringify(jsonData),
            dataType: 'json',
            contentType: 'application/json',
            success: function(){
                alert('수정성공!');
                location.href='/admin/'+category+'/list';
            },
            error: function(){
                alert('수정실패!');
                location.reload();
            }
        });
    });
});
