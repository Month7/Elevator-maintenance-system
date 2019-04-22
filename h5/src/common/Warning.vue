<template>
    <div class="container">
        <div class="warningContainer" v-if="show">
            <div class="warning">
                {{msg}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Warning',
    props:['show','msg'],
    mounted(){
    
    },
    data(){
        return {
            
            
        }
    }
}
</script>
<style scoped>
.warningContainer{
    text-align: center;
    position: fixed;
    bottom:8rem;
    width: 100%;
}
.warning{
    background: rgb(87,92,86);
    color:#fff;
    display: inline;
    padding: 0.7rem;
    border-radius: 0.5rem;
    font-size: 0.3rem;
}
</style>
