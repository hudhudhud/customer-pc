<template>
<el-checkbox-group v-model="val">
    <el-checkbox v-for="(opt,i) in propDef.options" :label="opt.value" :key="i">{{opt.label}}</el-checkbox>
</el-checkbox-group>
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
    value:{
      handler(val) {
        this.val = val||this.$api.deepClone(this.propDef.default)||[]
        if (typeof this.val == 'string') {
          this.val = this.val.split(',')
        }
      },
      immediate:true
    }
  }
}
</script>

