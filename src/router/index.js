import { createRouter, createWebHistory } from 'vue-router'
import auth from '@/middleware/auth';

const routes = [
  {
    path: '/',
    component: () => import('@/_layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('../views/Login.vue')
      },
      {
        path: 'cadastro',
        name: 'cadastro',
        component: () => import('../views/Cadastro.vue')
      },
    ]
  },
  {
    path: '/',
    component: () => import('@/_layouts/MainLayout.vue'),
    beforeEnter: auth,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'reservas',
        name: 'reservas',
        component: () => import('../views/Reservas.vue'),
      },
      {
        path: 'reservas/cadastro',
        name: 'cadastro-reserva',
        component: () => import('@/pages/reservas/Cadastro.vue')
      },
      {
        path: 'reservas/editar/:id',
        name: 'editar-reserva',
        component: () => import('@/pages/reservas/Editar.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
