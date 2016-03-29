import Vue from 'vue'
import VuePaginate from 'vue-paginate'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'

import App from './App.vue'
import Login from './components/Login.vue'
import PostEdit from './components/PostEdit.vue'
import Posts from './components/Posts.vue'
import Users from './components/Users.vue'

Vue.use(VuePaginate)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueValidator)

export var router = new VueRouter()

router.map({
  '/posts': {
    component: Posts
  },
  '/users': {
    component: Users
  },
  '/login': {
    component: Login
  },
  '/post-edit/:post_id': {
    component: PostEdit
  }
})

Vue.http.options.root = 'http://wp-rest.local/wp-json'
// Vue.http.options.root = 'http://demo.wp-api.org/wp-json'

Login.methods.checkAuth()

Vue.http.headers.common['Authorization'] = Login.methods.getAuthHeader()

Vue.http.interceptors.push({
  response: function (response) {
    if (response.status === 401) { // Unauthorized
      router.go('/login')
    }
    return response
  }
})

router.start(App, '#app')
