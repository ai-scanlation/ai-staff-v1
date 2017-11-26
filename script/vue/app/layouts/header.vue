<template>
    <ai-row id="header"
            class="row dark"
            size="40">
        <ai-button icon="" />
        <ai-button text="Ai Staff"
                   class="noHover " />
        <ai-button class="full noHover " />
        <ai-button icon="" />
    </ai-row>
</template>
<script>
import {
    load
} from 'modules';
export default {
    name: 'header',
    components: {
        ...load('container/row'),
        ...load('units')
    }
};

</script>
