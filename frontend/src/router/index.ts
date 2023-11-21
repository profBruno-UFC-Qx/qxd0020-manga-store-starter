import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import HomeAdmin from '@/pages/HomeAdmin.vue'
import NotFound from '@/pages/NotFound.vue'
import MangaDetails from '@/pages/MangaDetails.vue'
import MangaForm from '@/pages/MangaForm.vue'
import Login from '@/pages/Login.vue'
import { useUserStore } from '@/stores/userStore'

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/admin',
    component: HomeAdmin,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/',
    alias: '/mangas',
    component: HomePage
  }, 
  {
    path: '/mangas/:id',
    component: MangaDetails
  },
  { 
    path: '/mangas/novo',
    component: MangaForm
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: NotFound 
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from) => {
  const userStore = useUserStore()
  const user = userStore.user.username
  const papel = userStore.user.role

  console.log(`quero ir pra ${to.path}. É protegida? ${to.meta.requireAuth}. Eu sou o ${user} com o papel ${papel}`)
  if(to.meta.requireAuth && user == null) {
    return { path: "/login" }
  }
})