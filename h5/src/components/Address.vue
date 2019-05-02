<template>
    <div class="container">
        <!--header-->
        <div v-if="loading" class="header">
            loading...
        </div>
        <div class="header" v-else>
            通讯录
            <div class="add" @click="formDialogShow">
                <img src="../../static/添加联系人.png" />
            </div>
        </div>
        <div v-if="loading" class="loading">
            <img src="../../static/loading.gif" />
        </div>
        <!--content-->
        <div class="content" v-else>
            <div v-for="(item,key2) in list" :key="item.index" class="content-each" v-if="key2">
                <div class="title" v-if="key2">{{key2}}</div>
                <div class="" >
                    <div class="name" v-for="innerItem of item" :key="innerItem.index" @click="txtDialogShow(innerItem.name,innerItem.phone)">
                        <div>
                            {{innerItem.name}}
                        </div>
                        <div>
                            {{innerItem.phone}}
                            <button class="deleteBtn" @click.stop="deleteDialogShow(innerItem.name,innerItem.phone)">删除</button>    
                        </div>
                    </div>
                </div>
            </div>
        
        
        </div>
     
        <!--发送消息dialog-->
        <el-dialog
            title="发送消息"
            :visible.sync="txtDialogVisible"
            width="90%"
            :before-close="handleClose">
            <div class="">
                发送给: {{selectedName}}
            </div>
            <textarea v-model="sendTxt" class="txt">
            </textarea>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="txtDialogVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="sendMsg">确 定</el-button>
            </span>
        </el-dialog>
        <!--删除联系人dialog-->
        <el-dialog
            :visible.sync="deleteDialogVisible"
            width="90%"
            :before-close="handleClose2">
            确定删除  {{deleteName}} ?
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="deleteDialogVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="deleteAddress">确 定</el-button>
            </span>
        </el-dialog>
        <!--添加好友dialog-->
        <el-dialog
            title="添加联系人"
            :visible.sync="formDialogVisible"
            width="90%"
            :before-close="handleClose2">
            <div style="display:flex" class="dialog-label">
                <label>姓 &nbsp&nbsp 名</label>
                <input type="text" v-model="formPeople.name" class="input-txt"/>
            </div>
            <div style="display:flex" class="dialog-label">
                <label>手机号 </label>
                <input type="text" v-model="formPeople.phone" class="input-txt"/>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="formDialogVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>
        <!--Footer-->
        <Footer status='2'></Footer>    
    </div>
    
</template>
<script>
import axios from 'axios';
import Footer from './Footer'
import makePy from '../utils/pinyin.js'
import getUrl from '../config'
import io from 'socket.io-client';
export default {
    name: 'Address',
    created(){
        this.getData();
        // this.socket = io(`${url}`);
        // var socket = this.socket;
    },
    components:{
        Footer
    },
    data(){
        return {
            list: {},
            txtDialogVisible: false,   // 发送消息dialog
            formDialogVisible: false,  // 添加新联系人dialog
            deleteDialogVisible: false, // 删除联系人dialog
            deleteName: null,          // 要删除的联系人姓名
            deletePhone: null,         // 要删除的联系人手机
            selectedName: null,
            selectedPhone: null,
            sendTxt: null,
            formPeople: {
                name: null,
                phone: null
            },
            loading: true,
        }    
    },
    methods:{
        getData(){
            var url = getUrl();
            var token = sessionStorage.getItem('token');
            var username = sessionStorage.getItem('username');
            axios({
                url: `${url}/address/info?token=${token}&username=${username}`,
                method: 'get'
            }).then((res)=>{
                if(res.data.code == 0){
                    this.dataShow = true;
                    this.list = JSON.parse(res.data.data);
                    this.loading = false;
                } else if(res.data.code == 2){
                    this.loading = false;
                    this.list = [];
                }
            })
        },
        // 删除联系人
        deleteAddress(){
            var url = getUrl();
            this.deleteDialogVisible = false;
            var firstLetter = makePy(this.deleteName)
            var t = firstLetter[0];
            var firstLetter2 = t[0];
            let postData = this.$qs.stringify({
                username: sessionStorage.getItem('username'),
                token: sessionStorage.getItem('token'),
                name2: this.deleteName,
                phone2: this.deletePhone,
                firstLetter2: firstLetter2
            });
            axios({
                url: `${url}/address/delete`,
                method:'post',
                data: postData
            }).then((res)=>{
                if(res.data.code == 0) {
                    this.getData();
                }
            
            })
        },
        // 添加联系人
        add(){
            var url = getUrl();
            this.formDialogVisible = false;
            var firstLetter = makePy(this.formPeople.name)
            var t = firstLetter[0];
            let postData = this.$qs.stringify({
                username: sessionStorage.getItem('username'),
                token: sessionStorage.getItem('token'),
                name: this.formPeople.name,
                phone: this.formPeople.phone,
                firstLetter: t[0]
            });
            axios({
                url: `${url}/address/add`,
                method: 'post',
                data: postData
            }).then((res)=>{
                this.getData();
            })
        },
        formDialogShow(){
            this.formDialogVisible = true;
        },
        // 向该联系人发送信息
        /** @description
         * selectedName也就是sendName 你要发给谁
         * recevieName 你的本机phone
         */
        sendMsg(){
            this.txtDialogVisible = false;
            var sendData = {
                sendName: this.selectedPhone,
                content: this.sendTxt,
                receiveName: sessionStorage.getItem('username')
            }
            this.$socket.emit('sendMsg',sendData);
            
            this.sendTxt = '';
        },
        deleteDialogShow(name,phone){
            this.deleteDialogVisible = true;
            this.deleteName = name;
            this.deletePhone = phone;
        },
        txtDialogShow(sendName,selectedPhone){
            this.selectedPhone = selectedPhone;
            this.selectedName = sendName;
            this.txtDialogVisible = true;
        },
        // x dialog
        handleClose(done) {
            this.txtDialogVisible = false;
        },
        // x dialog2
        handleClose2(done) {
            this.formDialogVisible = false;
        },
        // x dialog3
        handleClose2(done) {
            this.formDialogVisible = false;
        }
    }
}
</script>
<style scoped>
.container{   
    width: 100%;
    background: rgb(238,238,238);
}
.header{
    height: 2.5rem;
    text-align: center;
    color: #fff;
    background: rgb(30,129,210);
    line-height: 2.5rem;
}

.content-each{
    padding: 0 0.5rem;
    background: #fff;
    margin-bottom: 0.5rem;
}
.title{
    border-bottom: 1px solid rgb(232,232,232);
    height: 1.8rem;
    line-height: 1.8rem;
    color: #808080
}
.name{
    height: 1.8rem;
    line-height: 1.8rem;
    border-bottom: 1px solid rgb(232,232,232);
    display: flex;
    justify-content: space-between;
}
.name:last-child{
    border: none;
}
.add{
    position: fixed;
    right: 0.5rem;
    top: 0;
    height: 2.5rem;
    line-height: 2.5rem;
}
.txt{
    width: 100%;
    /* border: none; */
    height: 6rem;
}
.input-txt{
    border: none;
    border-bottom: 1px solid gray;
    outline: none;
}
.dialog-label{
    display: flex;
    font-size: 1.2rem;
}
.deleteBtn{
    background: #fff;
    color: rgb(30,129,210);
    border: 1px solid rgb(30,129,210);
    border-radius: 0.3rem;
}
</style>
