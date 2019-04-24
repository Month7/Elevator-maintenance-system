<template>
    <div class="container">
        <div class="header"></div>
        <!--footer-->
        <Footer></Footer>
        <div class="banner">
        </div>
        <div class="content">
            <div class="content-header">
                当日工作
            </div>
            <div class="contenr-main">
                <div @click="goDetail(0)" class="content-each">
                    <img src="../../static/点赞.png" />
                    <div class="content-txt">保养完成</div>
                </div>
                <div @click="goDetail(1)" class="content-each">
                    <img src="../../static/修理装修.png" />
                    <div class="content-txt">待保养</div>
                </div>
                <div @click="goDetail(2)" class="content-each">
                    <img src="../../static/沙漏.png" />
                    <div class="content-txt">保养中</div>
                </div>
               <div @click="goDetail(3)" class="content-each">
                    <img src="../../static/闹钟.png" />
                    <div class="content-txt">超期</div>
                </div>
                <div @click="goDetail(4)" class="content-each">
                    <img src="../../static/报警.png" />
                    <div class="content-txt">急修</div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-header">
                必备工具
            </div>
            <div class="contenr-main">
                <!--下达任务-->
                <div class="content-each-m" @click="GoTask">
                    <img src="../../static/任务下达.png" />
                    <div class="content-txt">下达任务</div>
                </div>
                <!--电梯管理-->
                <div class="content-each-m" @click="GoManage">
                    <img src="../../static/电梯管理.png" />
                    <div class="content-txt">电梯管理</div>
                </div>
                <!--电梯管理-->
                <div class="content-each-m" @click="GoTask">
                    <img src="../../static/电梯管理.png" />
                    <div class="content-txt">电梯管理</div>
                </div>
                <!--电梯管理-->
                <div class="content-each-m" @click="GoTask">
                    <img src="../../static/电梯管理.png" />
                    <div class="content-txt">电梯管理</div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-header">
                辅助工具
            </div>
            <div class="contenr-main">

            </div>
        </div>
        <Warning :show="this.showWarning" :msg="this.msg"></Warning>
    </div>
</template>
<script>
import Footer from './Footer'
import Warning from '../common/Warning'
export default {
    name: 'Login',
    data(){
        return {
            showWarning: false,
            msg: '',
        }
    },
    components:{
        Footer,
        Warning
    },
    methods:{
        $alert(msg){
            this.showWarning = true;
            this.msg = msg;
            setTimeout(()=>{
                this.showWarning = false;
            },1500)
        },
        goDetail(status){
            if(sessionStorage.getItem('type') != 0){
                this.$alert('您不是维保人员，无法查看此内容!')
                return false;
            }
            this.$router.push({ name: 'Finished', params: { status: status }})
        },
        GoTask(){
            // if(sessionStorage.getItem('type') != 1){
            //     this.$alert('您不是检验人员，无法查看此内容!')
            //     return false;
            // }
            this.$router.push({ name: 'Task'})
        },
        GoManage(){
            this.$router.push({ name: 'Finished', params: { status: 5 }})
        }
    }    
}
</script>
<style scoped>
.container{
    padding: 0;
    margin: 0;
}
.header{
    height: 8rem;
    background: rgb(30,129,210);
    width: 100%;
}
.content-header{
    width: 100%;
    border-bottom: 1px solid black;
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 1rem;
}
.contenr-main{
    display: flex;
    justify-content: space-between;
}
.content-each{
    text-align: center;
    color: black;
    text-decoration: none;
    padding: 0.2rem;
    width: 20%;
    margin-top:0.5rem;
}
.content-each-m{
    text-align: center;
    color: black;
    text-decoration: none;
    padding: 0.2rem;
    width: 25%;
    margin-top:0.5rem;
}
.content-txt{
    margin-top:0.5rem;
    font-size: 0.8rem!important;
}
.footer{
    height: 3.3rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
}
.footer-each{
    width: 25%;
    text-align: center;
    font-size: 0.6rem;
    text-decoration: none;
    color: black;
}
</style>
