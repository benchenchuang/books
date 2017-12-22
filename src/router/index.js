import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Sort from '@/pages/Sort'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/sort',
      name: 'Sort',
      component: Sort
    }
  ]
})
