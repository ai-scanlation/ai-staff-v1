const components = require.context('../../../../vue', true, /.*\.vue$/);
module.exports = function(query) {
    const results = {};
    const reg = new RegExp(`^./${query}(?!.*/(src|components)/.*)(/[^/]*)*(.vue)?$`);
    components.keys().forEach((key) => {
        if (reg.test(key)) {
            const name = 'ai-' + key.replace(/^\.\/.*\/([^/]*).vue$/, '$1');
            results[name] = components(key).default;
        }
    });
    return results;
};
