<template>
  <div id="home">
    <dashboard :cover-title="title" :background="background"></dashboard>
    <our-story/>
    <v-parallax :height="$vuetify.breakpoint.mdAndUp ? 300 : 200"
                src="https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_600/b_rgb:4f4c4c,o_85/parallax.jpg">
      <v-layout column align-center justify-center>
        <h2 class="display-header text-xs-center white--text">How He Asked</h2>
      </v-layout>
    </v-parallax>
    <proposal/>
    <h3 class="display-header text-xs-center">Proposal Video</h3>
    <youtube embed="zr__nuPTYtI"></youtube>
    <h3 class="display-header text-xs-center">Our Favorites</h3>
    <v-container grid-list-md>
      <v-layout justify-center row wrap>
        <v-flex xs6 md4 v-for="photo in photos" :key="photo.id">
          <list-photos :url="photo.thumbnail.replace(/v[0-9]*/,'f_auto/h_320,c_scale/dpr_2.0')"
                       :height="$vuetify.breakpoint.mdAndUp ? '320px' : $vuetify.breakpoint.smOnly ? '250px' : '180px'">
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
    <h3 class="display-header text-xs-center">Wedding Date</h3>
    <h3 class="display-header text-xs-center">Countdown</h3>
  </div>
</template>

<script>
  import ourStory from './ourStory'
  import proposal from './proposal'

  export default {
    components: {ourStory, proposal},
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
