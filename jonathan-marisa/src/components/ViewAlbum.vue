<template>
  <div id="album">
    <dashboard :cover-title="title" :background="background"/>
    <v-container grid-list-md>
      <v-layout row>
        <v-toolbar color="transparent" flat>
          <v-btn outline light color="grey darken-2" to="/album">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.stop="addPhotoDialog = true">Add Photos</v-btn>
          <v-btn color="success" @click.stop="editAlbumDialog = true">Edit Album</v-btn>
        </v-toolbar>
      </v-layout>
      <h1 v-if="photos.length == 0" class="text-xs-center display-4">Album is empty</h1>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 sm6 offset-sm0 md3 v-for="photo in photos" :key="photo.pk">
          <photo :url="photo.thumbnail" >
            <!--<v-layout media column slot="card-media">-->
              <!--<v-spacer></v-spacer>-->
              <!--<v-card-title class="headline white&#45;&#45;text">{{album.title}}</v-card-title>-->
            <!--</v-layout>-->

            <v-layout row slot="card-actions">
              <v-btn icon v-on:click="favoritePhoto(photo)">
                <span v-if="photo.favorite"><i class="fas fa-heart"></i></span>
                <span v-show="!photo.favorite"><i class="far fa-heart"></i></span>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <i class="fas fa-edit"></i>
              </v-btn>
            </v-layout>
          </photo>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="addPhotoDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Photos</span>
        </v-card-title>
        <v-card-text>
          <v-form enctype="multipart/form-data">
            <input type="file" multiple name="image" @change="filesChange($event.target.name, $event.target.files)" accept="image/*">
          </v-form>
          <!--<v-container grid-list-md>-->
            <!--<v-layout wrap>-->
              <!--<v-flex xs12 sm10>-->
                <!--<input id="file" type="file" name="images" multiple>-->
              <!--</v-flex>-->
            <!--</v-layout>-->
          <!--</v-container>-->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="addPhotoDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="addPhotoDialog = false">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editAlbumDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Album</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="updateAlbum">
            <v-text-field label="Album Name" v-model="title" :rules="albumTitleRules" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="editAlbumDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="editAlbum">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import Dashboard from '@/components/Dashboard'
  import Photo from '@/components/Photo'
  import { upload } from '../assets/file-upload';

  let axios = require('axios')

  export default {
    name: "view-album",
    data() {
      return {
        background: {
          backgroundImage: 'url(/static/media/img/bg2.jpg)',
          height: window.innerHeight +'px'
        },
        id: null,
        title: "Album",
        photos: [],
        addPhotoDialog: false,
        editAlbumDialog: false,
        albumTitleRules: [
          (v) => !!v || 'Album name is required'
        ],
        uploadedImages: [],
      }
    },
    components: {
      Dashboard,
      Photo
    },
    beforeRouteEnter (to, from, next) {
      axios.get('/api/album/'+to.params.album_id+'/')
        .then(response => {
          let data = response.data
          next(vm => {
            vm.id = data.pk
            vm.title = data.title
            vm.photos = data.photos
          })
        })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData(){
        this.$http.get('/api/album/'+this.$route.params.album_id+'/')
          .then(response => {
            response.data.forEach(doc =>{
              this.id = doc.pk
              this.title = doc.title
              this.photos = doc.photos
            })
          })
      },
      save(formData) {
        // upload data to the server
        upload(formData)
          .then(x => {
            this.uploadedImages = this.uploadedImages.concat(x);
            //TODO: add success and error messages per image upload; send an object of image
          })
          // .catch(err => {
          //   this.uploadError = err.response;
          //   this.currentStatus = STATUS_FAILED;
          // });
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        if (!fileList.length) return;

        const formData = new FormData();
        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
            formData.append('date_created', new Date(fileList[x].lastModified).toISOString());
          });
        this.save(formData)
      },
      editAlbum() {
        if (this.$refs.updateAlbum.validate()) {
          // Native form submission is not yet supported
          this.$http.put('/api/album/'+this.id+'/', {
            title: this.title,
          })
            .then(response => {
              this.editAlbumDialog = false
            })
        }
      },
      favoritePhoto(photo){
        const isFavorite = !photo.favorite

        this.$http.patch('/api/images/'+photo.pk+'/set_favorite/', {
          favorite: isFavorite,
        })
          .then(response => {
            photo.favorite = isFavorite
          })
      },
    }
  }

</script>

<style scoped>

</style>
