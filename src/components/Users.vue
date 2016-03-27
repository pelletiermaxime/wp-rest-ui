<template>
  <div class="hello">
    <h1>Users list</h1>
    <table border="1">
      <tr>
        <th>Avatar</th>
        <th>Username</th>
      </tr>
      <tr v-for="user in users">
        <td><img src="{{ user.avatar_urls['96'] }}" /></td>
        <td>{{ user.name }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: []
    }
  },

  ready () {
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
