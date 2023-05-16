export default {
    __config__:{
      type:"page-imgTextNav",
      label:"图文导航",
      style:{},
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
      mode:"imgTop",
      imgShape:"keepImg",
      imgBorderRadio:4,
      props:[
        {
          name: "选择模式",
          key: "mode",
          type: "radioGroup",
          options:[{label:'上下图文',value:'imgTop'},{label:'左图右文',value:'imgLeft'},{label:'左文右图',value:'imgRight'},{label:'图片导航',value:'imgText'},{label:'文字导航',value:'imgNone'}],
          default:'imgTop',
          labelPosition:'top',
        },
        {
          name: "一行个数",
          key: "columnCount",
          type: "size",
          default: 4,
          max:5,
          min:1,
        },
        {
          name: "导航间距",
          key: "gap",
          type: "gap",
          showFunc(comp) {
            return comp.mode!=='imgTop';
          },
          default:{marginTop:5,marginBottom:5,marginLeft:5,marginRight:5}
        },
        {
          name: "导航卡片高度",
          key: "navHeight",
          type: "size",
          showFunc(comp) {
            return comp.mode!=='imgTop';
          },
          default:80
        },
        {
          name: "图片形状",
          key: "imgShape",
          type: "options",
          options:[{label:'保持图片原比例',value:'keepImg'},{label:'圆形',value:'circle'},{label:'正方形',value:'square'}],
          showFunc(comp) {
            return comp.mode!=='imgText' && comp.mode!=='imgNone';
          },
          default:'keepImg'
        },
        {
          name: "图片圆角",
          key: "imgBorderRadio",
          type: "slider",
          showFunc(comp) {
            return comp.mode!=='imgNone' && comp.imgShape!=='circle';
          },
          default:4
        },
        {
          name: "图片大小",
          key: "imgSize",
          type: "size",
          unit:'%',
          showFunc(comp) {
            return comp.mode==='imgTop';
          },
          default:100,
          max:100,
          min:0,
        },
        {
          name: "图片高度",
          key: "imgHeight",
          type: "size",
          showFunc(comp) {
            return comp.mode==='imgLeft' || comp.mode==='imgRight';
          },
          default:40,
          max:100,
          min:1,
        },
        {
          name: "文字大小",
          key: "fontSize",
          type: "fontSize",
          showType:"numberInput",
          default:{
            fontSize:13,
            fontWeight:false
          }
        },
        {
          name: "文字颜色",
          key: "fontColor",
          type: "color",
          default:'#333'
        },
        // {
        //   name: "文字对齐",
        //   key: "fontAlign",
        //   type: "radioGroup",
        //   options:[{label:'居左',value:'left'},{label:'居中',value:'center'},{label:'居右',value:'right'}],
        //   showFunc(comp) {
        //     return comp.mode!=='imgText' && comp.mode!=='imgNone';
        //   },
        //   default:'center'
        // },
        {
          name: "启用传参",
          key: "isSlot",
          type: "boolean",
          topDivider:true,
        },
        // {
        //   name: "数据源",
        //   key: "jsGetOptions",
        //   type: "radioGroup",
        //   options:[{label:'动态绑定',value:true},{label:'手动添加',value:false}],
        //   showFunc(comp) {
        //     return !comp.isSlot
        //   },
        //   default:false,
        // },
        {
          name: "请添加内容",
          key: "options",
          type: "imageList",
          showFunc(comp) {
            return !comp.isSlot
          },
          default:[{title:'标题1',src:'',onClick:{type:'none'}},{title:'标题2',src:'',onClick:{type:'none'}},{title:'标题3',src:'',onClick:{type:'none'}},{title:'标题4',src:'',onClick:{type:'none'}}],
          labelPosition:"top",
          hasTitle:true
        },
        // {
        //   name: "函数名称",
        //   key: "jsFunction",
        //   type: "text",
        //   showFunc(comp) {
        //     return comp.jsGetOptions;
        //   }
        // },
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
            return comp.isSlot && comp.mode !=='imgNone';
          }
        },
        {
          name: "标题字段",
          key: "slotKeyTitle",
          type: "text",
          showFunc(comp) {
            return comp.isSlot;
          }
        },
        {
          name: "导航点击事件",
          key: "onClick",
          type: "action",
          showFunc(comp) {
            return comp.isSlot;
          },
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