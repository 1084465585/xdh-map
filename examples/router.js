import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [
      {
        path: '/',
        component: () => import('./views/layout.vue'),
        children: [
          {
            path: '',
            component: () => import('./views/index.vue')
          },
          {
            path: 'text',
            component: () => import('./views/text.vue')
          },
          {
            path: 'rectangle',
            component: () => import('./views/rectangle.vue')
          },
          {
            path: 'polygon',
            component: () => import('./views/polygon.vue')
          },
          {
            path: 'circle',
            component: () => import('./views/circle.vue')
          },
          {
            path: 'line',
            component: () => import('./views/line.vue')
          }
        ]
      }
    ]
    
  }
)

export default router
