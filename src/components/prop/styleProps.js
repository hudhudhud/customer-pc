export default [
    {
      styles: [
        {
          key: "styleType",
          name: "选择样式",
          type: "options",
          options: ["卡片式","通栏式"],
          default: "",
          callback(comp) {
            if (comp.styleType == '卡片式') {
              comp.marginTop = 5
              comp.marginBottom = 5
              comp.marginLeft = 10
              comp.marginRight = 10
              comp.borderRadius = 8
            } else if (comp.styleType == '通栏式') {
              comp.marginTop = 5
              comp.marginBottom = 5
              comp.marginLeft = 0
              comp.marginRight = 0
              comp.borderRadius = 0
            }
          }
        }
      ],
    },
    {
      groupName: "组件边距",
      styles: [
        {
          key: "marginTop",
          name: "上方",
          type: "number",
          default: '5'
        },
        {
          key: "marginBottom",
          name: "下方",
          type: "number",
          default: '5'
        },
        {
          key: "marginLeft",
          name: "左侧",
          type: "number",
          default: "0"
        },
        {
          key: "marginRight",
          name: "右侧",
          type: "number",
					divider:true,
          default: "0"
        },
        {
          key: "borderRadius",
          name: "圆角大小",
          type: "slider",
          max: 50,
          default: 0
        }
			],
		},
		{
			groupName:"",
      styles:[{
          key: "borderWidth",
          name: "描边粗细",
          type: "radioGroup",
					options:[{label:'无',value:'0'},{label:'细',value:'0.5px'},{label:'中等',value:'1px'},{label:'粗',value:'2px'}]
        },
        {
          key: "borderColor",
          name: "描边颜色",
          type: "color",
					divider:true,
        }]
		},
		{
			groupName:"",
			styles:[{
					key: "boxShadow",
					name: "阴影样式",
					type: "radioGroup",
					options:[{label:'无',value:''},{label:'轻',value:'0px 0px 6px 0px'},{label:'常规',value:'0px 0px 10px 0px'},{label:'重',value:'0px 0px 16px 0px'}]
				},
				{
					key: "boxShadowColor",
					name: "阴影颜色",
					type: "color"
				},
				{
					key: "backgroundColor",
					name: "背景颜色",
					type: "color"
			}]
		}
]