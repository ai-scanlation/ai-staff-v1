import toNumber from '../../methods/rename/src/src/toNumber';
module.exports = function renameProjectID(value) {
    this.renamePattern = this.renamePattern.replace(/<#([\d.]+)?>/g, `<#${value}>`);
    this.renameProjectIDString = toNumber(this.renameProjectID, 2);
};
