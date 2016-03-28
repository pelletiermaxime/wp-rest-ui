import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import Posts from './components/Posts.vue'
import Users from './components/Users.vue'
import Login from './components/Login.vue'

Vue.use(VueResource)
Vue.use(VueRouter)

var router = new VueRouter()

router.map({
  '/posts': {
    component: Posts
  },
  '/users': {
    component: Users
  },
  '/login': {
    component: Login
  }
})

Vue.http.headers.common['Authorization'] = Login.methods.getAuthHeader()

Vue.http.interceptors.push({
  request: function (request) {
    return request
  },

  response: function (response) {
    if (response.status === 401) { // Unauthorized
      router.go('/login')
    }
    return response
  }
})

router.start(App, 'body')
