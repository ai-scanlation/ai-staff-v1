import fs from 'fs';
import path from 'path';
import moment from 'moment';
import toSize from './src/toSize.js';
import Vue from 'vue';
import {
    identify,
    find
} from 'modules';

moment.locale('vi');
module.exports = function() {
    const folderPath = this.folderPath;
    find('table[explorerTable]', this).selectionIndex = 0;
    this.explorerData['@scroll'].files = [];
    this.explorerData['@scroll'].folders = [];
    this.allowConvertWidth = ['', '100%'];
    this.convertWidthID = 1;

    if (folderPath === '') return;
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            this.explorerData['@scroll'].folders.push([]);
            return;
        }
        if (files.length > 50 && !this.explorerLimit) {
            console.warn('Chặn thao tác đọc thư mục có nhiều hơn 50 tập tin');
            return;
        }
        files.filter(
            (fileOrFolder) => (!fileOrFolder.match(/^\.|^\$/))
        ).forEach((fileOrFolder, index) => {
            const filePath = path.join(folderPath, fileOrFolder);
            fs.stat(filePath, (err, stat) => {
                if (err) {
                    console.error(err);
                    return;
                }
                if (stat.isDirectory()) {
                    const folderExt = fileOrFolder.match(/\[Complete\]/) ? 'folder_complete' : 'folder';
                    const folder = [
                        //
                        {
                            ino: stat.ino,
                            type: 'folder'
                        },
                        index, {
                            name: fileOrFolder,
                            ext: folderExt,
                            type: 'name'
                        },
                        '', /* 3 - Dung lượng */
                        '', /* 4 - Kích thước */
                        '', /* 5 - Kiểu */
                        moment(stat.ctime).fromNow(),
                        ''
                    ];
                    this.explorerData['@scroll'].folders.push(folder);
                    this.updateExplorer(true);
                } else if (stat.isFile()) {
                    const ext = path.extname(fileOrFolder).toLowerCase();
                    const file = [
                        /**/
                        {
                            stat: stat,
                            type: 'file',
                            path: filePath,
                            count: 0
                        },
                        index,
                        {
                            name: fileOrFolder,
                            type: 'name'
                        },
                        toSize(stat.size),
                        '',
                        '',
                        moment(stat.ctime).fromNow(),
                        {
                            name: 'php.png',
                            type: 'rename'
                        }
                    ];
                    this.explorerData['@scroll'].files.push(file);
                    this.updateExplorer(true);
                    const readMore = true;
                    if ((ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.psd') && readMore) {
                        identify(filePath, stat, file, (identifyInfo, file) => {
                            Vue.set(file, 4, identifyInfo.height + ' x ' + identifyInfo.width);
                            Vue.set(file, 5, identifyInfo.type);
                            const width = identifyInfo.width + 'px';
                            if (this.allowConvertWidth.indexOf(width) === -1) {
                                this.allowConvertWidth.push(width);
                            }
                            return true;
                        });
                    }
                }
            });
        });
    });
};