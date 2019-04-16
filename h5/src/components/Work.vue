<template>
    <div class="container">
        <div class="header"></div>
        <div class="banner">

        </div>
        <div class="content">
            <div class="content-header">
                当日工作
            </div>
            <div class="contenr-main">
                <router-link to="/finished" class="content-each">
                    <img src="../../static/点赞.png" />
                    <div class="content-txt">保养完成</div>
                </router-link>
                <router-link to="/" class="content-each">
                    <img src="../../static/点赞.png" />
                    <div class="content-txt">待保养</div>
                </router-link>
                <router-link to="/" class="content-each">
                    <img src="../../static/点赞.png" />
                    <div class="content-txt">保养中</div>
                </router-link>
               <router-link to="/" class="content-each">
                    <img src="../../static/点赞.png" />
                    <div class="content-txt">超期</div>
                </router-link>
                <router-link to="/" class="content-each">
                    <img src="../../static/点赞.png" />
                    <div class="content-txt">急修</div>
                </router-link>
            </div>
        </div>
        <div class="content">
            <div class="content-header">
                必备工具
            </div>
            <div class="contenr-main">

            </div>
        </div>
        <div class="content">
            <div class="content-header">
                辅助工具
            </div>
            <div class="contenr-main">

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Login',
    data(){
        return {

        }
    }    
}
</script>
<style scoped>
.container{
    padding: 0;
    margin: 0;
}
.header{
    height: 8rem;
    background: rgb(30,129,210);
    width: 100%;
}
.content-header{
    width: 100%;
    border-bottom: 1px solid black;
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 0.6rem;
}
.contenr-main{
    display: flex;
    justify-content: space-between;
}
.content-each{
    text-align: center;
    color: black;
    font-size: 0.3rem;
    text-decoration: none;
    padding: 0.2rem;
    width: 20%;
    margin-top:0.5rem;
}
.content-txt{
    margin-top:0.5rem;
}
</style>
