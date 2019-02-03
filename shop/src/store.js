import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '1b460cd18bf17fb3f0bb35c5f2fc5bff',
    },

    mutations: {
        setToken(state, theToken) {
            state.token = theToken;
        },

        cleanToken(state) {
            state.token = '';
        }
    },

    actions: {
    }
})
