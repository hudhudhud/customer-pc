<template>
  <div class="propline" :class="{'propline--top': propDef.align == 'top','propline-column':propDef.labelPosition == 'top'}">
    <div class="propline-label" :title="propDef.key" v-if="propDef.name">{{propDef.name}}</div>
    <div class="propline-val">     
      <components :is="propDef.type+'Editor'" :prop-def="propDef" v-model="propValue" :comp-config="compConfig"></components>
      <span style="font-size:12px;color:red;">{{propDef.help}}</span>
    </div>
    <div class="propline-default" v-if="propDef.default&&propDef.needReset">
      <el-button @click="reset" size="mini">重置</el-button>
    </div>
  </div>
</template>

<script>
import editorComponents from "./components"

export default {
  name: 'PropertyEditor',
  components: editorComponents,
  props: {
    propDef: {
      type: Object,
      require: true
    },
    value: {
      require: true
    },
    compConfig: {
      type: Object,
    }
  },
  watch: {
    value:{
      handler(val) {
        this.propValue = val
      },
      deep:true,
      immediate:true,
    },
    propValue:{
      handler(val) {
        this.$emit("input", val)
      },
      deep:true,
      // immediate:true,
    },
  },
  data () {
    return {
      propValue: this.value
    }
  },
  methods: {
    reset () {
      this.propValue = this.$api.deepClone(this.propDef.default) || null
    }
  }
}
</script>

<style scoped lang="stylus">
.propline {
  display: flex;
  padding: 5px;
  align-items: center;
  /* border-bottom: 1px solid #eee; */
  font-size: 14px;
}
.propline--top {
  align-items: flex-start;
}
.propline--top .propline-label{
  line-height: 40px;
}
.propline-label {
  flex: 0 0 100px;
  padding: 0 5px;
  color:#666;
}
.propline-val {
  flex: 1 1 auto;
  padding: 0 5px;
  width:100%;
}
.propline-default {
  align-self: flex-start;
  flex: 0 0 50px;
}
// 上下布局
.propline-column{
  display:flex;
  flex-direction: column;
  align-items: flex-start;
  flex:0;
  .propline-label{
    flex:0;
    font-size:16px;
    padding-bottom:10px;
  }
}
</style>
