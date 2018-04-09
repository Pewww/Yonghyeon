import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup'
import check from '@/components/check'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/check',
      name: 'check',
      component: check
    }
  ]
})
