<template>
    <ai-col :active="isActive"
            size="36">
        <ai-row>
            <ai-button path="explorer.convert"
                       style="padding: 0 10px">
                <span class="slot">
                    Lưu vào <br> thư mục mới
                </span>
            </ai-button>
            <ai-line/>
            <ai-col class="full">
                <ai-row>
                    <ai-button icon=""
                               path="explorer.renamePattern"
                               value="<name><ext>" />
                    <ai-vr/>
                    <ai-button icon=""
                               path="explorer.renamePattern"
                               value="[Ai Scans]
<#{explorer.renameProjectID}> - Chap
    <{explorer.renameChapterID}> -
        <{explorer.renamePageID}+>
            <ext>" />
                    <ai-input path="explorer.renamePattern"
                              class="full pre"
                              placeholder="Rename Pattern" />
                </ai-row>
                <ai-line/>
                <ai-row>
                    <ai-array path="project.project"
                              path-index="2"
                              path-id="explorer.renameProjectID"
                              class="full"
                              input-class="square" />
                    <ai-line/>
                    <ai-array path-id="explorer.renameChapterID"
                              class="reverse"
                              max="999"
                              text="Chương"
                              input-class="square" />
                    <ai-line/>
                    <ai-array path-id="explorer.renamePageID"
                              class="reverse"
                              max="999"
                              text="Bắt đầu từ"
                              input-class="square" />
                </ai-row>
            </ai-col>
        </ai-row>
        <ai-line/>
        <ai-row size="36">
            <ai-array path="explorer.allowConvertExtension"
                      path-id="explorer.convertExtensionID"
                      action="toggle"
                      text="Định dạng: {array.value}"
                      style="width: 160px"
                      input-class="hide" />
            <ai-line/>
            <ai-array path="explorer.allowConvertWidth"
                      path-id="explorer.convertWidthID"
                      action="toggle"
                      text="Chiều rộng: {array.value}"
                      input-class="hide" />
            <ai-input path="explorer.customConvertWidth"
                      style="width: 70px"
                      type="number"
                      min="1"
                      max="5000"
                      class="hideIfBefore"
                      placeholder="số" />
            <ai-line/>
            <ai-array path="explorer.allowConvertInterpolate"
                      path-id="explorer.convertInterpolateID"
                      text="Nội suy: {array.value}"
                      action="toggle focus"
                      style="width: 280px"
                      input-class="square" />
            <div class="full" />
        </ai-row>
        <ai-line/>
        <ai-row size="36">
            <ai-button text="Thư mục đích"
                       path="#.selectFolder"
                       value="explorer.targetFolderPath" />
            <ai-vr/>
            <ai-button icon=""
                       path="explorer.targetFolderPath"
                       value="{explorer.defaultFolder_3}\OK" />
            <ai-vr/>
            <ai-button icon=""
                       path="explorer.targetFolderPath"
                       value="{explorer.saveFolderPath}" />
            <ai-input path="explorer.targetFolderPath"
                      class="full"
                      placeholder="Đường dẫn đến thư mục" />
            <ai-line/>
            <ai-button class="full targetFolderChild"
                       path="explorer.targetFolderChild"
                       value="@">
                <ai-label class="full"
                          text="{explorer.targetFolderChildPattern}" />
            </ai-button>
            <ai-line/>
            <ai-button path="#.openFolder"
                       value="{explorer.targetFolderPath}\{explorer.targetFolderChildPattern}"
                       icon="" />
            <ai-vr/>
            <ai-button icon=""
                       path="explorer.targetFolderPath"
                       value="" />
        </ai-row>
    </ai-col>
</template>
<script>
import {
    load
} from 'modules';
export default {
    name: 'ConvertMode',
    description: 'Đổi định dạng',
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