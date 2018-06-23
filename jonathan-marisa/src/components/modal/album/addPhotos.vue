<template>
  <v-dialog scrollable :value="dialog" @input="close" scrollable full-width v-if="$user.authenticated">
    <v-card>
      <v-card-title>
        <span class="headline">Add Photos To {{title}}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap justify-center>
            <img v-for="(image, index) in images" :key="index" class="photos-not-album" height="180" :src="image.thumbnail.replace(/v[0-9]*/,'f_auto/h_120,c_scale/dpr_2.0')" @click="selectImage(image, $event)">
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
  import modalUtil from '@/_common/modal.util';

  export default {
    props: ['initialData', 'dialog'],
    data() {
      return {
        id: null,
        title: '',
        album: {},
        images: [],
        selectedImages: [],
      }
    },
    created() {
      this.id = this.initialData.id;
      this.title = this.initialData.title;
      if (this.id) {
        this.$http.get('/api/images/not_in/?album_id=' + this.id)
          .then(response => {
            response.data.forEach(doc => {
              this.images.push(doc);
            })
          })
      }
    },
    methods: {
      selectImage(image, $event) {
        $event.target.classList.toggle('selected')
        let index = this.selectedImages.indexOf(image.id);
        if (index >= 0) {
          this.selectedImages.splice(index, 1);
        } else {
          this.selectedImages.push(image.id);
        }
      },
      addPhotosToAlbum() {
        this.$http.patch('/api/album/' + this.id + '/add_images/', this.selectedImages)
          .then(response => {
            modalUtil.hideModal(response.data)
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
