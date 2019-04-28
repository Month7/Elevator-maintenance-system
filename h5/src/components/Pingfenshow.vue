<template>
  <div class="pingjia" style="display:flex">
    <el-rate
    v-model="score"
    disabled
    text-color="#ff9900"
    >
    </el-rate>
  </div>
</template>
<script>
export default {
  name: 'Pingfenshow', // 出于某些原因，这个组件要单独拿出来
  props: ['score'],
  
}
</script>
