<template>
  <div class="action">
    <div class="action-row action-row-radio">
      <div v-if="label" class="action-row-label">{{label}}</div>
      <el-select v-model="val.type" :size="size" style="width:100%;" @change="typeChange">
        <el-option :value="it.value" :label="it.label" v-for="(it,i) of operateTypes" :key="i"></el-option>
      </el-select>
    </div>
    <div class="action-row" v-if="val.type&&val.type!='none'&&val.type!='msg'&&val.type!='event'&&val.type!='pop'">
      <div v-if="label" class="action-row-label" />
      <el-checkbox v-model="val.isReplace"></el-checkbox>&nbsp;
      跳转时替换当前页
      <!-- <el-switch v-model="val.isReplace" active-color="#13ce66" inactive-color="#ff4949">
      </el-switch> -->
    </div>
    <div class="action-row" v-if="val.type!='none'">
      <div v-if="label" class="action-row-label">{{operateTypes.find(it=>it.value==val.type).desc}}</div>
      <span v-else>{{operateTypes.find(it=>it.value==val.type).desc}} &nbsp;</span>
      <el-select v-model="val.action" :size="size" key="page" v-if="val.type==='pageId'||val.type=='pop'">
        <el-option :value="it.id+''" :label="it.pageName" v-for="(it,i) of pageList" :key="i"></el-option>
      </el-select>
      <el-select v-model="val.action" :size="size" key="app" v-else-if="val.type==='appId'">
        <el-option :value="it.id+''" :label="it.app" v-for="(it,i) of appList" :key="i"></el-option>
      </el-select>
      <el-select v-model="val.action" :size="size" key="items" @change="itemChange" v-else-if="['article','video','question','collect'].indexOf(val.type) > -1">
        <el-option :value="it.id+''" :label="it.name" v-for="(it,i) of itemList" :key="i"></el-option>
      </el-select>
      <div v-else-if="['articleDetail', 'videoDetail', 'questionDetail'].indexOf(val.type) > -1" class="detail-info">
        <div class="detail-item" v-if="val.extend && val.extend.detailId">
          <span >{{val.extend.detailName}}</span>
          <i class="el-icon-error" @click="delDetail"></i>
        </div>
        <el-button type="text" @click="showDetail=true">选择{{detailType}}</el-button>
      </div>
      <el-input v-model="val.action" :size="size" v-else></el-input>
    </div>
    <div class="action-row" v-if="val.type==='article'||val.type=='video'||val.type==='question'">
      <div v-if="label" class="action-row-label">分类</div>
      <span v-else>分类 &nbsp;</span>
      <div class="type-info">
        <div class="type-item" v-if="type">
          <span >{{type.typeName}}</span>
          <i class="el-icon-error" @click="delType"></i>
        </div>
        <el-button type="text" @click="onShowType">选择分类</el-button>
      </div>
    </div>
    <div class="action-row" v-if="val.type == 'collect' && val.extend">
      <div v-if="label" class="action-row-label">数据类型</div>
      <span v-else>数据类型 &nbsp;</span>
      <el-checkbox-group v-model="val.extend.dataType">
				<el-checkbox label="article">文章</el-checkbox>
        <el-checkbox label="video">视频</el-checkbox>
        <el-checkbox label="question">问答</el-checkbox>
			</el-checkbox-group>
    </div>
    <div class="action-row" v-if="['article','video','question'].indexOf(val.type) > -1">
      <div v-if="label" class="action-row-label">页面标题</div>
      <span v-else>页面标题 &nbsp;</span>
      <el-input v-model="val.pageTitle" :size="size"></el-input>
    </div>
    <div class="action-row" v-if="val.type&&val.type=='pop'">
      弹框确认函数
      <el-input v-model="val.confirm" placeholder="请输入弹框确认函数名称"/>
    </div>
    <ActionTypeDialog v-model="showType" :itemId="val.action" :type="val.type" :chckedItem="type" @confirm="onChangeType" />
    <ActionDetailDialog v-model="showDetail" :checkedItem="val.extend" :type="val.type" @confirm="onChangeDetail" />
  </div>
</template>

