import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      state: {
          token: '',
          admin: {
              id: null,
              name: null,
          },
      },
  },
  mutations: {
      setToken(state, theToken) {
          state.token = theToken;
      },

      setAdmin(state, theAdmin) {
          state.admin.id = theAdmin.id;
          state.admin.name = theAdmin.name;
      },

      cleanToken(state) {
          state.token = '';
          state.admin= {
              id: null,
              name: null,
          };
      }
  },
  actions: {
  }
});
