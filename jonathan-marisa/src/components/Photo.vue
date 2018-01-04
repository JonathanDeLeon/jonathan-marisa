<template>
  <div class="photo">
    <v-card tile>
      <v-card-media :src="url" height="240px">
        <slot name="card-media"></slot>
      </v-card-media>
      <v-card-actions class="white">
        <slot name="card-actions"></slot>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "photo",
    props: ['url'],
    data() {
      return {}
    },
    methods: {
    }
  }
</script>

<style>
  .photo .card__media__content .card__title{
    background: linear-gradient(transparent, rgba(0, 0, 0, .7));
  }
</style>
