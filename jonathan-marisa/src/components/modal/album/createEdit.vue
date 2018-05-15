<template>
  <v-dialog :value="dialog" @input="close" max-width="500px" v-if="$user.authenticated">
    <v-card>
      <v-card-title>
        <span class="headline">{{ isEdit ? 'Edit' : 'Create'}} Album</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="albumForm">
          <v-text-field label="Album Name" v-model="album.title" required></v-text-field>
          <v-text-field label="Priority" v-model="album.priority" required></v-text-field>
        </v-form>
        <v-layout column v-if="album.photos">
          <div class="title">Cover Photo</div>
          <v-layout row >
            <v-radio-group row v-model="album.cover" :mandatory="false">
              <v-flex xs10 offset-xs1 sm6 offset-sm0 md3 v-for="photo in album.photos" :key="photo.pk">
                <list-photos :url="photo.thumbnail" height="160px">
                  <v-card-actions class="white" slot="card-actions">
                    <v-layout row>
                      <v-radio :value="photo.thumbnail"></v-radio>
                    </v-layout>
                  </v-card-actions>
                </list-photos>
              </v-flex>
            </v-radio-group>
          </v-layout>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black darken-1" flat @click="close">Close</v-btn>
        <v-btn v-if="isEdit" color="red darken-1" flat @click="deleteAlbum">Delete</v-btn>
        <v-btn v-if="isEdit" color="blue darken-1" flat @click="submitSetup">Update</v-btn>
        <v-btn v-else color="blue darken-1" flat @click="submitSetup">Save</v-btn>
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
        isEdit: false,
        album: {},
      }
    },
    created() {
      this.isEdit = !!this.initialData
      if (this.isEdit) {
        let temp = {};
        Object.assign(temp, this.initialData);
        this.album = temp;
        console.log(temp)
      }
    },
    methods: {
      submitSetup() {
        if (this.$refs.albumForm.validate()) {
          if (this.isEdit) {
            let temp = {};
            Object.assign(temp, this.album);
            delete temp.photos;
            this.$http.put('/api/album/' + this.album.id + '/', temp)
              .then(response => {
                if (response.data) {
                  modalUtil.hideModal(response.data)
                }
              })
              .catch(err => console.log(err))
          } else {
            this.$http.post('/api/album/', this.album)
              .then(response => {
                if (response.data) {
                  modalUtil.hideModal(response.data)
                }
              })
          }
        }
      },
      deleteAlbum() {
        if (this.isEdit && confirm("Are you sure you want to delete album?")) {
          this.$http.delete('/api/album/' + this.album.id + '/')
            .then(response => {
              modalUtil.hideModal({delete: true})
            })
        }
      },
      close() {
        this.$emit('close')
      }
    }

  }
</script>

<style scoped>

</style>
