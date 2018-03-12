const iconMap = require('./icon.json');
export default {
    fromExt
};

function fromExt(ext) {
    const lowerExt = ext.toLowerCase();
    const iconFile = iconMap[lowerExt] || 'file';
    return `./img/icons/${iconFile}.svg`;
}
