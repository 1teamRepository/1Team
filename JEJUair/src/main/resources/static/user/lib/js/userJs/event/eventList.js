$(function(){
    let itemList = new Vue({
        el: '#itemList',
        data: {
            itemList: {}
        },
        methods:{
            locate(index){
                window.location.href=`/event/eventDetail/${index}`
            }
        }
    });
    searchList(0);
    function searchList(index){
        $.get("/api/event?page="+index, function(response){
            itemList.itemList = response.data;
        });
    }
});

