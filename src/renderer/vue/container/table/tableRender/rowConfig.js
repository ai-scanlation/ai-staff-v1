import nativeOnObject from './nativeOnObject';

export default function rowConfig(row, rowIndex, section, that) {
    return {
        attrs: {
            section: section[0]
        },
        props: {
            data: row
        },
        ref: `row-${row[1]}`,
        nativeOn: nativeOnObject(row, rowIndex, section, that.config.nativeOn, true)
    };
}
