
import { REFRERENCE_LIST } from '@/api'
import store from '@/store'
import Request from '@/utils/request'
export default 
{
  __config__:{
    "type":"reference",
    "label":"引用组件",
    "value":"",
    "noStyleSetting":true,
    "props":[
      {
        name: "引用组件选择",
        key: "referId",
        type: "options",
        labelKey:'name',
        valueKey:'id',
        remoteFunc:({success,fail})=>{
          Request.post(REFRERENCE_LIST, {oid:1,appId:store.state.appId}).then(res => {
            if (res.errcode === 0) {
              success(res.data)
            } else {
              fail(res.message)
            }
          })
        }
      },
    ]
  },
}