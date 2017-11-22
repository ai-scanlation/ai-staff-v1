import find from '../find/find';
module.exports = function(findArg) {
    findArg = Array.isArray(findArg) ? findArg : [findArg];
    const component = find(...findArg);
    if (component) {
        const input = component.$el.querySelector('input') || component.$el.querySelector('textarea');
        if (input) {
            input.focus();
        }
    }
};