/* global TimelineLite, TimelineMax, Power0 */
// @codekit-prepend quiet '../../../node_modules/gsap/src/minified/TweenLite.min.js';
// @codekit-prepend quiet '../../../node_modules/gsap/src/minified/TimelineMax.min.js';
// @codekit-prepend quiet '../../../node_modules/gsap/src/minified/plugins/CSSPlugin.min.js';
// @codekit-prepend quiet '../plugins/_DrawSVGPlugin.js';


// let is_done = 0;

const anim_start = id => {
    const icon_arrow = `form[data-id=${id}] .button_icon_part--arrow`;
    const icon_loading = `form[data-id=${id}] .button_icon_part--loading`;
    const tl = new TimelineLite();
    tl
        .set(icon_loading, {y: 0}, 0)
        .fromTo(`${icon_arrow} path`, 2, { drawSVG: '0% 100%' }, { drawSVG: '100% 100%' })
        .fromTo(`${icon_loading} path`, 1.3, { drawSVG: '75% 76%', opacity: 1}, { drawSVG: '50% 72%' }, '-=1.7')
        .to(`${icon_loading} path`, 0.3, { drawSVG: '49% 50%', ease: Power0.easeNone}, '-=1.3')
        .to(`${icon_loading} path`, 0, { opacity: '0' }, '-=1')
    return tl;
}
 
const anim_loading = id => {
    const icon_circle = `form[data-id=${id}] .button_icon_part--circle`;

    const check_done = () => {
        // if (is_done) {
            circle.stop()
            anim_done(id);
        // }
    }

    const circle = new TimelineMax({ repeat: -1, onRepeat: check_done });

    circle
        .fromTo(`${icon_circle} path`, 2, { drawSVG: '100% 100%' }, { drawSVG: '0% 85%' }, '-=1')
        .to(`${icon_circle} path`, 2, { drawSVG: '0% 0%' })
        .to(icon_circle, 4, { rotation: 720, ease: Power0.easeNone }, 0);
    
    return circle;
}


const anim_done = id => {
    const icon_arrow = `form[data-id=${id}] .button_icon_part--arrow`;
    const icon_loading = `form[data-id=${id}] .button_icon_part--loading`;
    const icon_check = `form[data-id=${id}] .button_icon_part--check`;
    const tl = new TimelineLite();
    const top_check = Foundation.MediaQuery.is('small only') ? 0 : 1;
    const top_check_arr = Foundation.MediaQuery.is('small only') ? 5 : 6.7;

    tl
        .fromTo(`${icon_loading} path`, 1.5, { drawSVG: '52% 53%', opacity: 1, }, { drawSVG: '25% 0%' })
        .to(icon_loading, 0.5, { y: -5 }, 0)
        .to(`form[data-id=${id}] .help-text`, 0.5, { opacity: 1, y: 0 }, '-=1')
        .set(`${icon_loading} path`, { opacity: 0 })
        .set(icon_check, {y: top_check})
        .set(`${icon_check} path`, { drawSVG: '0% 43%', opacity: 1})
        .set(`${icon_arrow} path`, {drawSVG: '0% 0%', opacity: 0})
    
    setTimeout(() => {
        tl
            .fromTo(icon_check, 0.3, {y: top_check}, {y: top_check_arr})
            .fromTo(`${icon_check} path`, 2, { drawSVG: '0% 43%', opacity: 1 }, { drawSVG: '100% 100%' }, '-=0.3')
            .to(`form[data-id=${id}] .help-text`, 0.5, { opacity: 0, y: -10 }, '-=2')
            .to(`${icon_check} path`, 0.5, { opacity: '0' }, '-=1.4')
            .set(`${icon_arrow} path`, {opacity: 1}, '-=1.5')
            .fromTo(`${icon_arrow} path`, 2, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%' }, '-=1.5')
    
        $(`form[data-id=${id}] [type="submit"]`).prop('disabled', false)
    }, 5000);
}
        

const play_icon = id => {
    const masterTimeline = new TimelineMax();
    masterTimeline
        .add(anim_start(id))
        .add(anim_loading(id), 0.9)
        // .timeScale(0.5)
}