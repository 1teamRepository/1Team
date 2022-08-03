$(function(){
    let foodData
    let view = new Vue({
        el: '#view',
        data: {
            view: {}
        }
    });
    let category = document.getElementById("category").getAttribute("value");
    let str = $(location).attr('href').split('/').reverse();

    readView(str[0]);
    function readView(index){

        $.get("/api/"+category+"/"+index, function(response){
            foodData = response.data;
            view.view = response.data;
            foodSp()
        });
    }

    $("#delete").click(() => {
        console.log(str[0])
        const yn = confirm("삭제하시겠습니까?");
        if(yn){
            deleteView(str[0]);
            location.href = `/admin/`+category+`/list`;
        }
    })

    function deleteView(index){
        $.ajax({
            url: `/api/`+category+`/`+index,
            method: "DELETE"
        })
    }

    function foodSp(){
        let SpecificValue = `${foodData.foodSpecific}`
        let valueSplit = SpecificValue.split(', ')
        let foodSpecifics = document.getElementsByName("foodSpecific");

        for(let i in valueSplit) {
            for(let j=0; j<foodSpecifics.length; j++){
                if(valueSplit[i] == foodSpecifics[j].getAttribute("value")){
                    foodSpecifics[j].checked =true;
                }
            }
        }
    }


});

