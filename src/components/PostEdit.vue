<style lang="stylus">
</style>

<template>
  <h1>Edit post {{ $route.params.post_id }}</h1>
  <div class="form-group">
    <label for="title">Title</label>
    <input class="form-control" id="title" v-model="post.title.rendered">
  </div>
  <div class="form-group">
    <label for="content">Content</label>
    <textarea id="content" cols="30" rows="10" class="form-control" v-model="post.content.rendered"></textarea>
  </div>
  <button type="submit" class="btn btn-default" @click="savePost()">Save post</button>
</template>

<script>
export default {
  data () {
    return {
      post: [],
    }
  },

  ready () {
    var post_id = this.$route.params.post_id
    this.$http.get('wp/v2/posts/' + post_id)
      .then(function (response) {
        this.post = response.data
      }
    )
  },

  methods: {
    savePost () {
      var post_id = this.$route.params.post_id
      this.$http.post('wp/v2/posts/' + post_id, {
        title: this.post.id,
        content: this.post.content.rendered,
      })
        .then(function (success_response) {
          console.log(success_response)
        }, function (error_response) {
          console.log(error_response)
        })
    }
  }
}
</script>
