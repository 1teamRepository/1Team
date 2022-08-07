$(function(){

    let memData
    let view = new Vue({
        el: '#view',
        data: {
            view: {}
        }
    });

    let category = document.getElementById("category").getAttribute("value");
    let sessionIdx = document.getElementById("memIdx").getAttribute("value");

    readView(sessionIdx);
    function readView(sessionIdx){

        $.get("/api/"+ category+ "/" + sessionIdx, function(response){
            view.view = response.data;
            memData = response.data;
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