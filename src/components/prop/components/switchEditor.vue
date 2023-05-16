<template>
  <div>
    <el-switch
      v-model="val">
    </el-switch>
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
        this.val = val != undefined ? val : this.$api.deepClone(this.propDef.default)
      },
      immediate:true
    }
  }
}
</script>