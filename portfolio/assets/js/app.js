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
        $('.scroll').find('span').removeClass('selected');

        switch ( $(this).attr('data-value') ){
            case 'name':
                $('html, body').animate({
                    scrollTop: $('#nav').offset().top
                }, 500);
                break;
            case 'home':
                scrollTo('#splash');
                break;
            case 'about':
                scrollTo('#about');
                $(this).find('span').addClass('selected');
                break;
            case 'projects':
                scrollTo('#projects');
                $(this).find('span').addClass('selected');
                break;
            case 'skills':
                scrollTo('#skills');
                $(this).find('span').addClass('selected');
                break;
            case 'contact':
                scrollTo('#contact');
                $(this).find('span').addClass('selected');
                break;
        }
    });

    function scrollTo(section) {
        $('html, body').animate({
            scrollTop: $(section).offset().top - $('#nav').height()
        }, 500)
    }

});