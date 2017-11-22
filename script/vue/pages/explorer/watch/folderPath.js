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
    const renameNumber = /chap ([\d\.]+)/.exec(value);
    if (renameNumber) {
        this.renameNumber = renameNumber[1];
    }
    this.explorer();
};
