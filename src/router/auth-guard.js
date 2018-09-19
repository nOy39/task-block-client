import store from '../store/index'

export default function (to, from, next) {
  if (store.getters.isAuthorizing) {
    next()
  } else {
    next('/login?loginError=true')
  }
}
