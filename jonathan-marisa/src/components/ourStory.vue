<template>
  <div id="our-story">
    <v-container>
      <v-layout wrap>
        <v-flex xs12>
          <v-layout justify-center>
            <v-flex xs12 md10>
              <v-card-media :height="$vuetify.breakpoint.smAndUp ? 250 : 100" contain
                            src="/static/media/our_story.png"></v-card-media>
            </v-flex>
          </v-layout>
          <p class="text-xs-center" :class="$vuetify.breakpoint.smAndUp ? 'title' : 'body-2'"
             style="letter-spacing: 0.5em !important;">Highschool Sweethearts</p>
          <v-layout justify-center>
            <v-flex xs12 md10>
              <v-card-media :height="$vuetify.breakpoint.smAndUp ? 250 : 180" contain
                            src="/static/media/love.png"></v-card-media>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md6 px-2>
          <v-layout justify-center wrap>
            <v-flex xs10 class="text-xs-center">
              <h3 class="display-header mt-4">From Her</h3>
            </v-flex>
            <v-flex xs12>
              <v-card>
                <v-card-text class="px-4 pt-4 pb-5 text-md-center">
                  It was my first day at San Gabriel Academy of 8th grade. I remember walking into the classroom and
                  immediately seeing Jonathan and thinking he was cute. Of course I didn’t say anything because I was so
                  shy! So, I secretly crushed on him until we finally became friends in high school. He approached me in
                  math class because he “needed help”. Little did I know he was a genius! We began messaging on Facebook
                  and I instantly felt a connection with him. No guy had ever shown me such genuine, kind, and
                  wholehearted interest before and this is what made me fall in love with him. He officially asked me to
                  be his girlfriend on the night of Journey to Bethlehem – our school’s Christmas event – after three
                  months of dating. He was always so romantic and over the top for me! He once surprised me by
                  decorating my entire room to ask me to winter formal, he brought me breakfast every day to school, and
                  he showed me what it meant to know God personally. I fell in love with this boy so fast. He had every
                  quality I prayed for my future husband to have. Jonathan De Leon is the love of my life! He is truly
                  my best friend in the whole world. He knows everything about me and is the one I tell everything to.
                  Knowing that I am marrying my absolute best friend in life, my sweetheart and soulmate is the absolute
                  best feeling. I couldn’t be more in love with you Jonathan and I can’t wait to say “I do”!
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md6 px-2>
          <v-layout justify-center wrap>
            <v-flex xs10 class="text-xs-center">
              <h3 class="display-header mt-4">From Him</h3>
            </v-flex>
            <v-flex xs12>
              <v-card>
                <v-card-text class="px-4 pt-4 pb-5 text-md-center">
                  It was my first day at San Gabriel Academy of 8th grade. I remember walking into the classroom and
                  immediately seeing Jonathan and thinking he was cute. Of course I didn’t say anything because I was
                  so
                  shy!
                  So I secretly crushed on him until we finally became friends in high school. He approached me in
                  math
                  class
                  because he “needed help”. Little did I know he was a genius! We began messaging on Facebook and I
                  instantly
                  felt a connection with him. No guy had ever shown me such genuine, kind, and wholehearted interest
                  in
                  me
                  before and this is what made me fall in love with him. He officially asked me to be his girlfriend
                  on
                  the
                  night of Journey to Bethlehem – our Christmas event – after three months of dating. He was always so
                  romantic and over the top for me! He surprised me by decorating my entire room to ask me to winter
                  formal,
                  he brought me breakfast every day to school, and he showed me what it meant to know God personally.
                  I
                  fell
                  in love with this boy so fast. He has every quality I wanted in my future husband. Jonathan is the
                  love of
                  my life! He is truly my best friend. He knows everything about me and he is the one that I tell
                  everything.
                  Knowing that you are marrying your absolute best friend in life, your sweetheart and soulmate is the
                  absolute best feeling. I couldn’t be more in love with you Jonathan and I can’t wait to say “I do”!
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
  export default {
    name: "ourStory"
  }
</script>

<style scoped>
  #app .title {
    font-family: 'Libre Baskerville', serif !important;
  }
</style>
