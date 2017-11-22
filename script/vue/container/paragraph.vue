<template>
    <div class="paragraph col">
        <slot/>
    </div>
</template>
<script>
export default {
    name: 'paragraph',
    data() {
        return {
            childSize: this.$parent.childSize !== undefined ? this.$parent.childSize : undefined
        };
    }
};

</script>
