// 승객 수
let passengerNum = Number(tripJson["schPassengerNum"]);
const divFare = Number(tripJson["divFare"]);
const divTax = Number(tripJson["divTax"]);
const divFuel = Number(tripJson["divFuel"]);

$('#divFare').find('.flight__cost')[0].innerHTML = divFare;
$('#divTax').find('.flight__cost')[0].innerHTML = divTax;
$('#divFuel').find('.flight__cost')[0].innerHTML = divFuel;
$('#spanCost').find('.flight__cost')[0].innerHTML =  Number(divFare) + Number(divTax) + Number(divFuel);

let divTabs = $('#divTabs');
let divPsgr = $('#divPsgr');

for (let i = 1; i < passengerNum; i++) {
    let divTabsHTML = '<div id="psgrTab' + i + '" class="tab__button" data-element="tab__list">'
        + '<button id="psgrBtn0' + i + '" class="tab__anchor" type="button" data-element="tab__anchor">'
        + '<span class="passenger"><span class="type">성인' + Number(i + 1) + '</span><strong id="tabName' + i + '" class="name"></strong>'
        + '</span></button></div></div>'

    let divPsgrHTML = '<div id="psgrContainer' + i + '" class="tab__panel" data-element="tab__panel" data-passengerkey="MCFBRFQ-" data-passenger-type="ADT" style="display: none;">\n' +
        '<div class="booking-check-box h-auto">\n' +
        '<div class="passenger-info-box"><div class="passenger-info">탑승객 정보</div><div class="button-wrap right"></div></div>\n' +
        '</div>\n' +
        '<div class="sub-section">\n' +
        '<input type="hidden" id="hidMemberGrade' + i + '" name="hidMemberGrade">\n' +
        '<input type="hidden" id="hidEnrollDate' + i + '" name="hidEnrollDate">\n' +
        '<input type="hidden" id="hidMemberId' + i + '" name="hidMemberId">\n' +
        '<input type="hidden" id="hidFriendNo' + i + '" name="hidFriendNo">\n' +
        '<input type="hidden" id="hidFfpNo' + i + '" name="hidFfpNo">\n' +
        '<div class="input-wrap input--line pc-col pc-col-2">\n' +
        '<div id="divName' + i + '" class="input-row pc-row-100">\n' +
        '<div id="txtLastName' + i + '_div" class="input-item">\n' +
        '<div class="input-box"><label for="txtLastName' + i + '" class="input__label">성<span title="required" class="input__label-asterisk">*</span></label>\n' +
        '<div data-element="form" class="input">\n' +
        '<input type="text" data-element="input" id="txtLastName' + i + '" name="txtLastName" class="input__text input_required txtLastNameClass" style="text-transform :uppercase;">\n' +
        '<button type="button" data-element="remove" class="input__remove-button"><span class="hidden">삭제</span></button>\n' +
        '</div>\n' +
        '</div>\n' +
        '<p tabindex="' + i + '" class="input__error">성을 입력해 주세요.</p>\n' +
        '</div>\n' +
        '<div id="txtFirstName' + i + '_div" class="input-item">\n' +
        '<div class="input-box">\n' +
        '<label for="txtFirstName' + i + '" class="input__label">이름<span title="required" class="input__label-asterisk">*</span></label>\n' +
        '<div data-element="form" class="input">\n' +
        '<input type="text" data-element="input" id="txtFirstName' + i + '" name="txtFirstName" class="input__text input_required txtFirstNameClass" style="text-transform :uppercase;">\n' +
        '<button type="button" data-element="remove" class="input__remove-button"><span class="hidden">삭제</span></button>\n' +
        '</div>\n' +
        '</div>\n' +
        '<p tabindex="' + i + '" class="input__error">이름을 입력해 주세요.</p>\n' +
        '</div>\n' +
        '</div>\n' +
        '<div class="input-row pc-mgl-0 boarding__gender">\n' +
        '<div class="radio-wrapper">\n' +
        '<p class="radio__text">성별<span title="required" class="input__label-asterisk">*</span></p>\n' +
        '<div class="radio-wrap">\n' +
        '<span class="radio">\n' +
        '<input type="radio" id="rdoGenderM' + i + '" name="rdoGender' + i + '" value="1" class="radio__input" checked>\n' +
        '<label for="rdoGenderM' + i + '" class="radio__label"> <i aria-hidden="true" class="radio__ico"></i><span>남자</span></label>\n' +
        '</span>\n' +
        '<span class="radio">\n' +
        '<input type="radio" id="rdoGenderW' + i + '" name="rdoGender' + i + '" value="2" class="radio__input">\n' +
        '<label for="rdoGenderW' + i + '" class="radio__label"> <i aria-hidden="true" class="radio__ico"></i><span>여자</span></label>\n' +
        '</span>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '<div id="divBirth' + i + '" class="input-row input-row--label boarding__column">\n' +
        '<div id="birth' + i + '_div" class="boarding__birth">\n' +
        '<div class="input-label label-top">생년월일<span title="required" class="input__label-asterisk">*</span></div>\n' +
        '<div class="input-item" data-element="form">\n' +
        '<div class="input-flex">\n' +
        '<div class="input-box label-active">\n' +
        '<div class="input" data-element="form">\n' +
        '<input type="text"\n' +
        'class="input__text input__text--placeholder input_required txtYearClass" id="txtYear' + i + '" name="txtYear" maxlength="4" data-element="input" title="연도 입력" placeholder="년">\n' +
        '<button type="button" data-element="remove" class="input__remove-button">삭제</button>\n' +
        '</div>\n' +
        '</div>\n' +
        '<div class="input-box">\n' +
        '<div class="select-wrap select-wrap--line" style="border-bottom: 0px solid black">\n' +
        '<select class="select-wrap__select input_required selMonthClass" id="selMonth' + i + '" name="selMonth" title="월 선택"><option value="">월</option></select>\n' +
        '</div>\n' +
        '</div>\n' +
        '<div class="input-box">\n' +
        '<div class="select-wrap select-wrap--line" style="border-bottom: 0px solid black">\n' +
        '<select class="select-wrap__select input_required selDateClass" id="selDate' + i + '" name="selDate" title="일 선택"><option value="">일</option></select>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '<p tabindex="' + i + '" class="input__error">생년월일을 정확히 입력해 주세요.</p>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '<div class="input-row">\n' +
        '<div class="input-label label-top">국적 (여권)<span title="required" class="input__label-asterisk">*</span></div>\n' +
        '<div class="input-box ">\n' +
        '<div class="select-wrap select-wrap--line">\n' +
        '<input type="text" id="hidNationality' + i + '" class="input_required" name="hidNationality" style="display:none">\n' +
        '<button class="select-wrap__button active" type="button" id="btnNationality' + i + '" name="btnNationality">대한민국(KOREA, REPUBLIC OF)</button>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>\n' +
        '<div class="sub-section">\n' +
        '<div class="checkbox checkbox--small">\n' +
        '<input type="checkbox" id="chkSave' + i + '" data-element="checkbox" class="checkbox__input" checked>\n' +
        '<label for="chkSave' + i + '" class="checkbox__label"> <i aria-hidden="true" class="checkbox__ico"></i> <span>탑승객 정보 저장</span></label>\n' +
        '</div>\n' +
        '<span data-element="tooltip" role="tooltip" class="tooltip" data-set="{\'width\': \'600\', \'left\':\'-100\', \'arrow\' : \'100\'}">\n' +
        '<button type="button" class="tooltip__button" aria-label="탑승객 정보 저장 툴팁 열기" data-element="tooltip__anchor"></button>\n' +
        '<span class="tooltip__panel" data-element="tooltip__panel"><span class="tooltip-arrow" aria-hidden="true"></span>\n' +
        '<span class="tooltip-desc">박스에 체크하시면 다음 예매할 때 따로 입력하지 않아도 정보를 불러올 수 있어요!</span>\n' +
        '</span>\n' +
        '</span>\n' +
        '</div>\n' +
        '</div>'

    divTabs.append(divTabsHTML);
    divPsgr.append(divPsgrHTML);
}

