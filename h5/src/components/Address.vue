<template>
    <div class="container">
        <!--header-->
        <div class="header">
            通讯录
        </div>
        <!--content-->
        <div class="content">
            <div v-for="(item,key) in list" :key="item.key" class="content-each">
                <div class="title">{{key}}</div>
                <div class="">
                    <div class="name" v-for="innerItem of item" :key="innerItem.name">{{innerItem.name}}</div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from './Footer'
export default {
    name: 'Address',
    components:{
        Footer
    },
    data(){
        return {
            list:{
                "D":[{
                    name: "东哥"
                }],
                "L":[{
                    name: '雷军'
                },{
                    name: "李彦宏"
                }],
                "M":[{
                    name:'马云',
                    phone: 18000351426
                },{
                    name: '马化腾',
                    phone: 18000351426
                }],
                "Z":[{
                    name: "张朝阳"
                }]
                
            }
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
</style>
