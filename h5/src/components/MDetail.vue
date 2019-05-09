<template>
    <div class="container">
        <div class="header">
            <div class="goBack" @click="goBack">
                <img src="../../static/左箭头黑.png" />
            </div>
            {{nickname}}
        </div>
        <!--聊天内容区-->
        <div class="content">
            <div class="content-each" v-for="item in messages" :key="item.index">
                <div v-if="item.sendId == localName" class="content-right">
                    {{item.content}}
                </div>
                <div v-else class="content-left">
                    {{item.content}}
                </div>
                <div style="clear:both"></div>
            </div>
        </div>    
        <!--底部交互-->
        <div class="footer">
            <input type="text" v-model="sendTxt" class="txtInput"/>
            <button class="send" @click="send">发送</button>
        </div>
    </div>
</template>
<script>
import io from 'socket.io-client';
import getUrl from '../config';
import axios from 'axios';

export default {
    name: 'MDetail',
    created(){
        this.url = getUrl();
        this.socket = io(`${this.url}`);
        var socket = this.socket;
        // socket.emit('group1')
        var self = this;
        socket.on('recMsg',function(msg){
            // 过滤 只接受发送给自己的消息
            // if(msg.sendName == sessionStorage.getItem('username')){
            //     self.$store.dispatch('addMsg',msg);
            //     self.duifangName = msg.receiveName;
            // }
            
            self.$store.dispatch('addMsg',msg);
            self.duifangName = msg.receiveName;
        })
        this.getData();
    },
    destroyed(){
        this.socket.close();
    },
    methods:{
        goBack(){
            this.$router.back(-1);
        },
        // 发送消息
        send() {
          var sendData = {
            sendId: this.localName,
            receiveName: this.name,
            content: this.sendTxt,
            s_time: Date.parse(new Date()) 
          }
          let postData = this.$qs.stringify({
            username: this.localName,
            sendname: this.localName,
            receivename: this.name,
            token: sessionStorage.getItem('token'),
            content: this.sendTxt,
            sendtime: Date.parse(new Date()),
            nickname: this.m_nickname,
            avat_url: this.avat_url
          })
          axios({
            url: `${this.url}/message/send`,
            method: 'post',
            data: postData
          }).then((res)=>{
            if(res.data.code == 0) {
              this.socket.emit('sendMsg',sendData)
              this.sendTxt = '';
            }
          })
        },
        //
        getData(){
            var username = sessionStorage.getItem('username');
            var token = sessionStorage.getItem('token');
            var duifangname = this.name;
            var type = sessionStorage.getItem('type');
            axios.all([
              axios.get(`${this.url}/message/detail?username=${username}&token=${token}&duifangname=${duifangname}&type=${type}`),
              axios.get(`${this.url}/user/search?username=${username}&token=${token}&type=${type}`)
            ]).then(axios.spread((res1,res2)=>{
              if(res1.data.code == 0) {
                this.$store.dispatch('initMsg',res1.data.data)
              } else {
                alert(res1.data.msg);
              }
              if(res2.data.code == 0) {
                var data = JSON.parse(res2.data.data);
                this.avat_url = data.avat_url;
                this.m_nickname = data.nickname;
              }
              // this.avat_url = res2.data.avat_url;
              // this.m_nickname = res2.data.nickname;
            })).catch((err)=>{

            })
        }
       
    },
    computed:{
        messages(){
            return this.$store.state.msgs
        } 
    },
    data:function(){
        return {
            socket: null,
            localName: sessionStorage.getItem('username'),
            name:this.$route.params.name,
            sendTxt: '',
            duifangName: this.$route.params.name,
            url: null,
            nickname: this.$route.params.nickname,
            m_nickname: null,
            avat_url: null,
        }
    }
}
</script>
<style scoped>
.container{
    background: rgb(238,238,238);
    padding-top: 3rem;
    padding-bottom: 2rem;
}
.header{
    position: fixed;
    top: 0;
    height: 3rem;
    background: #fff;
    text-align: center;
    width: 100%;
    line-height: 3rem;
}
.goBack{
    position: fixed;
    top:0;
    left: 0.3rem;
}
.footer{
    position: fixed;
    bottom: 0;
    height: 2rem;
    background: #fff;
    width: 100%;
}

.content-each{
    min-height: 3rem;
    /* background: #fff; */
    margin-top:0.5rem;
    padding: 0.3rem 1rem;
}
.content-right{
    background: green;
    float: right;
    color: #fff;
    border-radius: 0.5rem;
    padding: 0.5rem;
}
.content-left{
    float: left;
    background: #fff;
    border-radius: 0.5rem;
    padding: 0.5rem;
}
.send{
    position: absolute;
    right: 0.5rem;
    bottom: 0;
    color: blueviolet;
    border: none;
    background: #fff;
    height: 100%;
}
.txtInput{
    height: 100%;
    width: 85%;
    border: none;
}
</style>
