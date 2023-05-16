<template>
<section class="icons-dialog-editor">
  <div class="show-icon">
    <i v-if="val.icon" :class="val.icon" :style="'color:'+val.color"></i>
    <span v-else>无</span>
  </div>
  <el-button slot="append" style="border:none;" @click="openIconsDialog()">
    选择图标
  </el-button>
  <icons-dialog :visible.sync="iconsVisible" :current="val" @select="setIcon" :colorEnable="true" />
</section>
</template>
<script>
import IconsDialog from '../IconsDialog'
export default {
  components:{
    IconsDialog,
  },
  props: ["value", "propDef"],
  data () {
    return {
      val: '',
      iconsVisible:false,
    }
  },
  watch: {
    val (val) {
      this.$emit("input", val)
    },
    value :{
      handler(val) {
        this.val = val||this.$api.deepClone(this.propDef.default)||{ icon:'el-icon-bell',color:'#606266'}
      },
      immediate:true
    }
  },
  methods:{
    openIconsDialog(model) {
      this.iconsVisible = true
    },
    setIcon(val) {
     this.val = val
    },
  }
}
</script>
<style lang="stylus" scoped>
.show-icon{
  width:40px;
  height:40px;
  padding: 4px;
  border: 1px solid #e6e6e6;
  display:flex;
  align-items: center;
  justify-content: center;
  box-sizing border-box
}
.icons-dialog-editor{
  display:flex;
  align-items:center;  
}
</style>
