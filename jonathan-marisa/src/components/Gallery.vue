<template>
  <div id="gallery">
    <dashboard :cover-title="title" :background="background"/>
    <v-container grid-list-md>
      <v-layout row>
        <v-toolbar color="transparent" flat>
          <v-btn outline light color="grey darken-2" to="/album">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.stop="addPhotoDialog = true">Add Photos</v-btn>
          <v-btn color="success">Add Photos to Album</v-btn>
        </v-toolbar>
      </v-layout>
      <v-layout row wrap>

        <v-flex xs10 offset-xs1 sm6 offset-sm0 md3 v-for="photo in photos" :key="photo.id">
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
  </div>
</template>

<script>
  import Dashboard from '@/components/Dashboard'
  import Photo from '@/components/Photo'
  import { upload } from '../assets/file-upload';

  let axios = require('axios')

  export default {
    name: "gallery",
    data() {
      return {
        background: {
          backgroundImage: 'url(/static/media/img/bg.jpg)',
          height: window.innerHeight +'px'
        },
        title: "Gallery",
        photos: [],
        addPhotoDialog: false,
        images: []
      }
    },
    components: {
      Dashboard,
      Photo
    },
    beforeRouteEnter (to, from, next) {
      axios.get('/api/images/')
        .then(response => {
          response.data.forEach(doc =>{
            const data = {
              'id': doc.pk,
              'image': doc.image,
              'thumbnail': doc.thumbnail,
              'description': doc.description,
              'favorite': doc.favorite,
              'date_created': doc.date_created
            }
            next(vm =>{
              vm.photos.push(data)
            })
          })
        })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData(){
        this.$http.get('/api/images/')
          .then(response => {
            response.data.forEach(doc =>{
              const data = {
                'id': doc.pk,
                'image': doc.image,
                'thumbnail': doc.thumbnail,
                'description': doc.description,
                'favorite': doc.favorite,
                'date_created': doc.date_created
              }
              this.photos.push(data)
            })
          })
      },
      save(formData) {
        // upload data to the server
        upload(formData)
        // .then(x => {
        //   this.uploadedFiles = [].concat(x);
        //   this.currentStatus = STATUS_SUCCESS;
        // })
        // .catch(err => {
        //   this.uploadError = err.response;
        //   this.currentStatus = STATUS_FAILED;
        // });
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();

        if (!fileList.length) return;

        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });

        this.save(formData)
      }
    }
  }
</script>

<style scoped>

</style>
