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

    $('.scroll').on('click', function () {
        switch ( $(this).attr('data-value') ){
            case 'name':
                scrollTo('#nav');
                break;
            case 'home':
                scrollTo('#splash');
                break;
            case 'about':
                scrollTo('#about');
                break;
            case 'projects':
                scrollTo('#projects');
                break;
            case 'skills':
                scrollTo('#skills');
                break;
            case 'contact':
                scrollTo('#contact');
                break;
        }
    });

    function scrollTo(section) {
        $('html, body').animate({
            scrollTop: $(section).offset().top - $('#nav').height()
        }, 500)
    }

});