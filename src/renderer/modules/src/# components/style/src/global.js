const global = {};

export default {
    get: () => (global),
    /**
     * Set global variables use in `style` modules
     * @param {Object} obj 
     */
    set(obj) {
        Object.assign(global, obj);
    }
};
