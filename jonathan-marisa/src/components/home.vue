<template>
  <div id="home">
    <dashboard :background="background">
        <countdown end="June 23, 2019"></countdown>
    </dashboard>
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
    <h3 class="display-header text-xs-center">Our Favorites</h3>
    <list-photos :photos="photos" class-obj="xs6 md4"
                 :height="$vuetify.breakpoint.mdAndUp ? '320px' : $vuetify.breakpoint.smOnly ? '250px' : '180px'"></list-photos>
    <h3 class="display-header text-xs-center">Wedding Date</h3>
  </div>
</template>

<script>
  import ourStory from './ourStory'
  import proposal from './proposal'
  import countdown from './countdown'

  export default {
    components: {ourStory, proposal, countdown},
    data() {
      return {
        title: "Marisa & Jonathan",
        background: {
          backgroundImage: 'url(https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_520/dpr_2.0/MarandJonEngagedEdits-94.jpg)',
          height: window.innerHeight + 'px'
        },
        photos: [],
      }
    },
    created() {
      this.$http.get('/api/images/?favorite=True')
        .then(response => {
          if (response.data) {
            this.photos = response.data;
          }
        })

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
</style>
