import find from '../find/find';
module.exports = function complierString(value, self, eachPath = () => {}) {
    // if (global.db) debugger;
    while (/{([^{}]+)}/.test(value)) {
        value = value.replace(/{([^{}]+)}/, (match, $1) => {
            let returnValue = '';
            const [all, findPath, indexString] = /^([^.]+\.[^.[\]]+)((\[[^[\]]+\])+)?$/.exec($1);
            if (all !== $1) {
                throw 'Lỗi';
            }
            const indexArray = !indexString ? []
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
                eachPath(parent, property);
                returnValue = (typeof parent[property] === 'function')
                    ? ''
                    : parent[property];
                if (indexString) {
                    while (indexArray.length > 0) {
                        const childValue = returnValue[indexArray[0]];
                        if (childValue !== undefined) {
                            returnValue = childValue;
                            indexArray.shift();
                        } else {
                            break;
                        }
                    }
                }
                return returnValue;
            }
        });
    }
    return value;
};

// global.c = module.exports;

// ("{explorer.allowConvertWidth[{explorer.convertWidthID}]}")