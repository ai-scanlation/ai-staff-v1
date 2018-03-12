<template>
    <div class="row">
        <slot/>
    </div>
</template>
<script>
import {
    style
} from 'modules';
export default {
    id: 'row',
    name: 'row-',
    style: {
        group: 'default',
        overwrite: false,
        rules: {
            '[size="#{$size}"] .row, .row[size="#{$size}"]': [
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
