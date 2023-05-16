<template>
  <el-color-picker v-model="val"></el-color-picker>
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
        this.val = val||this.propDef.default
      },
      immediate:true
    }
  }
}
</script>
