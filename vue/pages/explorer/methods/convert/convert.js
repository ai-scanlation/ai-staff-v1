import path from 'path';
import Vue from 'vue';
import {
    convert,
    complierString,
    createFolder
} from '~/modules';
module.exports = function convertFunction() {
    const targetFolder = this.targetFolderChild
        ? path.join(this.targetFolderPath, complierString(this.targetFolderChildPattern))
        : this.targetFolderPath;
    createFolder(targetFolder);
    const files = this.explorerData['@scroll'].files.filter((file) => {
        return file[0].count !== 0;
    });

    files.forEach((file) => {
        Vue.set(file[7], 'converted', file);
        let width = complierString('{explorer.allowConvertWidth[{explorer.convertWidthID}]}');
        width = (width === '') ? complierString('{explorer.customConvertWidth}')
            : (width === '100%' ? undefined
                : parseInt(width));
        convert({
            source: path.join(this.folderPath, file[2].name),
            target: path.join(targetFolder, file[7].name),
            file: file
        }, {
            scale: width,
            interpolate: complierString('{explorer.allowConvertInterpolate[{explorer.convertInterpolateID}]}')
        }, (err, object) => {
            if (err) throw err;
            Vue.set(object.file[7], 'converted', true);
        });
    });
};