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
    name: 'tablerow',
    props: ['data'],
    components: {
        ...load('container/row')
    }
};

</script>
