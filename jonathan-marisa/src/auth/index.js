// src/auth/index.js

import router from '../router'

let axios = require('axios')

// URL and endpoint constants
const API_URL = 'https://api.jonathan-marisa.com'
const LOGIN_URL = API_URL + '/token-auth/'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login(context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds).then((response) => {
      console.log(response)
      localStorage.setItem('access_token', response.data.token)

      this.user.authenticated = true
      axios.defaults.headers.common['Authorization'] = this.getAuthHeader()
      // Redirect to a specified route
      if(redirect) {
        router.push(redirect)
      }

    }).catch((err) => {
      context.message = 'ERROR: LOGIN FAILED'
    })
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('access_token')
    this.user.authenticated = false
    axios.defaults.headers.common['Authorization'] = ''
  },

  checkAuth() {
    var jwt = localStorage.getItem('access_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    if(localStorage.getItem('access_token') != null){
      return 'Token ' + localStorage.getItem('access_token')
    }else{
      return ''
    }
  }
}
