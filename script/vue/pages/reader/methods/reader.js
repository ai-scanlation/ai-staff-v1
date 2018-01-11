import path from 'path';
import fs from 'fs';
import {
    sort
} from 'modules';

module.exports = function reader() {
    this.imgs = [];
    fs.readdir(this.folderPath, (err, files) => {
        if (err) console.log('Không thể đọc thư mục', err);
        else this.imgs = files
            .filter((file) => (/(png|psd|jpg|jpeg)$/.test(file)))
            .sort(sort)
            .map((file, index) => ({
                index: index,
                src: path.join(this.folderPath, file),
                name: path.basename(file),
                component: undefined,
                loaded: false,
                top: 0,
                bot: 0
            }));
    });
};