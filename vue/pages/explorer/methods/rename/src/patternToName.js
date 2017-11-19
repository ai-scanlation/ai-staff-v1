import rules from "./src/rules";
import path from "path";
module.exports = function patternToName(result, file) {
    /**
     * [Ai Scans] Shiki - Chap <15> - <0+> - <ext>
     */
    for (let key in rules) {
        result = rules[key](result, file);
    }
    return result;
};
