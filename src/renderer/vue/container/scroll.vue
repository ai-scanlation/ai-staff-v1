<template>
    <div class="scroll">
        <slot/>
    </div>
</template>
<script>
import {
    find,
    run
} from 'modules';
export default {
    id: 'scroll',
    name: 'scroll-',
    props: {
        path: {
            type: String,
            default: ''
        }
    },
    mounted() {
        this.$el.addEventListener('scroll', () => {
            find(this.path, (parent, property) => {
                run(parent, property, this.$el.scrollTop);
            });
        });
    }
};

</script>
