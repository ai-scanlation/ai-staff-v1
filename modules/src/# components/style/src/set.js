import setEachStyle from './setEachStyle.js';

module.exports = function set(style, vars = {}) {
    if (typeof vars !== 'object') {
        console.error({
            err: 'In set style function: vars is not an object',
            style: style,
            vars: vars
        });
        return;
    }

    style = style.constructor.name === 'VueComponent'
        ? style.$options.style
        : style;

    if (Array.isArray(style)) {
        style.forEach((eachStyle) => {
            setEachStyle(eachStyle, vars);
        });
    } else if (typeof style === 'object' && !Array.isArray(style)) {
        setEachStyle(style, vars);
    } else {
        console.error({
            err: 'In set style function: style is not an object or an array of objects',
            style: style,
            vars: vars
        });
    }
};
