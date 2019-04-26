<template>
  <div id="app">
    <router-view names="lists" class="lists"/>
  </div>
</template>

<script>
import Warning from './common/Warning'
import io from 'socket.io-client';
import getUrl from './config';
export default {
  name: 'App',
  components:{
    Warning
  },
  created(){
    var url = getUrl();
    this.socket = io(`${url}`);
    var socket = this.socket;
  },
  data(){
    return {
      showFlag: false
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
    /* padding-top:5rem; */
    background: #fff;
    
    box-sizing: border-box;
    padding-bottom: 4rem;
    height: 100%;
  }
  body,div,span,a,p,ul,li {
    margin: 0;
    /* padding: 0; */
  }
</style>
