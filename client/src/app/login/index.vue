<template lang="html">
  <div>
    <v-container fluid>
      <v-card color="white" class="pa-4">
        <v-card-text>
          <h3 class="primary--text">Login</h3>
        </v-card-text>
        <v-layout row wrap>
          <v-text-field
            label="Username"
            v-model="username"
            required
            light
            @keyup.enter="signin"
          />
          <v-flex xs12>
            <v-btn color="red" block @click="googleLogin">
              sign in with google
            </v-btn>
          </v-flex>
          <!-- <v-flex xs12>
            <v-btn color="blue" block>
              facebook
            </v-btn>
          </v-flex> -->
        </v-layout>
        <v-layout row>
          <v-btn color="primary" @click="signin">
            Login
          </v-btn>
        </v-layout>
      </v-card>
    </v-container>

    <global-alert
      :alert="alert"
      :alertColor="alertColor"
      :alertMSG="alertMSG"
    />
  </div>
</template>

<script type="text/javascript">
import firebase from 'firebase'
import globalAlert from '@/components/global-alert'

export default {
  name: 'login',
  components: {
    'global-alert': globalAlert
  },
  data: () => ({
    alert: false,
    alertColor: '',
    alertMSG: '',
    username: ''
  }),
  methods: {
    signin () {
      if (this.username !== '') {
        let authUser = {
          displayName: this.username
        }
        localStorage.setItem('authUser', JSON.stringify(authUser))
        this.$store.commit('SET_AUTHUSER', authUser)
        this.$router.push({
          name: 'chat-window'
        })
      } else {
        this.alert = true
        this.alertColor = 'error'
        this.alertMSG = 'Username is Required'
      }
    },
    googleLogin () {
      let provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
        .then((result) => {
          localStorage.setItem('result', JSON.stringify(result))
          return firebase.auth().getRedirectResult()
        })
        .then((data) => {
          if (data.credential) {
            // let token = data.credential.accessToken
            let response = data.user
            let authUser = {
              id: response.uid,
              displayName: response.displayName,
              email: response.email,
              phoneNumber: response.phoneNumber,
              photoURL: response.photoURL,
              googleLogin: true,
              facebookLogin: false
            }
            localStorage.setItem('authUser', JSON.stringify(authUser))
            this.$store.commit('SET_AUTHUSER', authUser)
            this.$router.push({
              name: 'chat-window'
            })
          }
        })
        .catch((error) => {
          this.alert = true
          this.alertColor = 'error'

          const errorCode = error.code
          const serverErrorMessage = error.message
          const email = error.email
          // const credential = error.credential

          if (errorCode === 'auth/account-exists-with-different-credential') {
            firebase.auth().fetchProvidersForEmail(email)
              .then((res) => {
                this.alertMSG = 'It seems you already used this email to login with Facebook. Please use Facebook Signin instead.'
              })
          } else if (errorCode === 'auth/email-already-in-use') {
            this.alertMSG = 'This Email is already used for other Account.'
          } else {
            this.alertMSG = serverErrorMessage
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.full-screen {
  height: 100vh;
  width: 100%;
}
</style>
