<template>
  <v-dialog :value="dialog" @input="close" scrollable full-width v-if="$user.authenticated">
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
        <v-btn color="red darken-1" flat @click.native="close">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="filesChange">Upload</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import modalUtil from '@/_common/modal.util';
  import loadingUtil from '@/_common/loading.util';
  import {upload} from '@/assets/file-upload'

  export default {
    props: ['initialData', 'dialog'],
    data() {
      return {
        isEdit: false,
        album: {},
      }
    },
    created() {
      loadingUtil.show({modal: true});
      this.isEdit = !!this.initialData
      if (this.isEdit) {
        let temp = {};
        Object.assign(temp, this.initialData);
        this.album = temp;
      }
      loadingUtil.hide();
    },
    methods: {
      save(formData) {
        // upload data to the server
        upload(this, formData)
          .then(x => {
            modalUtil.hideModal(null);
          })
          .then(() => loadingUtil.hide());
      },
      filesChange() {
        let input = this.$refs.addPhoto.$el.querySelector('input')
        if (input) {
          loadingUtil.show({modal: true});
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
        } else {
          alert("Input not valid. Error occured")
        }
      },
      clearChildrenByElement(element) {
        if (element) {
          while (element.firstChild) {
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
      close() {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>

</style>
