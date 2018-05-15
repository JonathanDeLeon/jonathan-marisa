<template>
  <div id="home">
    <dashboard :cover-title="title" :background="background"></dashboard>
  </div>
</template>

<script>

  export default {
    name: "home",
    data() {
      return {
        title: "Marisa & Jonathan",
        background: {
          backgroundImage: 'url(/static/media/img/bg3.jpg)',
          height: window.innerHeight +'px'
        }
      }
    },
  }
</script>

<style scoped>

</style>
