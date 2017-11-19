import fs from 'fs';
module.exports = function imagemagickTemporaryFolder() {
    fs.readdir(this.imagemagickTemporaryFolder, (err, files) => {
        if (err) return;
        this.imagemagickTemporaryFolderLength = files.length;
    });
};
