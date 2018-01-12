<template>
    <ai-row>
        <slot/>
    </ai-row>
</template>
<script>
import {
    load
} from 'modules';
export default {
    name: 'TableRow',
    components: {
        ...load('container/row')
    },
    props: {
        data: {
            type: Object,
            default: undefined
        }
    },
};
</script>