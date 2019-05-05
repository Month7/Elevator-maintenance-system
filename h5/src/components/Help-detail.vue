<template>
  <div class="container">
    <!--header-->
    <div class="header">
      <div class="goBack" @click="goBack">
          <img src="../../static/左箭头.png" />
      </div>
      <div v-if="status < 2">
        用户角色
      </div>
      <div v-else>
        功能说明
      </div>
    </div>
    <!--content-->
    <div class="content">
      <!--检验人员权限-->
      <div class="text" v-if="status == 0">
        检验人员所拥有的权限：
        <div>发布/撤销/评价电梯维修任务</div>
        <div>发布公告</div>
      </div>
      <!--维保人员权限-->
      <div class="text" v-else-if="status == 1">
        维保人员所拥有的权限：查看/领取/完成电梯维修任务
        <div>查看公告</div>
      </div>
      <!--日常保养功能说明-->
      <div class="text" v-else-if="status == 2">
        日常保养流程:
        <div>1)检验人员发布电梯维修任务</div>
        <div>2)维保人员在待领任务列表里领取电梯维修任务</div>
        <div>3)维保人员完成电梯维修任务后,确认完成任务</div>
        <div>4)检验人员对此次维修评价打分</div>
      </div>
      <!--急修管理功能说明-->
      <div class="text" v-else-if="status == 3">
        急修流程:
        <div>1)检验人员发布电梯维修任务</div>
        <div>2)维保人员在待领急修任务列表里领取电梯维修任务</div>
        <div>3)维保人员完成电梯维修任务后,确认完成任务</div>
        <div>4)检验人员对此次维修评价打分</div>
      </div>
    </div>
  </div>    
</template>
<script>
export default {
  name: 'Help-detail',
  data(){
    return {
      status: this.$route.params.status,
    }
  },
  methods:{
    goBack(){
      this.$router.back(-1);
    }
  }  
}
</script>
<style scoped>
.container{
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
.text{
  width: 90%;
  margin: .8rem auto;
  border: 1px solid rgb(238,238,238);
  box-shadow: .1rem .1rem .1rem .1rem rgb(206,206,206);
  color: rgb(178,178,178);
  text-indent: 1rem;
}
</style>
