<template>
  <div id="dashboard">
    <div id="collection-cover" :style="background">
      <div class="cover-detail">
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center>
                <h1 v-if="coverTitle" class="cover-collection-name">{{coverTitle}}</h1>
                <slot></slot>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "dashboard",
    props: ['background', 'coverTitle', 'initResize'],
    data() {
      return {
        resize: this.initResize === undefined ? true : this.initResize
      }
    },
    methods: {
      onResize() {
        if (this.resize) {
          this.background.height = window.innerHeight + 'px'
        }
      }
    }
  }
</script>

<style scoped>
  #collection-cover {
    background: #FFF;
    background-image: none;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
  #dashboard.parallax #collection-cover {
    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  #collection-cover::after {
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

  #collection-cover .cover-detail {
    height: 100%;
    position: relative;
    width: 100%;
    text-align: center;
    color: #fff;
    z-index: 2;
  }

  #collection-cover .cover-detail h1.cover-collection-name {
    font-family: "Bombshell Pro", "proxima-nova", "Lato", "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    letter-spacing: 4px;
    line-height: 1.125em;
    text-align: center;
    font-size: 4.5em;
    /*word-wrap: break-word;*/
    font-weight: 400;
  }

  .cover-detail .container {
    overflow: hidden;
  }
  @media screen and (max-device-width: 1024px){
  }

  @media (max-width: 600px) {
    #collection-cover .cover-detail h1.cover-collection-name {
      font-size: 3.6em;
    }

  }

</style>
