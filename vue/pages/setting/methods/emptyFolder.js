import {
    shell
} from 'electron';
import Moment from 'moment';
import fs from 'fs';
import path from 'path';
module.exports = function emptyFolder() {
    const dateString = new Moment().format('hh[h]mm - DD.MM.YYYY');
    const newFolder = path.join(
        path.dirname(this.imagemagickTemporaryFolder),
        `[Ai Scans] ${dateString} (${this.imagemagickTemporaryFolderLength} tập tin)`
    );

    fs.rename(this.imagemagickTemporaryFolder, newFolder, (err) => {
        if (err) throw err;
        if (shell.moveItemToTrash(newFolder)) {
            fs.mkdirSync(this.imagemagickTemporaryFolder);
            this.imagemagickTemporaryFolderLength = 0;
        }
    });
};
