<template>
    <el-radio-group v-model="val" size="small">
      <el-radio-button v-for="(item,i) in propDef.options" :key="i" :label="item.value">{{item.label}}</el-radio-button>
    </el-radio-group>
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
      immediate:true
    }
  }
}
</script>
