<template>
  <div class="list-album">
    <v-card tile>
      <!--<v-flex xs12 d-block>-->
      <!--<img :src="url">-->
      <!--</v-flex>-->
      <v-img :src="url" :height="height">
        <slot name="card-media"></slot>
      </v-img>
      <slot name="card-actions"></slot>
    </v-card>
  </div>
</template>

<script>
  export default {
    props: ['url', 'height']
  }
</script>

<style>

  .list-album .v-responsive__content .v-card__title {
    background: linear-gradient(transparent, rgba(0, 0, 0, .7));
  }

  .list-album .v-image:hover .card-overlay {
    filter: alpha(opacity=100);
    opacity: 1;
    zoom: 1;
  }

  .list-album .v-image {
    cursor: pointer;
  }

  .list-album .v-image:hover .v-card__title {
    text-decoration: underline;
  }

  @media (hover: none) {
    .list-album .v-responsive__content .v-card__title {
      text-decoration: underline;
    }
  }

  .list-album .v-responsive__content .card-overlay {
    /*background: rgba(0, 0, 0, 0.2);*/
    background: linear-gradient(transparent, rgba(0, 0, 0, .7));
    opacity: 0;
    -webkit-transition: all 250ms ease-in-out;
    -moz-transition: all 250ms ease-in-out;
    -ms-transition: all 250ms ease-in-out;
    -o-transition: all 250ms ease-in-out;
    transition: all 250ms ease-in-out;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .list-album .v-responsive__content .headline {
    text-transform: lowercase;
  }

  .list-album img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  @media only screen and (max-width: 600px) {
    .list-album .v-responsive__content .headline {
      font-size: 16px!important;
    }
  }

</style>
