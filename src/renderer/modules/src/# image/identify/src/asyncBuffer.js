import fs from 'fs';
const MaxBufferSize = 128 * 1024;

module.exports = function asyncBuffer(filePath, size, callback) {
    fs.open(filePath, 'r', (err, descriptor) => {
        if (err) return callback(err);

        const bufferSize = Math.min(size, MaxBufferSize);
        const buffer = new Buffer(bufferSize);

        fs.read(descriptor, buffer, 0, bufferSize, 0, err => {
            if (err) return callback(err);
            fs.close(descriptor, err => callback(err, buffer));
        });
    });
};
