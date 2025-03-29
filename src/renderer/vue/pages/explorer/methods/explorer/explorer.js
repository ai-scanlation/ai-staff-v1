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
            return this.explorerData['@scroll'].folders.push([]);
        }
        if (files.length > 50 && !this.explorerLimit) {
            return console.warn('Chặn thao tác đọc thư mục có nhiều hơn 50 tập tin');
        }
        files.filter(
            fileOrFolder => !fileOrFolder.match(/^\.|^\$/)
        ).forEach((fileOrFolder, index) => {
            const filePath = path.join(folderPath, fileOrFolder);
            fs.stat(filePath, (err, stat) => {
                if (err) return console.error(err);
                
                if (stat.isDirectory()) {
                    const folderStat = {
                        ino: stat.ino,
                        type: 'folder'
                    };
                    const folderExt = {
                        name: fileOrFolder,
                        ext: fileOrFolder.match(/\[Complete\]/) ? 'folder_complete' : 'folder',
                        type: 'name'
                    };

                    const folder = [
                        folderStat,
                        index,
                        folderExt,
                        '', /* 3 - Dung lượng */
                        '', /* 4 - Kích thước */
                        '', /* 5 - Kiểu */
                        moment(stat.ctime).fromNow(),
                        '', /* rename */
                    ];
                    this.explorerData['@scroll'].folders.push(folder);
                    this.updateExplorer(true);
                } else if (stat.isFile()) {
                    const fileStat = {
                        stat: stat,
                        type: 'file',
                        path: filePath,
                        count: 0
                    };
                    const fileExt = {
                        name: fileOrFolder,
                        type: 'name'
                    };
                    const fileRename = {
                        name: 'null',
                        type: 'rename'
                    };
                    const file = [
                        fileStat,
                        index,
                        fileExt,
                        toSize(stat.size),
                        '',
                        '',
                        moment(stat.ctime).fromNow(),
                        fileRename
                    ];
                    this.explorerData['@scroll'].files.push(file);
                    this.updateExplorer(true);

                    const ext = path.extname(fileOrFolder).toLowerCase();
                    const readMore = true;
                    if (['.jpg', '.jpeg', '.png', '.psd'].indexOf(ext) !== -1 && readMore) {
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
