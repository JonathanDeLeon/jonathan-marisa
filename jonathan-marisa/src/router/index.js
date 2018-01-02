import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Album from '@/components/Album'
import ViewAlbum from '@/components/ViewAlbum'
import EditAlbum from '@/components/EditAlbum'
import Gallery from '@/components/Gallery'


Vue.use(Router)

export default new Router({
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
      path: '/album/:album_id',
      name: 'view-album',
      component: ViewAlbum
    },
    {
      path: '/album/edit/:album_id',
      name: 'edit-album',
      component: EditAlbum
    },
    {
      path: '/photos',
      name: 'gallery',
      component: Gallery
    },
  ]
})
