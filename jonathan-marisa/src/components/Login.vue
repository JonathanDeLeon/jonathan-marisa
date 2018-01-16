<template>
  <v-layout row class="mt-5">
    <v-flex xs12 sm4 offset-sm4>
      <v-card>
        <v-card-title class="blue white--text">
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-alert color="success" v-if="message" value="true">{{message}}</v-alert>
          <v-flex xs12>
            <v-text-field label="Username" v-model="credentials.username"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Enter your password" hint="At least 8 characters"
              v-model="credentials.password"
              min="8"
              :append-icon="visible ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (visible = !visible)"
              :type="visible ? 'password' : 'text'"
              counter
            ></v-text-field>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submit()">Access</v-btn>
          <v-btn color="red darken-1" @click="logout">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import auth from '../auth'

  export default {
    name: "login",
    data() {
      return {
        visible: true,
        credentials: {
          username: '',
          password: ''
        },
        message: ''
      }
    },
    methods: {
      submit() {
        let credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }
        auth.login(this, credentials, '/album')
      },
      logout() {
        auth.logout()
        this.message = "Logout Successful"
      }
    }
  }
</script>

<style scoped>

</style>
