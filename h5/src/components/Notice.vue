<template>
  <div class="container">
    <!--header-->
    <div class="header">
      发布公告
      <div class="goBack" @click="goBack">
        <img src="../../static/左箭头.png" />
      </div>
      <span class="header-submit" @click="submit">
				发布
			</span>
    </div>
    <!--content-->
    <div class="content">
      <textarea v-model="title" placeholder="标题（必填），4-40字" class="notice-title">
      </textarea>
      <textarea v-model="noticeContent" placeholder="正文（必填），15-500字" class="notice-content">
      </textarea>
    </div>
    <Warning :show="this.showWarning" :msg="this.msg"></Warning>
  </div>
</template>
<script>
import getUrl from '../config'
import axios from 'axios';
import Warning from '../common/Warning'
export default {
  name: 'Notice',
  created(){
    this.url = getUrl();
  },
  components:{
    Warning
  },
  methods: {
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
    submit(){
      if(!this.title){
        this.$alert('标题不能为空!');
        return;
      }
      if(!this.noticeContent){
        this.$alert('正文不能为空!');
        return;
      }
      let postData = this.$qs.stringify({
        username: sessionStorage.getItem('username'),
        token: sessionStorage.getItem('token'),
        content: this.noticeContent,
        title: this.title,
        time: Date.parse(new Date())
      })
      axios({
        url: `${this.url}/notice/submit`,
        method: 'post',
        data: postData
      }).then((res)=>{
        if(res.data.code == 0) {
          this.$alert(res.data.msg);
          this.title = '';
          this.noticeContent = '';
        } else {
          this.$alert(res.data.msg);
        }
      })
    }
  },
  data(){
    return {
      noticeContent: null,
      title: null,
      url: null,
      showWarning: false,
      msg: ''
    }
  },
}
</script>
<style scoped>
.container{
  overflow-x: hidden;
  background: rgb(238,238,238);
}
.header{
	height: 2rem;
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
.notice-title{
  width: 100%;
	border: none;
	height: 1.5rem;
  padding: .3rem .9rem;
  line-height: 1.5rem;
  margin-bottom: .5rem;
}
.notice-content{
  width: 100%;
	border: none;
	height: 8rem;
	padding: .3rem .9rem;
}
</style>
