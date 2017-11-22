import rules from './src/rules';
module.exports = function patternToName(result, file) {
    /**
     * [Ai Scans] Shiki - Chap <15> - <0+> - <ext>
     */
    for (const key in rules) {
        result = rules[key](result, file);
    }
    return result;
};
