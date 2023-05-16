<template>
  <div>
    <!-- <h3>上传图片</h3> -->
    <draggable 
      :list="imgList"
      :animation="340"
      group="imgList"
      handle=".option-drag"
    >
      <div class="img-box" v-for="(item, index) of imgList" :key="index">
        <div class="option-drag" title="移动">
          <i class="el-icon-s-operation" />
        </div>
        <i class="el-icon-error img-del" @click="onDelItem(index)" title="删除"></i>
        <div class="upload-box" @click="onShowCropper(item, index)">
          <template v-if="item.src">
            <img :src="item.src"  />
            <div class="img-mb">
              <i class="el-icon-close" @click.stop="onDelImg(index)"></i>
              <span>编辑</span>
            </div>
          </template>
          
          <div v-else class="no-img"><i class="el-icon-plus"></i>上传图片</div>
        </div>
        <template v-if="compConfig.mode !== 'hotArea'" >
          <el-form label-width="70px" size="mini">
            <el-form-item label="标题" v-if="propDef.hasTitle">
              <el-input v-model="item.title"></el-input>
            </el-form-item>
            <el-form-item label="点击事件">
              <ActionEditor v-model="item.onClick"/>
            </el-form-item>
            <el-form-item label="间距" v-if="propDef.hasGap">
              <GapEditor v-model="item.gap" :propDef="{}" />
            </el-form-item>
          </el-form>
        </template>
        <div v-else>
          <div>已配置{{item.areas?item.areas.length:0}}个热区</div>
          <el-button type="text" @click="onShowHotArea(item, index)">去绘制热区</el-button>
        </div>
      </div>
    </draggable>
    <div class="btns-box">
      <el-button icon="el-icon-plus" style="margin-right: 15px;" @click="addImgItem">添加图片</el-button>
      <ImageUploader :multiple="true" @success="handleUpload">
        <el-button icon="el-icon-upload2">批量上传</el-button>
      </ImageUploader>
    </div>
    
    <CropperDialog v-model="showCropper" :img="cropperImg" :isUpload="true" @success="handleImg" />
    <HotArea v-model="showHotArea" :img="current.src" :areas="current.areas" @confirm="handleArea" />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import ActionEditor from './ActionEditor.vue'
import CropperDialog from './cropperDialog.vue'
import HotArea from './hotArea.vue'
import ImageUploader from './ImageUploader.vue'
import GapEditor from './GapEditor.vue'
import {FILE_REMOVE} from '@/api'
import request from '@/utils/request'
export default {
  props: ["value", "propDef", "compConfig"],
  components: { ActionEditor, CropperDialog, HotArea, ImageUploader, draggable, GapEditor },
  data() {
    return {
      imgList: [],
      showCropper: false,
      cropperImg: '',
      editIndex: -1,
      current: {},
      showHotArea: false,
      hotAreaImg: '',
    }
  },
  watch: {
    imgList: {
      handler(val) {
        this.$emit("input", val)
      },
      deep: true
    },
    value :{
      handler(val) {
        this.imgList = val||this.propDef.default
      },
      immediate:true
    },
  },
  methods: {
    handleUpload(e) {
      let obj = {
        src: e,
        onClick: {
          type: 'none',
          action: ''
        }
      }
      if(this.compConfig.mode === 'hotArea'){
        obj.areas = []
      }
      if (this.propDef.hasTitle) {
        obj.title = '标题' + (this.imgList.length + 1)
      }
      this.imgList.push(obj)
    },
    addImgItem() {
      let obj = {
        src: '',
        onClick: {
          type: 'none',
          action: ''
        }
      }
      if(this.compConfig.mode === 'hotArea'){
        obj.areas = []
      }
      if (this.propDef.hasTitle) {
        obj.title = '标题' + (this.imgList.length + 1)
      }
      this.imgList.push(obj)
    },
    // 删除图片数据
    onDelItem(index) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.imgList.splice(index, 1)
      })
    },
    handleArea(list) {
      this.current.areas = list
      this.current = {}
    },
    handleImg(e, fileId) {
      this.imgList[this.editIndex].src = e
      this.imgList[this.editIndex].fileId = fileId
      if(this.compConfig.mode === 'hotArea'){
        this.imgList[this.editIndex].areas = []
      }
      this.editIndex = -1
      this.showCropper = false
    },
    onShowCropper(item, index) {
      this.editIndex = index
      if (item.src) {
        this.cropperImg = item.src
      } else {
        this.cropperImg = ''
      }
      this.showCropper = true
    },
    onShowHotArea(item) {
      if(!item.src) {
        this.$message.error('请添加图片');
        return
      }
      if (!item.areas) {
        this.$set(item,'areas',[])
      }
      this.current = item
      this.showHotArea = true
    },
    onDelImg(index) {
      this.$confirm('确定删除图片吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.imgList[index].src = ''
        if (this.imgList[index].fileId) {
          request.post(FILE_REMOVE, {fileId:this.imgList[index].fileId},{
            headers: {
              "Authorization": this.$route.query.userTicket
            }
          })
        }
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
.option-drag{
  position:absolute;
  left:0;
  top:0;
  cursor:move;
  display:none;
}
.img-box {
  position: relative;
  display: flex;
  padding: 20px;
  margin-bottom: 15px;
  background-color: #f5f7fa;

  &:hover .img-del,&:hover .option-drag{
    display: block;
  }

  .img-del {
    display: none;
    position: absolute;
    top: -6px;
    right: 0;
    color: #a7bad7;
    font-size: 22px;
  }

  /deep/.el-form-item--mini {
    margin-bottom: 5px;
  }
}
.upload-box {
  flex-shrink: 0;
  position: relative;
  width: 70px;
  height: 70px;
  border: 1px solid #eee;
  margin-right: 15px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover .img-mb {
    display: block;
  }

  .img-mb {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.3);

    font-size: 12px;
    color: #fff;
    line-height: 70px;
    text-align: center;

    i {
      position: absolute;
      top: 0;
      right: 0;
      background-color: #000;
      color: #fff;
    }
  }

  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
    width:100%;
    height:100%;
    object-fit:cover;
  }

  .no-img {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: #008dfc;
    font-size:12px;
    line-height: 24px;

    i {
      font-size: 20px;
    }
  }
}
.btns-box {
  display: flex;
  margin-top: 15px;
}
</style>