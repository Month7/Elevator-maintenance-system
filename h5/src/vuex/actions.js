export default {
    //新增笔记
    addNote({commit},username){
        commit('init',username);
    },
    changeMsg({commit},msg){
        commit('changeMsg',msg);
    },
    addMsg({commit},msg){
        commit('addMsg',msg)
    },
    // 注册页进入下一步
    nextStep({commit}){
        commit('nextStep')
    },
    // 注册页状态初始化
    initStep({commit}){
        commit('initStep')
    }
}