export default function nativeOnObject(child, childIndex, section, nativeOn, isRow) {
    if (nativeOn) {
        const thisNativeOnConfig = {
            ...nativeOn[`${section[0]}${isRow ? '' : '[]'}`],
            ...nativeOn[`${section[0]}${isRow ? '' : `[${childIndex}]`}`]
        };
        return Object
            .keys(thisNativeOnConfig)
            .reduce((object, eventName) => {
                object[eventName] = event => thisNativeOnConfig[eventName](event, child, childIndex);
                return object;
            }, {});
    } else {
        return {};
    }
}
