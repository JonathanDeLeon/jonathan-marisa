<template>
  <div class="photo">
    <v-card tile>
      <v-card-media :src="url" :height="height">
        <slot name="card-media"></slot>
      </v-card-media>
      <slot name="card-actions"></slot>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "photo",
    props: ['url', 'height'],
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style>
  .photo .card__media__content .card__title {
    background: linear-gradient(transparent, rgba(0, 0, 0, .7));
  }
</style>
