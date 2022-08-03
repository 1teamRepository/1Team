$(function(){
    let category = document.getElementById("category").getAttribute("value");
    $(document).on('click', '#sendit', function() {
        if (!$('#lostExplain').val()) {
            alert('유실물명을 입력하세요');
            $('#lostExplain').focus();
            return false;
        }

        if (!$('#lostAcqAirName').val()) {
            alert('습득편명을 입력하세요');
            $('#lostAcqAirName').focus();
            return false;
        }

        if (!$('#lostAcqDate').val()) {
            alert('습득날짜를 입력하세요');
            $('#lostAcqDate').focus();
            return false;
        }


        if (!$('#lostDisDate').val()) {
            alert('폐기날짜 입력하세요');
            $('#lostDisDate').focus();
            return false;
        }


        if (!$('#lostItem').val()) {
            alert('상세설명을 입력하세요');
            $('#lostItem').focus();
            return false;
        }

        if (!$('#lostSeatNum').val()) {
            alert('좌석번호 입력하세요');
            $('#lostSeatNum').focus();
            return false;
        }


        let storage = document.getElementById("lostStoragePlace");
        let lostStoragePlace = storage.options[storage.selectedIndex].value;

        let color = document.getElementById("lostColor");
        let lostColor = color.options[color.selectedIndex].value;

        let item = document.getElementById("lostItem");
        let lostItem = item.options[item.selectedIndex].value;

        let status = document.getElementById("lostStatus");
        let lostStatus = status.options[status.selectedIndex].value;




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
        console.log(jsonData);


        $.post({
            url: '/api/'+category,
            data: JSON.stringify(jsonData),
            dataType: 'json',
            contentType: 'application/json',
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
