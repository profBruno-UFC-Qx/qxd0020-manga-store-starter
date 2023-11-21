import { api } from "@/api"
import { type Manga } from "@/types"
import { useUserStore } from "@/stores/userStore"

class MangaService {
  constructor() {}
  
  async  all(page = 1, pageSize = 24): Promise<Manga[]> {
    const { data } = await api.get('/mangas', {
      params: {
        populate: 'cover',
      }
    })
    return data.data
  }

  async get(id: number): Promise<Manga> {
    const { data } = await api.get(`/mangas/${id}`, {
      params: {
        populate: ['cover', 'comments'],
      }
    })
    return data.data
  }

  async delete(id: number): Promise<Manga> {
    const userStore = useUserStore()
    const { data } = await api.delete(`/mangas/${id}`, {
      headers : {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    return data.data
  }
}

export const mangaService = new MangaService()