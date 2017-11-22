<script>
import {
    find,
    include
} from "modules";
export default {
    name: "tabs",
    props: ["tabs", "tabName", "null", "noChangeParent"],
    style: {
        group: "default",
        overwrite: true,
        rules: {
            '[tabs="#{$tabs}"]': [
                "min-height: #{$size}px"
            ]
        }
    },
    render: require("./tabsRender"),
    data() {
        return {
            active: "",
            description: "",
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
            this.$watch("active", (value) => {
                parent[property] = value;
            });
            parent.$watch(property, (value) => {
                this.$children.some((child) => {
                    if (child.isActive === true) {
                        this.description = child.$options.description;
                        return true;
                    }
                });
                this.updateActive();
                this.active = value;
            });
            this.active = parent[property];
        });
    },
    methods: include(require.context("./methods/", true, /[^\/]+\.js$/), 1, 4, "js", /src/),
};
</script>