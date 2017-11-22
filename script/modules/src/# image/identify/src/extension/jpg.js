// http://vip.sugovica.hu/Sardi/kepnezo/JPEG%20File%20Layout%20and%20Format.htm
// https://github.com/image-size/image-size/blob/master/lib/types/jpg.js

module.exports = function(buffer) {
    buffer = findSOFBlock(buffer);
    return {
        'height': buffer.readUIntBE(5, 2),
        'width': buffer.readUIntBE(7, 2),
        'type': 'JPEG-' + bit[buffer.readUIntBE(9, 1)]
    };
};

function findSOFBlock(buffer) {
    // Ở đây là FF D8 FF E0
    buffer = buffer.slice(2);
    // Bỏ FF D8 ra (2 byte đầu tiên)
    // FFD8 là định nghĩa họ JPG nói chung
    while (buffer.length) {
        // byte đầu tiên phải là 0xFF
        if (buffer[0] !== 0xFF) {
            throw new TypeError('Không phải là JPG, mỗi block phải bắt đầu bằng 0xFF');
        }
        if (buffer[1] === 0xC0 || buffer[1] === 0xC2) {
            /**
             * Nếu Buffer[1] là
             *     0xC0 : SOF0
             *     0xC2 : SOF2
             * Nếu là một trong 2 cái này thì trả buffer về để đọc
             */
            return buffer;
        }
        const length = buffer.readUIntBE(2, 2);
        buffer = buffer.slice(length + 2);
    }
    throw new TypeError('Tập tin hỏng');
}

// let color = {
//     "1": "Grayscale",
//     "3": "RGB",
//     "4": "CMYK"
// };

const bit = {
    '1': '8',
    '3': '24',
    '4': '24'
};
