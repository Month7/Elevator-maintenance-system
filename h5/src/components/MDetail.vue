<template>
    <div class="container">
        <div class="header">
            <div class="goBack" @click="goBack">
                <img src="../../static/左箭头黑.png" />
            </div>
            {{name}}
        </div>
        <!--聊天内容区-->
        <div class="content">
            <div class="content-each" v-for="item in messages" :key="item.index">
                <div v-if="item.receiveName == localName" class="content-right">
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
import getUrl from '../config'

export default {
    name: 'MDetail',
    created(){
        var url = getUrl();
        this.socket = io(`${url}`);
        var socket = this.socket;
        // socket.emit('group1')
        var self = this;
        socket.on('recMsg',function(msg){
            console.log(msg);
            // 过滤 只接受发送给自己的消息
            // if(msg.sendName == sessionStorage.getItem('username')){
            //     self.$store.dispatch('addMsg',msg);
            //     self.duifangName = msg.receiveName;
            // }
            self.$store.dispatch('addMsg',msg);
            self.duifangName = msg.receiveName;
        })
    },
    destroyed(){
        this.socket.close();
    },
    methods:{
        goBack:function(){
            this.$router.back(-1);
        },
        // 发送消息
        send:function () {
            var localName = this.$route.params.localName || 'Month';
            var sendData = {
                sendName: this.duifangName,
                receiveName: localName,
                content: this.sendTxt
            }
            this.socket.emit('sendMsg',sendData)
            this.sendTxt = '';
        },
       
    },
    computed:{
        test(){
            return this.$store.state.msg;
        }
    },
    data:function(){
        return {
            socket: null,
            localName:this.$route.params.localName || 'Month',
            name:this.$route.params.name,
            sendTxt: '',
            messages: this.$store.state.msgs,
            duifangName: null
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
