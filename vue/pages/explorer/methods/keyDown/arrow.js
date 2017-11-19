import {
    find
} from '~/modules';
module.exports = function arrow(query) {
    // arrow chỉ có tác dụng thay đổi giá trị của selectionIndex 
    // => thay đổi top của thẻ .file-selection.
    const length
        = this.explorerData['@scroll'].folders.length
        + this.explorerData['@scroll'].files.length;
    let index = parseInt(find('table[explorerTable]', this).selectionIndex);
    if (typeof query === 'string') {
        if (query === 'default') {
            index = 0;
        } else if (query === 'up') {
            if (index !== 0) index--;
        } else if (query === 'down') {
            if (index !== length) index++;
        } else if (query === 'pageup') {
            if (index - 5 < 0) index = 0;
            else index -= 5;
        } else if (query === 'pagedown') {
            if (index + 5 > length) index = length;
            else index += 5;
        } else if (query === 'home') {
            index = 0;
        } else if (query === 'end') {
            index = length;
        }
    }
    find('table[explorerTable]', this).selectionIndex = Number(index);
};
