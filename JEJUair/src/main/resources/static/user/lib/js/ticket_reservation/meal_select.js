$(function(){
    console.log(tripJson.resRoute)
    // 편도 왕복에 따라 변화
    reserveProgress()


    // 첫 제목 안내 닫기 버튼 활성화
    let closeBtn = document.getElementById('subClose')
    closeBtn.onclick = function (){
        let closeTab = document.querySelector(".default-message--sub")
        closeTab.style.display = "none"
    }

    // 기내식 리스트 뽑기
    let mealList = new Vue({
        el: '#divMealList',
        data: {
            mealList: {}
        }
    });

    searchStart(0);

    function searchStart(index){
        // let category = document.getElementById("category").getAttribute("value");
        $.get("/api/food/findList?page="+index, function(response) {
            console.log(response)

            mealList.mealList = response.data;
        })
    }

    console.log(mealList.mealList)




})

// const openSelectMeal = (e) => {
//     const target = e.target.dataset.num;
//     console.log(target)
//     let openTab = document.getElementById('selectMeal')
//     openTab.style.display = "block"
// };



// 담기(selected) 클릭 이벤트
$(document).on('click', '.selected', function (){
    openSelectMeal(this.value)
})

// 기내식 선택 모달창 열어주는 함수
function openSelectMeal(item){
    let view = new Vue({
        dl: '#selectMeal',
        data: {
            view: {}
        }
    });
    console.log(item)
    readView(item, view)
}

// controller 에서 get방식으로 기내식 정보를 받아옴
function readView(index, view){
    $.get("/api/food/"+index, function (response){
        console.log(response)
        let readItem = response.data;
        document.getElementById('foodName').innerText = `${readItem.foodKorName}`
        document.getElementById('foodPrice').innerText = `${readItem.foodKrwPrice}`
        document.getElementById('foodIdx').innerText = `${readItem.foodIdx}`
        document.getElementById('card_image').src = `${readItem.foodPicture}`
        view.view = response.data;
        openTp()
    })
}

// 기내식 모달창 block 처리
function openTp(){
    console.log("들어옴")
    let openTab = document.getElementById('selectMeal')
    openTab.style.display = "block"
}
// 기내식 모달창 none 처리
function closeSelectMeal(){
    let closeTab = document.getElementById('selectMeal')
    closeTab.style.display = "none"
}




// $(document).on('click', '#che', function (){
//     console.log('들어옴2')
//     if(this.checked == true){
//         this.checked = false
//     }else {
//         this.checked = true
//     }
// })

$(document).on('click', '.checkbox-line-item', function (){
    // console.log('들어옴1')
    if(this.classList.length == 1){
        addPer(this);
        sumprice();
        btnSelectON();
    }else if(this.classList.length == 2) {
        removePer(this);
        minPrice();
        btnSelectOff();

    }else {
        resetPer(this);
        resetPrice(this);
    }

})


// 기내식 선택 승객 활성화
function addPer(person){
    person.classList.add('is-active');
    let check = person.firstElementChild.firstElementChild;
    check.checked = true;
}
// 기내식 선택 승객 비활성화
function removePer(person){
    person.classList.remove('is-active');
    let check = person.firstElementChild.firstElementChild;
    check.checked = false;
}
// 기내식 선택 완료 승객 비활성화
function resetPer(person){
    console.log('선택완료취소 들어옴');
    // exPasMeal[i-2] = Number(document.getElementById('foodPrice').innerText);
    // exPasMealName[i-2] = document.getElementById('foodName').innerText;
    person.classList.remove('is-active');
    person.classList.remove('selectedItem');
    let check = person.firstElementChild.firstElementChild;
    let mealName = person.firstElementChild.lastElementChild.children[1];
    check.checked = false;
    mealName.style.display = 'none';
    mealName.innerText = '';
}

