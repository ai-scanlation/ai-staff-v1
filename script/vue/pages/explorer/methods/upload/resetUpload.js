import Vue from 'vue';

module.exports = function() {
    this.explorerData['@scroll'].files.forEach(file => {
        Vue.set(file[7], 'done', false);
    });
    this.$store.commit('set', {
        path: 'google.upload.localFiles',
        value: []
    });
    this.$store.commit('set', {
        path: 'google.upload.cloudFiles',
        value: []
    });
};