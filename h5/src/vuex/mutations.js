export default {
    init(state,username) {
        state.username = username;
        alert(username)
    },
    changeMsg(state,msg){
        state.msg = msg;
    },
    addMsg(state,msg){
        state.msgs.push(msg);
    },
    // 注册页进入下一步
    nextStep(state){
        state.signupState ++;
    },
    // 注册页状态重置
    initStep(state){
        state.signupState = 1;
    }   
}