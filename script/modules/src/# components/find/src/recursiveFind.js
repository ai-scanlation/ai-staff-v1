module.exports = function recursiveFind(name, ref, where = [document.getElementById('app').__vue__]) {
    let result;
    while (where.length !== 0) {
        let now = where[0];
        // Nếu viết thế này thì có nghĩa là không thể tìm kiếm theo ref
        // Tức là 2 dòng sau chỉ hoạt động đối với các trường hợp root = this
        let result = check(now, undefined);
        if (result) return result;
        for (let itRef in now.$refs) {
            let it = now.$refs[itRef];
            if (Array.isArray(it) && it.length !== 0) {
                let result = check(it[0], itRef, true);
                if (result) return result;
            } else {
                let result = check(it, itRef, true);
                if (result) return result;
            }
        }
        where.shift();
    }
    return result;

    function check(it, itRef, push) {
        if (it.$options.name === name && (itRef === ref || !ref)
            || itRef === ref && !name) {
            return it;
        }
        if (push) where.push(it);
    }
};
