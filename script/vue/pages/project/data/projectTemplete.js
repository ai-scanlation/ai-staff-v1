module.exports = {
    type: 'table',
    scroll: true,
    selection: false,
    style: {
        '*': {
            'text-align': [
                'center',
                'left',
                'left',
                'left'
            ],
            'flex': [
                '0 1 40px',
                '0 1 200px',
                '1 1 0',
                '0 1 150px'
            ]
        }
    },
    data: {
        'title': {
            scroll: false,
            line: {
                horizontal: false,
                vertical: true
            },
            hover: {
                cell: true,
                row: true
            },
            data: [
                ['#', 'Viết tắt', 'Tên đầy đủ', 'Tình trạng']
            ]
        },
        'project': {
            scroll: true,
            line: {
                horizontal: false,
                vertical: true
            },
            hover: {
                row: true
            },
            data: []
        }
    },
    event: [{
        selector: ['col', 'project']
    }]
};
