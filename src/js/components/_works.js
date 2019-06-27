import $ from 'jquery';
import Player from '@vimeo/player';

$('[data-video]').each(function () {
    $.getJSON(`https://vimeo.com/api/v2/video/${$(this).data('video')}.json`, data => {
        $(this).html(`<img src="${data[0].thumbnail_large}" alt="${$(this).data('title')}">`)
    })
});

$('.works_content').on('click', '.works_item_video:not([data-vimeo-initialized])', function() {
    new Player($(this).attr('id'), {
        id: $(this).data('video'),
        color: 'FFCB01',
        title: 0,
        byline: 0,
        portrait: 0,
        autoplay: 1
    })
})

$('#works_tabs').on('change.zf.tabs', () => {
	$('iframe[src*="vimeo.com"]').each(function () {
        this.contentWindow.postMessage('{"method":"pause","value":""}', '*');
    });
})