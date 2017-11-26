<template>
    <ai-col :active="isActive"
            size="36">
        <ai-row>
            <ai-button path="explorer.convert"
                       style="padding: 0 10px">
                <span class="slot">
                    Lưu vào <br/> thư mục mới
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
        <ai-line/>
        <ai-row size="36">
            <ai-array path="explorer.allowConvertExtension"
                      pathID="explorer.convertExtensionID"
                      action="toggle"
                      text="Định dạng: {array.value}"
                      style="width: 160px"
                      inputClass="hide" />
            <ai-line/>
            <ai-array path="explorer.allowConvertWidth"
                      pathID="explorer.convertWidthID"
                      action="toggle"
                      text="Chiều rộng: {array.value}"
                      inputClass="hide" />
            <ai-input path="explorer.customConvertWidth"
                      style="width: 70px"
                      type="number"
                      min="1"
                      max="5000"
                      class="hideIfBefore"
                      placeholder="số" />
            <ai-line/>
            <ai-array path="explorer.allowConvertInterpolate"
                      pathID="explorer.convertInterpolateID"
                      text="Nội suy: {array.value}"
                      action="toggle focus"
                      style="width: 280px"
                      inputClass="square" />
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
    load,
    find
} from 'modules';
export default {
    name: 'convertMode',
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