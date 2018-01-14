import {
    BrowserWindow
} from 'electron';

export default function createWindow(onClose = () => {}) {
    const window = new BrowserWindow({
        webPreferences: {
            experimentalFeatures: true
        },
        width: 1100,
        height: 700,
        'min-height': 300,
        'min-width': 300
    });

    const url = process.env.NODE_ENV == 'production'
        ? `file://${__dirname}/index.html`
        : `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`;

    window.loadURL(url);
    window.on('closed', onClose);

    window.webContents.openDevTools();
    window.webContents.on('devtools-opened', () => {
        window.focus();
        setImmediate(() => window.focus());
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