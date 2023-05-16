<template>
  <div>
    <h3>显示数据</h3>
    <div class="option" :class="{action: val == item.value}" v-for="item of propDef.options" :key="item.value">
      <el-radio v-model="val" :label="item.value">
        <div class="option__right">
          <div class="option__title">{{item.label}}</div>
          <div class="option__des">{{item.des}}</div>
        </div>
      </el-radio>
    </div>
    <div class="option" :class="{action: val == 'custom'}">
      <el-radio v-model="val" label="custom">
        <div class="option__right">
          <div class="option__title">手动添加</div>
          <template v-if="compConfig.dataList.length > 0">
            <div style="line-height: 26px;font-size:13px;color:#999;margin-top:8px;">已选数据：</div>
            <div style="margin-left:-10px;">
              <draggable 
                :list="compConfig.dataList"
                :animation="340"
                group="selectItems"
                handle=".option-drag">
                <div class="data-item" v-for="(item, index) of compConfig.dataList" :key="index">
                  <!-- <i class="option-drag el-icon-s-operation" /> -->
                  <i class="option-drag fa fa-bars" />
                  <div class="data-item-title">{{item[titleColumn[propDef.dataType]]}}</div>
                  <i class="del-btn el-icon-error" @click="onDelData(index)" />
                </div>
              </draggable>
            </div>
          </template>
          <div class="option__des"><span class="option__btn" @click="onShowDialog">选择{{btnText[propDef.dataType]}}</span></div>
        </div>
      </el-radio>
    </div>

    <CustomDialog v-model="show" :itemId="compConfig.itemId" :items="compConfig.dataList" :type="propDef.dataType" @confirm="add" :titleColumn="titleColumn[propDef.dataType]"/>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import CustomDialog from './customDialog.vue'
export default {
  components: {draggable, CustomDialog},
  props: ["value", "propDef", "compConfig"],
  // model: {
  //   prop: 'value',
  //   event: 'abc'
  // },
  data() {
    return {
      val: this.value,
      show: false,
      btnText: {
        article: '文章',
        question: '问答',
        video: '视频'
      },
      titleColumn:{
        article:'noticeTitle',
        video:'name',
        question: 'content',
      }
    }
  },
  watch: {
    val (val) {
      this.$emit("input", val)
    },
    value:{
      handler(val) {
        this.val = val || this.propDef.default
      },
      immediate:true,
    }
  },
  methods: {
    onShowDialog() {
      if (!this.compConfig.itemId) {
        this.$message.error({ message:'请选择数据来源', duration:2000 });
        return
      }
      this.show = true
    },
    add(list) {
      this.compConfig.dataList = list
    },
    onDelData(index) {
      this.compConfig.dataList.splice(index, 1)
    }
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
.option {
  // display: flex;
  margin-top: 10px;
  padding: 12px 10px;
  border-radius: 4px;
  background-color: #fafafa;

  &.action {
    background: #fff;
    outline: 1px solid #008dfc;
  }

  /deep/.el-radio {
    display: flex;
  }
}
.option__right {
  flex-grow: 1;
}
.option__title {
  font-size: 14px;
  color: #333;
}
.option__des {
  margin-top: 10px;
  font-size: 12px;
  color: #999;
}
.option__btn {
  color: #008dfc;
}

.data-item {
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  border-radius: 4px;

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
    width: 310px;
    color: #596c80;
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
</style>