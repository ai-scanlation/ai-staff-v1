import recursiveFind from './src/recursiveFind.js';
module.exports = function find(findPath) {
    if (arguments.length >= 3) {
        const arg = [...arguments].slice(1);
        return find(findPath, find(...arg));
    }
    const returnArray = !!(typeof arguments[1] === 'boolean' || Array.isArray(arguments[1]));
    if (!findPath) {
        if (returnArray) return [];
        else return;
    }
    if (arguments[0].constructor.name === 'VueComponent') {
        if (returnArray) return [arguments[0]];
        else return arguments[0];
    }
    const [name, ref, property] = findPath.replace(/^([^.[\]]*)(\[([^.[\]]+)\])?\.?([^.[\]]+)?$/, '$1\\$3\\$4').split('\\');
    const callback = typeof arguments[1] === 'function' ? arguments[1] : () => {};
    if (name[0] === '#') {
        const modules = require('modules');
        const moduleName = name.substr(1);
        if (moduleName == '') {
            callback(modules, property);
            return [modules, property];
        } else {
            callback(modules[moduleName], property);
            return [modules[moduleName], property];
        }
    } else if (name || ref) {
        const where = (typeof arguments[1] === 'string') ? [find(arguments[1])]
            : (Array.isArray(arguments[1]) ? [arguments[1][0]]
                : ((typeof arguments[1] === 'object' && arguments[1].constructor.name === 'VueComponent') ? [arguments[1]]
                    : undefined)
            );
        const result = recursiveFind(name, ref, where);
        if (!result) {
            console.log(arguments);
            throw "Không tìm thấy: component trong path: '" + findPath + "' ";
        }
        if (property && result[property] === undefined) {
            console.log(arguments);
            console.log(result.$el);
            throw "Không tìm thấy: property: '" + property + "' trong path: '" + findPath + "'";
        }
        callback(result, property);
        if (returnArray) return [result, property];
        else return result;
    } else {
        if (returnArray) return [];
        else return '';
    }
};

global.$$$ = module.exports;