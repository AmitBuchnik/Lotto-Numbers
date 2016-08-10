var lotto = {};
lotto.numbersSet = new Set();
lotto.sliderRangeMin = 1;
lotto.sliderRangeMax = 49;

$(document).ready(function () {
    //localStorage.clear();
    $('#randomCard').hide();
});

lotto.generateNumbers = function () {
    let amount = lotto.getAmountFromLocalStorage();
    let min = lotto.getMinFromLocalStorage();
    let max = lotto.getMaxFromLocalStorage();

    lotto.numbersSet.clear();

    while (lotto.numbersSet.size < amount) {
        let num = math.randomInt(min, max);
        lotto.numbersSet.add(num);
    }

    let temp = '';
    lotto.numbersSet.forEach((v1, v2) => {
        temp += v1 + ', ';
    });
    temp = temp.slice(0, temp.length - 2)
    $('#randomNumbers').html(temp);

    $('#buttonGenerate').text('Try again');
    $("#randomCard").fadeIn(800);
};

lotto.setValues = function() {
    let min = $('#minRange').val();
    let max = $('#maxRange').val();
    localStorage.setItem("min", min);
    localStorage.setItem("max", max);

    let amount = $("#amountsrb :radio:checked").attr('id');
    localStorage.setItem("amount", amount);

    $("#buttonGenerate").text("Generate Numbers");
    $('#randomCard').hide();
    $("body").pagecontainer("change", "#main", {transition: "fadeout(500)", showLoadMsg: true});
};

//-------------------------- Utils ----------------------------------------
lotto.getIntFromLocalStorage = function (item) {
    let itemText = localStorage.getItem(item);
    let value = (itemText != null && itemText != "")? parseInt(itemText) : -1;
    return value;
};

lotto.getMinFromLocalStorage = function () {
    let min = lotto.getIntFromLocalStorage('min');
    if(min == -1) {
        min = 0;
    }
    return min;
};

lotto.getMaxFromLocalStorage = function () {
    let max = lotto.getIntFromLocalStorage('max');
    if(max == -1) {
        max = 50;
    }
    return max;
};

lotto.getAmountFromLocalStorage = function () {
    let amount = lotto.getIntFromLocalStorage('amount');
    if(amount == -1) {
        amount = 6;
    }
    return amount;
};

$(document).on( "pagecontainerchange", function( event, ui ) {
    if(ui.toPage[0].id == 'settings') {
        let amount = lotto.getAmountFromLocalStorage();
        if (amount != null || amount != "") {
            $('#' + amount).attr('checked', 'checked');
            $("input[type='radio']").checkboxradio("refresh");
        }
        else {
            $('#6').attr('checked', 'checked');
            $("input[type='radio']").checkboxradio("refresh");
        }
    }
});

/*$(document).on("pagechange", function (event) {
    let amount = lotto.getAmountFromLocalStorage();
    if (amount != null || amount != "") {
        $('#' + amount).attr('checked', 'checked'); //.button('refresh');
    }
});*/
