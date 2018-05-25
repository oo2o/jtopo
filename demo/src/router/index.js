import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/app'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      title: '首页',
      component: App
    },
    {
      path: '/link',
      name: 'link',
      title: '连接线',
      component: () =>
        import ('@/components/link.vue'),
    },
    {
      path: '/noscale',
      name: 'noscale',
      title: '选择框',
      component: () =>
        import ('@/components/no-scale.vue'),
    }
  ]
})
