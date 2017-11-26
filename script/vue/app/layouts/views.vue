<script>
import {
    load,
    save
} from 'modules';
export default {
    name: 'views',
    render(h) {
        return h('div', {
            'class': 'full'
        }, Object.keys(load('pages')).map((key) => {
            return h('ai-view', [h(key, {
                ref: key.replace('ai-', '')
            })]);
        }));
    },
    components: {
        ...load('app/layouts/view'),
        ...load('pages')
    },
    data() {
        return {
            view: '',
            views: []
        };
    },
    mounted() {
        // Hàm này chạy khi các components con đều đã chạy hoàn chỉnh
        save(this, ['view']);
        this.$emit('onView', this.view);
    },
    watch: {
        view(value) {
            if (this.views.indexOf(value) !== -1) {
                this.$emit('onView', value);
            } else {
                console.log(`Không tìm thấy ${value} trong this.views = [${this.views}]`);
            }
        }
    }
};

</script>
