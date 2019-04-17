export default {
    init(state,username) {
        state.username = username;
        console.log(username);
        alert(username)
    },
    changeMsg(state,msg){
        state.msg = msg;
    },
    addMsg(state,msg){
        state.msgs.push(msg);
    }
}