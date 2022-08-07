
$(function(){

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

    passengerSearch(str[0]);

    function passengerSearch(index){
        $.get("/api/passenger/"+index+"/passengerInfo", function(response) {

            let lst = response.data;
            console.log(lst);
            for (let i = 0; i < lst.length; i++) {

                let pasHTML = '<ul class="leg_list"><li class="clear"><span class="tit_lbl">NO</span><div class="reg_content"><input type="text" class="textBox" disabled value="'+lst[i]["pasIdx"]+'"></div></li>\n' +
                    '<li class="clear"><span class="tit_lbl">탑승객명(KOR)</span><div class="reg_content"><input type="text" class="textBox" disabled value="'+lst[i]["pasLastname"]+lst[i]["pasFirstname"]+'"></div></li>\n' +
                    '<li class="clear"><span class="tit_lbl">생년월일</span><div class="reg_content"><input type="text" class="textBox" disabled value="'+lst[i]["pasBirthDate"]+'"></div></li>\n' +
                    '<li class="clear"><span class="tit_lbl">수하물 무게</span><div class="reg_content"><input type="text" class="textBox" disabled value="'+lst[i]["bagWeight"]+'"></div></li>\n' +
                    '<li class="clear"><span class="tit_lbl">좌석</span><div class="reg_content"><input type="text" class="textBox" disabled value="'+lst[i]["pasSeat"]+'"></div></li></ul>';

                $('#passList').append(pasHTML);
            }
        })
    };
});
