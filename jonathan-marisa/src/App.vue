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
    src: local("Bombshell Pro"),
    url("/static/fonts/Bombshell_Pro.woff") format('woff');
  }

  #app {
    font-family: 'Libre Baskerville', serif;
  }
  .display-header {
    font-family: "Bombshell Pro", "proxima-nova", "Lato", "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    letter-spacing: 4px;
    text-align: center;
    font-weight: 400;
    /*word-wrap: break-word;*/
    margin: 1.5em 0 0.8em;
    color: rgba(0, 0, 0, .54);
    /*color: #FADEE6;*/

  }
  h2.display-header {
    font-size: 70px;
    font-size: 4.3em;
  }
  h3.display-header {
    font-size: 40px;
    font-size: 2.5em;
  }
</style>

