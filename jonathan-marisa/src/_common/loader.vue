<template>
  <div id="preloader" v-if="display">
    <div class="alignment">
      <div class="v-align center-middle">
        <div class="heart-animation one">
          <i class="fas fa-heart pink--text text--lighten-3"></i>
        </div>
        <div class="heart-animation two">
          <i class="fas fa-heart pink--text text--lighten-3"></i>
        </div>
        <div class="heart-animation three">
          <i class="fas fa-heart pink--text text--lighten-3"></i>
        </div>
        <div class="heart-animation four">
          <i class="fas fa-heart pink--text text--lighten-3"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import loadingUtil from './loading.util'

  export default {
    data() {
      return {
        display: false,
      }
    },
    created() {
      loadingUtil.registerLoader(this);
    },
    beforeDestroy() {
      loadingUtil.unregister();
    },
    methods: {
      show() {
        this.display = true;
      },
      hide() {
        this.display = false;
      },
    }
  }
</script>

<style>
  #preloader {
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }

  @-webkit-keyframes heart-zoom {
    0%, 100% {
      -webkit-transform: scale(0.5);
      opacity: 0.2;
    }
    50% {
      -webkit-transform: scale(1.3);
      opacity: 1;
    }
  }

  @-moz-keyframes heart-zoom {
    0%, 100% {
      -moz-transform: scale(0.5);
      opacity: 0.2;
    }
    50% {
      -moz-transform: scale(1.3);
      opacity: 1;
    }
  }

  @-ms-keyframes heart-zoom {
    0%, 100% {
      -ms-transform: scale(0.5);
      opacity: 0.2;
    }
    50% {
      -ms-transform: scale(1.3);
      opacity: 1;
    }
  }

  @-o-keyframes heart-zoom {
    0%, 100% {
      -o-transform: scale(0.5);
      opacity: 0.2;
    }
    50% {
      -o-transform: scale(1.3);
      opacity: 1;
    }
  }

  @keyframes heart-zoom {
    0%, 100% {
      transform: scale(0.5);
      opacity: 0.2;
    }
    50% {
      transform: scale(1.3);
      opacity: 1;
    }
  }

  .alignment {
    position: absolute;
    display: table;
    height: 100%;
    width: 100%;
  }

  .v-align {
    display: table-cell;
  }

  .center-middle {
    vertical-align: middle;
    text-align: center;
  }

  .heart-animation {
    display: inline-block;
    margin: 0 auto;
    font-size: 21px;
    line-height: 21px;
    letter-spacing: -21px;
  }

  .heart-animation.one {
    -webkit-animation: heart-zoom infinite 1s;
    -moz-animation: heart-zoom infinite 1s;
    -ms-animation: heart-zoom infinite 1s;
    -o-animation: heart-zoom infinite 1s;
    animation: heart-zoom infinite 1s;
  }

  .heart-animation.two {
    -webkit-animation: heart-zoom infinite 1.5s;
    -moz-animation: heart-zoom infinite 1.5s;
    -ms-animation: heart-zoom infinite 1.5s;
    -o-animation: heart-zoom infinite 1.5s;
    animation: heart-zoom infinite 1.5s;
  }

  .heart-animation.three {
    -webkit-animation: heart-zoom infinite 2s;
    -moz-animation: heart-zoom infinite 2s;
    -ms-animation: heart-zoom infinite 2s;
    -o-animation: heart-zoom infinite 2s;
    animation: heart-zoom infinite 2s;
  }

  .heart-animation.four {
    -webkit-animation: heart-zoom infinite 2.5s;
    -moz-animation: heart-zoom infinite 2.5s;
    -ms-animation: heart-zoom infinite 2.5s;
    -o-animation: heart-zoom infinite 2.5s;
    animation: heart-zoom infinite 2.5s;
  }

  /**********************************/
  /*
      COLOR-1.CSS
      #e2b123 (Yellow);
   */
  /**********************************/

  .heart-animation.one i {
    color: #e2b123;
  }

  .heart-animation.two i {
    color: #aaa609;
  }

  .heart-animation.three i {
    color: #8f8c07;
  }

  .heart-animation.four i {
    color: #626004;
  }

</style>
