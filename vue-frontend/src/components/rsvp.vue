<template>
  <div id="rsvp">
    <dashboard :cover-title="title" :background="background"></dashboard>
    <v-container>
      <v-layout column class="mt-5">
        <!--Bridal Shower RSVP-->
        <v-flex xs12>
          <v-layout row xs12 justify-center>
            <v-flex xs12 sm8 lg6>
              <div class="card-container">
                <v-card class="pa-5">
                  <v-alert :value="errorMessage" type="error" transition="scale-transition" dismissible>
                    {{errorMessage}}
                  </v-alert>
                  <v-card-title class="pb-1 mt-3">
                    <v-flex xs12 class="text-xs-center">
                      <h1 class="bombshell pink--text text--lighten-4">Will You Attend?</h1>
                      <p class="caption mt-3 mb-0 "><em>Marisa's Bridal Shower - <span
                          class="grey--text text--darken-1">March 24, 2019</span></em>
                      </p>
                    </v-flex>
                  </v-card-title>
                  <v-card-text class="">
                    <v-form ref="form">
                      <!--Attending wedding (y/n); wishes and notes (text-area); choice of menu(meat and veggie); Contact number;-->
                      <!--Number responding-->
                      <v-layout row wrap>

                        <v-flex xs12>
                          <v-text-field label="Name" v-model="bridalShower.name"
                                        color="pink lighten-3"
                                        counter maxlength="30"
                                        :rules="[() => !!bridalShower.name || 'Name is required', v => v.length <= 30 || 'Max 30 characters']"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Phone Number" v-model="bridalShower.phone" mask="(###) ###-####"
                                        color="pink lighten-3"
                                        :rules="[() => !!bridalShower.phone || 'Phone number is required']"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-layout row wrap>
                            <v-flex xs8>
                              <v-radio-group label="Will you attend?" v-model="bridalShower.attending">
                                <v-radio label="Yes" :value="true" color="pink lighten-3"></v-radio>
                                <v-radio label="No" :value="false" color="pink lighten-3"></v-radio>
                              </v-radio-group>
                            </v-flex>
                            <v-flex xs4 class="pt-3">
                              <v-scale-transition>
                                <v-select v-if="bridalShower.attending" color="pink lighten-3"
                                          :items="[1,2,3,4,5,6,7]" v-model="bridalShower.number_attending"
                                          label="" hint="Total in your party" persistent-hint
                                          @change="changeGuestCount"
                                ></v-select>
                              </v-scale-transition>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <transition-group tag="div" name="fade-transition" class="flex xs12">
                          <v-flex xs12 v-if="bridalShower.attending"
                                  v-for="(attendee, index) in bridalShower.guests" :key="index+0">

                            <v-text-field class="pl-3" label="Additional Guest Name" v-model="attendee.name"
                                          color="pink lighten-3"
                                          counter maxlength="30"
                                          :rules="[() => !!attendee.name || 'Guest name is required', v => v.length <= 30 || 'Max 30 characters']">
                            </v-text-field>
                          </v-flex>
                        </transition-group>
                        <v-flex xs12 class="mt-3">
                          <v-btn block color="pink lighten-4" :loading="loading" :disabled="loading"
                                 @click.stop="createBridalShowerEvent">Submit
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-card-text>
                </v-card>
                <transition name="zoom" duration="2000">
                  <v-layout class="card-overlay" fill-height column justify-center align-center
                            v-if="successfulSubmit && !loading">
                    <div class="heart">
                      <i class="fas fa-heart pink--text text--lighten-5"></i>
                    </div>
                    <div class="inner-zoom">
                      <h2 v-if="bridalShower.attending">
                        <em><span v-if="bridalShower.name">{{bridalShower.name.split(' ')[0] + ', '}}</span> Let's Shower the Bride!</em>
                      </h2>
                      <h2 v-else>
                        <em>
                          Thank you for submitting your response
                        </em>
                      </h2>
                    </div>
                  </v-layout>
                </transition>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
        <!--Wedding RSVP-->
        <!--<v-flex xs12>-->
        <!--<v-layout row xs12 justify-center>-->
        <!--<v-flex xs12 sm6>-->
        <!--<v-card>-->
        <!--<v-card-title class="pb-1">-->
        <!--<v-flex xs12>-->
        <!--<h1 class="bombshell pink&#45;&#45;text text&#45;&#45;lighten-4">RSVP</h1>-->
        <!--</v-flex>-->
        <!--&lt;!&ndash;<p class="caption mt-3 mb-0"><em>* RSVP Code found on your wedding invitation</em></p>&ndash;&gt;-->
        <!--<p class="caption mt-3 mb-0 red&#45;&#45;text"><em>* RSVP not available yet. Please call 323-695-6717</em></p>-->
        <!--</v-card-title>-->
        <!--<v-card-text>-->
        <!--<v-form ref="form">-->
        <!--&lt;!&ndash;Attending wedding (y/n); wishes and notes (text-area); choice of menu(meat and veggie); Contact number;&ndash;&gt;-->
        <!--&lt;!&ndash;Number responding&ndash;&gt;-->
        <!--<v-text-field disabled label="Name" required></v-text-field>-->
        <!--<v-text-field disabled label="E-mail" required></v-text-field>-->
        <!--<v-text-field disabled label="RSVP Code" required></v-text-field>-->
        <!--<v-textarea disabled label="Meal Preferences" hint="We will do our best to accommodate"-->
        <!--rows="3"></v-textarea>-->
        <!--<v-btn disabled>Submit</v-btn>-->
        <!--</v-form>-->
        <!--</v-card-text>-->
        <!--</v-card>-->
        <!--</v-flex>-->
        <!--</v-layout>-->
        <!--</v-flex>-->
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
          height: window.innerHeight - 64 + 'px'
        },
        errorMessage: '',
        loading: false,
        successfulSubmit: false,
        bridalShower: {
          name: '',
          phone: '',
          attending: true,
          guests: [],
          number_attending: 1,
        },
        test: false
      }
    },
    created() {
      loadingUtil.show();
      window.setTimeout(() => loadingUtil.hide(), 1500);
    },
    methods: {
      createBridalShowerEvent() {
        if (this.$refs.form.validate()) {
          this.loading = true;
          const eventData = {
            type: 'Bridal Shower',
            attending: this.bridalShower.attending,
            number_attending: this.bridalShower.number_attending,
            attendees: this.bridalShower.guests.slice(),
          };
          const primaryGuest = {
            name: this.bridalShower.name,
            phone: this.bridalShower.phone
          };
          eventData.attendees.unshift(primaryGuest);

          this.$http.post('/api/event/', eventData)
              .then(response => {
                this.successfulSubmit = true
              })
              .catch(err => {
                this.errorMessage = "There was an error processing your request. Please call (323) 695-6717 to RSVP"
              })
              .finally(() => {
                setTimeout(() => {
                  this.loading = false
                }, 1000)
              })
        }
      },
      changeGuestCount() {
        let startDeleteIndex = this.bridalShower.number_attending - 1;
        this.bridalShower.guests.splice(startDeleteIndex);
        if (this.bridalShower.number_attending === 1) {
          return;
        }
        if (this.bridalShower.number_attending > this.bridalShower.guests.length) {
          for (let i = this.bridalShower.guests.length; i < this.bridalShower.number_attending - 1; i++) {
            let temp = {name: ''};
            this.bridalShower.guests.push(temp);
          }
        }
      }
    }
  }
</script>

<style>
  .card-container {
    position: relative;
  }

  .card-container .card-overlay {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: transparent;
    overflow: hidden;
  }

  .inner-zoom {
    position: absolute;
    transition: all 0.5s linear;
    color: #e3a0b6;
  }

  .zoom-enter-active .inner-zoom {
    animation-duration: 0.5s;
    animation-delay: 0.5s;
    animation-fill-mode: both;
    animation-name: inner-zoom;
    animation-timing-function: ease-in;
  }

  .heart {
    font-size: 125em;
    transform: scale(1.25);
  }

  .zoom-enter-active .heart {
    animation-duration: 1.5s;
    animation-fill-mode: both;
    animation-name: zoom-heart;
  }

  @keyframes inner-zoom {
    from {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes zoom-heart {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(0.2);
    }

    100% {
      transform: scale(1.25);
    }
  }


</style>
