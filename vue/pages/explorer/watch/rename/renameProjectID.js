import {
    find
} from "~/modules";
module.exports = function renameProjectID(value) {
    this.renamePattern = this.renamePattern.replace(/<#([\d\.]+)?>/g, `<#${value}>`);
};
