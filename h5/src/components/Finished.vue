<template>
    <div class="container">
        <!--header-->
        <div class="header">
            <span class="header-goBack" @click="goBack"><</span>
            保养记录
        </div>
        <div v-if="loading">
            <img src="../../static/loading.gif">
        </div>
        <div v-else>
        <!---->
            <div class="content" v-for="item in list" :key="item">
                <div class="content-each" >
                    <div class="description">保养时间:  </div>
                    <div class="text">{{item.time|time}}</div>
                </div>
                <div class="content-each">
                    <div class="description">电梯位置:  </div>
                    <div class="text">{{item.location}}</div>
                </div>
                <div class="content-each">
                    <div class="description">注册代码:  </div>
                    <div class="text">{{item.number}}</div>
                </div>
                <div class="content-each">
                    <div class="description">维保负责人:  </div>
                    <div class="text">{{item.people}}</div>
                </div>
                <div class="content-each" style="justify-content: space-between;">
                    <!--服务态度-->
                    <div style="display:flex;">
                        <div class="description">服务态度:</div>
                        <div class="pingjia" style="display:flex">
                            <div v-for="index in item.service" :key="index">
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
                        <div v-for="index in item.satisfaction" :key="index">
                        <div v-if="index ==1">
                            <img src="../../static/点赞黄.png" />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  
</template>
<script>
import axios from 'axios'
export default {
    name: 'Finished',
    created(){
        var url = `/api/getmaintenanceList`;
        // var self = this;
        // axios({
        //     url: url,
        //     method: 'get',
        // }).then((res)=>{
        //     console.log(res.data);
        //     self.list = res.data;
        // }).catch((e)=>{
        //     console.log(e);
        // })
    },
    methods:{
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
            loading: false,
            list:[{
    "time":"1555385146",
    "number":"3110420112201506S019",
    "location": "5-1-1",
    "people": "Month",
    "service":[1,1,1,0,0],
    "satisfaction":[1,1,1,1,1]
},{
    "time":"1555385146",
    "number":"3110420112201506S020",
    "location": "7-2-2",
    "people": "Month",
    "service":[1,1,1,1,0],
    "satisfaction":[1,1,1,1,1]
},{
    "time":"1555385146",
    "number":"3110420112201506S021",
    "location": "5-1-2",
    "people": "Month",
    "service":[1,1,0,0,0],
    "satisfaction":[1,1,1,1,1]
}]
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
}
.container{
    height: 100%;
    width: 100%;
    background: rgb(242,242,242);
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
</style>
