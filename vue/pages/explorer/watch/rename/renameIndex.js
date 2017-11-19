module.exports = function renameIndex(value) {
    if (/(\d)+/.test(value)) {
        this.renamePattern = this.renamePattern.replace(/<(\d+)\+>/g, `<${value}+>`);
    } else {
        this.renameIndex = 1;
    }
};
