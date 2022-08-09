$(function(){
    let category = document.getElementById("category").getAttribute("value");
    $(document).on('click', '#sendit', function(){

        if(!$('#ansInquiryTitle').val()){
            alert('제목을 입력하세요');
            $('#ansInquiryTitle').focus();
            return false;
        }

        if(!$('#ansInquiryContent').val()) {
            alert('내용을 입력하세요');
            $('#ansInquiryContent').focus();
            return false;
        }

        if(!$('#agreeChk').prop("checked")){
            alert('개인정보 동의를 해주세요');
            $('#agreeChk').focus();
            return false;
        }

        let jsonData = {
            transaction_time: new Date(),
            resultCode:"ok",
            description:"ok",
            data:{
                ansInquiryTitle: $('#ansInquiryTitle').val(),
                ansInquiryContent: $('#ansInquiryContent').val(),
                ansUserid: $('#ansUserid').val(),
                ansAnswerCheck: 'No'
            }
        }

        $.post({
            url: '/api/'+category,
            data: JSON.stringify(jsonData),
            dataType: 'json',
            contentType: 'application/json',
            success: function(){
                alert('등록성공!');
                location.href='/user/qna_list';
            },
            error: function(){
                alert('등록실패!');
                location.reload();
            }
        });
    });
});
