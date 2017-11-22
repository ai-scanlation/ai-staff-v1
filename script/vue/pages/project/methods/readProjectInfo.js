import fs from 'fs';
import path from 'path';
import {
    find
} from 'modules';
import dic from '../src/projectStatusDictionary';

module.exports = function(projectFolder) {
    // let projectFolder = find("explorer").defaultFolder_1;
    return fs.readdirSync(projectFolder).map((folder) => {
        const filePath = path.join(projectFolder, folder, '.aiscans');
        if (!fs.existsSync(filePath)) {
            return [-1];
        }
        const data = fs.readFileSync(filePath, 'utf8').split(/\r\n|\n|\r/, 4);
        data[0] = Number(data[0]);
        data[3] = dic[data[3]];
        return data;

        // let jsonPath = path.join(projectFolder, folder, ".aiscans");
        // if (!fs.existsSync(jsonPath)) {
        //
        //     return [-1];
        // }
        // return [-1];

        // return fs.readFileSync(jsonPath, "utf8").split(/\r\n|\n|\r/, 4);
        // ;;.split(/\n|\r|\r\n/, 4);
        // return fs.readFileSync(jsonPath).split(/\n|\r|\r\n/, 4);
    }).filter((project) =>
        project[0] !== -1
    );
};
