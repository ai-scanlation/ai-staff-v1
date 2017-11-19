import {
    exec
} from 'child_process';
import find from '../../../# components/find/find';

module.exports = function convertOne(file, options = {}, each) {
    let optionsText = '';
    if (typeof options === 'object') {
        optionsText = Object.entries(options)
            .filter((option) => (option[1] !== undefined))
            .map((option) => {
                return `-${option[0]} ${option[1]}`;
            }).join(' ');
    }
    const setting = find('setting');
    const convertCommand = `"${setting.imagemagick}\\convert" ${optionsText} "${file.source}[${file.layer === undefined ? 0 : file.layer}]" "${file.target}"`;
    exec(convertCommand, {
        encoding: 'utf8'
    }, (err) => {
        each(err, file);
    });
};