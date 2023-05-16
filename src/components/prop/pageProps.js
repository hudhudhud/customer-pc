export default  [
	{
		groupName:'',
		props:[
			{
				name: "初始化函数名称",
				key: "initFunc",
				type: "text"
			},
			{
				name: "背景颜色",
				key: "backgroundColor",
				type: "color",
				default:"#F5F5F5"
			},
			{
				name: "显示底部导航",
				key: "showTabBar",
				type: "boolean",
				divider:true,
			},
			{
				name: "",//导航设置
				key: "tabBarSetting",
				type: "tabBar",
				showFunc(comp) {
					return comp.showTabBar;
				},
				default:{
					color:"#7d7e80",
					selectedColor: "#1989fa",
					list: [
						{
							"name":"home",
							"text": "首页",
							"iconPath": "el-icon-s-home",
							"selectedIconPath": "el-icon-s-home",
							"defaultAction": true,
							"onClick": {
								"type": "none",
								"action": ""
							}
						},
						{
							"name":"mine",
							"text": "我的收藏",
							"iconPath": "el-icon-s-custom",
							"selectedIconPath": "el-icon-s-custom",
							"defaultAction": false,
							"itemId": "",
							"dataType": ['article','video','question'],
							"onClick": {
								"type": "none",
								"action": ""
							}
						}
					]
				}
			},
	
		]
	}
]