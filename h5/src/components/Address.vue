<template>
    <div class="container">
        <!--header-->
        <div class="header">
            通讯录
            <div class="add">
                <img src="../../static/添加联系人.png" />
            </div>
        </div>
        <!--content-->
        <div class="content">
            <div v-for="(item,key) in list" :key="item.index" class="content-each">
                <div class="title">{{key}}</div>
                <div class="">
                    <div class="name" v-for="innerItem of item" :key="innerItem.index">{{innerItem.name}}</div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import axios from 'axios';
import Footer from './Footer'
import makePy from '../utils/pinyin.js'
export default {
    name: 'Address',
    created(){
        var token = sessionStorage.getItem('token');
        var username = '18000351426';
        var url = `http://localhost:3000/address/info?token=${token}&username=${username}`
        axios({
            url: url,
            method: 'get'
        }).then((res)=>{
            this.list = res.data
        })
    },
    components:{
        Footer
    },
    data(){
        return {
            list: {}
        }    
    },
    methods:{
        // 添加联系人
        add(){

        }
    }
}
</script>
<style scoped>
.container{   
    width: 100%;
    background: rgb(238,238,238);
}
.header{
    height: 2.5rem;
    text-align: center;
    color: #fff;
    background: rgb(30,129,210);
    line-height: 2.5rem;
}

.content-each{
    padding: 0 0.5rem;
    background: #fff;
    margin-bottom: 0.5rem;
}
.title{
    border-bottom: 1px solid rgb(232,232,232);
    height: 1.8rem;
    line-height: 1.8rem;
    color: #808080
}
.name{
    height: 1.8rem;
    line-height: 1.8rem;
    border-bottom: 1px solid rgb(232,232,232);
}
.name:last-child{
    border: none;
}
.add{
    position: fixed;
    right: 0.5rem;
    top: 0;
    height: 2.5rem;
    line-height: 2.5rem;
}
</style>
