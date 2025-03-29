const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const k = 1000; // or 1024 for binary
    
module.exports = function toSize(number) {
    const bytes = parseInt(number);
    if (bytes === 0) return '0 Byte';    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (parseFloat((bytes / Math.pow(k, i)).toFixed(3)) + ' ' + sizes[i]).replace('.', ',');
};
