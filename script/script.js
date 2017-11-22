import Vue from 'vue';
import app from '~/script/vue/app/app.vue';
import {
    key
} from 'modules';
import router from './router';
import store from './store';

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(app, {
        ref: 'app'
    }),
    created: function() {
        key();
    }
});