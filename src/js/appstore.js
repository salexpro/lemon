import $ from 'jquery';
import 'slick-carousel';

$('.slider').slick({
    mobileFirst: true,
    slidesToShow: 1.5,
    variableWidth: true,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    speed: 300,
});