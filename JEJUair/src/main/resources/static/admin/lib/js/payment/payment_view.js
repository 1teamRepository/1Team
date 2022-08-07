
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
            console.log(view.view);
            console.log(view.view["tbReservationResIdx"]);
            $.get("/api/passenger/"+view.view["tbReservationResIdx"]+"/passengerInfo", function(response2) {
                let lst = response2.data;
                console.log(lst);

                for (let i = 0; i < lst.length; i++) {
                    if(lst[i]["tbAirlineFoodFoodIdx"] != 43){   //43번은 기내식 디비에 저장된 "없음"
                        let foodHTML = '<ul class="leg_list"><li class="clear"><span class="tit_lbl">부가서비스 타입</span><div class="reg_content"><input type="text" class="textBox" disabled value="사전 기내식"></div></li>\n' +
                            '<li class="clear"><span class="tit_lbl">기내식명</span><div class="reg_content"><input type="text" class="textBox" disabled value="'+lst[i]["foodKorName"]+'"></div></li>\n' +
                            '<li class="clear"><span class="tit_lbl">결제금액</span><div class="reg_content"><input type="text" class="textBox" disabled value="'+lst[i]["foodKrwPrice"]+'"></div></li>\n' +
                            '<li class="clear"><span class="tit_lbl">탑승객</span><div class="reg_content"><input type="text" class="textBox" disabled value="'+lst[i]["pasLastname"]+lst[i]["pasFirstname"]+'"></div></li></ul>';

                        $('#extraService').append(foodHTML);
                    }if(lst[i]["tbBaggageBagIdx"] != 21){   //21번은 수하물 디비에 저장된 "없음"
                        let bagHTML = '<ul class="leg_list"><li class="clear"><span class="tit_lbl">부가서비스 타입</span><div class="reg_content"><input type="text" class="textBox" disabled value="사전 수하물"></div></li>\n' +
                            '<li class="clear"><span class="tit_lbl">수하물 무게</span><div class="reg_content"><input type="text" class="textBox" disabled value="'+lst[i]["bagWeight"]+'"></div></li>\n' +
                            '<li class="clear"><span class="tit_lbl">결제금액</span><div class="reg_content"><input type="text" class="textBox" disabled value="'+lst[i]["bagPrice"]+'"></div></li>\n' +
                            '<li class="clear"><span class="tit_lbl">탑승객</span><div class="reg_content"><input type="text" class="textBox" disabled value="'+lst[i]["pasLastname"]+lst[i]["pasFirstname"]+'"></div></li></ul>';

                        $('#extraService').append(bagHTML);
                    }
                }
            })

        });
    }

});
