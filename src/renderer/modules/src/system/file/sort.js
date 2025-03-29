module.exports = function sort(nameA, nameB) {
    while (nameA[0] === nameB[0]) {
        nameA = nameA.substr(1);
        nameB = nameB.substr(1);
    }
    const reg = /^\d*/g;
    const numberA = nameA.match(reg)[0];
    const numberB = nameB.match(reg)[0];
    const result = (numberA === '' || numberB === '')
        ? nameA.localeCompare(nameB)
        : Number(numberA) - Number(numberB);
    return result;
};
