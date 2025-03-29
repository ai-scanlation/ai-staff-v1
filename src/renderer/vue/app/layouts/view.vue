<template>
    <div :active="isActive">
        <slot/>
    </div>
</template>
<script>
export default {
    id: 'view',
    name: 'view-',
    data() {
        return {
            isActive: false
        };
    },
    mounted() {
        this.$parent.$data.views.push(this.$children[0].$options.id);
    },
    created() {
        this.$parent.$on('onView', view => this.isActive = this.$children[0].$options.id === view);
    }
};

</script>
