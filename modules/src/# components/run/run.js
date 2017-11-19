module.exports = function run(element, property, value, self) {
    if (typeof element[property] === 'undefined') {
        console.error(` ${element.$options.name}.${property} is undefined`);
    } else if (typeof element[property] === 'function') {
        element[property](value, self);
    } else if (value[0] === '@') {
        if (value === '@') {
            element[property] = !element[property];
        } else {
            element[property] = element[property] === '' ? value.substr(1) : '';
        }
    } else {
        element[property] = value;
    }
};