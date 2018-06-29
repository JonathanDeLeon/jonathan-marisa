import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/home'
import Album from '@/components/album'
import ViewAlbum from '@/components/viewAlbum'
import Gallery from '@/components/gallery'
import Login from '@/components/login'
import Wedding from '@/components/wedding'
import Proposal from '@/components/proposal'
import OurStory from '@/components/ourStory'


Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/wedding',
      name: 'wedding',
      component: Wedding
    },
    {
      path: '/our-story',
      name: 'ourStory',
      component: OurStory
    },
    {
      path: '/proposal',
      name: 'proposal',
      component: Proposal
    },
    {
      path: '/album',
      name: 'album',
      component: Album
    },
    {
      path: '/album/photos',
      name: 'gallery',
      component: Gallery
    },
    {
      path: '/album/:id',
      name: 'view-album',
      component: ViewAlbum,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: 'home',
      component: Home
    }
  ]
})
