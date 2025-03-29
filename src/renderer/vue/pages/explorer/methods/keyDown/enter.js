import path from 'path';
import {
    find,
    shell
} from 'modules';

module.exports = function enter(isSpace) {
    const selectionIndex = find('table[explorerTable]', this).selectionIndex;
    const file = find(`table-row[row-${selectionIndex}]`, this);
    if (!file) throw 'Không tìm thấy File';
    if (file.data[0].type === 'back') {
        this.selectFile('back');
    } else if (file.data[0].type === 'folder') {
        this.selectFile('folder', file.data);
    } else if (file.data[0].type === 'file') {
        if (this.explorerMode === 'explorer-mode') {
            if (isSpace) return;
            shell.openFile(path.join(this.folderPath, file.data[2].name));
        } else if (this.explorerMode === 'rename-mode' || this.explorerMode === 'convert-mode') {
            this.selectFile('file', file.data);
        }
    }
};
