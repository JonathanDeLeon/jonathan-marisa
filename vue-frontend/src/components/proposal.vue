<template>
  <div id="proposal">
    <v-container>
      <v-layout wrap>
        <v-flex xs12>
          <h3 class="display-header text-xs-center my-3">Proposal Story</h3>
          <p class="subheading text-xs-center mb-2">December 8, 2017</p>
          <p class="caption text-xs-center"><em>As told by Marisa</em></p>
        </v-flex>
        <v-flex xs12>
          <v-layout justify-center>
            <v-flex xs12 md10>
              <!--<v-img :height="$vuetify.breakpoint.mdAndUp ? 700 : 370" contain-->
                     <!--src="https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_420/dpr_2.0/proposal.png"></v-img>-->
              <v-img :height="$vuetify.breakpoint.mdAndUp ? 700 : 370" contain
                     src="https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_420/dpr_2.0/proposal-2.png"></v-img>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: "proposal"
  }
</script>

<style scoped>

</style>
