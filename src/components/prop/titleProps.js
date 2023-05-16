export default  [
{
  groupName:'',
  props:[
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
      }
    },
    {
      name: "文字大小",
      key: "fontSize",
      type: "fontSize",
      default:{
        fontSize:'18px',
        fontWeight:false
      }
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
      default: {
        type: "none",
        action: null
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
      name: "标题高度",
      key: "height",
      type: "slider",
      min: 40,
      // max: 80,
      default: 60
    },
    {
      name: "底部边框",
      key: "showBorder",
      type: "switch",
      default: false
    },
  ]
}]