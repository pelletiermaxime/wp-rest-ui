<template>
  <div id="app" class="container">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand">WP Rest UI</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <!-- <li><a v-link="{ path: '/posts' }">Posts</a></li> -->
            <li><a v-link="'/posts'">Posts</a></li>
            <li><a v-link="'/users'">Users</a></li>
            <li><a v-link="'/login'">Login</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
</script>