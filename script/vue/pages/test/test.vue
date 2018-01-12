<template>
    <ai-col>
        <ai-col class="box margin dark">
            <ai-row size="36"
                    class="test"
                    style="padding: 40px">
                <ai-label text="{explorer.targetFolderPath}" />
            </ai-row>
        </ai-col>
    </ai-col>
</template>
<script>
import {
    load
} from 'modules';
export default {
    name: 'Test',
    components: {
        ...load('pages/test/components'),
        ...load('container'),
        ...load('units')
    },
    data() {
        return {
            allowConvertExtensionID: 0
        };
    },
    mounted() {

    }
};

</script>
