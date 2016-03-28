<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Log In</h2>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error.message }}</p>
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="Enter your username"
        v-model="credentials.username"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your password"
        v-model="credentials.password"
      >
    </div>
    <button class="btn btn-primary" @click="login()">Login</button>
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
      error: ''
    }
  },

  methods: {
    login () {
      this.$http.post('http://wp-rest.local/wp-json/jwt-auth/v1/token', {
        username: this.credentials.username,
        password: this.credentials.password
      })
      .then(function (success_response) {
        console.log('SUCCESS!')
        localStorage.setItem('id_token', success_response.data.token)
        router.go(window.history.back())
      }, function (error_response) {
        console.log('ERROR!')
        console.error(error_response)
        this.error = error_response.data
      })
    },

    getAuthHeader () {
      var token = localStorage.getItem('id_token')
      if (token == null) {
        return ''
      }

      return 'Bearer ' + token
    }

  }
}
</script>
