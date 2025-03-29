import {
    load,
    find
} from 'modules';

module.exports = function toggleMode(back) {
    const keys = Object.keys(load(this.tabs)).map((key) => {
        return key.replace('ai-', '');
    });
    find(this.tabName, (parent, property) => {
        const index = keys.indexOf(parent[property]);
        parent[property] = back
            ? ((index === -1 || index === 0) ? keys[keys.length - 1] : keys[index - 1])
            : ((index === -1 || index === keys.length - 1) ? keys[0] : keys[index + 1]);
    });
};
