import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistedstate from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [VuexPersistedstate()],
    state: {
        explorer: {
            folderPath: '',
            targetFolderPath: '',
            abc: '123'
        }
    },
    mutations: {
        set(state, payload) {
            if (!payload.path) return;
            let self = state;
            const list = payload.path.split('.');
            while (list.length > 1) {
                self = state[list[0]];
                list.shift();
            }
            self[list[0]] = payload.value;
        }
    }
});