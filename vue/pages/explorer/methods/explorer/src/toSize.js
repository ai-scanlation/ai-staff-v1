module.exports = function toSize(number) {
    var bytes = parseInt(number);
    if (bytes === 0) return '0 Byte';
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var k = 1000; // or 1024 for binary
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (parseFloat((bytes / Math.pow(k, i)).toFixed(3)) + ' ' + sizes[i]).replace('.', ',');
};
