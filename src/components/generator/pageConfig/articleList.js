export default {
    __config__:{
      "type":"page-articleList",
      "label":"文章列表",
      "hasTitleSetting": true,
      "style":{},
      "title":{
        "show": true,
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
              comp.title.onClick = {
                type: "url",
                action: `/article-list/${comp.itemId}?type=${comp.showParams}`
              }
            }
          }
        },
        {
          name: "",
          key: "showParams",
          type: "showParams",
          options: [{
            label: '最新文章',
            des: '展示最新创建的文章',
            value: 'new'
          }, {
            label: '热门文章',
            des: '展示浏览次数最多的文章',
            value: 'hot'
          }, {
            label: '星标文章',
            des: '展示星标文章',
            value: 'star'
          }],
          default:"new",
          dataType: "article",
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
                  title = '最新文章'
                  break
                case 'hot':
                  title = '热门文章'
                  break
                case 'star':
                  title = '星标文章'
                  break
              }
              comp.title.onClick = {
                type: "url",
                action: `/article-list/${comp.itemId}?type=${comp.showParams}`
              }
              comp.title.value = title
              comp.title.more = '更多'
            }
          }
        },
      ]
    },
}