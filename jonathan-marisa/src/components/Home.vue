<template>
  <div id="home">
    <dashboard :cover-title="title" :background="background"></dashboard>
  </div>
</template>

<script>
  import Dashboard from '@/components/Dashboard'

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
    components: {
      Dashboard
    }
  }
</script>

<style scoped>

</style>
