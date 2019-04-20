import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '',
        user: {
            id: null,
            nickname: null,
        },
    },

    mutations: {
        setToken(state, theToken) {
            state.token = theToken;
        },

        setUser(state, theUser) {
            state.user.id = theUser.id;
            state.user.nickname = theUser.nickname;
        },

        cleanToken(state) {
            state.token = '';
            state.user = {
                id: null,
                nickname: null,
            };
        }
    },

    actions: {
    }
});