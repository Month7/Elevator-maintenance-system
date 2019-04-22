import Vuex from 'vuex'
import Vue from 'vue'

import actions from './actions.js';
import mutations from './mutations';

Vue.use(Vuex)

const state = {
    username: 'Month',
    msg: 'default',
    msgs: [],                //
    signupState: 1,        // 注册页状态
    signupData: {          // 注册的数据
        phone: '',
        password: '',
        type: ''
    }         
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
})