<template>
  <div id="navbar">
    <v-navigation-drawer
      fixed
      temporary
      v-model="drawer"
      disable-resize-watcher
      app
    >
      <v-list>
        <!--
        <v-list-tile @click="">
          <v-list-tile-action>
            <i class="fas fa-home fa-lg"></i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <i class="far fa-heart fa-lg"></i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Our Story</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <i class="fas fa-camera-retro fa-lg"></i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Photos</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <i class="far fa-gem fa-lg"></i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Proposal</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>cake</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Wedding</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <i class="far fa-address-card fa-lg"></i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        -->
        <v-list-tile v-for="item in items" :key="item.title" :href="item.href" @click="">
          <v-list-tile-action>
            <span v-html="item.icon"></span>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="elevation-0" color="transparent" absolute app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        drawer: null,
        items: [
          { title: 'Home', href: '/', icon: '<i class="fas fa-home fa-lg"></i>' },
          { title: 'Our Story', href: '/our-story/', icon: '<i class="far fa-heart fa-lg"></i>' },
          { title: 'Photos', href: '/photos/', icon: '<i class="fas fa-camera-retro fa-lg"></i>' },
          { title: 'Proposal', href: '/proposal/', icon: '<i class="far fa-gem fa-lg"></i>' },
          { title: 'Wedding', href: '/wedding/', icon: '<i aria-hidden="true" class="material-icons icon">cake</i>' },
          { title: 'Contact', href: '/contact/', icon: '<i class="far fa-address-card fa-lg"></i>' },
        ]
      }
    }
  }
</script>
