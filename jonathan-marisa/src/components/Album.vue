<template>
  <div id="albums">
    <dashboard :cover-title="title" :background="background"/>
    <v-container grid-list-md>
      <v-layout row>
        <v-toolbar color="transparent" flat>
          <v-spacer></v-spacer>
          <v-btn color="primary">Add Photos</v-btn>
          <v-btn color="success">New Album</v-btn>
        </v-toolbar>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 sm6 offset-sm0 md4>
          <photo :url="'/static/media/img/bg2.jpg'">
            <v-layout media column slot="card-media">
              <v-spacer></v-spacer>
              <v-card-title class="headline white--text">All Photos</v-card-title>
            </v-layout>
            <v-layout row slot="card-actions">
              <v-spacer></v-spacer>
              <v-btn outline color="pink accent-1" :to="'/photos/'">View Album</v-btn>
            </v-layout>
          </photo>
        </v-flex>
        <v-flex xs10 offset-xs1 sm6 offset-sm0 md4 v-for="album in albums" :key="album.id">
          <photo :url="getThumbnail(album)">
            <v-layout media column slot="card-media">
              <v-spacer></v-spacer>
              <v-card-title class="headline white--text">{{album.title}}</v-card-title>
            </v-layout>

            <v-layout row slot="card-actions">
              <v-spacer></v-spacer>
              <v-btn outline color="pink accent-1" :to="'/album/'+album.id">View Album</v-btn>
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

  let axios = require('axios')

  export default {
    name: "album",
    data() {
      return {
        title: "Photo Albums",
        background: {
          backgroundImage: 'url(/static/media/img/bg2.jpg)',
          height: window.innerHeight +'px'
        },
        albums: []
      }
    },
    components: {
      Dashboard,
      Photo
    },
    beforeRouteEnter (to, from, next) {
      axios.get('/api/album/')
        .then(response => {
          response.data.forEach(doc =>{
            const data = {
              'id': doc.pk,
              'title': doc.title,
              'photos': doc.photos
            }
            next(vm =>{
              vm.albums.push(data)
            })
          })
        })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData(){
        this.$http.get('/api/album/')
          .then(response => {
            response.data.forEach(doc =>{
              const data = {
                'id': doc.pk,
                'title': doc.title,
                'photos': doc.photos
              }
              this.albums.push(data)
            })
          })
      },
      getThumbnail(album) {
        if(album.photos[0]){
          const photo = album.photos[0]
          return photo.thumbnail
        }else{
          return null
        }
      }
    }
  }
</script>

<style scoped>
</style>
