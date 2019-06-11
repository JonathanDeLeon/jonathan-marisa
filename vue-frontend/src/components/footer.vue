<template>
  <footer id="footer-wrap" class="mt-5">
    <section style="background-color: #f5f4ec;">
      <v-container class="text-xs-center">
        <v-layout justify-center row wrap>
          <v-flex xs12>
            <h3>We are registered at</h3>
          </v-flex>
          <v-flex xs4>
            <a href="https://www.macys.com/wgl/registry/guest/7009675" target="_blank">
              <v-img contain height="100" alt="Macy's Registry"
                  src="https://content-az.equisolve.net/_47db57411b1afcd222335d939c1e9a81/macysinc/db/476/4495/file/macys-logo-on-white_high.jpg"
              >
              </v-img>
            </a>
          </v-flex>
          <v-flex xs4>
            <a href="https://www.bedbathandbeyond.com/store/giftregistry/viewregistryguest/546940939?eventType=Wedding" target="_blank">
              <v-img contain height="100" alt="Bed Bath & Beyond Registry"
                  src="https://mediaro.info/wp-content/uploads/2018/12/bed-bath-beyond-logo-bed-bath-beyond-logo-ideas.png"
              >
              </v-img>
            </a>
          </v-flex>
          <v-flex xs4>
            <a href="http://tgt.gifts/9f50f206008e4ca7a6284040875ccae4" target="_blank">
              <v-img contain height="100" alt="Target Registry"
                  src="https://www.makeitmsp.org/site/wp-content/uploads/2017/03/target-logo.png"
              >
              </v-img>
            </a>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <v-container class="text-xs-center" pt-0 :pa-0="$vuetify.breakpoint.smAndDown">
      <v-layout column>

        <v-flex xs12>
          <v-layout row xs12 wrap>

            <v-flex xs6 sm4 order-xs1 order-sm1>
              <v-layout fill-height column>

                <v-flex xs12>
                  <v-layout align-center fill-height xs12>
                    <v-flex xs12 pa-3>
                      <h2>HIS</h2>
                      <div>
                        <v-btn outline small fab color="pink lighten-4" class="mx-1" target="_blank"
                               href="https://www.facebook.com/Johnnymack27">
                          <i class="fab fa-facebook-f"></i>
                        </v-btn>
                        <v-btn outline small fab color="pink lighten-4" class="mx-1" target="_blank"
                               href="https://www.instagram.com/johnnymack27/">
                          <i class="fab fa-instagram"></i>
                        </v-btn>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex xs0 sm12 v-if="$vuetify.breakpoint.smAndUp">
                  <v-layout row fill-height xs12>
                    <v-flex xs0 sm6 pa-3>
                      <v-img height="100" contain
                             src="https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_120/dpr_2.0/footer-thankyou.png"></v-img>
                    </v-flex>
                    <v-flex xs0 sm6 pa-3>
                      <ul class="pa-0">
                        <li><em>The Links</em></li>
                        <li v-for="item in items" :key="item.title">
                          <router-link :to="item.href">{{item.title}}</router-link>
                        </li>
                      </ul>
                    </v-flex>
                  </v-layout>
                </v-flex>

              </v-layout>
            </v-flex>

            <v-flex xs12 sm4 pa-3 order-xs5 order-sm2>
              <v-img :height="$vuetify.breakpoint.smAndUp ? 250 : 150" contain
                     src="https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_280/dpr_2.0/footer-savethedate.png"></v-img>
            </v-flex>

            <v-flex xs6 sm4 order-xs2 order-sm3>
              <v-layout fill-height column>
                <v-flex xs12>
                  <v-layout align-center fill-height xs12>
                    <v-flex xs12 pa-3>
                      <h2>HERS</h2>
                      <div>
                        <v-btn outline small fab color="pink lighten-4" class="mx-1" target="_blank"
                               href="https://www.facebook.com/marisa.leon.75">
                          <i class="fab fa-facebook-f"></i>
                        </v-btn>
                        <v-btn outline small fab color="pink lighten-4" class="mx-1" target="_blank"
                               href="https://www.instagram.com/xomariposa/">
                          <i class="fab fa-instagram"></i>
                        </v-btn>
                        <v-btn outline small fab color="pink lighten-4" class="mx-1" target="_blank"
                               href="https://www.pinterest.com/marisaleon90/">
                          <i class="fab fa-pinterest-p"></i>
                        </v-btn>
                        <v-btn outline small fab color="pink lighten-4" class="mx-1" target="_blank"
                               href="https://twitter.com/xomariposa_">
                          <i class="fab fa-twitter"></i>
                        </v-btn>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 pa-3 v-if="$vuetify.breakpoint.smAndUp">
                  <v-img height="50" contain
                         src="https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_120/dpr_2.0/footer-design.png"></v-img>
                  <h3 style="font-weight: 400">Website designed by the bride & groom</h3>
                  <h3 class="display-header mt-2 mb-0">Jonathan & Marisa</h3>
                </v-flex>
              </v-layout>
            </v-flex>

            <!--Only show on 'xs' screens -->
            <v-flex xs12 pa-3 order-xs3 v-if="$vuetify.breakpoint.xsOnly">
              <v-img height="50" contain
                     src="https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_120/dpr_2.0/footer-design.png"></v-img>
            </v-flex>

            <v-flex xs12 order-xs4 v-if="$vuetify.breakpoint.xsOnly">
              <v-layout row fill-height xs12>

                <v-flex xs6 pa-3 style="border-right: 0.2px solid rgba(0, 0, 0, 0.2);">
                  <ul class="pa-0">
                    <li><em>The Links</em></li>
                    <li v-for="item in items" :key="item.title">
                      <router-link :to="item.href">{{item.title}}</router-link>
                    </li>
                  </ul>
                </v-flex>

                <v-flex xs6 sm6 pa-3>
                  <h3 style="font-weight: 400">Website designed by the bride & groom</h3>
                  <h3 class="display-header mt-2 mb-0">Jonathan & Marisa</h3>
                </v-flex>

              </v-layout>
            </v-flex>

          </v-layout>
        </v-flex>

        <v-flex xs12>
          <v-layout row xs12 justify-center wrap>

            <v-flex sm2 v-if="$vuetify.breakpoint.smAndUp">
              <v-spacer></v-spacer>
            </v-flex>
            <v-flex xs12 sm8 pt-3 :pa-3="$vuetify.breakpoint.smAndUp">
              <p class="mb-0">
                CREDITS: Thank you to <a href="https://www.emilystarpoole.com/" target="_blank" style="color:inherit">Emily
                Star Poole</a> for our proposal + engagement photos
              </p>
              <p class="mb-0">
                Thank you to our friends Tania, Kristina, Matt, Ryan, and Ethan for making our engagement possible!
              </p>
            </v-flex>
            <v-flex sm2 v-if="$vuetify.breakpoint.smAndUp">
              <v-spacer></v-spacer>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs12 v-if="$vuetify.breakpoint.xsOnly">
          <v-layout row xs12 justify-center wrap>
            <v-flex xs2 offset-xs10>
              <v-img height="80" contain
                     src="https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_120/dpr_2.0/footer-thankyou.png"></v-img>
            </v-flex>
          </v-layout>
        </v-flex>

      </v-layout>
    </v-container>
  </footer>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {title: 'Home', href: '/'},
          {title: 'Photos', href: '/album',},
          {title: 'Wedding', href: '/wedding',},
          {title: 'RSVP', href: '/rsvp',},
        ]
      }
    }
  }
