// table

import {
    style
} from 'modules';
module.exports = function updateStyle(mode) {
    const thisStyle = this.config.style[mode];
    if (!thisStyle) {
        console.warn('Không thể tìm thấy mode: ' + mode + ' trong config. UID = ' + this._uid);
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
                    ...cell_(thisStyle, section, i),
                    ...line_(thisStyle, section, i)
                }
            }, {
                cellSelector: cellSelector_(section, i, this._uid),
                lineSelector: lineSelector_(section, i, this._uid)
            });
        }
    }

    function cellSelector_(section, i, uid) {
        if (section === '*') {
            return `.table[uid="${uid}"] > div > div.col > div.row > div:nth-child(${2 * i + 1})`;
        } else {
            return `.table[uid="${uid}"] > div > div.col > div.row[section="${section}"] > div:nth-child(${2 * i + 1})`;
        }
    }

    function lineSelector_(section, i, uid) {
        if (section === '*') {
            return `.table[uid="${uid}"] > div > div.col > div.row > div:nth-child(${2 * i})`;
        } else {
            return `.table[uid="${uid}"] > div > div.col > div.row[section="${section}"] > div:nth-child(${2 * i})`;
        }
    }

    function cell_(thisStyle, section, i) {
        const rule = Object.entries(thisStyle[section]).filter((property) => {
            return property[1][i] !== '';
        }).map((property) => {
            if (property[0] === '@show') {
                const button = document.querySelector(`[table-col="explorer-${section}-${i}"]`);
                if (button) {
                    button.setAttribute('show', property[1][i] === 0);
                }
                return !property[1][i] ? [
                    'flex: 0 1 0',
                    'opacity: 0'
                ].join(';') : '';
            } else {
                return property[0] + ':' + property[1][i];
            }
        });
        if (rule.length === 0) return {};
        return {
            '#{$cellSelector}': rule
        };
    }

    function line_(thisStyle, section, i) {
        if (!thisStyle[section]['@show']) return {};
        if (!thisStyle[section]['@show'][i]) {
            return {
                '#{$lineSelector}': [
                    'opacity: 0',
                    'min-width: 0px'
                ]
            };
        } else {
            return {
                '#{$lineSelector}': [
                    'opacity: 1',
                    'min-width: 1px'
                ]
            };
        }
    }
};