<template>
    <div class="container">
        <div class="header">
            <div class="goBack" @click="goBack"> <返回 </div>
            {{name}}
        </div>
        <!--聊天内容区-->
        <div class="content">
            <div class="content-each" v-for="item in messages" :key="item.index">
                <div v-if="item.name == localName" class="content-right">
                    {{item.content}}
                </div>
                <div v-else class="content-left">
                    {{item.content}}
                </div>
                <!--清除浮动-->
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
export default {
    name: 'Test',
    created(){
        var url = getUrl();
        this.socket = io(`${url}`);
        var socket = this.socket;
        var self = this;
        socket.on('recMsg',function(msg){
            self.$store.dispatch('addMsg',msg);
        })
    },
    destroyed(){
        this.socket.close();
    },
    methods:{
        goBack:function(){
            this.$router.back(-1);
        },
        send:function () {
            var localName = this.$route.params.localName || 'Pony马';
            var sendData = {
                name: localName,
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
            localName:this.$route.params.localName || 'Pony马',
            name:this.$route.params.name || '临时测试页面',
            sendTxt: '',
            messages: this.$store.state.msgs
        }
    }
}
</script>
<style scoped>
.container{
    background: rgb(238,238,238);
    padding-top: 3rem;
    padding-bottom: 3rem;
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
    height: 3rem;
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
