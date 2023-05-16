export default {
    __config__:{
        "type":"page-searchBar",
        "label":"搜索框",
        "style": {},
        "props":[
            {
                name: "启动搜索",
                key: "search",
                type: "switch",
                default: false,
                callback(comp) {
                    if (comp.search) {
                        comp.textColor = '#333'
                        comp.gap = {
                            marginTop: 10,
                            marginLeft: 10,
                            marginRight: 10,
                            marginBottom: 10
                        }
                        comp.customLink = false
                    } else {
                        comp.align = 'center'
                        comp.textColor = '#999'
                        comp.gap = {
                            marginTop: 0,
                            marginLeft: 0,
                            marginRight: 0,
                            marginBottom: 0
                        }
                    }
                }
            },
            {
                name: "搜索函数",
                key: "searchFunc",
                type: "text",
                showFunc(comp) {
                    return comp.search;
                }
            },
            {
                name: "提示文字",
                key: "placeholder",
                type: "text",
                default: "搜索"
            },
            {
                name: "文字颜色",
                key: "textColor",
                type: "color",
                default: "#999",
            },

            {
                name: "图标颜色",
                key: "iconColor",
                type: "color",
                default: "#999"
            },
            {
                name: "对齐方式",
                key: "align",
                type: "radioGroup",
                options: [{label: '居左对齐',value: 'left'},{label: '居中对齐',value:'center'}],
                default: "center",
                // topDivider:true,
                showFunc(comp) {
                    return !comp.search;
                }
            },
            {
                name: "组件高度",
                key: "height",
                type: "slider",
                default: 28,
                min: 28,
                max: 80
            },
            {
                name: "搜索框边距",
                key: "gap",
                type: "gap",
                default:{marginTop:0,marginBottom:0,marginLeft:0,marginRight:0},
                showFunc(comp) {
                    return comp.search;
                }
            },
            {
                name: "搜索框背景色",
                key: "backgroundColor",
                type: "color",
                default: "#f6f6f6",
                showFunc(comp) {
                    return comp.search;
                }
            },
            {
                name: "搜索框形状",
                key: "shape",
                type: "radioGroup",
                options: [{label: '方型',value:'square'},{label: '圆形',value: 'round'}],
                default: "square",
                showFunc(comp) {
                    return comp.search;
                }
            },
            {
                name: "显示按钮",
                key: "showBtn",
                type: "switch",
                default: true,
                showFunc(comp) {
                    return comp.search;
                }
            },
            {
                name: "按钮文字",
                key: "btnText",
                type: "text",
                default: "搜索",
                showFunc(comp) {
                    return comp.search && comp.showBtn;
                }
            },
            {
                name: "按钮类型",
                key: "btnType",
                type: "radioGroup",
                options: [{label:'按钮',value:'button'},{label:'文字',value:'text'}],
                default: 'button',
                showFunc(comp) {
                    return comp.search && comp.showBtn;
                }
            },
            {
                name: "按钮颜色",
                key: "btnColor",
                type: "color",
                default: "#108ee9",
                showFunc(comp) {
                    return comp.search && comp.showBtn;
                }
            },
            {
                name: "按钮点击回调",
                key: "btnCallBack",
                type: "text",
                showFunc(comp) {
                    return comp.search && comp.showBtn;
                }
            },
            {
                name: "搜索栏目",
                key: "itemId",
                type: "changeItem",
                topDivider:true,
                showFunc(comp) {
                    return !comp.search;
                }
            },
            {
                name: "搜索类型",
                key: "dataType",
                type: "checkboxGroup",
                options: [{label: '文章', value: 'article'}, {label: '视频', value: 'video'}, {label: '问答', value: 'question'}],
                showFunc(comp) {
                    return !comp.search;
                }
            },
            {
                name: "自定义跳转",
                key: "customLink",
                type: "switch",
                showFunc(comp) {
                    return !comp.search;
                }
            },
            {
                name: "跳转",
                key: "onClick",
                type: "action",
                showFunc(comp) {
                    return !comp.search && comp.customLink;
                }
            },
        ]
    },
}