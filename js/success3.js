$(document).ready(function () {

    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    }

    var count = randomInteger(79, 94);
    console.log(count);
    var date = new Date();
    date.setTime(date.getTime() + (1 * 60 * 1000));

    var x = $.cookie("curCount");
    $('.counter').html(x);
    // console.log(x);
    if (x == null) {
        $.cookie('curCount', count, {expires: date, path: '/success.html'});
        $('.counter').html(count);
    }

    $(".success-but").click(function (event) {
        window.location = 'https://online-investor.top ';
    });

});