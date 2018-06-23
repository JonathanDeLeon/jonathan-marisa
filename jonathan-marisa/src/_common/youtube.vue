<template>
  <v-layout row>
    <v-flex xs10 offset-xs1>
      <div class="youtube-player" :data-id="embed">
        <div v-if="!loadVideo" :data-id="embed" @click="embedYoutube">
          <img :src="'https://i.ytimg.com/vi/'+embed+'/maxresdefault.jpg'">
          <div class="play"></div>
        </div>
        <iframe v-else :src="'https://www.youtube.com/embed/'+embed+'?autoplay=1&showinfo=1&rel=0'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  /* Light YouTube Embeds by @labnol */
  /* Web: http://labnol.org/?p=27941 */
  // https://webdesign.tutsplus.com/tutorials/how-to-lazy-load-embedded-youtube-videos--cms-26743

  export default {
    props: ['embed'],
    data() {
      return {
        loadVideo: false,
      }
    },
    methods: {
      embedYoutube() {
        this.loadVideo = true;
      }
    }
  }
</script>

<style>
  .youtube-player {
    position: relative;
    padding-bottom: 56.25%;
    /* Use 75% for 4:3 videos */
    height: 0;
    overflow: hidden;
    max-width: 100%;
    background: #000;
  }

  .youtube-player iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: transparent;
  }

  .youtube-player img {
    bottom: 0;
    display: block;
    left: 0;
    margin: auto;
    max-width: 100%;
    width: 100%;
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    height: auto;
    cursor: pointer;
    -webkit-transition: .4s all;
    -moz-transition: .4s all;
    transition: .4s all;
  }

  .youtube-player img:hover {
    -webkit-filter: brightness(75%);
  }

  .youtube-player .play {
    height: 72px;
    width: 72px;
    left: 50%;
    top: 50%;
    margin-left: -36px;
    margin-top: -36px;
    position: absolute;
    background: url("//i.imgur.com/TxzC70f.png") no-repeat;
    cursor: pointer;
  }
</style>
