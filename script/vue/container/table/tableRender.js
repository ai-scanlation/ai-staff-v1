module.exports = function render(h) {
    return h('ai-col', {
        class: 'table',
        attrs: {
            uid: this._uid
        }
    }, [
        Object.entries(this.data).map((group, groupIndex) => {
            const groupName = /^@scroll/.test(group[0]) ? 'ai-scroll' : /^@noScroll/.test(group[0]) ? 'ai-noScroll' : 'div';
            return [
                (groupIndex === 0 || Object.keys(group[1]).reduce((sum, current) => {
                    return sum + group[1][current].length;
                }, 0) === 0) ? undefined : h('ai-line'),
                h(groupName, {
                    ref: groupName
                }, [
                    h('ai-col', {}, [
                        groupName !== 'ai-scroll' || this.selection === 'false' ? undefined : h('ai-selection', {
                            ref: 'selection'
                        }), Object.entries(group[1]).map((section, rowIndex, rowArray) => {
                            return [
                                section[1].map((row) => {
                                    return h('ai-tablerow', {
                                        attrs: {
                                            section: section[0]
                                        },
                                        props: {
                                            data: row
                                        },
                                        ref: 'row-' + row[1],
                                        nativeOn: {
                                            ...nativeOnObject(row, rowIndex, section, this.config.nativeOn, true)
                                        }
                                    }, row.map((cell, cellIndex, cellArray) => {
                                        const tagName = (this.config.type[section[0]] ? this.config.type[section[0]][cellIndex] : '')
                                            || (this.config.type['*'] ? this.config.type['*'][cellIndex] : '')
                                            || 'string';
                                        if (tagName === 'hide') return [];
                                        else {
                                            return [
                                                h('ai-' + tagName, {
                                                    props: {
                                                        value: cell
                                                    },
                                                    nativeOn: {
                                                        ...nativeOnObject(cell, cellIndex, section, this.config.nativeOn, false)
                                                    }
                                                }),
                                                (groupName === 'div' && cellIndex === cellArray.length - 1) ? undefined : h('ai-line')
                                            ];
                                        }
                                    }));
                                }),
                                (rowIndex === rowArray.length - 1 || section[1].length === 0) ? undefined : h('ai-line')
                            ];
                        })
                    ])
                ])
            ];
        })
    ]);
};

function nativeOnObject(child, childIndex, section, nativeOn, isRow) {
    let thisNativeOn = {};
    if (nativeOn) {
        const thisNativeOnConfig = {
            ...nativeOn[`${section[0]}${isRow ? '' : '[]'}`],
            ...nativeOn[`${section[0]}${isRow ? '' : '[' + childIndex + ']'}`]
        };
        thisNativeOn = Object.keys(thisNativeOnConfig).reduce((object, eventName) => {
            object[eventName] = function(event) {
                thisNativeOnConfig[eventName](event, child, childIndex);
            };
            return object;
        }, {});
    }
    return thisNativeOn;
}