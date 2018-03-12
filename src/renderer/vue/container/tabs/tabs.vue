<script>
import {
    find,
    load
} from 'modules';

import include from '../../../modules/include';

import toggleMode from './methods/toggleMode';
import updateActive from './methods/updateActive';

export default {
    id: 'tabs',
    name: 'tabs-',
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
    created() {
        // Find `parentTab`
        while (this.parentTab) {
            if (this.parentTab.$options.id === 'tabs') break;
            this.parentTab = this.parentTab.$parent;
        }
    },
    mounted() {
        find(this.tabName, (parent, property) => {
            parent.$watch(property, value => this.updateActive(value));
            this.updateActive(parent[property]);
        });
    },
    methods: {
        toggleMode,
        updateActive,
        // include(require.context('./methods/', true, /[^/]+\.js$/), 1, 4, 'js', /src/),
    },
    render(h) {
        const tabs = load(this.tabs);
        const tabsElement = Object.keys(tabs).map(
            key => h(tabs[key], {
                class: 'tab'
            })
        );
        return h('div', {
            class: 'tabs',
            attrs: {
                tabs: this.tabs
            }
        }, tabsElement);
    }
};

</script>
