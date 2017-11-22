module.exports = function(path, array) {
    return array.reduce(function(obj, name) {
        obj[name] = {
            get() {
                return this.$store.state[path][name];
            },
            set(value) {
                this.$store.commit({
                    type: 'set',
                    path: `${path}.${name}`,
                    value: value
                });
            }
        };
        return obj;
    }, {});
};