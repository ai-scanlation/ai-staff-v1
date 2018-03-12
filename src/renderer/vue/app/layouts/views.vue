<script>
import {
    load,
    save
} from 'modules';
export default {
    id: 'views',
    name: 'views-',
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
    watch: {
        view(value) {
            if (this.views.indexOf(value) !== -1) {
                this.$emit('onView', value);
            } else {
                console.warn(`Không tìm thấy ${value} trong this.views = [${this.views}]`);
            }
        }
    },
    mounted() {
        // Hàm này chạy khi các components con đều đã chạy hoàn chỉnh
        save(this, ['view']);
        this.$emit('onView', this.view);
    },
    render: h => h('div', {
        'class': 'full'
    }, Object.keys(load('pages')).map(
        key => h('ai-view', [h(key, {
            ref: key.replace('ai-', '')
        })])
    ))
};

</script>
