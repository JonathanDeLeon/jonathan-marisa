// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'

import App from './App'
import modalRenderer from './_common/modalRenderer'
import dashboard from './_common/dashboard'
import navbar from './_common/navbar'
import youtube from './_common/youtube'
import listPhotos from './components/Photo'
import './components/modal/_module';

import router from './router'
import auth from './auth'
import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.use(Vuetify);
Vue.component('modal-renderer', modalRenderer);
Vue.component('dashboard', dashboard);
Vue.component('navbar', navbar);
Vue.component('youtube', youtube);
Vue.component('list-photos', listPhotos);

Vue.config.productionTip = false;
/**
 * Axios definition
 */
let axios = require('axios');
// axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.baseURL = 'https://api.jonathan-marisa.com'
axios.defaults.headers.post['Content-Type'] = 'application/json';
auth.checkAuth();
axios.defaults.headers.common['Authorization'] = auth.getAuthHeader();
Vue.prototype.$http = axios;
Vue.prototype.$user =  auth.user;


/* eslint-disable no-new */
new Vue({
  router,
  template: '<App/>',
  components: { App },
}).$mount('#app');
