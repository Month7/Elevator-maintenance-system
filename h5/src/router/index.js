import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Work from '../components/Work'
import Personal from '../components/Personal'

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
    }
  ]
})


