<template>
    <div class="cell">
        <span>{{ value }}</span>
    </div>
</template>
<script>
export default { 
    id: 'string',
    name: 'string-',
    props: {
        value: {
            type: [String, Number],
            default: ''
        }
    }
};

</script>
