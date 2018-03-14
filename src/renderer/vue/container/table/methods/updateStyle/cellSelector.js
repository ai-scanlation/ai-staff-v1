export default function cellSelector(section, i, uid) {
    if (section === '*') {
        return `.table[uid="${uid}"] > div > div.col > div.row > div:nth-child(${2 * i + 1})`;
    } else {
        return `.table[uid="${uid}"] > div > div.col > div.row[section="${section}"] > div:nth-child(${2 * i + 1})`;
    }
}
