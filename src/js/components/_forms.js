$('[data-abide]')
    .on('submit', e => { e.preventDefault() })
    .on('formvalid.zf.abide', (e, frm) => {
        $('[type="submit"]', frm)
            .prop('disabled', true)
        play_icon($(frm).data('id'))
    });