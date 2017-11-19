
var timer = {};
module.exports = {
    start: function(name) {
        timer[name] = new Date();
    },
    end: function(name) {
        if (timer[name] === undefined) {
            console.log('%cEnd bị bắt trước event start', 'color: orange');
        } else {
            console.log(`%c${new Date() - timer[name]}(ms) -  ${name}`, 'color: green');
        }
    }
};
