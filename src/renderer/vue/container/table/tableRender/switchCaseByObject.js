export default function switchCaseByObject(array = [], initialValue = undefined) {
    array.forEach(each => {
        if (each[1]) initialValue = each[0];
    });
    return initialValue;
}
