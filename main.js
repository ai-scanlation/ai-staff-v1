const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        webPreferences: {
            experimentalFeatures: true
        },
        width: 900,
        height: 600,
        'min-height': 300,
        'min-width': 300
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
    // Install `vue-devtools`
    if (process.env.NODE_ENV === 'development') {
        const installExtension = require('electron-devtools-installer');
        installExtension.default(installExtension.VUEJS_DEVTOOLS)
            .then(name => {
                console.log(`Added Extension: ${name}`);
            })
            .catch(err => {
                console.log('Unable to install `vue-devtools`: \n', err);
            });
        require('devtron').install();
    }
    mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
