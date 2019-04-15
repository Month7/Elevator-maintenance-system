<template>
    <div class="">
        <div class="header">
            <!--头像-->
            <div>
                <img class="portrait" src="../../static/头像.jpg"/>
                <div>{{username}}</div>
            </div>
        </div>
        <div class="exit-container">
            <button class="exit" @click="exit">退出登录</button>
        </div>
    </div>
</template>
<script>
import { mapState} from 'vuex'
export default {
    name: 'Personal',
    data:function(){
        return {
           
        }
    },
    computed:{
         ...mapState([ 
            'username',
        ]),
    },
    methods:{
        exit:function(){
            this.$store.dispatch('addNote','haha')
        }
    },
    mounted(){
        alert(localStorage.getItem('test'))
        if(localStorage.getItem('test') !== null) {
            this.username = localStorage.getItem('test')
        }
    }
}
</script>
<style scoped>
.header{
    background: rgb(30,129,210);
    width: 100%;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    color: #fff;
}
.portrait{
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
}
.exit-container{
    display: flex;
    justify-content: center;
    width: 100%;
}
.exit{
    border: none;
    outline: none;
    background: rgb(30,129,210);
    width: 85%;
    height: 2.7rem;
    line-height: 2.7rem;
    color: #fff;
    font-size: 0.9rem;
    border-radius: 0.5rem;
    margin: auto;
}
</style>
