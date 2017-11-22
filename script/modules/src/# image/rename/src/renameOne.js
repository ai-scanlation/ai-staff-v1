import fs from 'fs';
module.exports = function renameOne(file, each) {
    if (!fs.existsSync(file.target)) {
        fs.rename(file.source, file.target, (err) => {
            if (err) throw err;
            each(file);
        });
    } else {
        console.error('Tập tin đã tồn tại');
    }
};
