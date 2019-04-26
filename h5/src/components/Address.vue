<template>
    <div class="container">
        <!--header-->
        <div class="header">
            通讯录
            <div class="add" @click="formDialogShow">
                <img src="../../static/添加联系人.png" />
            </div>
        </div>
        <!--content-->
        <div class="content">
            <div  v-for="(item,key) in list" :key="item.index" class="content-each" >
                <div class="title">{{key}}</div>
                <div class="">
                    <div class="name" v-for="innerItem of item" :key="innerItem.index" @click="txtDialogShow(innerItem.name)">{{innerItem.name}}</div>
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
        <Footer></Footer>
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
        var url = getUrl();
        var token = sessionStorage.getItem('token');
        var username = sessionStorage.getItem('username');
        axios({
            url: `${url}/address/info?token=${token}&username=${username}`,
            method: 'get'
        }).then((res)=>{
            this.list = res.data
        })
        this.socket = io(`${url}`);
        var socket = this.socket;
    },
    components:{
        Footer
    },
    data(){
        return {
            list: {},
            txtDialogVisible: false,   // 发送消息dialog
            formDialogVisible: false,  // 添加新联系人dialog
            selectedName: null,
            sendTxt: null,
            formPeople: {
                name: null,
                phone: null
            },
        }    
    },
    methods:{
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
                sendName: this.selectedName,
                content: '测试',
                receiveName: sessionStorage.getItem('username')
            }
            this.socket.emit('sendMsg',sendData)
        },
        txtDialogShow(sendName){
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
</style>
