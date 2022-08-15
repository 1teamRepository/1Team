$(function(){
    let imageFile
    $("#lostImg").on("change", function(event){
        imageFile = event.target.files[0];
        console.log(imageFile)
    });

    let category = document.getElementById("category").getAttribute("value");
    $(document).on('click', '#sendit', function(){
        if(!$('#lostItem').val()){
            alert('분실물을 입력하세요');
            $('#lostItem').focus();
            return false;
        }

        if(!$('#lostAcqAirName').val()) {
            alert('습득편명을 입력하세요' );
            $('#lostAcqAirName').focus();
            return false;
        }

        if(!$('#lostAcqDate').val()){
            alert('습득날짜를 입력하세요');
            $('#lostAcqDate').focus();
            return false;
        }

        let storage = document.getElementById("lostStoragePlace");
        let lostStoragePlace = storage.options[storage.selectedIndex].value;
        if(lostStoragePlace == "null" || lostStoragePlace == undefined){
            alert('보관장소를 선택하세요');
            $('#lostStoragePlace').focus();
            return false;
        }

        if(!$('#lostStoragePlace').val()){
            alert('보관장소를 선택하세요');
            $('#lostStoragePlace').focus();
        }

        if(!$('#lostDisDate').val()){
            alert('폐기날짜를 입력하세요');
            $('#lostDisDate').focus();
            return false;
        }

        let color = document.getElementById("lostColor");
        let lostColor = color.options[color.selectedIndex].value;
        if(lostColor == "null" || lostColor == undefined){
            alert('색상을 선택하세요');
            $('#lostColor').focus();
            return false;
        }


        let item = document.getElementById("lostItem");
        let lostItem = item.options[item.selectedIndex].value;
        if(lostItem == "null" || lostItem == undefined){
            alert('품목을 선택하세요');
            $('#lostItem').focus();
            return false;
        }


        if(!$('#lostExplain').val()){
            alert('상세설명을 입력하세요');
            $('#lostExplain').focus();
            return false;
        }

        if(!$('#lostSeatNum').val()){
            alert('좌석번호를 입력하세요');
            $('#lostSeatNum').focus();
            return false;
        }

        let status = document.getElementById("lostStatus");
        let lostStatus = status.options[status.selectedIndex].value;
        if(lostStatus == "null" || lostStatus == undefined){
            alert('상태를 선택하세요');
            $('#lostStatus').focus();
            return false;
        }

        if(!$('#lostImg').val()){
            alert("사진을 등록하세요");
            $('#lostImg').focus();
            return false;
        }



        let jsonData = {
            transaction_time: new Date(),
            resultCode:"ok",
            description:"ok",
            data:{
                lostItem: lostItem,
                lostAcqAirName: $('#lostAcqAirName').val(),
                lostAcqDate: $('#lostAcqDate').val(),
                lostStoragePlace: lostStoragePlace,
                lostDisDate: $('#lostDisDate').val(),
                lostColor: lostColor,
                lostExplain: $('#lostExplain').val(),
                lostSeatNum: $('#lostSeatNum').val(),
                lostStatus: lostStatus,
                lostImg: $('#lostImg').val()

            }
        }
        let form = $('#regForm')[0];
        let formData = new FormData(form);
        formData.append('file', imageFile);
        // console.log(imageFile)
        console.log(formData.get('file'))
        formData.append('key', new Blob([JSON.stringify(jsonData)], {type: "application/json"}));
        console.log(formData.get('key'))


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
