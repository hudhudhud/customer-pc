export default {
    __config__:{
      "type":"page-favorList",
      "label":"我的收藏",
      "hasTitleSetting": true,
      "title": {
        "show": true,
        "value": "我的收藏",
        "more": "更多",
        "onClick": {
          "type": "collect",
          "action": "",
          "extend": {
            dataType: ['article', 'video', 'question'],
          }
        },
        "showBorder": true
      },
      "style": {},
      "props":[
        {
          name: "显示数据",
          key: "showList",
          type: "switch",
          default:false,
        },
        {
          name: "显示个数",
          key: "count",
          type: "radioGroup",
          options:[{label:'3个',value:3},{label:'4个',value:4},{label:'5个',value:5},{label:'6个',value:6}],
          default:4,
          showFunc(comp) {
            return comp.showList
          }
        },
        {
          name: "数据来源",
          key: "itemId",
          type: "changeItem",
          callback(comp) {
            if (comp.itemId) {
              // comp.title.onClick = {
              //   type: "url",
              //   action: "/publicity-collect?itemIds=" + comp.itemId + "&type=" + comp.dataType
              // }
              comp.title.onClick = {
                type: "collect",
                action: comp.itemId,
                extend: {
                  dataType: comp.dataType
                }
              }
            }
          }
        },
        {
          name: "数据类型",
          key: "dataType",
          type: "checkboxGroup",
          options: [{label: '文章', value: 'article'}, {label: '视频', value: 'video'}, {label: '问答', value: 'question'}],
          default: ['article', 'video', 'question'],
          callback(comp) {
            if (comp.itemId) {
              // comp.title.onClick = {
              //   type: "url",
              //   action: "/publicity-collect?itemIds=" + comp.itemId + (Array.isArray(comp.dataType) ? ("&type=" + comp.dataType.join()) : '')
              // }
              comp.title.onClick = {
                type: "collect",
                action: comp.itemId,
                extend: {
                  dataType: comp.dataType
                }
              }
            }
          }
        },
        // {
        //   name: "显示模式",
        //   key: "mode",
        //   type: "radioGroup",
        //   options: [{label: '列表', value: 'list'}, {label: '卡片', value: 'card'}],
        //   default: "list",
        //   showFunc(comp) {
        //     return false
        //   }
        // },
      ]
    },
}