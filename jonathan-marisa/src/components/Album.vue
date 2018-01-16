<template>
  <div id="albums">
    <dashboard :cover-title="title" :background="background"/>
    <v-container grid-list-md>
      <v-layout row>
        <v-toolbar color="transparent" flat v-if="user.authenticated">
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.stop="addPhotoDialog = true">Upload Photos</v-btn>
          <v-btn color="success" @click.stop="addAlbumDialog = true">New Album</v-btn>
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
              <v-btn outline color="pink accent-1" :to="'/album/photos'">View Album</v-btn>
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
              <v-btn icon v-if="user.authenticated" @click.stop="updateAlbumObj.title = album.title; updateAlbumObj.id = album.id; editAlbumDialog = true">
                <i class="fas fa-edit"></i>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn outline color="pink accent-1" :to="'/album/'+album.id">View Album</v-btn>
            </v-layout>
          </photo>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="addAlbumDialog" persistent max-width="500px" v-if="user.authenticated">
      <v-card>
        <v-card-title>
          <span class="headline">New Album</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="addAlbum">
            <v-text-field label="Album Name" v-model="newAlbumTitle" :rules="albumTitleRules" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="addAlbumDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="newAlbum">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editAlbumDialog" persistent max-width="500px" v-if="user.authenticated">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Album</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="updateAlbum">
            <v-text-field label="Album Name" v-model="updateAlbumObj.title" :rules="albumTitleRules" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" flat @click.native="editAlbumDialog = false">Close</v-btn>
          <v-btn color="red darken-1" flat @click="deleteAlbum">Delete</v-btn>
          <v-btn color="blue darken-1" flat @click="editAlbum">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addPhotoDialog" persistent scrollable full-width v-if="user.authenticated">
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
  </div>
</template>

<script>
  import Dashboard from '@/components/Dashboard'
  import Photo from '@/components/Photo'
  import { upload } from '../assets/file-upload'
  import auth from '../auth'

  export default {
    name: "album",
    data() {
      return {
        user: auth.user,
        title: "Photo Albums",
        background: {
          backgroundImage: 'url(/static/media/img/bg2.jpg)',
          height: window.innerHeight +'px'
        },
        newAlbumTitle: '',
        updateAlbumObj: {
          title: '',
          id: ''
        },
        albumTitleRules: [
          (v) => !!v || 'Album name is required'
        ],
        albums: [],
        addPhotoDialog: false,
        addAlbumDialog: false,
        editAlbumDialog: false,
      }
    },
    components: {
      Dashboard,
      Photo
    },
    created () {
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
    methods: {
      getThumbnail(album) {
        if(album.photos[0]){
          const photo = album.photos[0]
          return photo.thumbnail
        }else{
          return '/static/media/img/image-not-found.png'
        }
      },
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
      newAlbum() {
        if (this.$refs.addAlbum.validate()) {
          // Native form submission is not yet supported
          this.$http.post('/api/album/', {
            title: this.newAlbumTitle,
          })
            .then(response => {
              this.addAlbumDialog = false
              window.location.href = window.location.pathname
            })
        }
      },
      editAlbum() {
        if (this.$refs.updateAlbum.validate()) {
          // Native form submission is not yet supported
          this.$http.put('/api/album/'+this.updateAlbumObj.id+'/', {
            title: this.updateAlbumObj.title,
          })
            .then(response => {
              this.editAlbumDialog = false
              window.location.href = window.location.pathname
            })
        }
      },
      deleteAlbum() {
        if(confirm("Are you sure you want to delete album?")) {
          this.$http.delete('/api/album/' + this.updateAlbumObj.id + '/')
            .then(response => {
              this.editAlbumDialog = false
              window.location.href = window.location.pathname
            })
        }
      }
    }
  }
</script>

<style scoped>
</style>
