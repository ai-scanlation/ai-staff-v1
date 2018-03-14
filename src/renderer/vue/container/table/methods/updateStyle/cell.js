export default function cell(thisStyle, section, i) {
    const rule = Object
        .entries(thisStyle[section])
        .filter(property => property[1][i] !== '')
        .map(property => {
            if (property[0] === '@show') {
                const button = document.querySelector(`[table-col="explorer-${section}-${i}"]`);
                if (button) button.setAttribute('show', property[1][i] === 0);
                return property[1][i] ? '' : 'flex: 0 1 0; opacity: 0';
            } else {
                return property[0] + ':' + property[1][i];
            }
        });
    if (rule.length === 0) return {};
    else return {
        '#{$cellSelector}': rule
    };
}
