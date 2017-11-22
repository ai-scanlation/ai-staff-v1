import {
    load,
} from "modules";

module.exports = function render(h) {
    let tabs = load(this.tabs);
    return h("div", {
        class: "tabs",
        attrs: {
            tabs: this.tabs
        }
    }, Object.keys(tabs).map((key) => {
        return h(tabs[key], {
            class: {
                "tab": true,
            }
        });
    }));
}
