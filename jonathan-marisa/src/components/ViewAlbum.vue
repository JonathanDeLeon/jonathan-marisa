<template>
  <div id="album">
    <dashboard :cover-title="album.title" :background="background"/>
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
        <v-btn color="success" v-if="$user.authenticated" @click.stop="editAlbum">Edit Album</v-btn>
      </v-toolbar>
    </v-layout>
    <h2 v-if="album.photos.length == 0" class="text-xs-center display-4">Album is empty</h2>
    <v-container fluid grid-list-md v-if="gridToggle == 1">
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 sm6 offset-sm0 md12 v-for="photo in album.photos" :key="photo.id">
          <list-photos :url="photo.thumbnail" height="860px">
            <v-layout column slot="card-media" class="card-overlay">
              <v-spacer></v-spacer>
                <v-card-text class="headline white--text"><p class="text-xs-center">{{photo.description}}</p></v-card-text>
              <v-spacer></v-spacer>
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
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 sm6 offset-sm0 md4 v-for="(photo, imageIndex) in album.photos" :key="photo.id"
                @click="galleryIndex = imageIndex">
          <list-photos :url="photo.thumbnail.replace(/v[0-9]*/,'f_auto/h_520,c_scale/dpr_2.0')" height="320px">
            <v-layout column slot="card-media" class="card-overlay">
              <v-spacer></v-spacer>
                <v-card-text class="headline white--text"><p class="text-xs-center">{{photo.description}}</p></v-card-text>
              <v-spacer></v-spacer>
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
        album: {
          title: "Album",
          photos: [],
        },
        images: [],
        galleryIndex: null
      }
    },
    created() {
      this.$http.get('/api/album/' + this.id + '/')
        .then(response => {
          if (response.data) {
            this.album = response.data;
            this.images = this.album.photos.map(photo => photo.thumbnail);
            this.background.backgroundImage = this.album.cover ? 'url(' + this.album.cover + ')' : 'url(/static/media/img/bg2.jpg)';
          }
        })
    },
    methods: {
      editAlbum() {
        modalUtil.showModal('album-create-edit', this.album)
          .then(data => {
            if (data) {
              this.album = data;
              this.background.backgroundImage = this.album.cover ? 'url(' + this.album.cover + ')' : 'url(/static/media/img/bg2.jpg)';
            }
          })
      },
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
              let index = this.album.photos.indexOf(photo);
              if (data.delete) {
                this.album.photos.splice(index, 1);
              } else {
                this.album.photos.splice(index, 1, data);
              }
            }

          });
      },
      addPhotos() {
        modalUtil.showModal('album-add-photos', {id: this.id, title: this.title})
          .then(data => {
            if (data) {
              this.album.photos = data.photos;
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
