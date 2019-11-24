/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 21:57:21
 * @LastEditTime: 2019-10-13 10:41:50
 * @LastEditors: Please set LastEditors
 */
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
            component: () => import('./views/docs.vue')
          },
          {
            path: '/map',
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
            path: 'placement',
            component: () => import('./views/placement.vue')
          },
          {
            path: 'dialog',
            component: () => import('./views/dialog.vue')
          },
          {
            path: 'drawdown',
            component: () => import('./views/drawdown.vue')
          },
          {
            path: 'pointer',
            component: () => import('./views/pointer.vue')
          },
          {
            path: 'overview',
            component: () => import('./views/overview.vue')
          },
          {
            path: 'zoom',
            component: () => import('./views/zoom.vue')
          },
          {
            path: 'scale',
            component: () => import('./views/scale.vue')
          },
          {
            path: 'performance',
            component: () => import('./views/performance.vue')
          },
          {
            path: 'image',
            component: () => import('./views/image.vue')
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
            path: 'tooltip',
            component: () => import('./views/tooltip.vue')
          },
          {
            path: 'popup',
            component: () => import('./views/popup.vue')
          },
          {
            path: 'panel',
            component: () => import('./views/panel.vue')
          },
          {
            path: 'heat',
            component: () => import('./views/heat.vue')
          },
          {
            path: 'echarts',
            component: () => import('./views/echarts.vue')
          },
          {
            path: 'track',
            component: () => import('./views/track.vue')
          },
          {
            path: 'type',
            component: () => import('./views/type.vue')
          },
          {
            path: 'draw',
            component: () => import('./views/draw.vue')
          },
          {
            path: 'scatter',
            component: () => import('./views/scatter.vue')
          },
          {
            path: 'flight',
            component: () => import('./views/flight.vue')
          },
          {
            path: 'measure',
            component: () => import('./views/measure.vue')
          },
          {
            path: 'mask',
            component: () => import('./views/mask.vue')
          },
          {
            path: 'geo',
            component: () => import('./views/geo.vue')
          },
          {
            path: 'geo-edit',
            component: () => import('./views/geo-edit/index.vue')
          },
          {
            path: 'data-layer',
            component: () => import('./views/data-layer/index.vue')
          },
          {
            path: 'test',
            component: () => import('./views/test.vue')
          },
          {
            path: 'test-error',
            component: () => import('./views/test-error.vue')
          },
          {
            path: 'coord-transform',
            component: () => import('./views/coord-transform')
          },
          {
            path: 'drag-object',
            component: () => import('./views/drag-object')
          },
          {
            path: 'area-select',
            component: () => import('./views/area-select')
          },
          // -----------测试用页面---------
          {
            path: 'mytest/test',
            component: () => import('./views/mytest/test')
          }
        ]
      }
    ]
    
  }
)

export default router
