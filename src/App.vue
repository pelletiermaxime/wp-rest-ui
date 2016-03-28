<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand">WP Rest UI</a>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li v-link-active>
            <a v-link="{ path: '/posts', activeClass: 'active' }">Posts</a>
          </li>
          <li v-link-active>
            <a v-link="{ path: '/users', activeClass: 'active' }">Users</a>
          </li>
          <li v-link-active>
            <a v-link="{ path: '/login', activeClass: 'active' }">Login</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
  <router-view></router-view>
  </div>
</template>

<script>
</script>