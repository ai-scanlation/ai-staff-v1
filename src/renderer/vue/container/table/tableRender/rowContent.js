import nativeOnObject from './nativeOnObject';

// Nguyên tắc đặt vị trí của paramater là từ nhỏ đến lớn, cuối cùng là mấy hàm linh tinh
export default function(row, section, groupType, that) {
    const h = that.$createElement;
    const lineIf = condition => condition ? undefined : h('ai-line');

    return row.map((cell, cellIndex, cellArray) => {
        const getName = name => that.config.type[name] ? that.config.type[name][cellIndex] : '';
        const tagName = getName(section[0]) || getName('*') || 'string';

        const cellComponentSetting = {
            props: {
                value: cell
            },
            nativeOn: nativeOnObject(cell, cellIndex, section, that.config.nativeOn, false)
        };
        const cellComponent = h(`ai-${tagName}`, cellComponentSetting);
        const verticalLine = lineIf(groupType === 'div' && cellIndex === cellArray.length - 1);

        return tagName === 'hide' ? [] : [cellComponent, verticalLine];
    });
}
