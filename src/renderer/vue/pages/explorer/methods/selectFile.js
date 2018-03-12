import path from 'path';
import Vue from 'vue';
import {
    find
} from 'modules';

module.exports = function selectFile(query, data) {
    const foldersLength = this.explorerData['@scroll'].folders.length;
    const filesLength = this.explorerData['@scroll'].files.length;
    if (query === 'folder') {
        this.previousSelectionIndex = data[1];
        this.previousFolderPath = this.folderPath;
        this.folderPath = path.join(this.folderPath, data[2].name || data[2]);
    } else if (query === 'file') {
        find('table', this).selectionIndex = Number(data[1]);
        if (this.explorerMode === 'rename-mode' || this.explorerMode === 'convert-mode') {
            const count = data[0].count === 0 ? 1 : 0;
            Vue.set(data[0], 'count', count);
        }
    } else if (query === 'back') {
        this.folderPath = path.dirname(this.folderPath);
    } else if (query === 'toggleAll') {
        if (this.explorerMode === 'explorer-mode') return;
        if (filesLength === 0) return;
        const firstFile = find(`table-row[row-${foldersLength + 1}]`);
        if (firstFile.data[0].count === 0) {
            this.selectFile('all');
        } else {
            this.selectFile('none');
        }
    } else {
        let i = foldersLength + 1;
        const length = foldersLength + filesLength;
        if (query === 'all') {
            for (; i <= length; i++) {
                Vue.set(find(`table-row[row-${i}]`).data[0], 'count', 1);
            }
        } else if (query === 'none') {
            for (; i <= length; i++) {
                Vue.set(find(`table-row[row-${i}]`).data[0], 'count', 0);
            }
        }
    }
};