<script>
import Request from '@/utils/request'
import {GET_PAGES, GET_APPS, TYPE_INFO} from '@/api/index'
import ActionTypeDialog from './actionTypeDialog.vue'
import ActionDetailDialog from './actionDetailDialog.vue'
export default {
  // label 不在配置项中，单独使用时的标签信息，此时其他选项标签与label对齐
  props: ["value", "propDef", "label", "size"],
  components: { ActionTypeDialog, ActionDetailDialog },
  data () {
    return {
      // val: this.value,
      val: {
        type: 'none',
        action: '',
        pageTitle: '',
        extend: {}
      },
      operateTypes:[
        {value:"none",label:"无"},
        {value:"msg",label:"提示",desc:"提示文字"},
        {value:"pageId",label:"页面",desc:"页面"},
        {value:"appId",label:"应用",desc:"应用"},
        // {value:"route",label:"应用内链接",desc:"应用内链接"},
        // {value:"module",label:"内部链接",desc:"内部链接"},
        {value:"article",label:"文章列表",desc:"栏目"},
        {value:"articleDetail",label:"文章详情",desc:"文章"},
        {value:"video",label:"视频列表",desc:"栏目"},
        {value:"videoDetail",label:"视频详情",desc:"视频"},
        {value:"question",label:"问答列表",desc:"栏目"},
        {value:"questionDetail",label:"问答详情",desc:"问答"},
        {value:"collect",label:"我的收藏",desc:"栏目"},
        {value:"url",label:"链接",desc:"链接"},
        {value:"event",label:"事件",desc:"事件名称"},
        // {value:"pop",label:"弹框",desc:"弹框页面"},
      ],
      pageList:[],
      appList:[],
      showType: false,
      type: null,
      showDetail: false,
    }
  },
  computed: {
    detailType() {
      let name = ''
      if (this.val.type == 'articleDetail') {
        name = '文章'
      }
      if (this.val.type == 'videoDetail') {
        name = '视频'
      }
      if (this.val.type == 'questionDetail') {
        name = '问答'
      }
      return name
    },
    itemList(){
      return this.$store.state.itemList
    }
  },
  watch: {
    val (val) {
      this.$emit("input", val)
    },
    value:{
      handler(val) {
        this.val = val || this.propDef.default || {type:"none",action:null, extend: {}}
        if(!val)return
        // if(val.type=="pageId"||val.type=="pop"){
        //   this.getPageList()
        // }
        switch(val.type) {
          case 'pageId':
            this.getPageList()
            break;
          case 'appId':
            this.getAppList()
            break;
          case 'article':
          case 'video':
          case 'question':
            this.getTypeInfo()
            break;
        }
      },
      immediate:true,
    }
  },
  methods:{
    typeChange(val){
      this.$set(this.val,'action','')
      this.$set(this.val,'extend',{})
      this.$set(this.val,'pageTitle','')
      this.type = null
      switch(val) {
        case 'pageId':
          this.getPageList()
          break;
        case 'appId':
          this.getAppList()
          break;
        case 'article':
        case 'video':
        case 'question':
          break;
        case 'collect': 
          this.$set(this.val,'extend',{dataType: ['article','video','question']})
          break
      }
    },
    itemChange() {
      if (['article','video','question'].indexOf(this.val.type) > -1) {
        this.$set(this.val,'extend',null)
        this.type = null
      }
    },
    async getPageList(){
      let res = await Request.post(GET_PAGES,{id:this.$route.query.pageid})
      if(res.errcode==0){
        let list = []
        res.data.forEach((item) => {
          if (item.id != this.$route.query.pageid) {
            list.push(item)
          }
        })
        this.pageList = list
      }
      else{
        this.$message.error({ message:res.message, position:'middle', duration:5000 });
      }
    },
    async getAppList(){
      let res = await Request.post(GET_APPS,{oid:1},{
         headers: {
          'Authorization': this.$route.query.userTicket,
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
      if(res.errcode==0){
        let list = []
        res.data.forEach((item) => {
          if (item.id !== this.$store.state.appId) {
            list.push(item)
          }
        })
        this.appList = list
      }
      else{
        this.$message.error({ message:res.message, position:'middle', duration:5000 });
      }
    },
    onShowType() {
      if (!this.val.action) {
        this.$message.error({ message:'请选择栏目', duration:2000 });
        return
      }
      this.showType = true
    },
    onChangeType(v) {
      this.type = {
        typeId: v.id,
        typeName: v.name
      }
      this.$set(this.val, 'extend', {
        typeId: v.id
      })
    },
    delType() {
      this.$set(this.val, 'extend', null)
      this.type = null
    },
    getTypeInfo() {
      this.type = null
      if (!this.val.extend || !this.val.extend.typeId) return
      let mode = this.val.type == 'article' ? 1 : this.val.type == 'video' ? 3 : this.val.type == 'question' ? 2 : ''
      Request.auth_post(TYPE_INFO, {id:this.val.extend.typeId, mode}).then(res => {
        if (res.errcode === 0) {
          if (res.data.id) {
            this.type = {
              typeId: res.data.id,
              typeName: res.data.name
            }
          } else {
            this.type = null
            this.$set(this.val, 'extend', null)
          }
        }
          
      })
    },
    onChangeDetail(v) {
      this.$set(this.val, 'extend', v)
      this.$set(this.val, 'action', v.detailId)
    },
    delDetail() {
      this.$set(this.val, 'extend', null)
      this.$set(this.val, 'action', '')
    }
  }
}
</script>

<style scoped lang="stylus">
.action-row {
  margin-bottom: 5px;
  display:flex;
  align-items: center;
  white-space:nowrap;
}
.action-row:last-child {
  margin-bottom: 0;
}
.action-row-radio .el-radio-group .el-radio {
  margin-left: 0;
  margin-right: 5px;
  margin-bottom: 5px;
}
.action-row-label {
  min-width: 60px;
  padding-right: 15px;
  font-size: 14px;
  color: #666;
}
.detail-info, .type-info {
  display: flex;
  align-items: center;

  .detail-item, .type-item {
    max-width: 130px;
    padding-right: 15px;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    line-height: 40px;
    position: relative;

    &:hover i {
      display: block;
    }

    i {
      display: none;
      position: absolute;
      right: 0;
      top: 13px;
      color: #999;
    }
  }
}
</style>
