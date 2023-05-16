export default {
    __config__:{
      "type":"page-quesList",
      "label":"问答列表",
      "hasTitleSetting": true,
      "style":{},
      "title":{
        "show": true,
        "value": "最新问答",
        "more": "更多",
        "onClick": {
          "type": "question",
          "action": ""
        }
      },
      "itemId": "",
      "dataList": [], // 手动添加数据保存
      "props":[
        {
          name: "显示个数",
          key: "count",
          type: "radioGroup",
          options:[{label:'3个',value:3},{label:'4个',value:4},{label:'5个',value:5},{label:'6个',value:6}],
          default:4
        },
        {
          name: "数据来源",
          key: "itemId",
          type: "changeItem",
          callback(comp) {
            if (comp.showParams != 'custom') {
              if (!comp.title.onClick || comp.title.onClick.type == 'question') {
                comp.title.onClick = {
                  type: "question",
                  action: comp.itemId
                }
              }
              
            }
          }
        },
        {
          name: "",
          key: "showParams",
          type: "showParams",
          options: [{
            label: '最新问答',
            des: '展示最新创建的问答',
            value: 'new'
          }, {
            label: '热门问答',
            des: '展示浏览次数最多的问答',
            value: 'hot'
          }],
          default:"new",
          dataType: "question",
          callback(comp) {
            if (comp.showParams == 'custom') {
              comp.title.value = '手动添加'
              comp.title.more = ''
              comp.title.onClick = {
                type: "none",
                action: null
              }
            } else {
              let title = ''
              switch(comp.showParams) {
                case 'new':
                  title = '最新问答'
                  break
                case 'hot':
                  title = '热门问答'
                  break
                case 'star':
                  title = '星标问答'
                  break
              }
              comp.title.value = title
              comp.title.more = '更多'
              comp.title.onClick = {
                type: "question",
                action: comp.itemId
              }
            }
          }
        }
      ]
    },
}