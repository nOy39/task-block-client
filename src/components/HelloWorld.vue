<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <blockquote>
          &#8220;First, solve the problem. Then, write the code.&#8221;
          <footer>
            <small>
              <em>&mdash;John Johnson</em>
            </small>
          </footer>
        </blockquote>
        <button type="button" @click="testProxy">Test Proxy</button>
        <button type="button" @click="signIn">SignIn</button>
        <button type="button" @click="meInfo">meInfo</button>
        <h1 v-show="responseResult">Test result:</h1>
        <small>
          <em>{{response}}</em>
        </small>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  import {AXIOS} from './http-common'

  export default {
    data () {
      return {
        loginRequest: {
          usernameOrEmail: 'email@email.ry',
          password: '123456'
        },
        response: null,
        jwtToken: {
          tokenType: null,
          accessToken: null
        },
        headers: {
          'Authorization': JSON.stringify(localStorage.getItem('user'))
        }
      }
    },
    methods: {
      testProxy () {
        AXIOS.post('/auth/signin', this.loginRequest)
          .then(response => {
            console.log(response.data)
            this.response = response.data
            this.jwtToken.accessToken = response.data.accessToken
            this.jwtToken.tokenType = response.data.tokenType + ' '
            localStorage.setItem('user', 'Bearer ' + response.data.accessToken)
            console.log(localStorage.getItem('user'))
          })
          .catch(e => console.log(e))
      },
      signIn () {
        AXIOS.get('/auth/user/me', {
          headers: {
            'Authorization': localStorage.getItem('user')
          }
        })
          .then(response => {
            console.log(response)
          })
          .catch(e => {
            console.log(e.message)
          })
      },
      meInfo () {
        AXIOS({
          method: 'get',
          url: '/auth/user/me',
          headers: {
            'Authorization': localStorage.getItem('user')
          }
        }).then(response => {
          console.log(response)
        }).catch(e => {
          console.log(e.message)
          this.$store.dispatch('createError', e.message)
        })
      }
    },
    computed: {
      responseResult () {
        if (this.response != null) {
          return true
        }
        return false
      }
    }
  }
</script>
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
