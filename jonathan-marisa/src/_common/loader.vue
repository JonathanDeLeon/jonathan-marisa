<template>
  <div id="preloader" :class="classObj" v-if="display">
    <div class="alignment">
      <div class="v-align center-middle">
        <heart-animation></heart-animation>
      </div>
    </div>
  </div>
</template>

<script>
  import loadingUtil from './loading.util'

  import heartAnimation from './heartAnimation'

  export default {
    components: {heartAnimation},
    data() {
      return {
        display: false,
        classObj: {
          hidden: false,
          modal: false
        },
      }
    },
    created() {
      loadingUtil.registerLoader(this);
    },
    beforeDestroy() {
      loadingUtil.unregister();
    },
    methods: {
      show(data) {
        if (data) {
          this.classObj.modal = !!data.modal;
        }
        this.classObj.hidden = false;
        this.display = true;
      },
      hide() {
        this.classObj.hidden = true;
        this.classObj.modal = false;
        window.setTimeout(() => {
          this.display = false;
          this.classObj.modal = false;
        }, 1100);
      },
    }
  }
</script>

<style>
  #preloader {
    -webkit-transition: all 100ms ease-out;
    -moz-transition: all 100ms ease-out;
    -ms-transition: all 100ms ease-out;
    -o-transition: all 100ms ease-out;
    transition: all 100ms ease-out;
    /*background-color: #ffffff;*/
    background-color: rgba(255, 255, 255, 1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    opacity: 1;
    visibility: visible;
  }

  #preloader.modal {
    background-color: rgba(255, 255, 255, 0.2);
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

  #preloader.hidden {
    visibility: hidden;
    opacity: 0;
    -moz-transition: visibility 0s 1s, opacity 1s linear;
    -o-transition: visibility 0s 1s, opacity 1s linear;
    -webkit-transition: visibility 0s 1s, opacity 1s linear;
    transition: visibility 0s 1s, opacity 1s linear;
  }
</style>
