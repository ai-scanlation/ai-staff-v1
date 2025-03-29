import complierString from './complierString';
/**
 * complier
 * @param {*} component this
 * @param {*} from 'text' (props)
 * @param {*} to 'compiledText' (data)
 * @param {*} watchers 'watchersText'
 * @param {*} self this.root
 * @param {*} clear true
 */
module.exports = function complier(component, from, to, watchers, root, clear) {
    
    if (typeof component[from] === 'string') {
        const complierEach = () => complier(component, from, to, watchers, root, false);
        const each_component = (parent, property) => {
            if (!clear) return;
            component[watchers].push(
                parent.$watch(property, complierEach)
            );
        };
        const each_state = ($store, path) => {
            if (!clear) return;
            const property = () => $store.getters['get:' + path];
            component[watchers].push(
                $store.watch(property, complierEach)
            );
            return $store.getters['get:' + path];
        };

        if (clear) component[watchers].forEach(unwatch => unwatch());

        component[to] = complierString(component[from], root, each_component, each_state);
    } else {
        component[to] = component[from];
    }
};