// 선택완료 버튼 활성화
function btnSelectON(){
    let btnSelect = document.getElementById('btnComplete');
    btnSelect.classList.add('button--active')
    btnSelect.disabled = false;
    console.log(btnSelect.disabled)
}
// 선택완료 버튼 비활성화
function btnSelectOff(){
    // console.log(document.getElementsByClassName('is-active').length)
    if(document.getElementsByClassName('is-active').length == 2){
        let btnSelect = document.getElementById('btnComplete');
        btnSelect.classList.remove('button--active');
        btnSelect.disabled = true;
    }
}
// 추가 금액 활성화
function sumprice(){
    let mealPrice = document.getElementById('foodPrice').innerText;
    mealPrice *= 1
    // console.log(mealPrice)
    let sumPrice = document.getElementById('sumPrice').innerText;
    sumPrice *= 1
    // console.log(sumPrice)
    sumPrice = sumPrice + mealPrice;
    // console.log(sumPrice)
    document.getElementById('sumPrice').innerText = sumPrice;
}
// 추가금액 비활성화
function minPrice(){
    let mealPrice = document.getElementById('foodPrice').innerText;
    mealPrice *= 1
    let sumPrice = document.getElementById('sumPrice').innerText;
    sumPrice *= 1
    sumPrice = sumPrice - mealPrice;
    document.getElementById('sumPrice').innerText = sumPrice;
}




// function is_checked() {
//     console.log("들어옴")
//     // 1. checkbox element를 찾습니다.
//     const checkbox = document.getElementById('cke');
//
//     // 2. checked 속성을 체크합니다.
//     const is_checked = checkbox.checked
//     console.log(is_checked)
//
// }

// json데이터 초기화
let passengerNum = tripJson["schPassengerNum"];
// const divFare = tripJson["divFare"];
// const divTax = tripJson["divTax"];
// const divFuel = tripJson["divFuel"];
// const divSeat = tripJson["divSeat"];
// const divBaggageFee = tripJson["divBaggageFee"];
tripJson["divMealFee"] = 0;
tripJson2["divMealFee"] = 0;
tripJson["spanCost"] = tripJson["divSeat"]
    + tripJson["divFare"] + tripJson["divTax"]
    + tripJson["divFuel"] + tripJson["divBaggageFee"] + tripJson["divMealFee"];
tripJson2["spanCost"] = tripJson2["divSeat"]
    + tripJson2["divFare"] + tripJson2["divTax"]
    + tripJson2["divFuel"] + tripJson2["divBaggageFee"] + tripJson2["divMealFee"];

// let spanCost = tripJson["spanCost"];

// json 데이터 입력
$('#divFare').find('.flight__cost')[0].innerHTML = (tripJson.divFare + tripJson2.divFare).toLocaleString();
$('#divTax').find('.flight__cost')[0].innerHTML = (tripJson.divTax + tripJson2.divTax).toLocaleString();
$('#divFuel').find('.flight__cost')[0].innerHTML = (tripJson.divFuel + tripJson2.divFuel).toLocaleString();
$('#divSeatFee').find('.flight__cost')[0].innerHTML = (tripJson.divSeat + tripJson2.divSeat).toLocaleString();
$('#divBaggage').find('.flight__cost')[0].innerHTML =  (tripJson.divBaggageFee + tripJson2.divBaggageFee).toLocaleString();
$('#spanCost').find('.flight__cost')[0].innerHTML =  (tripJson.spanCost + tripJson2.spanCost).toLocaleString();





$('#divMealFee').find('.flight__cost')[0].innerHTML =  (tripJson.divMealFee + tripJson2.divMealFee).toLocaleString();

// 승객이름 배열 선언
let passengerNames = [];
// 승객 기내식 선택 임시 배열 선언
let exPasMeal = [];
let exPasMeal2 = [];
let exPasMealName = [];
let exPasMealName2 = [];
for (let i = 0; i < passengerNum; i++) {
    passengerNames[i] = passJson["passLastName"+i]+passJson["passFirstName"+i]
    console.log(passengerNames[i])
    exPasMeal[i] = 0;
    exPasMeal2[i] = 0;
    passJson["pasMeal"+i] = 0;
    passJson2["pasMeal"+i] = 0;
    exPasMealName[i] = 'none';
    exPasMealName2[i] = 'none';
    passJson["pasMealName"+i] = 'none';
    passJson2["pasMealName"+i] = 'none';
    passJson["pasMealIdx" + i] = 0;
    passJson2["pasMealIdx" + i] = 0;
}

let totalPrice = 0;



