$(function(){
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





        /*
                    {
                        "transaction_time":"2022-07-12",
                        "resultCode":"ok",
                        "description":"ok",
                        "data":{
                            "userid":"ryu",
                            "userpw":"1111",
                            "name":"류"
                        }
                    }
         */

        let jsonData = {
            transaction_time: new Date(),
            resultCode:"ok",
            description:"ok",
            data:{
                evtIdx: $('#evtIdx').val(),
                evtStartDate: $('#evtStartDate').val(),
                evtEndDate: $('#evtEndDate').val(),
                evtTitle: $('#evtTitle').val(),
                evtContent: $('#evtContent').val()
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
