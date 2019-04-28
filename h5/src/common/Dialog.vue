<template>
  <div>
      <el-dialog
        :visible.sync="dialogShow"
        width="90%"
        :before-close="handleClose">
        <!--待报养 领取-->
        <div v-if="status == 0">
            确认领取?
        </div>
        <!--保养中 完成-->
        <div v-else-if="status == 1">

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="handleClose">取 消</el-button>
            <el-button size="mini" type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Dialog',
  props:['dialogShow','status'],
  methods:{
      handleClose() {
          this.dialogShow = false;
          this.$parent.test();
      },
      submit() {
        this.dialogShow = false;
        this.$parent.test();
      }
  }
}
</script>
<style scoped>

</style>
