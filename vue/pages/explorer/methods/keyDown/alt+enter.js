import path from 'path';
import {
    find,
    shell
} from '~/modules';

module.exports = function altEnter() {
    const selectionIndex = find('table[explorerTable]', this).selectionIndex;
    this.explorerData['@scroll']
        .files.forEach((file) => {
            if (file[1] === selectionIndex) {
                if (file[0].type === 'folder') {
                    shell.openFolder(path.join(this.folderPath, file[2].name));
                } else if (file[0].type === 'file') {
                    shell.openFile(path.join(this.folderPath, file[2].name));
                }
            }
        });
};
