<template>
  <div>
    <!-- <h3>选择模式</h3>
    <div class="list-mode">
      <div v-for="(item, index) of modeList" :key="index" class="mode-item" :class="{'active': setting.mode == item.value}" @click="onChangeMode(item)">
        {{item.label}}
      </div>
    </div> -->
    <!-- <el-divider content-position="left">定义模板</el-divider> -->
    <h3>定义模板</h3>
    <div class="section-box">
      <h4 class="min-title">信息栏标签</h4>
      <div class="section-box">
        <div class="line">
          <div class="line__label">文字颜色</div>
          <div class="line__value">
            <el-color-picker v-model="setting.label.color" size="small"></el-color-picker>
          </div>
        </div>
        <div class="line">
          <div class="line__label">对齐方式</div>
          <div class="line__value">
            <el-radio-group v-model="setting.label.align" size="mini">
              <el-radio-button label="left">居左</el-radio-button>
              <el-radio-button label="right">居右</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="line">
          <div class="line__label">文字大小</div>
          <div class="line__value line__value--flex">
            <el-slider v-model="setting.label.fontSize" :min="sliderMin" :max="sliderMax" style="flex-grow:1;"></el-slider>&nbsp;{{setting.label.fontSize}}px
          </div>
        </div>
        <div class="line">
          <div class="line__label">显示宽度</div>
          <div class="line__value">
            <el-input v-model="setting.label.width" size="small" />
          </div>
        </div>
      </div>
    </div>
    <div class="section-box">
      <h4 class="min-title">信息栏内容</h4>
      <div class="section-box">
        <div class="line">
          <div class="line__label">文字颜色</div>
          <div class="line__value">
            <el-color-picker v-model="setting.content.color" size="small"></el-color-picker>
          </div>
        </div>
        <div class="line">
          <div class="line__label">对齐方式</div>
          <div class="line__value">
            <el-radio-group v-model="setting.content.align" size="mini">
              <el-radio-button label="left">居左</el-radio-button>
              <el-radio-button label="right">居右</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="line">
          <div class="line__label">文字大小</div>
          <div class="line__value line__value--flex">
            <el-slider v-model="setting.content.fontSize" :min="sliderMin" :max="sliderMax" style="flex-grow:1;"></el-slider>&nbsp;{{setting.content.fontSize}}px
          </div>
        </div>
        <div class="line">
          <div class="line__label">显示宽度</div>
          <div class="line__value">
            <el-input v-model="setting.content.width" size="small" />
          </div>
        </div>
      </div>
    </div>
    <div class="section-box">
      <div class="line">
        <div class="line__label" style="padding-right: 15px;">摘要文字颜色</div>
        <div class="line__value line__value--flex"><el-color-picker v-model="setting.abstractColor" size="small"></el-color-picker></div>
      </div>
      <template v-if="compConfig.mode=='picTxtList' || compConfig.mode=='cardList'">
        <div class="line" v-if="compConfig.mode=='picTxtList'">
          <div class="line__label" style="padding-right: 15px;">配图</div>
          <div class="line__value line__value--flex">
            <el-radio-group v-model="setting.picAlign" size="mini">
              <el-radio-button label="left">左图右文</el-radio-button>
              <el-radio-button label="right">右图左文</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="line" v-if="compConfig.mode=='picTxtList'">
          <div class="line__label" style="padding-right: 15px;">图片宽度</div>
          <div class="line__value line__value--flex"><el-input v-model="setting.picWidth" size="small" /></div>
        </div>
        <div class="line">
          <div class="line__label" style="padding-right: 15px;">图片高度</div>
          <div class="line__value line__value--flex"><el-input v-model="setting.picHeight" size="small" /></div>
        </div>
      </template>
      <div class="line">
        <div class="line__label" style="padding-right: 15px;">标题</div>
        <div class="line__value line__value--flex"><el-checkbox v-model="setting.showTitle">显示标题</el-checkbox></div>
      </div>
      <div class="line" v-if="setting.showTitle">
        <div class="line__label" style="padding-right: 15px;">标题字段</div>
        <div class="line__value line__value--flex"><el-input v-model="setting.titleKey" size="small" @blur="setting.titleKey = setting.titleKey || 'title'" /></div>
      </div>
    </div>
    <div class="section-box">
      <h4 class="min-title">数据项</h4>
      <!-- <el-divider content-position="left">数据项</el-divider> -->
      <div v-for="(option, index) of setting.dataOption" :key="index" class="data-option">
        <i class="el-icon-error data-option__del" @click="delDataOption(index)" />
        <div class="line" >
          <div class="line__label">数据项{{index + 1}}</div>
          <div class="line__value">
            <el-select v-model="option.type" placeholder="请选择" size="small">
              <el-option
                v-for="item in dataOptionTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="line" v-if="option.type=='info'">
          <div class="line__label">名称</div>
          <div class="line__value line__value--flex"><el-input v-model="option.name" size="small" /></div>
        </div>
        <div class="line">
          <div class="line__label">字段</div>
          <div class="line__value line__value--flex"><el-input v-model="option.key" size="small" /></div>
        </div>
      </div>
       <el-button type="text" icon="el-icon-plus" size="mini" style="margin-top: 10px;margin-left: 115px;" @click="addDataOption">添加数据项</el-button>
    </div>

    
  </div>
