<template>
  <div id="rsvp">
    <dashboard :cover-title="title" :background="background"></dashboard>
    <v-container>
      <v-layout column class="mt-5">
        <v-flex xs12 class="text-xs-center">
          <p>If you have any questions, please call Jonathan at... 323-695-6717</p>
        </v-flex>
        <v-flex xs12>
          <v-layout row xs12 justify-center>
            <v-flex xs12 sm6>
              <v-card>
                <v-card-title class="pb-1">
                  <v-flex xs12>
                    <h1 class="bombshell pink--text text--lighten-4">RSVP</h1>
                  </v-flex>
                  <!--<p class="caption mt-3 mb-0"><em>* RSVP Code found on your wedding invitation</em></p>-->
                  <p class="caption mt-3 mb-0 red--text"><em>* RSVP not available yet. Please call 323-695-6717</em></p>
                </v-card-title>
                <v-card-text>
                  <v-form ref="form">
                    <!--Attending wedding (y/n); wishes and notes (text-area); choice of menu(meat and veggie); Contact number;-->
                    <!--Number responding-->
                    <v-text-field disabled
                      label="Name"
                      required
                    ></v-text-field>
                    <v-text-field disabled
                      label="E-mail"
                      required
                    ></v-text-field>
                    <v-text-field disabled
                      label="RSVP Code"
                      required
                    ></v-text-field>
                    <v-textarea disabled
                      label="Dietary Restrictions"
                      hint="We will do our best to accommodate"
                      rows="3"
                    ></v-textarea>
                    <v-btn disabled>Submit</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import loadingUtil from '@/_common/loading.util'

  export default {
    data() {
      return {
        title: "RSVP",
        background: {
          backgroundImage: "url('https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/h_520,c_scale/dpr_2.0/3519900e-6f3a-4303-8ee8-32df5065dc44.jpg'",
          height: window.innerHeight + 'px'
        },
      }
    },
    created() {
      loadingUtil.show();
      window.setTimeout(() => loadingUtil.hide(), 1500);
    },
  }
</script>

<style scoped>

</style>
