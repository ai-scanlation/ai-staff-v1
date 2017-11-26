import fs from 'fs';
// import {
//     readerQueue
// } from "./config.js";
import {
    find
} from 'components.js';

module.exports = function(ready) {
    const noti = false;
    if (ready === true) {
        return true;
    }
    let isReady = true;
    const reader = find('reader');
    const setting = find('setting');
    const explorer = find('explorer');
    [
        function imagemagick() {
            if (fs.existsSync(setting.imagemagick)) {
                if (fs.statSync(setting.imagemagick).isDirectory()) {
                    const files = fs.readdirSync(setting.imagemagick);
                    if (files.indexOf('identify.exe') !== -1 && files.indexOf('convert.exe') !== -1) {
                        if (noti) console.log('%c✓ setting.imagemagick', 'color: green');
                        return;
                    }
                }
            }
            if (noti) console.log('%c✕ setting.imagemagick: đường dẫn sai', 'color: orange');
            isReady = false;
        },
        function imagemagickTemporaryFolder() {
            if (fs.existsSync(setting.imagemagickTemporaryFolder)) {
                if (noti) console.log('%c✓ setting.imagemagickTemporaryFolder', 'color: green');
                return;
            }
            if (noti) console.log('%c✕ setting.imagemagickTemporaryFolder: đường dẫn sai', 'color: orange');
            isReady = false;
        },
        // function imagemagickConcurrency() {
        //     if (setting.imagemagickConcurrency >= 1) {
        //         readerQueue.concurrency = setting.imagemagickConcurrency;
        //         if (noti) console.log("%c✓ setting.imagemagickConcurrency", "color: green");
        //         return;
        //     }
        //     if (noti) console.log("%c✕ setting.imagemagickConcurrency thông số cài đặt sai", "color: orange");
        //     isReady = false;
        // },
        function readerFolderPath() {
            if (fs.existsSync(reader.folderPath)) {
                if (noti) console.log('%c✓ reader.folderPath', 'color: green');
                return;
            }
            isReady = false;
            if (noti) console.log('%c✕ reader.folderPath: đường dẫn sai', 'color: orange');
        },
        function explorerFolderPath() {
            if (fs.existsSync(explorer.folderPath)) {
                if (noti) console.log('%c✓ explorer.folderPath', 'color: green');
                return;
            }
            isReady = false;
            if (noti) console.log('%c✕ explorer.folderPath: đường dẫn sai', 'color: orange');
        }
    ].forEach((check) => {
        check();
    });
    return isReady;
};
