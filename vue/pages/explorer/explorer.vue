<template>
    <ai-col>
        <ai-col class="box margin dark">
            <ai-row size="36">
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
                <div class="full"></div>
                <ai-button path="tabs[explorer-explorerMode].toggleMode">
                    <ai-label text="{tabs[explorer-explorerMode].description} [F12]" />
                </ai-button>
            </ai-row>
            <ai-line/>
            <ai-tabs tabs="pages/explorer/components/tabs"
                     path="explorer.explorerMode"
                     ref="explorer-explorerMode" />
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
    save,
    include
} from '~/modules';

export default {
    name: 'explorer',
    components: {
        ...load('container'),
        ...load('units')
    },
    data() {
        return {
            folderPath: '',
            targetFolderPath: '',
            targetFolderChildPattern: '[Ai Scans] {project.project[{explorer.renameProjectID}][1]} - Chap {explorer.renameNumberString}',
            targetFolderChild: true,
            folders: [],
            files: [],

            defaultFolder_1: '',
            defaultFolder_2: '',
            defaultFolder_3: '',
            defaultFolder_4: '',

            explorerMode: '',
            explorerLimit: true,

            renamePattern: '[Ai Scans] Shiki Chap <15> - <0+><ext>',
            renameProjectID: 1,
            renameNumber: 1,
            renameNumberString: '001',
            renameIndex: 1,

            convertExtensionID: 0,
            convertWidthID: 1,
            convertInterpolateID: 0,
            customConvertWidth: 800,

            allowConvertExtension: [
                'PNG',
                'JPG'
            ],
            allowConvertWidth: [
                '',
                '100%'
            ],
            allowConvertInterpolate: [
                'Average',
                'Average4',
                'Average9',
                'Average16',
                'Background',
                'Bilinear',
                'Blend',
                'Catrom',
                'Integer',
                'Mesh',
                'Nearest',
                'Spline'
            ],
            ...include(require.context('./data/', false, /[^/]+\.js$/), 1, 1)
        };
    },
    mounted() {
        save(this, [
            'folderPath',
            'targetFolderPath',

            'convertInterpolateID',

            'defaultFolder_1',
            'defaultFolder_2',
            'defaultFolder_3',
            'defaultFolder_4',

            'renamePattern',
            'explorerMode'
        ]);
    },
    computed: {
        saveFolderPath: function() {
            return this.folderPath.replace(/(1 - RAW|2 - ENG|3 - Trans|4 - PSD|5 - PNG).*$/, '5 - PNG');
        }
    },
    methods: include(require.context('./methods/', true, /[^/]+\.js$/), 1, 4, 'js', /src/),
    watch: include(require.context('./watch/', true, /[^/]+\.js$/), 1, 4, 'js', /src/)
};

</script>
