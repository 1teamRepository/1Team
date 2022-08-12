$(function () {

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
        }
    });

    let ansUserid = localStorage.getItem("userid")
    console.log(ansUserid)
    searchUserid(ansUserid);

    function searchUserid() {
        $.get("/api/inquiry/list/" + ansUserid, function (response) {

            let pagination = response.pagination;
            pageNum.totalPages = pagination.totalPages;
            pageNum.currentPage = pagination.currentPage + 1;
            itemList.itemList = response.data;

            let lastPage = response.pagination.totalPages;
            let pageStr = "";

            if (lastPage != 0) {
                pageStr += "<div class='page_btn'><a id='firstpage_btn'>First</a></div>";
            }
            for (let i = 0; i < lastPage; i++) {
                pageStr += "<div class='page_btn2'><a class='pagenum pages' id='btn" + i + "'>" + (i + 1) + "</a></div>"

            }
            if (lastPage != 0) {
                pageStr += "<div class='page_btn'><a id='lastpage_btn'>End</a></div>";
            }
            $('#pageNum').html(pageStr);

            let btnColor = document.getElementById("btn" + pagination.currentPage).parentElement;
            btnColor.classList.add('current_btn');
        });
    }

});
