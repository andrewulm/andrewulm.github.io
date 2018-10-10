$(document).ready(function () {

    // Fixed header after first splash div has been scrolled
    $(window).scroll(function(){
        if ($(window).scrollTop() > $('#splash').height()){
            $('nav').addClass('fixed-header');
        }
        else {
            $('nav').removeClass('fixed-header');
        }
    });


    $('#name').on('click', function () {
        $('html, body').animate({
            scrollTop: $('#nav').offset().top
        }, 500)
    });

});