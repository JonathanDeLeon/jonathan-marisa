<template>
  <div id="album">
    <dashboard :cover-title="title" :background="background"/>
    <v-container grid-list-sm>
      <v-layout row wrap>
        <v-flex xs3 v-for="album in albums" :key="album.id">
          <photo :url="getThumbnail(album)"/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import Dashboard from '@/components/Dashboard'
  import Photo from '@/components/Photo'

  export default {
    name: "album",
    data() {
      return {
        title: "Photo Albums",
        background: {
          backgroundImage: 'url(/static/media/img/bg2.jpg)',
          height: window.innerHeight +'px'
        },
        src: "test",
        albums: []
      }
    },
    components: {
      Dashboard,
      Photo
    },
    created() {
      this.$http.get('/api/album/')
      .then(response => {
        response.data.forEach(doc =>{
          const data = {
            'id': doc.pk,
            'title': doc.title,
            'description': doc.description,
            'photos': doc.photos
          }
          this.albums.push(data)
        })
      })
    },
    methods: {
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
