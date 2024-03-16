import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routeSettings: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'TodoList',
    // 動的importの方が良いかも
    component: () => import('@/views/todo/TodoList.vue')
  },
  {
    path: '/new',
    name: 'TodoCreate',
    // 動的importの方が良いかも
    component: () => import('@/views/todo/TodoCreate.vue')
  },
  {
    path: '/:id',
    name: 'TodoDetail',
    // 動的importの方が良いかも
    component: () => import('@/views/todo/TodoDetail.vue'),
    props: (routes) => {
      const idNum = Number(routes.params.id)
      return { id: idNum }
    }
  },
  {
    path: '/:id/edit',
    name: 'TodoEdit',
    component: () => import('@/views/todo/TodoEdit.vue'),
    props: (routes) => {
      const idNum = Number(routes.params.id)
      return { id: idNum }
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeSettings
})

export default router
