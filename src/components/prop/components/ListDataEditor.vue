<template>
  <div>
    <h3>数据源</h3>
    <div class="section-box">
      <!-- <el-radio-group v-model="compConfig.jsGetOptions" size="mini" @change="onChangeDataType">
        <el-radio-button :label="true">动态绑定</el-radio-button>
        <el-radio-button :label="false">手动添加</el-radio-button>
      </el-radio-group>
      <div v-if="compConfig.jsGetOptions">
        <div class="line">
          <div class="line__label">函数名称</div>
          <div class="line__value"><el-input v-model="dataList" size="small" /></div>
        </div>
        <div class="line">
          <div class="line__label">点击回调</div>
          <div class="line__value"><el-input v-model="compConfig.listClick" size="small" /></div>
        </div>
      </div> -->
      <div class="data-list">
        <draggable 
          :list="dataList"
          :animation="340"
          group="selectItem"
          handle=".option-drag">
          <div class="data-item" v-for="(item, index) of dataList" :key="index">
            <!-- <i class="option-drag el-icon-s-operation" /> -->
            <i class="option-drag fa fa-bars" />
            <div class="data-item-title">{{item[modeSetting.titleKey]}}</div>
            <span class="edit-btn" @click="onEditData(item, index)"><van-icon name="edit" /></span>
            <van-icon class="del-btn" name="clear" @click="onDelData(index)" />
          </div>
        </draggable>
        <el-button type="text" icon="el-icon-plus" size="mini" style="margin-top: 10px;margin-left: 115px;" @click="add">添加数据</el-button>
      </div>
      
    </div>


    <el-dialog
      title="添加数据"
      :visible.sync="dialogVisible"
      width="800">
      <div class="add-data-warp">
        <div class="add-data-form">
          <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
            <el-form-item v-for="item of formList" :key="item.value" :label="item.label ? item.label : item.value" :prop="item.value">
              <el-input type="textarea" v-model="formData[item.value]" placeholder="请输入" v-if="item.label == '摘要'"></el-input>
              <div v-else-if="item.label == '点击事件'" style="width: 300px;">
              <ActionEditor v-model="formData[item.value]"/>
              </div>
              <el-input type="text" v-model="formData[item.value]" placeholder="请输入" v-else></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="img-box" v-if="compConfig.mode !== 'list'">
          <template v-if="formData.img">
            <img :src="formData.img"  />
            <div class="img-mb" @click="editImg = formData.img;showCropper = true">
              <i class="el-icon-close" @click.stop="onDelImg"></i>
              <span>编辑</span>
            </div>
          </template>
          
          <div v-else class="no-img" @click="editImg = '';showCropper = true"><i class="el-icon-plus"></i>上传图片</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>

    <CropperDialog v-model="showCropper" :isUpload="true" :img="editImg" @success="hanldeImg" />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import CropperDialog from './cropperDialog.vue'
import ActionEditor from './ActionEditor.vue'
import {Icon} from 'vant'
export default {
  components: {
    draggable,
    CropperDialog,
    ActionEditor,
    [Icon.name]: Icon
  },
  props: ["value", "propDef", "compConfig"],
  data() {
    return {
      dataType: 'manual',
      dataList: [],
      modeSetting: {},
      dialogVisible: false,
      dialogTitle: '添加数据',
      editIndex: -1,
      dataObj: {},
      formData: {},
      formList: [],
      rules: {},
      showCropper: false,
      list: [],
      editImg: ''
    }
  },
  watch: {
    dataList: {
      handler(val) {
        this.$emit("input", val)
      },
      deep: true
    },
    value :{
      handler(val) {
        this.dataList = val||this.propDef.default
      },
      immediate:true
    },
    compConfig: {
      handler(config) {
        this.modeSetting = config.modeSetting
        this.initFormData(config.modeSetting)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // onChangeDataType() {
    //   if (this.compConfig.jsGetOptions) {
    //     this.list = this.dataList
    //     this.dataList = ''
    //   } else {
    //     this.dataList = this.list
    //   }
    // },
    initFormData(modeSetting) {
      let formList = [{
        label: "标题",
        value: modeSetting.titleKey
      }]
      modeSetting.dataOption.forEach((item) => {
        let formItem = null
        if (item.type == 'info') {
          formItem = { label: item.name, value: item.key}
        } else if (item.type == 'abstract') {
          formItem = { label: '摘要', value: item.key}
        }
        if (formItem) {
          formList.push(formItem)
        }
      })
      formList.push({
        label: '点击事件',
        value: 'onClick'
      })
      this.formList = formList
      this.rules[modeSetting.titleKey] = [{ required: true, message: '请输入标题', trigger: 'blur' }]
    },
    createFormData() {
      const obj = {
        img: '',
        onClick: {
          type: 'none',
          action: ''
        }
      }
      obj[this.modeSetting.titleKey] = ''
      this.modeSetting.dataOption.forEach((item) => {
        if (item.type) {
          obj[item.key] = ''
        }
      })
      this.formData = obj
    },
    add() {
      this.editIndex = -1
      this.createFormData()
      this.dialogTitle = '添加数据'
      this.dialogVisible = true
    },
    onEditData(item, index) {
      this.formData = JSON.parse(JSON.stringify(item))
      this.editIndex = index
      this.dialogTitle = '编辑数据'
      this.dialogVisible = true
    },
    onDelData(index) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dataList.splice(index, 1)
      }).catch(() => {          
      });
    },
    onDelImg() {
      this.$confirm('确定删除图片吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formData.img = ''
      })
    },
    hanldeImg(e) {
      this.showCropper = false
      this.formData.img = e
    },
    submitForm(formName = 'form') {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.editIndex < 0) {
            this.dataList.push(this.formData)
          } else {
            // this.dataList[this.editIndex] = {...this.dataList[this.editIndex],...this.formData}
            this.dataList = this.dataList.map((item,index) => {
              if (index == this.editIndex) {
                return this.formData
              }
              return item
            })
          }
          
          this.dialogVisible = false
        }
      });
    },
  }
}
</script>

<style lang="stylus" scoped>
h3 {
  font-size: 16px;
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
  display: flex;
  align-items: center;
}
.data-list {
  margin-top: 15px;
}
.data-item {
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  border-radius: 4px;
  // background-color: #f7f7f7;

  &:hover {
    background-color: #f5f7fa;
    .edit-btn {
      display: flex;
    }
    .del-btn {
      display: block;
    }
  }

  .data-item-title {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 200px;
  }

  .option-drag {
    margin-right: 5px;
    color: #999;
  }

  .edit-btn {
    display: none;
    //display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #008DFC;
    color: #fff;
    font-size: 12px;
    margin-right: 5px;
    margin-left: 5px;
  }

  .del-btn {
    display: none;
    font-size: 20px;
    color: #999;
  }
}
.add-data-warp {
  display: flex;
}
.add-data-form {
  flex-grow: 1;
}
.img-box {
  position: relative;
  width: 158px;
  height: 88px;
  border: 1px solid #eee;
  margin-left: 30px;

  &:hover .img-mb {
    display: block;
  }

  .img-mb {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.3);

    font-size: 12px;
    color: #fff;
    line-height: 88px;
    text-align: center;

    i {
      position: absolute;
      top: 0;
      right: 0;
      background-color: #000;
      color: #fff;
    }
  }

  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }

  .no-img {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: #008dfc;
    font-size:12px;
    line-height: 24px;

    i {
      font-size: 20px;
    }
  }
}
</style>