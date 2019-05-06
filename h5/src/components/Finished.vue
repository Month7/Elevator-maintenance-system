<template>
    <div class="container">
        <!--header-->
        <div v-if="loading" class="header">
            <span class="header-goBack" @click="goBack">
                <img src="../../static/左箭头.png" />
            </span>
            loading...
        </div>
        <div class="header" v-else>
            <span class="header-goBack" @click="goBack">
                <img src="../../static/左箭头.png" />
            </span>
            {{ status|titleTxt }}
        </div>
        <div v-if="loading" class="loading">
            <img src="../../static/loading.gif">
        </div>
        <div v-else>
        <!--content-->
            <div class="content" v-for="item in list" :key="item.index">
                <!--保养时间-->
                <div class="content-each" v-if="item.baoyangtime">
                    <div class="description">保养时间:  </div>
                    <div class="text">{{item.baoyangtime|time}}</div>
                </div>
                <!--评价时间-->
                <div class="content-each" v-if="item.pingjiatime">
                    <div class="description">评价时间:  </div>
                    <div class="text">{{item.pingjiatime|time}}</div>
                </div>
                <!--电梯位置-->
                <div class="content-each" v-if="item.location">
                    <div class="description">电梯位置:  </div>
                    <div class="text">{{item.location}}</div>
                </div>
                <!--故障描述-->
                <div class="content-each" v-if="item.statement">
                    <div class="description">任务说明:  </div>
                    <div class="text">{{item.statement}}</div>
                </div>
                <!--注册代码-->
                <div class="content-each" v-if="item.code">
                    <div class="description">注册代码:  </div>
                    <div class="text">{{item.code}}</div>
                </div>
                <!--维保负责人-->
                <div class="content-each" v-if="item.headman">
                    <div class="description">维保负责人:  </div>
                    <div class="text">{{item.headman}}</div>
                </div>
                <!--电梯状态-->
                <div class="content-each" v-if="status ==5 || status ==6">
                    <div class="description">电梯状态  </div>
                    <div class="text" v-if="item.status == 0 || item.status ==1">已完成</div>
                    <div class="text" v-if="item.status == 2">待保养</div>
                    <div class="text" v-if="item.status == 3">保养中</div>
                    <div class="text" v-if="item.status == 4">超期</div>
                    <div class="text" v-if="item.status == 5">急修</div>
                </div>
                <!--管理员操作button-->
                <div v-if="status == 6" class="manageBtn">
                    <div class="">
                        <button class="button toReceive" @click="deleteTask(item.code)">撤销</button>
                    </div>
                </div>
                <!--管理员评价-->
                <div class="manageBtn" v-if="status == 7">
                    <router-link :to="{ name: 'Pingjia', params: { id: item.code }}" class="button toReceive" >去评价</router-link>
                </div>
                <!--维保得到的评价-->
                <div v-if="(item.status == 1 && status == 0) || status == 8" class="content-each" style="display:block">
                    <!--服务态度-->
                    <div style="display:flex;">
                        <div class="description">服务态度:</div>
                        <Pingfenshow :score="item.score1" ></Pingfenshow>
                    </div>
                    <!--保养满意度-->
                    <div style="display:flex;">
                        <div class="description">保养满意度:</div>
                        <Pingfenshow :score="item.score2" ></Pingfenshow>
                    </div>
                </div>
                <!--待保养-->
                <div v-if="status == 2 && item.status == 2" class="daibaoyang">
                    <button class="button toReceive" @click="showDialog('receive',item.code)">领取</button>
                </div>
                <el-dialog
                        :visible.sync="toReceiveDialogShow"
                        width="90%"
                        :before-close="()=>toReceiveDialogShow=false">
                        确定要领取这个维修任务吗？
                        <span slot="footer" class="dialog-footer">
                            <el-button size="mini" @click="toReceiveDialogShow=false">取 消</el-button>
                            <el-button size="mini" type="primary" @click="toReceive">确 定</el-button>
                        </span>
                </el-dialog>
                <!--保养中-->
                <div v-if="status == 3 && item.status == 3" class="daibaoyang">
                    <button class="button toReceive" @click="showDialog('complete',item.code)">完成</button>
                </div>
                <el-dialog
                        :visible.sync="toCompleteDialog"
                        width="90%"
                        :before-close="()=>toCompleteDialog=false">
                        确定要完成这个维修任务吗？
                        <span slot="footer" class="dialog-footer">
                            <el-button size="mini" @click="toCompleteDialog=false">取 消</el-button>
                            <el-button size="mini" type="primary" @click="toComplete">确 定</el-button>
                        </span>
                </el-dialog>
                <!--删除确认dialog-->
                <el-dialog
                        :visible.sync="toDeleteDialog"
                        width="90%"
                        :before-close="()=>toDeleteDialog=false">
                        确定要完成这个维修任务吗？
                        <span slot="footer" class="dialog-footer">
                            <el-button size="mini" @click="toDeleteDialog=false">取 消</el-button>
                            <el-button size="mini" type="primary" @click="toDelete">确 定</el-button>
                        </span>
                </el-dialog>
        </div>
        </div>
        <Warning :show="this.showWarning" :msg="this.msg"></Warning>
    </div>
