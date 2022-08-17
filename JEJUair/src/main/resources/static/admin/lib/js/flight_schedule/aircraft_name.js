
$(function(){

    $.get({
        url: '/api/aircraft/findList',
        dataType: "json",
        contentType: 'application/json',
        async: false,
        success: function (response) {
            response.data.map(function(val, index) {
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
        url: '/api/destination/findList',
        dataType: "json",
        contentType: 'application/json',
        async: false,
        success: function (response) {
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


});