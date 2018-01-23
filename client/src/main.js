// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueWebsocket from 'vue-websocket'
import App from './App'
import router from './router'
import store from './store'

import firebase from 'firebase'
import consts from '@/utils/consts'

import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.use(Vuetify)
Vue.use(VueWebsocket, 'https://shielded-savannah-59227.herokuapp.com/')

Vue.config.productionTip = false

const initApp = () => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    created () {
      firebase.initializeApp(consts.firebase)
    },
    template: '<App/>'
  })
}

// Initializing app after the deviceready event is triggered.
document.addEventListener('deviceready', () => {
  // initializing app...
  initApp()
})

// If we are not in Cordova, manually trigger the deviceready event
const isCordovaApp = (typeof window.cordova !== 'undefined')
if (!isCordovaApp) {
  document.dispatchEvent(new CustomEvent('deviceready', {}))
}
