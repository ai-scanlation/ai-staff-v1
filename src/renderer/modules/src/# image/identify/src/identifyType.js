module.exports = function identifyType(buffer) {
    if (!buffer) return 'folder';
    let type = null;
    for (const ext in exts) {
        if (!exts[ext](buffer)) continue;
        type = ext;
        break;
    }
    return type;
};

const exts = {
    png: buffer => buffer.toString('hex', 0, 8) === '89504e470d0a1a0a',
    jpg: buffer => buffer.toString('hex', 0, 2) === 'ffd8',
    psd: buffer => buffer.toString('hex', 0, 4) === '38425053'
};
