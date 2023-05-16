import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Reference from '@/views/Reference.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/reference',
    name: 'reference',
    component: Reference
  }
]

const router = new VueRouter({
  routes
})

export default router
