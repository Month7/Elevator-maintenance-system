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
                <input type="text" class="input" placeholder="请输入手机号"/>
                <div class="img-phone">
                    <img src="../../static/手机.png" />
                </div>
                <button class="code-button">获取验证码</button>
            </div>
            <div style="position:relative;margin-top:2rem">
                <input type="text" class="input" placeholder="请输入当前手机验证码"/>
                <div class="img-phone">
                    <img src="../../static/验证码.png" />
                </div>
            </div>
            <div style="position:relative">
                <input type="password" class="input" placeholder="输入密码(8-20位数字或字母)"/>
                <div class="img-phone">
                    <img src="../../static/密码.png" />
                </div>
            </div>
            <div style="position:relative">
                <input type="password" class="input" placeholder="确认密码(8-20位数字或字母)"/>
                <div class="img-phone">
                    <img src="../../static/密码.png" />
                </div>
            </div>
            <div style="text-align:center;margin-top:2.5rem">
                <button class="button" @click="complete">完成</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Forget',
    methods: {
        complete(){

        },
        goBack(){
            this.$router.back(-1);
        }
    }
}
</script>
<style scoped>
@import url(./Signup.css);
.header{
    height: 3rem!important;
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
