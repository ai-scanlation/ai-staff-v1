import {
    computed
} from 'modules';

export default computed(
    'explorer', [
        'folderPath',
        'targetFolderPath'
    ],
    this
);