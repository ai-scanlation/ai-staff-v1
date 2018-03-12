import recursiveFind from './src/recursiveFind.js';

module.exports = function find(...args) {
    const findPath = args[0];
    if (args.length >= 3) {
        // TODO: tìm trường hợp mà nó lớn hơn hoặc bằng 3 và loại bỏ nso ra
        // thực ra, cai này không có cũng được nhưng không hiểu vì sao
        // mà lúc đó lại code như vậy
        const arg = [...args].slice(1);
        return find(findPath, find(...arg));
    }
    const returnArray = !!(typeof args[1] === 'boolean' || Array.isArray(args[1]));
    if (!findPath) {
        if (returnArray) return [];
        else return;
    }
    if (args[0].constructor.name === 'VueComponent') {
        if (returnArray) return [args[0]];
        else return args[0];
    }
    const [name, ref, property] = findPath.replace(/^([^.[\]]*)(\[([^.[\]]+)\])?\.?([^.[\]]+)?$/, '$1\\$3\\$4').split('\\');
    const callback = typeof args[1] === 'function' ? args[1] : () => {};

    if (name[0] === '#') {
        const modules = require('../../../modules');
        const moduleName = name.substr(1);
        const module = moduleName == '' ? modules : modules[moduleName];
        callback(module, property);
        return [module, property];
    } else if (name || ref) {
        const Null = () => {};
        const root = args[1] || new Null();
        const rootToObjectMapper = {
            Array: root => root[0],
            Null: root => undefined,
            String: root => find(root.replace(/^ai-/, '')),
            VueComponent: root => root
        };
        const rootToObjectFunction = rootToObjectMapper[root.constructor.name] || (() => undefined);
        const object = rootToObjectFunction(root);
        const queue = !object ? undefined : [{
            each_object: object
        }];
        const result = recursiveFind(name, ref, queue);
        if (!result) {
            console.error({
                err: 'Find component',
                log: `Không tìm thấy: component trong path: ${findPath}`
            });
            // debugger;
        }
        if (property && result[property] === undefined) {
            console.error({
                err: 'Find component',
                log: `Không tìm thấy: property: ${property} trong path: ${findPath}`,
                data: {
                    findPath: findPath,
                    property: property,
                    args: args,
                    el: result.$el
                }
            });
        }
        callback(result, property);
        if (returnArray) return [result, property];
        else return result;
    } else {
        if (returnArray) return [];
        else return undefined;
    }
};
