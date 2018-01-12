const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const isDevelopment = process.env.NODE_ENV !== 'production';
const url = isDevelopment
    ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
    : `file://${__dirname}/index.html`;

let main;

function createWindow() {
    const window = new BrowserWindow({
        // webPreferences: {
        //     experimentalFeatures: true
        // },
        width: 900,
        height: 600,
        'min-height': 300,
        'min-width': 300
    });

    window.webContents.openDevTools();
    window.loadURL(url);
    window.on('closed', function() {
        main = null;
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

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (main === null) main = createWindow();
});

app.on('ready', () => {
    main = createWindow();
});