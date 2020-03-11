/* global fbq */

import $ from 'jquery';
import 'slick-carousel';
// import Swal from 'sweetalert2/dist/sweetalert2.min'

$('.slider').slick({
    mobileFirst: true,
    slidesToShow: 1.5,
    variableWidth: true,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    speed: 300,
});

$('#get').click(() => {
    fbq('track', 'CompleteRegistration');
    location.href = 'https://app.adjust.com/d185h8d?campaign=fbtest&gps_adid={IDFA}&tracker_limit=100000&applovin_click_id={DID}&android_id_lower_sha1={HADID}';
    // Swal.fire('Thank you, we will launch the game soon')
})