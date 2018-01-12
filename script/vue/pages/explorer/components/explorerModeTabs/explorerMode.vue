<template>
    <ai-col :active="isActive">
        <ai-row size="36">
            <!--
            <ai-button icon=""
                       text="Thư mục mới" />
            <ai-vr/>
            <ai-button icon=""
                       text="Đổi tên" />
            <ai-vr/>
            <ai-button icon=""
                       text="Sao chép" />
            <ai-vr/>
            <ai-button icon=""
                       text="Di chuyển" />
            <ai-line/>
            -->
            <ai-button icon=""
                       path="explorer.makeFolderRedraw"
                       text="Tạo thư mục redraw" />
            <ai-vr/>
            <div class="full" />
            <ai-line class="property-line" />
            <ai-button path="explorer.explorerToggleProperty"
                       table-col="explorer-title-2"
                       value="2"
                       icon="" />
            <ai-button path="explorer.explorerToggleProperty"
                       table-col="explorer-title-3"
                       value="3"
                       icon="" />
            <ai-button path="explorer.explorerToggleProperty"
                       table-col="explorer-title-4"
                       value="4"
                       icon="" />
            <ai-button path="explorer.explorerToggleProperty"
                       table-col="explorer-title-5"
                       value="5"
                       icon="" />
        </ai-row>
    </ai-col>
</template>
<script>
import {
    load
} from 'modules';
export default {
    name: 'ExplorerMode',
    description: 'Duyệt tập tin',
    components: {
        ...load('container'),
        ...load('units')
    },
    data() {
        return {
            isActive: false
        };
    }
};
</script>