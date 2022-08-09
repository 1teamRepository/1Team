let totalCnt = new Vue({
    el: '#search-result__header',
    data: {
        totalElements: 0
    }
});
$(document).on('click', '#select_btn', function () {
    let selected = document.getElementsByClassName("list-card__item");      //클래스는 배열로 받음 변수옆에 대괄호붙여줌
    let searchTotal = document.getElementById("search-result__header");
    console.log(searchTotal);
    console.log(searchTotal.style.display);

    let lostColor = document.getElementById("hueCd");
    let selectlostColor = lostColor.options[lostColor.selectedIndex].value; //옵션에 설렉티드 밸류값을 가져옴
    let lostItem = document.getElementById("itemCd")
    let selectlostItem = lostItem.options[lostColor.selectedIndex].value;

    console.log(lostColor);
    console.log(selectlostColor);

//아이템과 컬러가 채워져있으면 searchByAll 실행, Elseif 데이터 없으면, searchList(0);

    if (selectlostColor != "" || selectlostItem != ""){
        console.log("if 들어옴");
        searchByAll(selectlostColor,selectlostItem)
    } else {
        console.log("else 들어옴");
        searchList(0);
    }


    searchTotal.children[1].style.display = "block";
    console.log("style들어옴")
    //여러개 리스트 있을때
    for(let i=0; i<selected.length; i++) {
        console.log(selected[i].style.display)
        selected[i].style.display="block";

    }

});

function searchByAll(color,item){


    let jsonData = {
        transaction_time: new Date(),
        resultCode:"ok",
        description:"ok",
        data:{
            lostColor: color,
            lostItem: item
        }
    }

    let itemList = new Vue({
        el: '#itemList',            //아이디불러옴 vue 작동
        data: {
            itemList: {}
        }
    });



    $.post({
        url: 'http://localhost:9999/api/lost_item/search',
        data: JSON.stringify(jsonData),
        dataType: 'json',
        contentType: 'application/json',
        success: function(response){
            console.log(response);

            if(response.data == null) {

                let noneData = document.getElementsByClassName("finish-item-wrap");
                noneData.style.display="block"
            }
            let pagination = response.pagination;
            itemList.itemList = response.data;
            console.log(response.data);
            totalCnt.totalElements = pagination.totalElements;
        },
        error: function (){
            alert('불러오기 실패')
        }
    });

}

//총게시물수 함수만들기, list객체 불러옴?? ,for문 돌리기 +1씪
// function totalList(index){
//     console.log();
//
//     let totalCnt = new Vue({
//         el: '#totalCnt',
//         data: {
//             totalElements: {}
//         }
//     });
//
//     for(let i=0; i<selected.length; i++) {
//         selected[i].style.display="block";
//     }
// }


function searchList(index){
    console.log("들어옴2");

    let itemList = new Vue({
        el: '#itemList',            //아이디불러옴 vue 작동
        data: {
            itemList: {}
        }
    });



    $.get("/api/lost_item?page="+index, function(response){

        //console.log(itemList.itemList)
        //자료가없을떄
        console.log(response)
        if(response.data == null) {
            let noneData = document.getElementsByClassName("finish-item-wrap");
            noneData.style.display="block"
        }

        //let pagination = response.pagination;
        //pageNum.totalPages = pagination.totalPages;
        //pageNum.currentPage = pagination.currentPage + 1;
        let pagination = response.pagination;
        itemList.itemList = response.data;
        console.log(response.data);
        totalCnt.totalElements = pagination.totalElements;

    });
}

// $(function(){
//     debugger
// console.log("들어옴");
//
//    /* let pageNum = new Vue({
//         el: '#pageNum',
//         data: {
//             totalElements: {},
//             currentPage: {}
//         }
//     });*/
//
//     let itemList = new Vue({
//         el: '#itemList',            //아이디불러옴 vue 작동
//         data: {
//             itemList: {}
//         }
//     });
//
//
//     searchList(0);
//
//     function searchList(index){
//         console.log("들어옴2");
//         $.get("/api/lost_item?page="+index, function(response){
//
//             console.log(response);
//
//             //let pagination = response.pagination;
//             //pageNum.totalPages = pagination.totalPages;
//             //pageNum.currentPage = pagination.currentPage + 1;
//             itemList.itemList = response.data;
//
//
//         });
//     }
//
// });