// 선택 완료 클릭 이벤트 활성화
$(document).on('click', '#btnComplete', function (){
    let checkPer = document.getElementById('divPassengerTab');  // 선택 승객
    totalPrice += (document.getElementById('sumPrice').innerText * 1);  // 전체 가격

    for(let i=2; i<checkPer.children.length; i++){
        // console.log(checkPer.children[i])
        let check = checkPer.children[i].firstElementChild.firstElementChild;   // 승객이 선택했는지 check를 가진 테그
        let mealName = checkPer.children[i].firstElementChild.lastElementChild.children[1]; // 선택한 기내식 이름이 담길 테그
        if(check.checked == true && checkPer.children[i].classList.length != 3){
            if(checkPer.children[i].firstElementChild.classList.length == 2){
                exPasMeal[i-2] = Number(document.getElementById('foodPrice').innerText);
                exPasMealName[i-2] = document.getElementById('foodName').innerText;
                passJson["pasMeal"+(i-2)] = Number(document.getElementById('foodPrice').innerText);
                passJson["pasMealName"+(i-2)] = document.getElementById('foodName').innerText;
                passJson["pasMealIdx" + (i-2)] = Number(document.getElementById('foodIdx').innerText);
                tripJson["divMealFee"] += Number(document.getElementById('foodPrice').innerText);
                checkPer.children[i].firstElementChild.firstElementChild.classList.add('selected' + (i-2) );
                tripJson["spanCost"] = tripJson["spanCost"] + passJson["pasMeal"+(i-2)];
            }else if(checkPer.children[i].firstElementChild.classList.length == 3){
                exPasMeal2[i-2-passengerNum] = Number(document.getElementById('foodPrice').innerText);
                exPasMealName2[i-2-passengerNum] = document.getElementById('foodName').innerText;
                passJson2["pasMeal"+(i-2-passengerNum)] = Number(document.getElementById('foodPrice').innerText);
                passJson2["pasMealName"+(i-2-passengerNum)] = document.getElementById('foodName').innerText;
                passJson2["pasMealIdx" + (i-2-passengerNum)] = Number(document.getElementById('foodIdx').innerText);
                tripJson2["divMealFee"] += Number(document.getElementById('foodPrice').innerText);
                checkPer.children[i].firstElementChild.firstElementChild.classList.add('selected' + (i-2-passengerNum) );
                tripJson2["spanCost"] = tripJson2["spanCost"] + passJson2["pasMeal"+(i-2-passengerNum)];
            }

            // console.log(document.getElementById('foodPrice').innerText);
            // checkPer.children[i].classList.remove('is-active');
            checkPer.children[i].classList.add('selectedItem');

            console.log(checkPer.children[i].firstElementChild.classList[2]);
            console.log(divMealFee)
            // console.log(checkPer.children[i].classList[1])
            mealName.style.display = 'block';
            mealName.innerText = '(' + document.getElementById('foodName').innerText + ' - 선택 취소) '

        }

        // tripJson["divMealFee"] = Number(document.getElementById('sumPrice').innerText);
        localStorage.setItem("passJson", JSON.stringify(passJson));
        localStorage.setItem("tripJson", JSON.stringify(tripJson));

        // console.log(passJson)
        // console.log(tripJson)
        // location.href="/user/oneway/view_confirm";

        // console.log(check.checked)
    }
    $('#divMealFee').find('.flight__cost')[0].innerHTML =  (tripJson.divMealFee + tripJson2.divMealFee).toLocaleString();
    $('#spanCost').find('.flight__cost')[0].innerHTML =  (tripJson.spanCost + tripJson2.spanCost).toLocaleString();
    console.log("passJson");
    console.log(passJson);
    console.log("tripJson");
    console.log(tripJson);
    console.log("passJson2");
    console.log(passJson2);
    console.log("tripJson2");
    console.log(tripJson2);
    this.classList.remove('button--active');
    document.getElementById('sumPrice').innerText = '0';
})

// 기내식 선택완료 가격 초기화
function resetPrice(item){
    let perNum = item.firstElementChild.firstElementChild.classList[1].charAt(8);
    if(item.firstElementChild.classList.length == 2){
        tripJson["spanCost"] -= exPasMeal[perNum];
        tripJson["divMealFee"] -= exPasMeal[perNum];
        passJson["pasMeal"+perNum] = 0;
        passJson["pasMealName"+perNum] = 'none';
        passJson["pasMealIdx" + perNum] = 0;

    }else if(item.firstElementChild.classList.length == 3){
        tripJson2["spanCost"] -= exPasMeal2[perNum];
        tripJson2["divMealFee"] -= exPasMeal2[perNum];
        passJson2["pasMeal"+perNum] = 0;
        passJson2["pasMealName"+perNum] = 'none';
        passJson2["pasMealIdx" + perNum] = 0;
    }

    $('#divMealFee').find('.flight__cost')[0].innerHTML =  (tripJson.divMealFee + tripJson2.divMealFee).toLocaleString();
    $('#spanCost').find('.flight__cost')[0].innerHTML =  (tripJson.spanCost + tripJson2.spanCost).toLocaleString();

}

