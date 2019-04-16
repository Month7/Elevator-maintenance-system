<template>
    <div class="container">
        <div class="header">
            <img src="../../static/电梯.png" />
            <div>电梯保</div>
        </div>
        <!--input-->
        <div class="input-container">
            <div class="login-input-container" style="position:relative">
                <input class="login-input" v-model="username"  />
                <div class="input-img">
                    <img src="../../static/用户.png" />手机号
                </div>
            </div>
            <div class="login-input-container" style="position:relative">
                <input class="login-input" v-model="password" />
                <div class="input-img">
                    <img src="../../static/密码.png" />  密  码
                </div>
            </div>
        </div>
        <!--radio-->
        <div class="radios">
            <label>
                <input type="radio" v-model="picked" value="weibao"/>维保人员
            </label>
            <label>
                <input type="radio" v-model="picked" value="jianyan"/>检验人员
            </label>
            
        </div>
        <!--button-->
        <div class="buttons">
            <button class="button" @click="login">登  录</button>
            <button class="button-signin" @click="signin">注  册</button>
        </div>
        <!--forget-->
        <div class="forget-container">
            <a class="forget" href="#">忘记密码？</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Login',
    data(){
        return {
            username: "",
            password: "",
            picked: 'weibao'
        }
    },    
    methods:{
        // 登录
        login:function (){
            console.log(this.username);
            window.postMessage('test');
        },
        // 注册
        signin:function () {
            console.log('注册!');
        }
    }
}
</script>
<style scoped>
.container{
    padding: 0;
    margin: 0;
    background: rgb(30,129,210);
    height: 100%;
    width: 100%;
    
}
.header{
    height: 6rem;
    text-align: center;
    width: 100%;
    color: #fff;
    padding:2rem 0;
}
.contenr-main{
    display: flex;
}
.login-input{
    border: none;
    background: transparent;
    border-bottom: 0.1rem solid #fff;
    padding-bottom: 0.2rem;
    font-size: 1.2rem;
    outline: none;
    padding-left: 4rem;
   
}
.input-container{
    text-align: center;
    width: 100%;
}
.input-img{
    position: absolute;
    left: 0;
    top:0;
}
.login-input-container{
    width: 85%;
    position: relative;
    margin: auto;
    color: #fff;
    overflow: hidden;
    margin-bottom: 1rem;
}
.buttons{
    text-align: center;
}
.button{
    border: none;
    outline: none;
    background: #fff;
    width: 85%;
    height: 2.7rem;
    line-height: 2.7rem;
    color: rgb(30,129,210);
    font-size: 1rem;
    border-radius: 2rem
}
.button-signin{
    margin-top:1rem;
    border: 1px solid #fff;
    outline: none;
    background: #fff;
    width: 85%;
    height: 2.7rem;
    line-height: 2.7rem;
    background: rgb(30,129,210);
    color: #fff;;
    font-size: 1rem;
    border-radius: 2rem
}
.radios{
    width: 85%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
    color: #fff;
}
.forget-container{
    display: flex;
    justify-content: center;
    padding: 1rem;
    font-size: 0.7rem;
}
.forget{
    color: #fff;
}
</style>
