<template>
    <div :active="isActive">
        <slot/>
    </div>
</template>
<script>
export default {
    name: 'view',
    data() {
        return {
            isActive: ''
        };
    },
    mounted() {
        this.$parent.$data.views.push(this.$children[0].$options.name);
    },
    created() {
        if (typeof this.isActive !== 'undefined' && this.isActive === '') {
            this.isActive = false;
        }
        this.$parent.$on('onView', (view) => {
            if (this.$children[0].$options.name === view) {
                this.isActive = true;
            } else {
                this.isActive = false;
            }
        });
    }
};

</script>
