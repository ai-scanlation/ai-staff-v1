import {
    sort
} from '~/modules';

module.exports = function updateExplorer() {
    this.explorerData['@scroll']
        .folders
        .sort((a, b) => (sort(a[2].name, b[2].name)))
        .forEach((folder, folderIndex) => {
            folder[1] = folderIndex + 1;
        });
    this.explorerData['@scroll']
        .files
        .sort((a, b) => (sort(a[2].name, b[2].name)))
        .forEach((file, fileIndex) => {
            file[1]
                = this.explorerData['@scroll'].folders.length
                + fileIndex + 1;
        });
};
