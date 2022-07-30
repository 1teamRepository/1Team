$(function(){
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
        if(!$('#foodDiscount').val()){
            alert("할인율을 입력하세요");
            $('#foodDiscount').focus();
            return false;
        }
        if(!$('#foodPicture').val()){
            alert("사진을 등록하세요");
            $('#foodPicture').focus();
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
                            "email":"ryu@naver.com",
                            "hp":"010-1111-1111"
                        }
                    }
         */
        let foodStartingPoints = document.getElementsByName("foodStartingPoint");
        let foodStartingPointList = "";
        for (let i=0; i<foodStartingPoints.length; i++){
            if (foodStartingPoints[i].checked){
                if(foodStartingPointList == ""){
                    foodStartingPointList += foodStartingPoints[i].getAttribute("value")
                }else{
                    foodStartingPointList += ', ' + foodStartingPoints[i].getAttribute("value");
                }
            }
        }

        let foodSpecifics = document.getElementsByName("foodSpecific");
        let foodSpecificList = "";
        for (let i=0; i<foodSpecifics.length; i++){
            if (foodSpecifics[i].checked){
                if(foodSpecificList == ""){
                    foodSpecificList += foodSpecifics[i].getAttribute("value")
                }else{
                    foodSpecificList += (', ' + foodSpecifics[i].getAttribute("value"));
                }
            }
        }

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
                foodDiscount:$('#foodDiscount').val(),
                foodPicture:$('#foodPicture').val(),
                foodSpecific: foodSpecificList,
                foodStartingPoint: foodStartingPointList,
                foodTitle:$('#fo_title').val(),
                foodContent:$('#fo_content').val()
            }
        }

        $.ajax({
            url: '/api/food',
            type: "PUT",
            data: JSON.stringify(jsonData),
            dataType: 'json',
            contentType: 'application/json',
            success: function(){
                alert("수정 성공!");
                location.href='/admin/food/view';
            },
            error: function(){
                alert("수정 실패!");
                location.reload();
            }
            // contentType: 'application/json'
        });


    });
});


