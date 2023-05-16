<template>
  <el-select v-model="val" placeholder="请选择">
     <template v-if="list[0]&&list[0][labelKey]">
      <el-option v-for="(item,i) in list" :key="i" :label="item[labelKey]" :value="item[valueKey]">
      </el-option>
    </template>
    <template v-else>
      <el-option v-for="(item,i) in list" :key="i" :label="item" :value="item">
      </el-option>
    </template>
  </el-select>
</template>

<script>
export default {
  props: ["value", "propDef"],
  data () {
    return {
      list: this.propDef.options ? this.propDef.options : [],
      val: this.value,
      labelKey: this.propDef.labelKey ? this.propDef.labelKey : 'label',
      valueKey: this.propDef.valueKey ? this.propDef.valueKey : 'value'
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
    },
  },
  mounted(){
    this.getOptions()
  },
  methods:{
    getOptions() {
      if(typeof this.propDef.remoteFunc === 'function'){
        this.propDef.remoteFunc.call(this,{
            success:(data)=>{
              this.list = data
            },
            fail:(error)=>{
              this.$message.error({ message:error, position:'middle', duration:5000 });
            }
          }
        )
      }
    }
  }
}
</script>
