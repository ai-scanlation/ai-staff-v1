import upload from './upload';
import Vue from 'vue';
const $store = {};

import 'babel-polyfill';

module.exports = async function eachLocalFile(localFile, folderID) {
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
};
