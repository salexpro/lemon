import { playIcon } from './_animations';
import $ from 'jquery';

$('[data-abide]')
    .on('submit', e => { e.preventDefault() })
    .on('formvalid.zf.abide', (e, frm) => {
        const formId = $(frm).data('id');
        const formMessage = $(`#formMessage${formId}`);
        formMessage.attr('class', 'help-text');
        $('[type="submit"]', frm).prop('disabled', true);
        playIcon(formId);
        $.ajax({
            type: 'POST',
            url: '/backend/forms.php',
            dataType: 'json',
            data: $(frm).serialize(),
            success: () => {
                formMessage.addClass('form_status--success');
            },
            error: () => {
                formMessage.addClass('form_status--error');
            },
            complete: xhr => {
                try {
                    formMessage.text(xhr.responseJSON.message)
                } catch (error) {
                    formMessage.text('Connection error');
                }
                document.isAnimDone[formId] = true;
            }
        });
    });