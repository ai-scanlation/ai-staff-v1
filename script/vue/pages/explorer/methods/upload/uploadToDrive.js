import Vue from 'vue';
import {
    find
} from 'modules';
import fs from 'fs';
import {
    google,
    complierString
} from 'modules';
import googleapis from 'googleapis';
import queue from 'queue';

let drive, $store;

async function getNewFolderID(folderName, parentID) {
    return new Promise(resolve => {
        drive.files.create({
            resource: {
                name: folderName,
                parents: [parentID],
                mimeType: 'application/vnd.google-apps.folder'
            }
        }, (err, folder) => {
            resolve(folder.id);
        });
    });
}
async function getFolderID(path, parentID = 'root') {
    return new Promise(resolve => {
        console.log(path, path.length);
        if (path.length == 0) resolve(parentID);
        else drive.files.list({
            q: `'${parentID}' in parents and name = '${path[0]}' and trashed = false`
        }, async function(err, response) {
            if (response.files.length > 1) throw 'Có nhiều hơn 1 thư mục';
            const folder_id = response.files.length == 0
                ? await getNewFolderID(path[0], parentID)
                : response.files[0].id;
            path.shift();
            resolve(await getFolderID(path, folder_id));
        });
    });
}

async function upload(localFile, folderID) {
    return new Promise(resolve => {
        drive.files.create({
            resource: {
                name: localFile[2].name,
                parents: [folderID]
            },
            media: {
                body: fs.createReadStream(localFile[0].path, parent)
            },
            fields: 'thumbnailLink'
        }, (err, cloudFile) => {
            if (err) {
                console.error('Lỗi: ' + localFile[2].name + ' - Đang thử lại');
                resolve(undefined);
            } else {
                resolve(cloudFile);
            }
        });
    });
}

async function eachLocalFile(localFile, folderID) {
    return new Promise(async resolve => {
        let cloudFile = undefined;
        let loop = 0;
        while (!cloudFile && loop <= 5) {
            loop++;
            console.log(`Đang tải lên(${loop}): ${localFile[2].name}`);
            cloudFile = await upload(localFile, folderID);
        }
        if (loop == 5) resolve(true);
        else {
            Vue.set(localFile[2], 'done', true);
            $store.commit('push', {
                path: 'google.upload.cloudFiles',
                value: {
                    name: localFile[2].name,
                    url: cloudFile.thumbnailLink.replace(/\d+$/, '0')
                }
            });
            resolve(true);
        }
    });
}

module.exports = async function uploadToDrive() {
    $store = this.$store;
    drive = await googleapis.drive({
        version: 'v3',
        auth: google().getOauth2Client()
    });
    const localFiles = find('explorer').getFiles().filter(
        (localFile) => (/(png|jpg|jpeg)$/.test(localFile[2].name))
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