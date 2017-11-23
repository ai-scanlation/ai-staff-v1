<template>
    <ai-row class="button"
            :class="{ active: isActive }"
            v-on:click.native="buttonClick()">
        <span class="icon"
              v-if="icon !== ''">{{ icon }}</span>
        <div class="br"
             v-if="text !== '' && icon === ''" />
        <span class="text"
              v-if="text !== ''">{{ compiledText }}</span>
        <slot/>
        <div class="br"
             v-if="text !== ''" />
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
    name: 'button',
    components: {
        ...load('container/row'),
        ...load('units/br')
    },
    props: {
        path: {
            default: ''
        },
        value: {
            default: ''
        },
        text: {
            default: ''
        },
        icon: {
            default: ''
        },
        root: {
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
    },
    mounted() {
        style.set(this, {
            size: style.get('size', this, 40),
            dpi: window.devicePixelRatio
        });

        complier(this, 'text', 'compiledText', 'watchersText', this.root, true);

        const args = [this.path, this.root, true].filter((arg) => {
            return arg !== undefined;
        });
        const [parent, property] = find(...args);
        if (parent
            && property !== undefined
            && parent[property] !== undefined) {
            const value = parent[property];
            this.$watch('value', () => {
                complier(this, 'value', 'compiledValue', 'watchersValue', undefined, true);
            });
            complier(this, 'value', 'compiledValue', 'watchersValue', undefined, true);

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
        } else {
            // console.log(this.$el);
        }
    }
};
</script>