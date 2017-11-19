import insertRule from './insertRule';
import getStyleElement from './getStyleElement';

// properties => noOverwriteProperties
module.exports = function setRule(selector, rules, group, overwrite) {
    getStyleElement(group, (sheet) => {
        if (!overwrite) {
            if (sheet.properties.indexOf(selector) === -1) {
                sheet.properties.push(selector);
                insertRule(selector, rules, sheet);
            }
        } else {
            const length = sheet.cssRules.length;
            for (let index = 0; index < length; index++) {
                if (selector.replace(/\s/g, '') === sheet.cssRules[index].selectorText.replace(/\s/g, '')) {
                    sheet.deleteRule(index);
                    insertRule(selector, rules, sheet, index);
                    return;
                }
            }
            insertRule(selector, rules, sheet);
        }
    });
};
