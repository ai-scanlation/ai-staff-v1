/* global require */
var packager = require('electron-packager');

var options = {
    dir: '.',
    arch: 'x64',
    // asar: true,
    // {
    //     // unpackDir: "{.vscode, .sass-cache, script, style, node_modules}",
    //     // unpack: "{.jsbeautifyrc, .eslintignore, .eslintrc.json, .babelrc, npm-debug*, webpack.config.js}"
    // },
    out: 'render',
    ignore: [
        /node_modules/,
        /node_modules\/\.bin/,
        /node_modules\/electron-prebuilt/,
        /node_modules\/electron-packager/,
        /script/,
        /style/,
        /\.git/,
        /\.vscode/,
        /\.jsbeautifyrc/,
        /\.eslintignore/,
        /\.eslintrc.json/,
        /\.babelrc/,
        /webpack\.config\.js/,
        /renderer\.js/
    ],
    overwrite: true,
    appPaths: './render/win64',
    win32metadata: {
        CompanyName: 'Ai Scans',
        FileDescription: 'Ai Scans',
        OriginalFilename: 'aistaff',
        ProductName: 'aistaff',
        InternalName: 'aistaff'
    },
    icon: 'favicon.ico'
};

packager(options, function doneCallback(err, appPaths) {
    if (err) {
        console.error(err);
    }
    console.log('packaged to ' + appPaths);
});
