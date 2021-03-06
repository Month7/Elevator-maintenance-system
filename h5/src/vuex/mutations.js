export default {
    // 聊天msg
    addMsg(state,msg){
        state.msgs.push(msg);
    },
    initMsg(state,msg) {
        state.msgs = msg;
    },
    // 注册页进入下一步
    nextStep(state){
        state.signupState ++;
    },
    // 注册页状态重置
    initStep(state){
        state.signupState = 1;
    },
    // 注册 手机号
    registerPhone(state,phone){
        state.signupData.phone = phone;
    },
    // 注册 密码
    registerPassword(state,password){
      state.signupData.password = password;
    },
    // 注册 类型
    registerType(state,type) {
      state.signupData.type = type;
    },
    // 注册 绑定的邮箱
    registerEmail(state,email) {
      state.signupData.email = email;
    },
    // 重置 注册信息
    resetRegisterInfo(state){
        state.signupData = {
            phone: '',
            password: '',
            type: 0,
            email: null
        }
    }
}