<template>
  <el-dialog
    :title="typeObj[type].title"
    :visible.sync="dialogVisible"
    destroy-on-close
    width="1000px"
  >
    <div slot="title">
      <span>{{typeObj[type].title}}</span><span style="color:red;">（仅栏目可见范围）</span>
    </div>
    <div v-if="dialogVisible" style="overflow:hidden">
      <el-form>
        <el-form-item label="标题">
          <el-input v-model="query[titleColumn]" style="width: 200px;margin-right: 10px;" placeholder="请输入" />
          <el-button type="primary" @click="onSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      
      <el-table :data="selectItems" style="width:280px;float:right;">
        <el-table-column :prop="columnList[0].key" label="已选择"></el-table-column>
        <el-table-column label="" width="38">
          <template slot-scope="scope">
            <i class="el-icon-error" style="font-size: 16px;color: #999;" @click="onDel(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-wrap" style="width: 640px">
        <el-table :data="list" v-loading="loading">
          <el-table-column label="" width="35" prop="id">
            <template slot-scope="scope">
              <div class="check-box-checked" v-if="scope.row.checked" @click="onChange(scope.row)"></div>
              <div class="check-box" v-else @click="onChange(scope.row)"></div>
            </template>
          </el-table-column>
          <el-table-column
            v-for="item of columnList"
            :key="item.key"
            :prop="item.key"
            :label="item.label"
            :width="item.width"
          >
            <template slot-scope="scope">
              <div class="table-td-content" :title="scope.row[item.key]">{{scope.row[item.key]}}</div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          align="center"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="query.pageNum"
          hide-on-single-page
          style="margin-top: 10px;"
          @current-change="getList"
        >
        </el-pagination>
        
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {ARTICLE_LIST,VEDIO_LIST,QUESTION_LIST} from '@/api/index'
import request from '@/utils/request'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    itemId: {
      type: [Number, String],
      default: 0
    },
    items: {
      type: Array,
      default() {
        return []
      }
    },
    type: {
      type: String,
      default: 'article'
    },
    //标题列名
    titleColumn:{
      type: String,
      default: 'noticeTitle'
    }
  },
  data() {
    return {
      dialogVisible: false,
      query: {
        pageNum: 1,
        pageSize: 10,
        [this.titleColumn]: ''
      },
      total: 100,
      list: [{
        id: 1,
        noticeTitle: '标题标题1',
        clickNum: 10,
        createTime: '2022-12-20 12:55:20'
      },{
        id: 2,
        noticeTitle: '标题标题2',
        clickNum: 10,
        createTime: '2022-12-20 12:55:20'
      }],
      selectItems: [],
      loading: false,
      columns: {
        article: [{
          key: 'noticeTitle',
          label: '文章标题'
        }, {
          key: 'clickNum',
          label: '浏览量',
          width: 100
        }, {
          key: 'createTime',
          label: '创建时间',
          width: 200
        }],
        video: [{
          key: 'title',
          label: '视频标题'
        }, {
          key: 'clickNum',
          label: '点击量',
          width: 100
        }, {
          key: 'createTime',
          label: '创建时间',
          width: 200
        }],
        question: [{
          key: 'content',
          label: '问题'
        }, {
          key: 'answerNum',
          label: '回复数量',
          width: 100
        }, {
          key: 'viewTimes',
          label: '浏览量',
          width: 100
        }, {
          key: 'createTime',
          label: '创建时间',
          width: 200
        }],
        video:[{
          key:'name',
          label:'视频标题'
        },{
          key:'playTimes',
          label:'播放量',
          width: 100
        }, {
          key: 'createTime',
          label: '创建时间',
          width: 200
        }]
      },
      typeObj:{
        article:{
          api:ARTICLE_LIST,
          title:'请选择文章',
        },
        video:{
          api:VEDIO_LIST,
          title:'请选择视频'
        },
        question:{
          api:QUESTION_LIST,
          title:'请选择问答'
        }
      }
    }
  },
  computed: {
    tableData() {
      return this.list.map(item => {
        // console.log('a')
        item.checked = false
        
        if (this.selectItems.find(it => it.id == item.id)) {
          item.checked = true
        } else {
          item.checked = false
        }
        console.log('aa',item.checked)
        return item
      })
    },
    columnList() {
      return this.columns[this.type]
    }
  },
  watch: {
    value: {
      handler(v) {
        this.dialogVisible = v
        if (v) {
          this.selectItems = JSON.parse(JSON.stringify(this.items))
          this.query = {
            pageNum: 1,
            pageSize: 10,
            [this.titleColumn]: ''
          }
          this.total = 0
          this.getList()
        }
        
      },
      immediate: true
    },
    dialogVisible(v) {
      this.$emit('input', v)
    },
  },
  methods: {
    onSearch() {
      this.query.pageNum = 1
      this.getList()
    },
    getList() {
      this.loading = true
      request.auth_post(this.typeObj[this.type].api, {
        itemId: this.itemId,
        ...this.query
      }).then(res => {
        this.loading = false
        if (res.errcode === 0) {
          this.list = res.data.list.map(item => {
            if (this.selectItems.find(it => it.id == item.id)) {
              item.checked = true
            } else {
              item.checked = false
            }
            return item
          })
          this.total = Number(res.data.total)
        }
      }).catch(() => {
        this.loading = false
      })
    },
    onChange(row) {
      row.checked = !row.checked
      console.log('change', row.checked)
      if (row.checked) {
        if (this.selectItems.length >= 6) {
          row.checked = false
          this.$message.error({ message:'最多选择6个', duration:2000 });
          return
        }
        this.selectItems.push(row)
      } else {
        this.selectItems = this.selectItems.filter(item => item.id != row.id)
      }
    },
    onDel(row) {
      this.selectItems = this.selectItems.filter(item => item.id != row.id)
      this.list.forEach(item => {
        if (item.id == row.id) {
          item.checked = false
        }
      })
    },
    onConfirm() {
      this.dialogVisible = false
      this.$emit('confirm', this.selectItems)
    }
  }
}
</script>

