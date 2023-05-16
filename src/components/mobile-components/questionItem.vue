<template>
  <div class="question-box">
    <div class="question__top">
      <img class="question__user-avatar" :src="item.avatar" />
      <div>
        <div class="question__user-name">{{item.username}} {{item.userId}}</div>
        <div class="question__time">{{item.createTime}}</div>
      </div>
    </div>
    <div class="question__content">
      <span class="invate" v-for="(name, index) of item.inviteNames" :key="index">@{{name}}</span>
      {{item.content}}
    </div>
    <div class="question__imgs">
      <template v-for="(v, index) of item.files" >
        <div class="question__img-wrap" :key="index" v-if="index < 5" @click.stop="onPreview(v)">
          <div class="question__img" :style="{'background-image': 'url('+v.url+')'}"></div>
          <div class="question__more-img" v-if="index == 4 && item.moreNum > 0">+{{item.moreNum}}</div>
        </div>
      </template>
      
    </div>
    <div style="overflow: hidden;">
      <div class="question__type" style="margin-right: 10px;">
        <img src="@/assets/type.png" />
        {{item.typeName}}
      </div>
    </div>
    <div style="overflow: hidden;">
      <div class="question__tag" v-for="tag of item.tags" :key="tag.id">
        <img src="@/assets/tag.png" />
        {{tag.tagName}}
      </div>
    </div>
    <!-- <span class="question__num">浏览次数 {{item.viewTimes}}</span> -->
    <!-- <div class="question__bottom">
      <div class="question__btn"><i class="fa fa-share-square-o"></i>&nbsp;{{item.shareTimes ? item.shareTimes : '转发'}}</div>
      <div class="question__btn"><i class="fa fa-eye"></i>&nbsp;{{item.viewTimes ? item.viewTimes : '浏览'}}</div>
      <div class="question__btn"><i class="fa fa-commenting-o"></i>&nbsp;{{item.answerNum ? item.answerNum : '评论'}}</div>
      <div class="question__btn">
        <i class="fa fa-star-o"></i>
        &nbsp;{{item.collectTimes || '收藏'}}
      </div>
      <div class="question__btn" >
        <i class="fa fa-thumbs-o-up"></i>
        &nbsp;{{item.approveTimes || '点赞'}}
      </div>
    </div> -->
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
.question-box {
  position: relative;
  padding: 15px;
  background-color: #fff;
  overflow: hidden;

  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
}
.question__top {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .question__user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 15px;
  }
  .question__user-name {
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: #333;
  }
  .question__time {
    font-size: 13px;
    line-height: 20px;
    color: #999;
  }
}
.question__type, .question__tag {
  float left
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 22px;
  border-radius: 14px;
  margin-bottom: 10px;
  font-size: 12px;
  color: #333;
  line-height: 22px;
  background-color: #f1f1f1;

  img {
    width: 14px;
    height: 14px;
    margin-right: 5px;
  }
}
.question__content {
  font-size: 15px;
  line-height: 25px;
  color: #333;

  margin-bottom: 10px;

  .invate {
    font-size: 14px;
    color: #108ee9;
    line-height: 25px;
  }
}
.question__imgs {
  display: flex;
  flex-flow: wrap;
  // margin-bottom: 10px;
  .question__img-wrap {
    position: relative;
    width: calc(20% - 8px);
    margin-right: 10px;
    margin-bottom: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  .question__img {
    width: 100%;
    padding-bottom: 100%;
    background-size: 100% 100%;
  }
  .question__more-img {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #000;
    font-size: 14px;
    color: #fff;
    opacity: 0.5;
  }
}
.question__num {
  font-size: 14px;
  color: #999;
}
.question__bottom {
  display: flex;
  justify-content: space-around;
  padding-top: 15px;

  .question__btn {
    font-size: 15px;
    color: #999;

    .action {
      color: #108ee9;
    }
  }
}
</style>