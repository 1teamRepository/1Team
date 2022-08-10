
$(function(){


    $.get({
        url: "/api/aircraft",
        dataType : "json",
        contentType: 'application/json',
        async: false,
        success: function(response){
            response.data.map(function(val, index){
                let idx = val['acftIdx'];
                let name = val['acftAircraftName'];
                let aircraftName = $('#acftAircraftName');
                let acftIdx = $('#acftIdx');

                let option = document.createElement('option');
                option.innerText = name;
                option.value = name;
                aircraftName.append(option);

                option = document.createElement('option');
                option.innerText = idx;
                option.value = idx;
                acftIdx.append(option);
            });
        }
    })

    $.get({
        url: "/api/destination",
        dataType : "json",
        contentType: 'application/json',
        async: false,
        success: function(response){
            //console.dir(response)
            response.data.map(function(val, index){
                //console.dir(val)
                //console.log(name)
                let name = val['desDestination'];
                let destination = $('.desDestination');

                let option = document.createElement('option');
                option.innerText = name;
                option.value = name;
                destination[0].append(option);

                option = document.createElement('option');
                option.innerText = name;
                option.value = name;
                destination[1].append(option);
            });
        }
    })


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
            view.view = response.data;
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

});

