<template>
    <div class="container">
        <!--header-->
        <div class="header">
            <span class="header-goBack" @click="goBack">
                <img src="../../static/左箭头.png" />
            </span>
            保养记录
        </div>
        <div v-if="loading">
            <img src="../../static/loading.gif">
        </div>
        <div v-else>
        <!---->
            <div class="content" v-for="item in list" :key="item.index">
                <!--保养时间-->
                <div class="content-each" >
                    <div class="description">保养时间:  </div>
                    <div class="text">{{item.baoyangtime|time}}</div>
                </div>
                <!--电梯位置-->
                <div class="content-each">
                    <div class="description">电梯位置:  </div>
                    <div class="text">{{item.location}}</div>
                </div>
                <!--故障描述-->
                <div class="content-each">
                    <div class="description">任务说明:  </div>
                    <div class="text">{{item.statement}}</div>
                </div>
                <!--注册代码-->
                <div class="content-each">
                    <div class="description">注册代码:  </div>
                    <div class="text">{{item.code}}</div>
                </div>
                <!--维保负责人-->
                <div class="content-each">
                    <div class="description">维保负责人:  </div>
                    <div class="text">{{item.people}}</div>
                </div>
        
                <!--维保得到的评价-->
                <div v-if="status == 0" class="content-each" style="justify-content:space-between;">
                    <!--服务态度-->
                    <div style="display:flex;">
                        <div class="description">服务态度:</div>
                        <div class="pingjia" style="display:flex">
                            <div v-for="index in item.service" :key="index.index">
                                <div v-if="index ==1">
                                    <img src="../../static/星星黄.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--保养满意度-->
                    <div style="display:flex;">
                        <div class="description">保养满意度:</div>
                            <div class="pingjia" style="display:flex">
                                <div v-for="index in item.satisfaction" :key="index.index">
                                <div v-if="index ==1">
                                    <img src="../../static/点赞黄.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--待保养-->
                <div v-if="status == 1" class="daibaoyang">
                    <button class="button">撤销</button>
                    <button class="button toReceive" @click="toReceive(item.code)">领取</button>
                </div>
        </div>
        </div>
        <Warning :show="this.showWarning" :msg="this.msg"></Warning>
    </div>
  
</template>
<script>
import axios from 'axios'
import Warning from '../common/Warning'
export default {
    name: 'Finished',
    created(){
        this.getData();
    },
    components:{
        Warning
    },
    methods:{
        getData(){
            var username = sessionStorage.getItem('username');
            var token = sessionStorage.getItem('token');
            var url = `http://localhost:3000/elevator/getInfo?username=${username}&token=${token}&status=${this.status}`;
            axios({
                url: url,
                method: 'get',
            }).then((res)=>{
                console.log(res.data);
                this.list = res.data;
            }).catch((e)=>{
                console.log(e);
            })
        },
        $alert(msg){
            this.showWarning = true;
            this.msg = msg;
            setTimeout(()=>{
                this.showWarning = false;
            },1500)
        },
        // 领取任务
        toReceive:function(code){
            let postData = this.$qs.stringify({
                code: code
            });
            axios({
                url: `http://localhost:3000/elevator/receive`,
                method: 'post',
                data:postData
            }).then((res) => {
                if(res.data.code == 0){
                    this.$alert(res.data.msg);
                    this.getData();
                } 
            })
        },
        // 返回上一页
        goBack:function(){
            this.$router.back(-1);
        }
    },
    filters:{
        time:function(time){
            return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');   
        }
    },
    data:function(){
        return {
            showWarning: false,
            msg: '',
            loading: false,
            status:this.$route.params.status,
            list:[]
        }
    }
}
</script>
<style scoped>
.header{
    height: 2.5rem;
    text-align: center;
    color: #fff;
    background: rgb(30,129,210);
    line-height: 2.5rem;
    position: fixed;
    top:0;
    width: 100%;
}
.container{
    height: 100%;
    width: 100%;
    background: rgb(242,242,242);
    padding-bottom: 0!important;
    padding-top: 2.5rem!important;
}
.content{
    width: 95%;
    margin: 0.7rem auto;
    padding: 0.8rem;
    background: #fff;
    font-size: 0.8rem;
}
.description{
    color: gray;
}
.content-each{
    display: flex;
    padding: 0.1rem;
   
}
.text{
    margin-left: 0.3rem;
}
.pingjia{
    margin-left:0.35rem;
    line-height: 100%;
    align-items: center;
    display: flex;
}
.pingjia img{
    height: 0.85rem;
    width: 0.85rem;
    margin: 0.03rem;
}
.header-goBack{
    position: absolute;
    left: 0.3rem;
}
.toReceive{
    background: #fff;
    color: rgb(30,129,210);
    border: 1px solid rgb(30,129,210);
}
.button{
    border-radius: 0.3rem;
}
.daibaoyang{
    text-align: right;
    padding-right: 0.8rem;
}
</style>
