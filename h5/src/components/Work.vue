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
                <a>保养完成</a>
                <a>待保养</a>
                <a>保养中</a>
                <a>超期</a>
                <a>急修</a>
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
    height: 3rem;
    background: blue;
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
}
</style>
