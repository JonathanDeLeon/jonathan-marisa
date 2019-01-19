<template>
  <v-toolbar fixed clipped-right>

    <v-layout justify-center class="hidden-sm-and-down">
      <v-flex xs1>
        <v-layout fill-height align-center>
          <v-flex xs12>
            <!--<v-toolbar-title class="text-xs-center" @click.stop="$router.push('/')">J&M</v-toolbar-title>-->
            <v-img height="50" contain
                   src="https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_25/dpr_2.0/logo_alpha.png"></v-img>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs6>
        <v-layout fill-height justify-center>

          <v-toolbar-items>
            <v-btn flat :ripple="false" v-for="item in items" :key="item.title" :to="item.href">{{item.title}}</v-btn>
          </v-toolbar-items>
        </v-layout>
      </v-flex>

      <v-flex xs1>
        <v-btn dark depressed color="pink lighten-4" :ripple="false" to="/rsvp">RSVP</v-btn>
      </v-flex>
    </v-layout>


    <v-layout align-center class="mx-3 hidden-md-and-up">
      <v-menu offset-y transition="scale-transition">
        <div slot="activator" class="pink--text text--lighten-3">
          <i class="far fa-heart fa-lg" style="font-size: 1.7em;"></i>
          <span>MENU</span>
        </div>
        <v-list>
          <v-list-tile v-for="item in items" :key="item.title" :to="item.href" @click="">
            <v-list-tile-action class="pink--text text--lighten-3">
              <span v-html="item.icon"></span>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="pink--text text--lighten-3">{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-btn dark depressed color="pink lighten-4" :ripple="false" to="/rsvp">RSVP</v-btn>
    </v-layout>

  </v-toolbar>
</template>

<script>
  export default {
    data() {
      return {
        drawer: null,
        items: [
          {title: 'Home', href: '/', icon: '<span class="fa-layers fa-fw fa-lg"><i class="fas fa-home"></i></span>'},
          // { title: 'Our Story', href: '/our-story', icon: '<span class="fa-layers fa-fw fa-lg"><i class="fas fa-pencil-alt"></i></span>' },
          {
            title: 'Photos',
            href: '/album',
            icon: '<span class="fa-layers fa-fw fa-lg"><i class="fas fa-camera-retro"></i></span>'
          },
          // { title: 'Proposal', href: '/proposal', icon: '<span class="fa-layers fa-fw fa-lg"><i class="far fa-circle" data-fa-transform="down-4"></i><i class="far fa-gem" data-fa-transform="shrink-8 up-6"></i></span>' },
          {
            title: 'Wedding',
            href: '/wedding',
            icon: '<span class="fa-layers fa-fw fa-lg"><i class="fas fa-heart" data-fa-transform="grow-2"></i><i class="far fa-heart fa-inverse" data-fa-transform="shrink-3 down-2 right-3"></i></span>'
          },
          // {
          //   title: 'RSVP',
          //   href: '/rsvp',
          //   icon: '<span class="fa-layers fa-fw fa-lg"><i class="far fa-address-card"></i></span>'
          // },
        ]
      }
    }
  }
</script>
<style>
  nav.v-toolbar {
    position: -webkit-sticky; /* Safari */
    position: sticky;
  }

  nav .v-toolbar__title {
    cursor: pointer;
  }

  .v-toolbar__content .v-btn__content {
    font-family: Muli, sans-serif;
  }

  .v-toolbar__items .v-btn__content {
    opacity: 0.5;
    font-size: 0.8em;
    letter-spacing: 0.2em;
  }

  .v-toolbar__items .v-btn:before {
    height: 4px;
    bottom: 0;
    top: auto;
    left: auto;
    opacity: 1;
    width: 0;
  }

  .v-toolbar__items .v-btn--active::before, .v-toolbar__items .v-btn:focus::before, .v-toolbar__items .v-btn:hover::before {
    background-color: #ffbcd4;
    /*background-color: #DCC8B4;*/
    width: 75%;
  }

  .v-toolbar__items .v-btn--active .v-btn__content, .v-toolbar__items .v-btn:focus .v-btn__content, .v-toolbar__items .v-btn:hover .v-btn__content {
    opacity: 1;
  }
</style>
