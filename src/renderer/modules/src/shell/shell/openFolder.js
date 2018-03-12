import {
    shell
} from 'electron';
import fs from 'fs';
import path from 'path';
import {
    find
} from 'components.js';
module.exports = function(query) {
    if (path.isAbsolute(query)) {
        checkAndOpen(query);
    } else {
        find(query, (element, property) => {
            const folderPath = element[property];
            checkAndOpen(folderPath);
        });
    }
};

function checkAndOpen(folderPath) {
    if (fs.existsSync(folderPath)) {
        if (fs.statSync(folderPath).isDirectory()) {
            shell.showItemInFolder(folderPath + '\\ ');
        }
    } else {
        checkAndOpen(path.dirname(folderPath));
    }
}
