<template>
    <div class="container">
        <!--header-->
        <div class="header">工作</div>
        <div class="head-img">
            <img src="../../static/主页.jpg" />
        </div>
        <!--footer-->
        <Footer status='3'></Footer>
        <div class="banner">
        </div>
        <div class="content">
            <div class="content-header">
                <div style="display:flex"> 
                    <div class="left-banner"></div>
                    当日工作
                </div>
            </div>
            <div class="contenr-main">
                <div @click="goDetail(0)" class="content-each">
                    <img src="../../static/点赞.png" />
                    <div class="content-txt">保养完成</div>
                </div>
                <div @click="goDetail(2)" class="content-each">
                    <img src="../../static/修理装修.png" />
                    <div class="content-txt">待保养</div>
                </div>
                <div @click="goDetail(3)" class="content-each">
                    <img src="../../static/沙漏.png" />
                    <div class="content-txt">保养中</div>
                </div>
               <div @click="goDetail(4)" class="content-each">
                    <img src="../../static/闹钟.png" />
                    <div class="content-txt">超期</div>
                </div>
                <div @click="goDetail(5)" class="content-each">
                    <img src="../../static/报警.png" />
                    <div class="content-txt">急修</div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-header">
                <div style="display:flex"> 
                    <div class="left-banner-green"></div>
                    检验人员
                </div>
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
                <!--待评价-->
                <div class="content-each-m" @click="GoPingjia">
                    <img src="../../static/评价.png" />
                    <div class="content-txt">待评价</div>
                </div>
                <!--电梯管理-->
                <div class="content-each-m" @click="GoPingjiaMemory">
                    <img src="../../static/记录.png" />
                    <div class="content-txt">评价记录</div>
                </div>
                
            </div>
            <!--公告信息-->
            <router-link to="/submitnotice" class="content-each-m" @click="GoPingjiaMemory">
                <img src="../../static/公告信息.png" />
                <div class="content-txt">发布公告</div>
            </router-link>
        </div>
        <div class="content">
            <div class="content-header">
                <div style="display:flex"> 
                    <div class="left-banner"></div>
                    维保人员
                </div>
            </div>
            <!--维保人员-->
            <div class="contenr-main">
                <!--下达任务-->
                <div class="content-each-m" @click="GoHelp">
                    <img src="../../static/帮助.png" />
                    <div class="content-txt">新手帮助</div>
                </div>
                <!--当前任务-->
                <div class="content-each-m" @click="goDetail(3)">
                    <img src="../../static/当前任务.png" />
                    <div class="content-txt">当前任务</div>
                </div>
                <!--待评价-->
                <div class="content-each-m" @click="goDetail(0)">
                    <img src="../../static/工作记录.png" />
                    <div class="content-txt">工作记录</div>
                </div>
                <!--电梯管理-->
                <router-link to="/notice" class="content-each-m" @click="GoTask">
                    <img src="../../static/公告.png" />
                    <div class="content-txt">公告</div>
                </router-link>
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
        GoHelp(){
          this.$router.push({ name: 'Help'})
        },
        // 下达任务
        GoTask(){
            // if(sessionStorage.getItem('type') != 1){
            //     this.$alert('您不是检验人员，无法查看此内容!')
            //     return false;
            // }
          this.$router.push({ name: 'Task'})
        },
        // 管理电梯
        GoManage(){
          this.$router.push({ name: 'Finished', params: { status: 6 }})
        },
        // 评价
        GoPingjia(){
          this.$router.push({ name: 'Finished', params: { status: 7 }})
        },
        // 评价记录
        GoPingjiaMemory(){
          this.$router.push({ name: 'Finished', params: { status: 8 }})
        }
    }    
}
</script>
<style scoped>
.container{
    padding: 0;
    margin: 0;
    padding-bottom: 3rem!important;
    padding-top: 2.5rem!important;
    overflow-x: hidden;
}
.header{
  position: fixed;
  top: 0;
  height: 2.5rem;
  background: rgb(30,129,210);
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.head-img img{
  width: 100%;
  height: auto;
}
.content-header{
    width: 100%;
    border-bottom: 1px solid rgb(238,238,238);
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 1rem;
    padding: .1rem .3rem;
}
.contenr-main{
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
    /* flex-wrap: wrap; */
}
.content-each{
    text-align: center;
    color: black;
    text-decoration: none;
    padding: 0.2rem;
    width: 20%;
    margin-top:0.5rem;
    box-sizing: border-box;
}
.content-each-m{
    text-align: center;
    color: black;
    text-decoration: none;
    padding: 0.2rem;
    width: 25%;
    margin-top:0.5rem;
    box-sizing: border-box;
    display: block;
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
