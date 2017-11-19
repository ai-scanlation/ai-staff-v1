const styleGroups = {};

global.all = function() {
    for (const group in styleGroups) {
        const sheet = styleGroups[group].sheet;
        const length = sheet.cssRules.length;
        for (let index = 0; index < length; index++) {
            console.log(group, sheet.cssRules[index].cssText);
        }
    }
};

module.exports = function getStyleElement(group = 'default', callback = () => {}) {
    if (!styleGroups.hasOwnProperty(group)) {
        styleGroups[group] = document.createElement('style');
        document.head.appendChild(styleGroups[group]);
        styleGroups[group].sheet.properties = [];
    }
    callback(styleGroups[group].sheet);
};
