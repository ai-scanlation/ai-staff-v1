const include = function(_require, $1 = 1, $2 = 1, ext = 'js', not = /\.$/) {
    if (_require.name !== 'webpackContext') {
        // debugger;
        return {};
        // throw [_require, _require.name, '_require - phải được tạo ra từ require.context'];
    }
    const results = {};
    _require.keys().forEach(key => {
        const match = new RegExp(`^.(/[^/]+){${$1},${$2}}.${ext}$`, 'i');
        if (key.match(match) && (!not.test(key))) {
            const replace = new RegExp('^./([^/]+/)*([^/]+).' + ext + '$');
            results[key.replace(replace, '$2')] = _require(key);
        }
    });
    return results;
};

include.method = {
    context: ['./methods/', true, /[^/]+\.js$/],
    include: [1, 4, 'js', /src/]
};


module.exports = include;
