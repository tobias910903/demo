import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import page1 from '@/pages/page_1'
import page2 from '@/pages/page_2'
import page3 from '@/pages/page_3'

Vue.use(Router)
Vue.use(Vuex)

export default new Router({
  routes: [
    {
      path: '/p1',
      name: 'page1',
      component: page1
    },
    {
      path: '/p2/:id',
      name: 'page2',
      component: page2
    },
    {
      path: '/p3',
      name: 'page3',
      component: page3
    }
  ]
})
