export default {
  state: {
    authorize: false,
    user: null,
    tokenJwt: '',
    typeJwt: ''
  },
  mutations: {
    setAuthorize (state, payload) {
      state.authorize = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setTokenJwt (state, payload) {
      state.tokenJwt = payload
    },
    setTypeJwt (state, payload) {
      state.typeJwt = payload
    }
  },
  getters: {
    isAuthorizing (state) {
      return state.authorize
    },
    getUser (state) {
      return state.user
    },
    getTokenJwt (state) {
      return state.tokenJwt
    },
    getTypeJwt (state) {
      return state.typeJwt
    }
  },
  actions: {
    changeAuthorize ({commit}, payload) {
      commit('setAuthorize', payload)
    },
    createUser ({commit}, payload) {
      commit('setUser', payload)
    },
    saveToken ({commit}, payload) {
      commit('setTokenJwt', payload.accessToken)
      commit('setTypeJwt', payload.tokenType)
      localStorage.clear()
      localStorage.setItem('user', 'Bearer ' + payload.accessToken)
      commit('setAuthorize', true)
    }
  }
}
