<template>
  <div>
    <el-select v-model="val">
      <el-option :value="it.id+''" :label="it.name" v-for="(it,i) of itemList" :key="i"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: ["value", "propDef"],
  data () {
    return {
      val: this.value,
    }
  },
  watch: {
    val (val) {
      this.$emit("input", val)
    },
    value:{
      handler(val) {
        console.log(val)
        this.val = val || this.propDef.default
      },
      immediate:true,
    }
  },
  computed:{
    itemList(){
      return this.$store.state.itemList
    }
  }
}
</script>