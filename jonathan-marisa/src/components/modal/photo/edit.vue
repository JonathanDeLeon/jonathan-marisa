<template>
  <v-dialog :value="dialog" @input="close" scrollable max-width="500" v-if="$user.authenticated">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Photo</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row>
            <img :src="photo.thumbnail" height="160">
          </v-layout>
          <br/>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Description" v-model="photo.description" multi-line></v-text-field>
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
        <v-btn color="red darken-1" flat @click.native="removePhoto">Remove From Album</v-btn>
        <v-btn color="blue darken-1" flat @click.native="updatePhoto">Update Photo</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
  export default {
    props: ['initialData', 'dialog'],
    data() {
      return {
        albums: [],
        datePickerMenu: false,
        photo: {}
      }
    },
    created() {
      this.$http.get('/api/album/')
        .then(response => {
          response.data.forEach(doc => {
            const data = {
              id: doc.pk,
              title: doc.title,
            }
            this.albums.push(data)
          })
        })
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
        let data = {
          favorite: this.photo.favorite,
          date_created: this.photo.date_created,
        }
        if (this.photo.description.length > 0) {
          data.description = this.photo.description
        }
        data.albums = this.photo.albums
        this.$http.patch('/api/images/' + this.photo.pk + '/', data)
          .then(response => {
            window.location.href = window.location.pathname
          })
      },
      removePhoto() {
        const index = this.photo.albums.indexOf(this.id)
        if (index > -1) {
          this.photo.albums.splice(index, 1)
          const data = {
            albums: this.photo.albums
          }
          this.$http.patch('/api/images/' + this.photo.pk + '/', data)
            .then(response => {
              window.location.href = window.location.pathname
            })
        }
      },
      close() {
        this.$emit('close');
      }
    }
  }
</script>

<style scoped>

</style>
