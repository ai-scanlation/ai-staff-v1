import {
    find
} from 'modules';
import {
    google
    // complierString
} from 'modules';
import googleapis from 'googleapis';
import queue from 'queue';

// import getNewFolderID from './api/getNewFolderID';
import getFolderID from './api/getFolderID';
// import upload from './api/upload';
import eachLocalFile from './api/eachLocalFile';

let drive, $store;

import 'babel-polyfill';

module.exports = async function uploadToDrive() {
    $store = this.$store;
    drive = await googleapis.drive({
        version: 'v3',
        auth: google().getOauth2Client()
    });
    const localFiles = find('explorer').getFiles().filter(
        localFile => /(png|jpg|jpeg)$/.test(localFile[2].name)
    );
    $store.commit('set', {
        path: 'google.upload.localFiles',
        value: localFiles
    });
    $store.commit('set', {
        path: 'google.upload.cloudFiles',
        value: []
    });
    const renameProjectIDString = this.$store.state.explorer.renameProjectIDString;
    const renameChapterIDString = this.$store.state.explorer.renameChapterIDString;
    const renameProjectID = this.$store.state.explorer.renameProjectID;
    const projectName = this.$store.state.project.project[renameProjectID][2];

    const folderID = await getFolderID([
        '[Ai Scans]',
        `${renameProjectIDString} - ${projectName}`,
        `Chương ${renameChapterIDString}`
    ]);

    await new Promise((resolve) => {
        drive.files.list({
            q: `'${folderID}' in parents and trashed = false`
        }, async function(err, response) {
            for (const file of response.files) {
                await new Promise(deleted => {
                    drive.files.delete({
                        fileId: file.id
                    }, (err, res) => {
                        if (err) console.log(err, res);
                        console.log('Đã xóa file cũ: ' + file.name);
                        deleted();
                    });
                });
            }
            resolve();
        });
    });

    const Q = queue();
    Q.concurrency = 6;
    localFiles.forEach(localFile => {
        Q.push(function() {
            return new Promise(async resolve => {
                resolve(await eachLocalFile(localFile, folderID));
            });
        });
    });
    Q.start();
};
