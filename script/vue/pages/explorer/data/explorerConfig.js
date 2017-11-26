import path from 'path';
import {
    find,
    shell
} from 'modules';

module.exports = {
    name: 'explorer',
    type: {
        '*': [
            'hide', /*   0 - data */
            'string', /* 1 - # */
            'file', /*   2 - Tên  */
            'string', /* 3 - Dung lượng */
            'string', /* 4 - Kích thước */
            'string', /* 5 - Đuôi */
            'string', /* 6 - Thời gian */
            'file' /*   7 - Rename  */
        ],
        'title': [
            'hide', /*   0 - data */
            'string', /* 1 - # */
            'string', /* 2 - Tên  */
            'string', /* 3 - Dung lượng */
            'string', /* 4 - Kích thước */
            'string', /* 5 - Đuôi */
            'string', /* 6 - Thời gian */
            'string' /* 7 - Rename  */
        ]
    },
    style: {
        'default': {
            '*': {
                'text-align': [
                    'center',
                    'left',
                    'right',
                    'center',
                    'left',
                    'center',
                    'left'
                ],
                'flex': [
                    '0 1 40px',
                    '1 1 0',
                    '0 1 120px',
                    '0 1 110px',
                    '0 1 90px',
                    '0 1 120px',
                    '1 1 0'
                ]
            },
            'title': {
                'text-align': [
                    'center',
                    'left',
                    'center',
                    'center',
                    'center',
                    'center'
                ]
            }
        },
        'explorerMode': {
            'title': {
                '@show': [1, 1, 1, 1, 1, 1, 0]
            },
            'back': {
                '@show': [1, 1, 1, 1, 1, 1, 0]
            },
            'files': {
                '@show': [1, 1, 1, 1, 1, 1, 0]
            },
            'folders': {
                '@show': [1, 1, 1, 1, 1, 1, 0]
            }
        },
        'renameMode': {
            'title': {
                '@show': [1, 1, 0, 0, 0, 0, 1]
            },
            'files': {
                '@show': [1, 1, 0, 0, 0, 0, 1]
            },
            'back': {
                '@show': [1, 1, 0, 0, 0, 0, 0]
            },
            'folders': {
                '@show': [1, 1, 0, 0, 0, 0, 0]
            }
        },
        'convertMode': {
            'title': {
                '@show': [1, 1, 0, 0, 0, 0, 1]
            },
            'files': {
                '@show': [1, 1, 0, 0, 0, 0, 1]
            },
            'back': {
                '@show': [1, 1, 0, 0, 0, 0, 0]
            },
            'folders': {
                '@show': [1, 1, 0, 0, 0, 0, 0]
            }
        },
        'uploadMode': {
            'title': {
                '@show': [1, 1, 1, 0, 0, 0, 0]
            },
            'files': {
                '@show': [1, 1, 1, 0, 0, 0, 0]
            },
            'back': {
                '@show': [1, 1, 0, 0, 0, 0, 0]
            },
            'folders': {
                '@show': [1, 1, 0, 0, 0, 0, 0]
            }
        }
    },
    nativeOn: {
        'title[1]': {
            click(event, cell, cellIndex) {
                console.log(event, cell, cellIndex);
            }
        },
        'title[2]': {
            click() {
                find('explorer').selectFile('toggleAll');
            }
        },
        'title[]': {
            click(event, cell, cellIndex) {
                if (cellIndex >= 3 && cellIndex <= 6) {
                    find('explorer').explorerToggleProperty(cellIndex - 1, 0);
                }
            }
        },
        'back': {
            click() {
                find('explorer').selectFile('back');
            }
        },
        'folders': {
            click(event, row) {
                find('explorer').selectFile('folder', row);
            }
        },
        'files': {
            click(event, row) {
                find('explorer').selectFile('file', row);
            },
            dblclick(event, row) {
                shell.openFile(path.join(find('explorer').folderPath, row[2].name));
            }
        }
    }
};