import fs from 'fs';
import path from 'path';
import dic from '../src/projectStatusDictionary';

/**
 * readProjectInfo
 * Trong mỗi thư mục project sẽ có một file .aiscans
 * File này chứa 4 thông số, tương ứng với thông tin của mỗi project
 * @param {*} projectFolder 
 */
module.exports = function readProjectInfo(projectFolder) {
    const eachProjectFolder = folder => {
        const filePath = path.join(projectFolder, folder, '.aiscans');
        if (!fs.existsSync(filePath)) return [null];

        const data = fs.readFileSync(filePath, 'utf8').split(/\r\n|\n|\r/, 4);
        data[0] = Number(data[0]);
        data[3] = dic[data[3]];

        return data;
    };
    try {
        return fs
            .readdirSync(projectFolder)
            .map(eachProjectFolder)
            .filter(project => project[0] !== null);
    } catch (e) {
        console.warn({
            err: 'In readProjectInfo: can\'t read this folder.',
            data: {
                folder: projectFolder
            }
        });
        return [];
    }
};
