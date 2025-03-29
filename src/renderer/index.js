import 'babel-polyfill';
import './style/index.scss';

import Vue from 'vue';
import app from './vue/app/app.vue';
import router from './router';
import store from './store';
import key from '../renderer/modules/src/key/key';

new Vue({
    router,
    store,
    created() {
        key();
    },
    render: h => h(app, {
        name: 'app',
        ref: 'app'
    })
}).$mount('#app');
