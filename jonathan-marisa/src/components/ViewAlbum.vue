<template>
  <div id="album">
    <dashboard :cover-title="title" :background="background"/>
    <v-container grid-list-md>
      <v-layout row>
        <v-toolbar color="transparent" flat>
          <v-btn outline light color="grey darken-2" to="/album">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.stop="getPhotosNotInAlbum">Add Photos To Album</v-btn>
        </v-toolbar>
      </v-layout>
      <h1 v-if="photos.length == 0" class="text-xs-center display-4">Album is empty</h1>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 sm6 offset-sm0 md3 v-for="photo in photos" :key="photo.pk">
          <photo :url="photo.thumbnail">
            <v-layout row slot="card-actions">
              <v-btn icon v-on:click="favoritePhoto(photo)">
                <span v-if="photo.favorite"><i class="fas fa-heart"></i></span>
                <span v-show="!photo.favorite"><i class="far fa-heart"></i></span>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon v-on:click="editPhoto(photo)">
                <i class="fas fa-edit"></i>
              </v-btn>
            </v-layout>
          </photo>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="addPhotoDialog" persistent scrollable full-width>
      <v-card>
        <v-card-title>
          <span class="headline">Add Photos To {{title}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap justify-center ref="images">
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="addPhotoDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="addPhotosToAlbum">Add Photos</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editPhotoDialog" persistent scrollable max-width="500">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Photo</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row>
              <img :src="photoTemp.thumbnail" height="160">
            </v-layout>
            <br/>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Description" v-model="photoTemp.description" multi-line></v-text-field>
              </v-flex>
              <v-flex xs12 sm7>
                <v-menu :close-on-content-click="true" v-model="datePickerMenu" transition="scale-transition">
                  <v-text-field
                    slot="activator"
                    label="Date in Y-M-D format"
                    v-model="photoTemp.date_created"
                    prepend-icon="event"
                  ></v-text-field>
                  <v-date-picker v-model="photoTemp.date_created" @input="photoTemp.date_created = formatDate($event)" no-title ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm4>
                <v-checkbox v-model="photoTemp.favorite" label="Favorite"></v-checkbox>
              </v-flex>
              <v-flex xs12 sm10>
                <v-select label="Albums" multiple v-model="photoTemp.albums" :items="minimalAlbumList" item-text="title" item-value="id"></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" flat @click.native="editPhotoDialog = false">Close</v-btn>
          <v-btn color="red darken-1" flat @click.native="removePhoto">Remove From Album</v-btn>
          <v-btn color="blue darken-1" flat @click.native="updatePhoto">Update Photo</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import Dashboard from '@/components/Dashboard'
  import Photo from '@/components/Photo'

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
        photosNotInAlbum: [],
        minimalAlbumList: [],
        photoTemp: {
          id: '',
          thumbnail: '',
          description: '',
          date_created: '',
          favorite: '',
          albums: []
        },
        addPhotoDialog: false,
        editPhotoDialog: false,
        datePickerMenu: false,
      }
    },
    components: {
      Dashboard,
      Photo
    },
    beforeRouteUpdate (to, from, next) {
      this.$http.get('/api/album/'+to.params.album_id+'/')
        .then(response => {
          const data = response.data
          this.id = data.pk
          this.title = data.title
          this.photos = data.photos
        })
      next()
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
    methods: {
      save(formData) {
        upload(formData)
          .then(x => {
            this.addPhotoDialog = false
            //TODO: add success and error messages
          })
      },
      clearChildrenByElement(element) {
        if(element){
          while(element.firstChild){
            element.removeChild(element.firstChild)
          }
        }
      },
      favoritePhoto(photo){
        const isFavorite = !photo.favorite

        this.$http.patch('/api/images/'+photo.pk+'/', {
          favorite: isFavorite,
        })
          .then(response => {
            photo.favorite = isFavorite
          })
      },
      editPhoto(photo){
        if(this.minimalAlbumList.length <= 0) {
          this.getListOfAlbums()
        }
        this.photoTemp = photo
        this.editPhotoDialog = true
      },
      getPhotosNotInAlbum(){
        this.clearChildrenByElement(this.$refs.images)
        if(this.id){
          this.$http.get('/api/images/not_in/?album_id='+this.id)
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
      getListOfAlbums(){
        this.$http.get('/api/album/minimal_list/')
          .then(response => {
            response.data.forEach(doc => {
              const data = {
                id: doc.pk,
                title: doc.title,
              }
              this.minimalAlbumList.push(data)
            })
          })
      },
      formatDate (date) {
        if (!date) {
          return null
        }
        const [year, month, day] = date.split('-')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      updatePhoto(){
        let data = {
          favorite: this.photoTemp.favorite,
          date_created: this.photoTemp.date_created,
        }
        if(this.photoTemp.description.length > 0){
          data.description = this.photoTemp.description
        }
        data.albums = this.photoTemp.albums
        this.$http.patch('/api/images/'+this.photoTemp.pk+'/', data)
          .then(response => {
            window.location.href = window.location.pathname
          })
      },
      removePhoto(){
        const index = this.photoTemp.albums.indexOf(this.id)
        if(index > -1){
          this.photoTemp.albums.splice(index, 1)
          const data = {
            albums: this.photoTemp.albums
          }
          this.$http.patch('/api/images/'+this.photoTemp.pk+'/', data)
            .then(response => {
              window.location.href = window.location.pathname
            })
        }
      },
      addPhotosToAlbum(){
        const selected = document.getElementsByClassName("photos-not-album selected");
        let images = []
        Array.from(selected)
          .forEach(el => {
            images.push(el.id)
          })
        const data = {
          images: images
        }
        this.$http.patch('/api/album/'+this.id+'/add_images/', data)
          .then(response => {
            window.location.href = window.location.pathname
          })
      }
    }
  }

</script>

<style>
  .photos-not-album{
    margin: 0.5rem
  }
  .photos-not-album.selected{
    background: linear-gradient(transparent, rgba(0, 0, 0, .7));
    box-shadow:0px 12px 22px 1px #333;
  }

</style>
