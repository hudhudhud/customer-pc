<template>
<div class="font-size-editor">
  <template v-if="propDef.showType=='numberInput'">
     <el-input-number v-model="val.fontSize" size='small'></el-input-number>
  </template>
  <template v-else>
    <el-radio-group v-model="val.fontSize" size="small">
      <el-radio-button label="16px">小</el-radio-button>
      <el-radio-button label="18px">常规</el-radio-button>
      <el-radio-button label="20px">大</el-radio-button>
    </el-radio-group>
  </template>
    <div><el-checkbox v-model="val.fontWeight">字体加粗</el-checkbox></div>
</div>
</template>

<script>
export default {
  props: ["value", "propDef"],
  data () {
    return {
      val: this.value
    }
  },
  watch: {
    val (val) {
      this.$emit("input", val)
    },
    value :{
      handler(val) {
        this.val = val||this.$api.deepClone(this.propDef.default)
      },
      immediate:true,
    }
  }
}
</script>
<style scoped>
.font-size-editor{
  
}
</style>
