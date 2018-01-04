<template>
  <div id="album">
    <dashboard :cover-title="title" :background="background"/>
    <v-container grid-list-md>
      <v-layout row>
        <v-toolbar color="transparent" flat>
          <v-btn outline light color="grey darken-2" to="/album">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.stop="addPhotoDialog = true">Add Photos</v-btn>
          <v-btn color="success">Edit Album</v-btn>
        </v-toolbar>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 sm6 offset-sm0 md3 v-for="photo in photos" :key="photo.pk">
          <photo :url="photo.thumbnail">
            <!--<v-layout media column slot="card-media">-->
              <!--<v-spacer></v-spacer>-->
              <!--<v-card-title class="headline white&#45;&#45;text">{{album.title}}</v-card-title>-->
            <!--</v-layout>-->

            <v-layout row slot="card-actions">
              <v-btn icon>
                <i class="far fa-heart"></i>
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
        uploadedImages: []
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

        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            const formData = new FormData();
            formData.append(fieldName, fileList[x], fileList[x].name);
            formData.append('date_created', new Date(fileList[x].lastModified).toISOString());
            this.save(formData)
          });
      }
    }
  }

</script>

<style scoped>

</style>
