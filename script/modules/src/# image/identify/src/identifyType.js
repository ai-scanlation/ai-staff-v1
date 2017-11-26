module.exports = function identifyType(buffer) {
    if (!buffer) return 'folder';
    let type = null;
    const ext = {
        'png': () => {
            return buffer.toString('hex', 0, 8) === '89504e470d0a1a0a';
        },
        'jpg': () => {
            return buffer.toString('hex', 0, 2) === 'ffd8';
        },
        'psd': () => {
            return buffer.toString('hex', 0, 4) === '38425053';
        }
    };
    Object.keys(ext).some((key) => {
        if (ext[key]()) {
            type = key;
            return;
        }
    });
    return type;
};
