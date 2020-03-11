import $ from 'jquery';
import { Foundation } from '../lib/foundation-explicit-pieces';

const header = $('.nav, .promo_logo, .nav_hamb--menu, .promo_mail');
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

$('#menu').on('opened.zf.offcanvas', () => {
    $('.nav_hamb--menu').addClass('is_active');
}).on('closed.zf.offcanvas', () => {
    $('.nav_hamb--menu').removeClass('is_active');
});

$('.menu a').click(() => {
    if (Foundation.MediaQuery.is('small only')) $('#menu').foundation('close');
});