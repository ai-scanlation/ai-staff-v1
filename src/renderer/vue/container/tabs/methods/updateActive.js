import {
    style
} from 'modules';

function equal(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') return false;
    else return a.toLowerCase() === b.toLowerCase();
}

module.exports = function updateActive(value) {
    let active;
    this.$children.forEach((child) => {
        // Đổi giá trị isActive cho mỗi child
        if (equal(child.$options.id, value)) {
            child.isActive = true;
            this.description = child.$options.description;
        } else child.isActive = false;

        if (child.isActive) active = child;
    });

    // Chỗ này này còn lỗi vì phải đợi thẻ con render xong rồi mới set được chiều cao cho thẻ cha
    setTimeout(() => {
        if (active) {
            style.set(this, {
                size: active.$el.offsetHeight,
                tabs: this.tabs
            });
        } else {
            console.warn('Không tìm thấy');
        }
    }, 0);

    // Vì cơ chế dở ẹc nên chỗ này còn 1 mớ lỗi
    // Nếu tabs nằm trong tabs > Tabs con thay đổi > Tab cha bị hụt chiều cao > Lỗi
    if (this.parentTab) this.parentTab.updateActive();
};
