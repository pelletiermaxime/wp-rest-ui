<style lang="stylus">
.delete
  color: red
  font-size: 22px
</style>

<template>
  <h1>Posts list</h1>
  <table class="table table-striped" v-paginate:8="posts">
    <tr>
      <th>Title</th>
      <th>Link</th>
      <th>Author</th>
      <th>Content excerpt</th>
      <th>Actions</th>
    </tr>
    <tr v-for="post in posts">
      <td>{{ post.title.rendered }}</td>
      <td>{{ post.link }}</td>
      <td><span v-for="user in users|filterBy post.author in 'id'">{{ user.name }}</span></td>
      <td>{{ post.excerpt.rendered }}</td>
      <td>
        <span class="delete" @click="deletePost($index, post.id)">&times;</span>
        <a v-link="{ path: '/post-edit/' + post.id }" class="pull-right">Edit</a>
      </td>
    </tr>
  </table>
  <!-- links -->
  <nav>
    <ul class="pagination">
      <li v-for="postLink in postsLinks" :class="{ 'active': (postLink == currentPostsPage)}">
        <a @click="changePostsPage(postLink)">
          {{ postLink + 1 }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import VuePaginate from 'vue-paginate'

export default {
  data () {
    return {
      posts: [
        // {
        //   title: {rendered: 'Pomme 1'},
        //   link: 'http://link.com',
        //   author: 'Max',
        //   excerpt: {rendered: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, ipsam.'}
        // },
        // {title: {rendered: 'Pomme 2'}},
      ],
      users: []
    }
  },

  ready () {
    this.$http.get('wp/v2/posts', {
      order: 'asc',
      filter: {posts_per_page: -1}
    })
      .then(function (response) {
        this.fullPosts = response.data
      }
    )
    this.$http.get('wp/v2/users', {
      order: 'asc',
      filter: {posts_per_page: -1}
    })
      .then(function (response) {
        this.users = response.data
      }
    )
  },

  methods: {
    deletePost (index, post_id) {
      this.$http.delete('wp/v2/posts/' + post_id)
      .then(function (success_response) {
        this.posts.splice(index, 1)
      }, function (error_response) {
        console.log(error_response)
      })
    }
  }
}
</script>
