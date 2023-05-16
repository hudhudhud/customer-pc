<template>
  <section class="slider-editor">
   <el-slider v-model="val" :min="propDef.min" :max="propDef.max"></el-slider>
   <span class="value">{{val}}{{propDef.hasOwnProperty('unit')?propDef.unit:unit}}</span>
  </section>
</template>

<script>
export default {
  props: ["value", "propDef"],
  data () {
    return {
      val: this.value,
      unit:'px'
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
<style lang="stylus" scoped>
.slider-editor{
  display:flex;
  align-items:center;
  .el-slider{
    flex-grow:1;
    margin-right:10px;
  }
  .value{
    width:50px;
    text-align: center;
    flex-shink:0;
  }
}
</style>