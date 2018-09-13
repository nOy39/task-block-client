<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login form</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <v-btn
          slot="activator"
          :href="source"
          icon
          large
          target="_blank"
        >
          <v-icon large>code</v-icon>
        </v-btn>
        <span>Source</span>
      </v-tooltip>
      <v-tooltip right>
        <v-btn slot="activator" icon large href="https://codepen.io/johnjleider/pen/wyYVVj" target="_blank">
          <v-icon large>mdi-codepen</v-icon>
        </v-btn>
        <span>Codepen</span>
      </v-tooltip>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
        <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import {AXIOS} from './http-common'

  export default {
    data () {
      return {
        valid: false,
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters'
        ],
        usernameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Password must be less than 6 characters'
        ],
        confirmPasswordRules: [
          v => !!v || 'Password is required',
          v => this.password === v || 'Password should match.'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ]
      }
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('clearError')
          this.$store.dispatch('changeLoading', true)
          AXIOS({
            method: 'post',
            url: '/auth/signup',
            data: {
              name: this.name,
              username: this.username,
              email: this.email,
              password: this.password
            }
          })
            .then(() => {
              this.$store.dispatch('changeLoading', false)
              this.$router.push('/login')
            })
            .catch(e => {
              this.$store.dispatch('createError', e.message)
              this.$store.dispatch('changeLoading', false)
              this.$router.push('/')
            })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    },
    computed: {
      loading () {
        return this.$store.getters.isLoading
      }
    }
  }
</script>

<style scoped>

</style>
