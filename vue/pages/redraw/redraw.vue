<template>
    <ai-col class="scroll">

        <ai-col class="box margin padding dark"
                size="36">
            <h6>Kiểm soát thư mục Redraw</h6>
            <ai-space/>
            <ai-border class="full">
                <ai-row>
                    <ai-button text="Bước 1: Khởi tạo"></ai-button>
                    <ai-line/>
                    <ai-col class="full">
                        <ai-button text="Nạp lại cơ sở dữ liệu" />
                        <ai-line/>
                        <ai-button text="Khởi tạo cơ sở dữ liệu trên đường dẫn hiện hành" />
                    </ai-col>
                </ai-row>
                <ai-line/>
                <ai-row>
                    <ai-button text="Bước 2: "></ai-button>
                    <ai-line/>
                    <ai-col>
                        <ai-button text="Kiểm tra lại cơ sở dữ liệu" />
                    </ai-col>
                    <ai-line/>
                </ai-row>
                <ai-row>
                    <canvas id="canvas" width="500" height="500"></canvas>
                </ai-row>
            </ai-border>
        </ai-col>
    </ai-col>
</template>
<script>
import {
    load,
    save,
    include
} from '~/modules';

export default {
    name: 'redraw',
    components: {
        ...load('container'),
        ...load('units')
    },
    data() {
        return {
            logs: '',
            step: 0,
            databaseObject: null,
            databasePath: '',
            folderPath: ''
        };
    },
    mounted() {
        save(this, ['folderPath']);
        this.redraw();
    },
    methods: include(require.context('./methods/', true, /[^/]+\.js$/), 1, 4, 'js', /src/)
};

</script>
