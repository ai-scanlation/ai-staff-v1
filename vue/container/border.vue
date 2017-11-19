<template>
    <ai-row class="border">
        <ai-line/>
        <ai-col class="full">
            <ai-line/>
            <slot/>
            <ai-line/>
        </ai-col>
        <ai-line/>
    </ai-row>
</template>
<script>
import {
    load,
    style
} from '~/modules';
export default {
    name: 'border',
    components: {
        ...load('container/col'),
        ...load('container/row'),
        ...load('units/line')
    },
    style: {
        group: 'default',
        overwrite: false,
        rules: {
            // '[size="#{$size}"] .border': [
            //     "margin: #{$realSize * 0.3}px 0"
            // ]
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
