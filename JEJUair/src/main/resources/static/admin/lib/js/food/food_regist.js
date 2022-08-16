$(function(){
    let imageFile
    $("#foodPic").on("change", function(event){
        imageFile = event.target.files[0];
        console.log(imageFile)
    });

    $(document).on('click', '#regist', function(){
        if(!$('#foodKrwPrice').val()){
            alert("가격(KOR)을 입력하세요");
            $('#foodKrwPrice').focus();
            return false;
        }

        if(!$('#foodKorName').val()){
            alert("기내식명(KOR) 입력하세요");
            $('#foodKorName').focus();
            return false;
        }

        if(!$('#foodUsdPrice').val()){
            alert("가격(USD)을 입력하세요");
            $('#foodUsdPrice').focus();
            return false;
        }

        if(!$('#foodEngName').val()){
            alert("기내식명(ENG) 입력하세요");
            $('#foodEngName').focus();
            return false;
        }
        if(!$('#foodJpyPrice').val()){
            alert("가격(JPY) 입력하세요");
            $('#foodJpyPrice').focus();
            return false;
        }

        // if(!$('#foodPicture').val()){
        //     alert("사진을 등록하세요");
        //     $('#foodPicture').focus();
        //     return false;
        // }
        /*
                    {
                        "transaction_time":"2022-07-12",
                        "resultCode":"ok",
                        "description":"ok",
                        "data":{
                            "userid":"ryu",
                            "userpw":"1111",
                            "email":"ryu@naver.com",
                            "hp":"010-1111-1111"
                        }
                    }
         */

        //    javascript 객체로 json 형태를 만든거. json 자체는 아님
        let jsonData = {
            transaction_time: new Date(),
            resultCode:"ok",
            description:"ok",
            data:{
                foodKrwPrice: $('#foodKrwPrice').val(),
                foodKorName:$('#foodKorName').val(),
                foodUsdPrice:$('#foodUsdPrice').val(),
                foodEngName:$('#foodEngName').val(),
                foodJpyPrice :$('#foodJpyPrice').val(),
                foodTitle:$('#fo_title').val(),
                foodContent:$('#fo_content').val()
            }
        }

        let form = $('#regForm')[0];
        let formData = new FormData(form);
        formData.append('file', imageFile);
        console.log(imageFile)
        console.log(formData.get('file'))
        formData.append('key', new Blob([JSON.stringify(jsonData)], {type: "application/json"}));
        console.log(formData.get('key'))

        $.post({
            url: '/api/food',
            data: formData,
            enctype:"multipart/form-data",
            processData: false,
            contentType: false,
            success: function(){
                alert("등록 성공!");
                location.href='/admin/food/list';
            },
            error: function(){
                alert("등록 실패!");
            }
            // contentType: 'application/json'
        });


    });
});


