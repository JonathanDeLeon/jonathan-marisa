<template>
  <div id="gallery">
    <dashboard :cover-title="title" :background="background"/>
    <v-container grid-list-md>
      <v-layout row>
        <v-toolbar color="transparent" flat>
          <v-btn outline light color="grey darken-2" to="/album">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" v-if="user.authenticated" @click.stop="addPhotoDialog = true">Upload Photos</v-btn>
        </v-toolbar>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs10 offset-xs1 sm6 offset-sm0 md4 v-for="photo in photos" :key="photo.id">
          <photo :url="photo.thumbnail" height="360px">
            <v-layout row slot="card-actions" v-if="user.authenticated">
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

    <v-dialog v-model="addPhotoDialog" scrollable full-width v-if="user.authenticated">
      <v-card>
        <v-card-title>
          <span class="headline">Upload Photos</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="addPhoto" enctype="multipart/form-data">
              <v-layout row>
                <input type="file" multiple name="image" @change="loadImage" accept="image/*">
              </v-layout>
              <v-layout row wrap justify-center ref="images">
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="addPhotoDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="filesChange">Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editPhotoDialog" scrollable max-width="500" v-if="user.authenticated">
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
          <v-btn color="red darken-1" flat @click.native="editPhotoDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="updatePhoto">Update Photo</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import Photo from '@/components/Photo'
  import { upload } from '../assets/file-upload';
  import auth from '../auth'

  export default {
    name: "gallery",
    components: {
      Photo
    },
    data() {
      return {
        user: auth.user,
        background: {
          backgroundImage: 'url(/static/media/img/bg.jpg)',
          height: window.innerHeight +'px'
        },
        title: "Gallery",
        photos: [],
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
    created() {
      this.$http.get('/api/images/')
        .then(response => {
          response.data.forEach(doc =>{
            const data = {
              'id': doc.pk,
              'image': doc.image,
              'thumbnail': doc.thumbnail,
              'description': doc.description,
              'favorite': doc.favorite,
              'date_created': doc.date_created,
              'albums': doc.albums,
            }
            this.photos.push(data)
          })
        })
    },
    methods: {
      save(formData) {
        // upload data to the server
        upload(formData)
          .then(x => {
            this.addPhotoDialog = false
            window.location.href = window.location.pathname
            //TODO: add success and error messages
          })
      },
      filesChange() {
        let input = this.$refs.addPhoto.$el.querySelector('input')
        if(input) {
          const fieldName = input.name
          const fileList = input.files
          // handle file changes
          if (!fileList.length) return;

          const formData = new FormData();
          // append the files to FormData
          Array
            .from(Array(fileList.length).keys())
            .map(x => {
              formData.append(fieldName, fileList[x], fileList[x].name);
            });
          this.save(formData)
        }else{
          alert("Input not valid. Error occured")
        }
      },
      clearChildrenByElement(element) {
        if(element){
          while(element.firstChild){
            element.removeChild(element.firstChild)
          }
        }
      },
      loadImage(event) {
        this.clearChildrenByElement(this.$refs.images)
        if (event && event.target.files) {
          Array.from(event.target.files)
            .forEach(img => {
              let imgTag = document.createElement("img")
              let reader = new FileReader()
              imgTag.height = '180'
              reader.onload = e => {
                imgTag.src = e.target.result
                this.$refs.images.appendChild(imgTag)
              }
              reader.readAsDataURL(img)
            })
        }
      },
      favoritePhoto(photo){
        const isFavorite = !photo.favorite

        this.$http.patch('/api/images/'+photo.id+'/', {
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
        this.$http.patch('/api/images/'+this.photoTemp.id+'/', data)
          .then(response => {
            window.location.href = window.location.pathname
          })
      },
    }
  }
</script>

<style scoped>

</style>
