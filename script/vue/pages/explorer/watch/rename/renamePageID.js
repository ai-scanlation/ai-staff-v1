module.exports = function renamePageID(value) {
    if (/(\d)+/.test(value)) {
        this.renamePattern = this.renamePattern.replace(/<(\d+)\+>/g, `<${value}+>`);
    } else {
        this.renamePageID = 1;
    }
};
