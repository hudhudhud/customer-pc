<template>
  <div class="gap-editor">
    <div class="line">
      <div class="input-item"><el-input v-model="val.marginTop" type="number"><span class="suffix" slot="suffix">上方</span></el-input></div>
      <div class="input-item"><el-input v-model="val.marginBottom" type="number"><span class="suffix" slot="suffix">下方</span></el-input></div>
    </div>
    <div class="line">
      <div class="input-item"><el-input v-model="val.marginLeft" type="number"><span class="suffix" slot="suffix">左侧</span></el-input></div>
      <div class="input-item"><el-input v-model="val.marginRight" type="number"><span class="suffix" slot="suffix">右侧</span></el-input></div>
    </div>
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
        this.val = val||this.propDef.default||{
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0
        }
      },
      immediate:true,
      deep:true
    }
  }
}
</script>
<style scoped lang="stylus">
.gap-editor{
  width:100%;
  display: flex;
  flex-direction: column;
}
.line{
  width:100%;
  display: flex;

}
.input-item{
  width:50%;
  // height:40px;
  position:relative;
  .el-input{
    // position:absolute;
    // top:0;
    // left:0;
    // right:0;
    // bottom:0;
    /deep/.el-input__inner{
      padding-right: 0;
      &::-webkit-textfield-decoration-container {
        // background-color: #f0f3f9;	
      }
      &::-webkit-inner-spin-button,&::-webkit-outer-spin-button{
        -webkit-appearance: none;
      }
    }
    /deep/.el-input__suffix {
      display: flex;
      align-items: center
    }
  }
  .suffix{
    // position:absolute;
    // right:10px;
    // top:50%;
    // transform: translateY(-50%);
    color:#999;
  }
}

</style>
