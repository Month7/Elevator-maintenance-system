<template>
    <div class="container">
        <!--header-->
        <div class="header">
            消息
        </div>
        <!--content-->
        <router-link :to="{name:'MDetail',params:{name:item.author.username,localname:'Month7'}}" class="content" v-for="item in messages" :key="item.index">
            <div class="left">
                <img :src="item.author.avatar_url" />
            </div>
            <div class="right">
                <div class="txtContent gray">{{item.author.username}}</div>
                <div class="txtContent">{{item.content}}</div>
            </div>
        </router-link>
        <!--Footer-->
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from './Footer'
import axios from 'axios'
export default {
    name: 'Message',
    components:{
        Footer
    },
    created(){
        // var url = 'http://localhost:3000/message';
        // var self = this;
        // axios({
        //     url: url,
        //     method: 'get',
        // }).then((res)=>{
        //     self.messages = res.data.messages;
        // }).catch((e)=>{
        //     console.log(e);
        // })
    },
    data:function(){
        return {
            messages:[{
                has_read: false,
                author: {
                    username: "Pony马",
                    avatar_url: "../../static/头像.jpg",
                },
                content: "你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了..."
            },{
                has_read: false,
                author: {
                    username: "Pony马",
                    avatar_url: "../../static/头像.jpg",
                },
                content: "你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了..."
            },{
                has_read: false,
                author: {
                    username: "Pony马",
                    avatar_url: "../../static/头像.jpg",
                },
                content: "你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了..."
            },{
                has_read: false,
                author: {
                    username: "Pony马",
                    avatar_url: "../../static/头像.jpg",
                },
                content: "你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了你太菜了..."
            }]
        }
    }
}
</script>
<style scoped>
.container{
    overflow-x:hidden;
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
