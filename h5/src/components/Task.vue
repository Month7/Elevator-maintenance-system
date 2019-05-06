<template>
    <div class="container">
        <!--header-->
        <div class="header">
            <span class="header-goBack" @click="goBack">
                <img src="../../static/左箭头.png" />
            </span>
            任务下达
        </div>
        <!--content-->
        <div class="content">
            <!--任务描述-->
            <div class="statementContainer">
                <textarea v-model="statement" class="statement" placeholder="请输入任务相关内容"></textarea>
            </div>
            <!--电梯位置等信息-->
            <!--任务类型-->
            <div class="content-each">
                <label class="desc-must">
                    任务类型
                </label>
                <el-select size="mini" v-model="status" placeholder="请选择" class="type-select">
                        <el-option class="type-select"
                        label="一般"
                        value="2"
                        >
                        </el-option>
                        <el-option class="type-select"
                        label="紧急"
                        value="5"
                        >
                        </el-option>
                </el-select>
            </div>
            <!--预计完成时间-->
            <div class="content-each">
                <label class="desc-must">
                    计划完成时间
                </label>
                <el-date-picker
                class="type-select"
                size="mini"
                v-model="wanchengtime"
                type="datetime"
                placeholder="选择日期时间">
                </el-date-picker>
            </div>
            <!--电梯编号-->
            <div class="content-each">
                <label class="desc-must">
                    电梯编号
                </label>
                <el-input size="mini" v-model="code" placeholder="请输入电梯编号" class="type-select"></el-input>
            </div>
            <!--电梯位置-->
            <div class="content-each">
                <label class="desc-must">
                    电梯位置
                </label>
                <el-input size="mini" v-model="location" placeholder="请输入电梯位置" class="type-select"></el-input>
            </div>
            <!--button-->
            <div class="">
                <button class="button" @click="xiada">确认下达</button>
            </div>
        </div>
        <Warning :show="this.showWarning" :msg="this.msg"></Warning>
    </div>    
</template>
<script>
import axios from 'axios'
import getUrl from '../config'
import Warnging from '../common/Warning'
export default {
    name: 'Task',
    data(){
        return {
            statement:'',        // 任务叙述
            status: null,       // 任务类型 (紧急1/一般2)
            wanchengtime: '',    // 计划完成时间
            code: '',            // 电梯编号
            location: '',         // 电梯位置
            showWarning: null,
            msg: null
        }
    },
    methods: {
        $alert(msg){
            this.showWarning = true;
            this.msg = msg;
            setTimeout(()=>{
                this.showWarning = false;
            },1500)
        },
        goBack:function(){
            this.$router.back(-1);
        },
        xiada(){
            let postData = this.$qs.stringify({
                token: sessionStorage.getItem('token'),
                username: sessionStorage.getItem('username'),
                statement: this.statement,
                status: this.status,                 
                code: this.code,
                location: this.location,
                wanchengtime: Date.parse(this.wanchengtime),
                xiafatime: Date.parse(new Date())
            });
            var url = getUrl();
            axios({
                url: `${url}/elevator/assign`,
                method: 'post',
                data: postData
            }).then((res) => {
                this.$alert(res.data.msg);
            })
        }
    }
}
</script>
<style scoped>
.container{
    padding-top:3rem;
    overflow-x: hidden;
    background: rgb(242,242,242);
}
.header{
    height: 2.5rem;
    text-align: center;
    color: #fff;
    background: rgb(30,129,210);
    line-height: 2.5rem;
    position: fixed;
    top:0;
    width: 100%;
}
.header-goBack{
    position: absolute;
    left: 0.3rem;
}
.statement{
    /* width: 100%; */
    width: 95%;
    height: 3.5rem;
    border-radius: 0.3rem;
}
.statementContainer{
    padding: 0 0.3rem;
    text-align: center;
}
.content-each{
    background: #fff;
    padding: 0.3rem 0.3rem;
    font-size: 0.5rem;
    margin-top: 0.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.type-select{
    width: 9rem;
}
.button{
    display: block!important;
    margin-top:1rem!important;
    border: 1px solid #fff;
    outline: none;
    background: #fff;
    width: 85%;
    height: 2.7rem;
    line-height: 2.7rem;
    background: rgb(30,129,210);
    color: #fff;;
    font-size: 1rem;
    border-radius: 2rem;
    margin: auto;
    text-decoration: none;
}
.desc-must::before{
  content: "*";
  color: #f56c6c;
  margin-right: .05rem;
}
</style>
