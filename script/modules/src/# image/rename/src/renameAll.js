import renameOne from './renameOne';
/**
 * file {
 *     source: string, 
 *     target: string,
 *     file: array (lấy trực tiếp Object từ ExplorerData)
 * }
 */
module.exports = function renameAll(files, each) {
    files.forEach((file) => {
        renameOne(file, each);
    });
};
