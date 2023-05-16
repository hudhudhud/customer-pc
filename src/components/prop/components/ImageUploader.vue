<template>
<div class="image-upload">
  <div v-if="showType==='avatar'" class="avatar-uploader" @click="showCropper=true">
    <img v-if="value" :src="value" class="avatar">
    <template v-else>
      <i class="el-icon-plus avatar-uploader-icon"></i>
      <p class="avatar-uploader-title">上传图片</p>
    </template>
  </div>
  <el-upload v-else :multiple="multiple" :disabled="loading"  :with-credentials="true"  :show-file-list="false" action="" accept="image/*" :http-request="upload">
    <slot><el-button size="small" type="primary" :loading="loading">点击上传</el-button></slot>
  </el-upload>
  <CropperDialog v-model="showCropper" :isUpload="true" :img="value" @success="cropperImgHandler" />
</div>
</template>

<script>
import {FILE_UPLOAD} from "@/api"
import request from '@/utils/request'
import CropperDialog from './cropperDialog.vue'
export default {
  components:{CropperDialog},
  props: {
    value: {
      type: String,
      require: true
    },
    showType:{ //avatar 显示头像上传，button 显示按钮上传
      type:String,
      default:'button'
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      showCropper:false
    }
  },
  methods: {
    async upload(e){
      let fileObj = e.file
      let formData = new FormData()
      formData.append("file",fileObj)
      let res =  await request.post(FILE_UPLOAD, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": this.$route.query.userTicket
        }
      })
      if (res.errcode === 0) {
        this.$emit("success",res.data.url, res.data.fileId)
      } else {
        this.$message.error({ message:"上传图片失败："+res.message, duration:5000 });
      }
    },
    cropperImgHandler(img) {
      this.showCropper = false
      this.$emit("success",img)
    },
  }
}
</script>
<style scoped lang="stylus">
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  background-color:#fff;
  margin-right:10px;
  width:70px;
  height:70px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.avatar-uploader-title{
  font-size:12px;
  color:rgb(0, 141, 252)
  margin:0;
}
.avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  color:rgb(0, 141, 252)
}
.avatar {
  width: 70px;
  height: 70px;
  display: block;
}
</style>
