import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      token: '',
      admin: {
          id: null,
          name: null,
          role: null,
      },
  },
  mutations: {
      setToken(state, theToken) {
          state.token = theToken;
      },

      setAdmin(state, theAdmin) {
          state.admin.id = theAdmin.id;
          state.admin.name = theAdmin.name;
          state.admin.role = theAdmin.role;
      },

      cleanToken(state) {
          state.token = '';
          state.admin= {
              id: null,
              name: null,
              role: null,
          };
      }
  },
  actions: {
  }
});