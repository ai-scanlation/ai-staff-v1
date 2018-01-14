/* eslint no-undef : "off" */

'use strict';
const styles = document.createElement('style');
styles.innerText = `@import url(https://unpkg.com/spectre.css/dist/spectre.min.css);.empty{display:flex;flex-direction:column;justify-content:center;height:100vh;position:relative}.footer{bottom:0;font-size:13px;left:50%;opacity:.9;position:absolute;transform:translateX(-50%);width:100%}`;
document.head.appendChild(styles);

const vueScript = document.createElement('script');
vueScript.setAttribute('type', 'text/javascript');
vueScript.setAttribute('src', 'https://unpkg.com/vue');
vueScript.onload = init;
document.head.appendChild(vueScript);

function init() {
    // Vue.config.devtools = false;
    // Vue.config.productionTip = false;
    new Vue({
        data: {
            versions: {
                electron: 1, // process.versions.electron,
                electronWebpack: 1, //require('electron-webpack/package.json').version
            },
            a: '000-asad'
        },
        methods: {
            open(b) {
                require('electron').shell.openExternal(b);
            }
        },
        template: `<div><div class=empty><p class="empty-title h5">Welcome to your new project!<p class=empty-subtitle>Get started now and take advantage of the great documentation at hand.<div class=empty-action><button @click="open('https://webpack.electron.build')"class="btn btn-primary">Documentation</button> <button @click="open('https://electron.atom.io/docs/')"class="btn btn-primary">Electron</button><br><ul class=breadcrumb><li class=breadcrumb-item>electron-webpack v{{ versions.electronWebpack }}</li><li class=breadcrumb-item>electron v{{ versions.electron }} {{ a }}</li></ul></div><p class=footer>This intitial landing page can be easily removed from <code>src/renderer/index.js</code>.</p></div></div>`
    }).$mount('#app');
}


// import 'babel-polyfill';
// import Vue from 'vue';
// import app from '~/script/vue/app/app.vue';
// import {
//     key
// } from 'modules';
// import router from './router';
// import store from './store';

// import '../style/index.scss';

// const script = document.createElement('script');
// script.setAttribute('type', 'text/javascript');
// script.onload = function() {
//     new Vue({
//         router,
//         store,
//         data() {
//             return {
//                 a: 123
//             };
//         },
//         created: function() {
//             key();
//         },
//         render: h => h(app, {
//             ref: 'app'
//         }),
//     }).$mount('#app');
// };