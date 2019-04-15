import Vuex from 'vuex'
import Vue from 'vue'

import actions from './actions.js';
import mutations from './mutations';

Vue.use(Vuex)

const state = {
    username: 'yes'
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
   
})