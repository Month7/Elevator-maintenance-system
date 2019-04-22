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
    },
    // 注册 手机号
    registerPhone({commit},phone){
        commit('registerPhone',phone)
    },
    // 注册 密码
    registerPassword({commit},password){
        commit('registerPassword',password)
    },
    // 注册 类型
    registerType({commit},type){
        commit('registerType',type)
    },
    // 重置注册信息
    resetRegisterInfo({commit}){
        commit('resetRegisterInfo')
    }
}