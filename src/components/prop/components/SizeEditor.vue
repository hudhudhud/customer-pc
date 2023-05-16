<template>
  <div class="size-editor">
    <el-input-number v-model="val" :step="step" :max="max" :min="min"  size='small'></el-input-number>
    <span v-if="propDef.unit">{{ propDef.unit }}</span>
  </div>
</template>

<script>
export default {
  props: ["value", "propDef"],
  data () {
    return {
      val: "",
      unit: "",
      step: 1,
      max:this.propDef.max,
      min:this.propDef.min 
    }
  },
  watch: {
    val (val) {
      this.$emit("input", val)
    },
    value :{
      handler(val) {
        this.val = val||this.propDef.default
      },
      immediate:true
    },
  }
}
</script>

<style scoped>
.size-editor {
  display: flex;
  align-items: center;
}
</style>
