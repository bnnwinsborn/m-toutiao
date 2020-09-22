import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/search'
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   // 路由懒加载
  //   component: () => import('@/views/login/index.vue')
  // },
  {
    path: '/login',
    name: 'login',
    // 路由懒加载
    component: login
  },
  {
    path: '/other',
    name: 'other',
    // 路由懒加载
    component: () => import('@/views/login/other.vue')
  },
  {
    path: '/',
    // name: 'layout',
    // 路由懒加载
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { isKeepAlive: true }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/index.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/index.vue')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/index.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    // 路由懒加载
    component: () => import('@/views/search/search.vue')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    // 路由懒加载
    component: () => import('@/views/article/article.vue'),
    props: true
  },
  {
    path: '/user/profile',
    name: 'profile',
    // 路由懒加载
    component: () => import('@/views/user-profile/user-profile.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
