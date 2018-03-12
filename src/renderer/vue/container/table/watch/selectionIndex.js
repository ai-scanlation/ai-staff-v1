import {
    find
} from 'modules';
import anime from 'animejs';
module.exports = function selectionIndex(value) {
    const selection = find('selection', this).$el;
    const scroll = find('scroll', this).$el;
    const row = find(`table-row[row-${value}]`, this).$el;
    selection.style.top = row.offsetTop + 'px';
    let scrollTop;
    if (scroll.scrollTop > row.offsetTop) {
        scrollTop = row.offsetTop;
    }
    if (scroll.scrollTop + scroll.clientHeight < row.offsetTop + row.clientHeight) {
        scrollTop = row.offsetTop + row.clientHeight - scroll.clientHeight;
    }
    if (scrollTop !== undefined) {
        anime({
            targets: scroll,
            scrollTop: scrollTop,
            duration: 200,
            easing: 'easeInOutQuad',
            run: function(a) {
                scroll.scrollTop = a.animations[0].currentValue;
            }
        });
    }
};
