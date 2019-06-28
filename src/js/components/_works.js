import $ from 'jquery';
import Player from '@vimeo/player';

let player = false;
$('[data-video]')
    .each(function () {
        $.getJSON(`https://vimeo.com/api/v2/video/${$(this).data('video')}.json`, data => {
            $(this).html(`<img src="${data[0].thumbnail_large}" alt="${$(this).data('title')}">`)
        })
    })
    .click(function() {
        const video = $(this).data('video');
        if ($('#video').data('video') !== video) {
            $('#video').data('video', video);
            if (player) {
                player.loadVideo({
                    url: `https://vimeo.com/${video}`
                })
            } else {
                player = new Player('workVideo', {
                    url: `https://vimeo.com/${video}`,
                    color: 'FFCB01',
                    title: 0,
                    byline: 0,
                    portrait: 0,
                    autoplay: 1
                })
            }
        }
    });

$('#video').on('closed.zf.reveal', function() {
    $('iframe[src*="vimeo.com"]', this)[0].contentWindow.postMessage('{"method":"pause","value":""}', '*');
});


// $('.works_content').on('click', '.works_item_video:not([data-vimeo-initialized])', function() {
//     new Player($(this).attr('id'), {
//         id: $(this).data('video'),
//         color: 'FFCB01',
//         title: 0,
//         byline: 0,
//         portrait: 0,
//         autoplay: 1
//     })
// })

// $('#works_tabs').on('change.zf.tabs', () => {
// 	$('iframe[src*="vimeo.com"]').each(function () {
//         this.contentWindow.postMessage('{"method":"pause","value":""}', '*');
//     });
// })