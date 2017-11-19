import {
    shell
} from 'electron';
let lastFile,
    lastTime;
module.exports = function openFile(file) {
    if (lastFile === undefined) {
        lastTime = new Date();
        shell.openExternal(file);
        return;
    } else {
        if (lastFile === file && new Date() - lastTime > 5000) {
            shell.openExternal(file);
            return;
        } else if (lastFile !== file && new Date() - lastTime > 1500) {
            shell.openExternal(file);
            return;
        }
    }
    console.warn('Không nên mở quá nhiều tập tin cùng lúc');
};
