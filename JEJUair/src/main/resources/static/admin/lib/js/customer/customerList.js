let itemList = new Vue({
    el: '#itemList',            //아이디불러옴 vue 작동
    data: {
        itemList: {}
    }
});

$(document).on('click', '.search', function () {
    let customer = document.getElementById("customer").value;
    console.log(customer);

});
