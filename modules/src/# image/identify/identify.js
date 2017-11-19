import queue from 'queue';

import asyncBuffer from './src/asyncBuffer.js';
import identifyType from './src/identifyType.js';
import include from '~/modules/include.js';
import complierString from '../../# components/complier/complierString';

const extension = include(require.context('./src/extension', false, /[^\/]+\.js$/));

const Q = queue();
Q.concurrency = 1;

module.exports = function identify(filePath, stat, file, callback) {
    // khi thực hiện cuộc gọi phi đồng bộ thì các hàm dưới đây sẽ được gọi
    Q.concurrency = complierString('{setting.imagemagickConcurrency}');
    Q.push((next) => {
        asyncBuffer(filePath, stat.size, (err, buffer) => {
            if (!err) {
                const type = identifyType(buffer);
                if (typeof extension[type] === 'function') {
                    const identifyInfo = extension[type](buffer);
                    next();
                    callback(identifyInfo, file);
                }
            } else {
                next();
            }
        });
    });
    Q.start();
};
