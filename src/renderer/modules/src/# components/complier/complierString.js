import find from '../find/find';

const emptyFunction = () => {};
const eachIndex = function(el) {
    const key = el.replace(/[[\]]/g, '');
    return Number(key) || key;
};

module.exports = function complierString(
    returnValue,
    self,
    each_component = emptyFunction,
    each_state = emptyFunction
) {
    const $store = document.getElementById('app').__vue__.$store;

    // Ý nghĩa của vòng for: 
    // nếu chuỗi trong { } được tìm thấy và 
    // bên trong { } không có { } nào thì thay thế { path } bằng `giá trị`

    // if(returnValue == '{explorewr.targetFolderChildPattern}') debugger;

    const curlyBracketAndContent = /{([^{}]+)}/;
    while (curlyBracketAndContent.test(returnValue)) {
        returnValue = returnValue.replace(curlyBracketAndContent, (match, path) => {
            if (path[0] == '$') {
                each_state($store, path.substr(1));
                return $store.getters['get:' + path.substr(1)];
            } else {
                // findPath: [chuỗi không có (.)](.)[chuỗi không có (.)([)(])]
                // indexString: ngoặc vuông [] chứa chuỗi không có ngoặc vuông
                const template = /^([^.]+\.[^.[\]]+)((\[[^[\]]+\])+)?$/;
                const [, findPath, indexString] = template.exec(path);

                const indexArray = !indexString ? []
                    : indexString.match(/\[[^[\]]+\]/g).map(eachIndex);

                // Xử lý findPath và indexString
                const args = [findPath, self, true].filter(value => value !== undefined);
                const [parent, property] = find(...args);

                if (!parent || property === undefined || parent[property] === undefined) return '';

                each_component(parent, property);
                let returnReplace = typeof parent[property] === 'function' ? '' : parent[property];
                if (indexString) {
                    while (indexArray.length > 0) {
                        const childValue = returnReplace[indexArray[0]];
                        if (childValue == undefined) break;

                        returnReplace = childValue;
                        indexArray.shift();
                    }
                }
                return returnReplace;
            }
        });
    }
    return returnValue;
};
