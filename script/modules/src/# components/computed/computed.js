import state from '~/script/state';

/**
 * + Hàm trả về get/set cho mỗi thuộc tính được khai báo trong script/state
 * + Sau khi khai báo theo cách này ở trong trường component của mỗi view
 * ta có thể gọi trực tiếp theo kiểu: view.thuộc_tính
 * @param {string} path là path trong state, không có dấu chấm
 */
module.exports = function(path) {
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