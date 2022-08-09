$(function(){

    let view = new Vue({
        el: '#view',
        data: {
            view: {}
        }
    });

    let getData = localStorage.getItem("sendData")
    readView(getData);

    function readView(i){

        $.get("/api/customer/"+i , function(response){
            view.view = response.data;
        });
    }



});

