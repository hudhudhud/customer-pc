<template>
  <div>
    <el-dialog
      title="上传图片"
      :visible.sync="dialogVisible"
      width="800px"
    >
      <div class="container-wrap">
        <div class="container">
          <div class="img-container">
            <img
              ref="image"
              src=""
              alt="">
          </div>
          <div class="upload-box" v-if="showUpload">
            <el-upload action="" :show-file-list="false" :auto-upload="false" :on-change="beforeUpload"><el-button type="primary">选择图片上传</el-button></el-upload>
          </div>
        </div>
        <div class="setting-box">
          <div class="setting-label">根据需要裁剪图片：</div>
          <div class="cropping-free" style="margin-bottom: 15px;">
            <el-radio v-model="cropperType" :label="1" @change="setRotio">自由裁剪</el-radio>
          </div>
          <div class="cropping-ratio">
            <el-radio v-model="cropperType" :label="2" @change="setRotio">自定义裁剪比例</el-radio>
            <div class="ratio">
              <el-input v-model="ratioWidth" @blur="onRatioBlur('ratioWidth')" @input="setRotio" class="ratio-input" />&nbsp;&nbsp;:&nbsp;&nbsp;<el-input v-model="ratioHeight" @blur="onRatioBlur('ratioHeight')" @change="setRotio" class="ratio-input" />
            </div>
          </div>
        </div>
      </div>
      
      <div slot="footer" class="dialog-footer">
        <div><el-upload v-if="!showUpload" action="" :show-file-list="false" :auto-upload="false" :on-change="beforeUpload"><el-button>重新上传图片</el-button></el-upload></div>
        <div>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="sureSava">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {FILE_UPLOAD,BASE64_URL} from "@/api"
import request from '@/utils/request'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  props: ["value", "isUpload", "img"],
  data() {
    return {
      myCropper: null,
      afterImg: '',
      ingData: null,
      dialogVisible: false,
      cropperType: 1,
      ratioWidth: 1,
      ratioHeight: 1,
      showUpload: true,
      fileName: '',
      loading: false,
    }
  },
  watch: {
    value :{
      handler(val) {
        this.dialogVisible = val
        
        if (val) {
          this.showUpload = !this.img
          this.$nextTick(() => {
            this.init()
          })
          
        }
      },
      immediate:true
    },
    dialogVisible(val) {
      this.$emit('input', val)
    }
  },
  mounted() {

  },
  methods: {
    async init () {
      if (this.myCropper) {
        if (this.img) {
          this.showUpload = false
          this.myCropper.replace('', false)
          const res = await this.getBase64(this.img)
          this.myCropper.replace(res, false)
        }
        return
      }
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 2,
        dragMode: 'none',
        // initialAspectRatio: 1,
        // aspectRatio: 1,
        background: false,
        autoCropArea: 1,
        zoomOnWheel: false,
        checkCrossOrigin: true,
      })

      if (this.img) {
        this.showUpload = false
        this.myCropper.replace('', false)
        const res = await this.getBase64(this.img)
        this.myCropper.replace(res, false)
      }
    },
    async getBase64(url) {
      let base64 = ''
      let res = await request.post(BASE64_URL, {url}, {
        headers: {
          "Authorization": this.$route.query.userTicket
        }
      })
      if (res.errcode === 0) {
        base64 = `data:image/png;base64,${res.data.base64}`
      }
      return base64
    },
    // base64转file对象
    dataURLtoFile(dataurl) {
      const arr = `data:image/png;base64,${dataurl}`.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      let blob = new File([u8arr], 'file', { type: mime })
      // console.log(blob)
      const params = new FormData()
      params.append('file', blob)
      return params
    },
    async uploadImg(file, fileName) {
      this.loading = true
      try {
        let res =  await request.post(FILE_UPLOAD, this.dataURLtoFile(file), {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": this.$route.query.userTicket
          }
        })
        let resultUrl = ''
        if(res.errcode==0){
          resultUrl = res.data.url
          //上传接口是异步的，返回成功，服务器上还不一定有图片
          setTimeout(() => {
            this.loading = false
            this.$emit("success",resultUrl,res.data.fileId)
          }, 300);
        } else {
          this.loading = false
          this.$message.error(res.message || '出错啦，请重试~');
        }
        
      } catch(e) {
        this.loading = false
      }
    },
    sureSava () {
      this.afterImg = this.myCropper.getCroppedCanvas({
        imageSmoothingQuality: 'high'
      }).toDataURL('image/jpeg')
      this.myCropper.getCropBoxData() // 获取裁剪框数据

      // console.log(this.myCropper.getCropBoxData(), '6666')
      // console.log(this.myCropper.getCanvasData(), '获取图片数据55555')
      // console.log(this.myCropper.getData(), '6666')

      if (this.isUpload) {
        this.uploadImg(this.afterImg.split(",")[1], this.fileName)
      } else {
        this.$emit('cropper', {
          img: this.afterImg
        })
      }
    },
    // 设置裁剪框比例
    setRotio() {
      if (this.cropperType == 2) {
        if (this.ratioWidth > 0 && this.ratioHeight > 0) {
          this.myCropper.setAspectRatio(this.ratioWidth/this.ratioHeight)
        }
      } else {
        this.myCropper.setAspectRatio(0)
      }
    },
    onRatioBlur(key) {
      let val = parseFloat(this[key])
      if (!val || val < 0) {
        val = 0
      }
      this[key] = val
    },
    beforeUpload(file) {
      console.log(file)
      var render = new FileReader()
      const that = this
      render.onload=function(e) {
        that.myCropper.replace(e.target.result, false)
        that.showUpload = false
        that.fileName = file.name
      }
      render.readAsDataURL(file.raw)
    },
  }
}
</script>

<style lang="stylus" scoped>
.container-wrap {
  display: flex;
}
.setting-box {
  width: 200px;
  padding-left: 30px;
  .setting-label {
    font-size: 14px;
    color: #999;
    margin-bottom: 15px;
  }
  .ratio {
    display: flex;
    align-items: center;
    margin-top: 15px;
    margin-left: 25px;
  }
  .ratio-input {
    width: 68px;
  }
}
.container{
  position: relative;
  display: flex;
  width: 520px;
  height: 355px;
}
.img-container{
  width: 520px;
  height: 355px;
  overflow: hidden;
}
.upload-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-footer {
  display: flex;
  justify-content: space-between;
}
</style>