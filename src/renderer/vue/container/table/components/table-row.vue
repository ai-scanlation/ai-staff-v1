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
    id: 'table-row',
    name: 'table-row-',
    components: {
        ...load('container/row')
    },
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        }
    },
};

</script>
