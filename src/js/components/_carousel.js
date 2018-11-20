// @codekit-prepend quiet '../../../node_modules/lodash.throttle/index.js';

const works_carousel = $('.works_carousel').slick({
    slidesToShow: 1.7,
    arrows: false,
    infinite: false,
    speed: 1000
});
works_carousel.on('wheel', (e => {
    if (e.originalEvent.deltaX !== 0)
        e.preventDefault();
}));
works_carousel.on('wheel', throttle(function(e) {if (e.originalEvent.deltaX !== 0) $(this).slick((e.originalEvent.deltaX < 0) ? 'slickPrev' : 'slickNext');}, 1000))

$('.works_label a').click(function (e) {
    e.preventDefault()
    const label = $(this).attr('href').substr(1);
    $('.works_label a').removeClass('is-active');
    $(this).addClass('is-active');
    $('.works_carousel')
        .slick('slickUnfilter')
        .slick('slickFilter', function () {
            return $(this).data('labels').includes(label)
        });
})