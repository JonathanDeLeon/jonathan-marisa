<template>
  <div id="wedding">
    <dashboard :cover-title="title" :background="background" :init-resize="false"></dashboard>
    <v-container>
      <v-layout align-center wrap>
        <v-flex xs12>
          <h3 class="display-header text-xs-center">Bella Vista Groves</h3>
          <v-layout justify-center wrap>
            <v-flex xs12 md7>
              <v-card-media height="450"
                            src="/static/media/Bella_Vista_Groves_Wedding_0036.jpeg"></v-card-media>
            </v-flex>
            <v-flex xs12 md6 mt-3>
              <p class="text-xs-center">
                We both fell in love with this hidden gem! Surrounded by enchanting flowers, stunning orchards, and the
                glorious Pacific Ocean, <em>Bella Vista Groves</em> is a private location perfect for our special
                wedding day. We can’t wait to celebrate with <em>you</em> in this beautiful, romantic place.
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
    <v-parallax :height="$vuetify.breakpoint.mdAndUp ? 300 : 200"
                src="https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_600/b_rgb:4f4c4c,o_85/parallax.jpg">
      <v-layout column align-center justify-center>
        <h2 class="display-header text-xs-center white--text">Bridesmaids</h2>
      </v-layout>
    </v-parallax>
    <v-container my-5>
      <v-layout align-center wrap>
        <v-flex xs12>
          <!--<h3 class="display-header text-xs-center">Bridesmaids</h3>-->
          <v-layout align-center justify-center wrap v-for="(bridesmaid, index) in bridesmaids" :key="index">
            <v-flex xs10 sm5 md4 lg3 :class="(index+1)%2==0 ? 'order-md2' : ''">
              <v-layout wrap>
                <v-flex xs12>
                  <v-card-media class="circle" height="290" :src="bridesmaid.image"></v-card-media>
                </v-flex>
                <v-flex xs12 text-xs-center class="bridesmaid-label">
                  <v-card-media contain class="mt-2" height="25"
                                :src="(index+1)%2==0 ? '/static/media/test2.png' : '/static/media/test3.png'"></v-card-media>
                  <p class="title mt-2 mb-2">{{bridesmaid.label.slice(0, bridesmaid.label.indexOf('|')).trim()}}</p>
                  <p class="caption">{{bridesmaid.label.slice(bridesmaid.label.indexOf('|')+1).trim()}}</p>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs10 md6 :class="$vuetify.breakpoint.mdAndUp ? (index+1)%2==0 ? 'pr-3' : 'pl-4' : 'pb-4'">
              <p>{{bridesmaid.description}}</p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-parallax :height="$vuetify.breakpoint.mdAndUp ? 300 : 200"
                src="https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_600/b_rgb:4f4c4c,o_85/parallax2.png">
      <v-layout column align-center justify-center>
        <h2 class="display-header text-xs-center white--text">Groomsmen</h2>
      </v-layout>
    </v-parallax>
    <v-container my-5>
      <v-layout align-center wrap>
        <v-flex xs12>
          <!--<h3 class="display-header text-xs-center">Groomsmen</h3>-->
          <v-layout align-center justify-center wrap v-for="(groomsman, index) in groomsmen" :key="index">
            <v-flex xs10 sm5 md4 lg3 :class="(index+1)%2==0 ? 'order-md2' : ''">
              <v-layout wrap>
                <v-flex xs12>
                  <v-card-media class="circle" height="290"
                                :src="groomsman.image || 'https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_scale,h_180/image-not-found.png'"></v-card-media>
                </v-flex>
                <v-flex xs12 text-xs-center class="groomsman-label">
                  <v-card-media contain class="mt-2" height="20"
                                :src="(index+1)%2==0 ? '/static/media/test9.png' : '/static/media/test8.png'"></v-card-media>
                  <p class="title mt-2 mb-2">{{groomsman.label.slice(0, groomsman.label.indexOf('|')).trim()}}</p>
                  <p class="caption">{{groomsman.label.slice(groomsman.label.indexOf('|')+1).trim()}}</p>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs10 md6 :class="$vuetify.breakpoint.mdAndUp ? (index+1)%2==0 ? 'pr-3' : 'pl-4' : 'pb-4'">
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
          backgroundImage: 'url(https://res.cloudinary.com/jonathan-marisa/image/upload/f_auto/c_crop,h_1024,w_1067,y_200/MarandJonEngagedEdits-130.jpg)',
          height: window.innerHeight+'px'
        },
        bridesmaids: [
          {
            label: 'Edelweiss Pandjaitan | Maid of Honor',
            image: '/static/media/edel.png',
            description: 'I became best friends with Edel almost instantaneously. We had so much in common that we connected so easily! Shes’s super fashionable and takes amazing pictures. I knew anytime I wanted to go out, Edel would be my girl! We’ve had some of the most spontaneous adventures together. She’s the best secret keeper, an amazing listener and always knows all the HG (hot gossip)!'
          },
          {
            label: 'Kristina Hall | Maid of Honor',
            image: '/static/media/kris.png',
            description: 'I met Kristina freshman year and we have been inseparable ever since! We’ve had almost every class together and even lived together for a whole summer. Our friendship grew so deep and the loyalty we have is absolutely irreplaceable! She’s insanely smart, beautiful, and always finds a way to make me laugh!'
          },
          {
            label: 'Tania Baranov | Bridesmaid',
            image: '/static/media/tania.png',
            description: 'Tania is one of the most lovable humans I know! She is the kind of girl that lights up any room she walks into. I can totally see us having a life-long friendship and even our kids growing up together! She’s beautiful, smart, and an amazing cook. There is never a dull moment with her!'
          },
          {
            label: 'Haley Muncy | Bridesmaid',
            image: '/static/media/hailey.png',
            description: 'One of my best friends who I completely adore. She has a heart of gold and a free spirit. Haley never fails to put me in a good mood and I feel like I can truly be myself around her. Her maturity and genuine personality is so refreshing. Our minds think so much alike that we could spend hours in deep conversations.'
          },
          {
            label: 'Daniela Rivas | Bridesmaid',
            image: '/static/media/daniela.png',
            description: 'Daniela is one of my best friends from high school. I remember the first day I met her she was so friendly and beautiful! We first connected because of our Salvadorian backgrounds & stayed friends ever since. She was my wing woman to get Jonathan to ask me to be his girlfriend. Daniela is someone I know I can always count on. She’s super fun to be around & she is also very talented at baking!'
          },
          {
            label: 'Miriam Leon | Bridesmaid',
            image: '/static/media/miriam.png',
            description: 'Miriam is my brother’s beautiful girlfriend. She is not only an amazing girlfriend to my brother but she is super considerate and helpful to my family. I can totally see her being part of our family one day. She is a confident, super loving and very down to earth type of woman.'
          },
          {
            label: 'Jaleesa De Leon | Junior Bridesmaid',
            image: '/static/media/jaleesa.png',
            description: 'My future sister-in-law. I first met her when she was only 7 years old. I remember how little she was & I love how Jonathan treats her and takes care of her. I’ve watched her grow into a beautiful young lady & I can’t wait to be family!'
          },
        ],
        groomsmen: [
          {
            label: 'Jeremy Del Pozo | Best Man',
            image: '/static/media/jeremy.jpg',
            description: 'The homie since Kindergarten. What more can I say? We studied together, worshipped together, traveled together, and played soccer together. We became the dynamic duo playing soccer until we met Oliver. This guy has a caring heart, he has been there for me in countless ways. Not to mention he loves hearing about all the gossip.'
          },
          {
            label: 'Oliva Peña | Best Man',
            image: '/static/media/oliver.png',
            description: 'The second homie since freshman year of high school. Oliver was a new student at SGA and after the first set of soccer practices, we immediately hit it off and became the triple threat with Jeremy. We spent a summer colporteuring together where we grew closer as brothers. He never runs out of jokes to say and is the life of the party.'
          },
          {
            label: 'Isaiah Leon | Groomsman',
            image: '/static/media/isaiah.png',
            description: 'My future brother-in-law. A film fanatic/critic (Star Wars), I love hearing his profound opinions on the latest and greatest. He is confident and super fun to be around. I am blessed to have him part of my future family and excited to go on many more adventures with him.'
          },
          {
            label: 'Aaron Martinez| Groomsman',
            image: '/static/media/aaron.jpg',
            description: 'This guy! My Nicaraguense brother! Little did we know that when we met during college days for soccer tryouts that we would become best friends. We both got invited to go to Costa Rica for a soccer tour and had the most enjoyable time of our lives on the pitch and traveling. No matter what, Aaron is someone I can count on.'
          },
          {
            label: 'Ethan Beaver | Groomsman',
            image: '',
            description: 'Ethan, my first and last college roommate. Going from the dorms to having our own apartment together, we turned out to be an excellent match. He is super smart and a great guy to be around, unless Liverpool and Manchester United were playing each other (in a good way).'
          },
          {
            label: 'Matthew Fennell | Groomsman',
            image: '',
            description: 'A master of coming up with unique, fun things to do, Matt is a super chill guy. I love talking to him about video games, youtube videos, and any scandals going on in the world. If you ever want to throw a solid video game party or even go camping, he is the one to contact.'
          },
          {
            label: 'Ryan Rabello | Groomsman',
            image: '',
            description: 'I love talking to Ryan about random stuff. He’s one of the guys in Walla Walla that I spend a lot of time with. He is a very smart programmer and is optimistic with ambitious goals. Often times, you’ll find us watching amazing shows like Silicon Valley and Westworld together.'
          },
        ],
      }
    },
  }
</script>

<style scoped>
  .v-card__media.circle {
    border-color: white;
    border-radius: 50% !important;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
  }

  .bridesmaid-label p.title, .groomsman-label p.title {
    font-family: "Bombshell Pro", "proxima-nova", "Lato", "Lucida Sans Unicode", "Lucida Grande", sans-serif !important;
  }

  .bridesmaid-label p {
    color: #ffbcd4;
  }

  .groomsman-label p {
    color: rgba(0, 0, 0, .54);
  }

</style>
