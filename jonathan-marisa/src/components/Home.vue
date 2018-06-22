<template>
  <div id="home">
    <dashboard :cover-title="title" :background="background"></dashboard>
    <youtube embed="0f4x5WNUw9I"></youtube>
    <h2 class="display-header text-xs-center">Our Favorites</h2>
    <v-container grid-list-sm>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 sm6 offset-sm0 md4 v-for="photo in photos" :key="photo.id">
          <list-photos :url="photo.image" height="320px">
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
          backgroundImage: 'url(/static/media/img/bg3.jpg)',
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
  h2.display-header {
    font-family: "Bombshell Pro", "proxima-nova", "Lato", "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    letter-spacing: 4px;
    text-align: center;
    font-size: 70px;
    font-size: 4.5vw;
    font-weight: 400;
    word-wrap: break-word;
    margin: 1.5em 0;
    color: rgba(0, 0, 0, .54);
  }
</style>
