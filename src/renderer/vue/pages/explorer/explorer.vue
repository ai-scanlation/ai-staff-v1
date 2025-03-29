<template>
    <ai-col>
        <ai-col class="box margin dark">
            <ai-row size="36">
                <ai-button path="explorer.previousFolder"
                           icon="" />
                <ai-vr/>
                <ai-button path="explorer.nextFolder"
                           icon="" />
                <ai-line/>
                <ai-button path="explorer.goToReader"
                           icon=""
                           text="Đọc thư mục" />
                <ai-vr/>
                <ai-button path="explorer.explorerLimit"
                           text="Không giới hạn"
                           value="@" />
                <ai-vr/>
                <ai-button path="explorer.ctrl+enter"
                           text="Mở trong photoshop"
                           value="@" />
                <div class="full" />
                <ai-button path="tabs[explorer-explorerMode].toggleMode">
                    <ai-label text="{tabs[explorer-explorerMode].description} [F12]" />
                </ai-button>
            </ai-row>
            <ai-line/>
            <ai-tabs ref="explorer-explorerMode"
                     tabs="pages/explorer/components/explorerModeTabs"
                     tab-name="explorer.explorerMode" />
            <ai-line/>
            <ai-row size="36">
                <ai-button text="Thư mục"
                           path="#.selectFolder"
                           value="explorer.folderPath" />
                <ai-vr/>
                <ai-button icon=""
                           path="explorer.folderPath"
                           value="{explorer.defaultFolder_1}" />
                <ai-vr/>
                <ai-button icon=""
                           path="explorer.folderPath"
                           value="{explorer.defaultFolder_2}" />
                <ai-vr/>
                <ai-button icon=""
                           path="explorer.folderPath"
                           value="{explorer.defaultFolder_3}" />
                <ai-vr/>
                <ai-button icon=""
                           path="explorer.folderPath"
                           value="{explorer.defaultFolder_4}" />
                <ai-input path="explorer.folderPath"
                          class="full"
                          placeholder="Đường dẫn đến thư mục" />
                <ai-button path="#.openFolder"
                           value="explorer.folderPath"
                           icon="" />
                <ai-vr/>
                <ai-button icon=""
                           path="explorer.folderPath"
                           value="" />
            </ai-row>
            <ai-line/>
            <ai-col size="24">
                <ai-table ref="explorerTable"
                          :mode="explorerMode"
                          :data="explorerData"
                          :config="explorerConfig" />
            </ai-col>
        </ai-col>
    </ai-col>
</template>
<script>
import {
    load,
    include,
    computed
} from 'modules';

export default {
    id: 'explorer',
    name: 'explorer-',
    components: {
        ...load('container'),
        ...load('units')
    },
    data() {
        return {
            targetFolderChildPattern: '[Ai Scans] {project.project[{explorer.renameProjectID}][1]} - Chap {explorer.renameChapterIDString}',
            ...include(require.context('./data/', false, /[^/]+\.js$/), 1, 1)
        };
    },
    computed: {
        saveFolderPath() {
            return this.folderPath.replace(/(1 - RAW|2 - ENG|3 - Trans|4 - PSD|5 - PNG).*$/, '5 - PNG');
        },
        ...computed('explorer')
    },
    watch: include(require.context('./watch/', true, /[^/]+\.js$/), 1, 4, 'js', /src/),
    mounted() {
        this.explorer();
    },
    methods: include(require.context('./methods/', true, /[^/]+\.js$/), 1, 4, 'js', /src/),
};

</script>
