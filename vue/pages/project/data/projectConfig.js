module.exports = {
    type: {
        '*': [
            'string', /* 1 - # */
            'string', /* 2 - Viết tắt */
            'string' /* 3 - Tên  */
        ]
    },
    style: {
        default: {
            '*': {
                'text-align': [
                    'center',
                    'left',
                    'left'
                ],
                'flex': [
                    '0 1 40px',
                    '0 1 200px',
                    '1 1 0'
                ]
            }
        }
    }
};
