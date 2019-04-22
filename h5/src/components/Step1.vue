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
                        手机验证
                    </div>
                    <div class="gray-text">
                        设置密码
                    </div>
                    <div class="gray-text">
                        注册完成
                    </div>
                </div>
            </div>
            <!--content-->
            <div class="content">
                <input type="text" class="phone input" v-model="phone" placeholder="请输入手机号" />
                <div class="phone-img">
                    <img src="../../static/手机.png"/>
                </div>
                <div class="code-container">
                    <input type="text" class="code input" v-model="code" placeholder="请输入当前手机验证码"/>
                    <div class="code-img">
                        <img src="../../static/验证码.png" />
                    </div>
                    <button class="code-button">获取验证码</button>
                </div>
            </div>
            <!--button-->
            <div class="buttons">
                <button class="button" @click="nextStep">下一步</button>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    name: 'Step1',
    data:function(){
        return {
            phone: '',
            code: ''
        }
    },
    methods:{
        nextStep(){
            if(this.code && this.phone){
                this.$store.dispatch('registerPhone',this.phone);
                this.$store.dispatch('nextStep');
            } else {
                alert('验证码不能为空!')
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
</style>
