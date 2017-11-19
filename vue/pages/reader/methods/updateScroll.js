import {
    find
} from '~/modules';

module.exports = function updateScroll() {
    const images = find('scroll[images]', this);
    const scroll = images.$parent;
    const scrollBounding = scroll.$el.getBoundingClientRect();
    images.$children.forEach((image) => {
        // Mỗi image ở đây là một component image chứa thẻ div và img
        const imageBounding = image.$el.getBoundingClientRect();

        const top = imageBounding.top - scrollBounding.top;
        const bot = imageBounding.bottom - scrollBounding.top;
        if (top < 0) {
            if (-top < imageBounding.height) {
                image.img.top = (-top) / imageBounding.height * 100;
            } else {
                image.img.top = 100;
            }
        } else {
            image.img.top = 0;
        }
        if (bot < scrollBounding.height) {
            image.img.bot = 100;
        } else {
            // Nếu ImageBot > ScrollHeight
            if (scrollBounding.height > top) {
                image.img.bot = (scrollBounding.height - top) / imageBounding.height * 100;
            } else {
                image.img.bot = 0;
            }
        }
    });
};
