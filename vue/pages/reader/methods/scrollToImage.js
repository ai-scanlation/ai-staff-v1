import anime from 'animejs';
import {
    find
} from '~/modules';

module.exports = function scrollToImage(index) {
    const target = find('scroll[images]', this).$el;
    let scrollTop;
    if (index === undefined) return;
    else if (index === 'up') {
        scrollTop = target.scrollTop - target.clientHeight * 0.8;
    } else if (index === 'down') {
        scrollTop = target.scrollTop + target.clientHeight * 0.8;
    } else if (index === 'home') {
        scrollTop = 0;
    } else if (index === 'end') {
        scrollTop = target.scrollHeight;
    } else {
        const el = this.imgs[index].component.$el;
        const marginTop = parseInt(window.getComputedStyle(el).marginTop, 10);
        scrollTop = el.offsetTop - marginTop;
    }
    if (scrollTop !== undefined) {
        anime({
            targets: target,
            scrollTop: scrollTop,
            duration: 500,
            easing: 'easeInOutQuart'
        });
    }
};
