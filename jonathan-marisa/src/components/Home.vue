<template>
  <div id="home">
    <dashboard :cover-title="title" :background="background"></dashboard>
    <v-layout row>
      <v-flex xs12>
        <div class="youtube-player" data-id="0f4x5WNUw9I"></div>
      </v-flex>
    </v-layout>
    <h2 class="display-header text-xs-center">Our Favorites</h2>
    <v-container grid-list-sm>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1 sm6 offset-sm0 md4 v-for="photo in photos" :key="photo.id">
          <list-photos :url="photo.image" height="320px">
            <v-card-actions class="white" slot="card-actions" v-if="$user.authenticated">
              <v-layout row>
                <v-btn icon v-on:click="favoritePhoto(photo)">
                  <span v-if="photo.favorite"><i class="fas fa-heart"></i></span>
                  <span v-show="!photo.favorite"><i class="far fa-heart"></i></span>
                </v-btn>
              </v-layout>
            </v-card-actions>
          </list-photos>
        </v-flex>
      </v-layout>
    </v-container>
    <h2 class="display-header text-xs-center">Wedding Date</h2>
    <h2 class="display-header text-xs-center">Countdown</h2>
  </div>
</template>

<script>

  /* Light YouTube Embeds by @labnol */
  /* Web: http://labnol.org/?p=27941 */

  document.addEventListener("DOMContentLoaded",
    function () {
      var div, n,
        v = document.getElementsByClassName("youtube-player");
      for (n = 0; n < v.length; n++) {
        div = document.createElement("div");
        div.setAttribute("data-id", v[n].dataset.id);
        div.innerHTML = labnolThumb(v[n].dataset.id);
        div.onclick = labnolIframe;
        v[n].appendChild(div);
      }
    });

  function labnolThumb(id) {
    var thumb = '<img src="https://i.ytimg.com/vi/ID/maxresdefault.jpg">',
      play = '<div class="play"></div>';
    return thumb.replace("ID", id) + play;
  }

  function labnolIframe() {
    var iframe = document.createElement("iframe");
    var embed = "https://www.youtube.com/embed/ID?autoplay=1";
    iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "1");
    this.parentNode.replaceChild(iframe, this);
  }

  export default {
    name: "home",
    data() {
      return {
        title: "Marisa & Jonathan",
        background: {
          backgroundImage: 'url(/static/media/img/bg3.jpg)',
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

  h2.display-header {
    font-family: "Bombshell Pro", "proxima-nova", "Lato", "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    letter-spacing: 4px;
    text-align: center;
    font-size: 70px;
    font-size: 4.5vw;
    font-weight: 400;
    word-wrap: break-word;
    color: rgba(0, 0, 0, .54);
  }
</style>
