<template>
  <v-fade-transition>
    <v-app id="app">
      <loader></loader>
      <navbar/>
      <router-view :key="$route.fullPath"></router-view>
      <modal-renderer></modal-renderer>
      <footer-view/>
      <v-fade-transition>
        <v-btn fab bottom right color="pink lighten-4" :small="$vuetify.breakpoint.xs" dark fixed
               v-scroll="onScroll"
               v-show="fab"
               @click="toTop">
          <i class="fas fa-lg fa-angle-up"></i>
        </v-btn>
      </v-fade-transition>
    </v-app>
  </v-fade-transition>
</template>

<script>
  import navbar from './components/navbar'
  import footerView from './components/footer'

  export default {
    components: {navbar, footerView},
    data() {
      return {
        fab: false
      }
    },
    methods: {
      onScroll() {
        if (typeof window === 'undefined') return;
        const top = window.pageYOffset ||
          document.documentElement.offsetTop ||
          0;
        this.fab = top > 300
      },
      toTop() {
        this.$router.push({hash: ''})
        this.$vuetify.goTo(0)
      }
    }
  }
</script>

<style>
  /*
  Current Color Scheme
  #DCC8B4 // soft amber
  #f6f4f2
  #FFBCD4 // pink
  #F8BBD0 // pink lighten-4
  #FFFFFF
  #F5F5F5
  */

  @font-face {
    font-family: "Bombshell Pro";
    src: local("Bombshell Pro"),
    url("/static/fonts/Bombshell_Pro.woff") format('woff');
  }

  body, html {
    /*background: #fafafa;*/
    background: #fff;
  }

  div.theme--light.application {
    background: #fff;
  }
  nav.theme--light.v-toolbar {
    background: #fff;
  }

  #app {
    font-family: 'Libre Baskerville', serif !important;
  }

  .display-header {
    font-family: "Bombshell Pro", "proxima-nova", "Lato", "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    letter-spacing: 4px;
    font-weight: 400;
    /*word-wrap: break-word;*/
    margin: 1.5em 0 0.8em;
    /*color: rgba(0, 0, 0, .54);*/
    /*color: #ffbcd4;*/
    color: #F8BBD0;
  }

  h2.display-header {
    font-size: 4.0em;
  }

  h3.display-header {
    font-size: 2.5em;
  }

  .v-card .headline, .v-card .title {
    font-family: inherit !important;
  }

  @media (max-width: 600px) {
    .display-header {
      margin: 1.0em 0 0.4em;
    }

    h2.display-header {
      font-size: 3.0em;
    }

    h3.display-header {
      font-size: 2.0em;
    }

  }

  .bombshell, h1.bombshell, h2.bombshell {
    font-family: "Bombshell Pro", "proxima-nova", "Lato", "Lucida Sans Unicode", "Lucida Grande", sans-serif !important;
  }
</style>

