import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import MDetail from '../components/MDetail'
import Test from '../components/Test'
import Signup from '../components/Signup'
import Forget from '../components/Forget'
import Index from '../components/Index'
import Task from '../components/Task'
import Pingjia from '../components/Pingjia'
import Help from '../components/Help'
import HelpDetail from '../components/Help-detail'
import Notice from '../components/Notice'
import NoticeShow from '../components/NoticeShow'
import EditName from '../components/EditName'

const Work = () => import('../components/Work');
const Personal = () => import('../components/Personal');
const Finished = () => import('../components/Finished');
const Address = () => import('../components/Address');
const Message = () => import('../components/Message');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/personal',
      name: 'Personal',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Personal
    },{
      path: '/work',
      name: 'Work',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Work
    },{
      path: '/finished/:status',
      name: 'Finished',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Finished
    },{
      path: '/address',
      name: 'Address',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Address
    },{
      path: '/message',
      name: 'Message',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Message
    },{
      path: '/detail',
      name: 'MDetail',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: MDetail
    },{
      path: '/test',
      name: 'Test',
      component: Test
    },{
      path: '/signup',
      name: 'Signup',
      component: Signup
    },{
      path: '/forget',
      name: 'Forget',
      component: Forget
    },{
      path: '/task',
      name: 'Task',
      component: Task
    },{
      path: '/pingjia/:id',
      name: 'Pingjia',
      component: Pingjia
    },{
      path: '/help',
      name: 'Help',
      component: Help
    },{
      path: '/helpdetail/:status',
      name: 'HelpDetail',
      component: HelpDetail
    },{
      path: '/submitnotice',
      name: 'Notice',
      component: Notice
    },{
      path:'/notice',
      name: 'NoticeShow',
      component: NoticeShow
    },{
      path: '/editname',
      name: 'EditName',
      component: EditName
    }
  ]
})


