<template>
  <v-dialog :value="dialog" @input="close" scrollable full-width v-if="$user.authenticated">
    <v-card>
      <v-card-title>
        <span class="headline">Add Photos To {{album.title}}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap justify-center ref="images">
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" flat @click.native="close">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="addPhotosToAlbum">Add Photos</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['initialData', 'dialog'],
    data() {
      return {
        album: {},
        images: []
      }
    },
    created() {
      if (this.id) {
        this.$http.get('/api/images/not_in/?album_id=' + this.id)
          .then(response => {
            response.data.forEach(doc => {
              let imgTag = document.createElement("img")
              imgTag.height = '180'
              imgTag.id = doc.pk
              imgTag.className = "photos-not-album"
              imgTag.src = doc.thumbnail
              imgTag.addEventListener("click", event => {
                event.target.classList.toggle('selected')
              })
              this.$refs.images.appendChild(imgTag)
            })
            this.addPhotoDialog = true
          })
      }
    },
    methods: {
      addPhotosToAlbum() {
        const selected = document.getElementsByClassName("photos-not-album selected");
        let images = []
        Array.from(selected)
          .forEach(el => {
            images.push(el.id)
          })
        const data = {
          images: images
        }
        this.$http.patch('/api/album/' + this.id + '/add_images/', data)
          .then(response => {
            window.location.href = window.location.pathname
          })
      },
      close() {
        this.$emit('close');
      }
    }
  }
</script>

<style scoped>

</style>
