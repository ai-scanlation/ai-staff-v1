import {
    find
} from 'modules';
module.exports = function folderPath(value) {
    const projects = find('project').project;
    projects.forEach((project) => {
        if (value.match(project[1]) || value.match(project[2])) {
            this.renameProjectID = project[0];
        }
    });
    const renameChapterID = /(chap|chương|chuong) ([\d\.]+)/i.exec(value);
    if (renameChapterID) {
        this.renameChapterID = renameChapterID[2];
    }
    this.explorer();
};
