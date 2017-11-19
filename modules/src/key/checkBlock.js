module.exports = checkBlock;

function checkBlock(block, result = {}, condition = []) {
    for (const child in block) {
        const blockChild = block[child];
        if (!block.hasOwnProperty(child)) continue;
        const ex = /^@(case|key)(:(.+))?$/.exec(child);
        if (ex[1] === 'key') {
            if (ex[0] === '@key') {
                for (const key in blockChild) {
                    importKey(result, condition, blockChild[key], key);
                }
            } else {
                importKey(result, condition, block[child], ex[3]);
            }
        } else if (ex[1] === 'case') {
            if (ex[0] === '@case') {
                for (const name in blockChild) {
                    for (const value in blockChild[name]) {
                        checkBlock(blockChild[name][value], result, condition.concat([
                            [name, value]
                        ]));
                        // importKey(result, condition, keys[key], key);
                    }
                }
            } else {
                for (const value in blockChild) {
                    checkBlock(blockChild[value], result, condition.concat([
                        [ex[3], value]
                    ]));
                }
            }
        }
    }
    return result;
}

function importKey(result, condition, action, key) {
    if (result[key] === undefined) result[key] = [];
    result[key].push({
        condition: condition,
        action: action
    });
}

