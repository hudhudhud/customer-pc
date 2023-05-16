import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {ITEMS} from '@/api/index'
import request from '@/utils/request'
const store = new Vuex.Store({
  state:{
    appId:'',
    pageId:'',
    itemList:[] //栏目列表
  },
  mutations:{
    SET_APPID: (state, appId) => {
      state.appId = appId
    },
    SET_ITEMLIST:(state, itemList) => {
      state.itemList = itemList
    }
  },
  actions: {
    getItemList({ commit }) {
      return new Promise((resolve, reject) => {
        request.auth_post(ITEMS,{oid:1}).then(res => {
          if (res.errcode === 0) {
            commit('SET_ITEMLIST', res.data)
            resolve()
          } else {
            reject(res.message)
          }
        })
      })
    },
  }
})

export default store
