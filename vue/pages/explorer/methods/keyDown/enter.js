import path from 'path';
import {
    find,
    shell
} from '~/modules';

module.exports = function enter(isSpace) {
    const selectionIndex = find('table[explorerTable]', this).selectionIndex;
    const file = find(`tablerow[row-${selectionIndex}]`, this);
    if (!file) throw 'Không tìm thấy File';
    if (file.data[0].type === 'back') {
        this.selectFile('back');
    } else if (file.data[0].type === 'folder') {
        this.selectFile('folder', file.data);
    } else if (file.data[0].type === 'file') {
        if (this.explorerMode === 'explorerMode') {
            if (isSpace) return;
            shell.openFile(path.join(this.folderPath, file.data[2].name));
        } else if (this.explorerMode === 'renameMode' || this.explorerMode === 'convertMode') {
            this.selectFile('file', file.data);
        }
    }
};
