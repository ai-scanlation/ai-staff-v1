<template>
    <ai-row class="label">
        <span class="text"
              v-if="compiledText !== ''">{{ compiledText }}</span>
        <slot/>
    </ai-row>
</template>
<script>
import {
    load,
    style,
    complier
} from 'modules';

export default {
    name: 'Label',
    components: {
        ...load('container/row'),
        ...load('units/br')
    },
    props: {
        text: {
            type: String,
            default: ''
        },
        index: {
            type: String,
            default: ''
        },
        root: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            compiledText: '',
            watchersText: []
        };
    },
    style: {
        group: 'default',
        overwrite: false,
        rules: {
            '[size="#{$size}"] .label': [
                'padding: 0 #{$size * $dpi *0.3}px'
            ],
            '[size="#{$size}"] .label.square > .text': [
                'width: #{$size * $dpi}px'
            ],
            '[size="#{$size}"] .label > .text': [
                'height: #{$size * $dpi}px',
                'line-height: #{$size * $dpi }px',

                'font-size: #{($size * 0.2 + 7) * $dpi}px'
            ]
        }
    },
    mounted() {
        style.set(this, {
            size: style.get('size', this, 40),
            dpi: window.devicePixelRatio
        });
        complier(this, 'text', 'compiledText', 'watchersText', this.root, true);
    }
};
</script>