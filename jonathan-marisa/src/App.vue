<template>
  <v-app id="app">
    <loader></loader>
    <navbar/>
    <router-view></router-view>
    <modal-renderer></modal-renderer>
    <footer-view/>
  </v-app>
</template>

<script>
  import navbar from './components/navbar'
  import footerView from './components/footer'

  export default {
    components: {navbar, footerView}
  }
</script>

<style>
  @font-face {
    font-family: "Bombshell Pro";
    src: local("Bombshell Pro"),
    url("/static/fonts/Bombshell_Pro.woff") format('woff');
  }

  body, html {
    background: #fafafa;
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
    color: #ffbcd4;

  }

  h2.display-header {
    font-size: 4.0em;
  }

  h3.display-header {
    font-size: 2.5em;
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
  .bombshell {
    font-family: "Bombshell Pro", "proxima-nova", "Lato", "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  }
</style>

