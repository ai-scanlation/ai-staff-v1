import path from 'path';
import {
    find,
    shell
} from 'modules';

module.exports = function ctrlEnter() {
    const selectionIndex = find('table[explorerTable]', this).selectionIndex;
    const files = this.explorerData['@scroll'].files;
    if (this.explorerMode === 'explorerMode') {
        files.forEach((file) => {
            if (file[1] === selectionIndex) {
                if (file[0].type === 'folder') {
                    shell.openFolder(path.join(this.folderPath, file[2].name));
                } else if (file[0].type === 'file') {
                    shell.openFileInPhotoshop(path.join(this.folderPath, file[2].name));
                }
            }
        });
    } else {
        files.forEach((file) => {
            if (file[0].count) {
                shell.openFileInPhotoshop(path.join(this.folderPath, file[2].name));
            }
        });
    }
};
