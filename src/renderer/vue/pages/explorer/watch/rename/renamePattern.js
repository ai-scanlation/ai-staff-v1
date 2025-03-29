module.exports = function renamePattern(value) {
    this.updateRename();
    const renameProjectID = /<#([\d.]+)>/.exec(value);
    const renamePageID = /<(\d+)\+>/.exec(value);
    const renameChapterID = /<([\d.]+)>/.exec(value);

    this.renameProjectID = renameProjectID ? renameProjectID[1] : 1;
    this.renamePageID = renamePageID ? renamePageID[1] : 1;
    this.renameChapterID = renameChapterID ? renameChapterID[1] : 1;
};
