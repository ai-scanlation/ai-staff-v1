<template>
    <div id="app"
         class="col">
        <ai-header/>
        <main class="row full">
            <ai-sidebar ref="sidebar" />
            <ai-views id="views"
                      ref="views" />
        </main>
    </div>
</template>
<script>
import {
    load
} from 'modules';
import style from '../../modules/src/# components/style/style';

export default {
    name: 'app',
    components: {
        ...load('app/layouts')
    },
    style: {
        group: 'default',
        overwrite: false,
        rules: {
            'body': [
                'zoom: #{1 / $dpi}',
                'font-size: #{($size * 0.2 + 7) * $dpi}px'
            ]
        }
    },
    created() {
        style.global.set({
            dpi: window.devicePixelRatio,
        });
    },
    mounted() {
        style.set(this, {
            size: 36
        });
    },
    methods: {
        key(value) {
            const [event, key] = value.split('.');
            if (event === 'keydown') {
                this.$el.classList.add(key);
            } else if (event === 'keyup') {
                this.$el.classList.remove(key);
            }
        }
    }
};

</script>
