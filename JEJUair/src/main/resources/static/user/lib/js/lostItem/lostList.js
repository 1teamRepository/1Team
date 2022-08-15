let totalCnt = new Vue({
    el: '#search-result__header',
    data: {
        totalElements: 0
    }
});
let itemList = new Vue({
    el: '#itemList',            //아이디불러옴 vue 작동
    data: {
        itemList: {}

    }
});
$(document).on('click', '#select_btn', function () {
    let selected = document.getElementsByClassName("list-card__item");      //클래스는 배열로 받음 변수옆에 대괄호붙여줌
    let searchTotal = document.getElementById("search-result__header");
    console.log(searchTotal);
    console.log(searchTotal.style.display);

    let lostItem = document.getElementById("itemCd")
    let selectlostItem = lostItem.options[lostItem.selectedIndex].value;
    let lostColor = document.getElementById("hueCd");
    let selectlostColor = lostColor.options[lostColor.selectedIndex].value; //옵션에 설렉티드 밸류값을 가져옴


    console.log(selectlostColor);
    console.log(selectlostItem);

//아이템과 컬러가 채워져있으면 searchByAll 실행, Elseif 데이터 없으면, searchList(0);



    if (selectlostColor != "" || selectlostItem != ""){
        console.log("if 들어옴");
        searchByAll(selectlostColor,selectlostItem, selected, searchTotal, itemList)

    } else {
        console.log("else 들어옴");
        searchList(0, selected, searchTotal, itemList);

    }

});



//모달창 열기
$(document).on('click', '.list-card__item', function () {
    // let index = document.getElementById("lostIdx").value;
    console.log(this.children[1].firstElementChild.value)
    let index = this.children[1].firstElementChild.value;

    console.log(index);
    readView(index);

    function readView(index) {

        $.get("/api/lost_item/" + index, function (response) {
            let lostItem = response.data;
            console.log(response);
            console.log(response.data);
            console.log(lostItem);


            let lostAcqDate = `${lostItem.lostAcqDate}`
            let lostDisDate = `${lostItem.lostDisDate}`
            let lostProperty = `${lostItem.lostItem}`
            let lostAcqAirName = `${lostItem.lostAcqAirName}`
            let lostStoragePlace = `${lostItem.lostStoragePlace}`
            let lostColor = `${lostItem.lostColor}`
            let lostExplain = `${lostItem.lostExplain}`

            document.getElementById('card_image').src = `${lostItem.lostImg}`;
            document.getElementById("detailPickupDt").innerText = lostAcqDate;
            document.getElementById("keepingChgDt").innerText = lostDisDate;
            document.getElementById("detailItemCd").innerText = lostProperty;
            document.getElementById("detailPickupSpotCont").innerText = lostAcqAirName;
            document.getElementById("detailRegBranchId").innerText = lostStoragePlace;
            document.getElementById("detailHueCd").innerText = lostColor;
            document.getElementById("imageReplacementSentenceCont").innerText = lostExplain;


        });
    }
    document.getElementById("modalLayer02").style.display ="block";




});


//모달창 닫기
$(document).on('click', '#modal_close', function (event) {
    event.stopPropagation();
    document.getElementById("modalLayer02").style.display ="none";
    console.log("들어옴3")
});



async function searchByAll(color,item, selected, searchTotal, itemList){


    let jsonData = {
        transaction_time: new Date(),
        resultCode:"ok",
        description:"ok",
        data:{
            lostColor: color,
            lostItem: item
        }
    }
    console.log(jsonData);




    await $.post({
        url: '/api/lost_item/search',
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

    console.log(itemList.itemList);

    searchTotal.children[1].style.display = "block";
    console.log("style들어옴")
    //여러개 리스트 있을때
    for(let i=0; i<selected.length; i++) {
        console.log(selected[i].style.display)
        selected[i].style.display="block";

    }

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



async function searchList(index, selected, searchTotal, itemList){
    console.log("들어옴2");





    await $.get("/api/lost_item?page="+index, function(response){



        //console.log(itemList.itemList)
        //자료가없을떄
        console.log(response);
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


    console.log(itemList.itemList);


    searchTotal.children[1].style.display = "block";
    console.log("style들어옴")
    //여러개 리스트 있을때
    for(let i=0; i<selected.length; i++) {
        console.log(selected[i].style.display)
        selected[i].style.display = "block";
    }
}


//모달창 열기


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
