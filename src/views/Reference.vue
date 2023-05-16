<template>
  <div class="container">
    <div class="left-board">
      <div class="logo-wrapper">
        <div class="logo">
          <el-button icon="el-icon-view" type="text" @click="showNotice">
            注意事项
          </el-button>
        </div>
      </div>
      <el-scrollbar class="left-scrollbar">
        <div class="components-list">
          <div v-for="(item, listIndex) in leftComponents" :key="listIndex">
            <div class="components-title">
              <svg-icon icon-class="component" />
              {{ item.title }}
            </div>
            <div v-if="!item.list.length">无</div>
            <draggable
              class="components-draggable"
              :list="item.list"
              :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
              :clone="cloneComponent"
              draggable=".components-item"
              :sort="false"
              @end="onEnd"
            >
              <div
                v-for="(element, index) in item.list"
                :key="index"
                class="components-item"
                @click="addComponent(element)"
              >
                <div class="components-body">
                  <!-- <svg-icon :icon-class="element.__config__.type" /> -->
                  <span :class="[element.__config__.type, 'components-icon']"></span>
                  <span>{{element.__config__.label}}</span>
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="center-board">
      <div class="action-bar">
        <el-button class="delete-btn" icon="el-icon-delete" type="text" @click="empty">
          清空
        </el-button>
        <el-button icon="el-icon-check" type="text" @click="confirmJson">
          保存
        </el-button>
        <el-button icon="el-icon-view" type="text" @click="showCss">
          css
        </el-button>
         <el-button icon="el-icon-view" type="text" @click="showJs">
         js
        </el-button>
        <el-button icon="el-icon-view" type="text" @click="showJson">
          json
        </el-button>
      </div>
      <el-scrollbar class="center-scrollbar">
        <div class="phone">
          <el-row class="center-board-row">
            <el-form @submit.native.prevent> 
              <div class="form-container">
                <draggable class="drawing-board" :list="drawingList" :animation="340" group="componentsGroup">
                  <draggable-item
                    v-for="(item, index) in drawingList"
                    :key="item.renderKey"
                    :drawing-list="drawingList"
                    :current-item="item"
                    :index="index"
                    :active-id="activeId"
                    :form-conf="pageConf"
                    @activeItem="activeFormItem"
                    @upItem="drawingItemUp"
                    @downItem="drawingItemDown"
                    @copyItem="drawingItemCopy"
                    @deleteItem="drawingItemDelete"
                  />
                </draggable>
                <div v-if="!drawingList.length" class="empty-info">
                  <img src="../assets/zhiyin.png" />
                  从左侧拖入或点选组件进行页面设计
                </div>
              </div>
            </el-form>
          </el-row>
        </div>
      </el-scrollbar>
    </div>

    <right-panel
      :active-data="activeData"
      :page-conf="pageConf"
      :show-field="!!drawingList.length"
      :draw-list-obj ="drawingListObj"
      :active-tab="rightPanelActiveTab"
      :only-comp="true"
    />
    <json-drawer
      size="60%"
      :visible.sync="jsonDrawerVisible"
      :json-str="JSON.stringify(formData)"
      @jsonChange = "jsonChange"
    />
     <css-drawer
      size="60%"
      v-model="cssData"
      :visible.sync="cssDrawerVisible"
    />
    <js-drawer
      size="60%"
      v-model="jsData"
      :visible.sync="jsDrawerVisible"
    />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { debounce } from 'throttle-debounce'
import JsonDrawer from '@/components/monaco-editor/JsonDrawer'
import JsDrawer from '@/components/monaco-editor/JsDrawer'
import CssDrawer from '@/components/monaco-editor/CssDrawer'
import RightPanel from './RightPanel'
import {pageConf,baseComponents,businessComponents,} from '@/components/generator/pageConfig'
import {
   beautifierConf, deepClone
} from '@/utils/index'
import logo from '@/assets/logo.png'
import DraggableItem from './DraggableItem'
import TabBar from './TabBar'
import { getIdGlobal } from '@/utils/db'
import Request from '@/utils/request'
import {REFRERENCE_INFO, REFRERENCE_SAVE} from '@/api/index'

