import find from '../find/find';
module.exports = function complierString(returnValue, self, eachParent = () => {}, eachState = () => {}) {
    // Ý nghĩa của vòng for: 
    // nếu chuỗi trong { } được tìm thấy và 
    // bên trong { } không có { } nào thì thay thế { path } bằng `giá trị`

    const curlyBracketAndContent = /{([^{}]+)}/;
    while (curlyBracketAndContent.test(returnValue)) {
        returnValue = returnValue.replace(curlyBracketAndContent, (match, path) => {
            let returnReplace = '';

            if (path[0] == '$') {
                const $store = document.getElementById('app').__vue__.$store;
                eachState(path.substr(1));
                return $store.getters['get:' + path.substr(1)];
            } else {
                // findPath: [chuỗi không có (.)](.)[chuỗi không có (.)([)(])]
                // indexString: ngoặc vuông [] chứa chuỗi không có ngoặc vuông
                const [, findPath, indexString] = /^([^.]+\.[^.[\])]+)((\[[^[\]]+\])+)?$/.exec(path);

                const indexArray = !indexString
                    ? []
                    : indexString.match(/\[[^[\]]+\]/g).map((el) => {
                        const key = el.replace(/[[\]]/g, '');
                        return Number(key) || key;
                    });

                // Xử lý findPath và indexString
                const args = [findPath, self, true].filter((value) => {
                    return value !== undefined;
                });
                const [parent, property] = find(...args);
                if (parent && property !== undefined
                    && parent[property] !== undefined) {
                    // Watchs bây h là mảng mới nên sẽ thêm watch vào
                    eachParent(parent, property);
                    returnReplace = (typeof parent[property] === 'function')
                        ? '' : parent[property];
                    if (indexString) {
                        while (indexArray.length > 0) {
                            const childValue = returnReplace[indexArray[0]];
                            if (childValue !== undefined) {
                                returnReplace = childValue;
                                indexArray.shift();
                            } else {
                                break;
                            }
                        }
                    }
                }
            }
            return returnReplace;
        });
    }
    return returnValue;
};

// global.c = module.exports;

// ("{explorer.allowConvertWidth[{explorer.convertWidthID}]}")