<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      class="grey lighten-4"
      app
    >
      <v-list>
        <v-list-tile
          v-for="(link, index) in items"
          :key="index"
          :to="link.url">
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="link.text"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      clipped-left
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!authorize"
             :loading="loading"
             :disabled="loading"
             color="success"
             class="white--text"
             @click.native="signIn"
      >
        Регистрация
        <v-icon right small>fas fa-user-plus</v-icon>
      </v-btn>
      <v-btn v-if="authorize"
        :loading="loading"
        :disabled="loading"
        color="red"
        class="white--text"
        @click.native="signOut"
      >
        Выход
        <v-icon right small>fas fa-user-alt-slash</v-icon>
      </v-btn>
      <v-btn v-else
             :loading="loading"
             :disabled="loading"
             color="info"
             class="white--text"
             @click.native="signIn"
      >
        Вход
        <v-icon right small>fas fa-user-alt</v-icon>
      </v-btn>

    </v-toolbar>
    <v-content>
      <template v-if="error">
        <v-snackbar

          :multi-line="true"
          color="error"
          @input="closeError"
          :value="true"
        >
          {{error}}
          <v-btn flat dark @click.native="closeError">Close</v-btn>
        </v-snackbar>
      </template>
      <slot></slot>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
    export default {
      name: 'Sidebar',
      data () {
        return {
          drawer: false,
          fixed: true,
          items: [
            { icon: 'event', text: 'Главная', url: '/home' },
            { icon: 'widgets', text: 'Мои блоки', url: '/myblocks' },
            { icon: 'library_add', text: 'Создать новый блок', url: '/add' },
            { divider: true },
            { icon: 'bubble_chart', text: 'Тест', url: '/test' },
            { icon: 'add_box', text: 'Inspire' },
            { icon: 'lightbulb_outline', text: 'Notes' },
            { divider: true },
            { icon: 'archive', text: 'Archive' },
            { icon: 'delete', text: 'Trash' },
            { divider: true },
            { icon: 'settings', text: 'Settings' },
            { icon: 'chat_bubble', text: 'Trash' },
            { icon: 'help', text: 'Help' }
          ],
          miniVariant: true,
          title: 'Task Block'
        }
      },
      computed: {
        authorize () {
          return this.$store.getters.isAuthorizing
        },
        loading () {
          return this.$store.getters.isLoading
        },
        error () {
          if (this.$store.getters.getError != null) {
            return this.$store.getters.getError
          } else {
            return false
          }
        }
      },
      methods: {
        signIn () {
          if (localStorage.length > 0) {
            this.$store.dispatch('changeAuthorize', true)
          } else {
            this.$router.push('/login')
          }
        },
        signOut () {
          localStorage.clear()
          this.$store.dispatch('changeAuthorize', false)
          console.log(localStorage.getItem('user').length)
          this.$router.push('/')
        },
        closeError () {
          this.$store.dispatch('clearError')
        }
      }
    }
</script>

<style scoped>

</style>
