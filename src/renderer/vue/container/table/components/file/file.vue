<template>
    <ai-row :style="{ 'opacity':`${opacity}` }"
            :error="value.error"
            :done="value.done"
            class="cell">
        <div :style="{ 'background-image': `url(${src})` }"
             class="file-icon" />
        <span>
            {{ name }}
        </span>
    </ai-row>
</template>
<script>
import icon from './src/icon.js';
import path from 'path';
import {
    load,
    style,
    find
} from 'modules';

export default {
    id: 'file',
    name: 'file-',
    components: {
        ...load('container/row')
    },
    props: {
        value: {
            type: [Object, String],
            default: undefined
        }
    },
    style: {
        group: 'default',
        overwrite: false,
        rules: {
            '[size="#{$size}"] .file-icon': [
                'min-width: #{$realSize}px',
                'width: #{$realSize}px',
                'height: #{$realSize}px',
                'background-size: #{$realSize/3*2}px #{$realSize/3*2}px'
            ]
        }
    },
    data() {
        return {
            opacity: this.value.type === 'rename' ? 0 : 1,
            count: undefined
        };
    },
    computed: {
        src() {
            return icon.fromExt(this.value.ext || path.extname(this.name));
        },
        name() {
            return this.value.name || '';
        }
    },
    mounted() {
        if (this.value.type === 'rename') {
            this.$parent.$parent.$watch('data', (data) => {
                if (data[0].count !== this.count) {
                    this.count = data[0].count;
                    this.opacity = data[0].count === 0 ? 0 : 1;
                    this.$parent.$el.setAttribute('count', this.opacity);
                    find('explorer').updateRename();
                }
            }, {
                deep: true
            });
        }
        style.set(this, {
            size: style.get('size', this, 24),
            realSize: style.get('size', this, 24) * window.devicePixelRatio
        });
    }
};

</script>
