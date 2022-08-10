$(function(){
    let closeBtn = document.getElementById('subClose')
    closeBtn.onclick = function (){
        let closeTab = document.querySelector(".default-message--sub")
        closeTab.style.display = "none"
    }

    let mealList = new Vue({
        el: '#divMealList',
        data: {
            mealList: {}
        }
    });

    searchStart(0);

    function searchStart(index){
        // let category = document.getElementById("category").getAttribute("value");
        $.get("/api/food?page="+index, function(response) {
            console.log(response)

            mealList.mealList = response.data;
        })
    }

    console.log(mealList.mealList)




    let reserveRoute = document.getElementById('reserveRoute').getAttribute("value")

    route()
    function route(){
        if(reserveRoute == 'oneway'){

            console.log(reserveRoute == 'oneway')
            document.getElementById('roundOut').style.display = "none";
        }if(reserveRoute == 'round'){
            document.getElementById('roundOut').innerText = "block";
        }
    }

})

// const openSelectMeal = (e) => {
//     const target = e.target.dataset.num;
//     console.log(target)
//     let openTab = document.getElementById('selectMeal')
//     openTab.style.display = "block"
// };

function openSelectMeal(item){
    let view = new Vue({
        dl: '#selectMeal',
        data: {
            view: {}
        }
    });
    console.log(item)
    let readItem

    readView(item)
    function readView(index){
        $.get("/api/food/"+index, function (response){
            console.log(response)
            readItem = response.data;
            document.getElementById('foodName').innerText = `${readItem.foodKorName}`
            document.getElementById('foodPrice').innerText = `${readItem.foodKrwPrice}`
            view.view = response.data;
            openTp()
        })
    }


    function openTp(){
        console.log("들어옴")
        let openTab = document.getElementById('selectMeal')
        openTab.style.display = "block"
    }

}

function selectParse(){

}

function closeSelectMeal(){
    let closeTab = document.getElementById('selectMeal')
    closeTab.style.display = "none"
}

$(document).on('click', '.selected', function (){
    openSelectMeal(this.value)
})

$(document).on('click', '#che', function (){
    console.log('들어옴2')
    if(this.checked == true){
        this.checked = false

    }else {
        this.checked = true
    }
})

$(document).on('click', '.checkbox-line-item', function (){
    console.log('들어옴1')
    if(this.classList.length == 1){
        this.classList.add('is-active');
        let check = this.firstElementChild.firstElementChild
        let che = this.firstElementChild.firstElementChild.checked;
        check.checked = true;
        // console.log(che)
        sumprice()
        let btnSelect = document.getElementById('btnComplete');
        btnSelect.classList.add('button--active')
        btnSelect.disabled = false;
        console.log(btnSelect.disabled)
    }else {
        this.classList.remove('is-active');
        let check = this.firstElementChild.firstElementChild
        let che = this.firstElementChild.firstElementChild.checked;
        check.checked = false;
        // console.log(che)
        minPrice()
        console.log(document.getElementsByClassName('is-active').length)
        if(document.getElementsByClassName('is-active').length == 2){
            let btnSelect = document.getElementById('btnComplete');
            btnSelect.classList.remove('button--active');
            btnSelect.disabled = true;
        }

    }

})


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

let passengerNum = tripJson["schPassengerNum"];
const divFare = tripJson["divFare"];
const divTax = tripJson["divTax"];
const divFuel = tripJson["divFuel"];
const divSeat = tripJson["divSeat"];
const spanCost = tripJson["spanCost"];
const divBaggageFee = tripJson["divBaggageFee"];

$('#divFare').find('.flight__cost')[0].innerHTML = divFare;
$('#divTax').find('.flight__cost')[0].innerHTML = divTax;
$('#divFuel').find('.flight__cost')[0].innerHTML = divFuel;
$('#divSeatFee').find('.flight__cost')[0].innerHTML = divSeat;
$('#spanCost').find('.flight__cost')[0].innerHTML = spanCost;
$('#divBaggage').find('.flight__cost')[0].innerHTML = divBaggageFee;

let passengerNames = []
for (let i = 0; i < passengerNum; i++) {
    passengerNames[i] = passJson["passLastName"+i]+passJson["passFirstName"+i]
    console.log(passengerNames[i])

}

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

function minPrice(){
    let mealPrice = document.getElementById('foodPrice').innerText;
    mealPrice *= 1
    let sumPrice = document.getElementById('sumPrice').innerText;
    sumPrice *= 1
    sumPrice = sumPrice - mealPrice;
    document.getElementById('sumPrice').innerText = sumPrice;
}


// $(document).on('click', '#closeSelectMeal', function (){
//     let checkper = document.getElementsByClassName('.checkbox-line-item');
//     let cj = document.getElementById('divPassengerTab');
//     console.log(cj.childElementCount)
//     console.log(cj.firstElementChild)
//     console.log(checkper)
//     let btnSelect = document.getElementById('btnComplete');
//
//     for(let i=0; i<checkper.length; i++){
//         checkper[i].classList.remove('is-active');
//         console.log(checkper[i])
//         let check = checkper[i].firstElementChild.firstElementChild;
//         check.checked = false;
//         console.log(check.checked)
//     }
//     btnSelect.classList.remove('button--active');
//     document.getElementById('sumPrice').innerText = '0';
// })
let totalPrice = 0;
$(document).on('click', '#btnComplete', function (){
    let checkPer = document.getElementById('divPassengerTab');
    totalPrice += (document.getElementById('sumPrice').innerText * 1);

    for(let i=2; i<checkPer.children.length; i++){
        checkPer.children[i].classList.remove('is-active');
        console.log(checkPer.children[i])
        let check = checkPer.children[i].firstElementChild.firstElementChild;
        if(check.checked == true){
            passJson["pasMeal"+i] = Number(document.getElementById('foodPrice').innerText);
            // passJson["divMealName"+i] = "";
            console.log(document.getElementById('foodPrice').innerText);
        }else if(check.checked == false){
            passJson["pasMeal"+i] = 0;
        }

        check.checked = false;
        console.log(check.checked)
    }
    tripJson["divMealFee"] = Number(document.getElementById('sumPrice').innerText);

    tripJson["spanCost"] = tripJson["divSeat"] + divFare + divTax + divFuel + tripJson["divBaggageFee"] + tripJson["divMealFee"];
    localStorage.setItem("passJson", JSON.stringify(passJson));
    localStorage.setItem("tripJson", JSON.stringify(tripJson));

    console.log(passJson)
    console.log(tripJson)
    // location.href="/user/view_confirm";

    this.classList.remove('button--active');
    document.getElementById('sumPrice').innerText = '0';
})