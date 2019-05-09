<template>
    <div class="footer">
        <router-link v-if="status == 1" to="/message" class="footer-each">
            <img src="../../static/消息.png" />
            <div>消息</div>
        </router-link>
        <router-link v-else-if="status != 1" to="/message" class="footer-each">
            <img src="../../static/消息-未选中.png" />
            <div>消息</div>
        </router-link>
        <router-link v-if="status == 2" to="/address" class="footer-each">
            <img src="../../static/通讯录.png" />
            <div>通讯录</div>
        </router-link>
        <router-link  v-else-if="status != 2" to="/address" class="footer-each">
            <img src="../../static/通讯录-未选中.png" />
            <div>通讯录</div>
        </router-link>
        <router-link v-if="status == 3" to="/work" class="footer-each">
            <img src="../../static/应用.png" />
            <div>应用</div>
        </router-link>
        <router-link v-else-if="status != 3" to="/work" class="footer-each">
            <img src="../../static/应用-未选中.png" />
            <div>应用</div>
        </router-link>
        <router-link v-if="status == 4" to="/personal" class="footer-each">
            <img src="../../static/个人.png" />
            <div>个人</div>
        </router-link>
        <router-link v-else-if="status != 4" to="/personal" class="footer-each">
            <img src="../../static/个人-未选中.png" />
            <div>个人</div>
        </router-link>
    </div>
</template>
<script>
export default {
    name: 'Footer',
    props: ['status'],
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
