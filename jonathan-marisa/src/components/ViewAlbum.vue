<template>
  <div id="album">
    <dashboard :cover-title="title" :background="background"/>
    <v-layout row>
      <v-toolbar color="transparent" flat>
        <v-btn outline light color="grey darken-2" to="/album">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn-toggle v-model="gridToggle">
          <v-btn flat>
            <v-icon>fas fa-th</v-icon>
          </v-btn>
          <v-btn flat>
            <v-icon>fas fa-bars</v-icon>
          </v-btn>
        </v-btn-toggle>
        <v-btn color="primary" v-if="$user.authenticated" @click.stop="addPhotos">Add Photos To Album</v-btn>
      </v-toolbar>
    </v-layout>
    <v-container fluid grid-list-md v-if="gridToggle == 1">
      <h2 v-if="photos.length == 0" class="text-xs-center display-4">Album is empty</h2>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 sm6 offset-sm0 md12 v-for="photo in photos" :key="photo.pk">
          <photo :url="photo.image" height="860px">
            <v-card-actions class="white" slot="card-actions" v-if="$user.authenticated">
              <v-layout row>
                <v-btn icon v-on:click="favoritePhoto(photo)">
                  <span v-if="photo.favorite"><i class="fas fa-heart"></i></span>
                  <span v-show="!photo.favorite"><i class="far fa-heart"></i></span>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon v-on:click="editPhoto(photo)">
                  <i class="fas fa-edit"></i>
                </v-btn>
              </v-layout>
            </v-card-actions>
          </photo>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-md v-else>
      <h2 v-if="photos.length == 0" class="text-xs-center display-4">Album is empty</h2>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 sm6 offset-sm0 md4 v-for="photo in photos" :key="photo.pk">
          <photo :url="photo.thumbnail" height="320px">
            <v-card-actions class="white" slot="card-actions" v-if="$user.authenticated">
              <v-layout row>
                <v-btn icon v-on:click="favoritePhoto(photo)">
                  <span v-if="photo.favorite"><i class="fas fa-heart"></i></span>
                  <span v-show="!photo.favorite"><i class="far fa-heart"></i></span>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon v-on:click="editPhoto(photo)">
                  <i class="fas fa-edit"></i>
                </v-btn>
              </v-layout>
            </v-card-actions>
          </photo>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import Photo from '@/components/Photo'
  import modalUtil from "../_common/modal.util";

  let axios = require('axios')

  export default {
    name: "view-album",
    components: {
      Photo
    },
    data() {
      return {
        background: {
          backgroundImage: 'url(/static/media/img/bg2.jpg)',
          height: window.innerHeight + 'px'
        },
        gridToggle: 0,
        id: null,
        title: "Album",
        photos: [],
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.$http.get('/api/album/' + to.params.album_id + '/')
        .then(response => {
          const data = response.data
          this.id = data.pk
          this.title = data.title
          this.photos = data.photos
        })
      next()
    },
    beforeRouteEnter(to, from, next) {
      axios.get('/api/album/' + to.params.album_id + '/')
        .then(response => {
          let data = response.data
          next(vm => {
            vm.id = data.pk
            vm.title = data.title
            vm.photos = data.photos
          })
        })
    },
    methods: {
      favoritePhoto(photo) {
        const isFavorite = !photo.favorite

        this.$http.patch('/api/images/' + photo.pk + '/', {
          favorite: isFavorite,
        })
          .then(response => {
            photo.favorite = isFavorite
          })
      },
      editPhoto(photo) {
        modalUtil.showModal('edit-photo', photo);
      },
      addPhotos() {
        modalUtil.showModal('album-add-photos', null);
      }
    }
  }

</script>

<style>
  .photos-not-album {
    margin: 0.5rem
  }

  .photos-not-album.selected {
    background: linear-gradient(transparent, rgba(0, 0, 0, .7));
    box-shadow: 0px 12px 22px 1px #333;
  }

</style>
