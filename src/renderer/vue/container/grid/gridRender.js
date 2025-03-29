// table render function

module.exports = function render(h) {
    return h('ai-col', {
        class: {
            'grid': true,
            'grid-scroll': this.data.scroll
        },
        attrs: {
            uid: this._uid
        }
    }, Object.entries(this.data.data).map(
        (group, groupIndex) => [
            groupIndex !== 0 ? h('ai-line') : null,
            h('ai-col', {
                class: {
                    'scroll': this.data.scroll && group[1].scroll
                },
                attrs: {
                    section: group[0]
                }
            }, [
                group[1].data.map(
                    (row, rowIndex) => [
                        rowIndex !== 0 && !group[1].line.vertical ? h('ai-line') : null,
                        h('ai-row', {
                            class: {
                                hover: group[1].hover.row
                            }
                        }, row.map((cell) => [
                            h('div', {
                                class: {
                                    cell: true,
                                    hover: group[1].hover.row
                                }
                            }, [
                                h('span', cell)
                            ]),
                            h('ai-line')
                        ]))
                    ]
                )
            ])
        ]
    ));
};

// Scroll: [scroll, noScroll, null]
