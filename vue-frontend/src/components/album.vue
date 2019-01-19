<template>
  <div id="albums">
    <v-carousel :height="parseInt(background.height, 10)" hide-controls hide-delimiters interval="8000">
      <v-carousel-item v-for="(slide, index) in slideshow" :key="index" :src="slide">
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center>
              <h2 class="bombshell display-header white--text">{{title}}</h2>
            </v-flex>
          </v-layout>
        </v-container>
      </v-carousel-item>
    </v-carousel>

    <v-layout row>
      <v-toolbar color="transparent" flat v-if="$user.authenticated">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.stop="uploadPhotos">Upload Photos</v-btn>
        <v-btn color="success" @click="createAlbum">New Album</v-btn>
      </v-toolbar>
    </v-layout>

    <v-container grid-list-md my-5>
      <v-layout row wrap>
        <v-flex xs6 md4 v-for="album in albums" :key="album.id">
          <list-album :url="getThumbnail(album)"
                      :height="$vuetify.breakpoint.mdAndUp ? '240px' : $vuetify.breakpoint.smOnly ? '240px' : '140px'">
            <v-layout class="ma-0" media fill-height column slot="card-media" @click="$router.push('/album/'+album.id)">
              <v-spacer></v-spacer>
              <v-card-title class="headline white--text">{{album.title}}</v-card-title>
            </v-layout>
            <v-layout row slot="card-actions" v-if="$user.authenticated">
              <v-btn icon  @click.stop="editAlbum(album)">
                <i class="fas fa-edit"></i>
              </v-btn>
            </v-layout>
          </list-album>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
  import sortUtil from '@/_common/sort.util'
  import loadingUtil from '@/_common/loading.util'
  import modalUtil from "@/_common/modal.util";

  import listAlbum from "@/components/listAlbum"

  export default {
    components: {listAlbum},
    data() {
      return {
        title: "Photo Albums",
        background: {
          height: window.innerHeight + 'px'
        },
        albums: [],
        addPhotoDialog: false,
        slideshow: [
          'https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_520/dpr_2.0/935bc394-6fec-496a-a00e-501b9c5973c9.jpg',
          'https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_520/dpr_2.0/c2953c16-dd80-4c58-9c16-75b60cd78d97.jpg',
          'https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_520/dpr_2.0/6eb8f065-4485-4c10-8a03-bbe73367c3dc.jpg',
          'https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_520/dpr_2.0/f3976120-1f27-4dd6-bd86-c8f8bea05f81.jpg',
          'https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_520/dpr_2.0/3f781ded-c8d3-4f8c-9a31-7dd28e90f79f.jpg',
          'https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_720/dpr_2.0/MarandJonEngagedEdits-86.jpg',
          'https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_520/dpr_2.0/MarandJonEngagedEdits-97.jpg',
          'https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_520/dpr_2.0/MarandJonEngagedEdits-46.jpg',
          'https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_520/dpr_2.0/MarandJonEngagedEdits-141.jpg',
          'https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_520/dpr_2.0/MarandJonEngagedEdits-165.jpg',
        ]
      }
    },
    created() {
      loadingUtil.show();
      this.responsiveImage();
      this.$http.get('/api/album/')
        .then(response => {
          response.data.forEach(doc => {
            this.albums.push(doc)
          })
        })
        .then(() => window.setTimeout(() => loadingUtil.hide(), 1000));
    },
    mounted() {

    },
    methods: {
      responsiveImage() {
        let height = (() => {
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return ['250', '500px']
            case 'sm': return ['400', '800px']
            case 'md': return ['520', window.innerHeight+'px']
            case 'lg': return ['520', window.innerHeight+'px']
            case 'xl': return ['520', window.innerHeight+'px']
          }
        }).call(this);
        this.slideshow.forEach((slide, index) => {
          this.slideshow.splice(index, 1, slide.replace(/h_[0-9]*/, 'h_'+height[0]));
        })
        this.background.height = height[1]
      },
      getThumbnail(album) {
        return album.cover ? album.cover.replace(/v[0-9]*/, 'f_auto/h_320,c_scale/dpr_2.0') : 'https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_220/image-not-found.png';
      },
      createAlbum() {
        modalUtil.showModal('album-create-edit', null)
          .then(data => {
            if (data) {
              this.albums.push(data);
              this.albums = sortUtil.sort(this.albums, 'priority', false)
            }
          })

      },
      editAlbum(album) {
        modalUtil.showModal('album-create-edit', album)
          .then(data => {
            if (data) {
              let index = this.albums.indexOf(album);
              if (data.delete) {
                this.albums.splice(index, 1);
              } else {
                this.albums.splice(index, 1, data);
                this.albums = sortUtil.sort(this.albums, 'priority', false)
              }
            }
          })
      },
      uploadPhotos() {
        modalUtil.showModal('upload-photos', null);
      },
    }
  }
</script>

<style>

  #albums .v-image__image--cover::after {
    -webkit-transition: all 100ms ease-out;
    -moz-transition: all 100ms ease-out;
    -ms-transition: all 100ms ease-out;
    -o-transition: all 100ms ease-out;
    transition: all 100ms ease-out;
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.18);

  }
</style>
