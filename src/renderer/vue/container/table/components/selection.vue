<template>
    <div class="selection" />
</template>
<script>
import {
    style
} from 'modules';
export default {
    id: 'selection',
    name: 'selection-',
    style: {
        group: 'default',
        overwrite: false,
        rules: {
            '[size="#{$size}"] .selection': [
                'line-height: #{$realSize}px',
                'min-height: #{$realSize}px'
            ]
        }
    },
    mounted() {
        style.set(this, {
            size: style.get('size', this, 40),
            realSize: style.get('size', this, 40) * window.devicePixelRatio

        });
    }
};

</script>
