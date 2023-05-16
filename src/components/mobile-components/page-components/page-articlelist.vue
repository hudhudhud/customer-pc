<template>
<section :comp-type="itemDef.type" class="page-article-list" :class="{'page-article-list--card': itemDef.style && itemDef.style.styleType == '卡片式'}" :style="compStyle">
  <page-title v-if="itemDef.title.show" :itemDef="itemDef.title" style="margin:0;background-color: transparent;" />

  <div class="list-box">
    <ArticleItem v-for="(item, index) of list" :key="index" :item="item" />
  </div>
  
</section>
</template>

<script>
import { ARTICLE_NEW, ARTICLE_HOT, ARTICLE_STAR } from '@/api/index'
import request from '@/utils/request'
import compStyleMixin from '@/mixin/compStyle'
import ArticleItem from '../articleItem.vue'
export default {
  props: ["itemDef"],
  components: {ArticleItem},
  mixins: [compStyleMixin],
  data(){
    return {
      list:[]
    }
  },
  watch: {
    "itemDef.showParams":{
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
    "itemDef.count":{
      handler(val){
       this.getList()
      },
      immediate: true
    },

  },
  methods:{
    getList() {
      if (this.itemDef.showParams==='custom') {
        this.list = this.itemDef.dataList.slice(0, this.itemDef.count)
        return
      }
      if (!this.itemDef.itemId || !this.url) {
        return 
      }
      request.auth_post(this.url, {
        itemId: this.itemDef.itemId,
        pageSize: this.itemDef.count
      }).then(res => {
        if (res.errcode == 0) {
          this.list = res.data.list
        }
      })
    },
  },
  computed:{
   url() {
    if (this.itemDef && this.itemDef.showParams == 'new') {
      return ARTICLE_NEW
    }
    if (this.itemDef && this.itemDef.showParams == 'hot') {
      return ARTICLE_HOT
    }
    if (this.itemDef && this.itemDef.showParams == 'star') {
      return ARTICLE_STAR
    }
    return ''
   }
  }
}
</script>
<style scoped lang="stylus">
.page-article-list {
  min-height: 60px;
  margin: 5px 0;
  background-color: #fff;
  border-style: solid;
  border-width: 0;
}
.page-article-list--card {
  margin: 5px 10px;
  border-radius: 8px;
  overflow hidden
}
.list-box {
  padding: 0 15px;
}

.article-box {
  min-height: 40px;
  padding: 17px 0 20px 0;
  border-bottom:1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  .article-title {
    font-size: 15px;
    // font-weight: bold;
    color: #333333;
    line-height: 21px;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp: 2;
    overflow:hidden;
  }
  .article-info {
    margin-top: 8px;
    font-size: 14px;
    color: #999;
  }
  .article-num {
    float: right
  }
  .icon {
    width: 14px;
  }
}
</style>