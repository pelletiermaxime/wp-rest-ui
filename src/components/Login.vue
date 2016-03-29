<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Log In</h2>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error.message }}</p>
      <p v-if="$login.username.required">Username is required.</p>
      <p v-if="$login.password.required">Password is required.</p>
    </div>
    <validator name="login">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Enter your username"
          v-model="credentials.username"
          v-validate:username="{required: true}"
        >
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="Enter your password"
          v-model="credentials.password"
          v-validate:password="['required']"
        >
      </div>
      <button class="btn btn-primary" @click="login()" v-if="$login.valid">Login</button>
    </validator>
  </div>
</template>

<script>
import {router} from '../main'

export default {
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: '',
      loggedIn: false,
      user: {},
    }
  },

  ready () {
    this.checkAuth()
  },

  methods: {
    login () {
      this.$http.post('jwt-auth/v1/token', {
        username: this.credentials.username,
        password: this.credentials.password
      })
      .then(function (success_response) {
        console.log('SUCCESS!')

        this.setUserByEmail(success_response.data.user_email)

        this.loggedIn = true

        localStorage.id_token = success_response.data.token

        router.go(window.history.back())
      }, function (error_response) {
        console.log('ERROR!')
        console.error(error_response)
        this.error = error_response.data
      })
    },

    checkAuth () {
      var token = localStorage.id_token
      var current_user = localStorage.current_user

      if (token != null && current_user != null) {
        this.loggedIn = true
        this.user = JSON.parse(current_user)
      }
    },

    setUserByEmail (email) {
      this.$http.get('wp/v2/users', {
        search: email,
      })
        .then(function (response) {
          this.user = response.data[0]
          localStorage.current_user = JSON.stringify(response.data[0])
        })
    },

    getAuthHeader () {
      var token = localStorage.id_token

      if (token == null) {
        return ''
      }

      return 'Bearer ' + token
    }

  }
}
</script>
