
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

});
