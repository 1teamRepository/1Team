let roll = 0;
let si = null;

window.onload = function(){
    si = setInterval(rollNext, 3000);
}

function rollNext(){
    document.querySelector("#banner"+roll).style.opacity= 0;
    document.querySelector("#banner"+((roll+1)%8)).style.opacity= 1;

    roll = (roll+1)%8;
}

function rollPrev(){
    document.querySelector("#banner"+roll).style.opacity= 0;
    if(roll-1 < 0){
        document.querySelector("#banner"+((roll+7)%8)).style.opacity= 1;
        roll = (roll+7)%8;
    }else{
        document.querySelector("#banner"+((roll-1)%8)).style.opacity= 1;
        roll = (roll-1)%8;
    }
}