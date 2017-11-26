module.exports = {
    explorer: {
        folderPath: '',
        targetFolderPath: '',
        targetFolderChildPattern: '[Ai Scans] {project.project[{explorer.renameProjectID}][1]} - Chap {explorer.renameNumberString}',
        targetFolderChild: true,
        folders: [],
        files: [],

        defaultFolder_1: '',
        defaultFolder_2: '',
        defaultFolder_3: '',
        defaultFolder_4: '',

        explorerMode: '',
        explorerLimit: true,

        renamePattern: '[Ai Scans] Shiki Chap <15> - <0+><ext>',
        renameProjectID: 1,
        renameNumber: 1,
        renameNumberString: '001',
        renameIndex: 1,

        convertExtensionID: 0,
        convertWidthID: 1,
        convertInterpolateID: 0,
        customConvertWidth: 800,

        allowConvertExtension: [
            'PNG',
            'JPG'
        ],
        allowConvertWidth: [
            '',
            '100%'
        ],
        allowConvertInterpolate: [
            'Average',
            'Average4',
            'Average9',
            'Average16',
            'Background',
            'Bilinear',
            'Blend',
            'Catrom',
            'Integer',
            'Mesh',
            'Nearest',
            'Spline'
        ]
    }
};