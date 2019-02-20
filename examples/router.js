import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [
      {
        path: '/',
        component: () => import('./views/index.vue')
      },
      {
        path: '/circle-view',
        component: () => import('./views/circle-view.vue')
      }
    ]
  
  }
)

export default router
