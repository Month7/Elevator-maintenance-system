<template>
  <div id="app">
    <router-view names="lists" class="lists"/>
  </div>
</template>

<script>
import Footer from './components/Footer'
export default {
  name: 'App',
  components:{
    Footer
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
