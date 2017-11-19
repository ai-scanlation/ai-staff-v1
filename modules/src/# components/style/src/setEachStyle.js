import setRule from './setRule';
import calcVariable from './calcVariable';

module.exports = function eachStyle(style, vars) {
    for (const RawSelector in style.rules) {
        const selector = calcVariable(RawSelector, vars).replace(/\s+/g, ' ');
        const rule = calcVariable(style.rules[RawSelector], vars).replace(/\s+/g, ' ');
        setRule(selector, rule, style.group, style.overwrite);
    }
};
