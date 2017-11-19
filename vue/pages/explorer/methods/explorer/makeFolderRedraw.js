import fs from 'fs';
import path from 'path';
module.exports = function makeFolderRedraw() {
    const files = this.explorerData['@scroll'].files;
    let existsRedrawFolder = fs.existsSync(path.join(this.folderPath, 'redraw'));
    files.forEach((file) => {
        if (/redraw\./.test(file[2].name)) {
            if (!existsRedrawFolder) {
                fs.mkdirSync(path.join(this.folderPath, 'redraw'));
                existsRedrawFolder ^= 1;
            }
            fs.renameSync(
                path.join(this.folderPath, file[2].name),
                path.join(this.folderPath, 'redraw', file[2].name)
            );
        }
    });
    this.explorer();
};