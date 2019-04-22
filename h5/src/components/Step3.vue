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
                <div class="line"></div>
                <div class="circle"></div>
                <div class="line"></div>
                <div class="circle"></div>
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
                    <div>
                        注册完成
                    </div>
                </div>
            </div>
            <!--content-->
            <div class="complete">
                <img src="../../static/完成.png">
                <div>
                    注册完成
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    name: 'Step3',
    methods:{
        goBack(){
            this.$store.dispatch('resetRegisterInfo');
            this.$store.dispatch('initStep');
            this.$router.back(-1);
        }
    }
}
</script>
<style scoped>
    @import url(./Signup.css);
    .complete{
        width: 100%;
        text-align: center;
    }
</style>
