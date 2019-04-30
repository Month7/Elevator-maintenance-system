<template>
    <div class="">
        <div class="header">
            <!--头像-->
            <div>
                <vue-core-image-upload
                @imageuploaded="imageuploaded"
                crop="local"
                :max-file-size="5242880"
                url="http://140.143.34.162:3000/user/upload" >
                <img class="portrait" :src="src"/>
                </vue-core-image-upload>
                <div class="username">{{nickname}}</div>
            </div>
        </div>
        <!--预览头像-->
        
        <!---->
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
import Footer from './Footer';
import VueCoreImageUpload  from 'vue-core-image-upload';

export default {
    name: 'Personal',
    created(){
       
        var token = sessionStorage.getItem('token');
        var username = sessionStorage.getItem('username');
        var type = sessionStorage.getItem('type')
        var url = getUrl();
        axios({
            url: `${url}/user/search?token=${token}&username=${username}&type=${type}`,
            method: 'get'
        }).then((res)=>{
            this.nickname = res.data.nickname;
            this.username = res.data.username;
            this.type = res.data.type == 0 ? '维保人员':'检验人员'
        })
    },
    data(){
        return {
           username: sessionStorage.getItem('username'),
           nickname: '',
           type: '',
           src: '../../static/头像.jpg',
        }
    },
    components:{
        Footer,
        'vue-core-image-upload': VueCoreImageUpload
    },
    methods:{
        exit(){
            // this.$store.dispatch('addNote','haha')
            // window.postMessage('exit');
            sessionStorage.clear();
            window.location.href = '#/'
        },
        imageuploaded(res) {
            console.log('上传完毕!');
            console.log(res);
            // if (res.errcode == 0) {
            var url = res.url;
            if(res.code == 0){
                console.log(url);
                console.log('??');
                this.src = `http://140.143.34.162:3000/${url}`;
            }
            //     this.src = 'http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png';
            // // }
        }
    },
}
</script>
<style scoped>
.container{
    overflow-x: hidden;
}
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
.portrait-preview{
    width:100%
}
</style>
