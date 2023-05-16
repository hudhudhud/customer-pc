<template>
  <section class="page-img-list" :comp-type="itemDef.type" :class="{'page-img-list--card': itemDef.style && itemDef.style.styleType == '卡片式'}" :style="compStyle">
    <page-title v-if="itemDef.title.show" :itemDef="itemDef.title" style="margin:0;background-color: transparent;" />
    <template v-if="imgList.length > 0">
      <!-- <img v-for="(item,i) of imgList" :src="item.src" :key="i" /> -->
      <div v-for="(item,i) of imgList" :key="i" :style="imgStyle(item)">
        <van-image style="width: 100%;display:block;" :src="item.src" v-if="item.src" />
        <van-image style="width: 100%;height: 200px;display:block;" src="" v-else/>
      </div>
      
    </template>
    <van-image style="width: 100%;height: 200px;display:block;" v-else>
      <template v-slot:loading>
        请添加图片
      </template>
    </van-image>
  </section>
</template>

<script>
import { Image } from 'vant'
import compStyleMixin from '@/mixin/compStyle'
export default {
  props: ["itemDef","slotData"],
  components: {
    [Image.name]: Image
  },
  mixins: [compStyleMixin],
  computed: {
    imgList () {
      return (this.itemDef.isSlot && this.slotData) ? (this.slotData[this.itemDef.slotKey]) : (this.itemDef.imageList)
    },
    // attr() {
    //   if (this.itemDef && this.itemDef.attributes) {
    //     let obj = {}
    //     this.itemDef.attributes.forEach((item) => {
    //       if (item.name) {
    //         obj[item.name] = item.value
    //       }
    //     })
    //     return obj
    //   }
    //   return {}
    // }
  },
  methods: {
    imgStyle(item) {
      let style = {}
      if (item.gap) {
        style={'padding': `${item.gap.marginTop}px ${item.gap.marginRight}px ${item.gap.marginBottom}px ${item.gap.marginLeft}px`}
      }
      return style
    }
  }
}
</script>
<style scoped lang='stylus'>
.page-img-list {
  margin: 5px 0;
  background-color: #fff;
  border-style: solid;
  border-width: 0;
}
.page-img-list--card {
  margin: 5px 10px;
  border-radius: 8px;
  overflow hidden
}
img{
  display: block;
  width:100%;
}
</style>