<template>
    <ai-col class="scroll">
        <ai-col class="box margin padding dark"
                size="30">
            <ai-paragraph>
                <h6>Danh sách các Project của nhóm</h6>
                
            </ai-paragraph>
        </ai-col>
    </ai-col>
</template>
<script>
import {
    load,
    include,
    find
} from '~/modules';

export default {
    name: 'picasa',
    components: {
        ...load('container'),
        ...load('units')
    },
    data: () => ({
        // ...include(require.context('./data/', false, /[^/]+\.js$/), 1, 1)

    }),
    mounted() {

    }
    // methods: include(require.context('./methods/', true, /[^/]+\.js$/), 1, 4, 'js', /src/)
};

</script>
