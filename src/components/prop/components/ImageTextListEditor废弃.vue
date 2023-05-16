<template>
  <div class="nav-add-item-list">
    <draggable :list="list" :animation="340" group="list" handle=".option-drag">
      <div class="add-item" v-for="(item,i) of list" :key="i" @mousemove.stop>
        <div class="option-drag" title="移动">
          <i class="el-icon-s-operation" />
        </div>
        <i class="el-icon-error" @click="delItem(i)"></i>
        <ImageUploader @success="uploadSuccess($event,item)" showType="avatar" :value="item.img"></ImageUploader>
        <el-form label-width="70px" size="mini">
          <el-form-item label="标题">
            <el-input v-model="item.title"></el-input>
          </el-form-item>
          <el-form-item label="点击事件">
            <ActionEditor v-model="item.onClick"/>
          </el-form-item>
        </el-form>
      </div>
    </draggable>
    <div class="btns-box">
      <el-button icon="el-icon-plus" style="margin-right: 15px;" @click="addItem">添加</el-button>
      <ImageUploader :multiple="true" @success="batchUploadSuccess">
        <el-button icon="el-icon-upload2">批量添加</el-button>
      </ImageUploader>
    </div>
  </div>
</template>
<script>
import ImageUploader from "./ImageUploader"
import ActionEditor from "./ActionEditor"
import draggable from 'vuedraggable'
export default {
  components: { ImageUploader, ActionEditor, draggable},
  props:["value", "propDef"],
  watch: {
    list :{
      handler(val) {
        this.$emit("input", val)
      },
      immediate:true,
      deep:true
    },
    value :{
      handler(val) {
        this.list = val||this.$api.deepClone(this.propDef.default)
      },
      immediate:true,
      deep:true
    }
  },
  data(){
    return {
      list:[]
    }
  },
  methods:{
    addItem(){
      this.list.push({img:'',title:'标题'+(this.list.length+1),onClick:{type:'none'}})
    },
    batchAddItem(){
      
    },
    delItem(i){
      this.list.splice(i,1)
    },
    uploadSuccess (res,item) {
      this.$set(item,'img',res)
    },
    batchUploadSuccess(res) {
      this.list.push({
        img: res,
        title:'',
        onClick: {
          type: 'none',
          action: ''
        }
      })
    },
  }
}
</script>
<style scoped lang="stylus">
.nav-add-item-list{
  width:100%;
}
.add-item{
  width:90%;
  display:flex;
  align-items: center;
  position:relative;
  background-color: #f5f7fa;
  margin-bottom:10px;
  padding:20px;
  border-radius: 10px;
  box-sizing: border-box
}

.el-icon-error{
  font-size:18px;
  color:rgb(193, 203, 214);
  position:absolute;
  right:-5px;
  top:-5px;
}
.option-drag{
  position:absolute;
  left:0;
  top:0;
  cursor:move;
}
.el-form{
  flex-grow:1;
  /deep/.el-form-item{
    margin-bottom:10px;
    &:last-child{
      margin-bottom:0;
    }
  }
}
.btns-box {
  display: flex;
  margin-top: 15px;
}
</style>
