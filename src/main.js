import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import Posts from './components/Posts.vue'
import Users from './components/Users.vue'

Vue.use(VueResource)
Vue.use(VueRouter)

var router = new VueRouter()

router.map({
  '/posts': {
    component: Posts
  },
  '/users': {
    component: Users
  }
})

// new Vue({
//   el: 'body',
//   components: { App }
// })

router.start(App, 'body')
