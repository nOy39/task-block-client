import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import user from './user'
import task from './task'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common, user, task
  }
})
