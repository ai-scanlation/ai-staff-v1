<template>
    <span class="url"
          @click="openUrl">
        <slot/>
    </span>
</template>
<script>
import {
    find
} from 'modules';
export default {
    id: 'url',
    name: 'url-',
    props: {
        href: {
            type: String,
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
