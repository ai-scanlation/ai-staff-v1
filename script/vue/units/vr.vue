<template>
    <div class="vr" />
</template>
<script>
import {
    style
} from 'modules';
export default {
    name: 'vr',
    style: {
        group: 'default',
        overwrite: false,
        rules: {
            '[size="#{$size}"] .vr': [
                'height: #{$realSize * 0.7}px'
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
