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
          },
          {
            path: 'pointer',
            component: () => import('./views/pointer.vue')
          },
          {
            path: 'performance',
            component: () => import('./views/performance.vue')
          },
          {
            path: 'marker',
            component: () => import('./views/marker.vue')
          },
          {
            path: 'html',
            component: () => import('./views/html.vue')
          },
          {
            path: 'icon',
            component: () => import('./views/icon.vue')
          },
          {
            path: 'popup',
            component: () => import('./views/popup.vue')
          },
          {
            path: 'heat',
            component: () => import('./views/heat.vue')
          },
          {
            path: 'echarts',
            component: () => import('./views/echarts.vue')
          }
        ]
      }
    ]
    
  }
)

export default router
