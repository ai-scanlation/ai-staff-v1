module.exports = {
    //   CSS bắt đầu đếm từ 1
    //   [table]               > [group]                     > [row]   > [cell]
    cellSelector: (uid, section, col) => (section === '*'
        ? `.grid[uid="${uid}"] > div.col                     > div.row > div:nth-child(${2 * col + 1})`
        : `.grid[uid="${uid}"] > div.col[section=${section}] > div.row > div:nth-child(${2 * col + 1})`),
    lineSelector: (uid, section, col) => (section === '*'
        ? `.grid[uid="${uid}"] > div.col                     > div.row > div:nth-child(${2 * col + 2})`
        : `.grid[uid="${uid}"] > div.col[section=${section}] > div.row > div:nth-child(${2 * col + 2})`),
    propertiesToArray: (properties, index) => (
        Object.keys(properties).map((key) =>
            `${key}:${properties[key][index]}`
        )
    )
};
