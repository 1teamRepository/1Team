loadInfo();
console.log();

function loadInfo(){
    $.get("/api/customer/"${memIdx}, function(response){
        console.log(response);
    })
}