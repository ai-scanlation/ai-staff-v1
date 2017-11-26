import fs from 'fs';
const MaxBufferSize = 128 * 1024;

module.exports = function asyncBuffer(filePath, size, callback) {
    fs.open(filePath, 'r', function(err, descriptor) {
        if (err) {
            return callback(err);
        }
        var bufferSize = Math.min(size, MaxBufferSize);
        var buffer = new Buffer(bufferSize);
        fs.read(descriptor, buffer, 0, bufferSize, 0, function(err) {
            if (err) {
                return callback(err);
            }
            fs.close(descriptor, function(err) {
                return callback(err, buffer);
            });
        });
    });
};


