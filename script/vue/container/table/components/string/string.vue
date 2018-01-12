<template>
    <div class="cell">
        <span>{{ value }}</span>
    </div>
</template>
<script>
export default {
    name: 'String',
    props: {
        value: {
            type: String,
            default: ''
        }
    }
};

</script>
