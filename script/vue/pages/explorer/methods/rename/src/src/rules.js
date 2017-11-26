import toNumber from './toNumber';
import path from 'path';
import moment from 'moment';
import {
    find
} from 'modules';

module.exports = {
    name(name, file) {
        return name.replace(/<name>/g, path.basename(file[2].name, path.extname(file[2].name)));
    },
    project(name) {
        return name.replace(/<#([\d\.]+)>/g, function(match, index) {
            return find('project').project[index][1];
        });
    },
    number(name) {
        return name.replace(/<([\d\.]+)>/g, function(match, number) {
            return toNumber(number);
        });
    },
    index(name, file) {
        return name.replace(/<(\d+)\+>/g, function(match, number) {
            const result = [];
            for (let i = 0; i < file[0].count; i++) {
                result.push(toNumber(Number(number) + file[0].renamePageID + i));
            }
            return result.join('-');
        });
    },
    extension(name, file) {
        const explorer = find('explorer');
        if (explorer.explorerMode === 'convertMode') {
            const ext = '.' + explorer.allowConvertExtension[explorer.convertExtensionID].toLowerCase();
            return name.replace(/<ext>/g, ext);
        } else {
            return name.replace(/<ext>/g, path.extname(file[2].name));
        }
    },
    date(name, file) {
        return name.replace(/<date>/g, moment(file[0].stat.mtime).format('YYYY-MM-DD'));
    }
};
