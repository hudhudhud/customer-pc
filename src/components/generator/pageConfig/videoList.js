export default {
    __config__:{
      type:"page-videoList",
      label:"视频列表",
      hasTitleSetting:true,
      title:{
        show:true,
        value:"标题",
        more:"更多",
        titleIcon:{
          icon:'fa fa-minus',
          color:'#008DFC'
        }
      },
      style:{},
      dataList: [], 
      mode:'card',
      props:[
        {
          name: "选择模式",
          key: "mode",
          type: "radioGroup",
          options:[{label:'列表',value:'list'},{label:'卡片',value:'card'}],
          default:'card',
          labelPosition:'top',
          callback(comp) {
            if (comp.showParams !== 'custom') {
              comp.title.onClick = {
                type: "url",
                action: `/video-list/${comp.itemId}?type=${comp.showParams}&title=${comp.title.value}&mode=${comp.mode}`
              }
            }
          }
        },
        {
          name: "显示个数",
          key: "count",
          type: "size",
          default: 3,
          max:6,
          min:3,
        },
        {
          name: "数据来源",
          key: "itemId",
          type: "changeItem",
          callback(comp) {
            if (comp.showParams !== 'custom') {
              comp.title.onClick = {
                type: "url",
                action: `/video-list/${comp.itemId}?type=${comp.showParams}&title=${comp.title.value}&mode=${comp.mode}`
              }
            }
          }
        },
        {
          name: "",
          key: "showParams",
          type: "showParams",
          options: [{
            label: '最新视频',
            des: '展示最新创建的视频',
            value: 'new'
          }, {
            label: '热门视频',
            des: '展示浏览次数最多的视频',
            value: 'hot'
          }
          // , {
          //   label: '星标文章',
          //   des: '展示星标文章',
          //   value: 'star'
          // }
          ],
          default:"new",
          dataType: "video",
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
                  title = '最新视频'
                  break
                case 'hot':
                  title = '热门视频'
                  break
                // case 'star':
                //   title = '星标文章'
                //   break
              }
              comp.title.value = title
              comp.title.more = '更多'
              comp.title.onClick = {
                type: "url",
                action: `/video-list/${comp.itemId}?type=${comp.showParams}&title=${title}&mode=${comp.mode}`
              }
            }
          }
        }
      ]
    },
}