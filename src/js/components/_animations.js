// eslint-disable-next-line no-unused-vars
import polyfill from '@babel/polyfill';
import { Foundation } from '../lib/foundation-explicit-pieces';
import { TimelineMax, Power0 } from 'gsap/TweenMax';
import '../plugins/_DrawSVGPlugin.js'; // quiet 

document.isAnimDone = {};

const animStart = id => {
    document.isAnimDone[id] = false;
    
    const iconArrow = `form[data-id="${id}"] .button_icon_part--arrow`;
    const iconLoading = `form[data-id="${id}"] .button_icon_part--loading`;
    const tl = new TimelineMax();
    tl
        .set(iconLoading, {y: 0}, 0)
        .fromTo(`${iconArrow} path`, 2, { drawSVG: '0% 100%' }, { drawSVG: '100% 100%' })
        .fromTo(`${iconLoading} path`, 1.3, { drawSVG: '75% 76%', opacity: 1}, { drawSVG: '50% 72%' }, '-=1.7')
        .to(`${iconLoading} path`, 0.3, { drawSVG: '49% 50%', ease: Power0.easeNone}, '-=1.3')
        .to(`${iconLoading} path`, 0, { opacity: '0' }, '-=1')
    return tl;
}
 
const animLoading = id => {
    const iconCircle = `form[data-id="${id}"] .button_icon_part--circle`;

    const checkDone = () => {
        if (document.isAnimDone[id]) {
            circle.stop();
            animDone(id);
        }
    }

    const circle = new TimelineMax({ repeat: -1, onRepeat: checkDone });

    circle
        .fromTo(`${iconCircle} path`, 2, { drawSVG: '100% 100%' }, { drawSVG: '0% 85%' }, '-=1')
        .to(`${iconCircle} path`, 2, { drawSVG: '0% 0%' })
        .to(iconCircle, 4, { rotation: 720, ease: Power0.easeNone }, 0);
    
    return circle;
}


const animDone = id => {
    const iconArrow = `form[data-id="${id}"] .button_icon_part--arrow`;
    const iconLoading = `form[data-id="${id}"] .button_icon_part--loading`;
    const iconCheck = `form[data-id="${id}"] .button_icon_part--check`;
    const tl = new TimelineMax();
    const topCheck = Foundation.MediaQuery.is('small only') ? 0 : 1;
    const topCheckArr = Foundation.MediaQuery.is('small only') ? 5 : 6.7;

    tl
        .fromTo(`${iconLoading} path`, 1.5, { drawSVG: '52% 53%', opacity: 1, }, { drawSVG: '25% 1%' })
        .to(iconLoading, 0.5, { y: -5 }, 0)
        .to(`form[data-id="${id}"] .help-text`, 0.5, { opacity: 1, y: 0 }, '-=1')
        .set(`${iconLoading} path`, { opacity: 0 })
        .set(iconCheck, {y: topCheck})
        .set(`${iconCheck} path`, { drawSVG: '0% 43%', opacity: 1})
        .set(`${iconArrow} path`, {drawSVG: '0% 0%', opacity: 0})
    
    setTimeout(() => {
        tl
            .fromTo(iconCheck, 0.3, {y: topCheck}, {y: topCheckArr})
            .fromTo(`${iconCheck} path`, 2, { drawSVG: '0% 43%', opacity: 1 }, { drawSVG: '100% 100%' }, '-=0.3')
            .to(`form[data-id="${id}"] .help-text`, 0.5, { opacity: 0, y: -10 }, '-=2')
            .to(`${iconCheck} path`, 0.5, { opacity: '0' }, '-=1.4')
            .set(`${iconArrow} path`, {opacity: 1}, '-=1.5')
            .fromTo(`${iconArrow} path`, 2, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%' }, '-=1.5')
    
        document.querySelector(`form[data-id="${id}"] [type="submit"]`).removeAttribute('disabled')
    }, 5000);
}
        

const playIcon = id => {
    const masterTimeline = new TimelineMax();
    masterTimeline
        .add(animStart(id))
        .add(animLoading(id), 0.9)
        // .timeScale(0.5)
    return masterTimeline;
}

export { playIcon };