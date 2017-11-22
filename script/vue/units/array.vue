<template>
    <ai-row class="array"
            :index="index">
        <ai-input type="number"
                  path="array.index"
                  ref="input"
                  :class="inputClass"
                  :min="min || minValue"
                  :max="max || maxValue"
                  :root="this" />
        <ai-button path="array.click"
                   value="input"
                   class="full"
                   :root="this">
            <ai-label :text="text"
                      :root="this" />
        </ai-button>
    </ai-row>
</template>
<script>
import {
    load,
    find,
    focus
} from 'modules';

export default {
    name: 'array',
    components: {
        ...load('container'),
        ...load('units')
    },
    props: {
        'text': {
            default: '{array.value}'
        },
        'action': {
            default: 'focus'
        },
        'toggleWay': {
            default: 'up'
        },
        'path': {},
        'pathIndex': {},
        'pathID': {},
        'min': {},
        'max': {},
        'inputClass': {}
    },
    data: () => ({
        index: 0,
        minValue: 0,
        maxValue: 10,
        value: '<Chưa định nghĩa>'
    }),
    methods: {
        updateValue(value) {
            if (value !== undefined && value[this.index] !== undefined) {
                this.value = (this.pathIndex && value[this.index][this.pathIndex])
                    ? value[this.index][this.pathIndex]
                    : value[this.index];
                this.maxValue = value.length - 1;
            }
        },
        click() {
            if (this.action.split(' ').indexOf('focus') !== -1) {
                focus(['input', this]);
            }
            if (this.action.split(' ').indexOf('toggle') !== -1) {
                this.$emit('toggle', this.toggleWay);
            }
        }
    },
    mounted() {
        find(this.path, (parent, property) => {
            parent.$watch(property, (value) => {
                this.updateValue(value);
            });
            this.$watch('index', () => {
                this.updateValue(parent[property]);
            });
            this.updateValue(parent[property]);
            this.$on('toggle', (toggleWay) => {
                if (Array.isArray(parent[property])) {
                    const length = parent[property].length;
                    this.index = (toggleWay === 'up')
                        ? (this.index === -1 || this.index >= length - 1) ? 0 : this.index + 1
                        : (this.index === -1 || this.index === 0) ? length - 1 : this.index - 1;
                }
            });
        });
        find(this.pathID, (parent, property) => {
            parent.$watch(property, (value) => {
                this.index = value;
            });
            this.$watch('index', (value) => {
                parent[property] = value;
            });
            this.index = parent[property];
        });
    }
};
</script>