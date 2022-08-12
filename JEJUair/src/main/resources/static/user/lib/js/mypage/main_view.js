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

    let pageNum = new Vue({
        el: '#pageNum',
        data: {
            totalElements: {},
            currentPage: {}
        }
    });

    let itemList = new Vue({
        el: '#itemList',
        data: {
            itemList: {}
        },
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
            let pagination = response.pagination;
            pageNum.totalPages = pagination.totalPages;
            pageNum.currentPage = pagination.currentPage + 1;
            itemList.itemList = response.data;

            let lastPage = response.pagination.totalPages;
            let pageStr = "";

            if(lastPage != 0){
                pageStr += "<div class='page_btn'><a id='firstpage_btn'>First</a></div>";
            }
            for(let i = 0; i < lastPage; i++){
                pageStr += "<div class='page_btn2'><a class='pagenum pages' id='btn" + i + "'>" + (i+1) +"</a></div>"

            }
            if(lastPage != 0){
                pageStr += "<div class='page_btn'><a id='lastpage_btn'>End</a></div>";
            }
            $('#pageNum').html(pageStr);

            let btnColor = document.getElementById("btn"+pagination.currentPage).parentElement;
            btnColor.classList.add('current_btn');
        }
    });

    function searchStart(index){
        $.get("/api/point/search/" + sessionIdx + "?page="+index, function(response){

            let pagination = response.pagination;
            pageNum.totalPages = pagination.totalPages;
            pageNum.currentPage = pagination.currentPage + 1;
            itemList.itemList = response.data;

            let lastPage = response.pagination.totalPages;

            let btnColor = document.getElementById("btn"+pagination.currentPage).parentElement;
            btnColor.classList.add('current_btn');
        });
    }

    $(document).on('click', '.pages', function(){
        let pageId = this.id.substring(3);
        searchStart(pageId);
    });

    $(document).on('click', '#firstpage_btn', function(){
        searchStart(0);
    });

    $(document).on('click', '#lastpage_btn', function(){
        searchStart(pageNum.totalPages-1);
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