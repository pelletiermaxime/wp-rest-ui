<template>
  <div id="app">
    <ul>
      <!-- <li><a v-link="{ path: '/posts' }">Posts</a></li> -->
      <li><a v-link="'/posts'">Posts</a></li>
      <li><a v-link="'/users'">Users</a></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
