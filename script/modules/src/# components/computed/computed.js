import state from '~/script/state';

module.exports = function(path, array, self) {
    const out = {};
    for (const property in state[path]) {
        out[property] = {
            get() {
                return this.$store.state[path][property];
            },
            set(value) {
                this.$store.commit('set', {
                    path: `${path}.${property}`,
                    value: value
                });
            }
        };
    }
    return out;
};