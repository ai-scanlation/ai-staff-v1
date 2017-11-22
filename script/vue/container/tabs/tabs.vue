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
            if (this.parentTab.$options.name === 'tabs') {
                return;
            }
            this.parentTab = this.parentTab.$parent;
        }
    },
    mounted() {
        find(this.tabName, (parent, property) => {
            this.$watch("active", (value) => {
                parent[property] = value;
                this.updateActive();
                let [active] = this.$children.filter((child) => child.isActive === true);
                this.description = active ? active.$options.description : "";
            });
            parent.$watch(property, (value) => {
                this.active = value;
            });
            this.active = parent[property];
        });
    },
    methods: include(require.context("./methods/", true, /[^\/]+\.js$/), 1, 4, "js", /src/),
};
</script>