<style lang="stylus" scoped>
.table-wrap {
  width: 640px;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
}
/deep/.el-table {
  border-top: 1px solid #EBEEF5;
  border-left: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5;
}
/deep/.el-table__empty-block {
  min-height: 40px;
}
/deep/.el-table__empty-text {
  line-height: 48px;
}
/deep/.el-table__header th.el-table__cell {
  background-color: #eef4f8;
}

.table-td-content {
  max-height: 69px;
  overflow: hidden;
  /* 三行显示省略号 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.check-box-checked {
  width: 18px;
  height: 18px;
  background-size: 100% 100%;
  background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyQzQwMDFERUE2Q0ExMUVEODUzOUFFRDM0NDIzNzU1QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyQzQwMDFERkE2Q0ExMUVEODUzOUFFRDM0NDIzNzU1QyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJDNDAwMURDQTZDQTExRUQ4NTM5QUVEMzQ0MjM3NTVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJDNDAwMUREQTZDQTExRUQ4NTM5QUVEMzQ0MjM3NTVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+O5AFfwAAASJJREFUeNpilOr6xUAJYILSrEDcDMSvgPg/AfwciIuBmBGkkQVqQBcQFxBpqQQQ9wAxM0gfzAUpZLg+DeYFfiDmIaSamRFDSAQ5DPACS1lGhvNZrAxxBkw4AxEnUBBkZJjpx8LABvTxqaf/8RsgzsPIEKCJEOJlZ2CY68/MwAekkzf8YbjxGtMAFmROshETQ4YZEwMT0L8br/9jmOrDwqAuysiQt/Uvw9FH//GmAzBYeOEfw5OP/xkmeDEzLA1lYXBWYmToOPSXYd21fwQTEhg8/fSfIXTlX7AhtvKMDMsu/WOYcvIfUSkRw5CVl/8xVO35SzCGGKF54TMxaQEN3AViFZgL5pCREmchx0IZEH8B4kwgFiag8QU0L/Qhe4FsABBgACXxUtBJCd8ZAAAAAElFTkSuQmCC');
}
.check-box {
  width: 18px;
  height: 18px;
  background-size: 100% 100%;
  background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozMTkyMThGRkE2Q0ExMUVEOTc2RUNCODQ4NUVBNjRFOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozMTkyMTkwMEE2Q0ExMUVEOTc2RUNCODQ4NUVBNjRFOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjMxOTIxOEZEQTZDQTExRUQ5NzZFQ0I4NDg1RUE2NEU4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMxOTIxOEZFQTZDQTExRUQ5NzZFQ0I4NDg1RUE2NEU4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5AiwRwAAALlJREFUeNrsU0EKwjAQTENyEzyoH8jnxA/06AtE7+LTTA4lBCG5iIWGtHTdLSreGsjFgwOzmxxmmIXdCgBYCQQVY4zEtkdukZsZzQ15QB6VUsAogdb65JyDvu9hDiklsNYCauop/cvgkSN+I8ZIBlfScoy/5JwvhBDZc0tJE7M1Fc4K8Tf4CQNcx/s4ju0wDNkiXDpq4TvBxXvPckxIHMKkPX+OCVF3Xdc2TbPD9yr3mOhTlZ7zU4ABAMIoqhhWO/FnAAAAAElFTkSuQmCC');
}
</style>