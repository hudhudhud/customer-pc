import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/styles/index.styl'
import '@/icons'
import 'vant/lib/index.css';
import 'font-awesome/css/font-awesome.min.css'
import MobileComponents from '@/components/mobile-components'
import { deepClone,isEmpty,isObject } from '@/utils/index'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'
Vue.use(ElementUI)
Vue.prototype.$api = {
  deepClone,
  isEmpty,
  isObject
}

for(let name in MobileComponents){
  Vue.component(name,MobileComponents[name])
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
