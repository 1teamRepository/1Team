function dropdown(num) {
    var droptarget = 'drop' + num;
    console.log(droptarget)
    var target = document.getElementsByClassName(droptarget);
    console.log(target)
    console.log(target.length != 0)
    var uptarget;
    var up;

    if(target.length != 0) {
        for (var i = 0; i < 12; i++) {
            if (num == i) {
                i = i + 1;
            }
            uptarget = 'drop' + i;
            up = document.getElementsByClassName(uptarget);

            for (var j = 0; j < up.length; j++) {
                up[j].style.display = 'none';
                console.log(up[j].style.display);
            }
        }


        var disStyle = target[0].style.display;
        console.log('V' + disStyle + 'V');
        console.log(disStyle == 'block');

        if (disStyle == 'block') {
            for (var i = 0; i < target.length; i++) {
                target[i].style.display = 'none';
            }
        } else {
            for (var i = 0; i < target.length; i++) {
                target[i].style.display = 'block';
            }
        }
    }
}


console.log(document.querySelector(".container").getAttribute("value"));
var name2 = document.querySelector(".container").getAttribute("value");
var span = document.querySelectorAll('.navigation span');

var regex = /[^0-9]/g;
for(var i=0; i<span.length; i++){
    if(span[i].getAttribute("value") == name2){
        console.log("같은게 들어옴 " + i + "번")
        var li = span[i].parentElement.parentElement
        var num;
        var str;
        if(li.className.substr(0, 4) == 'drop'){
            str = li.parentElement.parentElement.firstElementChild.getAttribute("onclick");
            num = str.replace(regex, "");
            dropdown(num);
            li.classList.add('thispage');
            li.parentElement.parentElement.classList.add('thispage');
        }else{
            str = li.firstElementChild.getAttribute("onclick");
            num = str.replace(regex, "");
            dropdown(num);
            li.classList.add('thispage');
        }
    }
}