import check from './check';

module.exports = function recursiveFind(name, ref, queue = [{
    each_object: document.getElementById('app').__vue__
}]) {
    while (queue.length !== 0) {
        const result = check(name, ref, queue);
        if (result) return result;
        queue.shift();
    }
};
