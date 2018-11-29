import Vue from 'vue'

import albumCreateEdit from './album/createEdit';
import addPhotosToAlbum from './album/addPhotos';

import uploadPhotos from './photo/uploadPhotos'
import editPhoto from './photo/edit'
import massEditPhoto from './photo/massEdit'

Vue.component('album-create-edit', albumCreateEdit);
Vue.component('album-add-photos', addPhotosToAlbum);

Vue.component('upload-photos', uploadPhotos);
Vue.component('edit-photo', editPhoto);
Vue.component('mass-edit-photo', editPhoto);
