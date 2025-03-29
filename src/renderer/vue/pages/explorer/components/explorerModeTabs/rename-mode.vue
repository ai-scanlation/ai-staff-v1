<template>
    <ai-col :active="isActive"
            size="36">
        <ai-row>
            <ai-button text="Đổi tên"
                       style="padding: 0 10px"
                       path="explorer.rename" />
            <ai-line/>
            <ai-col class="full">
                <ai-row>
                    <ai-button icon=""
                               path="explorer.renamePattern"
                               value="<name><ext>" />
                    <ai-vr/>
                    <ai-button icon=""
                               path="explorer.renamePattern"
                               value="[Ai Scans] <#{explorer.renameProjectID}> - Chap <{explorer.renameChapterID}> - <{explorer.renamePageID}+><ext>" />
                    <ai-input path="explorer.renamePattern"
                              class="full pre"
                              placeholder="Rename Pattern" />
                </ai-row>
                <ai-line/>
                <ai-row>
                    <ai-array :path-index="2"
                              path="project.project"
                              path-id="explorer.renameProjectID"
                              text="-{array.value}-"
                              class="full"
                              input-class="square" />

                              <!-- <ai-line/>
                    <ai-array path-id="explorer.renameChapterID"
                              class="reverse"
                              :max="999"
                              text="Chương"
                              input-class="square" />
                    <ai-line/>
                    <ai-array path-id="explorer.renamePageID"
                              class="reverse"
                              :max="999"
                              text="Bắt đầu từ"
                              input-class="square" /> -->

                </ai-row>
            </ai-col>
        </ai-row>
    </ai-col>
</template>
<script>
import {
    load
} from 'modules';
export default {
    id: 'rename-mode',
    name: 'rename-mode-',
    description: 'Đổi tên',
    components: {
        ...load('container'),
        ...load('units')
    },
    data() {
        return {
            isActive: false,
        };
    },
    mounted() {}
};

</script>
