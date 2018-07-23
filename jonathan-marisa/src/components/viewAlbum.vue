<template>
  <div id="album">
    <dashboard :cover-title="album.title" :background="background"/>
    <gallery :images="galleryImages" :index="galleryIndex" @close="galleryIndex = null"
             @onslideend="getGalleryPhotos"></gallery>

    <v-layout row>
      <v-toolbar color="transparent" flat>
        <v-btn outline light color="grey darken-2" to="/album">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn-toggle v-model="gridToggle">
          <v-btn flat>
            <v-icon>fas fa-th</v-icon>
          </v-btn>
          <v-btn flat>
            <v-icon>fas fa-bars</v-icon>
          </v-btn>
        </v-btn-toggle>
        <v-btn color="primary" v-if="$user.authenticated" @click.stop="addPhotos">Add Photos To Album</v-btn>
        <v-btn color="success" v-if="$user.authenticated" @click.stop="editAlbum">Edit Album</v-btn>
      </v-toolbar>
    </v-layout>

    <h2 v-if="photos.length == 0" class="text-xs-center display-4 bombshell my-5">Album is empty</h2>

    <list-photos :photos="photos" :class-obj="gridToggle ? 'xs12' : 'xs6 md4'" :fluid="gridToggle"
                 @gallery="(index) => {galleryIndex = index}"
                 :height="$vuetify.breakpoint.mdAndUp ? '320px' : $vuetify.breakpoint.smOnly ? '280px' : '180px'"></list-photos>

    <div id="loading" ref="loading">
      <v-container>
        <v-layout justify-center row v-if="this.observeState.loading">
          <v-flex xs6>
            <heart-animation v-if="this.observeState.loading" class="text-xs-center"></heart-animation>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <v-container v-if="!this.observeState.loading">
      <v-layout justify-center class="text-xs-center">
        <v-flex xs6>
          <v-layout column>
            <v-flex>
              <i class="fas fa-lg fa-long-arrow-alt-down mb-3"></i>
            </v-flex>
            <v-flex>
              <v-btn light outline color="pink lighten-4" v-if="id != 6" :to="'/album/'+nextId">View Next Album</v-btn>
              <v-btn light outline color="pink lighten-4" v-else to="/album">View Albums</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
  import modalUtil from "../_common/modal.util";
  import loadingUtil from "../_common/loading.util";

  import VueGallery from 'vue-gallery';
  import heartAnimation from '@/_common/heartAnimation'

  export default {
    components: {
      'gallery': VueGallery,
      heartAnimation,
    },
    props: ['id'],
    data() {
      return {
        background: {
          backgroundImage: 'url(https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_10/dpr_2.0/bg2.jpg)',
          height: window.innerHeight + 'px'
        },
        gridToggle: this.$vuetify.breakpoint.mdAndUp ? 0 : 1,
        album: {
          title: "Album",
        },
        photos: [],
        galleryImages: [],
        galleryIndex: null,
        observer: null,
        observeState: {
          nextPage: '',
          loading: false,
          prevY: 0
        }
      }
    },
    computed: {
      nextId: function () {
        let next = parseInt(this.id, 10) + 1;
        return next;
      }
    },
    created() {
      loadingUtil.show();
      this.$http.get('/api/album/' + this.id + '/')
        .then(response => {
          if (response.data) {
            this.album = response.data;
            this.background.backgroundImage = this.album.cover ? 'url(' + this.album.cover.replace(/v[0-9]*/, 'f_auto/h_520,c_scale/dpr_2.0') + ')' : 'url(https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_520/dpr_2.0/bg2.jpg)';
          }
        });
      this.$http.get('/api/images/?albums=' + this.id)
        .then(response => {
          if (response.headers && response.headers.link) {
            let links = this.parse_link_header(response.headers.link);
            this.observeState.nextPage = links.next || '';
          }
          if (response.data) {
            this.photos = response.data;
            if (this.$vuetify.breakpoint.mdAndUp) {
              this.galleryImages = this.photos.map(photo => photo.thumbnail.replace(/v[0-9]*/, 'f_auto/h_720,c_scale/dpr_2.0'));
            } else {
              this.galleryImages = this.photos.map(photo => photo.thumbnail.replace(/v[0-9]*/, 'f_auto/h_320,c_scale/dpr_2.0'));
            }
          }
        })
        .then(() => window.setTimeout(() => loadingUtil.hide(), 1000));

    },
    mounted() {
      // Options
      var options = {
        root: null, // Page as root
        rootMargin: '0px',
        threshold: 0.1
      };
      // Create an observer
      this.observer = new IntersectionObserver(
        this.handleObserver.bind(this), //callback
        options
      );
      //Observe the `loadingRef`
      this.observer.observe(this.$refs.loading);
    },
    beforeDestroy() {
      this.observer.disconnect();
    },
    methods: {
      parse_link_header(header) {
        if (header.length === 0) {
          throw new Error("input must not be of zero length");
        }

        // Split parts by comma
        var parts = header.split(',');
        var links = {};
        // Parse each part into a named link
        for (var i = 0; i < parts.length; i++) {
          var section = parts[i].split(';');
          if (section.length !== 2) {
            throw new Error("section could not be split on ';'");
          }
          var url = section[0].replace(/<(.*)>/, '$1').trim();
          var name = section[1].replace(/rel="(.*)"/, '$1').trim();
          links[name] = url;
        }
        return links;
      },
      handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.observeState.prevY > y) {
          this.getPhotos();
        }
        this.observeState.prevY = y;
      },
      getPhotos() {
        if (!this.loading && this.observeState.nextPage) {
          this.observeState.loading = true;
          this.$http.get(this.observeState.nextPage)
            .then(response => {
              if (response.data) {
                this.photos = this.photos.concat(response.data);
                if (this.$vuetify.breakpoint.mdAndUp) {
                  this.galleryImages = this.photos.map(photo => photo.thumbnail.replace(/v[0-9]*/, 'f_auto/h_720,c_scale/dpr_2.0'));
                } else {
                  this.galleryImages = this.photos.map(photo => photo.thumbnail.replace(/v[0-9]*/, 'f_auto/h_320,c_scale/dpr_2.0'));
                }
                if (response.headers && response.headers.link) {
                  let links = this.parse_link_header(response.headers.link);
                  this.observeState.nextPage = links.next || '';
                }
                this.observeState.loading = false;
              }
            })
        } else if (!this.loading && this.photos.length > 0) {
          this.observer.disconnect();
          this.$refs.loading.remove();
        }
      },
      getGalleryPhotos(args) {
        // Vue-Gallery library doesn't support blue-imp gallery API calls to add slides
        // if (this.observeState.nextPage && args.index == this.galleryImages.length - 2) {
        //   this.getPhotos()
        // }
      },
      editAlbum() {
        modalUtil.showModal('album-create-edit', this.album)
          .then(data => {
            if (data) {
              this.album = data;
              this.background.backgroundImage = this.album.cover ? 'url(' + this.album.cover.replace(/v[0-9]*/, 'f_auto/h_520,c_scale/dpr_2.0') + ')' : 'url(https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_520/dpr_2.0/bg2.jpg)';
            }
          })
      },
      addPhotos() {
        modalUtil.showModal('album-add-photos', {id: this.id, title: this.album.title})
          .then(data => {
            if (data) {
              this.photos = data.photos;
            }
          });
      }
    }
  }

</script>

<style>
  .photos-not-album {
    margin: 0.5rem
  }

  .photos-not-album.selected {
    background: linear-gradient(transparent, rgba(0, 0, 0, .7));
    box-shadow: 0px 12px 22px 1px #333;
  }

  #loading {
    height: 100px;
    margin: 30px;
  }

</style>
