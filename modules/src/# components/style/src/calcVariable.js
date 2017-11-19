/*eslint 
    no-unused-vars: ["warn", { "argsIgnorePattern": "vars" }]
*/
module.exports = function calcVariable(css, vars) {
    if (Array.isArray(css)) {
        css = css.join(';');
    }
    return css.replace(/#{([$.\w\s()+\-*/]+)}/g, (match, $1) => {
        return eval($1.replace(/\$/g, 'vars.'));
    });
};
