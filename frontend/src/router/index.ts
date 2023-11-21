import { createRouter, createWebHistory } from 'vue-router'
import { api } from '@/api'
import HomePage from '@/pages/HomePage.vue'
import HomeAdmin from '@/pages/HomeAdmin.vue'
import MangaDetails from '@/pages/MangaDetails.vue'
import MangaForm from '@/pages/MangaForm.vue'
import Login from '@/pages/Login.vue'
import Error from '@/pages/Error/GenericError.vue'
import NotFound from '@/pages/Error/NotFound.vue'
import ServerError from '@/pages/Error/ServerError.vue'
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
    path: '/naoEncontrado',
    name: '404',
    component: NotFound,
  },
  {
    path: '/erroNoServidor',
    name: '500',
    component: ServerError,
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'error', 
    component: Error, 
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

api.interceptors.response.use(response => response, error => {
  const { response } = error
  if(response && response.status != 400) {
    router.push({
      name: `${response.status}`
    })
  } else {
    return Promise.reject(error)
  }
})