let tempActiveData
const idGlobal = getIdGlobal()
export default {
  components: {
    draggable,
    JsonDrawer,
    JsDrawer,
    CssDrawer,
    RightPanel,
    DraggableItem,
   TabBar,
  },
  data() {
    return {
      rightPanelActiveTab:'page',
      activeModuleIndex:0,
      initDrawing:null,
      logo,
      idGlobal,
      pageConf,
      drawingList: [],
      activeId: '',
      formData: {},
      jsData:'',
      cssData:'',
      jsonDrawerVisible: false,
      cssDrawerVisible:false,
      jsDrawerVisible:false,
      activeData: {},
      leftComponents: [
        {
          title:"基础组件",
          list:baseComponents,
        }
      ],      
    }
  },
  computed: {
    drawingListObj(){
      return {list:this.drawingList}
    },
  },
  watch: {
    drawingList: {
      handler(val) {
        // console.log('drawingList',val)
        if (!val || val.length === 0) this.idGlobal = 100
      },
      deep: true
    }
  },
  async mounted() {
    document.body.addEventListener('keyup',(e)=>{
      if(e.which==46&&this.activeData){
        this.drawingItemDelete()
      }
    })
    //回写json
    if(this.$route.query.id){
      await this.getData()
    }

    //数据初始化
    if(this.initDrawing){
      this.jsonDataInit()
    }

    //默认选中第一项
    if(this.drawingList.length){
      this.activeFormItem(this.drawingList[0])
    }
    sessionStorage.setItem('userTicket', this.$route.query.userTicket)

    //第一次默认弹出注意事项
    if(!localStorage.getItem('diy-reference-show-notice')){
      this.showNotice()
    }

    //获取栏目列表
    this.$store.dispatch('getItemList').catch((err)=>{
      this.$message.error({ message:err, duration:5000 })
    })
  },
  methods: {
    async getData(){
      // return
      try{
        let res = await Request.post(REFRERENCE_INFO, {
          id: this.$route.query.id
        })
        if(res.errcode==0){
          this.initDrawing = JSON.parse(res.data.htmlJson)
          this.cssData = res.data.css
          this.jsData = res.data.js
          console.log(this.initDrawing)
          this.$store.commit('SET_APPID',res.data.appId)
          if (res.data.auth) { //该app需要登录才加功能组件
            this.leftComponents.push(              
              {
                title:"功能组件",
                list:businessComponents,
              }
            )
          }
        }
        else{
          this.$message.error({ message:res.message, duration:5000 });
        }
      }
      catch(e){
        console.log(e)
        this.$message.error({ message:e, duration:5000 })
      }
    },
    jsonDataInit(){
      this.drawingList = []
      this.initDrawing.forEach(param=>{           
        let obj = this.settingInitJson_customer(param)
        this.drawingList.push(obj)
      })
      this.pageConf = this.initDrawing
      this.drawingList.forEach(it=>{this.createIdAndKey(it)})
    },
    settingInitJson_customer(param){
      let newParam = deepClone(param)
      return {__config__:{...newParam}}
    },
    activeFormItem(currentItem,index,list) {
      if(!currentItem)return
      this.activeData = currentItem
      this.activeId = currentItem.__config__.formId
      if(index!==undefined){
        this.activeItemIndex = index
      }
      this.rightPanelActiveTab = "comp"
    },
    onEnd(obj) {
      if (obj.from !== obj.to) {
        this.activeData = tempActiveData
        this.activeId = this.idGlobal
      }
    },
    addComponent(item) {
      const clone = this.cloneComponent(item)
      this.drawingList.push(clone)
      this.activeFormItem(clone)
    },
    cloneComponent(origin) {
      const clone = deepClone(origin)
      this.createIdAndKey(clone)
      tempActiveData = clone
      return tempActiveData
    },
    createIdAndKey(item) {
      const config = item.__config__
      if(!config)return
      config.formId = ++this.idGlobal
      config.renderKey = `${config.formId}${+new Date()}` // 改变renderKey后可以实现强制更新组件
      if (Array.isArray(config.params)) {
        config.params = config.params.map(childItem => this.createIdAndKey(childItem))
      }
      return item
    },
    //生成json数据
    AssembleFormData() {
      let draList = this.drawingList.map(it=>it.__config__)
      let resultList = deepClone(draList)
      resultList.forEach(it=>{
        delete it.formId
        delete it.renderKey
        delete it.componentName
        delete it.props
      })
      this.formData = resultList
    },
    empty(needConfirm=true) {
      if(needConfirm){
        this.$confirm('确定要清空所有组件吗？', '提示', { type: 'warning' }).then(
          () => {
            this.drawingList = []
            this.idGlobal = 100
          }
        )
      }
      else{
        this.drawingList = []
        this.idGlobal = 100
      }
    } ,
    drawingItemUp(index, list){
      let temp = list[index]
      list.splice(index,1,list[index-1])
      list.splice(index-1,1,temp)
    },
    drawingItemDown(index, list){
      let temp = list[index]
      list.splice(index,1,list[index+1])
      list.splice(index+1,1,temp)
    },
    drawingItemCopy(item, list) {
      let clone = deepClone(item)
      clone = this.createIdAndKey(clone)
      list.push(clone)
      this.activeFormItem(clone)
    },
    drawingItemDelete(index, list) {
      list.splice(index, 1)
      this.$nextTick(() => {
        const len = this.drawingList.length
        if (len) {
          this.activeFormItem(this.drawingList[len - 1])
        }
      })
    },
    showJson() {
      this.AssembleFormData()
      this.jsonDrawerVisible = true
    },
    showJs(){
      this.jsDrawerVisible = true
    },
    showCss(){
      this.cssDrawerVisible = true
    },
    async confirmJson(){
      this.AssembleFormData()
      let jsonString = JSON.stringify(this.formData)
      let beautifierJson = beautifier.js(jsonString, beautifierConf.js)
      let beautifierCss = this.cssData// beautifier.js(this.cssData, beautifierConf.js)
      let beautifierJs =  beautifier.js(this.jsData, beautifierConf.js)
      console.log('confirmJson...')
      console.log(beautifierJson)

      try{
        let res = await Request.post(REFRERENCE_SAVE, {
          id:this.$route.query.id,
          htmlJson:beautifierJson,
          css:beautifierCss,
          js:beautifierJs,
        })
          if(res.errcode==0){
            this.$message({ message: '保存成功！', type: 'success' });
          }
          else{
            this.$message.error({ message:res.message, duration:5000 })
          }
        }
        catch(e){
          console.log(e)
          this.$message.error({  message:e, duration:5000 })
        }
    },
    jsonChange(newjson){
      this.drawingList = []
      this.initDrawing = newjson 
      this.jsonDataInit()
    },
    showNotice(){
      this.$alert(`
        1.引用组件中的js最终会拼接到被引用页面的js中，所以切勿有相同名字的函数；<br>
        2.引用组件没有init函数配置，如需在页面初始化时调用引用组件的函数，请在被引用页面的init方法中调用该函数。`, '注意事项', 
      {
        dangerouslyUseHTMLString: true,
        callback(){
          localStorage.setItem('diy-reference-show-notice','1')
        }
      });
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '../styles/home.styl';
.phone{
  margin: 60px auto;
  background-size: 100% 100%;
  width: $phone-width;
  position:relative;
  .el-form{
    // https://segmentfault.com/q/1010000010677322
    //让所有position:fixed元素相对父元素定位，translate之后，fix相对窗口定位失效，相对父元素
    transform:translate(0,0);
    width:100%;
    box-sizing: border-box;
    // overflow: hidden;
    background-color:#fff;
    // height:667px;
      //position:fixed元素滚动时需要固定位置，因此增加相对定位容器
    .form-container{
      // padding-top:10px;
      position:relative;
      width:100%;
      height:100%;
      // overflow: auto;
      box-sizing: border-box;
      min-height:680px;
    }
  }
}
.empty-info{
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  color: #409EFF;
  img {
    margin-bottom: 20px;
  }
}
.components-list .components-item {
  width: 33%;
  margin: 15px 0 0 0;
}
.components-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  border: none;
  background-color: transparent;
  &:hover {
    border: none;
    color: #409EFF;
  }
  .components-icon {
    display: inline-block;
    width: 60px;
    height: 60px;
    margin-bottom: 5px;
    background-image: url('../assets/components-icon.png');
  }

  .page-quesList {
    background-position: 0 0;
  }
  &:hover .page-quesList {
    background-position: 0 -60px;
  }

  .page-videoList {
    background-position: 0 -120px;
  }
  &:hover .page-videoList {
    background-position: 0 -180px;
  }

  .page-articleList {
    background-position: 0 -240px;
  }
  &:hover .page-articleList {
    background-position: 0 -300px;
  }

  .page-title {
    background-position: 0 -360px;
  }
  &:hover .page-title {
    background-position: 0 -420px;
  }

  .page-imgTextNav {
    background-position: 0 -480px;
  }
  &:hover .page-imgTextNav {
    background-position: 0 -540px;
  }

  .page-swiper {
    background-position: 0 -600px;
  }
  &:hover .page-swiper {
    background-position: 0 -660px;
  }

  .page-datasourceList {
    background-position: 0 -720px;
  }
  &:hover .page-datasourceList {
    background-position: 0 -780px;
  }

  .page-imgList {
    background-position: 0 -840px;
  }
  &:hover .page-imgList {
    background-position: 0 -900px;
  }

  .page-searchBar {
    background-position: 0 -960px;
  }
  &:hover .page-searchBar {
    background-position: 0 -1020px;
  }

  .page-favorList {
    background-position: 0 -1080px;
  }
  &:hover .page-favorList {
    background-position: 0 -1140px;
  }
}

</style>