export default {
  __config__: {
    type:"page-swiper",
    label:"轮播图",
    hasTitleSetting:false,
    options:[{
      "title":"",
      "src": "",
      "onClick": {
        "type": "none",
        "action": ""
      }
    }, {
      "title":"",
      "src": "",
      "onClick": {
        "type": "none",
        "action": ""
      }
    }, {
      "title":"",
      "src": "",
      "onClick": {
        "type": "none",
        "action": ""
      }
    }],
    autoplay:true,
    delay:3,
    loop:true,
    imgHeight:220,
    style:{},
    props:[
      {
        name: "是否自动播放",
        key: "autoplay",
        type: "boolean",
        default: true
      },
      {
        name: "间隔时间",
        key: "delay",
        type: "slider",
        default: 3,
        unit:'秒',
        min:1,
        max:5,
        showFunc(comp){
          return comp.autoplay
        },
      }, 
      // {
      //   name: "停在最后一个",
      //   key: "stopOnLastSlide",
      //   type: "boolean",
      //   default: false,
      //   showFunc(comp){
      //     return comp.autoplay
      //   },
      // },
      // {
      //   name: "滑动时间",
      //   key: "speed",
      //   type: "slider",
      //   default: 300,
      //   unit:'毫秒',
      //   min:100,
      //   max:1000
      // },
      {
        name: "循环滑动",
        key: "loop",
        type: "boolean",
        default: true,
      },
      {
        name: "图片高度",
        key: "imgHeight",
        type: "size",
        default:300,
        min:1,
      },
      {
        name: "启用传参",
        key: "isSlot",
        type: "boolean",
        topDivider:true,
      },
      {
        name: "列表字段",
        key: "slotKey",
        type: "text",
        showFunc(comp) {
          return comp.isSlot;
        }
      },
      {
        name: "图片字段",
        key: "slotKeyImg",
        type: "text",
        showFunc(comp) {
          return comp.isSlot;
        }
      },{
        name: "标题字段",
        key: "slotKeyTitle",
        type: "text",
        showFunc(comp) {
          return comp.isSlot;
        }
      },
      {
        name: "点击事件",
        key: "onClick",
        type: "action",
        default: {
          type: "none",
          action: null
        },
        showFunc(comp) {
          return comp.isSlot;
        }
      },
      {
        name: "上传图片",
        key: "options",
        type: "imageList",
        default: [],
        showFunc(comp) {
          return !comp.isSlot;
        },
        labelPosition:"top",
        hasTitle:true
      },
      
      // {
      //   name: "属性",
      //   key: "attributes",
      //   type: "attribute",
      //   default: []
      // },
    ]
  }
}