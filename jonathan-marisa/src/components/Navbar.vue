<template>
  <div id="navbar">
    <v-toolbar class="elevation-0" color="transparent" absolute dark app>
      <v-menu offset-y transition="scale-transition">
        <div slot="activator">
          <i class="far fa-heart fa-lg" style="font-size: 1.7em;"></i>
          <span>MENU</span>
        </div>
        <v-list>
          <v-list-tile v-for="item in items" :key="item.title" :href="item.href" @click="">
            <v-list-tile-action class="pink--text text--lighten-3">
              <span v-html="item.icon"></span>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="pink--text text--lighten-3">{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        drawer: null,
        items: [
          { title: 'Home', href: '/', icon: '<span class="fa-layers fa-fw fa-lg"><i class="fas fa-home"></i></span>' },
          { title: 'Our Story', href: '/our-story', icon: '<span class="fa-layers fa-fw fa-lg"><i class="fas fa-pencil-alt"></i></span>' },
          { title: 'Photos', href: '/album', icon: '<span class="fa-layers fa-fw fa-lg"><i class="fas fa-camera-retro"></i></span>' },
          { title: 'Proposal', href: 'proposal', icon: '<span class="fa-layers fa-fw fa-lg"><i class="far fa-circle" data-fa-transform="down-4"></i><i class="far fa-gem" data-fa-transform="shrink-8 up-6"></i></span>' },
          { title: 'Wedding', href: '/wedding', icon: '<span class="fa-layers fa-fw fa-lg"><i class="fas fa-heart" data-fa-transform="grow-2"></i><i class="far fa-heart fa-inverse" data-fa-transform="shrink-3 down-2 right-3"></i></span>' },
          { title: 'Contact', href: '/contact', icon: '<span class="fa-layers fa-fw fa-lg"><i class="far fa-address-card"></i></span>' },
        ]
      }
    }
  }
</script>
<style scoped>
</style>
