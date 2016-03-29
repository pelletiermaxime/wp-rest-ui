<template>
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
</template>

<script>
export default {
  data () {
    return {
      users: []
    }
  },

  ready () {
    this.$http.get('wp/v2/users', {
      order: 'asc',
      filter: {posts_per_page: -1},
    })
      .then(function (response) {
        this.users = response.data
      })
  }
}
</script>
