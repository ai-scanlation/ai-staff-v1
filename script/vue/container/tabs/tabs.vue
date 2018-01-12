<script>
import {
    find,
    include
} from 'modules';
export default {
    name: 'Tabs',
    props: {
        tabs: {
            type: String,
            default: ''
        },
        tabName: {
            type: String,
            default: ''
        }
    },
    style: {
        group: 'default',
        overwrite: true,
        rules: {
            '[tabs="#{$tabs}"]': [
                'min-height: #{$size}px'
            ]
        }
    },
    data() {
        return {
            description: '',
            parentTab: this.$parent
        };
    },
    mounted() {
        find(this.tabName, (parent, property) => {
            parent.$watch(property, (value) => {
                this.updateActive(value);
            });
            this.updateActive(parent[property]);
        });
    },
    created() {
        while (this.parentTab) {
            if (this.parentTab.$options.name === 'tabs') break;
            this.parentTab = this.parentTab.$parent;
        }
    },
    methods: include(require.context('./methods/', true, /[^/]+\.js$/), 1, 4, 'js', /src/),
    render: require('./tabsRender')
};
</script>