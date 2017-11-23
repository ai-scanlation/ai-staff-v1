import {
    style
} from 'modules';
module.exports = function updateActive(value) {
    let active;
    this.$children.forEach((child) => {
        child.isActive = child.$options.name === value;
        // Đổi giá trị isActive cho mỗi child
        if (child.isActive) active = child;
    });
    style.set(this, {
        size: active.$el.offsetHeight,
        tabs: this.tabs
    });

    // Vì cơ chế dở ẹc mà mình viết nên chỗ này còn 1 mớ lỗi
    // Nếu tabs nằm trong tabs > Tabs con thay đổi > Tab cha bị hụt chiều cao > Lỗi
    if (this.parentTab) this.parentTab.updateActive();
};