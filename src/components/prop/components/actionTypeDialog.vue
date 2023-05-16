<template>
  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    destroy-on-close
    width="800px"
  >
    <div style="height: 500px;display:flex;">
      <div style="width:65%;">
        <el-tree v-if="dialogVisible"
          :props="props"
          :load="loadNode"
          lazy
          :expand-on-click-node="false"
          >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
              <div class="check-box-checked" v-if="checked && checked.id == data.id" @click="onChange(false,data)"></div>
              <div class="check-box" v-else @click="onChange(true, data)"></div>
          </span>
        </el-tree> 
      </div>
      <div style="width:35%;height:100%;margin-left:15px;background-color: #f7f7f7;padding:15px;">
        <div>已选择：</div>
        <div class="change-item" v-if="checked">{{checked.name}}<i class="el-icon-error" @click="checked=null" /></div>
      </div>
    </div>
    
    
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" :disabled="!checked" @click="onConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { ARTICLE_TYPE, QUESTION_TYPE, VIDEO_TYPE } from '../../../api/index'
import Request from '@/utils/request'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'article'
    },
    itemId: '',
    chckedItem: ''
  },
  data() {
    return {
      dialogVisible: false,
      props: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      },
      checked: null,
      treeData: []
    }
  },
  computed: {
    url() {
      if (this.type == 'article') {
        return ARTICLE_TYPE
      }
      if (this.type == 'question') {
        return QUESTION_TYPE
      }
      if (this.type =='video') {
        return VIDEO_TYPE
      }
      return ''
    }
  },
  watch: {
    value: {
      handler(v) {
        this.dialogVisible = v
      },
      immediate: true
    },
    dialogVisible: {
      handler(v) {
        this.$emit('input', v)
      }
    },
    chckedItem: {
      handler(v) {
        if (v) {
          this.checked = {
            id: v.typeId,
            name: v.typeName
          }
        } else {
          this.checked = null
        }
        
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onChange(v, data) {
      if (v) {
        this.checked = {
          id: data.id,
          name: data.name
        }
      } else {
        this.checked = null
      }
    },
    loadNode(node, resolve) {
      console.log(node)
      let parentId = ''
      if (node.level > 0) {
        parentId = node.data.id
      }
      Request.auth_post(this.url, {
        itemId: this.itemId,
        parentId,
      }).then(res => {
        if (res.errcode === 0) {
          resolve(res.data.map(item => {
            item.leaf = item.childrenNum == 0
            item.children = []
            return item
          }))
        } else {
          resolve([])
        }
      }).catch(() => {
        resolve([])
      })
    },
    onConfirm() {
      this.$emit('confirm', this.checked)
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.custom-tree-node {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 5px;
}
.change-item {
  width: 100%;
  height: 30px;
  padding: 0 5px;
  border-radius: 2px;
  line-height: 30px;
  margin-top: 10px;
  margin-left: -5px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  i {
    color: #999;
    display: none;
  }

  &:hover {
    background-color: #eee;

    i {
      display: block;
    }
  }
}
.check-box-checked {
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  background-size: 100% 100%;
  background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyQzQwMDFERUE2Q0ExMUVEODUzOUFFRDM0NDIzNzU1QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyQzQwMDFERkE2Q0ExMUVEODUzOUFFRDM0NDIzNzU1QyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJDNDAwMURDQTZDQTExRUQ4NTM5QUVEMzQ0MjM3NTVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJDNDAwMUREQTZDQTExRUQ4NTM5QUVEMzQ0MjM3NTVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+O5AFfwAAASJJREFUeNpilOr6xUAJYILSrEDcDMSvgPg/AfwciIuBmBGkkQVqQBcQFxBpqQQQ9wAxM0gfzAUpZLg+DeYFfiDmIaSamRFDSAQ5DPACS1lGhvNZrAxxBkw4AxEnUBBkZJjpx8LABvTxqaf/8RsgzsPIEKCJEOJlZ2CY68/MwAekkzf8YbjxGtMAFmROshETQ4YZEwMT0L8br/9jmOrDwqAuysiQt/Uvw9FH//GmAzBYeOEfw5OP/xkmeDEzLA1lYXBWYmToOPSXYd21fwQTEhg8/fSfIXTlX7AhtvKMDMsu/WOYcvIfUSkRw5CVl/8xVO35SzCGGKF54TMxaQEN3AViFZgL5pCREmchx0IZEH8B4kwgFiag8QU0L/Qhe4FsABBgACXxUtBJCd8ZAAAAAElFTkSuQmCC');
}
.check-box {
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  background-size: 100% 100%;
  background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozMTkyMThGRkE2Q0ExMUVEOTc2RUNCODQ4NUVBNjRFOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozMTkyMTkwMEE2Q0ExMUVEOTc2RUNCODQ4NUVBNjRFOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjMxOTIxOEZEQTZDQTExRUQ5NzZFQ0I4NDg1RUE2NEU4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMxOTIxOEZFQTZDQTExRUQ5NzZFQ0I4NDg1RUE2NEU4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5AiwRwAAALlJREFUeNrsU0EKwjAQTENyEzyoH8jnxA/06AtE7+LTTA4lBCG5iIWGtHTdLSreGsjFgwOzmxxmmIXdCgBYCQQVY4zEtkdukZsZzQ15QB6VUsAogdb65JyDvu9hDiklsNYCauop/cvgkSN+I8ZIBlfScoy/5JwvhBDZc0tJE7M1Fc4K8Tf4CQNcx/s4ju0wDNkiXDpq4TvBxXvPckxIHMKkPX+OCVF3Xdc2TbPD9yr3mOhTlZ7zU4ABAMIoqhhWO/FnAAAAAElFTkSuQmCC');
}
</style>