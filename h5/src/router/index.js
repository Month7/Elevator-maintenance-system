import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Work from '../components/Work'
import Personal from '../components/Personal'
import Finished from '../components/Finished'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/personal',
      name: 'Login',
      component: Personal
    },{
      path: '/work',
      name: 'Work',
      component: Work
    },{
      path: '/finished',
      name: 'Finished',
      component: Finished
    }
  ]
})


