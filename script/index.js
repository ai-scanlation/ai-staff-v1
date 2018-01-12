import 'babel-polyfill';

import Vue from 'vue';
import app from '~/script/vue/app/app.vue';
import {
    key
} from 'modules';
import router from './router';
import store from './store';

new Vue({
    router,
    store,
    created: function() {
        key();
    },
    render: h => h(app, {
        ref: 'app'
    }),
}).$mount('#app');