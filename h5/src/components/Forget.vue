<template>
    <div class="container">
        <div class="header">
            <div class="goBack" @click="goBack">
                <img src="../../static/左箭头.png" />
            </div>
            重置密码
        </div>
        <div class="content">
            <div style="position:relative">
                <input type="text" class="input" v-model="phone" placeholder="请输入手机号"/>
                <div class="img-phone">
                    <img src="../../static/手机.png" />
                </div>
            </div>
            <div style="position:relative">
                <input type="text" class="input" v-model="email" placeholder="请输入注册时的邮箱"/>
                <div class="img-phone">
                    <img src="../../static/邮箱.png" />
                </div>
                <button class="code-button" @click="getCode">{{btnText}}</button>
            </div>
            <div style="position:relative;margin-top:2rem">
                <input type="text" class="input" v-model="code" placeholder="请输入当前手机验证码"/>
                <div class="img-phone">
                    <img src="../../static/验证码.png" />
                </div>
            </div>
            <div style="position:relative">
                <input type="password" class="input" v-model="password" placeholder="输入密码(8-20位数字或字母)"/>
                <div class="img-phone">
                    <img src="../../static/密码.png" />
                </div>
            </div>
            <div style="position:relative">
                <input type="password" class="input" v-model="repeatPassword" placeholder="确认密码(8-20位数字或字母)"/>
                <div class="img-phone">
                    <img src="../../static/密码.png" />
                </div>
            </div>
            <div style="text-align:center;margin-top:2.5rem">
                <button class="button" @click="complete">完成</button>
            </div>
        </div>
        <Warning :show="this.showWarning" :msg="this.msg"></Warning>
    </div>
</template>
<script>
import axios from 'axios';
import getUrl from '../config'
import Warning from '../common/Warning'
import { testPhone,testEmail } from '../utils/reg'
export default {
    name:'Forget',
    methods: {
        complete(){
          if(!testPhone(this.phone)){
            this.$alert('请输入正确格式的手机号码!');
            return false;
          }
          if(!testEmail(this.email)){
            this.$alert('请输入正确格式的邮箱!');
            return false;
          }
          if(this.password != this.repeatPassword){
            this.$alert('两次输入密码不一致!');
          }
          var postData = this.$qs.stringify({
            email: this.email,
            username: this.phone,
            code: this.code,
            password: this.password
          })
          axios({
            url: `${this.url}/user/reset`,
            method:'post',
            data: postData
          }).then((res)=>{
            if(res.data.code == 0) {
              this.phone = null;
              this.email = null;
              this.code = null;
              this.password = null;
              this.repeatPassword = null;
            }
            this.$alert(res.data.msg);
          }).catch((e)=>{
            this.$alert('发生未知网络错误!');
          })
        },
        goBack(){
          this.$router.back(-1);
        },
        $alert(msg){
            this.showWarning = true;
            this.msg = msg;
            setTimeout(()=>{
                this.showWarning = false;
            },1500)
        },
        // 向邮箱发送验证码
        getCode(){
          if(this.sendCodeFlag){
            return false;
          }
          if(!testPhone(this.phone)){
            this.$alert('请输入正确格式的手机号码!');
            return false;
          }
          if(!testEmail(this.email)){
            this.$alert('请输入正确格式的邮箱!');
            return false;
          }
          var time = 60;
          if(!timer){
            var timer = setInterval(()=>{
              this.btnText = `${time--}秒后可重新发送`
              if(time < 0) {
                clearInterval(timer);
                this.sendCodeFlag = false;
                this.btnText = '获取验证码'
              }
            },1000)
          }
          var postData = this.$qs.stringify({
            email: this.email,
            username: this.phone
          })
          axios({
            url: `${this.url}/user/resetemail`,
            method:'post',
            data: postData
          }).then((res)=>{
            if(res.data.code == 0) {
              this.$alert(res.data.msg);
            }
          })
        },
    },
    created(){
      this.url = getUrl();
    },
    data(){
      return {
        url: null,
        phone: null,
        email: null,
        code: null,
        password: null,
        repeatPassword: null,
        showWarning: false,
        msg: null,
        sendCodeFlag: false,
        btnText: '获取验证码'
      }
    },
    components:{
      Warning
    },
}
</script>
<style scoped>
@import url(./Signup.css);
.header{
    height: 2.5rem!important;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
.img-phone{
    position: absolute;
    height: 100%;
    top:0;
    display: flex;
    align-items: center;
}
</style>
