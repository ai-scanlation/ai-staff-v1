const iconMap = require('./icon.json');
export default {
    extToFile: extToFile
};

function extToFile(ext) {
    ext = ext.toLowerCase();
    const iconFile = iconMap[ext];
    if (iconFile) {
        return `./img/icons/${iconFile}.svg`;
    } else {
        return extToFile('file');
    }
}