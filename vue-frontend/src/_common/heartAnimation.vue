<template>
  <div>
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
</template>

<script>
  export default {
    name: "heartAnimation"
  }
</script>

<style scoped>
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
</style>
