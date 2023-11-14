import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import HomeAdmin from '@/pages/HomeAdmin.vue'
import MangaDetails from '@/pages/MangaDetails.vue'
import Login from '@/pages/Login.vue'

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/admin',
    component: HomeAdmin
  },
  {
    path: '/',
    alias: '/mangas',
    component: HomePage
  }, 
  {
    path: '/mangas/:id',
    component: MangaDetails
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})