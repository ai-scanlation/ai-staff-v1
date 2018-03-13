import nativeOnObject from './tableRender/nativeOnObject';

module.exports = function render(h) {
    const lineIf = condition => condition ? undefined : h('ai-line');

    const tableData = Object.entries(this.data).map((group, groupIndex) => {
        // Group là [scroll] hoặc [no-scroll] hoặc [div]
        const groupLine = lineIf(groupIndex === 0 || Object.keys(group[1]).reduce((sum, current) => sum + group[1][current].length, 0) === 0);

        const groupName = /^@scroll/.test(group[0]) ? 'ai-scroll' : /^@noScroll/.test(group[0]) ? 'ai-noScroll' : 'div';
        const groupSelection = (groupName !== 'ai-scroll' || this.selection !== 'false') ? undefined : h('ai-selection', {
            ref: 'selection'
        });

        const rows = Object.entries(group[1]).map((section, rowIndex, rowArray) => {
            const rowConfig = row => ({
                attrs: {
                    section: section[0]
                },
                props: {
                    data: row
                },
                ref: `row-${row[1]}`,
                nativeOn: nativeOnObject(row, rowIndex, section, this.config.nativeOn, true)
            });
            const rowContent = row => row.map((cell, cellIndex, cellArray) => {
                const getName = name => (this.config.type[name] ? this.config.type[name][cellIndex] : '');
                const tagName = getName(section[0]) || getName('*') || 'string';

                const verticalLine = () => lineIf(groupName === 'div' && cellIndex === cellArray.length - 1);
                const cellComponent = () => h(`ai-${tagName}`, {
                    props: {
                        value: cell
                    },
                    nativeOn: nativeOnObject(cell, cellIndex, section, this.config.nativeOn, false)
                });
                return tagName === 'hide' ? [] : [cellComponent(), verticalLine()];
            });
            
            const sectionContent = section[1].map(row => h('ai-table-row', rowConfig(row), rowContent(row)));
            const verticalLineAfterSection = lineIf(rowIndex === rowArray.length - 1 || section[1].length === 0);
            return [sectionContent, verticalLineAfterSection];
        });

        const groupCol = h('ai-col', {}, [groupSelection, rows]);
        const groupElement = h(groupName, {
            ref: groupName
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
