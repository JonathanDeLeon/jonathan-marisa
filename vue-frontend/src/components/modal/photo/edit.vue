<template>
  <v-dialog :value="dialog" @input="close" scrollable max-width="500" v-if="$user.authenticated">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Photo</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row>
            <img :src="photo.thumbnail.replace(/v[0-9]*/,'f_auto/h_120,c_scale/dpr_2.0')" height="160">
          </v-layout>
          <br/>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Title" v-model="photo.description"></v-text-field>
            </v-flex>
            <v-flex xs12 sm7>
              <v-menu :close-on-content-click="true" v-model="datePickerMenu" transition="scale-transition">
                <v-text-field
                  slot="activator"
                  label="Date in Y-M-D format"
                  v-model="photo.date_created"
                  prepend-icon="event"
                ></v-text-field>
                <v-date-picker v-model="photo.date_created" @input="photo.date_created = formatDate($event)"
                               no-title></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm4>
              <v-checkbox v-model="photo.favorite" label="Favorite"></v-checkbox>
            </v-flex>
            <v-flex xs12 sm10>
              <v-select label="Albums" multiple v-model="photo.albums" :items="albums" item-text="title"
                        item-value="id"></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black darken-1" flat @click.native="close">Close</v-btn>
        <v-btn color="red darken-1" flat @click.native="removePhoto">Delete Photo</v-btn>
        <v-btn color="blue darken-1" flat @click.native="updatePhoto">Update Photo</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
  import modalUtil from '@/_common/modal.util';
  import loadingUtil from '@/_common/loading.util';

  export default {
    props: ['initialData', 'dialog'],
    data() {
      return {
        photo: {},
        albums: [],
        datePickerMenu: false,
      }
    },
    created() {
      loadingUtil.show({modal: true});
      if (!!this.initialData) {
        let temp = {};
        Object.assign(temp, this.initialData);
        this.photo = temp;
      }
      this.$http.get('/api/album/')
        .then(response => {
          response.data.forEach(doc => {
            const data = {
              id: doc.id,
              title: doc.title,
            }
            this.albums.push(data)
          })
        })
        .then(() => loadingUtil.hide());
    },
    methods: {
      formatDate(date) {
        if (!date) {
          return null
        }
        const [year, month, day] = date.split('-')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      updatePhoto() {
        loadingUtil.show({modal: true});
        let temp = {};
        Object.assign(temp, this.photo);
        delete temp.image;
        delete temp.thumbnail;
        this.$http.patch('/api/images/' + this.photo.id + '/', temp)
          .then(response => {
            if (response.data) {
              modalUtil.hideModal(response.data)
            }
          })
          .then(() => loadingUtil.hide());
      },
      removePhoto() {
        loadingUtil.show({modal: true});
        this.$http.delete('/api/images/' + this.photo.id + '/')
          .then(response => {
            modalUtil.hideModal({delete: true})
          })
          .then(() => loadingUtil.hide());
      },
      close() {
        this.$emit('close');
      }
    }
  }
</script>

<style scoped>

</style>
