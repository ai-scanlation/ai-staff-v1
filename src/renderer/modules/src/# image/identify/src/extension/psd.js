// http://www.adobe.com/devnet-apps/photoshop/fileformatashtml/#50577409_pgfId-1037450


// 38 42 50 53 - hex
// 8BPS - ascii
module.exports = buffer => ({
    height: buffer.readUIntBE(14, 4),
    width: buffer.readUIntBE(18, 4),
    type: 'PSD-' + bit[buffer.readUIntBE(24, 2)]
});

// console.log(`%c+ PSD signature - ${buffer.toString("hex", 0, 4).toString()}`, "color: green");

// console.log(`%c+ Version       - ${buffer.readUIntBE(4, 2)}` , "color: green");
// console.log(`%c+ Reserved      - ${buffer.readUIntBE(6, 6)}` , "color: green");
// console.log(`%c+ channels      - ${buffer.readUIntBE(12, 2)}`, "color: green");

// console.log(`%c+ Deph          - ${buffer.readUIntBE(22, 2)}`, "color: green");
// console.log(`%c+ Color Mode    - ${buffer.readUIntBE(24, 2)}`, "color: green");

// console.log(`%c+ PSD ver ${buffer.toString("ascii", 4, 2)}`, "color: green");
// console.log(`%c+ PSD ver ${buffer.toString("ascii", 18, 14)}`, "color: green");
// console.log(`%c+ Length ${buffer.toString("hex", 8, 16).toString()}`, "color: green");
// console.log(`%c+ Height ${buffer.readUIntBE(20, 4)}`, "color: green");
// console.log(`%c+ Color ${buffer.readUIntBE(25, 1)}`, "color: green");

// const color = {
//     '0': 'Bitmap',
//     '1': 'Grayscale',
//     '2': 'Indexed',
//     '3': 'RGB',
//     '4': 'CMYK',
//     '7': 'Multichannel',
//     '8': 'Duotone',
//     '9': 'Lab'
// };

const bit = {
    '0': '24',
    '1': '8',
    '2': '8',
    '3': '24',
    '4': '24',
    '7': 'Multi',
    '8': 'Duotone',
    '9': 'Lab'
};
