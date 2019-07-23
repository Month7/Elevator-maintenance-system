// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import qs from 'qs';
import Vconsole from 'vconsole'
import 'element-ui/lib/theme-chalk/index.css';
import getUrl from './config';
import io from 'socket.io-client';
// 引入element ui组件
import { Select,Option,DatePicker,TimePicker,Input,Button,Rate,Icon,Dialog,Form } from 'element-ui';
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Input)
Vue.use(Button)
Vue.use(Rate)
Vue.use(Icon)
Vue.use(Dialog)
Vue.use(Form)
// let vcosnole = new Vconsole()
// qs插件
Vue.prototype.$qs = qs;

// socket.io
var url = getUrl();
var socket = io(`${url}`);
Vue.prototype.$socket = socket;

// 生产模式
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
  mounted(){
    document.dispatchEvent(new Event('render-event'));
  }
})

router.beforeEach((to, from, next) => { 
  if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆 
   if (sessionStorage.getItem('token')) { // 查询本地存储信息是否已经登陆 
    next(); 
   } else { 
    next({ 
     path: '/login', // 未登录则跳转至login页面 
     query: {redirect: to.fullPath} // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面 
     }); 
   } 
  } else { 
   next(); 
  } 
 });