for (let i = 0; i < passengerNum; i++) {

    for (let j = 1; j <= 12; j++) {
        let selM = '#selMonth' + i;
        let option = document.createElement('option');
        option.innerText = String(j);
        option.value = String(j);
        $(selM).append(option);
    }
    for (let j = 1; j <= 31; j++) {
        let selD = '#selDate' + i;
        let option = document.createElement('option');
        option.innerText = String(j);
        option.value = String(j);
        $(selD).append(option);
    }
}

$(document.body).on("change", checkEmpty);

function checkEmpty() {
    let totalCnt = 2 + passengerNum;
    let filledCnt = 0;
    let txtContactPhone = $('#txtContactPhone').val() == 0 ? 0 : 1;
    let txtContactEmail = $('#txtContactEmail').val() == 0 ? 0 : 1;
    let txtCnt = new Array();
    for (let i = 0; i < passengerNum; i++) {
        let txtLN = '#txtLastName' + i;
        let txtFN = '#txtFirstName' + i;
        let txtY = '#txtYear' + i;
        selM = '#selMonth' + i;
        selD = '#selDate' + i;

        let txtLastName = $(txtLN).val() == 0 ? 0 : 1;
        let txtFirstName = $(txtFN).val() == 0 ? 0 : 1;
        let txtYear = $(txtY).val() == 0 ? 0 : 1;
        let selMonth = $(selM).val() == 0 ? 0 : 1;
        let selDate = $(selD).val() == 0 ? 0 : 1;
        txtCnt[i] = txtLastName + txtFirstName + txtYear + selMonth + selDate != 5 ? 0 : 1;
    }
    filledCnt += txtContactEmail + txtContactPhone;
    for (let i = 0; i < passengerNum; i++) {
        filledCnt += txtCnt[i];
    }
    if (filledCnt >= totalCnt) {
        $('#btnOK').attr('disabled', false);
        document.getElementById("btnOK").classList.add('button--active');
    } else {
        $('#btnOK').attr('disabled', true);
        document.getElementById("btnOK").classList.remove('button--active');
    }
}


$(document).on('click', '#btnOK', function () {
    let passJson = {
        memHp: $('#txtContactPhone').val(),
        memEmail: $('#txtContactEmail').val()
    }

    for (let i = 0; i < Number(tripJson["schPassengerNum"]); i++) {
        console.log(document.querySelectorAll(".txtLastNameClass")[i]);
        passJson["passLastName"+i] = document.querySelectorAll(".txtLastNameClass")[i].value;
        passJson["passFirstName"+i] = document.querySelectorAll(".txtFirstNameClass")[i].value;
        passJson["passYear"+i] = document.querySelectorAll(".txtYearClass")[i].value;
        passJson["selMonth"+i] = document.querySelectorAll(".selMonthClass")[i].value;
        passJson["selDate"+i] = document.querySelectorAll(".selDateClass")[i].value;
        console.log(document.querySelectorAll(".txtLastNameClass")[i].value);
    }
    console.log(passJson)

    localStorage.setItem("passJson", JSON.stringify(passJson));
    location.href="/user/oneway/seat_select";
})