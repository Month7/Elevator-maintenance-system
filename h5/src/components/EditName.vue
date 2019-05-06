<template>
  <div class="container">
    <!--header-->
    <div class="header">
      <span class="header-goBack" @click="goBack">
        <img src="../../static/左箭头.png" />
      </span>
        昵称
      <span class="header-submit" @click="submit">
				完成
			</span>
    </div>
    <!--content-->
    <div class="content">
      <input type="text" v-model="nickname" class="nickname"/>
    </div>
  </div>  
</template>
<script>
import axios from 'axios';
import getUrl from '../config'
export default {
  name: 'EditName',
  data(){
    return {
      nickname: 'Month想去阿里做福娃',
      url: null,
      username: null,
      token: null,
      type: null,
    }
  },
  methods:{
    getData(){
     
      axios({
        url: `${this.url}/user/search?username=${this.username}&token=${this.token}&type=${this.type}`
      }).then((res)=>{
        this.nickname = res.data.nickname;
      })
    },
    goBack(){
      this.$router.back(-1);
    },
    submit(){
      var postData = this.$qs.stringify({
        username: this.username,
        type: this.type,
        token: this.token,
        nickname: this.nickname
      })
      axios({
        url: `${this.url}/user/nick`,
        method: 'post',
        data: postData
      }).then((res)=>{
        if(res.data.code == 0) {
          this.$router.back(-1)
        }
      })
    }
  },
  created(){
    this.username = sessionStorage.getItem('username');
    this.token = sessionStorage.getItem('token');
    this.type = sessionStorage.getItem('type')
    this.url = getUrl();
    this.getData();
  }
}
</script>
<style scoped>
.container{
    overflow-x: hidden;
    background: rgb(238,238,238);
}
.header{
    background: rgb(30,129,210);
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.header-goBack{
    position: absolute;
    left: 0.3rem;
}
.header-submit{
	position: absolute;
  right: 0.6rem;
}
.nickname{
  width: 100%;
  border: none;
  outline: none;
  padding: .7rem .3rem;
}
</style>
