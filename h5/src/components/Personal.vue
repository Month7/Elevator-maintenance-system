<template>
    <div class="">
        <div class="header">
            <!--头像-->
            <div>
                <img class="portrait" src="../../static/头像.jpg"/>
                <div class="username">{{nickname}}</div>
            </div>
        </div>
        <div class="content">
            <div>手机号</div>
            <div class="right">{{username}}</div>
        </div>
        <div class="content">
            <div>身份</div>
            <div class="right">{{type}}</div>
        </div>
        <div class="exit-container">
            <button class="exit" @click="exit">退出登录</button>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import axios from 'axios';
import getUrl from '../config'
// import { mapState} from 'vuex'
import Footer from './Footer';
export default {
    name: 'Personal',
    created(){
        var token = sessionStorage.getItem('token');
        var username = sessionStorage.getItem('username');
        var url = getUrl();
        axios({
            url: `${url}/user/search?token=${token}&username=${username}`,
            method: 'get'
        }).then((res)=>{
            this.nickname = res.data.nickname;
            this.username = res.data.username;
            this.type = res.data.type == 0 ? '维保人员':'检验人员'
        })
        console.log('???')
    },
    data:function(){
        return {
           username: '',
           nickname: '',
           type: ''
        }
    },
    components:{
        Footer
    },
    // computed:{
    //      ...mapState([ 
    //         'username',
    //     ]),
    // },
    methods:{
        exit:function(){
            // this.$store.dispatch('addNote','haha')
            // window.postMessage('exit');
            sessionStorage.clear();
            window.location.href = '#/'
        }
    },
}
</script>
<style scoped>
.header{
    background: rgb(30,129,210);
    width: 100%;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.portrait{
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
}
.exit-container{
    display: flex;
    justify-content: center;
    width: 100%;
}
.exit{
    border: none;
    outline: none;
    background: rgb(30,129,210);
    width: 85%;
    height: 2.7rem;
    line-height: 2.7rem;
    color: #fff;
    font-size: 0.9rem;
    border-radius: 0.5rem;
    margin: 2rem auto;
}
.content{
    border-bottom: 1px solid rgb(232,232,232);
    height: 1.8rem;
    line-height: 1.8rem;
    padding: 0.2rem;
    display: flex;
}
.right{
    margin-left: 1.4rem;
}
.username{
    text-align: center;
}
</style>
