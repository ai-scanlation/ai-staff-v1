import {
    find
} from '~/modules';

module.exports = function plus_minus(value) {
    const selectionIndex = find('table[explorerTable]', this).selectionIndex;
    const file = find(`tablerow[row-${selectionIndex}]`).data;
    if (!file) return;
    if (file[0].type === 'file') {
        if (value === '+') {
            file[0].count++;
        } else if (value === '-' && file[0].count > 0) {
            file[0].count--;
        }
        this.updateRename();
    }
};
