import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Album from '@/components/Album'
import ViewAlbum from '@/components/ViewAlbum'
import Gallery from '@/components/Gallery'
import Login from '@/components/Login'
import wedding from '@/components/wedding'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/wedding',
      name: 'wedding',
      component: wedding
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
