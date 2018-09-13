<template>
  <sidebar>
    <router-view></router-view>
  </sidebar>
</template>

<script>
  import Sidebar from './components/parts/Sidebar'

  export default {
    name: 'App',
    components: {Sidebar},
    beforeCreate () {
      if (localStorage.length > 0) {
        this.$store.dispatch('changeAuthorize', true)
      } else {
        this.$store.dispatch('changeAuthorize', false)
      }
    }
  }
</script>