</template>

<script>
export default {
  props: ["value", "propDef", "compConfig"],
  data () {
    return {
      modeList: [{
        label: '基础列表',
        value: 'list'
      },{
        label: '图文列表',
        value: 'picTxtList'
      },{
        label: '卡片列表',
        value: 'cardList'
      }],
      mode: '',
      setting: {
        mode: 'list',
        label: {
          color: '',
          algin: '',
          fontSize: 14,
          width: ''
        },
        content: {
          color: '',
          algin: '',
          fontSize: 14,
          width: ''
        },
        dataOption: []
      },
      sliderMin: 12,
      sliderMax: 30,
      dataOptionTypes: [{
        label: '信息栏',
        value: 'info'
      }, {
        label: '摘要',
        value: 'abstract'
      }],
      dataType: 'manual'
    }
  },
  watch: {
    setting: {
      handler(val) {
        this.$emit("input", val)
      },
      deep: true
    },
    value :{
      handler(val) {
        this.setting = val||this.propDef.default
      },
      immediate:true
    }
  },
  methods: {
    // onChangeMode(item) {
    //   this.setting.mode = item.value
    // },
    addDataOption() {
      this.setting.dataOption.push({
        type: '',
        name: '',
        key: ''
      })
    },
    delDataOption(index) {
      this.setting.dataOption.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-mode {
  display: flex;
  .mode-item {
    margin-left: 15px;
    font-size: 14px;
    color: #666;
    text-align: center;
    &.active {
      color: #008dfc;
    }
    &:first-child {
      margin-left: 0;
    }
    &:hover {
      color: #008dfc;
    }
  }
}
h3 {
  // padding-left: 15px;
  font-size: 16px;
  color: #666;
  font-weight: 400;
  margin: 5px 0;
}
h4 {
  font-size: 14px;
  color: #666;
  font-weight: 400;
  margin: 5px 0;
}
.section-box {
  padding-left: 15px;
}
.line {
  display: flex;
  align-items: center;
  // min-height: 20px;
  padding: 5px 0;
}
.line__label {
  width: 100px;
  font-size: 14px;
  color: #666;
  flex-shrink: 0;
}
.line__value {
  flex-grow: 1;
}
.line__value--flex {
  display: flex;
  align-items: center;
}
.data-option {
  position: relative;
  margin-top: 10px;
  padding: 0 15px;
  background-color: #f7f7f7;
}
.data-option__del {
  position: absolute;
  top: -5px;
  right: -7px;
  font-size: 20px;
  color: #999;
}
</style>