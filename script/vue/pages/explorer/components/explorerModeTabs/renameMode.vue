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
                    <ai-array path="project.project"
                              pathIndex="2"
                              pathID="explorer.renameProjectID"
                              class="full"
                              inputClass="square" />
                    <ai-line/>
                    <ai-array pathID="explorer.renameChapterID"
                              class="reverse"
                              max="999"
                              text="Chương"
                              inputClass="square" />
                    <ai-line/>
                    <ai-array pathID="explorer.renamePageID"
                              class="reverse"
                              max="999"
                              text="Bắt đầu từ"
                              inputClass="square" />
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
    name: 'renameMode',
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
    mounted() {
    }
};
</script>