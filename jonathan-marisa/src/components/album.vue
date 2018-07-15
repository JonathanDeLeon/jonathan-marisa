<template>
  <div id="albums">
    <dashboard :cover-title="title" :background="background"/>
    <v-layout row>
      <v-toolbar color="transparent" flat v-if="$user.authenticated">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.stop="uploadPhotos">Upload Photos</v-btn>
        <v-btn color="success" @click="createAlbum">New Album</v-btn>
      </v-toolbar>
    </v-layout>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 sm6 offset-sm0 md4 v-if="$user.authenticated">
          <list-album url="https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_520/dpr_2.0/bg2.jpg" height="240px">
            <v-layout media column slot="card-media">
              <v-spacer></v-spacer>
              <v-card-title class="headline white--text">All Photos</v-card-title>
            </v-layout>
            <v-layout row slot="card-actions">
              <v-spacer></v-spacer>
              <v-btn outline color="pink accent-1" :to="'/album/photos'">View Album</v-btn>
            </v-layout>
          </list-album>
        </v-flex>
        <v-flex xs10 offset-xs1 sm6 offset-sm0 md4 v-for="album in albums" :key="album.id">
          <list-album :url="getThumbnail(album)" height="240px">
            <v-layout media column slot="card-media">
              <v-spacer></v-spacer>
              <v-card-title class="headline white--text">{{album.title}}</v-card-title>
            </v-layout>
            <v-layout row slot="card-actions">
              <v-btn icon v-if="$user.authenticated" @click.stop="editAlbum(album)">
                <i class="fas fa-edit"></i>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn outline color="pink accent-1" :to="'/album/'+album.id">View Album</v-btn>
            </v-layout>
          </list-album>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import sortUtil from '@/_common/sort.util'
  import modalUtil from "@/_common/modal.util";

  import listAlbum from "@/components/listAlbum"

  export default {
    components: {listAlbum},
    data() {
      return {
        title: "Photo Albums",
        background: {
          backgroundImage: 'url(https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_520/dpr_2.0/MarandJonEngagedEdits-132.jpg)',
          height: window.innerHeight + 'px'
        },
        albums: [],
        addPhotoDialog: false,
      }
    },
    created() {
      this.$http.get('/api/album/')
        .then(response => {
          response.data.forEach(doc => {
            this.albums.push(doc)
          })
        })
    },
    methods: {
      getThumbnail(album) {
        return album.cover.replace(/v[0-9]*/,'f_auto/h_320,c_scale/dpr_2.0') || 'https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_220/image-not-found.png';
      },
      createAlbum() {
        modalUtil.showModal('album-create-edit', null)
          .then(data => {
            if (data) {
              this.albums.push(data);
              this.albums = sortUtil.sort(this.albums, 'priority', false)
            }
          })

      },
      editAlbum(album) {
        modalUtil.showModal('album-create-edit', album)
          .then(data => {
            if (data) {
              let index = this.albums.indexOf(album);
              if (data.delete) {
                this.albums.splice(index, 1);
              } else {
                this.albums.splice(index, 1, data);
                this.albums = sortUtil.sort(this.albums, 'priority', false)
              }
            }
          })
      },
      uploadPhotos() {
        modalUtil.showModal('upload-photos', null);

      }
    }
  }
</script>

<style scoped>
</style>
