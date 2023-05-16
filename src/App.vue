<template>
  <div>
    <router-view />
    <!-- <page-title :itemDef="itemDef"/>
    <page-imglist :itemDef="itemDef"/> -->
  </div>
</template>

<script>
export default {
  mounted() {
    // 取消开始的loading动画
    const preLoader = document.querySelector('#pre-loader')
    preLoader.style.display = 'none'

    // fix: firefox 下 拖拽 会新打卡一个选项卡
    // https://github.com/JakHuang/form-generator/issues/15
    document.body.ondrop = event => {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  data(){
    return {
      itemDef:{
        value:123,
         "imageList":["http://fviewer.h3c.com/file/down?appid=istage&fileId=160680149847522863"],
      }
    }
  }
}
</script>
