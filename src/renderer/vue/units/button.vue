<template>
    <ai-row :class="{ active: isActive }"
            class="button"
            @click.native="buttonClick()">
        <span v-if="icon !== ''"
              class="icon">{{ icon }}</span>
        <div v-if="text !== '' && icon === ''"
             class="br" />
        <span v-if="text !== ''"
              class="text">{{ compiledText }}</span>
        <slot/>
        <div v-if="text !== ''"
             class="br" />
    </ai-row>
</template>
<script>
import {
    find,
    load,
    run,
    style,
    complier
} from 'modules';

export default {
    id: 'button',
    name: 'button-',
    components: {
        ...load('container/row'),
        ...load('units/br')
    },
    props: {
        path: {
            type: String,
            default: ''
        },
        value: {
            type: [String, Number],
            default: ''
        },
        text: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
        root: {
            type: Object,
            default: undefined
        }
    },
    style: {
        group: 'default',
        overwrite: false,
        rules: {
            '[size="#{$size}"] .button': [
                'min-height: #{$size * $dpi}px'
            ],
            '[size="#{$size}"] .button > .br': [
                'width: #{$size * $dpi *0.3}px'
            ],
            '[size="#{$size}"] .button > .slot': [
                'padding: 0 #{$size * $dpi *0.3}px',
                'font-size: #{($size * 0.2 + 7) * $dpi}px'
            ],
            '[size="#{$size}"] .button > .icon': [
                'min-height: #{$size * $dpi}px',
                'line-height: #{$size * $dpi}px',
                'width: #{$size * $dpi}px',
                'padding: 0',
                'font-size: #{$size * $dpi * 0.4}px'
            ],
            '[size="#{$size}"] .button > .text': [
                'line-height: #{$size * $dpi }px',
                'padding: 0',
                'font-size: #{($size * 0.2 + 7) * $dpi}px'
            ]
        }
    },
    data() {
        return {
            isActive: false,
            compiledValue: '',
            compiledText: '',
            watchersText: [],
            watchersValue: [],
            buttonClick: () => {}
        };
    },
    updated() {
        complier(this, 'text', 'compiledText', 'watchersText', this.root, true);
    },
    mounted() {
        // Init style
        style.set(this, {
            size: style.get('size', this, 40)
        });
        // Init text
        complier(this, 'text', 'compiledText', 'watchersText', this.root, true);

        const [parent, property] = find(
            ...[this.path, this.root, true].filter((arg) => arg !== undefined)
        );
        
        if (!parent || property == undefined || parent[property] == undefined) return;

        const value = parent[property];

        const complierFunction = () => complier(this, 'value', 'compiledValue', 'watchersValue', undefined, true);
        this.$watch('value', complierFunction);
        complierFunction();

        this.$watch('compiledValue', () => {
            this.updateIsActive(value);
        });
        this.buttonClick = () => {
            run(parent, property, this.compiledValue, this);
        };
        if (typeof value !== 'function' && parent.constructor.name === 'VueComponent') {
            parent.$watch(property, (value) => {
                this.updateIsActive(value);
            });
            this.updateIsActive(value);
        }
    },
    methods: {
        updateIsActive(valueInPath) {
            if (!this.compiledValue) {
                this.isActive = false;
            } else {
                if (this.compiledValue[0] === '@') {
                    if (this.compiledValue === '@') {
                        this.isActive = valueInPath;
                    } else {
                        this.isActive = valueInPath === this.compiledValue.substr(1);
                    }
                } else {
                    this.isActive = valueInPath === this.compiledValue && this.compiledValue !== '';
                }
            }
        }
    }
};

</script>
