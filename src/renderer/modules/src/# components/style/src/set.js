import setEachStyle from './setEachStyle.js';
import global from './global';

module.exports = function set(style, vars = {}) {
    if (typeof vars !== 'object') {
        console.error({
            err: 'In set style function: vars is not an object.',
            data: {
                style: style,
                vars: vars
            }
        });
        return;
    }
    vars = Object.assign(vars, global.get());
    style = style.constructor.name === 'VueComponent'
        ? style.$options.style : style;

    if (typeof style === 'object') {
        Array.isArray(style)
            ? style.forEach((eachStyle) => setEachStyle(eachStyle, vars))
            : setEachStyle(style, vars);
    } else {
        console.error({
            err: 'In set style function: style is not an Object or an Array of Objects',
            data: {
                style: style,
                vars: vars
            }
        });
    }
};
