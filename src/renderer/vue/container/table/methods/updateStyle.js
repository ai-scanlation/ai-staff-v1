import {
    style
} from 'modules';

import cellSelector from './updateStyle/cellSelector';
import lineSelector from './updateStyle/lineSelector';
import cell from './updateStyle/cell';
import line from './updateStyle/line';

module.exports = function updateStyle(mode) {
    const thisStyle = this.config.style[mode];
    if (!thisStyle) {
        console.warn(`Không thể tìm thấy mode: ${mode} trong config. UID = ${this._uid}`);
        return;
    }
    for (const section in thisStyle) {
        let length = 0;
        if (Object.keys(thisStyle[section]).length) {
            length = thisStyle[section][Object.keys(thisStyle[section])[0]].length;
        }
        for (let i = 0; i < length; i++) {
            style.set({
                group: mode === 'default' ? 'default' : 'table',
                overwrite: mode !== 'default',
                rules: {
                    ...cell(thisStyle, section, i),
                    ...line(thisStyle, section, i)
                }
            }, {
                cellSelector: cellSelector(section, i, this._uid),
                lineSelector: lineSelector(section, i, this._uid)
            });
        }
    }
};
