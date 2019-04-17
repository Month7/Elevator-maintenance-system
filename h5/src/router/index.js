import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Work from '../components/Work'
import Personal from '../components/Personal'
import Finished from '../components/Finished'
import Address from '../components/Address'
import Message from '../components/Message'
import MDetail from '../components/MDetail'
import Test from '../components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/personal',
      name: 'Personal',
      component: Personal
    },{
      path: '/work',
      name: 'Work',
      component: Work
    },{
      path: '/finished',
      name: 'Finished',
      component: Finished
    },{
      path: '/address',
      name: 'Address',
      component: Address
    },{
      path: '/message',
      name: 'Message',
      component: Message
    },{
      path: '/detail',
      name: 'MDetail',
      component: MDetail
    },{
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})


