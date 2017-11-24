import toNumber from '../../methods/rename/src/src/toNumber';
module.exports = function renameNumber(value) {
    if (/[\d\.]+/.test(value)) {
        this.renamePattern = this.renamePattern.replace(/<([\d\.]+)>/g, `<${value}>`);
    } else {
        this.renameNumber = 1;
    }
    this.renameNumberString = toNumber(this.renameNumber);
};
