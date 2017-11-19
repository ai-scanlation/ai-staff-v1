import {
    find
} from '~/modules';

module.exports = function goToReader() {
    find('views').view = 'reader';
    find('reader').folderPath = this.folderPath;
};
