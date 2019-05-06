<template>
    <div class="container">
        <div class="header">
            <!--顶部-->
            <div class="h-nav">
                <div class="goBack" @click="goBack"><img src="../../static/左箭头.png" /></div>
                创建账号
            </div>
            <!--步骤条-->
            <div class="step">
                <div class="circle"></div>
                <div class="line"></div>
                <div class="circle"></div>
                <div class="line gray"></div>
                <div class="circle gray"></div>
            </div>
            <!--步骤条下面的文字-->
            <div class="text">
                <div class="text-in">
                    <div>
                        手机验证
                    </div>
                    <div >
                        设置密码
                    </div>
                    <div class="gray-text">
                        注册完成
                    </div>
                </div>
            </div>
            <!--content-->
            <div class="content">
                <input type="password" class="phone input" v-model="password" placeholder="请设置密码"/>
                <div class="phone-img">
                    <img src="../../static/密码.png"/>
                </div>
                <div class="code-container">
                    <input type="password" class="code input" v-model="repeatPassword" placeholder="请确认密码"/>
                    <div class="code-img">
                        <img src="../../static/密码.png" />
                    </div>
                </div>
                <div class="type-container">
                    <div class="">
                        请选择你的身份
                    </div>
                    <label>
                        <input type="radio" v-model="type" value="0" />维保人员
                    </label>
                    <label>
                        <input type="radio" v-model="type" value="1" />检验人员
                    </label>
                    
                </div>
            </div>
            <!--button-->
            <div class="buttons">
                <button class="button" @click="nextStep">下一步</button>
            </div>
        </div>
        <Warning :show="this.showWarning" :msg="this.msg"></Warning>
    </div>    
</template>
<script>
import axios from 'axios'
import getUrl from '../config'
import Warning from '../common/Warning'
export default {
    name: 'Step2',
    data:function(){
        return {
            password: '',
            repeatPassword: '',
            type: 0,
            showWarning: false,
            msg: ''
        }
    },
    components:{
      Warning
    },
    methods:{
        $alert(msg,time){
            this.showWarning = true;
            this.msg = msg;
            setTimeout(()=>{
                this.showWarning = false;
            },1500)
        },
        nextStep(){
            if(this.password && this.repeatPassword){
                if(this.password != this.repeatPassword) {
                  console.log('???');
                    this.$alert('两次输入密码不一致!');
                } else {
                    this.$store.dispatch('registerPassword',this.password);
                    let postData = this.$qs.stringify({
                        phone: this.$store.state.signupData.phone,
                        email: this.$store.state.signupData.email,
                        password: this.password,
                        type:this.type
                    });
                    var url = getUrl();
                    axios({
                        url: `${url}/user/register`,
                        data: postData,
                        method: 'post',
                    }).then((res)=>{
                        if(res.data.code == 0) {
                            this.$store.dispatch('nextStep');
                            this.$store.dispatch('resetRegisterInfo')
                        } else {
                          this.$alert(res.data.msg);
                        }  
                    })
                }
            } else {
                this.$alert('不能为空!');
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
    .type-container{
        display: flex;
        background: #fff;
        height: 2rem;
        align-items: center;
        padding: 0.2rem 0.5rem;
    }
</style>
