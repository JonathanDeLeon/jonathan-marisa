<template>
  <div id="home">
    <dashboard :cover-title="title" :background="background"></dashboard>
    <h2 class="display-header text-xs-center">Proposal Video</h2>
    <youtube embed="zr__nuPTYtI"></youtube>
    <h2 class="display-header text-xs-center">Our Favorites</h2>
    <v-container grid-list-sm>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 sm6 offset-sm0 md4 v-for="photo in photos" :key="photo.id">
          <list-photos :url="photo.thumbnail.replace(/v[0-9]*/,'f_auto/h_320,c_scale/dpr_2.0')" height="320px">
            <v-card-actions class="white" slot="card-actions" v-if="$user.authenticated">
              <v-layout row>
                <v-btn icon v-on:click="favoritePhoto(photo)">
                  <span v-if="photo.favorite"><i class="fas fa-heart"></i></span>
                  <span v-show="!photo.favorite"><i class="far fa-heart"></i></span>
                </v-btn>
              </v-layout>
            </v-card-actions>
          </list-photos>
        </v-flex>
      </v-layout>
    </v-container>
    <h2 class="display-header text-xs-center">Wedding Date</h2>
    <h2 class="display-header text-xs-center">Countdown</h2>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "Marisa & Jonathan",
        background: {
          backgroundImage: 'url(https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_520/dpr_2.0/bg3.jpg)',
          height: window.innerHeight + 'px'
        },
        photos: [],
      }
    },
    created() {
      this.$http.get('/api/images/?favorite=True')
        .then(response => {
          if (response.data) {
            this.photos = response.data;
          }
        })

    },
    methods: {
      favoritePhoto(photo) {
        const isFavorite = !photo.favorite

        this.$http.patch('/api/images/' + photo.id + '/', {
          favorite: isFavorite,
        })
          .then(response => {
            photo.favorite = isFavorite
          })
      },
    }
  }
</script>

<style>

</style>
