<template>
    <span class="url"
          v-on:click="openUrl">
        <slot/>
    </span>
</template>
<script>
import {
    find
} from 'modules';
export default {
    name: 'url',
    props: {
        href: {
            default: ''
        }
    },
    methods: {
        openUrl() {
            if (this.href !== '') {
                find('#shell.openFile', (fs, property) => {
                    fs[property](this.href);
                });
            }
        }
    }
};
</script>