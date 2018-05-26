<template>
  <div id="album">
    <dashboard :cover-title="title" :background="background"/>
    <!--<gallery :images="images" :index="galleryIndex" @close="galleryIndex = null"></gallery>-->
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
        <v-flex xs10 offset-xs1 sm6 offset-sm0 md12 v-for="photo in photos" :key="photo.id">
          <list-photos :url="photo.image" height="860px">
            <v-layout media column slot="card-media">
              <v-spacer></v-spacer>
              <v-card-title class="headline white--text">{{photo.description}}</v-card-title>
            </v-layout>
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
          </list-photos>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-md v-else>
      <h2 v-if="photos.length == 0" class="text-xs-center display-4">Album is empty</h2>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 sm6 offset-sm0 md4 v-for="(photo, imageIndex) in photos" :key="photo.id"
                @click="galleryIndex = imageIndex">
          <list-photos :url="photo.thumbnail" height="320px">
            <v-layout media column slot="card-media">
              <v-spacer></v-spacer>
              <v-card-title class="headline white--text">{{photo.description}}</v-card-title>
            </v-layout>
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
          </list-photos>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import modalUtil from "../_common/modal.util";
  import VueGallery from 'vue-gallery';

  export default {
    components: {
      'gallery': VueGallery
    },
    props: ['id'],
    data() {
      return {
        background: {
          backgroundImage: 'url(/static/media/img/bg2.jpg)',
          height: window.innerHeight + 'px'
        },
        gridToggle: 0,
        title: "Album",
        photos: [],
        images: [],
        galleryIndex: null
      }
    },
    created() {
      this.$http.get('/api/album/' + this.id + '/')
        .then(response => {
          if (response.data) {
            const data = response.data;
            this.title = data.title;
            this.photos = data.photos;
            this.images = this.photos.map(photo => photo.image);
            this.background.backgroundImage = data.cover ? 'url(' + data.cover + ')' : 'url(/static/media/img/bg2.jpg)';
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
      editPhoto(photo) {
        modalUtil.showModal('edit-photo', photo)
          .then(data => {
            if (data) {
              let index = this.photos.indexOf(photo);
              if (data.delete) {
                this.photos.splice(index, 1);
              } else {
                this.photos.splice(index, 1, data);
              }
            }

          });
      },
      addPhotos() {
        modalUtil.showModal('album-add-photos', {id: this.id, title: this.title})
          .then(data => {
            if (data) {
              this.photos = data.photos;
            }
          });
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
