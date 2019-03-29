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
                      <p class="caption mt-3 mb-0 "><em>Jonathan & Marisa's Wedding - <span
                          class="grey--text text--darken-1">June 23, 2019</span></em>
                      </p>
                    </v-flex>
                  </v-card-title>
                  <v-card-text class="">
                    <v-form ref="form">
                      <!--Attending wedding (y/n); wishes and notes (text-area); choice of menu(meat and veggie); Contact number;-->
                      <!--Number responding-->
                      <v-layout row wrap>

                        <v-flex xs12>
                          <v-text-field label="Name" v-model="wedding.name"
                                        color="pink lighten-3"
                                        counter maxlength="30"
                                        :rules="[() => !!wedding.name || 'Name is required', v => v.length <= 30 || 'Max 30 characters']"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Phone Number" v-model="wedding.phone" mask="(###) ###-####"
                                        color="pink lighten-3"
                                        :rules="[() => !!wedding.phone || 'Phone number is required']"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-layout row wrap>
                            <v-flex xs8>
                              <v-radio-group label="Will you attend?" v-model="wedding.attending">
                                <v-radio label="Yes" :value="true" color="pink lighten-3"></v-radio>
                                <v-radio label="No" :value="false" color="pink lighten-3"></v-radio>
                              </v-radio-group>
                            </v-flex>
                            <v-flex xs4 class="pt-3">
                              <v-scale-transition>
                                <v-select v-if="wedding.attending" color="pink lighten-3"
                                          :items="[1,2,3,4,5,6,7]" v-model="wedding.number_attending"
                                          label="" hint="Total in your party" persistent-hint
                                          @change="changeGuestCount"
                                ></v-select>
                              </v-scale-transition>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <transition-group tag="div" name="fade-transition" class="flex xs12">
                          <v-flex xs12 v-if="wedding.attending"
                                  v-for="(attendee, index) in wedding.guests" :key="index+0">

                            <v-text-field class="pl-3" label="Additional Guest Name" v-model="attendee.name"
                                          color="pink lighten-3"
                                          counter maxlength="30"
                                          :rules="[() => !!attendee.name || 'Guest name is required', v => v.length <= 30 || 'Max 30 characters']">
                            </v-text-field>
                          </v-flex>
                        </transition-group>

                        <v-scale-transition>
                          <v-flex xs12 v-if="wedding.attending">
                            <!--<v-textarea color="pink lighten-3" label="Meal Preferences"-->
                            <!--hint="We will do our best to accommodate"-->
                            <!--rows="3"></v-textarea>-->
                            <v-select color="pink lighten-3"
                                      :items="['beef/chicken', 'veggie']" v-model="wedding.meal"
                                      label="Entrée Preference"
                            ></v-select>
                          </v-flex>
                        </v-scale-transition>
                        <v-flex xs12>
                          <v-textarea color="pink lighten-3" label="Wishes & Notes" v-model="wedding.notes"
                                      rows="3"></v-textarea>
                        </v-flex>
                        <v-flex xs12 class="mt-3">
                          <v-btn block color="pink lighten-4" :loading="loading" :disabled="loading"
                                 @click.stop="createWeddingEvent">Submit
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
                      <h2 v-if="wedding.attending">
                        <em><span v-if="wedding.name">{{wedding.name.split(' ')[0] + ', '}}</span> see you at the wedding!</em>
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
        wedding: {
          name: '',
          phone: '',
          meal: '',
          attending: true,
          guests: [],
          number_attending: 1,
          notes: ''
        },
        test: false
      }
    },
    created() {
      loadingUtil.show();
      window.setTimeout(() => loadingUtil.hide(), 1500);
    },
    methods: {
      createWeddingEvent() {
        if (this.$refs.form.validate()) {
          this.loading = true;
          const eventData = {
            type: 'Wedding',
            attending: this.wedding.attending,
            number_attending: this.wedding.number_attending,
            attendees: this.wedding.guests.slice(),
            meal: this.wedding.meal,
            notes: this.wedding.notes,
          };
          const primaryGuest = {
            name: this.wedding.name,
            phone: this.wedding.phone
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
        let startDeleteIndex = this.wedding.number_attending - 1;
        this.wedding.guests.splice(startDeleteIndex);
        if (this.wedding.number_attending === 1) {
          return;
        }
        if (this.wedding.number_attending > this.wedding.guests.length) {
          for (let i = this.wedding.guests.length; i < this.wedding.number_attending - 1; i++) {
            let temp = {name: ''};
            this.wedding.guests.push(temp);
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
