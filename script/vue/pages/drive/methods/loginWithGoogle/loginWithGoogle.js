import childProcess from 'child_process';
import expressServerText from 'raw-loader!./src/expressServer';
import fs from 'fs';
// import googleapis from 'googleapis';
import {
    google
} from 'modules';

const expressServerPath = './temp/expressServer';
let oauth2Client = {};

async function refreshAccessToken() {
    new Promise(resolve => {
        oauth2Client.refreshAccessToken((err, token) => {
            if (err) {
                module.$store.commit('set', {
                    path: 'google.auth.refresh_token',
                    value: undefined
                });
                resolve(undefined);
            }
            resolve(token);
        });
    });
}
async function getCode() {
    return new Promise(resolve => {
        fs.writeFileSync(expressServerPath, expressServerText);
        window.open(oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        }));
        childProcess.fork(expressServerPath).on('message', (code) => {
            fs.unlink(expressServerPath, (err) => {
                if (err) console.error('Không thể xóa file: ' + expressServerPath);
            });
            resolve(code);
        });
    });
}
async function getTokenFromCode() {
    const code = await getCode();
    return new Promise(resolve => {
        oauth2Client.getToken(code, (err, token) => {
            if (err) throw err;
            resolve(token);
        });
    });
}
async function storeToken(token) {
    token.refresh_token = token.refresh_token || module.$store.state.google.auth.refresh_token;
    oauth2Client.credentials = token;
    module.$store.commit('set', {
        path: 'google.oauth2Client',
        value: oauth2Client
    });
    module.$store.commit('set', {
        path: 'google.auth',
        value: token
    });
    return;
}

function getMail() {
    // googleapis.plus('v1').people.get({
    //     auth: oauth2Client,
    //     userId: 'me',
    //     fields: 'emails'
    // }, (err, res) => {
    //     if (err) throw err;
    //     module.$store.commit('set', {
    //         path: 'google.email',
    //         value: res.emails[0].value
    //     });
    // });
}
module.exports = async function() {
    module.$store = this.$store;

    oauth2Client = google().getOauth2Client();
    storeToken(await refreshAccessToken() || await getTokenFromCode());
    getMail();
};