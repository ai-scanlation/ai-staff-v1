module.exports = function renamePattern(value) {
    this.updateRename();
    let renameProjectID = /<#([\d\.]+)>/.exec(value),
        renameIndex = /<(\d+)\+>/.exec(value),
        renameNumber = /<([\d\.]+)>/.exec(value);

    this.renameProjectID = renameProjectID ? renameProjectID[1] : 1;
    this.renameIndex = renameIndex ? renameIndex[1] : 1;
    this.renameNumber = renameNumber ? renameNumber[1] : 1;
};
