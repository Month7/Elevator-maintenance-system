<template>
    <div class="container">
        <div class="header">
            <!--顶部-->
            <div class="h-nav">
                <div class="goBack" @click="goBack">
                    <img src="../../static/左箭头.png" />
                </div>
                创建账号
            </div>
            <!--步骤条-->
            <div class="step">
                <div class="circle"></div>
                <div class="line gray"></div>
                <div class="circle gray"></div>
                <div class="line gray"></div>
                <div class="circle gray"></div>
            </div>
            <!--步骤条下面的文字-->
            <div class="text">
                <div class="text-in">
                    <div>
                      邮箱验证
                    </div>
                    <div class="gray-text">
                        设置密码
                    </div>
                    <div class="gray-text">
                        注册完成
                    </div>
                </div>
            </div>
        </div>
            <!--content-->
            <div class="content">
                <input type="text" class="phone input" v-model="phone" placeholder="请输入您的手机" />
                <div class="phone-img">
                    <img src="../../static/手机.png"/>
                </div>
                <div style="position:relative"> 
                <input type="text" class="phone input" v-model="email" placeholder="请输入您的邮箱" />
                <div class="phone-img">
                    <img src="../../static/邮箱.png"/>
                </div>
                </div>
                <div class="code-container">
                    <input type="text" class="code input" v-model="code" placeholder="请输入当前邮箱验证码"/>
                    <div class="code-img">
                        <img src="../../static/验证码.png" />
                    </div>
                    <button class="code-button" @click="getCode">{{btnText}}</button>
                </div>
            </div>
            
            <div class="buttons">
                <button class="button" @click="nextStep">下一步</button>
            </div>
            <Warning :show="this.showWarning" :msg="this.msg"></Warning>
        </div>
</template>
<script>
import Warning from '../common/Warning'
import axios from 'axios';
import getUrl from '../config'
export default {
    name: 'Step1',
    data:function(){
        return {
            phone: '',
            code: '',
            showWarning: false,
            msg: null,
            url: null,
            email: null,
            btnText: '获取验证码',
            sendCodeFlag: false,
        }
    },
    components:{
      Warning
    },
    created(){
      this.url = getUrl();
    },
    methods:{
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
          var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
          var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if(!phoneReg.test(this.phone)){
            this.$alert('请输入正确格式的手机号码!')
            return false;
          } 
          if(!reg.test(this.email)){
            this.$alert('请输入正确格式的邮箱!');
            return false;
          }       
          this.sendCodeFlag = true;
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
            email: this.email
          })
          axios({
            url: `${this.url}/user/email`,
            method:'post',
            data: postData
          }).then((res)=>{
            if(res.data.code == 0) {
              this.$alert(res.data.msg);
            }
          })
        },
        nextStep(){
            if(this.code && this.phone && this.email){
                var postData = this.$qs.stringify({
                  code2: this.code
                })
                axios({
                  url: `${this.url}/user/code`,
                  method: 'post',
                  data: postData
                }).then((res) => {
                  if(res.data.code == 0) {
                    this.$store.dispatch('registerPhone',this.phone);
                    this.$store.dispatch('registerEmail',this.email);
                    this.$store.dispatch('nextStep');
                  } else {
                    this.$alert(res.data.msg);
                  }
                })
                
            } else {
                this.$alert('验证码不能为空!')
            }
        },
        goBack(){
            this.$store.dispatch('resetRegisterInfo')
            this.$store.dispatch('initStep');
            this.$router.back(-1);
        }
    }
}
</script>
<style scoped>
   @import url(./Signup.css);

  .content{
    overflow-x: hidden!important; 
  }
</style>
