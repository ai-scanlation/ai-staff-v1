module.exports = function insertRule(selector, rules, sheet, index = sheet.cssRules.length) {
    sheet.insertRule(`${selector} { ${rules} }`, index);
};
