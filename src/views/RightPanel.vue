<template>
  <section class="right-board">
    <el-tabs v-model="currentTab" class="center-tabs">
      <el-tab-pane label="组件设置" name="comp" v-if="activeData&&activeData.__config__"/>
      <el-tab-pane label="页面设置" name="page" v-if="!onlyComp"/>
    </el-tabs>
    <div class="field-box">
      <!-- 组件属性 -->
      <el-scrollbar class="right-scrollbar" v-if="activeData&&activeData.__config__&&currentTab=='comp'"> 
        <el-collapse :accordion="false" v-model="activeNames">
          <el-collapse-item title="组件设置" name="comp">
            <div class="comp-name">{{pageConfigMap[activeData.__config__.type].__config__.label}}</div>
            <div class="propeditor-list propeditor-list-style">
              <div v-for="(prop,index) in pageConfigMap[activeData.__config__.type].__config__.props" :key="'compgroup_'+index">
                <div class="propeditor-group-styles" v-if="!prop.showFunc || prop.showFunc(activeData.__config__)">
                  <el-divider v-if="prop.topDivider" :key="prop.key"></el-divider>
                  <PropertyEditor  
                  :prop-def="prop" 
                  :comp-config="activeData.__config__"
                  :key="prop.key"
                  v-model ="activeData.__config__[prop.key]"
                  @input="prop.callback && prop.callback(activeData.__config__)">
                  </PropertyEditor>
                  <el-divider v-if="prop.divider" :key="prop.key"></el-divider>
                </div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="标题设置" name="title" v-if="pageConfigMap[activeData.__config__.type].__config__.hasTitleSetting">
            <template slot="title">
              <div style="width: 100%;display: flex;align-items: center;justify-content: space-between;">
                标题设置
                <el-switch v-model="activeData.__config__.title['show']" style="margin-right: 15px;" />
              </div>
            </template>
            <div class="propeditor-list propeditor-list-style">
              <div v-for="(group,index) in titleProps" :key="'titlegroup_'+index">
                <div class="propeditor-group-name" v-if="group.groupName">{{group.groupName}}</div>
                <div class="propeditor-group-styles">
                  <template v-for="prop in group.props" >
                    <PropertyEditor  v-if="!prop.showFunc || prop.showFunc(activeData.__config__.title)" :prop-def="prop"  :key="prop.key"
                    v-model ="activeData.__config__.title[prop.key]">
                    </PropertyEditor>
                    <el-divider v-if="prop.divider" :key="prop.key"></el-divider>
                  </template>
                </div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="样式设置" name="style" v-if="!pageConfigMap[activeData.__config__.type].__config__.noStyleSetting">
            <div class="propeditor-list propeditor-list-style" :key="activeData.__config__.type">
              <div v-for="(group,index) in styleProps" :key="'stylegroup_'+index">
                <div class="propeditor-group-name" v-if="group.groupName">{{group.groupName}}</div>
                <div class="propeditor-group-styles">
                  <template v-for="style in group.styles" >
                    <PropertyEditor  v-if="!style.showFunc || style.showFunc(activeData.__config__.style)" :prop-def="style"  :key="style.key"
                    v-model ="activeData.__config__.style[style.key]" @input="style.callback && style.callback(activeData.__config__.style)">
                    </PropertyEditor>
                    <el-divider v-if="style.divider" :key="style.key"></el-divider>
                  </template>
                </div>
              </div>
            </div>
          </el-collapse-item>
       </el-collapse>
      </el-scrollbar>
      <!-- 页面属性 -->
      <el-scrollbar class="right-scrollbar" v-else-if="currentTab=='page'&&!onlyComp"> 
        <div class="propeditor-list propeditor-list-style" style="margin-top:10px;">
          <div v-for="(group,index) in pageProps" :key="'pagegroup_'+index">
            <div class="propeditor-group-name" v-if="group.groupName">{{group.groupName}}</div>
            <div class="propeditor-group-styles">
              <template v-for="prop in group.props" >
                <PropertyEditor  v-if="!prop.showFunc || prop.showFunc(pageConf)" :prop-def="prop"  :key="prop.key"
                v-model ="pageConf[prop.key]">
                </PropertyEditor>
                <el-divider v-if="prop.divider" :key="prop.key"></el-divider>
              </template>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </section>
</template>
<script>
import styleProps from '@/components/prop/styleProps'
import titleProps from '@/components/prop/titleProps'
import pageProps from '@/components/prop/pageProps'
import PropertyEditor from "@/components/prop/PropertyEditor"
import {pageConfigMap} from '@/components/generator/pageConfig'
import {otherConfigMap} from '@/components/generator/otherConfig'
export default {
    props: ['activeTab','activeData', 'pageConf', 'onlyComp'],
    components:{
      PropertyEditor
    },
    watch:{
      'activeTab':{
        handler(val){
          this.currentTab = val
        },
        immediate:true
      },
    },
    computed:{
      pageConfigMap(){
        return {
          ...pageConfigMap,
          ...otherConfigMap
        }
      }
    },
    data() {
        return {
          currentTab: 'page',
          activeNames:["comp","style"],
          styleProps,
          titleProps,
          pageProps
        }
    }
}
</script>
<style scoped lang='stylus'>
@import '../styles/home.styl';
.comp-name{
  font-size:18px;
  border-bottom: 1px solid #F5F7FA;
  padding:10px 10px;
}
.propeditor {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}
.propeditor-title {
  position: relative;
  line-height: 30px;
  font-size: 14px;
  padding: 0 10px;
  background: #f2f2f2;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}
.propeditor-list {
  background: #fff;
}
.propeditor-nop {
  line-height: 50px;
  font-size: 14px;
  padding: 0 10px;
  color: #666;
}
.propeditor-group-name {
  padding: 0 10px;
  font-size: 14px;
  line-height: 30px;
  background: #eee;
}
.propeditor-group-styles {
  position: relative;
}

.el-divider--horizontal{
  margin:10px 0;
}

.page-pane{
padding: 5px 5px 5px 12px;
}
.el-collapse{
  border:none;
  /deep/.el-collapse-item{
    border-bottom:5px solid #F5F7FA;
    background-color:#fff;
    padding: 5px 5px 5px 12px;
    .el-collapse-item__wrap,.el-collapse-item__header{
      border:none;
    }
    .el-collapse-item__content{
      padding-bottom:0;
    }
    .el-collapse-item__header{
      font-size:16px;
      color:#333;
    }
  }
}
</style>
<style lang="stylus">
.no-line-height{
  &.el-form-item .el-form-item__label{
    line-height:unset;
  }
}
.el-select-dropdown__wrap.el-scrollbar__wrap{
  margin-bottom:0 !important;
}
</style>