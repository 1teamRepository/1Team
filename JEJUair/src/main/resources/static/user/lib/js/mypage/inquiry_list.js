$(function(){

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

    searchStart(0);

    function searchStart(index){
        let category = document.getElementById("category").getAttribute("value");
        $.get("/api/"+category+"?page="+index, function(response){

            let pagination = response.pagination;
            pageNum.totalPages = pagination.totalPages;
            pageNum.currentPage = pagination.currentPage + 1;

            itemList.itemList = response.data;
            let answerData = [];
            answerIdx();

            // function answerIdx(){
            //     itemList.itemList.forEach((item)=>{
            //         if(){
            //             answerData.push(item)
            //         }
            //     })
            // }


        });
    }



    $(document).on('click', '.pages', function(){
        let pageId = this.id.substring(3);
        searchStart(pageId);
    });

    $(document).on('click', '#page-first', function(){
        searchStart(0);
    });

    $(document).on('click', '#page-last', function(){
        searchStart(pageNum.totalPages-1);
    });

    let sessionIdx = document.getElementById("memIdx").getAttribute("value");

    $("#delete").click(() => {
        const yn = confirm("삭제하시겠습니까?");
        if(yn){
            deleteView(sessionIdx);
            location.href = `/user/qna_list`;
        }
    })

    function deleteView(sessionIdx){
        $.ajax({
            url: `/api/`+ category+`/`+sessionIdx,
            method: "DELETE"
        })
    }

});
