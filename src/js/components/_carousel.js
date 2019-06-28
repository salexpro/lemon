import $ from 'jquery';
import 'slick-carousel';
import { throttle } from 'throttle-debounce';

const works_carousel = $('.works_carousel_slick').slick({
    mobileFirst: true,
    responsive: [
        {
            breakpoint: 0,
            settings: {
                slidesToShow: 1.7,
                variableWidth: true,
                slidesToScroll: 1,
                arrows: false,
                infinite: false,
                speed: 300,
            }
        },
        {
            breakpoint: 640,
            settings: 'unslick'
        }
    ]
});
works_carousel.on('wheel', (e => {
    if (e.originalEvent.deltaX !== 0)
        e.preventDefault();
}));
works_carousel.on('wheel', throttle(1000, function(e) {if (e.originalEvent.deltaX !== 0) $(this).slick((e.originalEvent.deltaX < 0) ? 'slickPrev' : 'slickNext');}))

// $('.works_label a').click(function (e) {
//     e.preventDefault()
//     const label = $(this).attr('href').substr(1);
//     $('.works_label a').removeClass('is-active');
//     $(this).addClass('is-active');
//     $('.works_carousel')
//         .slick('slickUnfilter')
//         .slick('slickFilter', function () {
//             return $(this).data('labels').includes(label)
//         });
// })