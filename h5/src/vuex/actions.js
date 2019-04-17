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
    }
}