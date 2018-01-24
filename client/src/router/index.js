import Vue from 'vue'
import Router from 'vue-router'
import chatWindow from '@/app/chat-window'
import login from '@/app/login'
import profile from '@/app/profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      beforeEnter: (to, from, next) => {
        const authToken = localStorage.getItem('authUser')
        if (authToken) {
          next({name: 'chat-window'})
        } else {
          next()
        }
      }
    },
    {
      path: '/chat',
      name: 'chat-window',
      component: chatWindow,
      beforeEnter: (to, from, next) => {
        const authToken = localStorage.getItem('authUser')
        if (authToken) {
          next()
        } else {
          next({name: 'login'})
        }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      beforeEnter: (to, from, next) => {
        const authToken = localStorage.getItem('authUser')
        if (authToken) {
          next()
        } else {
          next({name: 'login'})
        }
      }
    }
  ]
})
