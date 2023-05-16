<template>
<section :comp-type="itemDef.type" class="page-question-list" :class="{'page-question-list--card': itemDef.style && itemDef.style.styleType == '卡片式'}" :style="compStyle">
  <page-title v-if="itemDef.title.show" :itemDef="itemDef.title" style="margin:0;background-color: transparent;" />

  <div class="list-box">
    <Question v-for="(item, index) of list" :key="index" :item="item" />
    
  </div>
  
</section>
</template>

<script>
import { QUESTION_NEW, QUESTION_HOT } from '@/api/index'
import request from '@/utils/request'
import compStyleMixin from '@/mixin/compStyle'
import Question from '../questionItem.vue'
export default {
  props: ["itemDef"],
  components: { Question },
  mixins: [compStyleMixin],
  data() {
    return {
      questionList: []
    }
  },
  watch: {
    "itemDef.count":{
      handler(val){
        this.getList()
      },
      immediate: true
    },
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
  },
  computed: {
    url() {
      if (this.itemDef && this.itemDef.showParams == 'new') {
        return QUESTION_NEW
      }
      if (this.itemDef && this.itemDef.showParams == 'hot') {
        return QUESTION_HOT
      }
      return ''
    },
    list(){
      let list = []
      if (this.itemDef.showParams == 'custom') {
        list = this.itemDef.dataList.slice(0, this.itemDef.count)
      } else {
        list = this.questionList
      }
      list.forEach(item => {
        if (item.files) {
          item.moreNum = item.files.length - 5
        }
        
        if (item.invite) {
          item.inviteNames = item.inviteName.split(',')
        }
      })
      return list
    }
  },
  methods:{
    getList() {
      if (this.itemDef.showParams == 'custom' || !this.url || !this.itemDef.itemId) return
      request.auth_post(this.url, {
        itemId: this.itemDef.itemId,
        pageSize: this.itemDef.count
      }).then(res => {
        if (res.errcode == 0) {
          this.questionList = res.data.list
        }
      })
    },
  },
}
</script>
<style lang="stylus" scoped>
.page-question-list {
  min-height: 60px;
  margin: 5px 0;
  background-color: #fff;
  border-style: solid;
  border-width: 0;
}
.page-question-list--card {
  margin: 5px 10px;
  border-radius: 8px;
  overflow: hidden;
}

</style>