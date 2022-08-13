$(function(){

    let memData
    let view = new Vue({
        el: '#view',
        data: {
            view: {
                memPoint : 0
            }
        }
    });


    let category = document.getElementById("category").getAttribute("value");
    let sessionIdx = document.getElementById("memIdx").getAttribute("value");
    let sessionUserid = document.getElementById("userid").value;
    localStorage.setItem("userid", sessionUserid)

    $.get({
        url : "/api/point/search/" + sessionIdx + "?page=0",
        dataType : "json",
        contentType: 'application/json',
        async: false,
        success: function (response) {
            const pointInfo = response.data;
            console.log(pointInfo)
            console.log(pointInfo.length)
            for (let i = 0; i < pointInfo.length; i++) {
                let pointHTML = '<tr>\n' +
                    '    <td class="pntIdx">'+pointInfo[i].pntIdx+'</td>\n' +
                    '    <td class="pntContent">'+pointInfo[i].pntContent+'</td> \n' +
                    '    <td class="pntAmount">'+pointInfo[i].pntAmount+'</td> \n' +
                    '    <td class="pntStatus">'+pointInfo[i].pntStatus+'</td> \n' +
                    '    <td class="pntRegDate">'+pointInfo[i].pntRegDate+'</td>\n' +
                    '</tr>'
                $('#itemList').append(pointHTML);
            }
        }
    });


    readView(sessionIdx);
    function readView(sessionIdx){

        $.get("/api/"+ category+ "/" + sessionIdx, function(response){
            view.view = response.data;
            memData = response.data;
            if(view.view.memPoint == null){
                view.view.memPoint = 0;
            }
            console.log(view.view.memPoint);
            memberGrade()
        });
    }

    // 회원 등급 계산
    function memberGrade() {
        let memberGrade = document.getElementById("memberGrade")

        //포인트
        let memPoint = `${memData.memPoint}`
        console.log(memPoint)

        if (memPoint >= 250000) {
            memberGrade.innerHTML = "VIP"
        }
        if (memPoint >= 100000) {
            memberGrade.innerHTML = "GOLD"
        }
        if (memPoint >= 50000) {
            memberGrade.innerHTML = "SILVER+"
        } else {
            memberGrade.innerHTML = "SILVER"
        }
    }





});