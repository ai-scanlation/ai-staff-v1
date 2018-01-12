import toNumber from '../../methods/rename/src/src/toNumber';
module.exports = function renameChapterID(value) {
    if (/[\d.]+/.test(value)) {
        this.renamePattern = this.renamePattern.replace(/<([\d.]+)>/g, `<${value}>`);
    } else {
        this.renameChapterID = 1;
    }
    this.renameChapterIDString = toNumber(this.renameChapterID);
};
