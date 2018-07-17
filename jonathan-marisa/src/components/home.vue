<template>
  <div id="home">
    <!--<dashboard :background="background">-->
      <!--<countdown end="June 23, 2019"></countdown>-->
    <!--</dashboard>-->
    <v-parallax :height="background.height" :src="background.backgroundImage">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
            <countdown end="June 23, 2019"></countdown>
          </v-flex>
        </v-layout>
      </v-container>
    </v-parallax>
    <our-story/>
    <v-parallax :height="$vuetify.breakpoint.mdAndUp ? 300 : 200"
                src="https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/MarandJonEngagedEdits-176.jpg">
      <!--src="https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_crop,h_800,w_1200,x_200,y_200/MarandJonEngagedEdits-176.jpg">-->
      <!--src="https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_600/b_rgb:4f4c4c,o_85/parallax.jpg">-->
      <v-layout column align-center justify-center>
        <h2 class="display-header text-xs-center white--text">How He Asked</h2>
      </v-layout>
    </v-parallax>
    <proposal/>
    <h3 class="display-header text-xs-center">Proposal Video</h3>
    <youtube embed="zr__nuPTYtI"></youtube>
    <v-container>
      <v-layout wrap>
        <v-flex xs12>
          <h3 class="display-header text-xs-center my-3">Our Favorites</h3>
          <p class="subheading text-xs-center mb-2">from the past five years...</p>
        </v-flex>
      </v-layout>
    </v-container>
    <list-photos :photos="photos" class-obj="xs6 md4"
                 :height="$vuetify.breakpoint.mdAndUp ? '320px' : $vuetify.breakpoint.smOnly ? '250px' : '180px'"></list-photos>
    <v-container>
      <v-layout justify-center class="text-xs-center">
        <v-flex xs6>
          <v-layout column>
            <v-flex>
              <i class="fas fa-lg fa-long-arrow-alt-down mb-3"></i>
            </v-flex>
            <v-flex>
              <v-btn light outline color="pink lighten-4" to="/album">View Albums</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import ourStory from './ourStory'
  import proposal from './proposal'
  import countdown from './countdown'

  import loadingUtil from '@/_common/loading.util'

  export default {
    components: {ourStory, proposal, countdown},
    data() {
      return {
        title: "Marisa & Jonathan",
        background: {
          backgroundImage: 'https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_520/dpr_2.0/MarandJonEngagedEdits-94.jpg',
          height: window.innerHeight
        },
        photos: [],
      }
    },
    created() {
      loadingUtil.show();
      this.$http.get('/api/images/?favorite=True')
        .then(response => {
          if (response.data) {
            this.photos = response.data;
          }
        })
        .then(() => window.setTimeout(() => loadingUtil.hide(), 1000));
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
    }
  }
</script>

<style>
  .v-parallax::after {
    -webkit-transition: all 100ms ease-out;
    -moz-transition: all 100ms ease-out;
    -ms-transition: all 100ms ease-out;
    -o-transition: all 100ms ease-out;
    transition: all 100ms ease-out;
    content: " ";
    display: block;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.18);
  }
</style>
