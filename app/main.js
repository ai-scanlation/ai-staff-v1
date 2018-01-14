'use strict';

import {
    app,
    BrowserWindow
} from 'electron';

const isDevelopment = process.env.NODE_ENV !== 'production';

let main;

function createMainWindow() {
    const window = new BrowserWindow({
        webPreferences: {
            experimentalFeatures: true
        },
        width: 900,
        height: 600,
        'min-height': 300,
        'min-width': 300
    });

    const url = isDevelopment
        ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
        : `file://${__dirname}/index.html`;

    window.webContents.openDevTools();
    window.loadURL(url);
    window.on('closed', function() {
        main = null;
    });

    window.webContents.on('devtools-opened', () => {
        window.focus();
        setImmediate(() => {
            window.focus();
        });
    });

    // Install `vue-devtools`
    // if (process.env.NODE_ENV === 'development') {
    //     const installExtension = require('electron-devtools-installer');
    //     installExtension.default(installExtension.VUEJS_DEVTOOLS)
    //         .then(name => {
    //             console.log(`Added Extension: ${name}`);
    //         })
    //         .catch(err => {
    //             console.log('Unable to install `vue-devtools`: \n', err);
    //         });
    //     require('devtron').install();
    // }

    return window;
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();

});
app.on('activate', () => {
    if (main === null) main = createMainWindow();
});

app.on('ready', () => {
    main = createMainWindow();
});