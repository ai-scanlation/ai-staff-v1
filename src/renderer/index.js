import Vue from 'vue';

new Vue({
    data: {
        versions: {
            electron: process.versions.electron,
            electronWebpack: require('electron-webpack/package.json').version
        },
        a: '-_-'
    },
    methods: {
        open(b) {
            require('electron').shell.openExternal(b);
        }
    },
    template: `<div><div class=empty><p class="empty-title h5">Welcome to your new project!<p class=empty-subtitle>Get started now and take advantage of the great documentation at hand.<div class=empty-action><button @click="open('https://webpack.electron.build')"class="btn btn-primary">Documentation</button> <button @click="open('https://electron.atom.io/docs/')"class="btn btn-primary">Electron</button><br><ul class=breadcrumb><li class=breadcrumb-item>electron-webpack v{{ versions.electronWebpack }}</li><li class=breadcrumb-item>electron v{{ versions.electron }} {{ a }}</li></ul></div><p class=footer>This intitial landing page can be easily removed from <code>src/renderer/index.js</code>.</p></div></div>`
}).$mount('#app');