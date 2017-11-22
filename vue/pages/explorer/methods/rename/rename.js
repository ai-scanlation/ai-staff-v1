import path from 'path';
import Vue from 'vue';

import {
    rename
} from '~/modules';

module.exports = function renameFunction() {
    const files = this.explorerData['@scroll'].files
        .filter((file) => (file[0].count !== 0))
        .map((file) => ({
            source: path.join(this.folderPath, file[2].name),
            target: path.join(this.folderPath, file[7].name),
            file: file
        }));
    rename.renameAll(files, (file) => {
        if (file.file) {
            Vue.set(file.file[2], 'name', path.basename(file.target));
            Vue.set(file.file[0], 'count', 0);
        }
        const done = files.every((file) => (file.file[0].count === 0));
        if (done) {
            this.updateExplorer(true);
        }
    });
};
