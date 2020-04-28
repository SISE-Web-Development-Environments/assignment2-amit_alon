function settings() {

    // Change screens
    displayNoneAllScreens()
    document.getElementById("settingsScreen").style.display = 'block';

    // build reange slider
    rangeSlider();

    // prevent from random button to refresh + random values
    $("#randomButton").click(function (e) {
        e.preventDefault();
        randomValues();
    })

    $("#settingsForm").submit(function (e) {
        e.preventDefault();
        setUpGame();
    })
}

// get the keys values from the form
function setUpKey(event) {
    keyUP = event.which;
}

function setDownKey(event) {
    keyDown = event.which;
}
function setLeftKey(event) {
    keyLeft = event.which;
}
function setRightKey(event) {
    keyRight = event.which;
}

function displaySettings(){
    
    //fix!
    $("#UpkeyView").val(String.fromCharCode(keyUP));
    $("#DwonkeyView").val(String.fromCharCode(keyDown));
    $("#LeftkeyView").val(String.fromCharCode(keyLeft));
    $("#RightkeyView").val(String.fromCharCode(keyRight));
    $("#length").val(gameLength);
    $("#monstersNum").val(num_of_monsters);
    $("#candyNum").val(candy_num);
    $(".color_5").css("background-color",color_5_Points);
    $(".color_15").css("background-color",color_15_Points);
    $(".color_25").css("background-color",color_25_Points);

 

}



function randomValues() {

    let tmp;

    // random values
    $("#up").val("Arrow up");//38
    $("#down").val("Arrow down");//40
    $("#left").val("Arrow left");//37
    $("#right").val("Arrow right");//39

    keyUP = 38;
    keyDown = 40;
    keyLeft = 37;
    keyRight = 39;


    tmp = getRndInteger(50, 90);
    $("#candyAmount").val(tmp);
    $("#candyAmount").next().val(tmp);

    tmp = getRndInteger(1, 4);
    $("#monstersAmount").val(tmp);
    $("#monstersAmount").next().val(tmp);

    tmp = getRndInteger(1, 6);
    $("#gameLength").val(tmp);
    $("#gameLength").next().val(tmp);

    $("#color_5_Points").val(getRandomColor());
    $("#color_15_Points").val(getRandomColor());
    $("#color_25_Points").val(getRandomColor());

}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// This JavaScript function always returns a random number between min and max (both included):
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function rangeSlider() {
    var slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value');

    slider.each(function () {

        value.each(function () {
            var value = $(this).prev().attr('value');
            $(this).html(value);
        });

        range.on('input', function () {
            $(this).next(value).html(this.value);
        });
    });
};


function updateRangeInput(elem) {
    $(elem).next().val($(elem).val());
}

function updateRangeInputSlider(elem) {
    $(elem).next().val($(elem).val());
}

function getSettingValues() {
    // get the values from the form
    candy_num = $("#candyAmount").val();
    num_of_monsters = $("#monstersAmount").val();
    color_5_Points = $("#color_5_Points").val();
    color_15_Points = $("#color_15_Points").val();
    color_25_Points = $("#color_25_Points").val();
    gameLength = $("#gameLength").val();
}