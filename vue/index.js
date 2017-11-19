import Vue from 'vue';
import app from '~/vue/app/app.vue';
import {
    key
} from '~/modules';
new Vue({
    el: '#app',
    render: h => h(app, {
        ref: 'app'
    }),
    created: function() {
        key();
    }
});