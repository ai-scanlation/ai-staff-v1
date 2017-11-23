<script>
import {
    find,
    include
} from 'modules';
export default {
    name: 'tabs',
    props: ['tabs', 'tabName', 'noChangeParent'],
    style: {
        group: 'default',
        overwrite: true,
        rules: {
            '[tabs="#{$tabs}"]': [
                'min-height: #{$size}px'
            ]
        }
    },
    render: require('./tabsRender'),
    data() {
        return {
            description: '',
            parentTab: this.$parent
        };
    },
    created() {
        while (this.parentTab) {
            if (this.parentTab.$options.name === 'tabs') break;
            this.parentTab = this.parentTab.$parent;
        }
    },
    mounted() {
        find(this.tabName, (parent, property) => {
            parent.$watch(property, (value) => {
                this.$children.some((child) => {
                    if (child.isActive === true) {
                        this.description = child.$options.description;
                        return true;
                    }
                });
                this.updateActive(value);
            });
        });
    },
    methods: include(require.context('./methods/', true, /[^\/]+\.js$/), 1, 4, 'js', /src/),
};
</script>