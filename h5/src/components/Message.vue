<template>
    <div class="container">
        <!--header-->
        <div class="header">
            <span v-if="loading">loading...</span>
            <span v-else>消息</span>
            
        </div>
        <!--content-->
        <div v-if="loading" class="loading">
          <img src="../../static/loading.gif" />
        </div>
        <div v-else>
          <router-link :to="{name:'MDetail',params:{nickname:item.nickname,name:item.username,localname:username}}" class="content" v-for="item in messages" :key="item.index">
            <div class="left">
                <img :src="item.avat_url" />
            </div>
           
            <div class="right">
                <div class="txtContent gray">{{item.nickname}}</div>
                <div class="txtContent">{{item.content}}</div>
            </div>
          </router-link>
        </div>
        
        <!--Footer-->
        <Footer status='1'></Footer>
    </div>
</template>
<script>
import Footer from './Footer'
import axios from 'axios'
import getUrl from '../config'
export default {
    name: 'Message',
    components:{
        Footer
    },
    created(){
      this.username = sessionStorage.getItem('username')
      this.getData();
      setInterval(()=>{
        this.getData();
      },1500)
    },
    data(){
        return {
            loading: true,
            messages: [],
            username: null,
        }
    },
    methods: {
        getData(){
          
            var username = sessionStorage.getItem('username');
            var token = sessionStorage.getItem('token');
            var type = sessionStorage.getItem('type')
            var url = getUrl();
            axios({
                url: `${url}/message/messages?username=${username}&token=${token}&type=${type}`,
                method: 'get'
            }).then((res)=>{
                if(res.data.code == 0) {
                    this.messages = res.data.data
                    this.loading = false;
                }
            })
        },

    },
}
</script>
<style scoped>
.container{
    overflow-x: hidden;
}
.header{
    height: 2.5rem;
    text-align: center;
    color: #fff;
    background: rgb(30,129,210);
    line-height: 2.5rem;
    width: 100%;
}
.content{
    display: flex;
    height: 3rem;
    width: 100%;
    padding: 1rem 0.3rem;
    align-items: center;
    text-decoration: none;
    color: black;
}
.left{
    width: 17%;
    text-align: center;
}
.right{
    width: 83%;
    /* border: 1px solid red; */
    height: 100%;
    border-bottom: 1px solid rgb(238,238,238);
    
}
.left img{
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
}
.txtContent{
    /* border: 1px solid green; */
    /* height: 3rem; */
    /* padding: 1rem 0.5rem; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* line-height: 3rem; */
    padding-right: 0.5rem;
}
.gray{
    color: gray;
}
</style>
