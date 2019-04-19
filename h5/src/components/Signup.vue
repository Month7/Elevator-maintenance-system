<template>
    <div class="container">
        <div v-if="state == 1">
            <Step1></Step1>
        </div>
        <div v-else-if="state == 2">
            <Step2></Step2>
        </div>
        <div v-else>
            <Step3></Step3>
        </div>
    </div>    
</template>
<script>
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
export default {
    name: 'Signup',
    components:{
        Step1,
        Step2,
        Step3
    },
    // data(){
    //     return {
    //         state: this.$store.state.signupState
    //     }
    // },
    computed:{
        state(){
            return this.$store.state.signupState
        }
    }
}
</script>
<style scoped>
   @import url(./Signup.css);
</style>
