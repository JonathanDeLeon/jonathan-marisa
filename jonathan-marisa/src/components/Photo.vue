<template>
  <div id="photo">
    <v-card flat tile>
      <v-card-media v-if="url" :src="url" height="240px"></v-card-media>
      <v-card-title v-else primary-title>
        <div>
          <div class="headline">Image does not exist</div>
        </div>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "photo",
    props: ['url'],
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>
