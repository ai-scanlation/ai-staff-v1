import {
    load
} from 'modules';
module.exports = function toggleMode(back) {
    const keys = Object.keys(load(this.tabs)).map((key) => {
        return key.replace('ai-', '');
    });
    if (this.null === 'true') keys.push('');
    const index = keys.indexOf(this.active);
    this.active = back
        ? ((index === -1 || index === 0) ? keys[keys.length - 1] : keys[index - 1])
        : ((index === -1 || index === keys.length - 1) ? keys[0] : keys[index + 1]);
};