</template>
<script>
import axios from 'axios'
import Warning from '../common/Warning'
import getUrl from '../config'
import Pingfenshow from './Pingfenshow'
export default {
    name: 'Finished',
    created(){
        this.url = getUrl();
        this.getData();
    },
    components:{
        Warning,
        Pingfenshow,
    },
    methods:{
        getData(){
            var username = sessionStorage.getItem('username');
            var token = sessionStorage.getItem('token');
            var url = getUrl();
            axios({
                url: `${url}/elevator/getInfo?username=${username}&token=${token}&status=${this.status}`,
                method: 'get',
            }).then((res)=>{
                if(res.data.code == 0) {
                    this.list = res.data.data;
                    this.loading = false;
                } else {
                    this.$alert(res.data.msg);
                } 
            }).catch((e)=>{
            })
        },
        // 显示对话框
        showDialog(status,code){
            if(status == 'receive') {
                this.toReceiveDialogShow = true;
            } else {
                this.toCompleteDialog = true;
            }
            this.selectedCode = code;
        },
        $alert(msg){
            this.showWarning = true;
            this.msg = msg;
            setTimeout(()=>{
                this.showWarning = false;
            },1500)
        },
        // 领取任务
        toReceive(code){
            this.toReceiveDialogShow = false;
            let postData = this.$qs.stringify({
                code: this.selectedCode,
                username: sessionStorage.getItem('username'),
                token: sessionStorage.getItem('token')
            });
            axios({
                url: `${this.url}/elevator/receive`,
                method: 'post',
                data: postData
            }).then((res) => {
                if(res.data.code == 0){
                    this.$alert(res.data.msg);
                    this.getData();
                } 
            })
        },
        // 完成领取的任务
        toComplete(){
            this.toCompleteDialog = false;
            let postData = this.$qs.stringify({
                code: this.selectedCode
            });
            axios({
                url: `${this.url}/elevator/complete`,
                method: 'post',
                data: postData
            }).then((res) => {
                if(res.data.code == 0){
                    this.$alert(res.data.msg);
                    this.getData();
                } 
            })
        },
        // 返回上一页
        goBack(){
            this.$router.back(-1);
        },
        // 检验人员删除任务
        toDelete(){
            this.toDeleteDialog = false;
            let postData = this.$qs.stringify({
                code: this.selectedCode,
                username: sessionStorage.getItem('username'),
                token: sessionStorage.getItem('token'),
            });
            axios({
                url:`${this.url}/elevator/delete`,
                method: 'post',
                data: postData
            }).then((res) => {
                if(res.data.code == 0) {
                    this.$alert(res.data.msg);
                    this.getData();
                } else {
                    this.$alert(res.data.msg);
                    this.getData();
                }
            })
        },
        deleteTask(code){
            this.toDeleteDialog = true;
            this.selectedCode = code;
        }
    },
    filters:{
        time:function(time){
          return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');   
        },
        titleTxt:function(status){
            var status = parseInt(status);
            switch(status) {
                case 0: return '保养记录';
                case 1: return '保养记录';
                case 2: return '待保养电梯';
                case 3: return '保养中';
                case 4: return '急修';
                case 6: return '电梯管理';
                case 7: return '待评价';
                case 8: return '评价记录'
                default: return status
            }
        }
    },
    data(){
        return {
            showWarning: false,
            msg: '',
            loading: false,
            status: this.$route.params.status,       // 状态 给维保人员用 0-4 已完成-紧急 5 管理电梯 6 评价电梯 
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
            list: [],
            loading: true,
            toReceiveDialogShow: false,
            toCompleteDialog: false,
            toDeleteDialog: false,
            selectedCode: null,
            url: null,
        }
    }
}
</script>
<style scoped>
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
.container{
    height: 100%;
    width: 100%;
    background: rgb(242,242,242);
    padding-bottom: 0!important;
    padding-top: 2.5rem!important;
    overflow-x: hidden;
}
.content{
    width: 95%;
    margin: 0.7rem auto;
    padding: 0.8rem;
    background: #fff;
    font-size: 0.9rem;
}
.description{
    color: gray;
}
.content-each{
    display: flex;
    padding: 0.1rem;
}
.text{
    margin-left: 0.3rem;
}
.pingjia{
    margin-left:0.35rem;
    line-height: 100%;
    align-items: center;
    display: flex;
}
.pingjia img{
    height: 0.85rem;
    width: 0.85rem;
    margin: 0.03rem;
}
.header-goBack{
    position: absolute;
    left: 0.3rem;
}
.toReceive{
    background: #fff;
    color: rgb(30,129,210);
    border: 1px solid rgb(30,129,210);
}
.button{
    border-radius: 0.3rem;
}
.daibaoyang{
    text-align: right;
    padding-right: 0.8rem;
}
.manageBtn{
    text-align: right;
    padding-right: 0.8rem;
}
</style>
