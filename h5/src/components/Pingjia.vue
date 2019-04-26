<template>
    <div class="container">
			  <!--header-->
        <div class="header">
            <span class="header-goBack" @click="goBack">
                <img src="../../static/左箭头.png" />
            </span>
						发表评价
						<span class="header-submit" @click="submit">
							发布
						</span>
        </div>
				<!--content-->
				<div class="content">
					<textarea placeholder="对这次电梯维修满意吗？" class="content-txt">
					</textarea>
					<!--评价rate-->
					<div class="rate">
						<div class="rate-header">
							<img src="../../static/评价d.png" />
						  &nbsp&nbsp维保评分
						</div>
						<!--rate-content-->
						<div class="rate-content">
							<!--维修满意度-->
							<div class="rate-main">
								维修水平&nbsp&nbsp&nbsp&nbsp
								<el-rate
								v-model="score1"
								:colors="colors"
								show-text>
								</el-rate>
							</div>
							<!--态度满意度-->
							<div class="rate-main">
								服务态度&nbsp&nbsp&nbsp&nbsp
								<i class="icon-rate-face"></i>
								<el-rate
									v-model="score2"
									:colors="colors"
									show-text>
								</el-rate>
							</div>
						</div>
					</div>
				</div>
    </div>
</template>
<script>
import axios from 'axios';
import getUrl from '../config'
export default {
	name: 'Pingjia',
	data(){
		return {
			colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
			score1: 3,
			score2: 2,
			iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'] 
		}
	},
  methods:{
		// 返回上一页
		goBack(){
      this.$router.back(-1);
		},
		// 提交评价
		submit(){
			let postData = this.$qs.stringify({
				score1: this.score1,
				score2: this.score2,
				token: sessionStorage.getItem('token'),
				username: sessionStorage.getItem('username')
			});
			var url = getUrl();
			axios({
				url: `${url}/elevator/evaluate`,
				data: postData
			}).then((res)=>{

			})
		}
  }
}
</script>
<style scoped>
.container{   
    width: 100%;
    background: rgb(238,238,238);
		overflow-x: hidden;
}
.header{
    height: 2.5rem;
    text-align: center;
    color: #fff;
    background: rgb(30,129,210);
    line-height: 2.5rem;
}
.header-goBack{
    position: absolute;
    left: 0.3rem;
}
.header-submit{
	position: absolute;
  right: 0.6rem;
}
.content-txt{
	width: 100%;
	border: none;
	height: 8rem;
	padding: .5rem .9rem;
}
.rate{
	background: #fff;
	margin-top:0.5rem;
}
.rate-header{
	padding: .5rem;
	display: flex;
	align-items: center;
}
.rate-content{
	padding: .1rem .5rem;
}
.rate-main{
	display: flex;
	margin: .5rem;
}
</style>
