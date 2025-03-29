let key = '';
import {
    find
} from 'modules';
module.exports = function number(num) {
    const length
        = this.explorerData['@scroll'].folders.length
        + this.explorerData['@scroll'].files.length;
    key = `${key}${num}`;
    while (Number(key) > length) {
        key = String(key).substr(1);
    }
    find('table[explorerTable]', this).selectionIndex = Number(key);
};
