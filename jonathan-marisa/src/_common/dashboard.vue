<template>
  <div id="dashboard">
    <div id="collection-cover" v-resize="onResize" :style="background">
      <div class="cover-detail">
        <h1 class="cover-collection-name">{{coverTitle}}</h1>
        <slot></slot>
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
        if (this.resize || parseInt(this.background.height) > window.innerHeight) {
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
    background-repeat: repeat;
    background-position-x: 0%;
    background-position-y: 0%;
    background-size: auto auto;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }

  #collection-cover::before {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 300px;
    width: 100%;
    content: " ";
    display: block;
    background: -moz-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0) 2%, rgba(0, 0, 0, 0.08) 28%, rgba(0, 0, 0, 0.5) 75%, rgba(0, 0, 0, 0.7) 100%);
    background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0) 2%, rgba(0, 0, 0, 0.08) 28%, rgba(0, 0, 0, 0.5) 75%, rgba(0, 0, 0, 0.7) 100%);
    background: -o-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0) 2%, rgba(0, 0, 0, 0.08) 28%, rgba(0, 0, 0, 0.5) 75%, rgba(0, 0, 0, 0.7) 100%);
    background: -ms-linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0) 2%, rgba(0, 0, 0, 0.08) 28%, rgba(0, 0, 0, 0.5) 75%, rgba(0, 0, 0, 0.7) 100%);
    -webkit-transition: all 100ms ease-out;
    -moz-transition: all 100ms ease-out;
    -ms-transition: all 100ms ease-out;
    -o-transition: all 100ms ease-out;
    transition: all 100ms ease-out;
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
    width: 100%;
    text-align: center;
    color: #fff;
    position: absolute;
    top: 50%;
    z-index: 2;
    -ms-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  #collection-cover .cover-detail h1.cover-collection-name {
    font-family: "Bombshell Pro", "proxima-nova", "Lato", "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    letter-spacing: 4px;
    line-height: 1.125em;
    text-align: center;
    font-size: 80px;
    font-size: 5em;
    width: 80%;
    display: inline-block;
    /*word-wrap: break-word;*/
    font-weight: 400;
  }

</style>