</script>

<style scoped>
  #footer-wrap {
    background-color: #fff;
    color: #ffbcd4;
  }

  ul li, ul li a {
    text-decoration: none;
    display: block;
    color: inherit;
  }

  ul li a {
    display: inline-block;
  }

  ul li a:hover {
    text-decoration: underline;
  }

  @media (hover: none) {
    ul li a {
      text-decoration: underline;
    }
  }

  h3.display-header {
    font-size: 1.7em;
  }

  #footer-wrap .v-btn--floating.v-btn--small {
    height: 25px;
    width: 25px;
  }

  #footer-wrap > .container > .layout,
  #footer-wrap .layout.column > .flex:last-child {
    border-top: 0.2px solid rgba(0, 0, 0, 0.2);
  }

  #footer-wrap > .container > .layout > .flex > .layout > .flex:first-child {
    border-right: 0.2px solid rgba(0, 0, 0, 0.2);
  }

  #footer-wrap > .container > .layout > .flex > .layout > .flex:last-child {
    border-left: 0.2px solid rgba(0, 0, 0, 0.2);
  }

  #footer-wrap .layout.row.fill-height > .flex:first-child {
    border-right: 0.2px solid rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 0.8em;
  }

  @media (max-width: 720px) {
    h2 {
      font-size: 1.3em;
    }

    h3 {
      font-size: 1.0em;
    }

    h3.display-header {
      font-size: 1.3em;
    }

    p {
      font-size: 0.5em;
    }
  }

  @media (max-width: 600px) {
    #footer-wrap .layout.column > .flex:last-child {
      border-top: none;
    }

    #footer-wrap > .container > .layout > .flex > .layout > .flex:first-child {
      border-right: none;
    }

    #footer-wrap > .container > .layout > .flex > .layout > .flex:last-child {
      border-left: none;
    }

    #footer-wrap .layout.row.fill-height > .flex:first-child {
      border-right: none;
    }

    #footer-wrap > .container > .layout > .flex .layout.column > .flex:only-child {
      border-right: 0.2px solid rgba(0, 0, 0, 0.2);
    }

    #footer-wrap > .container > .layout > .flex > .layout > .flex:not(:only-of-type) {
      border-bottom: 0.2px solid rgba(0, 0, 0, 0.2) !important;
    }

  }
</style>
