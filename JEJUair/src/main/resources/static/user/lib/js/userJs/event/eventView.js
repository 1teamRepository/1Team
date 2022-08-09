$(function(){
    let itemList = new Vue({
        el: '#itemList',
        data: {
            itemList: {}
        }
    });

    let category = document.getElementById("category").getAttribute("value");
    let str = $(location).attr('href').split('/').reverse();
    readView(str[0]);
    function readView(index){

        $.get("/api/"+category+"/"+index, function(response){
            itemList.itemList = response.data;
            console.log(itemList.itemList.evtTitle)

        });
    }
});