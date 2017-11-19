import {
    remote
} from 'electron';
import {
    find
} from '~/modules/components';

module.exports = function selectFolder(query) {
    find(query, (element, property) => {
        const path = remote.dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        if (path !== undefined) {
            element[property] = path[0];
        }
    });
};
