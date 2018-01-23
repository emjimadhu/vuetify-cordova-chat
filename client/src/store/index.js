import Vue from 'vue'
import Vuex from 'vuex'

import login from '@/app/login/vuex'
import chats from '@/app/chat-window/vuex'
import input from '@/components/chat-input/vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    chats,
    input
  }
})
