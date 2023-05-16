<template>
  <div>
    <h3>选择模式</h3>
    <div class="list-mode">
      <div v-for="(item, index) of propDef.options" :key="index" class="mode-item" :class="{'active': val == item.value}" @click="onChangeMode(item)">
        <div class="mode-icon">
          <span :class="['mode-icon--'+item.icon]"></span>
        </div>
        {{item.label}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["value", "propDef"],
  data() {
    return {
      modeList: [{
        label: '基础列表',
        value: 'list',
        class: 'mode-icon--list'
      },{
        label: '图文列表',
        value: 'picTxtList',
        class: 'mode-icon--pic'
      },{
        label: '卡片列表',
        value: 'cardList',
        class: 'mode-icon--card'
      }],
      val: ''
    }
  },
  watch: {
    val: {
      handler(val) {
        this.$emit("input", val)
      },
    },
    value :{
      handler(val) {
        this.val = val||this.propDef.options[0].value
      },
      immediate:true
    }
  },
  methods: {
    onChangeMode(item) {
      this.val = item.value
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
.list-mode {
  display: flex;
}
.mode-item {
  margin-left: 15px;
  font-size: 13px;
  color: #666;
  text-align: center;
  &:first-child {
    margin-left: 0;
  }
  &.active {
    color: #008dfc;
    .mode-icon {
      background-color: #f0f8ff;
      border-color: #008dfc;

      .mode-icon--list {
        background-position: 0 -36px;
      }
      .mode-icon--pic {
        background-position: 0 -180px;
      }
      .mode-icon--card {
        background-position: 0 -108px;
      }
      .mode-icon--tile {
        background-position: 0 -252px;
      }
      .mode-icon--hotarea {
        background-position: 0 -324px;
      }
      .mode-icon--top-bottom {
        background-position: 0 -396px;
      }
      .mode-icon--img {
        background-position: 0 -468px;
      }
      .mode-icon--text {
        background-position: 0 -540px;
      }
      .mode-icon--left-right {
        background-position: 0 -612px;
      }
    }
  }
  &:hover {
    color: #008dfc;
    .mode-icon {
      background-color: #f0f8ff;
      border-color: #008dfc;

      .mode-icon--list {
        background-position: 0 -36px;
      }
      .mode-icon--pic {
        background-position: 0 -180px;
      }
      .mode-icon--card {
        background-position: 0 -108px;
      }
      .mode-icon--tile {
        background-position: 0 -252px;
      }
      .mode-icon--hotarea {
        background-position: 0 -324px;
      }
      .mode-icon--top-bottom {
        background-position: 0 -396px;
      }
      .mode-icon--img {
        background-position: 0 -468px;
      }
      .mode-icon--text {
        background-position: 0 -540px;
      }
      .mode-icon--left-right {
        background-position: 0 -612px;
      }
    }
  }
}
.mode-icon {
  width: 58px;
  height: 58px;
  margin-bottom: 5px;
  border: 1px solid #f5f7fa;
  border-radius: 4px;
  background-color: #f5f7fa;

  span {
    display: block;
    width: 36px;
    height: 36px;
    margin: 11px auto;
    background-image: url('../../../assets/css_sprites.png');
  }
  .mode-icon--list {
    background-position: 0 0;
  }
  .mode-icon--pic {
    background-position: 0 -144px;
  }
  .mode-icon--card {
    background-position: 0 -72px;
  }
  .mode-icon--tile {
    background-position: 0 -216px;
  }
  .mode-icon--hotarea {
    background-position: 0 -288px;
  }
  .mode-icon--top-bottom {
    background-position: 0 -360px;
  }
  .mode-icon--img {
    background-position: 0 -432px;
  }
  .mode-icon--text {
    background-position: 0 -504px;
  }
  .mode-icon--left-right {
    background-position: 0 -576px;
  }
}

</style>