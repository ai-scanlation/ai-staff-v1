import fs from 'fs';
import path from 'path';
module.exports = function createFolder(directory) {
    var paths = directory.replace(/[///]/g, path.sep).split(path.sep);
    for (var i = 1; i <= paths.length; i++) {
        var segment = path.join(...paths.slice(0, i)); // .join(path.sep);
        !fs.existsSync(segment) ? fs.mkdirSync(segment) : null;
    }
};