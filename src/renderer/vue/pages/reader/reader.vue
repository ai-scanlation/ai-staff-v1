<template>
    <ai-col>
        <ai-col class="box dark full"
                style="z-index: 1">
            <ai-row size="36">
                <ai-button path="reader.showLeft"
                           value="@"
                           icon="" />
                <ai-line/>
                <ai-button path="reader.margin"
                           value="@"
                           icon="" />
                <ai-line/>
                <ai-button path="#.selectFolder"
                           value="reader.folderPath"
                           text="Thư mục" />
                <ai-vr/>
                <ai-button path="reader.reader"
                           icon="" />
                <ai-input path="reader.folderPath"
                          class="full"
                          placeholder="Đường dẫn đến thư mục" />
                <ai-button path="#shell.openFolder"
                           value="reader.folderPath"
                           icon="" />
                <ai-vr/>
                <ai-button path="reader.folderPath"
                           value=""
                           icon="" />
            </ai-row>
            <ai-row class="full">
                <ai-col :style="{width: 250 * showLeft + 'px'}"
                        class="box dark"
                        style="transition: width 0.5s">
                    <ai-line/>
                    <ai-row size="36">
                        <ai-button icon="" />
                        <ai-button icon="" />
                        <ai-vr/>
                        <ai-button :text="`${imgs.length} tập tin`"
                                   class="full"
                                   path="reader.goToExplorer" />
                    </ai-row>
                    <ai-line/>
                    <ai-scroll class="full"
                               size="32">
                        <ai-button v-for="img in imgs"
                                   :key="img.name"
                                   :class="{ loaded: img.loaded ,redraw: /redraw\./.test(img.name), redrawed: /redraw\s/.test(img.name) }"
                                   :percent="img.percent"
                                   :index="img.index"
                                   :text="img.name.replace(/^([^\d]+(?=\d))/, '..... ')"
                                   :value="img.index"
                                   class="progress"
                                   path="reader.scrollToImage">
                            <div :style="{ width: img.top + '%' }"
                                 class="percent" />
                            <div :style="{ width: img.bot + '%' }"
                                 class="percent" />
                        </ai-button>
                    </ai-scroll>
                    <ai-line/>
                    <ai-row size="36">
                        <ai-button icon=""
                                   path="reader.show"
                                   value="all" />
                        <ai-button icon=""
                                   path="reader.show"
                                   value="two" />
                        <ai-button icon=""
                                   path="reader.show"
                                   value="raw" />
                    </ai-row>
                </ai-col>
                <ai-line/>
                <ai-scroll ref="images"
                           :show="show"
                           :class="{imageMargin: margin}"
                           class="full light images"
                           path="reader.updateScroll">
                    <ai-image v-for="(img,index) in imgs"
                              :key="index"
                              :img="img"
                              :class="{ redraw: /redraw\./.test(img.name), redrawed: /redraw\s/.test(img.name) }"
                              :index="img.index" />
                </ai-scroll>
                <!-- <ai-line/> -->
                <!-- <ai-col class="box dark"
                        style="transition: width 0.5s"
                        :style="{width: 500 * showLeft + 'px'}">
                    <ai-line/>
                    <ai-row size="36">
                        <ai-button icon="" />
                        <ai-button icon="" />
                        <ai-vr/>
                        <ai-button :text="`${imgs.length} tập tin`"
                                   class="full"
                                   path="reader.goToExplorer" />
                    </ai-row>
                    <ai-line/>
                    <ai-scroll class="full"
                               size="32">
                    </ai-scroll>
                </ai-col> -->
            </ai-row>
        </ai-col>
    </ai-col>
</template>
<script>
import path from 'path';
import {
    load,
    save,
    include
} from 'modules';

export default {
    id: 'reader',
    name: 'reader-',
    components: {
        ...load('container'),
        ...load('units'),
        ...load('pages/reader/components'),
        ...load('layouts', 'header')
    },
    data: () => ({
        folderPath: '',
        folderName: '',
        showLeft: false,
        margin: false,
        imgs: [],
        transcript: '',
        show: 'all'
    }),
    watch: {
        folderPath(folderPath) {
            this.folderName = path.basename(folderPath);
            this.reader();
        }
    },
    mounted() {
        save(this, [
            'folderPath',
            'showLeft',
            'margin',
            'transcript'
        ]);
    },
    methods: include(require.context('./methods/', false, /[^/]+\.js$/))
};

</script>
