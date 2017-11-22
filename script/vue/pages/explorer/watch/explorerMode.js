module.exports = function mode(value) {
    if (value === "explorerMode") {
        this.selectFile("none");
    }
    this.updateRename();
};
