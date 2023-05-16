export default 
{
    __config__:{
      "type":"page-title",
      "label":"标题",//组件导航文字
      "value":"标题",//
      "style":{height:'60px'},
      "props":[
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
      },{
        name: "标题文字",
        key: "value",
        type: "text",
        showFunc(comp) {
          return !comp.isSlot;
        },
      },
      {
        name: "文字大小",
        key: "fontSize",
        type: "fontSize",
        default:{
          fontSize:'18px',
          fontWeight:false
        }
        // options: [{label:'小',value:'16px'},{label:'中',value:'18px'},{label:'大',value:'20px'}],
      },
      {
        name: "文字颜色",
        key: "fontColor",
        type: "color",
      },
      {
        name: "标题图标",
        key: "titleIcon",
        type: "iconsDialog",
        default:{
          icon:'fa fa-minus',
          color:'#008DFC'
        }
      },
      {
        name: "右侧文字",
        key: "more",
        type: "text",
        // default: "更多"
      },
      {
        name: "显示箭头",
        key: "isShowIcon",
        type: "boolean",
      },
      {
        name: "点击事件",
        key: "onClick",
        type: "action",
        align: "top",
        default: {
          type: "none",
          action: null,
          extend: {}
        }
      },
      {
        name: "标题对齐",
        key: "textAlign",
        type: "radioGroup",
        options:[{label:'左对齐',value:'left'},{label:'居中',value:'center'}],
        default:'left'
      },
      {
        name: "组件高度",
        key: "height",
        type: "slider",
        default: 60
      }]
    },
}