export default 
{
    __config__:{
      "type":"page-imgList",
      "label":"图片",
      "mode":"tile",
      // "imageList":["http://fviewer.h3c.com/file/down?appid=istage&fileId=160680149847522863"],
      "imageList":[{
        src: "",
        areas: [],
        onClick: {
          type: "none",
          action: ""
        }
      }],
      "style":{},
      "title":{},
      "hasTitleSetting":true,
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
        },
        {
          name: "",
          key: "mode",
          type: "mode",
          showFunc(comp) {
            return !comp.isSlot;
          },
          options: [{
            label: '平铺',
            value: 'tile',
            icon: 'tile'
          },{
            label: '自定义热区',
            value: 'hotArea',
            icon: 'hotarea'
          }]
        },
        {
          name: "上传图片",
          key: "imageList",
          type: "imageList",
          showFunc(comp) {
            return !comp.isSlot;
          },
          labelPosition:"top",
          hasGap: true
        },
        // {
        //   name: "图片",
        //   key: "src",
        //   type: "image",
        //   showFunc(comp) {
        //     return !comp.isSlot;
        //   }
        // },
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
          name: "属性",
          key: "attributes",
          type: "attribute",
          default: []
        },
      ]
  }
}