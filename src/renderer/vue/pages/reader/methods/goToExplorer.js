import {
    find
} from 'modules';

module.exports = function goToExplorer() {
    find('views').view = 'explorer';
    find('explorer').folderPath = this.folderPath;
};
