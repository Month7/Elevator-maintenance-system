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
      if(msg.sendName == username){
        let postData = self.$qs.stringify({
          username: username,
          sendName: msg.receiveName,
          token: sessionStorage.getItem('token'),
          content: msg.content
        })
        // axios({
        //   url: `${url}/message/add`,
        //   method: 'post',
        //   data: postData
        // }).then((res)=>{
        //   self.$store.dispatch('addMsg',msg);
        // })
      }
    })
  },
  mounted() {
    document.body.removeChild(document.getElementById('loading'))
  },
  data(){
    return {
      showFlag: false,
     
    }
  }
}
</script>

<style>
	html {
    background-color: #DDDDDD;
  }
  .content{
    overflow-x: hidden!important;
  }
  html,body,#app {
    height: 100%;
    overflow-x: hidden;
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
  .left-banner{
    background: red;
    height: 1.25rem;
    width: .25rem;
    margin-right: 0.3rem;
  }
  .left-banner-green{
    background: greenyellow;
    height: 1.25rem;
    width: .25rem;
    margin-right: 0.3rem;
  }
</style>
