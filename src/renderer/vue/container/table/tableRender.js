import switchCaseByObject from './tableRender/switchCaseByObject';
import nativeOnObject from './tableRender/nativeOnObject';
import rowContent from './tableRender/rowContent';
import rowConfig from './tableRender/rowConfig';

module.exports = function render(h) {
    const lineIf = condition => condition ? undefined : h('ai-line');

    const tableData = Object.entries(this.data).map((group, groupIndex) => {
        const groupLine = lineIf(groupIndex === 0);

        const groupType = switchCaseByObject([
            ['ai-scroll', /^@scroll/.test(group[0])],
            ['ai-noScroll', /^@noScroll/.test(group[0])]
        ], 'div');

        const groupSelection = (groupType !== 'ai-scroll' || !this.selection) ? undefined : h('ai-selection', {
            ref: 'selection'
        });

        const rows = Object.entries(group[1]).map((section, rowIndex, rowArray) => {
            const sectionContent = section[1].map(row => h(
                'ai-table-row',
                rowConfig(row, rowIndex, section, this),
                rowContent(row, section, groupType, this)
            ));
            const verticalLineAfterSection = lineIf(rowIndex === rowArray.length - 1 || section[1].length === 0);
            return [sectionContent, verticalLineAfterSection];
        });

        const groupCol = h('ai-col', {}, [groupSelection, rows]);
        const groupElement = h(groupType, {
            ref: groupType
        }, [groupCol]);

        return [groupLine, groupElement];
    });

    return h('ai-col', {
        class: 'table',
        attrs: {
            uid: this._uid
        }
    }, [tableData]);
};
