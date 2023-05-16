<template>
  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    destroy-on-close
    width="1000px"
  >
    <div slot="title">
      <span v-if="typeObj[type]">{{typeObj[type].title}}</span><span style="color:red;" v-if="type == 'articleDetail'">（仅栏目可见范围）</span>
    </div>
    <el-form :inline="true">
      <el-form-item label="栏目">
        <el-select v-model="itemId" @change="onChangeItem">
          <el-option :value="it.id" :label="it.name" v-for="(it,i) of itemList" :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input style="width: 200px;margin-right: 10px;" v-model="searchText" />
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" v-loading="loading">
      <el-table-column label="" width="35">
        <template slot-scope="scope">
          <!-- <el-checkbox :checked="checked && scope.row.id == checked.id" @change="onChange($event,scope.row)"></el-checkbox> -->
          <div class="check-box-checked" v-if="checked && scope.row.id == checked.detailId" @click="onChange(scope.row)"></div>
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
    <div slot="footer" class="dialog-footer">
      <div class="change-item"><span v-if="checked && checked.detailId">已选：{{checked.detailName}}</span></div>
      <div>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onConfirm">确 定</el-button>
      </div>
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
    type: {
      type: String,
      default: 'article'
    },
    checkedItem: {
      type: Object,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      dialogVisible: true,
      itemId: '',
      tableData: [],
      query: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      searchText: '',
      list: [],
      checked: null,
      loading: false,
      columns: {
        articleDetail: [{
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
        videoDetail: [{
          key: 'name',
          label: '视频标题'
        }, {
          key: 'playTimes',
          label: '点击量',
          width: 100
        }, {
          key: 'createTime',
          label: '创建时间',
          width: 200
        }],
        questionDetail: [{
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
      },
      typeObj:{
        articleDetail:{
          api:ARTICLE_LIST,
          title:'请选择文章',
        },
        videoDetail:{
          api:VEDIO_LIST,
          title:'请选择视频'
        },
        questionDetail:{
          api:QUESTION_LIST,
          title:'请选择问答',
        }
      }
    }
  },
  computed: {
    columnList() {
      return this.columns[this.type]
    },
    itemList(){
      return this.$store.state.itemList
    }
  },
  watch: {
    value: {
      handler(v) {
        this.dialogVisible = v
        if (v) {
          this.list = []
          this.query.pageNum = 1
          this.getList()
        }
      },
      immediate: true
    },
    dialogVisible: {
      handler(v) {
        this.$emit('input', v)
      }
    },
    checkedItem: {
      handler(v) {
        this.checked = v
        this.itemId = v ? v.itemId : ''
        if (v && v.itemId) {
          this.getList()
        }
      },
      immediate: true
    }
  },
  methods: {
    onChangeItem() {
      this.query.pageNo = 1
      this.getList()
    },
    onChange(row) {
      if (this.type == 'articleDetail') {
        this.checked = {
          detailId: row.id,
          detailName: row.noticeTitle,
          itemId: row.itemId
        }
      }
      if (this.type == 'videoDetail') {
        this.checked = {
          detailId: row.id,
          detailName: row.name,
          itemId: row.itemId
        }
      }
      if (this.type == 'questionDetail') {
        this.checked = {
          detailId: row.id,
          detailName: row.content,
          itemId: row.itemId
        }
      }
    },
    onSearch() {
      this.list = []
      this.query.pageNum = 1
      this.getList()
    },
    getList() {
      if (this.loading || !this.itemId) return
      this.loading = true
      let data = {
        itemId: this.itemId,
        ...this.query
      }
      data[this.columns[this.type][0].key] = this.searchText
      request.auth_post(this.typeObj[this.type].api, data).then(res => {
        this.loading = false
        if (res.errcode === 0) {
          this.list = res.data.list
          this.total = Number(res.data.total)
        }
      }).catch(() => {
        this.loading = false
      })
    },
    onConfirm() {
      this.dialogVisible = false
      this.$emit('confirm', this.checked)
    }
  }
}
</script>

<style lang="stylus" scoped>
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
.table-td-content {
  max-height: 46px;
  overflow: hidden;
  /* 三行显示省略号 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.dialog-footer {
  display: flex;
  justify-content: space-between;
}
.change-item {
  overflow: hidden;
  width: 500px;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}
</style>