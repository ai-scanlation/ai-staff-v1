import {
    remote
} from 'electron';
import fs from 'fs';
module.exports = function() {
    const path = remote.dialog.showOpenDialog({
        properties: ['openFile'],
        title: 'Mở file client_secret.json',
        filters: [{
            name: 'client_secret',
            extensions: ['json']
        }]
    });
    console.log(path);
    fs.readFile(path[0], (err, content) => {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        this.$store.commit('set', {
            path: 'google.client_secret',
            value: JSON.parse(content).web
        });
        // Authorize a client with the loaded credentials, then call the
        // Drive API.
        // authorize(JSON.parse(content), listFiles);
    });
};