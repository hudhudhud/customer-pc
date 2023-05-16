<template>
  <section :comp-type="itemDef.type" class="page-favor-list" :class="{'page-favor-list--card': itemDef.style && itemDef.style.styleType == '卡片式'}" :style="compStyle">
    <page-title v-if="itemDef.title.show" :itemDef="itemDef.title" style="margin:0;background-color: transparent;" />

    <div class="list-box" v-if="itemDef.showList && itemDef.dataType.length > 0">

      <template v-for="(item, index) of list">
        <ArticleItem :key="index" :item="item.info" v-if="item.info" class="item"/>
        <question-item :key="index" :item="item.faq" v-if="item.faq" class="item"/>
        <video-item :key="index" :item="item.video" mode="list" v-if="item.video" class="item item--video"/>
      </template>
    </div>
    
  </section>
</template>

<script>
import { COLLECT_ARTICLES, COLLECT_QUESTIONS, COLLECT_VIDEOS, COLLECT_LIST } from '../../../api/index'
import request from '@/utils/request'
import compStyleMixin from '@/mixin/compStyle'
import ArticleItem from '../articleItem.vue'
import QuestionItem from '../questionItem.vue'
import VideoItem from '../videoItem.vue'
export default {
  props: ["itemDef"],
  components: { ArticleItem, QuestionItem, VideoItem },
  mixins: [compStyleMixin],
  data(){
    return {
      list:[],
      loading: false
    }
  },
  watch: {
    "itemDef.count":{
      handler(val){
       this.getList()
      },
      immediate: true
    },
    "itemDef.itemId":{
      handler(val){
       this.getList()
      },
      immediate: true
    },
    "itemDef.dataType":{
      handler(val){
       this.getList()
      },
      immediate: true
    },
    "itemDef.showList":{
      handler(val){
       this.getList()
      },
      immediate: true
    },
  },
  methods:{
    getList() {
      if (!this.itemDef.itemId || !this.itemDef.showList) return
      request.auth_post(COLLECT_LIST, {
        itemIds: this.itemDef.itemId,
        pageSize: this.itemDef.count,
        classes: this.classes
      }).then(res => {
        if (res.errcode == 0) {
          if (this.itemDef.dataType == 'article') {
            this.list = res.data.list.map(item => {
              item.noticeTitle = item.infoTitle
              return item
            })
          } else {
            this.list = res.data.list
          }
        }
      })
    }
  },
  computed:{
    classes() {
      if (this.itemDef && this.itemDef.dataType && Array.isArray(this.itemDef.dataType)) {
        let arr = []
        this.itemDef.dataType.forEach(item => {
          if (item == 'article') {
            arr.push(1)
          }
          if (item == 'question') {
            arr.push(2)
          }
          if (item == 'video') {
            arr.push(3)
          }
        })
        return arr.join()
      }
      return ''
    }
  }
}
</script>
<style scoped>
.page-favor-list {
  min-height: 60px;
  margin: 5px 0;
  background-color: #fff;
  border-style: solid;
  border-width: 0;
}
.page-favor-list--card {
  margin: 5px 10px;
  border-radius: 8px;
  overflow: hidden;
}
.list-box {
  padding:0 15px;
}
.list-box--video {
  align-content:flex-start;
  display:flex;
  /* flex-wrap:wrap; */
  padding:0 15px;
  padding-bottom: 15px;
}
.item {
  border-bottom:1px solid #eee;
}
.item:last-child {
  border-bottom:none;
}
.item--video {
  padding-bottom: 15px;
}
</style>