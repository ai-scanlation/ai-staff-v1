module.exports = function get(property, self, defaultValue = undefined) {
    let value;
    if (property === 'size') {
        value = Number(self.$el.getAttribute('size'));
        if (!value) {
            const closest = self.$el.closest('[size]');
            if (closest) {
                value = Number(closest.getAttribute('size'));
            }
        }
    } else {
        console.warn('property is undefined, value will be set to defaultValue');
    }
    return value || defaultValue;
};
