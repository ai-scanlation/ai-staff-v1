import {
    style
} from 'modules';
module.exports = function updateActive(deltaSize) {
    let active;
    this.$children.forEach((child) => {
        child.isActive = child.$options.name === this.active;
        // Đổi giá trị isActive cho mỗi child
        if (child.isActive) active = child;
    });
    const oldHeight = this.$el.offsetHeight;
    const size = deltaSize
        ? (oldHeight + deltaSize)
        : (active ? active.$el.offsetHeight : 0);
    style.set(this, {
        size: size,
        tabs: this.tabs
    });

    // Vì cơ chế dở ẹc mà mình viết nên chỗ này còn 1 mớ lỗi
    // Các trường hợp tabs con ẩn hiện không làm thay đổi giá trị height sẽ làm tabs cha bị lệch
    // Nếu thẻ tabs con ẩn hiện không làm thay đổi parentHeight thì thêm trường này vào
    if (this.noChangeParent) return;
    let self = this.$parent;
    while (self) {
        if (self.$options.name === 'tabs') {
            self.updateActive(size - oldHeight);
            return;
        }
        self = self.$parent;
    }
};