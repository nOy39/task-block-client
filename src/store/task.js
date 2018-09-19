import {AXIOS} from '../components/http-common'

export default {
  state: {
    tasks: ''
  },
  mutations: {
    setTask (state, payload) {
      state.tasks = payload
    }
  },
  getters: {
    getTask (state) {
      return state.tasks
    }
  },
  actions: {
    fetchTasks ({commit}, payload) {
      commit('setError', null)
      commit('setLoading', true)
      AXIOS({
        method: 'get',
        url: '/tasks/' + payload,
        headers: {
          'Authorization': localStorage.getItem('user')}
      })
        .then(response => {
          commit('setTask', response.data)
          console.log(response.data)
          commit('setLoading', false)
        })
        .catch(e => {
          console.log(localStorage.getItem('user'))
          commit('setError', e.message)
          commit('setLoading', false)
        })
    }
  }
}
