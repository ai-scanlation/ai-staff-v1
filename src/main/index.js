'use strict';

import {
    app
} from 'electron';

import window from './index.window';

let main;

const initMain = () => {
    main = window(() => {
        main = null;
    });
};

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (main === null) initMain();
});

app.on('ready', initMain);