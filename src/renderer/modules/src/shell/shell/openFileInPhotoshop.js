import {
    execSync
} from 'child_process';
import fs from 'fs';
module.exports = function openFileInPhotoshop(file) {
    if (fs.existsSync(file)) execSync(`start photoshop "${file}"`);
};
