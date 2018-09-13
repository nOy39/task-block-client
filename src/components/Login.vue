<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-18">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Авторизация</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" validation>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Имя пользователя или email"
                v-model="usernameOrEmail"
                :rules="usernameRules"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Пароль"
                type="password"
                v-model="password"
                :counter="6"
                :rules="passwordRules"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="onSubmit"
              :loading="loading"
              :disabled="!valid || loading"
            >Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {AXIOS} from './http-common'

export default {
    data () {
      return {
        usernameOrEmail: '',
        password: '',
        valid: false,
        usernameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Password must be less than 6 characters'
        ]
      }
    },
    computed: {
      loading () {
        return this.$store.getters.isLoading
      }
    },
    methods: {
      onSubmit () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('clearError')
          this.$store.dispatch('changeLoading', true)
          AXIOS({
            method: 'post',
            url: '/auth/signin',
            data: {
              usernameOrEmail: this.usernameOrEmail,
              password: this.password
            }
          })
            .then(response => {
              this.$store.dispatch('saveToken', response.data)
              this.$store.dispatch('changeLoading', false)
              console.log(localStorage.getItem('user').length)
              this.$router.push('/')
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
    }
  }
</script>

<style scoped>

</style>
