<template>
  <div class="photo">
    <!--<v-card tile>-->
    <!--<v-flex xs12 d-block>-->
    <!--<img :src="url">-->
    <!--</v-flex>-->
    <!--<v-card-media :src="url" :height="height">-->
    <!--<slot name="card-media"></slot>-->
    <!--</v-card-media>-->
    <!--<slot name="card-actions"></slot>-->
    <!--</v-card>-->
    <v-container grid-list-md>
      <v-layout justify-center row wrap>
        <v-flex :class="classObj" v-for="(photo, index) in photos" :key="index">
          <v-card tile>
            <v-card-media :src="photo.thumbnail.replace(/v[0-9]*/,'f_auto/h_320,c_scale/dpr_2.0')" :height="height">
              <v-layout column class="card-overlay">
                <v-spacer></v-spacer>
                <v-card-text class="headline white--text"><p class="text-xs-center">{{photo.description}}</p>
                </v-card-text>
                <v-spacer></v-spacer>
              </v-layout>
            </v-card-media>
            <v-card-actions class="white" v-if="$user.authenticated">
              <v-layout row>
                <v-btn icon v-on:click="favoritePhoto(photo)">
                  <span v-if="photo.favorite"><i class="fas fa-heart"></i></span>
                  <span v-show="!photo.favorite"><i class="far fa-heart"></i></span>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon v-on:click="editPhoto(photo)">
                  <i class="fas fa-edit"></i>
                </v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  // https://github.com/matheusgrieger/vue-clazy-load
  // https://alligator.io/vuejs/vue-lazy-load-images/
  // https://jmperezperez.com/more-progressive-image-loading/
  import VueClazyLoad from '@/plugins/clazy-load/index.js'

  import modalUtil from "@/_common/modal.util";

  export default {
    props: ['photos', 'height', 'classObj', 'fluid'],
    components: {VueClazyLoad},
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      favoritePhoto(photo) {
        const isFavorite = !photo.favorite

        this.$http.patch('/api/images/' + photo.id + '/', {
          favorite: isFavorite,
        })
          .then(response => {
            photo.favorite = isFavorite
          })
      },
      editPhoto(photo) {
        modalUtil.showModal('edit-photo', photo)
          .then(data => {
            if (data) {
              let index = this.photos.indexOf(photo);
              if (data.delete) {
                this.photos.splice(index, 1);
              } else {
                this.photos.splice(index, 1, data);
              }
            }
          });
      },
    }
  }
</script>

<style>

  .photo .v-card__media__content .v-card__title {
    background: linear-gradient(transparent, rgba(0, 0, 0, .7));
  }

  .photo .v-card__media:hover .card-overlay {
    filter: alpha(opacity=100);
    opacity: 1;
    zoom: 1;
  }

  .photo .v-card__media__content .card-overlay {
    /*background: rgba(0, 0, 0, 0.2);*/
    background: linear-gradient(transparent, rgba(0, 0, 0, .7));
    opacity: 0;
    -webkit-transition: all 250ms ease-in-out;
    -moz-transition: all 250ms ease-in-out;
    -ms-transition: all 250ms ease-in-out;
    -o-transition: all 250ms ease-in-out;
    transition: all 250ms ease-in-out;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .photo .v-card__media__content .headline {
    text-transform: lowercase;
  }

  .photo img {
    max-width: 100%;
    height: auto;
    display: block;
  }
</style>
