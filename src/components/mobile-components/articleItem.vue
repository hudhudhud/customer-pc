<template>
  <div class="article-box">
    <div class="article-content">
      <div class="article-title">{{item.noticeTitle}}</div>
      <div class="article-info">
        <span>{{item.createTime.split(' ')[0]}}</span>
        <span class="article-num"><img src="@/assets/eye.png" class="icon" /> {{item.clickNum}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.article-box {
  min-height: 40px;
  padding: 17px 0 20px 0;
  border-bottom:1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  .article-title {
    font-size: 15px;
    // font-weight: bold;
    color: #333333;
    line-height: 21px;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp: 2;
    overflow:hidden;
  }
  .article-info {
    margin-top: 8px;
    font-size: 14px;
    color: #999;
  }
  .article-num {
    float: right
  }
  .icon {
    width: 14px;
  }
}
</style>