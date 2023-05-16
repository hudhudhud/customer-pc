<template>
  <div>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="940px"
    >
      <div class="content-box">
        <div class="left-box">
          <h3>绘制热区</h3>
          <div class="hot-area-wrap" ref="scroll">
            <img :src="img" ref="img" />
            <div class="area-box">
              <div class="hot-area"
                v-for="(item, index) of areaList"
                :key="index"
                :style="{top: item.top + 'px', left: item.left + 'px',width: item.width + 'px', height: item.height + 'px'}"
                @mousedown="handleMousedown($event, 'position', index)"
              >
                <template v-if="currentIndex == index">
                  <span class="hot-area__top-left" @mousedown.stop="handleMousedown($event, 'top-left')"></span>
                  <span class="hot-area__top" @mousedown.stop="handleMousedown($event, 'top')"></span>
                  <span class="hot-area__top-right" @mousedown.stop="handleMousedown($event, 'top-right')"></span>
                  <span class="hot-area__right" @mousedown.stop="handleMousedown($event, 'right')"></span>
                  <span class="hot-area__bottom-right" @mousedown.stop="handleMousedown($event, 'bottom-right')"></span>
                  <span class="hot-area__bottom" @mousedown.stop="handleMousedown($event, 'bottom')"></span>
                  <span class="hot-area__bottom-left" @mousedown.stop="handleMousedown($event, 'bottom-left')"></span>
                  <span class="hot-area__left" @mousedown.stop="handleMousedown($event, 'left')"></span>
                </template>
                

                <div class="hot-area__content" >
                  <div class="hot-area__index">{{index + 1}}</div>
                </div>
                
              </div>
            </div>
          </div>
          
        </div>
        <div class="right-box">
          <el-button type="primary" icon="el-icon-plus" style="width: 240px;" @click="add">添加热区</el-button>
          <div class="list-box">
            <div v-for="(item, index) of areaList" :key="index" class="link-box">
              <div class="link-title">
                <span>热区{{index + 1}}</span>
                <!-- <span class="del-btn">删除</span> -->
              </div>
              <ActionEditor v-model="item.onClick" label="点击事件" size="small" />
              <i class="el-icon-error link-del" @click="del(index)"></i>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ActionEditor from './ActionEditor.vue'
