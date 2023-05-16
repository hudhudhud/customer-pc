export default {
  __config__: {
    "type": "page-datasourceList",
    "label": "列表",
    "mode": "list",
    "style":{},
    "title":{
      show:true,
      value:"标题",
      more:"更多",
      titleIcon:{
        icon:'fa fa-minus',
        color:'#008DFC'
      }
    },
    "hasTitleSetting": true,
    "dataList": [{
      title: "主标题",
      field1: "副标题",
      field2: "副标题2",
      img: "http://s3storage.h3c.com/cephstatic/fe5ed6c63cc84ab6923b2ae4eb8c3f1f.jpg",
      "onClick": {
        "type": "none",
        "action": null
      }
    },
    {
      title: "主标题1",
      field1: "副标题1",
      field2: "副标题21",
      img: "http://fviewer.h3c.com/file/down?appid=istage&fileId=167323380776918568",
      "onClick": {
        "type": "none",
        "action": null
      }
    },
    {
      title: "主标题2",
      field1: "副标题2",
      field2: "副标题22",
      img: "http://mobileproxy.h3c.com:8027/profile/upload/2020/06/04/274921c1637621c5f18863d36ad637d7.png",
      "onClick": {
        "type": "none",
        "action": null
      }
    }],
    "listClick": "", // 动态绑定数据的点击事件函数
    "modeSetting": {
      "mode": "list",
      "label": {
        color: '#999999',
        align: 'right',
        fontSize: 14,
        width: ''
      },
      "content": {
        color: '#333333',
        align: 'left',
        fontSize: 14,
        width: ''
      },
      "abstractColor": '#999999',
      "picWidth": "",
      "picHeight": "",
      "picAlign": "left",
      "showTitle": true,
      "titleKey": 'title',
      "dataOption": [{
        type: 'info',
        name: '标签1',
        key: 'field1'
      },{
        type: 'info',
        name: '标签2',
        key: 'field2'
      }],

    },
    "props": [
      {
        name: "启用传参",
        key: "isSlot",
        type: "boolean"
      },
      {
        name: "传参字段",
        key: "slotKey",
        type: "text",
        showFunc(comp) {
          return comp.isSlot;
        }
      },
      {
        name: "点击函数",
        key: "listClick",
        type: "text",
        showFunc(comp) {
          return comp.isSlot;
        }
      },
      {
        name: "",
        key: "mode",
        type: "mode",
        options: [{
          label: '基础列表',
          value: 'list',
          icon: 'list'
        },{
          label: '图文列表',
          value: 'picTxtList',
          icon: 'pic'
        },{
          label: '卡片列表',
          value: 'cardList',
          icon: 'card'
        }],
      },
      {
        name: "",
        key: "modeSetting",
        type: "listModeSetting",
      },
      // {
      //   name: "",
      //   key: "jsGetData",
      //   type: 'switch'
      // },
      {
        name: "",
        key: "dataList",
        type: 'listData',
        showFunc(comp) {
          return !comp.isSlot;
        }
      }
    ]
  }
}