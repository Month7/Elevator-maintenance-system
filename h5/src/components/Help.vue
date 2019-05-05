<template>
  <div class="container">
		<div class="header">
			<!--header-->
			<div class="h-nav">
        <div class="goBack" @click="goBack">
          <img src="../../static/左箭头.png" />
        </div>
        新手帮助
      </div>
		</div>
		<div class="banner"> <img src='../../static/帮助.jpg' /> </div>
		<!--content-->
		<div class="content">
			<!--content-header-->
			<div class="content-header">
        <div style="display:flex"> 
          <div class="left-banner"></div>
            用户角色
        </div>
      </div>
			<!--content-header-->
			<!--content-->
			<!--检验人员-->
			<div class="content-each" @click="goDetail(0)">
				<div class="content-img">
					<img src="../../static/检验人员.png" />
          检验人员
				</div>
				<img src="../../static/右箭头.png" />
			</div>
			<!--维保人员-->
			<div class="content-each" @click="goDetail(1)">
				<div class="content-img">
					<img src="../../static/工人.png" />
          维保人员
				</div>
				<img src="../../static/右箭头.png" />
			</div>
		</div>
    <!--功能-->
		<div class="content">
			<!--content-header-->
			<div class="content-header">
        <div style="display:flex"> 
          <div class="left-banner"></div>
            功能说明
        </div>
      </div>
			<!--content-header-->
			<!--content-->
			<!--检验人员-->
			<div class="content-each" @click="goDetail(2)">
				<div class="content-img">
					<img src="../../static/工作记录.png" />
          日常保养
				</div>
				<img src="../../static/右箭头.png" />
			</div>
			<!--维保人员-->
			<div class="content-each" @click="goDetail(3)">
				<div class="content-img">
					<img src="../../static/报警.png" />
          急修管理
				</div>
        <img src="../../static/右箭头.png" />
			</div>
		</div>
	</div>
  
</template>
<script>
export default {
	name: 'Help',
	methods:{
		goBack(){
      this.$router.back(-1);
		},
		goDetail(status) {
      this.$router.push({ name: 'HelpDetail', params: { status: status }})
		}
	}
}
</script>
<style scoped>
.container{
	background: rgb(238,238,238);
}
.content{
	background: #fff;
}
.header{
	height: 2rem;
  background: rgb(30,129,210);
  width: 100%;
	color: #fff;
}
.goBack{
  position: fixed;
  left: 0.5rem;
}
.h-nav{
  color: #fff;
  text-align: center;
  height: 2rem;
  line-height: 2rem;
}
.banner img{
	width: 100%;
	height: auto;
}
.content{
  margin-bottom: 1rem;
}
.content-header{
  width: 100%;
  border-bottom: 1px solid rgb(238,238,238);
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: 1rem;
  padding: .1rem .3rem;
}
.content-each{
	display: flex;
	align-items: center;
  height: 1.8rem;
  border-bottom: 1px solid rgb(238,238,238);
  padding: .2rem .5rem;
  justify-content: space-between;
}
.content-img{
  height: 1.6rem;
  display: flex;
  align-items: center;
}
.content-img img{
	/* border-radius: 50%; */
	height: 1.6rem;
	width: 1.6rem;
}
</style>
