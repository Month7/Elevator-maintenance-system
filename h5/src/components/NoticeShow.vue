<template>
  <div class="container">
    <!--header-->
    <div class="header">
      <span v-if="loading">loading...</span>
      <span v-else>公告</span>
      <div class="goBack" @click="goBack">
        <img src="../../static/左箭头.png" />
      </div>
    </div>
    <div v-if="loading" class="loading">
      <img src="../../static/loading.gif">
    </div>
    <!--content-->
    <div class="content" v-else-if="loading == false && list.length>0">
      <div class="content-each" v-for="item in list" :key="item.index">
        <div class="content-header">
          <div class="content-title">
            {{item.title}}
          </div>
          <div class="content-time">
            {{item.time | time}}
          </div>
        </div>
        <div style="padding:.3rem">{{item.content}}</div>
      </div>
    </div>
    <div style="text-align:center" v-else>
      暂时没有公告!
    </div>
    <Warning :show="this.showWarning" :msg="this.msg"></Warning>
  </div>
</template>
<script>
import getUrl from '../config'
import axios from 'axios';
import Warning from '../common/Warning'
export default {
  name: 'NoticeShow',
  created(){
    this.url = getUrl();
    this.getData();
  },
  components:{
    Warning
  },
  methods: {
    getData(){
      var username = sessionStorage.getItem('username');
      var token = sessionStorage.getItem('token');
      axios({
        url: `${this.url}/notice/info?username=${username}&token=${token}`
      }).then((res)=>{
        if(res.data.code == 0){
          this.list = res.data.data
          this.loading = false;
        }
      })
    },
    $alert(msg,time){
      this.showWarning = true;
      this.msg = msg;
      setTimeout(()=>{
        this.showWarning = false;
      },1500)
    },
    goBack(){
      this.$router.back(-1);
    },
  },
  data(){
    return {
      noticeContent: null,
      url: null,
      showWarning: false,
      msg: '',
      list: [],
      loading: true
    }
  },
  filters:{
    time(time){
      return new Date(parseInt(time)).toLocaleString().replace(/:\d{1,2}$/,' ');   
    },
  }
}
</script>
<style scoped>
.container{
  overflow-x: hidden;
  background: rgb(238,238,238);
  padding-top: 2.5rem;
}
.header{
  top: 0;
  position: fixed;
	height: 2.5rem;
  background: rgb(30,129,210);
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.goBack{
  position: fixed;
  left: 0.5rem;
}
.header-submit{
	position: absolute;
  right: 0.6rem;
}
.content-each{
  background: #fff;
  margin-top: .5rem;
  min-height: 6rem;
  font-size: .9em;
}
.content-header{
  border-bottom: 1px solid rgb(218,218,218);
  padding-left: .3rem;
}
.content-time{
  color: gray;
  font-size: .8em;
  padding: .1rem .3rem;
}
.content-title{
  font-size: 1.1em;
  padding: .1rem .3rem;
}
</style>
