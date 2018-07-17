<template>
  <v-dialog scrollable :value="dialog" @input="close" max-width="500px" v-if="$user.authenticated">
    <v-card>
      <v-card-title>
        <span class="headline">{{ isEdit ? 'Edit' : 'Create'}} Album</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="albumForm">
          <v-text-field label="Album Name" v-model="album.title" required></v-text-field>
          <v-text-field label="Priority" v-model="album.priority" required></v-text-field>
        </v-form>
        <v-container fluid grid-list-md v-if="album.photos">
          <div class="title">Cover Photo</div>
          <v-layout row>
            <v-radio-group row v-model="album.cover" :mandatory="false">
              <v-layout row wrap>
              <v-flex xs10 offset-xs1 sm6 offset-sm0 md3 v-for="photo in album.photos" :key="photo.id">
                <list-album :url="photo.thumbnail.replace(/v[0-9]*/,'f_auto/h_120,c_scale/dpr_2.0')" height="160px">
                  <v-card-actions class="white" slot="card-actions">
                    <v-layout row>
                      <v-radio :value="photo.thumbnail"></v-radio>
                    </v-layout>
                  </v-card-actions>
                </list-album>
              </v-flex>
              </v-layout>
            </v-radio-group>
          </v-layout>
        </v-container>
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
  import loadingUtil from '@/_common/loading.util';

  import listAlbum from "@/components/listAlbum"

  export default {
    props: ['initialData', 'dialog'],
    components: {listAlbum},
    data() {
      return {
        isEdit: false,
        album: {},
      }
    },
    created() {
      loadingUtil.show({modal: true});
      this.isEdit = !!this.initialData;
      if (this.isEdit) {
        let temp = {};
        Object.assign(temp, this.initialData);
        this.album = temp;
      }
      loadingUtil.hide();
    },
    methods: {
      submitSetup() {
        if (this.$refs.albumForm.validate()) {
          loadingUtil.show({modal: true});
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
              .then(() => loadingUtil.hide());
          } else {
            this.$http.post('/api/album/', this.album)
              .then(response => {
                if (response.data) {
                  modalUtil.hideModal(response.data)
                }
              })
              .then(() => loadingUtil.hide());
          }
        }
      },
      deleteAlbum() {
        if (this.isEdit && confirm("Are you sure you want to delete album?")) {
          loadingUtil.show({modal: true});
          this.$http.delete('/api/album/' + this.album.id + '/')
            .then(response => {
              modalUtil.hideModal({delete: true})
            })
            .then(() => loadingUtil.hide());
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
