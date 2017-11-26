<template>
    <div id="sidebar"
         class="col dark"
         size="40">
        <ai-button icon="" path="views.view" value="reader" />
        <ai-button icon="" path="views.view" value="explorer" />
        <ai-button icon="" path="views.view" value="project" />
        <ai-button icon="" path="views.view" value="redraw" />
        <ai-button class="full noHover" />
        <ai-button icon="" path="views.view" value="setting" />
    </div>
</template>
<script>
import {
    load
} from 'modules';
export default {
    name: 'sidebar',
    components: {
        ...load('units'),
        ...load('container', 'col')
    }
};

</script>
