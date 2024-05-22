import { createStore } from 'vuex';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default createStore({
  state: {
    userDetails: null,
    listados: [], // Almacenar los listados creados por el usuario
  },
  mutations: {
    setUserDetails(state, payload) {
      state.userDetails = payload;
    },
    addListado(state, payload) {
      state.listados.push(payload);
    },
    borrarListado(state, id) {
      state.listados = state.listados.filter(listado => listado.id !== id);
    }
  },
  actions: {
    fetchUserDetails({ commit }) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit('setUserDetails', {
            displayName: user.displayName,
            email: user.email
          });
        } else {
          commit('setUserDetails', null);
        }
      });
    },
    createListado({ commit }, listadoData) {
      // Asignar un ID único al listado
      const listadoConId = { ...listadoData, id: Date.now() };
      commit('addListado', listadoConId);
    },
    borrarListado({ commit }, id) {
      commit('borrarListado', id);
    }
  },
  getters: {
    isAuthenticated: state => !!state.userDetails,
    getListados: state => state.listados,
  }
});


