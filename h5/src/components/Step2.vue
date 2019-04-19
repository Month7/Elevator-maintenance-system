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
                <input type="password" class="phone input" placeholder="请设置密码"/>
                <div class="phone-img">
                    <img src="../../static/密码.png"/>
                </div>
                <div class="code-container">
                    <input type="password" class="code input" placeholder="请确认密码"/>
                    <div class="code-img">
                        <img src="../../static/密码.png" />
                    </div>
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
    name: 'Step2',
    methods:{
        nextStep(){
            this.$store.dispatch('nextStep');
        },
        goBack(){
            this.$router.back(-1);
            this.$store.dispatch('initStep');
        }
    }
}
</script>
<style scoped>
    @import url(./Signup.css);
</style>
