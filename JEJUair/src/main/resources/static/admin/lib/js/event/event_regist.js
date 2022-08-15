$(function(){
    let imageFile
    $("#eventPic").on("change", function(event){
        imageFile = event.target.files[0];
        console.log(imageFile)
    });

    let category = document.getElementById("category").getAttribute("value");
    $(document).on('click', '#sendit', function(){
        if(!$('#evtStartDate').val()){
            alert('시작일자를 입력하세요');
            $('#evtStartDate').focus();
            return false;
        }

        if(!$('#evtEndDate').val()){
            alert('종료일자를 입력하세요');
            $('#evtEndDate').focus();
            return false;
        }

        if(!$('#evtTitle').val()) {
            alert('제목을 입력하세요');
            $('#evtTitle').focus();
            return false;
        }


        if(!$('#evtContent').val()){
            alert('내용을 입력하세요');
            $('#evtContent').focus();
            return false;
        }


        let jsonData = {
            transaction_time: new Date(),
            resultCode:"ok",
            description:"ok",
            data:{
                evtStartDate: $('#evtStartDate').val(),
                evtEndDate: $('#evtEndDate').val(),
                evtTitle: $('#evtTitle').val(),
                evtContent: $('#evtContent').val()
            }
        }

        let form = $('#regForm')[0];
        let formData = new FormData(form);
        formData.append('file', imageFile);
        // console.log(imageFile)
        // console.log(formData.get('file'))
        formData.append('key', new Blob([JSON.stringify(jsonData)], {type: "application/json"}));
        // console.log(formData.get('key'))

        $.post({
            url: '/api/'+category,
            data: formData,
            enctype:"multipart/form-data",
            processData: false,
            contentType: false,
            success: function(){
                alert('등록성공!');
                location.href='/admin/'+category+'/list';
            },
            error: function(){
                alert('등록실패!');
                location.reload();
            }
        });
    });
});