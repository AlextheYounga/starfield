import { createRouter, createWebHistory } from 'vue-router'
import StarField from '../views/StarField.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'starfield',
      component: StarField
    }
  ]
})

export default router
