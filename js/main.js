var lotto = {};
lotto.numbersSet = new Set();
lotto.sliderRangeMin = 0;
lotto.sliderRangeMax = 49;

$(document).ready(function () {
    //localStorage.clear();

    $('#randomCard').hide();
    $('#amountsrb').buttonset();

    let amount = lotto.getAmountFromLocalStorage();
    if (amount != null && amount != "") {
        $('#' + amount).attr('checked', 'checked').button('refresh');
    }
    else {
        $('#6').attr('checked', 'checked').button('refresh');
    }

    let min = lotto.getMinFromLocalStorage();
    let max = lotto.getMaxFromLocalStorage();

    $('#slider-range').slider({
        min: lotto.sliderRangeMin,
        max: lotto.sliderRangeMax,
        values: [min, max],
        animate: 'slow',
        slide: function (event, ui) {
            $('#rangeTextMin').text(ui.values[0]);
            $( '#rangeTextMax').text( ui.values[1]);
        }
    });

    $('#rangeTextMin').text($('#slider-range').slider("values", 0));
    $( '#rangeTextMax').text($('#slider-range').slider("values", 1));

    $('#buttonGenerate').button().css('padding', '5px').click(lotto.generateNumbers);
    $('#set').button();
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
    $("#randomCard").fadeIn(700);
};

lotto.setRange = function() {
    localStorage.setItem("rangeMin", $('#rangeTextMin').text());
    localStorage.setItem("rangeMax", $('#rangeTextMax').text());
};

lotto.setValues = function() {
    let min = $('#slider-range').slider("values", 0);
    let max = $('#slider-range').slider("values", 1);
    localStorage.setItem("min", min);
    localStorage.setItem("max", max);

    let amount = $("#amountsrb :radio:checked").attr('id');
    localStorage.setItem("amount", amount);

    lotto.setRange();
    
    location.href = 'mainscreen.html';

    /*$("#btnRand").text("Get");
    $(".randomCard").hide();
    $("body").pagecontainer( "change", "#main", {transition: "fadeout(500)", showLoadMsg: true});*/
};

//-------------------------- Utils ----------------------------------------
lotto.getIntFromLocalStorage = function (item) {
    let itemText = localStorage.getItem(item);
    let value = (itemText != null && itemText != "")? parseInt(itemText) : -1;
    return value
};

lotto.getRangeMinFromLocalStorage = function (rangeMin, defaultValue) {
    let rMin = lotto.getIntFromLocalStorage(rangeMin);
    if(rMin == -1) {
        rMin = defaultValue;
    }
    return rMin;
};

lotto.getRangeMaxFromLocalStorage = function (rangeMax, defaultValue) {
    let rMax = lotto.getIntFromLocalStorage(rangeMax);
    if(rMax == -1) {
        rMax = defaultValue;
    }
    return rMax;
};

lotto.getMinFromLocalStorage = function () {
    let min = lotto.getIntFromLocalStorage('min');
    if(min == -1) {
        min = 0;
    }
    return min
};

lotto.getMaxFromLocalStorage = function () {
    let max = lotto.getIntFromLocalStorage('max');
    if(max == -1) {
        max = 50;
    }
    return max
};

lotto.getAmountFromLocalStorage = function () {
    let amount = lotto.getIntFromLocalStorage('amount');
    if(amount == -1) {
        amount = 6;
    }
    return amount
};

//$(document).on("pagechange", LOTTO.setFromLocalStorge);
