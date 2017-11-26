<template>
    <ai-col class="scroll">
        <ai-col class="box margin padding dark"
                size="30">
            <ai-paragraph>
                <h6>Danh sách các Project của nhóm</h6>
                <ai-space/>
                <ai-border size="24">
                    <ai-grid ref="projectTable"
                             :data="projectTemplete" />
                </ai-border>
            </ai-paragraph>
        </ai-col>
    </ai-col>
</template>
<script>
import {
    load,
    computed,
    include,
    find
} from 'modules';

export default {
    name: 'project',
    components: {
        ...load('container'),
        ...load('units')
    },
    data: () => ({
        ...include(require.context('./data/', false, /[^/]+\.js$/), 1, 1)
    }),
    computed: {
        ...computed('project')
    },
    mounted() {
        // this.project = ;
        // console.log(this.readProjectInfo(
        //     find("explorer").defaultFolder_1
        // ));
        this.projectTemplete.data.project.data = this.project = this.readProjectInfo(
            find('explorer').defaultFolder_1
        );
    },
    methods: include(require.context('./methods/', true, /[^/]+\.js$/), 1, 4, 'js', /src/)
};
</script>