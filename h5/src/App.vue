<template>
  <div id="app">
    <router-view names="lists" class="lists"/>
    <img src="../static/loading.gif" style="display:none"/>
  </div>
</template>

<script>
import Warning from './common/Warning'
import getUrl from './config';
import axios from 'axios';
export default {
  name: 'App',
  components:{
    Warning
  },
  created() {
    var self = this;
    var url = getUrl();
    var username = sessionStorage.getItem('username');
    this.$socket.on('recMsg',function(msg){
      // 过滤 只接受发送给自己的消息
      if(msg.sendName == username){
        let postData = self.$qs.stringify({
          username: username,
          sendName: msg.receiveName,
          token: sessionStorage.getItem('token'),
          content: msg.content
        })
        axios({
          url: `${url}/message/add`,
          method: 'post',
          data: postData
        }).then((res)=>{
          self.$store.dispatch('addMsg',msg);
        })
        self.duifangName = msg.receiveName;
      }
    })
  },
  data(){
    return {
      showFlag: false,
      duifangName: null,
    }
  }
}
</script>

<style>
	html {
    background-color: #DDDDDD;
  }
  html,body,#app {
    height: 100%;
  }
  .nav{
    height: 40px;
    position: fixed;
    top:0;
    width: 100%;
  }
  .lists{
    overflow-x:auto;  
    overflow-y:scroll;  
    background: #fff;
    box-sizing: border-box;
    padding-bottom: 4rem;
    height: 100%;
  }
  body,div,span,a,p,ul,li {
    margin: 0;
  }
  .loading{
    height: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
