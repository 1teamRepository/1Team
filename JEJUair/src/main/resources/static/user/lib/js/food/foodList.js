$(function() {

    let itemList = new Vue({
        el: '#itemList',
        data: {
            itemList: {}
        }
    });

    searchStart();

    function searchStart() {
        $.get("/api/food/findList", function (response) {
            itemList.itemList = response.data;
        })
    }
});