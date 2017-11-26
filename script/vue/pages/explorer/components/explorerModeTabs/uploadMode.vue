<template>
    <ai-col :active="isActive"
            size="36">
        <ai-row>
            <ai-button path="explorer.uploadToDrive"
                       icon="">
                <span class="slot"
                      style="padding-left: 0">
                    Tải lên <br/> Google Drive
                </span>
            </ai-button>
            <ai-line/>
            <ai-col class="full">
                <ai-row>
                    <ai-button text="Tài khoản Google"
                               icon="" />
                    <ai-label text="{$google.email}"
                              class="full light" />
                </ai-row>
                <ai-line/>
                <ai-row>
                    <ai-button path="explorer.resetUpload"
                               class="progress full loaded"
                               text="{$google.upload.status}">
                        <div class="percent"
                             :style="{ 
                                 width: ($store.state.google.upload.cloudFiles.length) /
                                        ($store.state.google.upload.localFiles.length || 1) * 100 + '%' 
                             }" />
                    </ai-button>
                </ai-row>
            </ai-col>
            <ai-line/>
            <ai-col>
                <ai-button text="Sao chép đường dẫn"
                           path="explorer.copyUrls"
                           icon="" />
                <ai-line/>
                <ai-button text="Sao chép thẻ <img>"
                           path="explorer.copyImgs"
                           icon="" />
            </ai-col>
        </ai-row>
        <ai-line/>
        <ai-row>
            <ai-label text="Truyện" />
            <ai-label class="light hover"
                      text="{$explorer.renameProjectIDString} - {project.project[{explorer.renameProjectID}][2]}" />
            <ai-line/>
            <ai-label text="Chương" />
            <ai-label class="light hover"
                      text="{$explorer.renameChapterID}" />
        </ai-row>
    </ai-col>
</template>
<script>
import {
    load
} from 'modules';
export default {
    name: 'uploadMode',
    description: 'Tải lên',
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
        this.$store.watch(
            () => this.$store.getters['get:google.upload.cloudFiles'],
            (cloudFiles) => {
                const cloudCount = cloudFiles.length;
                const localCount = this.$store.state.google.upload.localFiles.length;
                this.$store.commit('set', {
                    path: 'google.upload.status',
                    value: cloudCount == localCount
                        ? (localCount == 0 ? 'Đang chờ' : `Hoàn thành tải lên: ${cloudCount} tập tin`)
                        : `Đang tải lên ${cloudCount}/${localCount} tập tin`
                });
            }
        );
    }
};
</script>