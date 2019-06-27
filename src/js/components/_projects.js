import $ from 'jquery';
import Player from '@vimeo/player';
import * as projects from '../data/projects';

let player = false;
$('[data-project]').click(function() {
    const project = $(this).data('project');
    if ($('#project').data('project') !== project) {
        $('#project').data('project', project);
        if (player) {
            player.loadVideo({
                url: `https://vimeo.com/${projects[project].video}`
            })
        } else {
            player = new Player('projectVideo', {
                url: `https://vimeo.com/${projects[project].video}`,
                color: 'FFCB01',
                title: 0,
                byline: 0,
                portrait: 0,
                autoplay: 1
            })
        }
        // const labels = projects[project].labels.reduce((html, label) => `${html}<span class="label">${label}</span>`, '');
        // $('#project .project_labels').html(labels);
        $('#project .badges--project').removeClass('is_present');
        const badges = projects[project].badges ? projects[project].badges.reduce((html, badge) => `${html}<span class="badge"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="23" height="38" viewBox="0 0 23 38"><use fill="${badge.fill}" xlink:href="./assets/img/sprite.svg#badge_${badge.name}"></use></svg></span>`, '') : '';
        if(badges) $('#project .badges--project').addClass('is_present');
        $('#project .badges--project').html(badges);
        $('#project .project_info_top--client span').html(projects[project].client);
        $('#project .project_info_top--type span').html(projects[project].type);
        // $('#project .project_info_logo').html(projects[project].logo ? `<img src="./assets/img/clients/${projects[project].logo}.png" srcset="./assets/img/clients/${projects[project].logo}.png 1x, ./assets/img/clients/${projects[project].logo}@2x.png 2x" alt="${projects[project].title}" />` : '');
        $('#project .project_info_logo').html(projects[project].logo ? `<img src="./assets/img/clients/${projects[project].logo}" alt="${projects[project].title}" />` : '');
        $('#project .project_info_text').html(projects[project].descr);
        $('#project .project_link').attr('href', projects[project].link);
        const images = projects[project].images.reduce((html, img, i) => {
            const gridClass = (i % 3 == 2) ? 'large-12' : 'large-6';
            return `${html}<div class="cell ${gridClass} project_images_item"><img src="${img}" alt="" /></div>`;
        }, '');
        $('#project .project_images').html(images);
    }
})

$('#project').on('closed.zf.offcanvas', function() {
    $('iframe[src*="vimeo.com"]', this)[0].contentWindow.postMessage('{"method":"pause","value":""}', '*');
});