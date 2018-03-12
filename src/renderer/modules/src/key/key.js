import mousetrap from 'mousetrap';
import find from '../# components/find/find';
import run from '../# components/run/run';
import complierString from '../# components/complier/complierString';

import checkBlock from './checkBlock';
import include from 'include.js';

const keyMaps = include(require.context('./src', true, /[^/]+\.json$/), 1, 5, 'json');
module.exports = () => {
    const keys = {};
    for (const mapName in keyMaps) {
        if (!keyMaps.hasOwnProperty(mapName)) continue;
        checkBlock(keyMaps[mapName], keys);
    }
    for (let key in keys) { 
        key = /^([^:]+):?(\w*)/.exec(key);
        mousetrap.bind(key[1], event => {
            keys[key[0]].forEach(el => {
                const ifTrue = el.condition.every(eachCondition => {
                    const [parrentCondition, childCondition] = find(eachCondition[0], true);
                    return parrentCondition[childCondition] === eachCondition[1];
                });
                if (ifTrue) {
                    find(el.action[0], (parent, property) => {
                        const value = complierString(el.action[1]);
                        run(parent, property, value, event);
                    });
                }
            });
        }, key[2] || 'keydown');
    }
};
