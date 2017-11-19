// Documents: https://www.w3.org/TR/PNG/#11IHDR

module.exports = function png(buffer) {
    return {
        'width': buffer.readUIntBE(16, 4),
        'height': buffer.readUIntBE(20, 4),
        'type': 'PNG-' + bit[buffer.readUIntBE(25, 1)]
    };
};

// let color = {
//     "0": "Grayscale",
//     "2": "RGB",
//     "3": "Indexed",
//     "4": "Grayscale with Alpha",
//     "6": "RGB with Alpha"
// };

const bit = {
    '0': '8',
    '2': '24',
    '3': '8',
    '4': '8',
    '6': '24'
};
