module.exports = function toNumber(num, length = 3) {
    num = String(num);
    const right = num.match(/\..*/) ? num.match(/\..*/)[0] : ''; // Phần từ sau dấu chấm thập phân
    let left = Math.floor(num).toString(); // Phần bên trái dấu chấm
    for (var i = left.length; i < length; i++) {
        left = '0' + left;
    }
    return left + right;
};
