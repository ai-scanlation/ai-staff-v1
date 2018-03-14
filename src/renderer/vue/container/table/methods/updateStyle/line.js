export default function line(thisStyle, section, i) {
    if (!thisStyle[section]['@show']) return {};
    if (!thisStyle[section]['@show'][i]) {
        return {
            '#{$lineSelector}': [
                'opacity: 0',
                'min-width: 0px'
            ]
        };
    } else {
        return {
            '#{$lineSelector}': [
                'opacity: 1',
                'min-width: 1px'
            ]
        };
    }
}
