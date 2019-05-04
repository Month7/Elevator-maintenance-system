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
			<div class="content-header">
        <div style="display:flex"> 
          <div class="left-banner"></div>
            用户角色
        </div>
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
	}
}
</script>
<style scoped>
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
.content-header{
    width: 100%;
    border-bottom: 1px solid rgb(238,238,238);
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 1rem;
    padding: .1rem .3rem;
}
</style>