let clickStart = null
let eventType = ''
export default {
  props: ["value", "img", "areas"],
  components: { ActionEditor },
  data() {
    return {
      dialogVisible: false,
      areaList: [],
      top: 100,
      left: 100,
      width: 80,
      height: 80,
      imgWidth: 600,
      imgHeight: 400,
      currentIndex: -1,
      current: {}
    }
  },
  watch: {
    value :{
      handler(val) {
        this.dialogVisible = val
        if (val) {
          this.$nextTick(() => {
            if (this.$refs.img) {
              this.imgWidth = this.$refs.img.offsetWidth
              this.imgHeight = this.$refs.img.offsetHeight
              this.initData()
            }
          })
        }
      },
      immediate:true
    },
    dialogVisible(val) {
      this.$emit('input', val)
      if (!val) {
        this.areaList = []
      }
    },
  },
  mounted() {
    document.body.addEventListener('mousemove', this.handleMousemove)
    document.body.addEventListener('mouseup', this.handleMouseup)
  },
  destroyed() {
    document.body.removeEventListener('mousemove', this.handleMousemove)
    document.body.removeEventListener('mouseup', this.handleMouseup)
  },
  methods: {
    initData() {
      if (this.areas && this.areas.length > 0) {
        this.areaList = this.areas.map((item) => {
          const { width, height, top, left, onClick } = item
          return {
            width: width/100 * this.imgWidth,
            height: height/100 * this.imgHeight,
            top: top/100 * this.imgHeight,
            left: left/100 * this.imgWidth,
            onClick
          }
        })
      }
    },
    add() {
      const obj = {
        top: 160 + this.$refs.scroll.scrollTop,
        left: 260,
        width: 80,
        height: 80,
        onClick: {
          type: 'none',
          action: ''
        }
      }

      this.currentIndex = this.areaList.length
      this.areaList.push(obj)
      this.current = obj
    },
    del(index) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.areaList.splice(index, 1)
      })
    },
    handleMousedown(e, type, index) {
      // 非鼠标左键
      if (e.button !== 0) return
      if (index !== undefined) {
        this.currentIndex = index
        this.current = this.areaList[index]
      }
      this.imgWidth = this.$refs.img.offsetWidth
      this.imgHeight = this.$refs.img.offsetHeight
      clickStart = {
        x: e.screenX,
        y: e.screenY
      }
      eventType = type
    },
    handleMousemove(e) {
      if (!clickStart) return
      // 无按键按下 或者 非鼠标左键按下
      if (!e.buttons || e.button !== 0) {
        this.handleMouseup()
        return
      }
      if (eventType == 'position') {
        this.setPosition(e.screenX, e.screenY)
      } else {
        this.setSize(e.screenX, e.screenY)
      }
      
      clickStart = {
        x: e.screenX,
        y: e.screenY
      }
    },
    handleMouseup() {
      clickStart = null
      eventType = ''
    },
    // 改变位置
    setPosition(x, y) {
      if (y) {
        this.current.top += y - clickStart.y
      }
      if (x) {
        this.current.left += x - clickStart.x
      }
      
      if (this.current.left + this.current.width > this.imgWidth) {
        this.current.left = this.imgWidth - this.current.width
      }
      else if (this.current.left < 0) {
        this.current.left = 0
      }
      if (this.current.top + this.current.height > this.imgHeight) {
        this.current.top = this.imgHeight - this.current.height
      }
      else if(this.current.top < 0) {
        this.current.top = 0
      }
    },
    // 改变尺寸
    setSize(x, y) {
      if (!clickStart) return
      let { width, height, top, left } = this.current
      let maxWidth = width + left
      let maxHeight = height + top
      const keys = eventType.split('-')
      keys.forEach((key) => {
        switch(key) {
          case 'top':
            height += clickStart.y - y
            if (height > maxHeight) {
              height = maxHeight
            }
            top += y - clickStart.y
            if (top > top + height - 20) {
              top = top + height - 20
            }
            if (top < 0) {
              top = 0
            }
            break
          case 'right':
            width += x - clickStart.x
            if (left + width > this.imgWidth) {
              width = this.imgWidth - left
            }
            break
          case 'bottom':
            height += y - clickStart.y
            if (top + height > this.imgHeight) {
              height = this.imgHeight - top
            }
            break
          case 'left':
            width += clickStart.x - x
            if (width > maxWidth) {
              width = maxWidth
            }
            left += x - clickStart.x
            if (left > left + width - 20) {
              left = left + width - 20
            }
            if (left < 0) {
              left = 0
            }
            break
        }
        if (width < 20) {
          width = 20
        }
        if (height < 20) {
          height = 20
        }
        // this.current={width,height,top,left}
        this.current.width = width
        this.current.height = height
        this.current.top = top
        this.current.left = left
      })
    },
    submit() {
      const list = this.areaList.map((item) => {
        const { width, height, top, left, onClick } = item
        return {
          width: width/this.imgWidth * 100,
          height: height/this.imgHeight * 100,
          top: top/this.imgHeight * 100,
          left: left/this.imgWidth * 100,
          onClick,
        }
      })
      this.$emit('confirm', list)
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="stylus" scoped>
*:not(input, textarea) {
    user-select: none;
}
*:focus:not(input, textarea) {
  user-select: none;
}
/deep/.el-dialog__header {
  display: none;
}
/deep/.el-dialog__body {
  padding: 0;
}
/deep/.el-dialog__footer {
  //box-shadow: 0 0 8px 0 rgba(0, 0, 0, 1);
}
.content-box {
  display: flex;
  border-bottom: 1px solid #eee;
}
.left-box {
  width: 600px;
  padding: 15px 25px 25px 25px;
  background-color: #fafafa;
  border-right: 1px solid #d8dee6;
  h3 {
    margin: 0 0 20px 0;
    font-size: 18px;
    font-weight: 400;
    color: #333;
  }
}
.hot-area-wrap {
  position: relative;
  width: 600px;
  max-height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  img {
    display: block;
    width: 100%;
    height: auto;
    user-select: none;
    pointer-events: none;
  }
}
.area-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.hot-area {
  position: absolute;
  top: 80px;
  left: 80px;
  width: 100px;
  height: 100px;
  min-width: 20px;
  min-height: 20px;
  // border: 1px solid #fff;
  // background-color: rgba(255, 128, 0, 0.5);
  // cursor: move;

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    border: 1px solid #fff;
    background-color: rgba(255, 128, 0, 0.5);
    box-shadow: 0 0 2px 0 rgb(0 0 0 / 40%);
    cursor: move;
  }

  .hot-area__content {
    width: 100%;
    height: 100%;
  }

  .hot-area__index {
    width: 18px;
    height: 18px;
    position: absolute;
    left: -9px;
    top: -9px;
    border-radius: 9px;
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    color: #ff8000;
    background: #fff;
    box-shadow: 0 0 2px 0 rgb(0 0 0 / 40%);
    text-align: center;
    pointer-events: none;
    z-index: 11;
    user-select: none;
  }

  span {
    position: absolute;
    box-sizing: border-box;
    width: 6px;
    height: 6px;
    background-color: #fff;
    border: 1px solid #6c6c6c;
    box-shadow: 0 0 2px #bbb;
  }

  .hot-area__top {
    top: -3px;
    left: calc(50% - 3px);
    cursor: ns-resize;
  }
  .hot-area__right {
    right: -3px;
    top: calc(50% - 3px);
    cursor: ew-resize;
  }
  .hot-area__bottom {
    bottom: -3px;
    left: calc(50% - 3px);
    cursor: ns-resize;
  }
  .hot-area__left {
    left: -3px;
    top: calc(50% - 3px);
    cursor: ew-resize;
  }
  .hot-area__top-left {
    top: -3px;
    left: -3px;
    cursor: nwse-resize;
  }
  .hot-area__top-right {
    top: -3px;
    right: -3px;
    cursor: nesw-resize;
  }
  .hot-area__bottom-left {
    bottom: -3px;
    left: -3px;
    cursor: nesw-resize;
  }
  .hot-area__bottom-right {
    bottom: -3px;
    right: -3px;
    cursor: nwse-resize;
  }
}
.right-box {
  position: relative;
  width: 260px;
  padding-left: 25px;
  padding-top: 20px;
  padding-right: 25px;
  

  .list-box {
    // position: absolute;
    // top: 72px;
    // left: 25px;
    width: 260px;
    height: 420px;
    // margin-top: 12px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
.link-box {
  position: relative;
  width: 240px;
  box-sizing: border-box;
  padding: 12px;
  margin-top: 12px;
  background-color: #f5f7fa;
  // &:first-child {
  //   margin-top: 0;
  // }
  &:hover .link-del {
    display: block;
  }
  .link-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #333;
    line-height: 1;
    margin-bottom: 10px;
  }
  .del-btn {
    font-size: 14px;
    color: #f25555;
  }
  .link-del {
    display: none;
    position: absolute;
    top: -8px;
    right: -8px;
    color: #a7bad7;
    font-size: 22px;
  }
}
::-webkit-scrollbar-thumb {
  /*    滚动条里面的小方块      */
  border-radius: 8px;
  box-shadow: inset 0 0 5px #00000044;
  background: #f7f7f7;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  // box-shadow: inset 0 0 5px #00000044;
  border-radius: 0;
  background: #fff;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
</style>