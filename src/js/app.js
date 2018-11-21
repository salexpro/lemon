/* global Foundation */
/*
@codekit-prepend quiet '../../node_modules/jquery/dist/jquery.min.js';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.core.min.js';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.mediaQuery.min.js';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.box.min.js';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.keyboard.min.js';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.triggers.min.js';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.offcanvas.min.js';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.smoothScroll.min.js';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.magellan.min.js';
@codekit-prepend quiet '../../node_modules/slick-carousel/slick/slick.min.js';

@codekit-append quiet 'components/_carousel.js';
*/

$(document).foundation();

$('#menu').on('opened.zf.offcanvas', () => {
    $('.nav_hamb').addClass('is_active');
}).on('closed.zf.offcanvas', () => {
    $('.nav_hamb').removeClass('is_active');
});



const header = $('.nav, .promo_logo, .nav_hamb');
let scrolling = false,
    prev_top = 0,
    scrollDelta = 10,
    scrollOffset = 300;

const auto_hide = () => {
    const curr_top = $(window).scrollTop();

    if (prev_top - curr_top > scrollDelta) {
        //if scrolling up...
        header.removeClass('is_hidden');
    } else if (curr_top - prev_top > scrollDelta && curr_top > scrollOffset) {
        //if scrolling down...
        header.addClass('is_hidden');
    }

    prev_top = curr_top;
    scrolling = false;
}

$(window).scroll(() => {
    if (!scrolling && Foundation.MediaQuery.is('small only')) {
        scrolling = true;
        (!window.requestAnimationFrame) ? setTimeout(auto_hide, 250): requestAnimationFrame(auto_hide);
    }
});

$('.menu a').click(() => {
    if (Foundation.MediaQuery.is('small only')) $('#menu').foundation('close');
})