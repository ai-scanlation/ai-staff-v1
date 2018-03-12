import find from '../find/find';

module.exports = function focus(...findArgs) {
    const component = find(...findArgs);
    if (component) {
        const input = component.$el.querySelector('input') || component.$el.querySelector('textarea');
        if (input) {
            input.focus();
        }
    }
};
