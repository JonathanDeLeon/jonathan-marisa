import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Album from '@/components/Album'
import ViewAlbum from '@/components/ViewAlbum'
import Gallery from '@/components/Gallery'
import Login from '@/components/Login'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
      path: '/album/:album_id',
      name: 'view-album',
      component: ViewAlbum
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})
