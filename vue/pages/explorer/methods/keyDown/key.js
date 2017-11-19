import path from 'path';
import {
    find,
    shell
} from '~/modules';

// TODO: Complete this
module.exports = function key(keyname) {
    const file = find(`tablerow[row-${this.selectionIndex}]`);
    if (!file) return;
    // if (this.mode === "explorerMode") {
    //     if (file.type === "file") {
    //         shell.openFile(path.join(this.folderPath, file._name));
    //     } else {
    //         file.$children[0].buttonClick();
    //     }
    // } else if (this.mode === "renameMode") {
    //     this.selectFile(this.selectionIndex);
    // }
};
