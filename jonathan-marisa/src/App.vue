<template>
  <v-app id="app">
    <Navbar/>
    <router-view></router-view>
    <modal-renderer></modal-renderer>
  </v-app>
</template>

<script>
  import Navbar from './components/Navbar'

  export default {
    name: 'app',
    components: {
      Navbar
    }
  }
</script>

<style>
  @font-face {
    font-family: "Bombshell Pro";
    src: url("/static/fonts/Bombshell_Pro.woff") format('woff');
  }
  #app {
    font-family: 'Libre Baskerville', serif;
  }
</style>

