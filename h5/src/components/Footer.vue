<template>
    <div class="footer">
        <router-link to="/message" class="footer-each">
            <img src="../../static/消息.png" />
            <div>消息</div>
        </router-link>
        <router-link to="/address" class="footer-each">
            <img src="../../static/通讯录.png" />
            <div>通讯录</div>
        </router-link>
        <router-link to="/work" class="footer-each">
            <img src="../../static/应用.png" />
            <div>应用</div>
        </router-link>
        <router-link to="/personal" class="footer-each">
            <img src="../../static/我.png" />
            <div>个人</div>
        </router-link>
    </div>
</template>
<script>
export default {
    name: 'Footer',
}
</script>
<style scoped>
.footer{
    height: 3.3rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    background: #fff;
}
.footer-each{
    width: 25%;
    text-align: center;
    font-size: 0.6rem;
    text-decoration: none;
    color: black;
}
</style>
