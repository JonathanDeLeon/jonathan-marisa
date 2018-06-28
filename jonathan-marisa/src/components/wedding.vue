<template>
  <div id="wedding">
    <dashboard :cover-title="title" :background="background" :init-resize="false"></dashboard>
    <v-container>
      <v-layout align-center wrap>
        <v-flex xs12>
          <h3 class="display-header text-xs-center">Bella Vista Groves</h3>
          <v-layout align-center column>
            <v-flex xs12 md6>
              <v-card-media height="330" style="width: 24rem;"
                            src="https://scontent-lax3-1.cdninstagram.com/vp/1c6338ed76231e59f6fa23c9c99a73a7/5BE5C1EB/t51.2885-15/e35/12224203_1648108658792843_1486545466_n.jpg"></v-card-media>
            </v-flex>
            <v-flex xs12 md6 mt-3>
              <p class="text-xs-center">
                We both fell in love with hidden gem! Surrounded by flowers, orchards, and the beautiful ocean nearby.
                It is a private location perfect for our special day & our special guests. We can’t wait to celebrate
                with you in this special place.
              </p>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <h3 class="display-header text-xs-center">Event Details</h3>
          <v-layout align-center column>
            <v-flex xs12 md6 mt-1>
              <p>
                Time: 4:00 pm<br/>
                Address: 3117 W Telegraph Rd<br/>Fillmore, CA 93015
              </p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-parallax height="300"
                src="http://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_600/b_rgb:4f4c4c,o_85/parallax.jpg">
      <v-layout column align-center justify-center>
        <h2 class="display-header text-xs-center white--text">Wedding Party</h2>
      </v-layout>
    </v-parallax>
    <v-container>
      <v-layout align-center wrap>
        <v-flex xs12>
          <h3 class="display-header text-xs-center">Bridesmaids</h3>
          <v-layout align-center justify-center wrap v-for="(bridesmaid, index) in bridesmaids" :key="index">
            <v-flex xs10 sm5 md4 lg3 :class="(index+1)%2==0 ? 'order-md2' : ''">
              <v-card-media class="circle" height="290"
                            :src="bridesmaid.image || 'https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_180/image-not-found.png'"></v-card-media>
              <!--<img width="300"-->
              <!--:src="bridesmaid.image || 'https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_180/image-not-found.png'">-->
            </v-flex>
            <v-flex xs10 md6 :class="(index+1)%2==0 ? 'pr-3' : 'pl-4'">
              <p>{{bridesmaid.description}}</p>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <h3 class="display-header text-xs-center">Groomsmen</h3>
          <v-layout align-center justify-center wrap v-for="(groomsman, index) in groomsmen" :key="index">
            <v-flex xs12 md3 :class="(index+1)%2==0 ? 'order-md2' : ''">
              <v-card-media class="circle" height="290"
                            :src="groomsman.image || 'https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_180/image-not-found.png'"></v-card-media>
            </v-flex>
            <v-flex xs12 md6 :class="(index+1)%2==0 ? 'pr-3' : 'pl-4'">
              <p>{{groomsman.description}}</p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "The Wedding",
        background: {
          backgroundImage: 'url(http://thedesignerweddingshow.ie/wp-content/uploads/2012/08/Couple-Hold-Hands4.jpg)',
          height: '550px'
        },
        bridesmaids: [
          {
            label: 'Edelweiss Pandjaitan | Maid of Honor',
            image: '/static/media/edel.png',
            description: 'My bestfriend from college. Shes’s super fashionable and takes amazing pictures. We’ve had some of the most spontaneous adventures together. She’s the best secret keeper and an amazing listener. She also knows all the HG (hot gossip)!'
          },
          {
            label: 'Kristina Hall | Maid of Honor',
            image: '/static/media/kris.png',
            description: 'My best friend from college. We met freshman year and have been inseparable ever since! We had almost every class together and even lived together for a whole summer. She’s insanely smart, beautiful, and always find a way to make me laugh!'
          },
          {
            label: 'Tania Baranov | Bridesmaid',
            image: '/static/media/tania.png',
            description: 'My bestfriend from college. She is one of the most loveable humans I know! She’s beautiful, smart, and an amazing cook. There is never a dull moment with her!'
          },
          {
            label: 'Hailey Muncy | Bridesmaid',
            image: '/static/media/hailey.png',
            description: 'One of my bestfriends who I completely adore. She has a heart of gold and a free spirit. Haley never fails to put me in a good mood. Her maturity and genuine spirit is so refreshing. Our minds think so much alike that we could spend hours having deep conversations.'
          },
          {
            label: 'Daniela Rivas | Bridesmaid',
            image: '/static/media/daniela.png',
            description: 'My bestfriend from highschool. She was my wingwoman to get Jonathan to ask me to be his girlfriend. She is someone I know I can always count on, she’s super fun to be around & she is also so talented at baking!'
          },
          {
            label: 'Miriam Leon | Bridesmaid',
            image: '/static/media/miriam.png',
            description: 'My brother’s beautiful girlfriend. She is an amazing girlfriend to brother and very good to my family. She is a confident, super loving and very down to earth type of woman.'
          },
          {
            label: 'Jaleesa De Leon | Junior Bridesmaid',
            image: '/static/media/jaleesa.png',
            description: 'My future sister-in-law. I first met her when she was only 7 years old. I remember how little she was & I love how Jonathan treats and takes care of her. I’ve watched her grow into a beautiful young lady & I can’t wait to be family!'
          },
        ],
        groomsmen: [
          {label: 'Jeremy Del Pozo | Best Man', image: '', description: ''},
          {label: 'Oliva Peña | Best Man', image: '', description: ''},
          {label: 'Isaiah Leon | Groomsman', image: '', description: ''},
          {label: 'Aaron Martinez| Groomsman', image: '', description: ''},
          {label: 'Ethan Beaver | Groomsman', image: '', description: ''},
          {label: 'Matthew Fennell | Groomsman', image: '', description: ''},
          {label: 'Ryan Rabello | Groomsman', image: '', description: ''},
        ],
      }
    },
  }
</script>

<style scoped>
  .card__media.circle {
    border-color: white;
    border-radius: 50% !important;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
  }

</style>
