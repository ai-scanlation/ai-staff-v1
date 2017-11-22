import {
    style
} from 'modules';
import gridStyle from '../src/gridStyle';

module.exports = function updateStyle(styling = this.data.style) {
    for (const section in styling) {
        const section_ = styling[section];
        let length = -1;
        for (const property in section_) {
            if (length === -1) {
                length = section_[property].length;
            } else if (length !== section_[property].length) {
                throw 'Lỗi';
            }
        }
        for (let index = 0; index < length; index++) {
            style.set({
                group: 'default',
                overwrite: true,
                rules: {
                    '#{$cellSelector}': gridStyle.propertiesToArray(section_, index)
                }
            }, {
                cellSelector: gridStyle.cellSelector(this._uid, section, index)
                // lineSelector: selector.line(this._uid, section, index)
            });
        }
    }
};
