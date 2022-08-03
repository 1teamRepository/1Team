
$(function(){
    aircraftNameList();
    DepartureDestinationList();

    function aircraftNameList(){
        $.get("/api/aircraft", function (response){
            response.data.map(function(val, index){
                let name = val['acftAircraftName'];
                let aircraftName = $('#acftAircraftName');

                let option = document.createElement('option');
                option.innerText = name;
                option.value = name;
                aircraftName.append(option);
            });
        });
    };

    function DepartureDestinationList(){
        $.get("/api/destination", function (response){
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
        });
    }


});