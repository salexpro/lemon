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