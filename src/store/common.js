export default {
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    }
  },
  getters: {
    isLoading (state) {
      return state.loading
    },
    getError (state) {
      return state.error
    }
  },
  actions: {
    changeLoading ({commit}, payload) {
      commit('setLoading', payload)
    },
    createError ({commit}, payload) {
      commit('setError', payload)
    },
    clearError ({commit}) {
      commit('setError', null)
    }
  }
}
