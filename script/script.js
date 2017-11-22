import Vue from 'vue';
import app from '~/script/vue/app/app.vue';
import {
    key
} from 'modules';
import router from './router';
import state from './state';

new Vue({
    el: '#app',
    router: router,
    store: state,
    render: h => h(app, {
        ref: 'app'
    }),
    created: function() {
        key();
    }
});