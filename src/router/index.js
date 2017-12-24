import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Sort from '@/pages/Sort'
import Content from '@/pages/Content'
import UserActive from '@/pages/UserActive'

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
    },
    {
      path: '/content/:id',
      name: 'Content',
      component: Content
    },
    ,
    {
      path: '/user_active/:id',
      name: 'UserActive',
      component: UserActive
    }
  ]
})
