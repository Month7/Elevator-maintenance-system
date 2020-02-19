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
                <input class="login-input" v-model="password" type="password" />
                <div class="input-img">
                    <img src="../../static/密码.png" />  密  码
                </div>
            </div>
        </div>
        <!--radio-->
        <div class="radios">
            <label>
                <input type="radio" v-model="picked" value="0"/>维保人员
            </label>
            <label>
                <input type="radio" v-model="picked" value="1"/>检验人员
            </label>
        </div>
        <!--button-->
        <div class="buttons">
            <button class="button" @click="login">登  录</button>
            <router-link to="/signup" class="button-signin">注  册</router-link>
        </div>
        <!--forget-->
        <div class="forget-container">
            <router-link to="/forget" class="forget">忘记密码？</router-link>
        </div>
        <Warning :show="this.showWarning" :msg="this.msg"></Warning>
        <z-button type="warn">233</z-button>
    </div>
</template>
<script>
import axios from 'axios'
import Warning from '../common/Warning'
import getUrl from '../config.js';
export default {
    name: 'Index',
    data(){
        return {
            username: "",
            password: "",
            picked: '0',
            showWarning: false,
            msg: ''
        }
    },    
    components:{
        Warning
    },
    methods:{
        $alert(msg,time = 1500){
            this.showWarning = true;
            this.msg = msg;
            setTimeout(()=>{
                this.showWarning = false;
            },time)
        },
        // 登录
        login:function (){
            if(!this.username || !this.password){
                this.$alert('手机号和密码不能为空!')
                return false;
            }
            var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if(!phoneReg.test(this.username)){
                this.$alert('请输入正确格式的手机号码!')
                return false;
            }           
            let postData = this.$qs.stringify({
                username: this.username,
                password: this.password,
                type:this.picked
            });
            var url = getUrl();
            axios({
                url: `${url}/user/login`,
                method: 'post',
                data:postData
            }).then((res)=>{
                if(res.data.code == 0){
                    sessionStorage.setItem('token',res.data.token);
                    sessionStorage.setItem('username',res.data.username);
                    sessionStorage.setItem('type',res.data.type)
                    window.location.href = '#/work'
                } else{  // 登录失败 
                    this.$alert(res.data.msg)
                }
            }).catch(e=>{
                this.$alert('发生未知网络错误!')
            })
            
        },
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
    color: #fff;
}
.input-container{
    text-align: center;
    width: 100%;
    color: #fff;
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
    display: block!important;
    margin-top:1rem!important;
    border: 1px solid #fff;
    outline: none;
    background: #fff;
    width: 85%;
    height: 2.7rem;
    line-height: 2.7rem;
    background: rgb(30,129,210);
    color: #fff;;
    font-size: 1rem;
    border-radius: 2rem;
    margin: auto;
    text-decoration: none;
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
