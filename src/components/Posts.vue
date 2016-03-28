<style lang="stylus">
.delete
  color: red
  font-size: 22px
</style>

<template>
  <h1>Posts list</h1>
  <table class="table table-striped table-bordered">
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
      <td><span class="delete" @click="deletePost($index, post.id)">&times;</span></td>
    </tr>
  </table>
</template>

<script>
export default {
  data () {
    return {
      posts: [
        // {
        //   title: {rendered: 'Pomme'},
        //   link: 'http://link.com',
        //   author: 'Max',
        //   excerpt: {rendered: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, ipsam.'}
        // }
      ],
      users: []
    }
  },

  ready () {
    this.$http.get('http://wp-rest.local/wp-json/wp/v2/posts', {
      // per_page: -1,
      order: 'asc',
      filter: {posts_per_page: -1}
    })
      .then(function (response) {
        this.posts = response.data
      }
    )
    this.$http.get('http://wp-rest.local/wp-json/wp/v2/users', {
      // per_page: -1,
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
      this.$http.delete('http://wp-rest.local/wp-json/wp/v2/posts/' + post_id)
      .then(function (success_response) {
        this.posts.splice(index, 1)
        console.log('SUCCESS!')
        console.log(success_response)
      }, function (error_response) {
        console.log('ERROR!')
        console.log(error_response)
      })
    }
  }
}
</script>