$(document).on('click', '.selectedItem', function (){
    console.log("selected 들어옴")
})


function reserveProgress(){
    if(tripJson.resRoute === "ONEWAY"){
        document.getElementById('roundOut').style.display = "none";
    }else {
        document.getElementById('roundOut').style.display = "block";

        for (let i = 0; i < passengerNum; i++) {
            console.log("들어옴")
            let passengerHTML = '<div class="checkbox-line-item" style="margin-bottom: 20px; display: none;">\n' +
                '                                        <span class="checkbox checkbox--small roundOut">\n' +
                '                                            <input type="checkbox" class="checkbox__input" id="che">\n' +
                '                                            <label class="checkbox__label">\n' +
                '                                                <i aria-hidden="true" class="checkbox__ico"></i>\n' +
                '                                                <span name="spanCkPaxKey" style=" color: gold;"></span>\n' +
                '                                                <span name="spanCkPax">' + passengerNames[i] + '</span>\n' +
                '                                            </label>\n' +
                '                                        </span>\n' +
                '                                    </div>';
            $('#divPassengerTab').append(passengerHTML);
        }
    }
}

// 왕복

$(document).on('click', '#roundOut', function (){
    if(tripJson.resRoute === "ONEWAY"){
        document.getElementById('roundOut').style.display = "none";
    }else {
        document.getElementsByClassName('tab__anchor')[0].classList.remove('is-active');
        document.getElementsByClassName('tab__anchor')[1].classList.add('is-active');
    }
    let point = document.getElementsByClassName('checkbox-line-item')
    console.log(point.length)

    for(let i = 0; i < point.length; i++){
        let classNum = document.getElementsByClassName('checkbox--small')[i].classList.length
        console.log(classNum)
        if(classNum == 3){
            point[i].style.display = "block";
        }else{
            point[i].style.display = "none";
        }
    }
})

$(document).on('click', '#roundGo', function (){
    if(tripJson.resRoute === "ONEWAY"){
        document.getElementById('roundOut').style.display = "none";
    }else {
        document.getElementsByClassName('tab__anchor')[1].classList.remove('is-active');
        document.getElementsByClassName('tab__anchor')[0].classList.add('is-active');
    }
    let point = document.getElementsByClassName('checkbox-line-item')
    console.log(point.length)
    for(let i = 0; i < point.length; i++){

        let classNum = document.getElementsByClassName('checkbox--small')[i].classList.length;
        console.log(classNum)
        if(classNum == 3){
            point[i].style.display = "none";
        }else{
            point[i].style.display = "block";
        }
    }
})


$(document).on('click', '#btnNextPC', function () {

    localStorage.setItem("passJson", JSON.stringify(passJson));
    localStorage.setItem("tripJson", JSON.stringify(tripJson));
    localStorage.setItem("passJson2", JSON.stringify(passJson2));
    localStorage.setItem("tripJson2", JSON.stringify(tripJson2));

    location.href="/user/view_confirm";

})

// $(document).on('click', '#roundGo', function (){
//     if(tripJson.resRoute === "ONEWAY"){
//         document.getElementById('roundOut').style.display = "none";
//     }else {
//         document.getElementsByClassName('tab__anchor')[1].classList.remove('is-active');
//         document.getElementsByClassName('tab__anchor')[0].classList.add('is-active');
//     }
//     document.getElementById('sumPrice').innerText = '0';
//     for(let i = 0; i < passengerNum; i++) {
//         let point = document.getElementsByClassName('checkbox-line-item')[i];
//         let check = point.firstElementChild.firstElementChild;
//         let mealName = point.firstElementChild.lastElementChild.children[1];
//         if(passJson2["pasMeal"+i] == 0){
//             removePer(point);
//             btnSelectOff();
//         }else if(passJson2["pasMeal"+i] != 0){
//             check.checked = 'true';
//             mealName.style.display = 'block';
//             mealName.innerText = '(' + document.getElementById('foodName').innerText + ' - 선택 취소) '
//         }
//     }
//
// })
//
// $(document).on('click', '.roundOut', function (){
//
//     // console.log('들어옴1')
//     if(this.classList.length == 1){
//         addPer(this);
//         sumprice();
//         btnSelectON();
//     }else if(this.classList.length == 2) {
//         removePer(this);
//         minPrice();
//         btnSelectOff();
//
//     }else {
//         resetPer(this);
//         resetPrice(this);
//     }
//
// })