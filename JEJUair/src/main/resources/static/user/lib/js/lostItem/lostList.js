
    console.log("들어옴");

    searchList(0);



function searchList(index){
    console.log("들어옴2");

    let itemList = new Vue({
        el: '#itemList',            //아이디불러옴 vue 작동
        data: {
            itemList: {}
        }
    });

    $.get("/api/lost_item?page="+index, function(response){

        console.log(itemList.itemList)

        //let pagination = response.pagination;
        //pageNum.totalPages = pagination.totalPages;
        //pageNum.currentPage = pagination.currentPage + 1;
        itemList.itemList = response.data;


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
