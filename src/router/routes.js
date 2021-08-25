import Home from '@/pages/Home.vue'

export default [
  { path: '/', component: Home },
  { path: '/about', component: () => import('@/pages/About.vue') },
]
