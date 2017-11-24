import complierString from './complierString';
module.exports = function complier(component, from, to, watchers, self, clear) {
    if (typeof component[from] === 'string') {
        if (clear) {
            component[watchers].forEach((unwatch) => {
                unwatch();
            });
        }
        component[to] = complierString(component[from], self,
            (parent, property) => {
                if (clear) {
                    component[watchers].push(parent.$watch(
                        property,
                        () => {
                            complier(component, from, to, watchers, self, false);
                        }
                    ));
                }
            }, (path) => {
                const $store = document.getElementById('app').__vue__.$store;
                if (clear) {
                    component[watchers].push($store.watch(
                        () => $store.getters['get:' + path],
                        () => {
                            complier(component, from, to, watchers, self, false);
                        }
                    ));
                }                    
                return $store.getters['get:' + path];
            }
        );
    } else {
        component[to] = component[from];
    }
};