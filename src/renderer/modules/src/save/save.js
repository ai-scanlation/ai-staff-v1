module.exports = function(self, properties) {
    if (Array.isArray(properties) === true) {
        properties.forEach(function(property) {
            const selfProperty = self.$options.id + '.' + property;
            self.$watch(property, function(value) {
                localStorage[selfProperty] = value.toString();
            });
            if (localStorage[selfProperty] !== undefined) {
                switch (typeof (self[property])) {
                case 'boolean':
                    self[property] = localStorage[selfProperty] === 'true';
                    break;
                case 'number':
                    self[property] = String(parseFloat(localStorage[selfProperty]));
                    break;
                case 'string':
                    self[property] = localStorage[selfProperty];
                    break;
                default:
                    self[property] = localStorage[selfProperty];
                    break;
                }
            }
        });
    }
};
