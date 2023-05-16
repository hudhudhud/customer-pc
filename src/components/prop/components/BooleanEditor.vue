<template>
  <el-switch v-model="val">
  </el-switch>
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
        this.val = (typeof val === 'boolean') ? val : this.propDef.default
      },
      immediate:true
    }
  }
}
</script>
