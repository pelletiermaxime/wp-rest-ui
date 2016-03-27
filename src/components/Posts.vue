<template>
  <div class="hello">
    <h1>Posts list</h1>
    <table border="1">
      <tr>
        <th>Title</th>
        <th>Link</th>
        <th>Author</th>
        <th>Content excerpt</th>
      </tr>
      <tr v-for="post in posts">
        <td>{{ post.title.rendered }}</td>
        <td>{{ post.link }}</td>
        <td><span v-for="user in users|filterBy post.author in 'id'">{{ user.name }}</span></td>
        <td>{{ post.excerpt.rendered }}</td>
      </tr>
    </table>
  </div>
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
  }
}
</script>
