<template lang="html">
  <div>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      width="200"
    >
      <v-list>
        <v-list-tile :to="{ name: 'profile' }">
          <v-list-tile-action>
            <v-icon>people</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>people</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>Chatly</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat :to="{ name: 'profile' }">Profile</v-btn>
        <v-btn flat @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container fluid class="chat-window" id="chat-window">
      <v-layout
        row
        class="bottom pb-3"
        :class="{ 'right': message.owner, 'left': !message.owner }"
        v-for="(message, index) in messages" :key="index">
        <v-flex xs12>
          <v-card flat :class="{ 'deep-orange': !message.owner }">
            <v-card-text>
              <v-layout row wrap v-if="message.owner">
                <v-flex xs11 class="pa-2">
                  <h4 class="text-xs-right">{{ message.text }}</h4>
                  <p style="position:absolute;bottom:-12px;font-size:10px;">{{ message.date }} - {{ message.name }}</p>
                </v-flex>
                <v-flex xs1>
                  <v-avatar class="white" size="32px">
                    <img :src="message.image">
                  </v-avatar>
                </v-flex>
              </v-layout>
              <v-layout row wrap v-if="!message.owner">
                <v-flex xs1>
                  <v-avatar class="white" size="32px">
                    <img :src="message.image">
                  </v-avatar>
                </v-flex>
                <v-flex xs11 class="pl-3">
                  <h4>{{ message.text }}</h4>
                  <p style="position:absolute;bottom:-12px;font-size:10px;">{{ message.date }} - {{ message.name }}</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <chat-input
      @sendMessage="sendMessage"
    />

    <global-alert
      :alert="alert"
      :alertColor="alertColor"
      :alertMSG="alertMSG"
    />
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'

import firebase from 'firebase'

import chatInput from '@/components/chat-input'
import globalAlert from '@/components/global-alert'

export default {
  name: 'chat-window',
  components: {
    'chat-input': chatInput,
    'global-alert': globalAlert
  },
  computed: {
    ...mapGetters({
      messages: 'messages'
    })
  },
  data: () => ({
    alert: false,
    alertColor: '',
    alertMSG: '',
    clipped: false,
    drawer: false,
    miniVariant: false
  }),
  methods: {
    sendMessage () {
      const authUser = this.$store.getters.authUser
      let obj = {
        text: this.$store.getters.message,
        image: authUser.photoURL,
        name: authUser.displayName,
        date: new Date()
      }
      this.$socket.emit('send', obj)
      this.$store.commit('SET_MESSAGE', '')
    },
    logout () {
      firebase.auth().signOut()
        .then(() => {
          localStorage.removeItem('authUser')
          this.$store.commit('SET_AUTHUSER', '')
          this.$router.push({
            name: 'login'
          })
        })
        .catch((error) => {
          this.alert = true
          this.alertColor = 'error'
          this.alertMSG = error.message
        })
    }
  },
  socket: {
    events: {
      message (data) {
        const authUser = JSON.parse(localStorage.getItem('authUser'))
        let arr = this.$store.getters.messages
        if (authUser.displayName === data.name) {
          data.owner = true
        } else {
          data.owner = false
        }
        arr.push(data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-window {
  position: relative;
  height: calc(100vh - 48px);
  width: 100%;
}

.bottom {
  bottom: 10px;
  position: relative;
  width: 100%;
}

.right {
  right: 10px;
}

.left {
  left: 10px;
}
</style>
